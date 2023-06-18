import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../Config';
import Container from '../../../Components/Container/Container';
import './UserPage.css';
import { ListItem } from '@mui/material';

const UserPage = () => {
    const { id } = useParams();

    const [ user, setUser ] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${API_URL}/users/${id}`);
            setUser(res.data);
        }
        
        fetchData();
    }, [id])
    
    if (!user) {
        return '';
    }
    
    console.log(user)


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

  return (
    <Container>
    <Box
      sx={{
          display: 'block',
          '& > :not(style)': {
              m: 1,
            },
        }}
        >

      <Paper elevation={3}>
        <Stack>
            <ListItem>
            <div className='user-info-wrapper'>
                <div className='user-name'>
                    <h2>{user.name}</h2>
                    <Avatar {...stringAvatar(`${user.name}`)} />
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
                    <p>Website: <a href={`${user.website}`} target='_blank' rel='noreferrer'>{user.website}</a></p>
                </div>
            </div>
            </ListItem>
        </Stack>
      </Paper>
    </Box>
    </Container>
  )
}

export default UserPage;
