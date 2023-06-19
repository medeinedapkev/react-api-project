import * as React from 'react';
import { Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Card } from '@mui/material';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Config';
import { firstLetterUpperCase } from '../../Functions/Functions';
import Container from '../../Components/Container/Container';
import './AlbumsPage.css';

const AlbumsPage = () => {
  const [ albums, setAlbums ] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${API_URL}/albums?_embed=photos&_expand=user`)
      console.log(res.data)
      setAlbums(res.data);
    }

    fetchData();
  }, [])

  if (!albums) {
    return;
  }

  const albumCard = albums.map(album => {
    const photoNum = album.photos.length;
    const index = Math.floor(Math.random() * photoNum);
    const randomPhoto = album.photos[index].thumbnailUrl;
    const randomPhotoAlt = album.photos[index].title

    const cardElement = (
      <Card key={album.id} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={randomPhoto}
            alt={randomPhotoAlt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {firstLetterUpperCase(album.title)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {firstLetterUpperCase(album.user.name)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={`/albums/${album.id}`}>
          <Button size="small" color="primary">
            See album
          </Button>
          </Link>
        </CardActions>
      </Card>
    )

      return cardElement;
      })


  return (
    <Container>
      {albums && (
        <div className='albums-wrapper'>
          {albumCard}
        </div>
      )}
    </Container>
  )
}

export default AlbumsPage;