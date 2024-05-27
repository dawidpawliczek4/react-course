import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { useState } from "react";
import BookRow from "./BookRow";
import { useQuery } from "@tanstack/react-query";
import { TBook, TGenre } from "../types/types";

const TableComponent: React.FC = ({}) => {
  const fetchBooks = async () => {
    const link = "http://localhost:3000/books";
    const response = await fetch(link);
    const data: TBook[] = await response.json();
    console.log(data);
    return data;
  };

  const fetchGenres = async () => {
    const link = "http://localhost:3000/genres";
    const response = await fetch(link);
    const data: TGenre[] = await response.json();
    return data;
  };

  const books = useQuery({ queryKey: ["books"], queryFn: fetchBooks });
  const genres = useQuery({ queryKey: ["genres"], queryFn: fetchGenres });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  if (books.isLoading || genres.isLoading) {
    return <div>Loading...</div>;
  }

  if (books.isError || genres.isError) {
    return <div>Error...</div>;
  }

  if (!books.data || !genres.data) {
    return <div>No data...</div>;
  }

  const slicedRows = books.data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <TableContainer component={Paper}>
        {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Publication date</TableCell>
              <TableCell>Number of copies</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedRows.map((row) => (
              <BookRow row={row} genres={genres.data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPage={rowsPerPage}
        page={page}
        count={books.data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default TableComponent;
