const ExpenseSchema = require('../models/expenseModel');


exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date
  });

  try {
    // validations
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    if (amount < 0 || !Number.isInteger(amount)) {
      return res.status(400).json({ msg: "Please enter a valid amount" });
    }

    await expense.save();
    res.status(200).json({ msg: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }

  console.log(expense);
}


exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await ExpenseSchema.findByIdAndDelete(id);
    res.status(200).json({ msg: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}