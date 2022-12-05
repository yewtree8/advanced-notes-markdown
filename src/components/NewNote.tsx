
type NewNoteProps = {
    id?: number;
    title?: string;
}

const NewNote = ({id, title} : NewNoteProps) => {
  return (
    <h2>New Note</h2>
  )
}

export default NewNote;
