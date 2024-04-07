import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import Form from 'react-bootstrap/Form';
import { changeMode } from '../redux/app/app.slide';
import { useEffect } from 'react';

const Header = () => {
    const users = useAppSelector(state => state.user.listUsers);

    const mode = useAppSelector(state => state.app.mode);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            body.setAttribute('data-bs-theme', mode)
        }
    }, [mode])

    return (
        <Navbar className="bg-body-tertiary " data-bs-theme={mode}>
            <Container>
                <Navbar.Brand href="#home">Hoi Dan IT Redux {users.length}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Form>
                        <Form.Check
                            value={mode}
                            onChange={(e) => { dispatch(changeMode((e.target.value === "light" ? "dark" : "light"))) }}
                            type="switch"
                            id="custom-switch"
                            label={(mode == "light") ?
                                <Navbar.Text>
                                    Light mode
                                </Navbar.Text>
                                :
                                <Navbar.Text>
                                    Dark mode
                                </Navbar.Text>
                            }
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;