import axios from "axios";
import { useContext, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react"; // Import Chakra UI components
import { TodosContext } from "../../Context/todos.provider";
import { todosInterface } from "../../interfaces";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodosContext);

  useEffect(() => {
    getAllTodos();
  }, [todos]);

  const getAllTodos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/todos");
      dispatch({ type: "setTodos", todos: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box mt="10px">
      {todos.map((todo: todosInterface) => (
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
          <Box>
            <Text fontWeight="bold">Label:</Text> {todo.label}
          </Box>
          <Box>
            <Text fontWeight="bold">Description:</Text>
            {todo.description}
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default TodoList;
