import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TodosProvider } from "./Context/todos.provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <TodosProvider>
      <App />
    </TodosProvider>
  </ChakraProvider>
);
