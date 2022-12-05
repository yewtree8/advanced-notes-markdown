import { Category, NoteData } from "../../types/NoteData";
import NoteForm from "../NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddCategory:(cat: Category) => void;
  availableCategories: Category[];
}

const NewNote = ({onSubmit, onAddCategory, availableCategories} : NewNoteProps) => {
  return (
    <>
    <h2 className="mb-4">New Note</h2>
    <NoteForm onSubmit={onSubmit} onAddCategory={onAddCategory} availableCategories={availableCategories}/>
    </>
  )
}

export default NewNote;
