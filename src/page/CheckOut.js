import React from 'react';
import Language from '../component/Language';
import MyNavbar from '../component/MyNavbar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import store from '../store/index.js';
import './CheckOut.scss';
import { Redirect, Link, withRouter } from 'react-router-dom';
import 'animate.css/animate.min.css';
import {
  InputChangeAction,
  getProducteAction,
  deleteCartAction,
  cleanRecipientAction,
  loadZoneAction,
  zoneChangeAction,
  zoneSaveAction,
  cardNumberAction,
  payWayAction,
  addInorderAction,
  newRecipientAction,
} from '../store/actionCreators.js';
import Zone_data from '../component/Zone_data';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.mounted = false;
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
    if (this.mounted) {
      let action = '';
      action = getProducteAction();
      store.dispatch(action);

      let cityops = [];
      let townops = [];

      for (let i = 0; i < Zone_data.length; i++) {
        cityops.push(Zone_data[i].城市);
      }

      for (let j = 0; j < Zone_data[0].地區.length; j++) {
        townops.push(Zone_data[0].地區[j]);
      }

      action = loadZoneAction(cityops, townops);
      store.dispatch(action);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  changeArea = e => {
    let index = Zone_data.findIndex(item => item.城市 === e.target.value);
    let townops = [];
    for (let j = 0; j < Zone_data[index].地區.length; j++) {
      townops.push(Zone_data[index].地區[j]);
    }
    const action = zoneChangeAction(townops);
    store.dispatch(action);
  };

  handleFormInputChange = e => {
    const action = InputChangeAction(e.target.value, e.target.name);
    store.dispatch(action);
  };

  handleAreaState = e => {
    const action = zoneSaveAction(e.target.value, e.target.name);
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

  handleTitleClick = e => {
    // console.log(e.target.id);
    let allhide = document.querySelectorAll('.thehide');
    let alltitle = document.querySelectorAll('.the-title');
    for (let i = 0; i < allhide.length; i++) {
      allhide[i].value = '';
      allhide[i].classList.remove('show');
    }
    for (let i = 0; i < alltitle.length; i++) {
      alltitle[i].classList.remove('active');
    }

    document.querySelector(`.${e.target.id}`).classList.add('show');
    document.querySelector(`#${e.target.id}`).classList.add('active');
  };

  handleClean = () => {
    const action = cleanRecipientAction();
    store.dispatch(action);
  };

  handleNewRecipient = () => {
    const action = newRecipientAction();
    store.dispatch(action);
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

    //點擊以外的留下，傳給API,+號為了轉成數字
    let shopping_cart = this.state.my_cart.filter(item => item.id !== +clickID);
    let delItem = {
      shopping_cart: { shopping_cart: shopping_cart },
      id: member_id,
    };
    const action = deleteCartAction(delItem);
    store.dispatch(action);
  };

  handleNext = (event, next) => {
    if (event.target.value.length === event.target.maxLength) {
      document.querySelector(`.${next}`).focus();
    }
  };

  handleCardNo = e => {
    let cardnum = '';
    let allcardno = document.querySelectorAll('.cardno');

    for (let i = 0; i < allcardno.length; i++) {
      if (i < 3) {
        cardnum += allcardno[i].value + '-';
      } else {
        cardnum += allcardno[i].value;
      }
    }

    const action = cardNumberAction(cardnum);
    store.dispatch(action);
  };

  handleValidMonth = e => {
    const action = InputChangeAction(e.target.value, e.target.name);
    store.dispatch(action);
  };

  handleValidYear = e => {
    const action = InputChangeAction(e.target.value, e.target.name);
    store.dispatch(action);
  };

  handlePayWay = e => {
    const action = payWayAction(e.target.value, e.target.name);
    store.dispatch(action);
    let allcardno = document.querySelectorAll('.cardno');

    for (let i = 0; i < allcardno.length; i++) {
      allcardno[i].value = '';
    }
  };

  handleBuy = () => {
    //訂單成立時間
    var Today = new Date();
    let now =
      Today.getFullYear() +
      '/' +
      (Today.getMonth() + 1) +
      '/' +
      Today.getDate() +
      ' ' +
      Today.getHours();

    let minutes = '0' + Today.getMinutes();
    let m = minutes.slice(minutes.length - 2, minutes.length);

    let time = now + ':' + m;

    //放入購買紀錄的id
    let record_id = '';
    if (this.state.my_buy_record.length !== 0) {
      record_id = this.state.my_buy_record.slice(-1)[0].id + 1;
    } else {
      record_id = 1;
    }

    //簡單的商品資料
    let product = this.state.my_cart.map(item => ({
      name: item.product_name,
      amount: item.amount,
      price: item.price,
      product_id: item.product_id,
    }));

    let total = this.state.bigTotal;

    // console.log(product);

    let orderer = this.state.my_name;

    let orderer_mail = this.state.my_mail;

    let recipient_name = this.state.new_recipient
      ? this.state.recipient_name
      : this.state.my_name;

    let recipient_mobile = this.state.new_recipient
      ? this.state.recipient_mobile
      : this.state.my_mobile;

    let recipient_mail = this.state.new_recipient
      ? this.state.recipient_mail
      : this.state.my_mail;

    if (this.state.new_recipient && this.state.recipient_name === '') {
      alert('請輸入收件人姓名');
      return;
    }

    if (this.state.new_recipient && this.state.recipient_mobile === '') {
      alert('請輸入收件人手機號碼');
      return;
    }
    // console.log();

    let delivery_city = this.state.delivery_city;

    let delivery_town = this.state.delivery_town;

    let recipient_road = this.state.recipient_road;

    if (
      delivery_city.trim() === '' ||
      delivery_town.trim() === '' ||
      recipient_road.trim() === ''
    ) {
      alert('請輸入完整地址');
      return;
    }

    let pay_way = this.state.pay_way;
    let pay_way2 = '';

    let card_number = this.state.card_number;
    let valid_month = this.state.valid_month;
    let valid_year = this.state.valid_year;
    let back_num = this.state.back_num;

    if (pay_way === '') {
      alert('請選擇付款方式');
      return;
    }

    if (pay_way === 'credit_card') {
      if (card_number.length < 19) {
        alert('卡號輸入有誤');
        return;
      }

      if (!valid_month) {
        alert('請輸入正確日期');
        return;
      }

      if (!valid_year) {
        alert('請輸入正確日期');
        return;
      }

      if (back_num.length < 3) {
        alert('背面末三碼填寫錯誤');
        return;
      }
      pay_way2 = '信用卡';
    }

    if (pay_way === 'cash') {
      pay_way2 = '貨到付款';
    }
    // console.log(delivery_city);

    const data = {
      buy_record: {
        buy_record: [
          ...this.state.my_buy_record,
          {
            time: time,
            id: record_id,
            product: product,
            total: total,
            orderer: orderer,
            orderer_mail: orderer_mail,
            recipient_name: recipient_name,
            recipient_mobile: recipient_mobile,
            recipient_mail: recipient_mail,
            delivery_city: delivery_city,
            delivery_town: delivery_town,
            recipient_road: recipient_road,
            pay_way2: pay_way2,
          },
        ],
        shopping_cart: [],
      },
      id: this.state.my_id,
    };

    const action = addInorderAction(data);
    store.dispatch(action);
  };

  render() {
    console.log(this.state);

    if (
      this.state.my_id !== +this.props.match.params.id &&
      this.state.my_id &&
      +this.props.match.params.id
    ) {
      return <Redirect to="/" />;
    } else
      return (
        <>
          <MyNavbar />
          <Container className="CheckOut">
            <section>
              <img src="/images/2000x.webp" alt="" className="w-100" />
            </section>
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
            <div
              className="pb-5"
              style={{
                display: `${
                  this.state.my_cart.length === 0 ? 'none' : 'block'
                }`,
              }}
            >
              <h2 className="text-center">結帳頁面</h2>
              <div className="cart">
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
                <div className="order-info">
                  <div className="order-title text-center">訂購人資料</div>
                  <ul className="">
                    <li className="mt-3 d-flex">
                      <p>姓名:</p>
                      <input
                        type="text"
                        value={this.state.my_name}
                        readOnly
                        className="form-control "
                      />
                    </li>
                    <li className="mt-3  d-flex">
                      <p> E-mail:</p>
                      <input
                        type="text"
                        value={this.state.my_mail}
                        readOnly
                        className="form-control "
                      />
                    </li>

                    <li className="mt-3  d-flex">
                      <p> 手機號碼:</p>
                      <input
                        type="text"
                        value={this.state.my_mobile}
                        readOnly
                        className="form-control "
                      />
                    </li>
                  </ul>
                </div>
                <div className="Recipient-info">
                  <div className="Recipient-title">收件人資料</div>
                  <ul className="d-flex   my-3 choose-title">
                    <li
                      className="w-100 text-center the-title active"
                      id="same"
                      onClick={event => {
                        this.handleTitleClick(event);
                        this.handleClean(event);
                      }}
                    >
                      同訂購人
                    </li>
                    <li
                      className="w-100  text-center the-title "
                      id="new"
                      onClick={event => {
                        this.handleTitleClick(event);
                        this.handleNewRecipient(event);
                      }}
                    >
                      新增資料
                    </li>
                  </ul>
                  <ul className="thehide same show">
                    <li className="mt-3  d-flex">
                      <p>姓名:</p>
                      <input
                        type="text"
                        value={this.state.my_name}
                        readOnly
                        className="form-control "
                      />
                    </li>
                    <li className="mt-3  d-flex">
                      <p>E-mail:</p>
                      <input
                        type="text"
                        value={this.state.my_mail}
                        readOnly
                        className="form-control "
                      />
                    </li>
                    <li className="mt-3  d-flex">
                      <p> 手機號碼:</p>
                      <input
                        type="text"
                        value={this.state.my_mobile}
                        readOnly
                        className="form-control "
                      />
                    </li>
                  </ul>

                  <ul className="thehide new">
                    <li className="mt-3  d-flex">
                      <p>姓名:</p>
                      <input
                        type="text"
                        value={this.state.recipient_name}
                        onChange={this.handleFormInputChange}
                        name="recipient_name"
                        className="form-control "
                      />
                    </li>
                    <li className="mt-3  d-flex">
                      <p>E-mail:</p>
                      <input
                        type="text"
                        value={this.state.recipient_mail}
                        onChange={this.handleFormInputChange}
                        name="recipient_mail"
                        className="form-control "
                      />
                    </li>
                    <li className="mt-3  d-flex">
                      <p>手機號碼:</p>
                      <input
                        type="text"
                        value={this.state.recipient_mobile}
                        onChange={this.handleFormInputChange}
                        name="recipient_mobile"
                        className="form-control "
                      />
                    </li>
                  </ul>

                  <div className="row">
                    <Col md={4} className="mt-3">
                      <select
                        onChange={e => {
                          this.changeArea(e);
                          this.handleAreaState(e);
                        }}
                        name="delivery_city"
                        className="d-block mx-auto form-control"
                      >
                        {this.state.cityops.map((item, index) => {
                          if (index === 0) {
                            return (
                              <option
                                key={index}
                                value={item}
                                disabled
                                selected
                              >
                                {item}
                              </option>
                            );
                          } else {
                            return (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </Col>
                    <Col md={4} className="mt-3">
                      <select
                        onChange={e => {
                          this.handleAreaState(e);
                        }}
                        name="delivery_town"
                        className="d-block mx-auto form-control"
                      >
                        {this.state.townops.map((item, index) => {
                          if (index === 0) {
                            return (
                              <option
                                key={index}
                                value={item}
                                disabled
                                selected
                              >
                                {item}
                              </option>
                            );
                          } else {
                            return (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </Col>

                    <Col md={4} className="d-flex mt-3">
                      <p>路段地址:</p>
                      <input
                        type="text"
                        value={this.state.recipient_road}
                        onChange={this.handleFormInputChange}
                        name="recipient_road"
                        className="d-block mx-auto form-control"
                      />
                    </Col>
                  </div>
                </div>
                <div className="">
                  <p>請選擇付款方式</p>
                  <select
                    name="pay_way"
                    id=""
                    onChange={e => this.handlePayWay(e)}
                  >
                    <option value="" disabled selected>
                      請選擇
                    </option>
                    <option value="cash">貨到付款</option>
                    <option value="credit_card">信用卡</option>
                  </select>
                </div>
                <Row
                  className="mt-3"
                  style={{
                    display: `${
                      this.state.pay_way === 'credit_card' ? 'flex' : 'none'
                    }`,
                  }}
                >
                  <Col md={4} className="mt-3">
                    信用卡卡號:
                    <input
                      type="text"
                      name="T1"
                      maxLength="4"
                      size="4"
                      onKeyUp={(event, T2) => this.handleNext(event, 'T2')}
                      className="T1 cardno"
                      onChange={e => this.handleCardNo(e)}
                    />
                    -
                    <input
                      type="text"
                      name="T2"
                      maxLength="4"
                      size="4"
                      onKeyUp={(event, T2) => this.handleNext(event, 'T3')}
                      className="T2 cardno"
                      onChange={e => this.handleCardNo(e)}
                    />
                    -
                    <input
                      type="text"
                      name="T3"
                      maxLength="4"
                      size="4"
                      onKeyUp={(event, T2) => this.handleNext(event, 'T4')}
                      className="T3 cardno"
                      onChange={e => this.handleCardNo(e)}
                    />
                    -
                    <input
                      type="text"
                      name="T4"
                      maxLength="4"
                      size="4"
                      className="T4 cardno"
                      onChange={e => this.handleCardNo(e)}
                    />
                  </Col>
                  <Col md={4} className="mt-3">
                    有效日期:
                    <select
                      name="valid_month"
                      id=""
                      onChange={e => this.handleValidMonth(e)}
                      value={this.state.valid_month}
                    >
                      <option disabled selected value="">
                        請選擇
                      </option>
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </select>
                    月
                    <select
                      name="valid_year"
                      id=""
                      onChange={e => this.handleValidYear(e)}
                      value={this.state.valid_year}
                    >
                      <option disabled selected value="">
                        請選擇
                      </option>
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                    </select>
                    年
                  </Col>
                  <Col md={4} className="mt-3">
                    背面末三碼:
                    <input
                      type="text"
                      maxLength="3"
                      size="3"
                      name="back_num"
                      onChange={e => this.handleFormInputChange(e)}
                      value={this.state.back_num}
                    />
                  </Col>
                </Row>

                <div>
                  <h3 className="text-right">總計:{this.state.bigTotal}</h3>
                  <Button
                    className="ml-auto d-block "
                    onClick={e => this.handleBuy(e)}
                  >
                    確認購買
                  </Button>
                </div>
              </div>
            </div>
          </Container>

          <Language />
        </>
      );
  }
}

export default withRouter(ShoppingCart);
