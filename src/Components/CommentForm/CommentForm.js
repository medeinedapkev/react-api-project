import { useEffect, useState } from 'react';

const CommentForm = ({ postId, onCommentFormSubmit, initialData }) => {

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ email, setEmail ] = useState('');
  
    const titleHandler = (event) => setTitle(event.target.value);
    const bodyHandler = (event) => setBody(event.target.value);
    const emailHandler = (event) => setEmail(event.target.value);

    useEffect(() => {
      if (initialData) {
        setTitle(initialData.name);
        setBody(initialData.body);
        setEmail(initialData.email);
      }
    }, [initialData])
    
    const commentFormHandler = (event) => {
        event.preventDefault();
        let comment = {};

        if (initialData) {
          comment = {...initialData, 
            name: title, 
            body,
            email,
          }
        } else {
          comment = {
              name: title,
              body: body,
              postId: Number(postId),
              email: email,
          }
        }

        onCommentFormSubmit(comment);
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

    <button type='submit'>{initialData ? 'Save changes' : 'Create new comment'}</button>
  </form>
  )
}

export default CommentForm;