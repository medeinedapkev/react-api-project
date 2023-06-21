import { Box, Paper, Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../../config.js';
import { Container } from '@mui/material';
import { firstLetterUpperCase } from '../../Functions/Functions';

const PostPage = () => {
  const { id } = useParams();
  const [ post, setPost ] = useState(null);
  const [ postDeleted, setPostDeleted ] = useState(false);
  const [ commentDeleted, setCommentDeleted ] = useState(false);
  const [ commentForm, setCommentForm ] = useState(false);
  const [ commentCreated, setCommentCreated ] = useState(false);

  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ email, setEmail ] = useState('');

  const titleHandler = (event) => setTitle(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);
  

  const deleteCommentHandler = (id) => {
    axios.delete(`${API_URL}/comments/${id}`)
    .then(res => setCommentDeleted(true))
  }
  
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/posts/${id}/?_embed=comments&_expand=user`);

      setPost(res.data);
    }

    fetchData();
  }, [id, commentDeleted, commentCreated])

  if (!post) {
    return;                    
  }

  const deletePostHandler = (event) => {
    event.preventDefault();

    axios.delete(`${API_URL}/posts/${id}`)
    .then(res => setPostDeleted(true));
  }

  const commentFormHandler = () => {
    setCommentForm(true)
  }

  const newCommentHandler = (event) => {
    event.preventDefault();

    const newComment = {
      name: title,
      body: body,
      postId: Number(id),
      email: email,
    }

    axios.post(`${API_URL}/comments`, newComment)
    .then(res => {
      setCommentCreated(true);
      setCommentForm(false);
    })
  }

  const commentFormElement = (
    <form onSubmit={newCommentHandler}>
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

  const commentsElement = post.comments.length > 0 ? (
  <div className='comments-wrapper'>
    <h3>Comments:</h3>
    {commentForm ? commentFormElement : <button onClick={commentFormHandler}>Comment post</button> }

    {post.comments.map(comment => (
    <Accordion key={comment.id}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{firstLetterUpperCase(comment.name)}</Typography>
        <button onClick={() => deleteCommentHandler(comment.id)}>Delete</button>
        <button onClick={commentFormHandler}>Edit</button>
      </AccordionSummary>

      <AccordionDetails>
        <p>{firstLetterUpperCase(comment.body)}</p>
        <a href={`mailto:${comment.email}`}>{comment.email}</a>
      </AccordionDetails>

    </Accordion>
    ))
  }
  </div> ) : (
  <div className='comments-wrapper'>
    <h3>No comments</h3>
  </div> );

  const postElement = post && (
    <Box
    sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: '100%',
        },  
    }}
    >
    
    <Paper elevation={3} sx={{ padding: 2, }} >
        <Stack>
            <div className='post'>
              <h2>{firstLetterUpperCase(post.title)}</h2>
              <button onClick={deletePostHandler}>Delete</button>
              <Link to={`/post/edit/${post.id}`}>Edit</Link>
              
                <Link to={`/users/${post.userId}`}>
                <p>{post.user.name}</p>
                </Link>
                <p>{firstLetterUpperCase(post.body)}</p>

            </div>
        </Stack>

        {commentsElement}
    </Paper>
</Box>
  )

  const deletedPostElement = postDeleted && (
    <>
    <h1>Post was deleted</h1>
    <Link to='/posts'>Go back to posts page</Link>
    </>
  )

  return (
    <Container>
    {postDeleted ? deletedPostElement : postElement }
    </Container>
  )
}

export default PostPage;