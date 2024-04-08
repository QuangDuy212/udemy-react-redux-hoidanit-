
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import './users.table.scss';
import { fetchlistBlogs } from '../redux/blog/blog.slide';
import './blogs.table.scss';
import BlogCreateModal from './modal/blog.create.modal';
import BlogEditModal from './modal/blog.edit.modal';
import BlogDeleteModal from './modal/blog.delete.modal';

interface IBlog {
    id: string,
    title: string,
    author: string,
    content: string
}
const BlogsTable = () => {
    // LIBRARY:
    const dispatch = useAppDispatch();

    // REDUX:
    const blogs = useAppSelector(state => state.blog.listBlogs);

    // STATE: 
    const [dataBlog, setDataBlog] = useState({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // FUNCTION: 
    useEffect(() => {
        dispatch(fetchlistBlogs());
        toast('🦄 Wow so easy!');
    }, []);

    const handleClickEdit = (blog: IBlog) => {
        setIsOpenEditModal(true);
        setDataBlog(blog);
    }

    const handleClickDelete = (blog: IBlog) => {
        setIsOpenDeleteModal(true);
        setDataBlog(blog);
    }

    return (
        <>
            <div className='table-blog'>
                <div className='table-blog__header'>
                    <label
                        className='table-blog__header--title'
                    >Table Blogs</label>
                    <Button
                        variant="primary"
                        className='table-blog__header--btn'
                        onClick={() => setIsOpenCreateModal(true)}
                    >Add New</Button>
                </div>
                <Table
                    striped
                    bordered
                    hover
                    className='table-blog__body'
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map(blog => {
                            return (
                                <tr key={blog.id}>
                                    <td>{blog.id}</td>
                                    <td>{blog.title}</td>
                                    <td>{blog.author}</td>
                                    <td>{blog.content}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className='table-blog__body--btn'
                                            onClick={() => handleClickEdit(blog)}
                                        >Edit</Button>
                                        <Button
                                            variant="danger"
                                            className='table-blog__body--btn'
                                            onClick={() => handleClickDelete(blog)}
                                        >Delete</Button>
                                    </td>
                                </tr>
                            )

                        })}

                    </tbody>
                </Table>
                <BlogCreateModal
                    show={isOpenCreateModal}
                    setIsOpenCreateModal={setIsOpenCreateModal}
                    onHide={() => setIsOpenCreateModal(false)}
                />
                <BlogEditModal
                    isOpenEditModal={isOpenEditModal}
                    onHide={() => setIsOpenEditModal(false)}
                    setIsOpenEditModal={setIsOpenEditModal}
                    dataBlog={dataBlog}
                />
                <BlogDeleteModal
                    isOpenDeleteModal={isOpenDeleteModal}
                    setIsOpenDeleteModal={setIsOpenDeleteModal}
                    onHide={() => setIsOpenDeleteModal(false)}
                    dataBlog={dataBlog}
                />
            </div >
        </>
    );
}

export default BlogsTable;