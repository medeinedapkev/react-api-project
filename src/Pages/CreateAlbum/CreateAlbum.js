import { useNavigate } from 'react-router-dom'
import AlbumForm from '../../Components/AlbumForm/AlbumForm'
import Container from '../../Components/Container/Container'
import axios from 'axios';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';


const CreateAlbum = () => {
  const navigator = useNavigate();

  const newAlbumHandler = (newAlbum) => {
    axios.post(`${API_URL}/albums`, newAlbum)
    .then(res => {
      navigator(`/albums/${res.data.id}`);
      toast.success('Album was successfully created');
    }).catch(err => toast.error(err.message));
  }

  return (
    <Container>
        <AlbumForm onAlbumFormSubmit={newAlbumHandler} />
    </Container>
  )
}

export default CreateAlbum;