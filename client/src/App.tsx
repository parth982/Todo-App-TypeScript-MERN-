import TodoneList from "./components/todo-done/TodoneList";
import TodoForm from "./components/todo-form/TodoForm";
import TodoList from "./components/todo-list/TodoList";

const App = () => {
  return (
    <div>
      <TodoList />
      <TodoForm />
      <TodoneList />
    </div>
  );
};

export default App;
