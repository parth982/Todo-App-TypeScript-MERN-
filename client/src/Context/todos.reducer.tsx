import { ITodo } from "../interfaces";

interface AddTodo {
  type: "addTodo";
  todoItem: ITodo;
}

interface SetTodos {
  type: "setTodos";
  todos: ITodo[];
}

interface DelTodo {
  type: "delTodo";
  id: string;
}

export type TodoAction = AddTodo | SetTodos | DelTodo;

const todoReducer = (state: ITodo[], action: TodoAction) => {
  switch (action.type) {
    case "addTodo":
      if (state.some((todo) => todo._id === action.todoItem._id)) return state;
      return [action.todoItem, ...state];
    case "setTodos":
      return action.todos;
    case "delTodo":
      return state.filter((todo) => todo._id !== action.id);
    default:
      return state;
  }
};

export default todoReducer;
