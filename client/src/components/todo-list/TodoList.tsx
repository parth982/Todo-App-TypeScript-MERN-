import { useContext, useEffect } from "react";
import { TodosContext } from "../../Context/todos.provider";
import { ITodo } from "../../interfaces";
import TodoItem from "../todo-item/TodoItem";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
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

  const remTodos = todos.filter((todo) => todo.status === false);

  return (
    <>
      <Heading textAlign={"center"}>Task Lists</Heading>
      <Box mt="10px">
        {remTodos.length === 0 ? (
          <Text textAlign={"center"} fontSize={"md"}>
            No Tasks To do
          </Text>
        ) : (
          remTodos.map((todo: ITodo) => (
            <Flex
              key={todo._id + todo.description}
              flexDirection="row"
              justifyContent="space-between"
              maxWidth="70%"
              margin="2px auto"
              padding="10px"
              borderRadius="4px"
              borderWidth="1px"
              borderColor="gray.300"
            >
              <TodoItem todo={todo} deleteTodo={deleteTodo} />
            </Flex>
          ))
        )}
      </Box>
    </>
  );
};

export default TodoList;
