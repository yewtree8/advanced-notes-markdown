import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom";
import NewNote from "./components/notes/NewNote";
import { Category, NoteData, RawNote } from "./types/NoteData";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";

const AdvancedNotes = () => {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [cats, setCategories] = useLocalStorage<Category[]>("CATEGORIES", []);

  const notesWithCategories = useMemo(() => {
    return notes.map(note => {
      return { ...note, cats: cats.filter(cat => note.catIds.includes(cat.id))}
    })
  }, [notes, cats]);

  const onCreateNote = ({ categories, ...data} : NoteData) => {
      setNotes(prevNotes => {
        return [...prevNotes, {...data, id: uuidV4(), catIds: cats.map(cat => cat.id) },
        ]
      })     
  }

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
