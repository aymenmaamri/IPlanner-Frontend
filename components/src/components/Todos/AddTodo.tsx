import { useState } from "react";
import { Todo, TodoPriority, TodoStatus } from "../state/TodosState";
import { v4 as uuidv4, v4 } from "uuid";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

type AddTodoProps = {
  addTodoHandler: (todo: Todo) => void;
};

export const AddTodo = ({ addTodoHandler }: AddTodoProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>(TodoPriority.MEDIUM);

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: v4(),
      name,
      description,
      priority: TodoPriority[priority as keyof typeof TodoPriority],
      resolved: false,
      status: TodoStatus.TODO,
    };
    addTodoHandler(newTodo);

  };

  return (
    <FormControl>
      <FormLabel htmlFor="taskName">Task</FormLabel>
      <TextField
        name="taskName"
        type="text"
        value={name}
        size="small"
        onChange={(e) => setName(e.target.value)}
      />
      <FormLabel htmlFor="description">Description</FormLabel>
      <TextField
        name="description"
        type="textbox"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControl>
        <FormLabel id="radio-buttons-group-label">Priority</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue={TodoPriority.MEDIUM}
          name="priority-buttons-group"
          row
          onChange={(e) => setPriority(e.target.value)}
        >
          <FormControlLabel
            value={TodoPriority.LOW}
            control={<Radio />}
            label="Low"
          />
          <FormControlLabel
            value={TodoPriority.MEDIUM}
            control={<Radio />}
            label="Medium"
          />
          <FormControlLabel
            value={TodoPriority.HIGH}
            control={<Radio />}
            label="High"
          />
        </RadioGroup>
      </FormControl>
      <Button onClick={handleAddTodo}>Add TODO</Button>
    </FormControl>
  );
};
