import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import logo from '../images/logo.png'
import kitchenImg from '../images/kitchenImg.png'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderMobileView = () => {
    const {username, password, errorMsg, showSubmitError} = this.state
    return (
      <div className="mobile-view-login-container">
        <img
          src={kitchenImg}
          alt="website login"
          className="mobile-kitchenImg"
        />
        <h1 className="login-head">Login</h1>
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            className="input"
            id="username"
            onChange={this.onChangeUsername}
            value={username}
          />
          <br />
          <br />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            className="input"
            onChange={this.onChangePassword}
            value={password}
          />
          <br />
          <br />
          <button type="submit" className="loginButton" id="password">
            Login
          </button>
          {showSubmitError ? <p className="errorMsg">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }

  renderLoginRouter = () => {
    const {username, password, showSubmitError, errorMsg} = this.state

    return (
      <div className="login-container">
        <div className="logo-form-container">
          <div className="container">
            <img src={logo} className="logo" alt="website logo" />
            <h1 className="kitchenName">Tasty Kitchens</h1>
            <h1>Login</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                className="input"
                id="username"
                onChange={this.onChangeUsername}
                value={username}
              />
              <br />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                className="input"
                onChange={this.onChangePassword}
                value={password}
              />
              <br />
              <button type="submit" className="loginButton" id="password">
                Login
              </button>
              {showSubmitError ? <p className="errorMsg">{errorMsg}</p> : ''}
            </form>
          </div>
        </div>
        <img src={kitchenImg} alt="website login" className="kitchenImg" />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-view-container">
        <div className="big-screen-view">{this.renderLoginRouter()}</div>
        <div className="mobile-view">{this.renderMobileView()}</div>
      </div>
    )
  }
}
export default LoginRoute
