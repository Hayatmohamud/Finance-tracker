import User from "../model/User.js";
import Transaction from "../model/Transaction.js";

export const getAdminOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const topSpending = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: 1 } }, // Expense waa negative, 1 ayaa keenaya kii ugu badnaa
      { $limit: 5 },
    ]);

    res.json({ totalUsers, topSpending });
  } catch (error) {
    next(error);
  }
};
