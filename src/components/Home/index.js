import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import Slider from 'react-slick'
import './index.css'
import Counter from '../Counter'
import Navbar from '../Navbar'
import PopularRestaurantsItems from '../PopularRestaurantsItems'
import Footer from '../Footer'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_Progress: 'IN_PROGRESS',
  failed: 'FAILED',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    carouselList: [],
    restaurantsList: [],
    carouselApi: apiConstants.initial,
    restaurantsApi: apiConstants.initial,
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
  }

  componentDidMount() {
    this.getCarouselList()
    this.getRestaurantsList()
  }

  getCarouselList = async () => {
    this.setState({carouselApi: apiConstants.in_Progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const carouselList = data.offers
      this.setState({carouselList, carouselApi: apiConstants.success})
    }
  }

  renderCarousels = () => {
    const settings = {
      dots: true,
      infinite: true,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: 'linear',
      arrows: false,
    }
    const {carouselList} = this.state
    return (
      <div className="carousel-box">
        <Slider {...settings}>
          {carouselList.map(e => (
            <img
              src={e.image_url}
              alt={e.id}
              key={e.id}
              className="carouselImg"
            />
          ))}
        </Slider>
      </div>
    )
  }

  getRestaurantsList = async () => {
    this.setState({restaurantsApi: apiConstants.in_Progress})
    const {selectedSortByValue, activePage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.restaurants.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        cuisine: eachData.cuisine,
        imageUrl: eachData.image_url,
        userRating: {
          rating: eachData.user_rating.rating,
          ratingColor: eachData.user_rating.rating_color,
          totalReviews: eachData.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList: updatedData,
        restaurantsApi: apiConstants.success,
      })
    }
  }

  renderRestaurants = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurantsList">
        {restaurantsList.map(eachRest => (
          <PopularRestaurantsItems
            key={eachRest.id}
            RestaurantsNames={eachRest}
          />
        ))}
      </ul>
    )
  }

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  }

  renderCarouselsRespectiveView = () => {
    const {carouselApi} = this.state
    switch (carouselApi) {
      case apiConstants.success:
        return this.renderCarousels()
      case apiConstants.in_Progress:
        return this.renderLoader()
      // case apiConstants.failed:
      //     return this.carouselsFailureView()

      default:
        return null
    }
  }

  renderRestaurantsRespectiveView = () => {
    const {restaurantsApi} = this.state
    switch (restaurantsApi) {
      case apiConstants.success:
        return this.renderRestaurants()
      case apiConstants.in_Progress:
        return this.renderLoader()
      // case apiConstants.failed:
      //     return this.carouselsFailureView()

      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  changeTheSortByOptionValue = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getAllRestaurantsData,
    )
  }

  render() {
    const {selectedSortByValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="Home-container">
        <Navbar />
        <div>{this.renderCarouselsRespectiveView()}</div>
        <div className="heading-sort-container">
          <div className="popular-des-container">
            <h1 className="popular-heading">Popular Restaurants</h1>
            <p className="popular-des">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="filter-container">
            <BsFilterLeft className="FilterLogo" />
            <p className="SortLabel">Sort By</p>
            <select
              id="sortBy"
              className="selectedElement"
              onChange={this.changeTheSortByOptionValue}
              value={selectedSortByValue}
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id}>{eachOption.displayText}</option>
              ))}
            </select>
          </div>
        </div>
        <hr className="line" />
        <div className="popular-restaurants-container">
          {this.renderRestaurantsRespectiveView()}
        </div>
        <div className="pagination-box">
          <Counter pageChangeFunction={this.getActivePage} />
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
