import { todosInterface as td } from "../interfaces";

interface SetTodoAction {
  type: "setTodo";
  todoItem: td;
}

interface SetTodosAction {
  type: "setTodos";
  todos: td[];
}

export type TodoAction = SetTodoAction | SetTodosAction;

const todoReducer = (state: td[], action: TodoAction) => {
  switch (action.type) {
    case "setTodo":
      return [action.todoItem, ...state];
    case "setTodos":
      return action.todos;
    default:
      return state;
  }
};

export default todoReducer;
