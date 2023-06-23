import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config.js';
import { firstLetterUpperCase } from '../../Functions/Functions';
import Container from '../../Components/Container/Container';

import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import { toast } from 'react-toastify';

const AlbumPage = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [ album, setAlbum ] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/albums/${id}/?_expand=user&_embed=photos`)
      setAlbum(res.data);
    }
    
    fetchData();
  }, [id])

  const albumDeleteHandler = () => {
    axios.delete(`${API_URL}/albums/${id}`)
    .then(res => {
      navigator('/albums');
      toast.warning('Album was successfully deleted');
    }).catch(err => toast.error(err.message));
  }
  
  if (!album) {
    return;
  }


  const photoElement = album.photos.map(photo => (
      <Item
      key={uuid()}
      original={photo.url}
      thumbnail={photo.thumbnailUrl}
      width="600"
      height="600"
    >
      {({ ref, open }) => (
        <img ref={ref} onClick={open} src={photo.thumbnailUrl} alt='' />
      )}
    </Item>
    ))
  
  return (
    <Container>
      {album && (
        <div className='album-wrapper'>
          <h1>{firstLetterUpperCase(album.title)}</h1>

          <button onClick={albumDeleteHandler}>Delete</button>
          <Link to={`/albums/edit/${id}`}>Edit</Link>

          <Link to={`/users/${album.userId}`}>
            <p>{album.user.name}</p>
          </Link>

          <Gallery>
            {photoElement}
          </Gallery>
        </div>
      )}
    </Container>
  )
}

export default AlbumPage;