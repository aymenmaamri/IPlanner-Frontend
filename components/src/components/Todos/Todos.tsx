import { useRecoilState } from "recoil";
import { Todo, todosState } from "../state/TodosState";
import Accordion from "@mui/material/Accordion";
import { AddTodo } from "./AddTodo";
import {
  AccordionDetails,
  AccordionSummary,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Drag } from "./testComponents.tsx/drag";

export const Todos = () => {
  const [todos, setTodos] = useRecoilState(todosState);

  const addTodoHandler = (newTodo: Todo): void => {
    setTodos([...todos, newTodo]);
  };
  return <Drag />;
};

{
  /* <TableContainer sx={{ width: "50%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography fontSize={20}>Name</Typography>
            </TableCell>

            <TableCell align="center">
              <Typography fontSize={20}>Description</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontSize={20}>Status</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ marginTop: "16px" }}>
          {todos.length > 0 ? (
            todos.map((todo) => {
              return (
                <TableRow key={todo.id}>
                  <TableCell align="left">{todo.name}</TableCell>
                  <TableCell align="center">{todo.description}</TableCell>
                  <TableCell align="right">{todo.status}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <Typography marginTop={"16px"}>No open Todos</Typography>
          )}
        </TableBody>
      </Table>
      <div style={{ width: "50%", marginTop: "24px" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="create-todo"
            id="create-todo-head"
          >
            <Typography>Create a TODO task</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddTodo addTodoHandler={addTodoHandler} />
          </AccordionDetails>
        </Accordion>
      </div>
      
    </TableContainer> */
}
