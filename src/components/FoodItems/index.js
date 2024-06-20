import {Component} from 'react'

import {BiRupee} from 'react-icons/bi'
import {
  AiFillStar,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import CartContext from '../../Context/CartContext'
import './index.css'

class FoodItems extends Component {
  state = {
    quantity: 0,
  }

  onToggle = () => {
    this.setState({quantity: 1})
  }

  onDecrease = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  onIncrease = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderFoodItems = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem, cartList} = value
        const {foodItemDetails} = this.props
        const {id, imageUrl, name, cost, rating} = foodItemDetails
        const {quantity} = this.state
        const onToggle = () => {
          this.setState({quantity: 1})
        }
        const onAddItem = () => {
          const foodItem = {
            cost,
            quantity,
            id,
            imageUrl,
            name,
          }
          addCartItem({...foodItem, quantity})
          localStorage.setItem('cartData', JSON.stringify(cartList))
          console.log(foodItem)
        }
        return (
          <li className="food-items">
            <img src={imageUrl} className="foodItems-image" alt="restaurant" />
            <div className="food-item-details">
              <h1 className="food-item-name">{name}</h1>
              <h4 className="food-item-cost">
                <BiRupee /> {cost}
              </h4>
              <h3 className="food-item-rating">
                <AiFillStar className="itemsStar" /> {rating}
              </h3>
              {quantity > 0 ? (
                <div className="add-button-box">
                  <div className="addBox">
                    <AiOutlineMinusSquare
                      className="addButton"
                      onClick={this.onDecrease}
                    />
                    <span className="food-quantity">{quantity}</span>
                    <AiOutlinePlusSquare
                      className="addButton"
                      onClick={this.onIncrease}
                    />
                  </div>
                  <button
                    className="add-item-btn"
                    onClick={onAddItem}
                    type="button"
                  >
                    ADD
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="add-item-button"
                  onClick={onToggle}
                >
                  ADD
                </button>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div> {this.renderFoodItems()}</div>
  }
}
export default FoodItems
