import { useContext, useEffect } from "react";
import { TodosContext } from "../../Context/todos.provider";
import { ITodo } from "../../interfaces";
import TodoItem from "../todo-item/TodoItem";
import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodosContext);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = () => {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        dispatch({ type: "setTodos", todos: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = (id: string) => {
    axios
      .delete("http://localhost:4000/todos/" + id)
      .then(() => {
        dispatch({ type: "delTodo", id: id });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box mt="10px">
      {todos.map((todo: ITodo) => (
        <Flex
          key={todo._id + todo.description}
          flexDirection="row"
          justifyContent="space-between"
          maxWidth="300px"
          margin="2px auto"
          padding="10px"
          borderRadius="4px"
          borderWidth="1px"
          borderColor="gray.300"
        >
          <TodoItem todo={todo} deleteTodo={deleteTodo} />
        </Flex>
      ))}
    </Box>
  );
};

export default TodoList;
