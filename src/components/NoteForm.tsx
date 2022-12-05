import React from 'react'
import { Col, Form, Row, Stack } from 'react-bootstrap';

const NoteForm = () => {
  return (
    <Form>
        <Stack gap={3}>
            <Row>
                <Col>
                    <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='Categories'>
                        <Form.Label>Categories</Form.Label>
                        <Form.Control required />
                    </Form.Group>
                </Col>
            </Row>
        </Stack>
    </Form>
  )
}

export default NoteForm;
