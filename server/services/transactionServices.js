const Transaction = require("../models/Transaction");

async function listTransactionsService(queryItem) {
  let { month, search, page = 1, perPage = 10 } = queryItem;
  const query = {};
  page = Math.max(1, Number(page));
  perPage = Number(perPage);
  if (month) {
    query.$expr = {
      $eq: [{ $month: "$dateOfSale" }, Number(month)],
    };
  }

  if (search) {
    const searchNumber = parseFloat(search);
    query.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      ...(isNaN(searchNumber) ? [] : [{ price: searchNumber }]),
    ];
    if (!isNaN(searchNumber)) {
      query.$or.push({ price: searchNumber });
    }
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  return transactions;
}

async function getStatisticsService(month) {
  const totalSaleAmount = await Transaction.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] },
        sold: true
      },
    },
    { $group: { _id: null, total: { $sum: "$price" } } },
  ]);

  const totalSoldItems = await Transaction.countDocuments({
    $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] },
    sold: true,
  });

  const totalNotSoldItems = await Transaction.countDocuments({
    $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] },
    sold: false,
  });

  return {
    totalSaleAmount: totalSaleAmount[0]?.total || 0,
    totalSoldItems,
    totalNotSoldItems,
  };
}

async function getBarChartService(month) {
  const priceRanges = [
    [0, 100],
    [101, 200],
    [201, 300],
    [301, 400],
    [401, 500],
    [501, 600],
    [601, 700],
    [701, 800],
    [801, 900],
    [901, Infinity],
  ];

  const barChart = await Promise.all(
    priceRanges.map(async ([min, max]) => {
      const count = await Transaction.countDocuments({
        $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] },
        price: { $gte: min, $lt: max },
      });

      return { range: `${min}-${max === Infinity ? "above" : max}`, count };
    })
  );

  return barChart;
}

async function getPieChartService(month) {
  const pieChart = await Transaction.aggregate([
    { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] } } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  return pieChart.map((item) => ({ category: item._id, count: item.count }));
}

module.exports = {
  listTransactionsService,
  getStatisticsService,
  getBarChartService,
  getPieChartService,
};
