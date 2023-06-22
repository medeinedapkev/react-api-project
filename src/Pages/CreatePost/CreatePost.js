import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config.js';
import Container from '../../Components/Container/Container.js';
import PostForm from '../../Components/PostForm/PostForm.js';

const CreatePost = () => {
  const navigator = useNavigate();

    const newPostHandler = (newPost) => {
      axios.post(`${API_URL}/posts`, newPost)
      .then(res => {
        navigator(`/posts/${res.data.id}`);
        toast.success('New post created')
      }).catch(err => toast.error(err.message));
    }

  return (
  <Container>
    <PostForm onPostFormSubmit={newPostHandler} />
  </Container>
  )
}

export default CreatePost;