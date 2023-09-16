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
import { FormEvent, useContext, useRef } from "react";
import { TodosContext } from "../../Context/todos.provider";
import { ITodo } from "../../interfaces";

const TodoForm = () => {
  const toast = useToast();
  const labelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(TodosContext);

  interface IsTodo {
    label: string;
    description: string;
  }

  const addTodo = async (todoData: IsTodo) => {
    try {
      const response = await axios.post<ITodo>(
        "http://localhost:4000/todos",
        todoData
      );

      dispatch({ type: "addTodo", todoItem: response.data });

      toast({
        title: "Todo Task Added",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      if (labelRef.current) labelRef.current.value = "";
      if (descRef.current) descRef.current.value = "";
    } catch (error) {
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
    <Box textAlign={"center"}>
      <Heading as="h1" size="xl" mt="6">
        Todo-Form
      </Heading>
      <Box
        maxW={"500px"}
        mx={"auto"}
        p={"10px"}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <form onSubmit={submitHandler}>
          <FormControl isRequired mt={4}>
            <FormLabel>Label</FormLabel>
            <Input type="text" ref={labelRef} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Description</FormLabel>
            <Input type="text" ref={descRef} />
          </FormControl>
          <Button type="submit" mt={4} colorScheme="pink">
            Add Task
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default TodoForm;
