import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom";
import NewNote from "./components/notes/NewNote";
import { Category, RawNote } from "./types/NoteData";
import { useLocalStorage } from "./useLocalStorage";

const AdvancedNotes = () => {
  
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [cats, setCategories] = useLocalStorage<Category[]>("CATEGORIES", []);

  return (
    <Container className="my-4">
    <Routes>
      <Route path="/" element = { <h1> Home </h1> }/>
      <Route path ="/new" element = { <NewNote />} />
      <Route path ="/:id">
        <Route index element = {<h1>Base Note Index ID</h1>} />
        <Route path="edit" element ={<h1>We`re now editing</h1>} />
      </Route>
      <Route path ="*" element = { <Navigate to="/" />} />
    </Routes>
    </Container>
  )
  
}

export default AdvancedNotes;
