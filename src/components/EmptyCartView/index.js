import {Link} from 'react-router-dom'
import EmptyCartImg from '../images/EmptyCartImg.png'
import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img src={EmptyCartImg} className="cart-empty-image" alt="cart empty" />
    <h1 className="cart-empty-heading">No Orders Yet!</h1>
    <p className="">Your Cart Is Empty, Add Something from the menu.</p>

    <Link to="/">
      <button type="button" className="shop-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
