import React, { useContext, useEffect } from "react";
import { TodosContext } from "../../Context/todos.provider";
import { ITodo } from "../../interfaces";
import TodoItem from "../todo-item/TodoItem";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";

const TodoneList = () => {
  const { todos, dispatch } = useContext(TodosContext);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = () => {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        dispatch({ type: "setTodos", todos: res.data });
        console.log(res.data);
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

  const doneTodos = todos.filter((todo) => todo.status === true);

  return (
    <>
      <Heading textAlign="center" mb={4} fontSize="3xl">
        Done Task Lists
      </Heading>
      <SimpleGrid columns={1} spacing={4} mx="auto" maxW="lg">
        {doneTodos.map((todo: ITodo) => (
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
    </>
  );
};

export default TodoneList;
