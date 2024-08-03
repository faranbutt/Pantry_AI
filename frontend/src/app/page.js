"use client";
import styles from "./page.module.css";
import { Box, Stack, TextField, Button} from "@mui/material";
import { useState } from "react";
export default function Home() {
  const [item, setItem] = useState("");
  const [count, setCount] = useState(0);
  return (
    <Box>
      <Box>Pantry App</Box>
      <Box>{count}</Box>

      <Box>
        <Stack width="100%" direction={"row"} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <Button variant="outlined" onClick={() => setCount(count + 1)}>
            Add
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
