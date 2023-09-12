import React, { useContext, useState } from "react";
import { ITodo } from "../../interfaces";
import axios from "axios";
import TodosContext from "../../Context/todos.context";
import { Checkbox, IconButton, Stack, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const TodoItem: React.FC<{
  todo: ITodo;
  deleteTodo: (id: string) => void;
}> = ({ todo, deleteTodo }) => {
  const { dispatch } = useContext(TodosContext);
  const [isChecked, setIsChecked] = useState<boolean>(todo.status);

  const checkTodo = (id: string) => {
    axios
      .patch(`http://localhost:4000/todos/${id}`)
      .then(() => {
        dispatch({ type: "checkedTodo", id: id });
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = (id: string) => {
    setIsChecked(!isChecked);
    checkTodo(id);
  };

  return (
    <Stack
      p={4}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
      bg="white"
      alignItems="flex-start"
      spacing={1}
    >
      <Text fontWeight="bold" fontSize="lg">
        {todo.label}
      </Text>
      <Text fontSize="sm" color="gray.600">
        {todo.description}
      </Text>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Checkbox
          isChecked={isChecked}
          onChange={() => handleCheckboxChange(todo._id)}
        />
        <IconButton
          colorScheme="red"
          aria-label="Delete Todo"
          icon={<FaTrash />}
          onClick={() => deleteTodo(todo._id)}
          size="sm"
        />
      </Stack>
    </Stack>
  );
};

export default TodoItem;
