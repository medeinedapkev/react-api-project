import { Box, Paper, Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../../config.js';
import { Container } from '@mui/material';
import { firstLetterUpperCase } from '../../Functions/Functions';

const PostPage = () => {
  const [ post, setPost ] = useState(null);
  const [ postDeleted, setPostDeleted ] = useState(false);
  const { id } = useParams();

  const deleteCommentHandler = (id) => {
    axios.delete(`${API_URL}/comments/${id}`)
  }
  
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/posts/${id}/?_embed=comments&_expand=user`);

      setPost(res.data);
    }

    fetchData();
  }, [id, deleteCommentHandler])

  if (!post) {
    return;                    
  }

  const deletePostHandler = (event) => {
    event.preventDefault();

    axios.delete(`${API_URL}/posts/${id}`)
    .then(res => setPostDeleted(true));
  }


  const commentsElement = post.comments.length > 0 ? (
  <div className='comments-wrapper'>
    <h3>Comments:</h3>
    {post.comments.map(comment => (
    <Accordion key={comment.id}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{firstLetterUpperCase(comment.name)}</Typography>
        <button onClick={() => deleteCommentHandler(comment.id)}>Delete</button>
      </AccordionSummary>

      <AccordionDetails>
        <p>{firstLetterUpperCase(comment.body)}</p>
        <a href={`mailto:${comment.email}`}>{comment.email}</a>
      </AccordionDetails>

    </Accordion>
    ))
  }
  </div> ) : '';

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
    
    <Paper key={post.id} elevation={3} sx={{ padding: 2, }} >
        <Stack>
            <div className='post'>
              <h2>{firstLetterUpperCase(post.title)}</h2>
              <button onClick={deletePostHandler}>Delete</button>

                <Link to={`/users/${post.userId}`}>
                <p>{post.user.name}</p>
                </Link>
                <p>{firstLetterUpperCase(post.body)}</p>

                <Link to={`/users/${post.userId}`}>
                
                </Link>
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