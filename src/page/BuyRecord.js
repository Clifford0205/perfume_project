import React from 'react';
import Language from '../component/Language';
import MyNavbar from '../component/MyNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import store from '../store/index.js';
import './BuyRecord.scss';
import { Link, withRouter } from 'react-router-dom';
import 'animate.css/animate.min.css';
import {
  InputChangeAction,
  getProducteAction,
  deleteCartAction,
} from '../store/actionCreators.js';

class BuyRecord extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = store.getState();
    if (this.mounted) {
      store.subscribe(this.handleStoreChange);
    }

    // console.log(this.state);
  }

  handleStoreChange = () => {
    this.setState(store.getState());
    // // console.log('store change');
  };

  //生命週期:一開始載入資料
  componentDidMount() {
    // console.log(url_id);
    // console.log(state_id);
    this.mounted = true;
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
    // console.log(this.state.my_buy_record);
    return (
      <>
        <MyNavbar />
        <Container className="BuyRecord">
          <section>
            <img src="/images/2000x.webp" alt="" className="w-100" />
          </section>
          <Container className="pb-5">
            <h2 className="text-center">購買紀錄</h2>
            <ul>
              {this.state.my_buy_record.map(item => (
                <li key={item.id} className="single-order">
                  <Row>
                    <Col className="">
                      {item.product.map((item, index) => (
                        <div className="d-flex" key={index}>
                          <Link
                            to={'/ProductDetail/' + item.product_id}
                            className=" name text-nowrap"
                          >
                            品項:{item.name}
                          </Link>
                          <div className="ml-3 amount text-nowrap">
                            數量:{item.amount}
                          </div>
                          <div className="ml-3 price text-nowrap">
                            單價:{item.price}
                          </div>
                        </div>
                      ))}
                    </Col>

                    <Col className="">
                      <div className="recipient_name">
                        收件人姓名:{item.recipient_name}
                      </div>

                      <div className="recipient_name">
                        收件人手機:{item.recipient_mobile}
                      </div>

                      <div className="recipient_address">
                        <p>
                          收件人地址:
                          {item.delivery_city + '  ' + item.delivery_town}
                          <br />
                          {item.recipient_road}
                        </p>
                      </div>
                    </Col>

                    <Col>
                      <div className="">
                        <p>訂單總金額:{item.total}</p>
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <p>付款方式:{item.pay_way2}</p>
                    </div>
                    <div className="">
                      <p>訂單成立時間:{item.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Container>

        <Language />
      </>
    );
  }
}

export default withRouter(BuyRecord);
