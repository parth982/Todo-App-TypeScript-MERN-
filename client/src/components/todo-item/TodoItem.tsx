import { Box, Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ITodo } from "../../interfaces";

const TodoItem: FC<{
  todo: ITodo;
  deleteTodo: (id: string) => void;
}> = ({ todo, deleteTodo }) => {
  return (
    <>
      <Box>
        <Text fontWeight="bold">Label:</Text> {todo.label}
      </Box>
      <Box>
        <Text fontWeight="bold">Description:</Text> {todo.description}
      </Box>
      <Box>
        <Button onClick={() => deleteTodo(todo._id)}>Delete</Button>
      </Box>
    </>
  );
};

export default TodoItem;
