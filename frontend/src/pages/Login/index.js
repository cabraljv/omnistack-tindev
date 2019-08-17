import React, { Component } from 'react';
import logo from '../../assets/logo.svg'
import './login.css'
import api from '../../services/api'


export default class Login extends Component {
  state = {
    user: ''
  }
  handleSubmit = async e => {
    e.preventDefault()

    const response = await api.post('/devs', {
      username: this.state.user
    })
    console.log(response)
    const { _id: id } = response.data


    this.props.history.push(`/dev/${id}`)
  }
  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="" />
          <input
            placeholder="Digite seu usuário do github"
            value={this.state.user}
            onChange={e => {
              this.setState({ user: e.target.value })
            }}
          />
          <button type="submit">Entrar</button>
        </form>

      </div>


    )
  }
}
