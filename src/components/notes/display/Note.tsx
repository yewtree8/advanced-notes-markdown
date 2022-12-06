import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import styles from "../../../style/notes/NoteList.module.css";
import { Link, useNavigate } from "react-router-dom";

const Note = () => {

    const note = useNote();

    return (
        <Row className="align-items-center mb-4">
            <Col className="align-items-left mb-1">
            <h1>{note.title}</h1>
            {note.categories.length > 0 && (
                <Stack gap={1} direction="horizontal"
                    className="justify-content-left flex-wrap">
                        {note.categories?.map(cat => {
                            return (
                            <Badge className={`text-truncate ${styles.badge}`} key={cat.id}>
                                  {cat.label}
                             </Badge>)
                         })}
                    </Stack>
                 )}
            </Col>
            <Col xs="auto">
            <Stack gap={1} direction="horizontal">
                <Link to={`/${note.id}/edit`}>
                    <Button variant="primary">Edit</Button>
                </Link>
                <Button variant="outline-danger">Delete</Button>
                <Link to="..">
                <Button variant="outline-secondary">Back</Button>
                </Link>
            </Stack>
        </Col>
        </Row>
 )

}

export default Note;