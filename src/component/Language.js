import React from 'react';
import './Language.scss';
import { languageChangeAction } from '../store/actionCreators.js';
import store from '../store/index.js';
import { withRouter } from 'react-router-dom';;

class Language extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.mounted = false;
    store.subscribe(this.handleStoreChange);
    // console.log(this.state);
  }

  handleStoreChange = () => {
    if (this.mounted) {
      this.setState(store.getState());
    }
  };

  //生命週期:一開始載入資料
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChangeLanguage = () => {
    // console.log('我被點即了');
    // $('.lanChange').toggleClass('active');
    const action = languageChangeAction();
    store.dispatch(action);
  };

  render() {
    return (
      <>
        <div className="myLanguage p-1 d-inline">
          <div
            className="switch  text-center ml-auto"
            onClick={this.handleChangeLanguage}
          >
            {/* <span className="p-1 lanChange">EN</span> */}
            <span
              className={`${
                this.state.chinese ? ' p-1 lanChange' : 'active p-1 lanChange'
              }`}
            >
              EN
            </span>
            /
            <span
              className={`${
                this.state.chinese ? 'active p-1 lanChange' : ' p-1 lanChange'
              }`}
            >
              繁
            </span>
            <div className={`${this.state.chinese}`}></div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Language);
