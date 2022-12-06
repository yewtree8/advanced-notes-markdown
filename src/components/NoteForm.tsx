import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreateableReactSelect from "react-select/creatable";
import {Category, NoteData } from '../types/NoteData';
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddCategory:(cat: Category) => void;
    availableCategories: Category[];

} & Partial<NoteData>

const NoteForm = ({onSubmit, onAddCategory, availableCategories, title="", markdown="", categories=[]} : NoteFormProps)  => {

  const refTitle = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [selectedCats, setSelectedCategories] = useState<Category[]>(categories); 
  const navigate = useNavigate();

  const submitSave = (e:FormEvent) => {
    e.preventDefault();

    onSubmit({
        title: refTitle.current!.value,
        markdown: contentRef.current!.value,
        categories: selectedCats || [],
    });

    navigate('..');
  }

  return (
    <Form onSubmit={submitSave}>
        <Stack gap={3}>
            <Row>
                <Col>
                    <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={refTitle} required defaultValue={title} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='categories'>
                        <Form.Label>Categories</Form.Label>
                        <CreateableReactSelect 
                            onCreateOption={label => {
                                const newCat = { id: uuidV4(), label }
                                onAddCategory(newCat);
                                setSelectedCategories(prev => [...prev, newCat])
                            }}
                            options={availableCategories.map(cat => {
                                return {
                                    label: cat.label, value: cat.id,
                                }
                            })}
                            value={selectedCats.map(cat => {
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
                <Form.Control required defaultValue={markdown} as='textarea'
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
