import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../Container/Container'
import { API_URL } from '../../config';

const PostForm = ({ onPostFormSubmit, initialData }) => {
    const [ users, setUsers ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ userId, setUserId ] = useState('');

    useEffect(() => {
      axios.get(`${API_URL}/users`)
      .then(res => {
          setUsers(res.data);
          if (!initialData) {
            setUserId(res.data[0].id);
          }
      }).catch(err => toast.error(err.message));
    }, [initialData])

    const titleHandler = (event) => setTitle(event.target.value);
    const bodyHandler = (event) => setBody(event.target.value);
    const userIdHandler = (event) => setUserId(event.target.value);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setBody(initialData.body);
            setUserId(initialData.userId);
        }
    }, [initialData])
  
    const postHandler = (event) => {
      event.preventDefault();
      let newPost = {};

      if (initialData) {
        newPost = {...initialData, title, body, userId: Number(userId)};
      } else {
          newPost = {
            title: title,
            body: body,
            userId: Number(userId),
          };
      }
  
      onPostFormSubmit(newPost);
    }

    if (!users) {
      return;
    }

  return (
    <Container>
    <form onSubmit={postHandler}>
      <div className='form-control'>
        <label htmlFor='post-title'>Title: </label>
        <input type='text' name='post-title' id='post-title' value={title} onChange={titleHandler} />
      </div>

      <div className='form-control'>
        <label htmlFor='post-body'>Body: </label>
        <textarea type='text' name='post-body' id='post-body' value={body} onChange={bodyHandler}></textarea>
      </div>

      <div className='form-control'>
        <label htmlFor='post-author'>Author: </label>
        <select value={userId} onChange={userIdHandler} name='post-author' id='post-author'>
          {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
        </select>
      </div>

      <button type='submit'>{initialData ? 'Save changes' : 'Create new Post'}</button>
    </form>
  </Container>
  )
}

export default PostForm;