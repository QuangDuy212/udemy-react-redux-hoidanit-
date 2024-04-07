import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { updateUser, resetUpdate } from '../../redux/user/user.slide';
import { toast } from 'react-toastify';

const UserEditModal = (props: any) => {
    const { isOpenEditModal, setIsOpenEditModal, dataUpdate } = props;

    const dispatch = useAppDispatch();
    const isUpdateSuccess = useAppSelector(state => state.user.isUpdateSuccess)

    const [id, setId] = useState();
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (dataUpdate?.id) {
            setId(dataUpdate?.id);
            setEmail(dataUpdate?.email);
            setName(dataUpdate?.name)
        }
    }, [dataUpdate])

    useEffect(() => {
        if (isUpdateSuccess === true) {
            setIsOpenEditModal(false);
            setEmail("");
            setName("");
            toast('🦄 Wow so easy! Update succeed');
            //reset redux
            dispatch(resetUpdate())
        }
    }, [isUpdateSuccess])

    const handleSubmit = () => {
        if (!email) {
            alert("email empty");
            return;
        }
        if (!name) {
            alert("name empty");
            return;
        }
        dispatch(updateUser({ email, name, id }))
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
                        Update A User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Name">
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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

export default UserEditModal;