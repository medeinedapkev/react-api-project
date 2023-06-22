import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config.js';
import Container from '../../Components/Container/Container.js';
import PostForm from '../../Components/PostForm/PostForm.js';

const EditPost = () => {
    const { id } = useParams();
    const navigator = useNavigate();

    const [ post, setPost ] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/posts/${id}`)
        .then(res => setPost(res.data))
        .catch(err => toast.error(err.message));
    }, [id])

    const editPostHandler = (editPost) => {
        axios.patch(`${API_URL}/posts/${id}`, editPost)
        .then(res => {
          navigator(`/posts/${res.data.id}`);
          toast.success('Post was successfully edited')
        }).catch(err => toast.error(err.message));
      }
  
      if (!post) {
          return;
      }

  return (
    <Container>
      <PostForm onPostFormSubmit={editPostHandler} initialData={post} />     
    </Container>
  )
}

export default EditPost;