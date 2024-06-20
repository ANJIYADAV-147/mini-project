import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../Context/CartContext'
import './index.css'
import CartItem from '../CartItem'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const calculateTheTotalAmount = () => {
        const amountList = cartList.map(each => each.quantity * each.cost)
        const totalAmount = amountList.reduce((a, b) => a + b)
        return totalAmount
      }
      const totalAmount = calculateTheTotalAmount()
      return (
        <div className="cartListView-container">
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
            <hr className="cart-items-line" />
          </ul>
          <div className="totalContainer">
            <h1 className="orderHeading">Order Total:</h1>
            <div>
              <div className="totalAmountContainer">
                <BiRupee className="totalRupee" />
                <p className="totalAmount">{totalAmount}.00</p>
              </div>
              <Link to="/payment-successfull">
                <button type="button" className="placeOrderButton">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartListView
