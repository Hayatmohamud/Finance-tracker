import Transaction from "../model/Transaction.js";

// 1. POST /transactions (Add new income/expense)
export const addTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const newTransaction = await Transaction.create({
      userId: req.user.id, // Waxaa laga helayaa Auth Middleware
      title,
      amount,
      type,
      category,
      date,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
};

// 2. GET /transactions (List all transactions for the user)
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// 3. GET /transactions/monthly-summary (Total per category)
export const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query; // ex: ?month=3&year=2026

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year required" });
    }

    // date range
    const start = new Date(year, month - 1, 1); // month is 0-indexed
    const end = new Date(year, month, 1); // next month

    const transactions = await Transaction.find({
      userId,
      date: { $gte: start, $lt: end },
    });

    // total income and expense
    const summary = transactions.reduce(
      (acc, t) => {
        if (t.type === "income") acc.income += t.amount;
        else if (t.type === "expense") acc.expense += t.amount;
        return acc;
      },
      { income: 0, expense: 0 },
    );

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. PUT /transactions/:id (Edit Transaction)
export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // Hubi in qofka iska leh uu wax ka bedelayo
      req.body,
      { new: true, runValidators: true },
    );

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// 5. DELETE /transactions/:id (Remove Transaction)
export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    res.json({ message: "Transaction removed successfully" });
  } catch (error) {
    next(error);
  }
};
