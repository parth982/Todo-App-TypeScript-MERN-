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

interface CheckedTodo {
  type: "checkedTodo";
  id: string;
}

export type TodoAction = AddTodo | SetTodos | DelTodo | CheckedTodo;

const todoReducer = (state: ITodo[], action: TodoAction) => {
  switch (action.type) {
    case "addTodo":
      if (state.some((todo) => todo._id === action.todoItem._id)) return state;
      return [action.todoItem, ...state];
    case "setTodos":
      return action.todos;
    case "delTodo":
      return state.filter((todo) => todo._id !== action.id);
    case "checkedTodo":
      return state.map((todo) => {
        if (todo._id === action.id) return { ...todo, status: !todo.status };
        return todo;
      });
    default:
      return state;
  }
};

export default todoReducer;
