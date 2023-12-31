import * as React from 'react';
import { Avatar, Stack, Box, Paper, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { firstLetterUpperCase } from '../../Functions/Functions';
import { API_URL } from '../../config.js';
import Container from '../../Components/Container/Container';
import './UserPage.css';

const UserPage = () => {
    const { id } = useParams();
    const navigator = useNavigate();

    const [ user, setUser ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState('');
    
    useEffect(() => {
        axios.get(`${API_URL}/users/${id}?_embed=albums&_embed=posts`)
        .then(res => {
            setUser(res.data);
            setErrorMessage('');
        }).catch(err => setErrorMessage(err.message));
    }, [id])
    
    if (!user) {
        return;
    }

    function stringToColor(string) {
        let hash = 0;
        let i;
  
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
  
        let color = '#';
  
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }
  
    function stringAvatar(name) {
        return {
          sx: {bgcolor: stringToColor(name)},
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const userDeleteHandler = () => {
        axios.delete(`${API_URL}/users/${id}`)
        .then(res => {
            navigator('/users');
            toast.warning('User was successfully deleted')
        }).catch(err => setErrorMessage(err.message));
    }

    const userElement = (
        <Box
        sx={{
            display: 'block',
            '& > :not(style)': {
                m: 1,
              },
          }}
          >
  
        <Paper elevation={3} sx={{ padding: 2, }}>
          <Stack>
              <div className='user-info-wrapper'>
                  <div className='user-name'>
                      <h2>{user.name}</h2>
                      <Avatar {...stringAvatar(`${user.name}`)} />
                      <button onClick={userDeleteHandler}>Delete</button>
                      <Link to={`/users/edit/${id}`}>Edit</Link>
                  </div>
                  <div className='user-info-item'>
                      <p>Username: {user.username}</p>
                  </div>
                  <div className='user-info-item'>
                      <p>Phone: <a href={`tel:${user.phone}`}>{user.phone}</a></p>
                  </div>
                  <div className='user-info-item'>
                      <p>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
                  </div>
                  <div className='user-info-item'>
                      <p>Address: <a href={`https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}`} target='_blank' rel='noreferrer'>
                          {user.address.street} {user.address.suite}, {user.address.city} (zipcode: {user.address.zipcode}).
                      </a>
                      </p>
                  </div>
                  <div className='user-info-item'>
                      <p>Work place: {user.company.name}.</p>
                  </div>
                  <div className='user-info-item'>
                      <p>Website: <a href={`https://${user.website}`} target='_blank' rel='noreferrer'>{user.website}</a></p>
                  </div>
              </div>
          </Stack>
        </Paper>
      </Box>
    )

    const postsElement = user.posts.length > 0 && (
    <>
     <h2>Posts:</h2>
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
        {user.posts.map(post => (
        <Paper key={post.id} elevation={3} sx={{ padding: 2, }} >
            <Stack>
                <div className='post-item'>
                    <Link to={`/posts/${post.id}`}>
                    <h4 className='post-title'>{firstLetterUpperCase(post.title)}</h4>
                    </Link>
                    <p className='post-body'>{firstLetterUpperCase(post.body)}</p>
                </div>
            </Stack>
        </Paper>
        )
        )}
    </Box>
    </>
    )

    const albumsElement = user.albums.length > 0 && (
    <>
    <h2>Albums:</h2>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >

    {user.albums.map(album => (
        <ListItem disablePadding key={album.id}>
            <ListItemButton>
            <Link to={`/albums/${album.id}`} >
                <ListItemText primary={firstLetterUpperCase(album.title)} />
            </Link>
            </ListItemButton>
        </ListItem>
    ))}

    </List>
    </>
    )


  return (
    <Container>
        {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
        {userElement}
        {postsElement}
        {albumsElement}
    </Container>
  )
}

export default UserPage;
