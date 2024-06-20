import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import {FaStar} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
import Navbar from '../Navbar'
import FoodItems from '../FoodItems'
import Footer from '../Footer'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_Progress: 'IN_PROGRESS',
  failed: 'FAILED',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetailsList: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiConstants.in_Progress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(e => ({
          id: e.id,
          cost: e.cost,
          foodType: e.food_type,
          imageUrl: e.image_url,
          name: e.name,
          rating: e.rating,
        })),
      }
      console.log(updatedData)
      this.setState({
        apiStatus: apiConstants.success,
        restaurantDetailsList: updatedData,
      })
    }
  }

  renderLoaderView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFoodItemsView = () => {
    const {restaurantDetailsList} = this.state
    const {foodItems} = restaurantDetailsList

    // console.log(foodItems)
    if (!foodItems) {
      return <div>No food items available</div>
    }

    return (
      <ul className="foodItems-list" type="none">
        {foodItems.map(eachItem => (
          <FoodItems key={eachItem.id} foodItemDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderRestaurantDetailsRespectiveView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderFoodItemsView()
      case apiConstants.in_Progress:
        return this.renderLoaderView()
      case apiConstants.failed:
        return this.failedView()
      default:
        return null
    }
  }

  render() {
    const {restaurantDetailsList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetailsList
    const {foodItems} = restaurantDetailsList
    console.log(foodItems)
    return (
      <div className="Restaurant-Details-container">
        <Navbar />
        <div className="banner-box-container">
          <img
            src={imageUrl}
            className="restaurants-details-imageUrl"
            alt="imageUrl"
          />
          <div className="restaurants-details">
            <h1 className="restaurants-details-name">{name}</h1>
            <h4 className="restaurants-details-cuisine">{cuisine}</h4>
            <p className="restaurants-details-location">{location}</p>
            <div className="rating-price-container">
              <div className="ratingDetails-container">
                <div className="star-rating-container">
                  <FaStar className="star-icon" />
                  <p className="restaurants-details-rating">{rating}</p>
                </div>
                <p className="restaurants-details-reviewsCount">
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <p className="horLine">|</p>
              <div className="price-container">
                <h3 className="rest-details-amount">
                  <BiRupee /> {costForTwo}
                </h3>
                <h5 className="rest-details-amount-text">Cost for two</h5>
              </div>
            </div>
          </div>
        </div>
        {this.renderRestaurantDetailsRespectiveView()}
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
