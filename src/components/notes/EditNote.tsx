import { Category, NoteData } from "../../types/NoteData";
import NoteForm from "../NoteForm";
import { useNote } from "./display/NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddCategory:(cat: Category) => void;
  availableCategories: Category[];
}

const EditNote = ({onSubmit, onAddCategory, availableCategories} : EditNoteProps) => {
  
  const note = useNote();
  
  return (
    <>
    <h2 className="mb-4">Edit Note</h2>
    <NoteForm
    title={note.title}
    markdown={note.markdown}
    categories={note.categories}
     onSubmit={data => onSubmit(note.id, data)} 
     onAddCategory={onAddCategory} 
     availableCategories={availableCategories}/>
    </>
  )
}

export default EditNote;
