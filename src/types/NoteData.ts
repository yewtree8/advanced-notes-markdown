export type Note = {
    id: string
} & NoteData;

export type NoteData = {
    title: string;
    markdown: string;
    categories: Category[];
}

export type Category = {
    id: string;
    label: string;
}

export type RawNote = {
    id: string; 
} & RawNoteData;

export type RawNoteData = {
    title: string;
    markdown: string;
    catIds: string[];
}

