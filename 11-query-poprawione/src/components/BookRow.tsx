import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BookRowProps {
  row: {
    id: string;
    title: string;
    author: string;
    year: string;
    description: string;
    copies: number;
    price: number;
    genreId: string;
  };
  genres: {
    id: string;
    name: string;
  }[];
}

const BookRow: React.FC<BookRowProps> = ({ row, genres }) => {
  const rowGenre = genres.find((genre) => genre.id === row.genreId);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const link = `http://localhost:3000/books/${row.id}`;
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(link, {
        method: "DELETE",
      });
      return response.json();
    },
  });

  const handleDeleteProduct = async () => {
    mutation.mutate();
    setOpen(false);
  };

  if (mutation.isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["books"] });
  }

  return (
    <>
      <TableRow
        key={row.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{row.author}</TableCell>
        <TableCell>{row.year}</TableCell>
        <TableCell>{row.copies}</TableCell>
        <TableCell>{row.price}$</TableCell>
        <TableCell>{rowGenre?.name ?? "Undefined..."}</TableCell>
        <TableCell>
          <button>
            <EditIcon sx={{ width: "20px" }} />
          </button>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteOutlineIcon sx={{ width: "20px" }} />
          </button>
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteProduct}>YES</Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookRow;
