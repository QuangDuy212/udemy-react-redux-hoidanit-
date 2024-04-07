import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hook';
import { createNewUser } from '../../redux/user/user.slide';

const UserCreateModal = (props) => {

  const dispatch = useAppDispatch();

  // STATE:
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  // FUNCTION:
  const handleSubmit = () => {
    if (!email) {
      toast.error("Email is invalid");
      return;
    }
    if (!name) {
      toast.error("Name is invalid");
      return;
    }
    console.log(">>> check create: ", { email, name })
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