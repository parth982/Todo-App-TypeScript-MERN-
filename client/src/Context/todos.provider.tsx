import { ReactNode, useReducer } from "react"; // Correct import
import todoReducer from "./todos.reducer";
import TodosContext from "./todos.context";

interface Props {
  children: ReactNode;
}

const TodosProvider = ({ children }: Props) => {
  const [todos, todosDispatch] = useReducer(todoReducer, []);

  return (
    <TodosContext.Provider value={{ todos, dispatch: todosDispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext, TodosProvider };
