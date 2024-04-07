import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { createNewUser, resetCreate } from '../../redux/user/user.slide';

const UserCreateModal = (props) => {

  // PROPS:
  const { setIsOpenCreateModal } = props;
  // LIBRARY:
  const dispatch = useAppDispatch();

  // STATE:
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  // REDUX: 
  const isCreateSuccess = useAppSelector(state => state.user.isCreateSuccess);
  // FUNCTION:

  useEffect(() => {
    if (isCreateSuccess === true) {
      setIsOpenCreateModal(false);
      setEmail("");
      setName("");
      toast('🦄 Wow so easy! Create Succeed');
      //reset redux:
      dispatch(resetCreate());
    }
  }, [isCreateSuccess])

  const handleSubmit = () => {
    if (!email) {
      toast.error("Email is invalid");
      return;
    }
    if (!name) {
      toast.error("Name is invalid");
      return;
    }
    dispatch(createNewUser({ email, name }));
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
          ADD A NEW USER
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Name"
        >
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
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

export default UserCreateModal;