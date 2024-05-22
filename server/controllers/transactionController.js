const Transaction = require("../models/Transaction");
const {
  listTransactionsService,
  getStatisticsService,
  getBarChartService,
  getPieChartService,
} = require("../services/transactionServices");

const listTransactions = async (req, res) => {
  let queryItem = req.query;
  try {
    const transactions = await listTransactionsService(queryItem);
    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  try {
    const statistics = await getStatisticsService(month);
    return res.json(statistics);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getBarChart = async (req, res) => {
  const { month } = req.query;
  try {
    const barChart = await getBarChartService(month);
    return res.json(barChart);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getPieChart = async (req, res) => {
  const { month } = req.query;
  try {
    const pieChart = await getPieChartService(month);
    return res.json(pieChart);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;
  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      listTransactionsService({ month: month }),
      getStatisticsService(month),
      getBarChartService(month),
      getPieChartService(month),
    ]);

    res.json({
      transactions,
      statistics,
      barChart,
      pieChart,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};
