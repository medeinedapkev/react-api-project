import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../Components/Container/Container';
import AlbumForm from '../../Components/AlbumForm/AlbumForm';
import { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const EditAlbum = () => {
    const { id } = useParams();
    const navigator = useNavigate();

    const [ album, setAlbum ] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/albums/${id}/?&_embed=photos`)
        .then(res => {
            setAlbum(res.data)
            console.log(res.data)
        })
    }, [])

    function editHandler() {
        console.log('veikia')
    }

    if (!album) {
        return;
    }

  return (
    <Container>
        <AlbumForm initialData={album} onAlbumFormSubmit={editHandler} />
    </Container>
  )
}

export default EditAlbum;