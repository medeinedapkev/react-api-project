import { useEffect, useState } from 'react'
import Container from '../Container/Container'
import axios from 'axios';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';

const AlbumForm = ({ onAlbumFormSubmit, initialData }) => {
  const [ users, setUsers ] = useState('');
  const [ albumTitle, setAlbumTitle ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ photoTitle, setPhotoTitle ] = useState('');
  const [ photoUrl, setPhotoUrl ] = useState('');
  const [ photoThumbnailUrl, setPhotoThumbnailUrl ] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/users`)
    .then(res => {
      setUsers(res.data);
      if (!initialData) {
        setUserId(res.data[0].id);
      }
    }).catch(err => toast.error(err.message));
  }, [])

  const albumTitleHandler = (event) => setAlbumTitle(event.target.value);
  const userIdHandler = (event) => setUserId(event.target.value);
  const photoTitleHandler = (event) => setPhotoTitle(event.target.value);
  const photoUrlHandler = (event) => setPhotoUrl(event.target.value);
  const photoThumbnailUrlHandler = (event) => setPhotoThumbnailUrl(event.target.value);

  useEffect(() => {
    if (initialData) {
      setAlbumTitle(initialData.title);
      setUserId(initialData.userId);
    }
  }, [initialData])

  function formSubmitHandler(event) {
    event.preventDefault();
    console.log(albumTitle)
    console.log(userId)
    console.log(photoTitle)
    console.log(photoUrl)
    console.log(photoThumbnailUrl)

    let album = {};
    if (initialData) {

    } else {
      album = { userId, title: albumTitle }
    }
    onAlbumFormSubmit(album);
  }

  if (!users) {
    return;
  }

  return (
    <Container>
    <form onSubmit={formSubmitHandler}>
      <div className='form-control'>
        <label htmlFor='album-title'>Title: </label>
        <input type='text' name='album-title' id='album-title' value={albumTitle} onChange={albumTitleHandler} />
      </div>

      <div className='form-control'>
        <label htmlFor='post-author'>Author: </label>
        <select value={userId} onChange={userIdHandler} name='post-author' id='post-author'>
          {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
        </select>
      </div>

      <fieldset>
        <legend>Photo information: </legend>

        <div className='form-control'>
          <label htmlFor='photo-title'>Title: </label>
          <input type='text' name='photo-title' id='photo-title' value={photoTitle} onChange={photoTitleHandler} />
        </div>

        <div className='form-control'>
          <label htmlFor='photo-url'>Url: </label>
          <input type='url' name='photo-url' id='photo-url' value={photoUrl} onChange={photoUrlHandler} />
        </div>
        
        <div className='form-control'>
          <label htmlFor='photo-thumbnailUrl'>ThumbnailUrl: </label>
          <input type='url' name='photo-thumbnailUrl' id='photo-thumbnailUrl' value={photoThumbnailUrl} onChange={photoThumbnailUrlHandler} />
        </div>
      </fieldset>

      <button type='submit'>{initialData ? 'Save changes' : 'Create new album'}</button>
    </form>
    </Container>
  )
}

export default AlbumForm