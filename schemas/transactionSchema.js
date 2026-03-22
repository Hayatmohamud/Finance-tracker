const { z } = require("zod");

const transactionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 chars"),
  amount: z.number(),
  type: z.enum(["income", "expense"]),
  category: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),
});

module.exports = { transactionSchema };
