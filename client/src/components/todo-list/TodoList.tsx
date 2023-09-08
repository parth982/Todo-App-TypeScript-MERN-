import axios from "axios";
import { todosInterface } from "../../interfaces";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState<todosInterface[]>([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    try {
      const res = await axios.get<todosInterface[]>(
        "http://localhost:4000/todos"
      );
      setTodos(res.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      {todos.map((todo) => (
        <div
          key={todo._id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            maxWidth: "300px",
            margin: "2px auto",
          }}
        >
          <div>
            <span>Label: </span>
            {todo.label}
          </div>
          <div>
            <span>Description: </span>
            {todo.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
