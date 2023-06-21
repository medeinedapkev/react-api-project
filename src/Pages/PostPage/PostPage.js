import { Box, Paper, Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../../config.js';
import { Container } from '@mui/material';
import { firstLetterUpperCase } from '../../Functions/Functions';
import PostCommentForm from '../../Components/CommentForm/CommentForm.js';

const PostPage = () => {
  const { id } = useParams();
  const [ post, setPost ] = useState(null);
  const [ postDeleted, setPostDeleted ] = useState(false);
  const [ commentDeleted, setCommentDeleted ] = useState(false);
  const [ commentForm, setCommentForm ] = useState(false);
  const [ commentCreated, setCommentCreated ] = useState(false);

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

  const commentFormHandler = (data) => {
    if (data) {
      setCommentForm(true);
      console.log(data);
    } else {
      setCommentForm(true);
    }
  }

  const createCommentHandler = (newComment) => {
    axios.post(`${API_URL}/comments`, newComment)
    .then(res => {
      setCommentCreated(true);
      setCommentForm(false);
    })
  }

  const allCommentsElement = post.comments.length > 0 && post.comments.map(comment => (
    <Accordion key={comment.id}>

      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{firstLetterUpperCase(comment.name)}</Typography>
        <button onClick={() => deleteCommentHandler(comment.id)}>Delete</button>
        <button onClick={() => commentFormHandler(comment)}>Edit</button>
      </AccordionSummary>

      <AccordionDetails>
        <p>{firstLetterUpperCase(comment.body)}</p>
        <a href={`mailto:${comment.email}`}>{comment.email}</a>
      </AccordionDetails>

    </Accordion>
    ))

  const commentsWrapperElement = 
  <div className='comments-wrapper'>
    <h3>{post.comments.length > 0 ? 'Comments:' : 'No comments'}</h3>
    {commentForm ? (
    <PostCommentForm id={id} onCommentFormSubmit={createCommentHandler} />
    ) : <button onClick={commentFormHandler}>Comment post</button> }
    {allCommentsElement}
  </div>


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

        {commentsWrapperElement}
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