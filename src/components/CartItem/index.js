import {Component} from 'react'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class CartItem extends Component {
  onIncrement = id => {
    const cartList = JSON.parse(localStorage.getItem('cartList'))
    const updatedCartData = cartList.map(eachItem => {
      if (eachItem.id === id) {
        console.log(eachItem.quantity)
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartList', JSON.stringify(updatedCartData))
  }

  // decrement the cart quantity

  onDecrement = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1

          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })

    this.removeCartItem(updatedCartData)
  }

  removeCartItem = updatedData => {
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    console.log(updatedCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  render() {
    const {cartItemDetails} = this.props
    const {imageUrl, name, quantity, cost} = cartItemDetails
    return (
      <li className="cart-item">
        <div className="image-name-box">
          <img src={imageUrl} className="CartImg" alt="cart-img" />
          <h1 className="item-name">{name}</h1>
        </div>

        <div className="quantity-box">
          <AiOutlineMinusSquare
            className="cart-item-quantity-icon"
            onClick={this.onDecrement}
          />
          <h4 className="cart-item-quantity">{quantity}</h4>
          <AiOutlinePlusSquare
            className="cart-item-quantity-icon"
            onClick={this.onIncrement}
          />
        </div>
        <div className="cart-price-box">
          <h1 className="cart-item-price">
            <BiRupee /> {quantity * cost}
          </h1>
        </div>
      </li>
    )
  }
}
export default CartItem
