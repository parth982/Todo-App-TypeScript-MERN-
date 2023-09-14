import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { FormEvent, useContext, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import TodosContext from "../../Context/todos.context";
import { ITodo } from "../../interfaces";

const TodoItem: React.FC<{
  todo: ITodo;
  deleteTodo: (id: string) => void;
}> = ({ todo, deleteTodo }) => {
  const { dispatch } = useContext(TodosContext);
  const toast = useToast();
  const [isChecked, setIsChecked] = useState<boolean>(todo.status);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const labelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  interface IsTodo {
    label: string;
    description: string;
  }

  const checkTodo = () => {
    axios
      .patch(`http://localhost:4000/todos/${todo._id}`)
      .then(() => {
        dispatch({ type: "checkedTodo", id: todo._id });
      })
      .catch((err) => console.log(err));
  };

  const updateTodo = (data: IsTodo) => {
    axios
      .put(`http://localhost:4000/todos/${todo._id}`, data)
      .then(() => {
        onClose();
        dispatch({ type: "updateTodo", id: todo._id, todoItem: data });
        toast({
          title: "Todo Task Updated",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    checkTodo();
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const labelValue = labelRef.current?.value;
    const descValue = descRef.current?.value;

    if (labelValue && descValue) {
      const newTodo = {
        label: labelValue,
        description: descValue,
      };

      updateTodo(newTodo);
    }
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={submitHandler}>
              <FormControl isRequired>
                <FormLabel>Label</FormLabel>
                <Input type="text" ref={labelRef} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input type="text" ref={descRef} />
              </FormControl>
              <Button type="submit" mt={2}>
                Update
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Button onClick={onOpen}>Edit</Button>

      <Checkbox
        size={"lg"}
        isChecked={isChecked}
        onChange={handleCheckboxChange}
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
