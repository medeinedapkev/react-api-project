import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './UsersPage.css';
import { API_URL } from '../../../config.js';
import Container from '../../../Components/Container/Container';

const UsersPage = () => {
    const [ users, setUsers ] = useState([]);

    const linkStyle = {
      textDecoration: 'none',
      color: 'black',
    }

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${API_URL}/users`)
            setUsers(res.data)
        }

        fetchData();
    }, [])


  return (
    <Container>
      <Link to='/users/create'>Create new user</Link>
    <h1>Users:</h1>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >

      {users.map(user => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton>
                <Link to={`/users/${user.id}`} style={linkStyle}>
                <ListItemText primary={user.name} />
                </Link>
              </ListItemButton>
            </ListItem>
      ))}

    </List>
  </Container>
  )
}

export default UsersPage;