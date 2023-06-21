import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../config.js';
import Container from '../../Components/Container/Container.js';

const CreatePost = () => {
    const [ users, setUsers ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ userId, setUserId ] = useState('');
  
    useEffect(() => {
        axios.get(`${API_URL}/users`)
        .then(res => {
            setUserId(res.data[0].id);
            setUsers(res.data);
        })
    }, [])

    const titleHandler = (event) => setTitle(event.target.value);
    const bodyHandler = (event) => setBody(event.target.value);
    const userIdHandler = (event) => setUserId(event.target.value);
  
    const newPostHandler = (event) => {
      event.preventDefault();
  
      const newPost = {
        title: title,
        body: body,
        userId: Number(userId),
      };
  
      axios.post(`${API_URL}/posts`, newPost)
      .then(res => {
        setTitle('');
        setBody('');
      })
    }

    if (!users) {
        return;
    }
  
  return (
    <Container>
    <form onSubmit={newPostHandler}>
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

      <input type='submit' value='Create new post' />
    </form>
  </Container>
  )
}

export default CreatePost;