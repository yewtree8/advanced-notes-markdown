import { Note } from "../../../types/NoteData";

type NoteCardProps = {
    theNote: Note;
}

const NoteCard = ({theNote} : NoteCardProps) => {

    return (
    <>
      <h2>{theNote.title}</h2>
    </>
    )
  
}

export default NoteCard;
