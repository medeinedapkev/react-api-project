import { Box, Paper, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../Config';
import Container from '../../Components/Container/Container';
import { firstLetterUpperCase } from '../../Functions/Functions';


const PostsPage = () => {
  const [ posts, setPosts ] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/posts?_embed=comments&_expand=user`);
      console.log(res.data)
      setPosts(res.data);
    }

    fetchData();
  }, [])

  if (!posts) {
    return;
  }
  return (
    <Container>
      <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: '46.5%',
            },  
        }}
        >
        {posts.map(post => (
        <Paper key={post.id} elevation={3} sx={{ padding: 2, }} >
            <Stack>
                <div className='post-item'>
                    <Link to={`/posts/${post.id}`}>
                    <h4 className='post-title'>{firstLetterUpperCase(post.title)}</h4>
                    <span>{`(comments: ${post.comments.length})`}</span>
                    </Link>

                    <Link to={`/users/${post.userId}`}>
                    <p className='author'>{firstLetterUpperCase(post.user.name)}</p>
                    </Link>
                </div>
            </Stack>
        </Paper>
        )
        )}
    </Box>
    </Container>
  )
}

export default PostsPage;