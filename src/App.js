import { Routes, Route, Link } from 'react-router-dom';
import Container from './Components/Container/Container.js';
import Navigation from './Components/Navigation/Navigation.js';
import UsersPage from './Pages/UsersPage/UsersPage/UsersPage.js';
import UserPage from './Pages/UserPage/UserPage.js';
import PostsPage from './Pages/PostsPage/PostsPage.js';
import PostPage from './Pages/PostPage/PostPage.js';
import AlbumsPage from './Pages/AlbumsPage/AlbumsPage.js';
import AlbumPage from './Pages/AlbumPage/AlbumPage.js';
import CreatePost from './Pages/CreatePost/CreatePost.js';
import EditPost from './Pages/EditPost/EditPost.js';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/posts/:id' element={<PostPage />} />
        <Route path='/albums' element={<AlbumsPage />} />
        <Route path='/albums/:id' element={<AlbumPage />} />
        <Route path='/post/create' element={<CreatePost />} />
        <Route path='/post/edit/:id' element={<EditPost />} />

        <Route path='/' element={
          <Container>
            <h1>Home page</h1>
          </Container>} />
        <Route path='*' element={
          <Container>
            <h1>404 ERROR. Page not found</h1>
            <Link to='/'>Come back to home page...</Link>
          </Container>} />
      </Routes>
    </div>
  );
}

export default App;
