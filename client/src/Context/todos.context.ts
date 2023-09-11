import { Dispatch, createContext } from "react";
import { ITodo } from "../interfaces";
import { TodoAction } from "./todos.reducer";

interface TodoContextType {
    todos: ITodo[];
    dispatch: Dispatch<TodoAction>;
}
const TodosContext = createContext<TodoContextType>(
    {} as TodoContextType
);

export default TodosContext;