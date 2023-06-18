import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './UsersPage.css';
import { API_URL } from '../../../Config';
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