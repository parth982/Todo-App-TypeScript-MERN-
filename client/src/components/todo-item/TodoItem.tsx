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
  Text,
  useDisclosure,
  useToast,
  Flex, // Added Flex
} from "@chakra-ui/react";
import axios from "axios";
import React, { FormEvent, useContext, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import TodosContext from "../../Context/todos.context";
import { ITodo } from "../../interfaces";

const TodoItem: React.FC<{
  todo: ITodo;
  deleteTodo: (id: string) => void;
  editButton?: boolean;
  deleteButton?: boolean;
}> = ({ todo, deleteTodo, editButton = true, deleteButton = true }) => {
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
    <Flex
      p={4}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.300"
      boxShadow="sm"
      bg="white"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <div>
        <Text fontWeight="bold" fontSize="xl">
          {todo.label}
        </Text>
        <Text fontSize="lg" color="gray.600">
          {todo.description}
        </Text>

        <Checkbox
          size={"lg"}
          isChecked={isChecked}
          onChange={handleCheckboxChange}
          colorScheme="green"
          mt={2}
        >
          <Text fontSize={"lg"} fontFamily={"cursive"}>
            Status
          </Text>
        </Checkbox>
      </div>

      <div>
        {editButton && (
          <Button
            leftIcon={<FaEdit />}
            colorScheme="teal"
            variant="outline"
            onClick={onOpen}
          >
            Edit
          </Button>
        )}

        {deleteButton && (
          <IconButton
            colorScheme="red"
            aria-label="Delete Todo"
            icon={<FaTrash />}
            onClick={() => deleteTodo(todo._id)}
            size="sm"
            ml={2}
          />
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent borderRadius="md" boxShadow="lg">
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form onSubmit={submitHandler}>
              <FormControl isRequired>
                <FormLabel>Label</FormLabel>
                <Input type="text" ref={labelRef} defaultValue={todo.label} />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  ref={descRef}
                  defaultValue={todo.description}
                />
              </FormControl>

              <Button
                type="submit"
                mt={4}
                colorScheme="teal"
                size="sm"
                float="right"
              >
                Update
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default TodoItem;
