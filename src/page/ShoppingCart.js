import React from 'react';
import Language from '../component/Language';
import MyNavbar from '../component/MyNavbar';
import { Container, Button } from 'react-bootstrap';
import store from '../store/index.js';
import './ShoppingCart.scss';
import { Link, withRouter } from 'react-router-dom';
import 'animate.css/animate.min.css';
import {
  InputChangeAction,
  getProducteAction,
  deleteCartAction,
} from '../store/actionCreators.js';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
  }

  handleStoreChange = () => {
    if (this.mounted) {
      this.setState(store.getState());
    }
  };

  //生命週期:一開始載入資料
  componentDidMount() {
    this.mounted = true;
    // console.log(this.mounted);
    if (this.mounted) {
      let action = '';
      action = getProducteAction();
      store.dispatch(action);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleFormInputChange = e => {
    const action = InputChangeAction(e.target.value, e.target.name);
    store.dispatch(action);
  };

  handleTitleClick = e => {
    // console.log(e.target.id);
    let allhide = document.querySelectorAll('.thehide');
    let alltitle = document.querySelectorAll('.the-title');
    for (let i = 0; i < allhide.length; i++) {
      allhide[i].classList.remove('show');
    }
    for (let i = 0; i < alltitle.length; i++) {
      alltitle[i].classList.remove('active');
    }

    document.querySelector(`.${e.target.id}`).classList.add('show');
    document.querySelector(`#${e.target.id}`).classList.add('active');
  };

  handleCancel = e => {
    // let clickID =
    //   [].indexOf.call(
    //     e.target.parentNode.parentNode.children,
    //     e.target.parentNode
    //   ) + 1;

    //會員ID
    let member_id = this.state.my_id;

    //得到點擊欄位的id
    let clickID = e.target.parentNode.dataset.id;

    // 點擊以外的留下，傳給API,+號為了轉成數字
    let shopping_cart = this.state.my_cart.filter(item => item.id !== +clickID);

    let delItem = {
      shopping_cart: { shopping_cart: shopping_cart },
      id: member_id,
    };
    const action = deleteCartAction(delItem);
    store.dispatch(action);
  };

  render() {
    return (
      <>
        <MyNavbar />
        <Container className="ShoppingCart">
          <section>
            <img src="/images/2000x.webp" alt="" className="w-100" />
          </section>
          <Container className="pb-5">
            <h2 className="text-center">購物車和訂單紀錄</h2>
            <ul className="d-flex   my-3 choose-title">
              <li
                className="w-100 text-center the-title active"
                id="cart"
                onClick={this.handleTitleClick}
              >
                我的購物車
              </li>
            </ul>

            <div className="cart thehide show">
              <div
                className="no-product mt-3"
                style={{
                  display: `${
                    this.state.my_cart.length === 0 ? 'block' : 'none'
                  }`,
                }}
              >
                <h5 className="text-center">目前購物車內無商品</h5>
              </div>
              <ul>
                {this.state.my_cart.map(item => (
                  <li key={item.id} className="row" data-id={item.id}>
                    <Link
                      to={'/ProductDetail/' + item.product_id}
                      className="col"
                    >
                      <img src={item.img} alt="" />
                    </Link>
                    <p className="col">購買數量:{item.amount}</p>
                    <p className="col">單價:{item.price}</p>
                    <p className="col ">
                      小計:
                      <span className="subtotal">
                        {item.amount * item.price}
                      </span>
                    </p>

                    <Button
                      className="text-center cancel"
                      onClick={this.handleCancel}
                    >
                      X
                    </Button>
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-right">總計:{this.state.bigTotal}</p>
              </div>
              <div>
                <Link to={`/member/checkout/${this.state.my_id}`}>
                  <Button
                    className="ml-auto "
                    style={{
                      display: `${
                        this.state.my_cart.length === 0 ? 'none' : 'block'
                      }`,
                    }}
                  >
                    前往結帳
                  </Button>
                </Link>
              </div>
            </div>
            <div className="buy-record thehide">
              <ul></ul>
            </div>
          </Container>
        </Container>

        <Language />
      </>
    );
  }
}

export default withRouter(ShoppingCart);
