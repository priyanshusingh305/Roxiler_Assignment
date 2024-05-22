const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
  let { month, search, page = 1, perPage = 10 } = req.query;
  const query = {};
  page =Math.max(1, Number(page));
  perPage = Number(perPage);

  if (month) {
    query.$expr = {
      $eq: [{ $month: "$dateOfSale" }, Number(month)]
    };
  }

  if (search) {
    const searchNumber = Number(search);
    query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      ...(isNaN(searchNumber) ? [] : [{ price: searchNumber }])
    ];
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  res.json(transactions);
  return transactions;
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2021-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const totalSaleAmount = await Transaction.aggregate([
    { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
    { $group: { _id: null, total: { $sum: '$price' } } }
  ]);

  const totalSoldItems = await Transaction.countDocuments({
    dateOfSale: { $gte: startDate, $lt: endDate },
    sold: true
  });

  const totalNotSoldItems = await Transaction.countDocuments({
    dateOfSale: { $gte: startDate, $lt: endDate },
    sold: false
  });

  res.json({
    totalSaleAmount: totalSaleAmount[0]?.total || 0,
    totalSoldItems,
    totalNotSoldItems
  });
};

const getBarChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2021-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const priceRanges = [
    [0, 100], [101, 200], [201, 300], [301, 400],
    [401, 500], [501, 600], [601, 700], [701, 800],
    [801, 900], [901, Infinity]
  ];

  const barChart = await Promise.all(priceRanges.map(async ([min, max]) => {
    const count = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      price: { $gte: min, $lt: max }
    });

    return { range: `${min}-${max === Infinity ? 'above' : max}`, count };
  }));

  res.json(barChart);
};

const getPieChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2021-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const pieChart = await Transaction.aggregate([
    { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);

  res.json(pieChart.map(item => ({ category: item._id, count: item.count })));
  return pieChart.map(item => ({ category: item._id, count: item.count }));
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;
  console.log(req.query.month);

  const [transactions, statistics, barChart, pieChart] = await Promise.all([
    listTransactions(req),
    getStatistics(req),
    getBarChart(req),
    getPieChart(req)
  ]);

  res.json({
    transactions,
    statistics,
    barChart,
    pieChart
  });
};
module.exports = {
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData
};
