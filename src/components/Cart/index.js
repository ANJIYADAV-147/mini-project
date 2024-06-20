import CartContext from '../../Context/CartContext'
import './index.css'
import Navbar from '../Navbar'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0
      return (
        <>
          <Navbar />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-items-box">
                <div className="t-header">
                  <h1 className="t-h-item">Item</h1>
                  <h1 className="t-h-item">Quantity</h1>
                  <h1 className="t-h-item">Price</h1>
                </div>
                <CartListView />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
