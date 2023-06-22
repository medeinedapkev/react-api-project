import Container from '../Container/Container'

const AlbumForm = ({ usersData }) => {
  return (
    <Container>
    <form>
      <div className='form-control'>
        <label htmlFor='album-title'>Title: </label>
        <input type='text' name='album-title' id='album-title' />
      </div>

      {/* <div className='form-control'>
        <label htmlFor='post-author'>Author: </label>
        <select value={userId} onChange={userIdHandler} name='post-author' id='post-author'>
          {usersData.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
        </select>
      </div> */}
    </form>
    </Container>
  )
}

export default AlbumForm