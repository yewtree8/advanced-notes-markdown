import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateableReactSelect from "react-select/creatable";
import {Category, NoteData } from '../types/NoteData';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
}

const NoteForm = ({onSubmit} : NoteFormProps)  => {

  const refTitle = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [selectedCats, setSelectedCategories] = useState<Category[]>([]); 

  const submitSave = (e:FormEvent) => {
    e.preventDefault();

    onSubmit({
        title: refTitle.current!.value,
        markdown: contentRef.current!.value,
        categories: [],
    });
  }

  return (
    <Form onSubmit={submitSave}>
        <Stack gap={3}>
            <Row>
                <Col>
                    <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={refTitle} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='categories'>
                        <Form.Label>Categories</Form.Label>
                        <CreateableReactSelect value={selectedCats.map(cat => {
                            return {
                                label: cat.label, value : cat.id,
                            }})}
                            onChange={cats =>{
                                setSelectedCategories(cats.map(cat => {
                                    return { label: cat.label, id: cat.value}
                                }))
                            }}
                            isMulti />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId='markdown'>
                <Form.Label>Body</Form.Label>
                <Form.Control required as='textarea'
                 ref={contentRef}
                  rows={10} />
            </Form.Group>

            <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button type="submit" variant="primary">Save</Button>
                <Link to='..'>
                <Button type="button" variant="outline-secondary">Cancel</Button>
                </Link>
            </Stack>
        </Stack>
    </Form>
  )
}

export default NoteForm;
