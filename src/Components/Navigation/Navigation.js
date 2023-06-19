import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';


export default function Navigation() {
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink to="/users">
          Users
        </NavLink>
        <NavLink to="/posts">
          Posts
        </NavLink>
        <NavLink to="/albums">
          Albums
        </NavLink>
      </Breadcrumbs>
    </Container>
  );
}