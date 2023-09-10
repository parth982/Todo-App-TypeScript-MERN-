import { Dispatch, createContext } from "react";
import { todosInterface as td } from "../interfaces";
import { TodoAction } from "./todoReducer";

interface TodoContextType {
    todos: td[];
    dispatch: Dispatch<TodoAction>;
}
const TodosContext = createContext<TodoContextType>(
    {} as TodoContextType
);

export default TodosContext;