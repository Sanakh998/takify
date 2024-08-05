const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const CustomError = require("../utils/customError");

const addTodo = async (req, res, next) => {
  let userId = req.userId;
  let { title } = req.body;
  try {
    let todo = new Todo({ title, user: userId });
    await todo.save();
    let user = await User.findById(userId);
    user.todos.push(todo);
    await user.save();
    res.status(201).json({ message: "Todo added successfully", data: todo });
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  let userId = req.userId;
  try {
    let todos = await Todo.find({ user: userId }).exec();
    res
      .status(200)
      .json({ message: "Todos fetched successfully", data: todos });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  let {id} = req.params;
  try {
    let todo = await Todo.findByIdAndDelete(id);
    if(!todo){
      throw new CustomError('Todo not found', 404)
    }
    let user = await User.findById(req.userId);
    let index = user.todos.indexOf(id);
    user.todos.splice(index, 1);
    await user.save();
    res.status(200).json({message: 'Todo deleted successfully', data: todo})
  } catch (error) {
    next(error)
  }
}

const updateTodo = async (req, res, next) => {
  let {id} = req.params;
  let {title} = req.body;
  try {
    let todo = await Todo.findById(id).select('-user');
    if(!todo){
      throw new CustomError('Todo not found', 404);
    }
    if(title) todo.title = title;
    await todo.save();
    res.status(200).json({message: 'Todo updated successfully', data: todo})
  } catch (error) {
    next(error)
  }
}

const toggleTodoStatus = async (req, res, next) => {
  let {id} = req.params;
  try {
    let todo = await Todo.findById(id);
    if(!todo){
      throw new CustomError('Todo not found', 404)
    }
    todo.completed = !todo.completed;
    await todo.save()
    res.status(200).json({message: 'Todo Status Update Successfully', data: todo})
  } catch (error) {
    next(error)
  }
}


module.exports = {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  toggleTodoStatus
};
