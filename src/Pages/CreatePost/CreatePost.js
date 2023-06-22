import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config.js';
import Container from '../../Components/Container/Container.js';
import PostForm from '../../Components/PostForm/PostForm.js';
import { useEffect, useState } from 'react';

const CreatePost = () => {
  const navigator = useNavigate();
  // const [ users, setUsers ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

//   useEffect(() => {
//     axios.get(`${API_URL}/users`)
//     .then(res => {
//         setUsers(res.data);
//         setErrorMessage('');
//     }).catch(err => setErrorMessage(err.massage))
// }, [])

    const newPostHandler = (newPost) => {
      axios.post(`${API_URL}/posts`, newPost)
      .then(res => navigator(`/posts/${res.data.id}`))
      .catch(err => setErrorMessage(err.message));
    }

    // if (!users) {
    //   return;
    // }

  return (
  <Container>
    {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
    <PostForm onPostFormSubmit={newPostHandler} />
  </Container>
  )
}

export default CreatePost;