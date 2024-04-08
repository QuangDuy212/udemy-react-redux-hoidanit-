import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { createNewBlog, resetCreate } from '../../redux/blog/blog.slide';

const BlogCreateModal = (props) => {

    // PROPS:
    const { setIsOpenCreateModal } = props;
    // LIBRARY:
    const dispatch = useAppDispatch();

    // STATE:
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    // REDUX: 
    const isCreateSuccess = useAppSelector(state => state.blog.isCreateSuccess);
    // FUNCTION:

    useEffect(() => {
        if (isCreateSuccess === true) {
            setIsOpenCreateModal(false);
            setTitle("");
            setAuthor("");
            setContent("");
            toast('🦄 Wow so easy! Create Succeed');
            //reset redux:
            dispatch(resetCreate());
        }
    }, [isCreateSuccess])

    const handleSubmit = () => {
        if (!title) {
            toast.error("Title is invalid");
            return;
        }
        if (!author) {
            toast.error("Author is invalid");
            return;
        }
        if (!content) {
            toast.error("Content is invalid");
            return;
        }
        dispatch(createNewBlog({ title, author, content }));
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new blog
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Title"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Author"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Author"
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Content"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Content"
                        onChange={(event) => setContent(event.target.value)}
                    />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='warning'
                    onClick={props.onHide}
                >Cancel</Button>
                <Button
                    onClick={() => { handleSubmit() }}
                >Add</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BlogCreateModal;