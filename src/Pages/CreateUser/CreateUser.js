import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { API_URL } from '../../config';
import Container from '../../Components/Container/Container'
import UserForm from '../../Components/UserForm/UserForm'

const CreateUser = () => {
    const navigator = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState('');

    const newUserHandler = (newUser) => {
        axios.post(`${API_URL}/users`, newUser)
        .then(res => navigator(`/users/${res.data.id}`))
        .catch(err => setErrorMessage(err.message));
    }

  return (
    <Container>
        {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
        <UserForm onUsertFormSubmit={newUserHandler} />
    </Container>
  )
}

export default CreateUser