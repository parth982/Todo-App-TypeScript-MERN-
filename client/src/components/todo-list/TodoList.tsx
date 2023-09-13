import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { TodosContext } from "../../Context/todos.provider";
import { ITodo } from "../../interfaces";
import TodoItem from "../todo-item/TodoItem";

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

  const remTodos = todos.filter((todo) => todo.status === false);

  return (
    <Box mt={10}>
      <Heading textAlign={"center"}>Task Lists</Heading>
      <SimpleGrid columns={1} spacing={4} mx="auto" maxW="lg" border={"1px"}>
        {remTodos.map((todo: ITodo) => (
          <Box
            key={todo._id}
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.300"
            boxShadow="md"
          >
            <TodoItem todo={todo} deleteTodo={deleteTodo} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TodoList;
