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
    <Box textAlign={"center"} mt={5}>
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
