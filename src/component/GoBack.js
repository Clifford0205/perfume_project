import React from 'react';
import './GoBack.scss';
import {} from 'react-bootstrap';
import store from '../store/index.js';
import $ from 'jquery';
import { FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';

import { Link, Redirect, withRouter } from 'react-router-dom';

class GoBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
    // console.log(this.state);
  }

  handleStoreChange = () => {
    this.setState(store.getState());
    // // console.log('store change');
  };

  //生命週期:一開始載入資料
  componentDidMount() {}

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <div className="goback  m-5 d-flex" onClick={this.goBack}>
          <span className="arrow d-block"></span>
          <p>BACK</p>
        </div>
      </>
    );
  }
}

export default withRouter(GoBack);
