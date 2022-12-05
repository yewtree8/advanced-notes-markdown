
import { useState } from 'react';
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Category } from '../types/NoteData';


type NoteListProps = {
    availableCategories: Category[];
}

const NoteList = ({availableCategories} : NoteListProps) => {

  const[selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const[title, setTitle] = useState(""); 
 

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
    </>
)
}

export default NoteList;