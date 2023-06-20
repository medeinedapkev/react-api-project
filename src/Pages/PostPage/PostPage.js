import { Box, Paper, Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../../config.js';
import { Container } from '@mui/material';
import { firstLetterUpperCase } from '../../Functions/Functions';

const PostPage = () => {
  const [ post, setPost ] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/posts/${id}/?_embed=comments&_expand=user`);
      console.log(res.data)
      setPost(res.data);
    }

    fetchData();
  }, [id])

  if (!post) {
    return;                    
  }


  return (
    <Container>
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
                    <Link to={`/users/${post.userId}`}>
                    <p>{post.user.name}</p>
                    </Link>
                    <p>{firstLetterUpperCase(post.body)}</p>

                    <Link to={`/users/${post.userId}`}>
                    
                    </Link>
                </div>
            </Stack>
    
    <div className='comments-wrapper'>
      <h3>Comments:</h3>
      {post.comments.map(comment => (
      <Accordion key={comment.id}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{firstLetterUpperCase(comment.name)}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <p>{firstLetterUpperCase(comment.body)}</p>
          <a href={`mailto:${comment.email}`}>{comment.email}</a>
          
        </AccordionDetails>
      </Accordion>

      ))
    }


    </div>

        </Paper>
    </Box>

    </Container>
  )
}

export default PostPage;