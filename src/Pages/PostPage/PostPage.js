import { Box, Paper, Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config.js';
import { Container } from '@mui/material';
import { firstLetterUpperCase } from '../../Functions/Functions';
import PostCommentForm from '../../Components/CommentForm/CommentForm.js';
import { toast } from 'react-toastify';

const PostPage = () => {
  const { id } = useParams();
  const navigator = useNavigate();

  const [ post, setPost ] = useState(null);
  const [ commentForm, setCommentForm ] = useState(false);
  const [ editComment, setEditComment ] = useState(null);
  const [ commentDeleted, setCommentDeleted ] = useState(false);
  const [ commentCreated, setCommentCreated ] = useState(false);
  const [ commentEdited, setCommentEdited ] = useState(false)

  
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/posts/${id}/?_embed=comments&_expand=user`);
      setPost(res.data);
      setCommentEdited(false);
      setCommentCreated(false);
      setCommentDeleted(false);
    }
    
    fetchData();
  }, [id, commentDeleted, commentCreated, commentEdited])
  
  if (!post) {
    return;                    
  }
  
  const deletePostHandler = (event) => {
    event.preventDefault();
    
    axios.delete(`${API_URL}/posts/${id}`)
    .then(res => {
      navigator('/posts');
      toast.success('Post was successfully deleted');
    }).catch(err => toast.error(err.message));
  }

  const deleteCommentHandler = (id) => {
    axios.delete(`${API_URL}/comments/${id}`)
    .then(res => {
      setCommentDeleted(true);
      toast.success('Comment was successfully deleted');
    }).catch(err => toast.error(err.message));
  }

  const commentFormHandler = (data) => {
    if (data) {
      setCommentForm(true);
      setEditComment(data);
    } else {
      setCommentForm(true);
    }
  }

  function commentHandler(comment) {
    if (editComment) {
      axios.patch(`${API_URL}/comments/${comment.id}`, comment)
      .then(res => {
        setEditComment(null);
        setCommentEdited(true);
        setCommentForm(false);
        toast.success('Comment was successfully edited');
      }).catch(err => toast.error(err.message));

    } else {
      axios.post(`${API_URL}/comments`, comment)
      .then(res => {
        setCommentCreated(true);
        setCommentForm(false);
        toast.success('Comment was successfully created');
      }).catch(err => toast.error(err.message));
    }
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

  const commentsWrapperElement = (
  <div className='comments-wrapper'>
    <h3>{post.comments.length > 0 ? 'Comments:' : 'No comments'}</h3>
    {commentForm ? (
    <PostCommentForm postId={id} onCommentFormSubmit={commentHandler} initialData={editComment} />
    ) : (
    <button onClick={() => commentFormHandler()}>Comment post</button>
    )}
    {allCommentsElement}
  </div>)

  const postElement = post && (
    <Box sx={{ display: 'flex', '& > :not(style)': { m: 1, width: '100%' } }}>
    
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

  return (
    <Container>
    {postElement}
    </Container>
  )
}

export default PostPage;