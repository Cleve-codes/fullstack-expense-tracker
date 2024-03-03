const IncomeSchema = require('../models/incomeModel')

exports.addIncome = async(req, res) => {
    const {title, amount, category, description, date} = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
      // validations
      if(!title || !amount || !category || !description || !date){
        return res.status(400).json({msg: "Please fill in all fields"})
      }

      if(amount < 0 || !Number.isInteger(amount) ){
        return res.status(400).json({msg: "Please enter a valid amount"})
      }

      await income.save()
      res.status(200).json({msg: "Income added successfully"})
    } catch (error) {
      res.status(500).json({msg: "Internal Server Error"})
    }

    console.log(income)
}

exports.getIncomes = async(req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({createdAt: -1})
    res.status(200).json(incomes)
  } catch (error) {
    res.status(500).json({msg: "Internal Server Error"})
  }
}

exports.deleteIncome = async(req, res) => {
  const {id} = req.params
  try {
    await IncomeSchema.findByIdAndDelete(id)
    res.status(200).json({msg: "Income deleted successfully"})
  } catch (error) {
    res.status(500).json({msg: "Internal Server Error"})
  }
}