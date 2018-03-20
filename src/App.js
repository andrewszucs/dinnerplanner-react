import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import {
  Header
} from './components';

import {
  WelcomeView,
  DishSearchView,
  DishDetailsView,
  TotalPriceView,
  RecipesView
} from './views';

import createDinnerAPI from './lib/DinnerAPI';
import ROUTES from './utils/routes';

class App extends Component {
  
  state = {
    initialState: true,
    numberOfGuests: 1,
    menu: [],
    dishes: undefined
  }

  fetchAllDishes = createDinnerAPI(fetch).fetchAllDishes
  fetchDish = createDinnerAPI(fetch).fetchDish

  handleFetchAllDishesResponse = (dishes) => {
    this.setState({
      dishes
    })
  }

  handleAddToMenuButtonClick = (dish) => {
    this.setState(state => ({
      menu: state.menu.slice().push(dish)
    }))
  }

  changeNumberOfGuests = (newNumberOfGuests, incrementBy) => (state) => {
    const newState = {};
    if(incrementBy === undefined) {
      newState.numberOfGuests = newNumberOfGuests;
    }
    else {
      newState.numberOfGuests = state.numberOfGuests + incrementBy;
    }
    
    if(state.initialState === true) {
      newState.initialState = false;
    }
    return newState;
  }

  handleNumberOfGuestsChange = (event) => {
    event.persist();
    const isNum = /^\d+$/.test(event.target.value);
    if( event.target.value === '' || isNum ) {
      this.setState(this.changeNumberOfGuests(Number(event.target.value)));
    }
  }

  handleNumberOfGuestsIncrement = (byValue) => () => {
    if(byValue > 0 || this.state.numberOfGuests > 0) {
      this.setState(this.changeNumberOfGuests(undefined, byValue));
    }
  }

  renderWelcomeView = () => {
    if(this.state.initialState) {
      return <WelcomeView />;
    }
    else {
      return <Redirect to={ROUTES.search} />;
    }
  }
  
  renderDishSearchView = props => (
    <DishSearchView 
      numberOfGuests={this.state.numberOfGuests}
      menu={this.state.menu} 
      dishes={this.state.dishes}
      onNumberOfGuestsChange={this.handleNumberOfGuestsChange} 
      onNumberOfGuestsIncrement={this.handleNumberOfGuestsIncrement}
      fetchAllDishes={this.fetchAllDishes}
      onFetchAllDishesResponse={this.handleFetchAllDishesResponse}
      {...props}
    />
  )

  renderDishDetailsView = props => (
    <DishDetailsView 
      numberOfGuests={this.state.numberOfGuests}
      fetchDish={this.fetchDish}
      {...props}
    />
  )

  renderTotalPriceView = props => (
    <TotalPriceView
      numberOfGuests={this.state.numberOfGuests}
      menu={this.state.menu}
      {...props}
    />
  )

  renderRecipesView = props => (
    <RecipesView 
      numberOfGuests={this.state.numberOfGuests}
      menu={this.state.menu}
      {...props}
    />
  )

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header />
          <Router>
            <Fragment>
              <Route exact path={ROUTES.root} render={this.renderWelcomeView}/>
              <Route exact path={ROUTES.total} render={this.renderTotalPriceView}/>
              <Route exact path={ROUTES.recipes} render={this.renderRecipesView}/>
              <Route exact path={ROUTES.search} render={this.renderDishSearchView}/>
              <Route path={ROUTES.dish} render={this.renderDishDetailsView}/>
            </Fragment>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;