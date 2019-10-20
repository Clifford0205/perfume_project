import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import ProductDetail from './page/ProductDetail';
import ProductList from './page/ProductList';
import './Myapp.scss';
import MemberEdit from './page/MemberEdit';
import ShoppingCart from './page/ShoppingCart';
import CheckOut from './page/CheckOut';
import BuyRecord from './page/BuyRecord';

function App() {
  return (
    <>
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/productlist" component={ProductList} />
            <Route path="/ProductDetail/:id" component={ProductDetail} />
            <Route path="/member/edit/:id" component={MemberEdit} />
            <Route path="/member/cart/:id" component={ShoppingCart} />
            <Route path="/member/checkout/:id" component={CheckOut} />
            <Route path="/member/buy_record/:id" component={BuyRecord} />
          </Switch>
        </>
      </Router>
    </>
  );
}

export default App;
