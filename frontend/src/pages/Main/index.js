import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import './main.css'
import api from '../../services/api'

export default function Main({ match }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { user: match.params.id }
      })
      setUsers(response.data)
    }
    loadUsers();
  }, [match.params.id])

  async function handleLike(id) {
    console.log(match.params.id)
    await api.post(`/devs/${id}/like`, null, {
      headers: {
        user: match.params.id
      }
    })
  }
  function handleDislike(id) {
    api.post(`/devs/${id}/dislike`, null, {
      headers: {
        user: match.params.id
      }
    })
  }

  return (
    <div className="main-container">
      <img src={logo} alt="tindev" />
      <ul>

        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt="" />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>

            </footer>
            <div className="buttons">
              <button type="button" onClick={() => handleDislike(user._id)}>
                <img src={dislike} alt="dislike" alt="dislike" />
              </button>
              <button type="button" onClick={() => handleLike(user._id)}>
                <img src={like} alt="like" alt="like" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

}
