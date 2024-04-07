
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchListUsers } from '../redux/user/user.slide';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import './users.table.scss';
import UserCreateModal from './modal/user.create.modal';
import UserEditModal from './modal/user.edit.modal';
import UserDeleteModal from './modal/user.delete.modal';

interface IUser {
    name: string,
    email: string,
    id: string
}

const UsersTable = () => {
    // LIBRARY:
    const dispatch = useAppDispatch();

    // REDUX:
    const users = useAppSelector(state => state.user.listUsers);

    // STATE: 
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    // FUNCTION: 
    useEffect(() => {
        dispatch(fetchListUsers());
        toast('🦄 Wow so easy!');
    }, []);

    // update data:
    const handleBtnUpdate = (user: IUser) => {
        setIsOpenEditModal(true);
        setDataUpdate(user);
    }

    const handleCloseUpdateModal = () => {
        setIsOpenEditModal(false);
        setDataUpdate({});
    }

    // delete user: 
    const hanldeBtnDelete = (user: IUser) => {
        setIsOpenDeleteModal(true);
        setDataDelete(user);
    }
    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
        setDataDelete("");
    }

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
                                            onClick={() => { handleBtnUpdate(user) }}
                                        >Edit</Button>
                                        <Button
                                            variant="danger"
                                            className='table-user__body--btn'
                                            onClick={() => { hanldeBtnDelete(user) }}
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
                onHide={() => setIsOpenCreateModal(false)}
                setIsOpenCreateModal={setIsOpenCreateModal}
            />
            <UserEditModal
                isOpenEditModal={isOpenEditModal}
                onHide={() => handleCloseUpdateModal()}
                setIsOpenEditModal={setIsOpenEditModal}
                dataUpdate={dataUpdate}
            />
            <UserDeleteModal
                isOpenDeleteModal={isOpenDeleteModal}
                onHide={() => handleCloseDeleteModal()}
                setIsOpenDeleteModal={setIsOpenDeleteModal}
                dataDelete={dataDelete}
            />
        </>
    );
}

export default UsersTable;