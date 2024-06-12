import React, { useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { TGenre } from "../types/types";

interface AddBookDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBookDialog: React.FC<AddBookDialogProps> = ({ open, setOpen }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(0);
  const [price, setPrice] = useState(0);

  const genre = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const link = "http://localhost:3000/genres";
      const response = await fetch(link);
      const data: TGenre[] = await response.json();
      return data;
    },
  });

  if (genre.isLoading) {
    return <div>Loading...</div>;
  }

  if (genre.isError) {
    return <div>Error...</div>;
  }

  if (!genre.data) {
    return <div>No data...</div>;
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        padding: "24px",
      }}
    >
      <DialogTitle>Add new book</DialogTitle>
      <div className="flex flex-col gap-y-4 px-10 ">
        <TextField
          required
          label={"Title"}
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          required
          label={"Author"}
          value={author}
          type="text"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <TextField
          required
          label={"Year"}
          value={year}
          type="number"
          onChange={(e) => {
            setYear(parseInt(e.target.value));
          }}
        />
        <TextField
          required
          label={"Description"}
          multiline
          rows={3}
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          required
          label={"Copies"}
          value={copies}
          type="number"
          onChange={(e) => {
            setCopies(parseInt(e.target.value));
          }}
        />
        <TextField
          required
          label={"Price"}
          value={price}
          type="number"
          onChange={(e) => {
            setPrice(parseFloat(e.target.value));
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedGenre}
            label="Age"
            onChange={(event) => {
              setSelectedGenre(event.target.value);
            }}
          >
            {genre.data.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <DialogActions>
        <button onClick={() => setOpen(false)}>Cancel</button>
        <button onClick={() => setOpen(false)}>Add</button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookDialog;
