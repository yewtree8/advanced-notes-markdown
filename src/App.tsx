import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom";
import NewNote from "./components/notes/NewNote";
import { Category, NoteData, RawNote } from "./types/NoteData";
import { useLocalStorage } from "./hook/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteList";
import NoteLayout from "./components/notes/display/NoteLayout";
import Note from "./components/notes/display/Note";
import EditNote from "./components/notes/EditNote";

const App = () => {

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

  const addCategory = (cat: Category) => {
    setCategories(prev => [...prev, cat]);
  }

  const onUpdateNote = (id: string, {categories, ...data}:NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if(note.id === id) {
            return {...note, ...data, catIds: cats.map(cat => cat.id) }
        } else {
          return note;
        }
      });
    })    
  }

  /**
   * Delete a note (from view)
   * @param id ID of note to delete.
   */
  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id);
    })
  }

  /**
   * We seperated the categories as their own thing inbetween
   * raw data and normal data, so this serves to 
   * Re build a normal set of 'notes' with a category type inside of it.
   * TODO this could be the reson for the 'pile on' bug.
   */
  const notesForLayout = useMemo(() => {
    return notes.map(note => {
      return {
        id: note.id,
        title: note.title,
        markdown: note.markdown,
        categories: cats.filter(cat => note.catIds.includes(cat.id)),
      }
    })
  }, [notes, cats]);

  return (
    <Container className="my-4">
    <Routes>
      <Route path="/" element={<NoteList availableCategories={cats} notes={notesWithCategories} />} />
      <Route path ="/new" 
      element ={<NewNote onSubmit={onCreateNote} 
      onAddCategory={addCategory}
      availableCategories={cats}/>}
      />
      <Route path ="/:id" 
      element={<NoteLayout notes={notesForLayout} />}>
        <Route index element={<Note onDeleteNote={onDeleteNote} />} />
        <Route path="edit"
         element={<EditNote
                  onSubmit={onUpdateNote} 
                  onAddCategory={addCategory} 
                  availableCategories={cats} />}/>
      </Route>
      <Route path="*" element = { <Navigate to="/" />} />
    </Routes>
    </Container>
  )
  
}

export default App;
