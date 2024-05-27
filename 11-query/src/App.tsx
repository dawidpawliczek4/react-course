import Fab from "@mui/material/Fab";
import Header from "./components/Header";
import TableComponent from "./components/TableComponent";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddBookDialog from "./components/AddBookDialog";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-screen">
      <Header />
      <TableComponent />
      <Fab
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "3rem",
          height: "3rem",
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
        <AddBookDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default App;
