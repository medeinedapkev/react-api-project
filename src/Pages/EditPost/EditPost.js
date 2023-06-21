import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config.js';
import Container from '../../Components/Container/Container.js';
import PostForm from '../../Components/PostForm/PostForm.js';

const EditPost = () => {
    const { id } = useParams();
    const navigator = useNavigate();

    const [ users, setUsers ] = useState('');
    const [ post, setPost ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/posts/${id}`)
        .then(res => {
          setPost(res.data);
          setErrorMessage('');
        }).catch(err => setErrorMessage(err.message));
    }, [id])
  
    useEffect(() => {
        axios.get(`${API_URL}/users`)
        .then(res => {
            setUsers(res.data);
            setErrorMessage('');
        }).catch(err => setErrorMessage(err.message))
    }, [])

    const editPostHandler = (editPost) => {
        axios.patch(`${API_URL}/posts/${id}`, editPost)
        .then(res => navigator(`/posts/${res.data.id}`))
        .catch(err => setErrorMessage(err.message));
      }
  
      if (!users || !post) {
          return;
      }

  return (
    <Container>
      {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
      <PostForm onPostFormSubmit={editPostHandler} usersData={users} initialData={post} />     
    </Container>
  )
}

export default EditPost;