import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useRef } from "react";

const TodoForm = () => {
  const labelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const todo = { label: "", description: "" };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (labelRef.current !== null) todo.label = labelRef.current.value;
    if (descRef.current !== null) todo.description = descRef.current.value;
    console.log(todo);
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
