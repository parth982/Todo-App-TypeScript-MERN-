import { Button, Checkbox, IconButton, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import TodosContext from "../../Context/todos.context";
import { ITodo } from "../../interfaces";
import EditModal from "../Modal/EditModal";

const TodoItem: React.FC<{
  todo: ITodo;
  deleteTodo: (id: string) => void;
}> = ({ todo, deleteTodo }) => {
  const { dispatch } = useContext(TodosContext);
  const [isChecked, setIsChecked] = useState<boolean>(todo.status);
  const [isEdit, setIsEdit] = useState<boolean>(false);

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
      spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack>
        <Text fontWeight="bold" fontSize="xl">
          {todo.label}
        </Text>
        <Text fontSize="lg" color="gray.600">
          {todo.description}
        </Text>
      </Stack>
      {isEdit ? (
        <EditModal />
      ) : (
        <Button onClick={() => setIsEdit(!isEdit)}>Edit</Button>
      )}

      <Checkbox
        size={"lg"}
        isChecked={isChecked}
        onChange={() => handleCheckboxChange(todo._id)}
        colorScheme="green"
      >
        <Text fontSize={"lg"} fontFamily={"cursive"}>
          Status
        </Text>
      </Checkbox>

      <IconButton
        colorScheme="red"
        aria-label="Delete Todo"
        icon={<FaTrash />}
        onClick={() => deleteTodo(todo._id)}
        size="md"
      />
    </Stack>
  );
};

export default TodoItem;
