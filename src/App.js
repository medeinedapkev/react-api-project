import { Routes, Route, Link } from 'react-router-dom';
import Container from './Components/Container/Container.js';
import Navigation from './Components/Navigation/Navigation.js';
import UsersPage from './Pages/UsersPage/UsersPage/UsersPage.js';
import UserPage from './Pages/UsersPage/UserPage/UserPage.js';


function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:id' element={<UserPage />} />
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
