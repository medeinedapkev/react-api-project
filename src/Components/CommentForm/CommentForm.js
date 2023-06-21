import { useState } from 'react';

const CommentForm = ({ id, onCommentFormSubmit }) => {

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ email, setEmail ] = useState('');
  
    const titleHandler = (event) => setTitle(event.target.value);
    const bodyHandler = (event) => setBody(event.target.value);
    const emailHandler = (event) => setEmail(event.target.value);
    
    const commentFormHandler = (event) => {
        event.preventDefault();

        const newComment = {
            name: title,
            body: body,
            postId: Number(id),
            email: email,
        }

        onCommentFormSubmit(newComment);
    }

  return (
    <form onSubmit={commentFormHandler}>
    <div className='form-control'>
      <label htmlFor='post-title'>Title: </label>
      <input type='text' name='post-title' id='post-title' value={title} onChange={titleHandler} />
    </div>

    <div className='form-control'>
      <label htmlFor='post-body'>Body: </label>
      <textarea type='text' name='post-body' id='post-body' value={body} onChange={bodyHandler}></textarea>
    </div>

    <div className='form-control'>
      <label htmlFor='email'>Email: </label>
      <input type='email' name='email' id='email' value={email} onChange={emailHandler} />
    </div>

    <input type='submit' value='Create new comment' />
  </form>
  )
}

export default CommentForm;