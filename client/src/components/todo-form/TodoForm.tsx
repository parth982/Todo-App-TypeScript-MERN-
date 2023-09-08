import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useRef } from "react";
import { todosInterface } from "../../interfaces";

const TodoForm = () => {
  const toast = useToast();
  const labelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const todo: todosInterface = { label: "", description: "" }; // Initialize todo object

  const addTodo = async (todoData: todosInterface) => {
    try {
      await axios.post<todosInterface>("http://localhost:4000/todos", todoData);
      toast({
        title: "Todo Task Added",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (labelRef.current !== null) todo.label = labelRef.current.value;
    if (descRef.current !== null) todo.description = descRef.current.value;
    console.log(todo);
    addTodo(todo);
  };

  return (
    <Box textAlign={"center"} mt={5}>
      <Heading>To-do App</Heading>
      <Box
        maxWidth={"70%"}
        mt={10}
        mx={"auto"}
        p={"20px"}
        border={"1px solid white"}
      >
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
            Add Task
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default TodoForm;
