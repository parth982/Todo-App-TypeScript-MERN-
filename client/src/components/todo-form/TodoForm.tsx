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
import { FormEvent, useRef, useContext } from "react";
import { todosInterface } from "../../interfaces";
import { TodosContext } from "../../Context/todos.provider";

const TodoForm = () => {
  const toast = useToast();
  const labelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(TodosContext);

  const addTodo = async (todoData: todosInterface) => {
    try {
      const response = await axios.post<todosInterface>(
        "http://localhost:4000/todos",
        todoData
      );

      dispatch({ type: "setTodo", todoItem: response.data });

      toast({
        title: "Todo Task Added",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      // Clear the input fields
      if (labelRef.current) labelRef.current.value = "";
      if (descRef.current) descRef.current.value = "";
    } catch (error) {
      // Handle errors
      console.error(error);
    }
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

      addTodo(newTodo);
    }
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
