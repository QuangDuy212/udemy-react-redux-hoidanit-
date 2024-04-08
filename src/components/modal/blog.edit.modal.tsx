import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { updateBlog, resetUpdate } from '../../redux/blog/blog.slide';
import { toast } from 'react-toastify';

const BlogEditModal = (props: any) => {
    const { isOpenEditModal, setIsOpenEditModal, dataBlog } = props;

    const dispatch = useAppDispatch();
    const isUpdateSuccess = useAppSelector(state => state.blog.isUpdateSuccess)

    const [id, setId] = useState();
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (dataBlog?.id) {
            setId(dataBlog?.id);
            setTitle(dataBlog?.title);
            setAuthor(dataBlog?.author);
            setContent(dataBlog?.content);
        }
    }, [dataBlog])

    useEffect(() => {
        if (isUpdateSuccess === true) {
            setIsOpenEditModal(false);
            setTitle("");
            setAuthor("");
            setContent("");
            toast('🦄 Wow so easy! Update succeed');
            //reset redux
            dispatch(resetUpdate())
        }
    }, [isUpdateSuccess])

    const handleSubmit = () => {
        if (!title) {
            alert("Title empty");
            return;
        }
        if (!author) {
            alert("Author empty");
            return;
        }
        if (!content) {
            alert("Content empty");
            return;
        }
        dispatch(updateBlog({ title, author, content, id }))
    }

    return (
        <>
            <Modal
                show={isOpenEditModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                onHide={() => props.onHide()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update A Blog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Author"
                        className="mb-3"
                    >
                        <Form.Control
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Content"
                        className="mb-3"
                    >
                        <Form.Control
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='warning'
                        onClick={() => setIsOpenEditModal(false)} className='mr-2'>Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BlogEditModal;