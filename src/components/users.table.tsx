
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchListUsers } from '../redux/user/user.slide';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import './users.table.scss';
import UserCreateModal from './modal/user.create.modal';


const UsersTable = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.user.listUsers);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);


    useEffect(() => {
        dispatch(fetchListUsers());
        toast('🦄 Wow so easy!');
    }, [])

    return (
        <>
            <div className='table-user'>
                <div className='table-user__header'>
                    <label
                        className='table-user__header--title'
                    >Table Users</label>
                    <Button
                        variant="primary"
                        className='table-user__header--btn'
                        onClick={() => setIsOpenCreateModal(true)}
                    >Add New</Button>
                </div>
                <Table
                    striped
                    bordered
                    hover
                    className='table-user__body'
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className='table-user__body--btn'
                                        >Edit</Button>
                                        <Button
                                            variant="danger"
                                            className='table-user__body--btn'
                                        >Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>


            </div>

            <UserCreateModal
                show={isOpenCreateModal}
                setIsOpenCreateModal={setIsOpenCreateModal}
                onHide={() => setIsOpenCreateModal(false)}
            />
        </>
    );
}

export default UsersTable;