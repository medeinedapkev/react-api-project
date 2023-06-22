import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import Container from '../../Components/Container/Container'
import UserForm from '../../Components/UserForm/UserForm'

const EditUser = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const [ user, setUser ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/users/${id}`)
    .then(res => {
      setUser(res.data);
      setErrorMessage('');
    }).catch(err => setErrorMessage(err.message));
  }, [id])

  const editUserHandler = (editUser) => {
    axios.patch(`${API_URL}/users/${id}`, editUser)
    .then(res => navigator(`/users/${res.data.id}`))
    .catch(err => setErrorMessage(err.message));
  }

  if (!user) {
    return;
  }

  return (
    <Container>
        {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
        <UserForm onUsertFormSubmit={editUserHandler} initialData={user} />
    </Container>
  )
}

export default EditUser