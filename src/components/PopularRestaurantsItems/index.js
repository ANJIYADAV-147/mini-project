import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const PopularRestaurantsItems = props => {
  const {RestaurantsNames} = props
  const {imageUrl, name, id, cuisine, userRating} = RestaurantsNames
  const {rating, totalReviews, ratingColor} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="link">
      <li className="restaurantsItems">
        <img src={imageUrl} className="restaurantsImg" alt="restaurant" />
        <div className="restaurantsDetails">
          <h1 className="name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rating-container">
            <FaStar className="star-icon" color={ratingColor} />
            <p className="rating">{rating}</p>
            <p className="total-reviews">{`(${totalReviews} reviews)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default PopularRestaurantsItems
