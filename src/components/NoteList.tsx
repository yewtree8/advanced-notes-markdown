
import { useMemo, useState } from 'react';
import { Button, Card, Col, Form, Row, Stack, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Category} from '../types/NoteData';
import styles from "../style/notes/NoteList.module.css";

type SimpleNote = {
    cats: Category[];
    title: string;
    id: string;
}

type NoteListProps = {
    availableCategories: Category[];
    notes: SimpleNote[];
}

const NoteCard = ({id, title, cats} : SimpleNote) => {
    return (
        <>
        <Card 
        as={Link} 
        to={`/${id}`} 
        className={`h-100 text-reset text-decoration-none ${styles.card}`}
        >
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-4">{title}</span>
                    {cats.length > 0 && (
                        <Stack gap={1} direction="horizontal"
                        className="justify-content-center flex-wrap">
                            {cats.map(cat => {
                                return (
                                <Badge className={`text-truncate ${styles.badge}`} key={cat.id}>
                                    {cat.label}
                                </Badge>)
                            })}
                        </Stack>
                    )} 
                </Stack>
            </Card.Body>
        </Card>
        </>
    )
}

const NoteList = ({availableCategories, notes} : NoteListProps) => {

  const[selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const[title, setTitle] = useState(""); 
 
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
        return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
         (selectedCategories.length === 0 ||
             selectedCategories.every(cat =>
            note.cats.some(catTag => catTag.id === cat.id)))
    })
  },[title, selectedCategories, notes]);


  return (
    <>
    <Row className='align-items-center mb-4'>
        <Col><h1>My Notes</h1></Col>
        <Col xs="auto">
            <Stack gap={2} direction="horizontal">
                <Link to="/new">
                    <Button variant="primary">Create</Button>
                </Link>
                <Button variant="outline-secondary">Edit Categories</Button>
            </Stack>
        </Col>
    </Row>
    <Form>
        <Row className="mt-2 mb-4">
            <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="categories">
                    <Form.Label>Categories</Form.Label>
                        <ReactSelect 
                            value={selectedCategories.map(cat => {
                                return {
                                    label : cat.label, value : cat.id
                                }
                            })}
                            options={availableCategories.map(cat => {
                                return {
                                    label: cat.label, value: cat.id,
                                }
                            })}
                            onChange={cats =>{
                                setSelectedCategories(cats.map(cat => {
                                    return { label: cat.label, id: cat.value}
                                }))
                            }}
                            isMulti 
                        />
                </Form.Group>
             </Col>
        </Row>
    </Form>
    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
            <Col key={note.id}>
                <NoteCard title={note.title} id={note.id} cats={note.cats} />
            </Col>
        ))}
    </Row> 
    </>
)


}


export default NoteList;