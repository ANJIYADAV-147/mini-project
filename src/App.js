import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import CartContext from './Context/CartContext'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'

import Cart from './components/Cart'
import NotFound from './components/NotFound'
import PaymentSuccessFullView from './components/PaymentSuccessFullView'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = items => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList, items],
    }))
  }

  deleteCartItem = () => {}

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/payment-successfull"
            component={PaymentSuccessFullView}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
