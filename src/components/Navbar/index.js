import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

import {IoMenu} from 'react-icons/io5'
import logo from '../images/logo.png'

class Navbar extends Component {
  state = {
    isMenuOpen: false,
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderNavbar = () => (
    <nav className="navbar-container">
      <div className="logo-container">
        <img src={logo} className="logo" alt="website logo" />
        <h1 className="logoName">Tasty Kitchens</h1>
      </div>
      <div className="nav-items">
        <Link to="/" className="link">
          <p className="items">Home</p>
        </Link>
        <Link className="link" to="/cart">
          <p className="items">Cart</p>
        </Link>
        <button
          className="logoutBtn"
          type="submit"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )

  renderMobileViewNavbar = () => {
    const {isMenuOpen} = this.state
    return (
      <div className="mobile-view-navbar-container">
        <nav className="mobile-navbar-container">
          <div className="logo-container">
            <img src={logo} className="logo" alt="website logo" />
            <h1 className="logoName">Tasty Kitchens</h1>
          </div>
          <div className="menu-items-container">
            <button
              type="button"
              className="menuButton"
              aria-label="Logout"
              onClick={this.toggleMenu}
            >
              <IoMenu className="ioMenu" size={50} />
            </button>
            {isMenuOpen && (
              <ul className="menu-items" type="none">
                <Link className="link" to="/">
                  <li>Home</li>
                </Link>
                <Link className="link" to="/cart">
                  <li>Cart</li>
                </Link>
                <li>
                  <button type="button" onClick={this.onClickLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    )
  }

  render() {
    return (
      <div className="header-container">
        {this.renderNavbar()}
        {this.renderMobileViewNavbar()}
      </div>
    )
  }
}

export default withRouter(Navbar)
