import React from 'react';
import { paginateChangeAction } from '../store/actionCreators.js';

import store from '../store/index.js';
import './Pagination.scss';
import $ from 'jquery';

import { withRouter } from 'react-router-dom';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.mounted = false;
    store.subscribe(this.handleStoreChange);
  }

  //生命週期:一開始載入資料
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleStoreChange = () => {
    if (this.mounted) {
      this.setState(store.getState());
    }
  };

  //生命週期:state的改變
  componentDidUpdate() {
    var nowpage = this.state.currentPage;
    console.log(typeof nowpage);
    let page_item = document.querySelectorAll('.page-item');
    for (let i = 0; i < page_item.length; i++) {
      page_item[i].classList.remove('noshow');
      // console.log(page_item[i].childNodes[0].innerText);
      let pageNum = page_item[i].childNodes[0].innerText;

      console.log(page_item.length);
      if (nowpage === 1 && pageNum > nowpage + 4) {
        page_item[i].classList.add('noshow');
      }

      if (nowpage === 2 && pageNum > nowpage + 3) {
        page_item[i].classList.add('noshow');
      }

      if (nowpage === page_item.length && pageNum < nowpage - 4) {
        page_item[i].classList.add('noshow');
      }
      if (nowpage === page_item.length - 1 && pageNum < nowpage - 3) {
        page_item[i].classList.add('noshow');
      }
      if (
        (nowpage !== 1 && nowpage !== 2 && pageNum > nowpage + 2) ||
        (nowpage !== page_item.length &&
          nowpage !== page_item.length - 1 &&
          pageNum < nowpage - 2)
      ) {
        page_item[i].classList.add('noshow');
      }
    }
    // $('.page-item').removeClass('noshow');
    // $('.page-item').each(function() {
    //   console.log($(this));
    //   if (
    //     $(this)
    //       .find('.page-link')
    //       .text() >
    //       nowpage + 2 ||
    //     $(this)
    //       .find('.page-link')
    //       .text() <
    //       nowpage - 2
    //   ) {
    //     $(this).addClass('noshow');
    //   }
    // });
  }

  paginate = item => () => {
    const action = paginateChangeAction(item);
    store.dispatch(action);
    // console.log(this.state.currentPage);
  };

  goPrevious = () => {
    const action = paginateChangeAction(
      this.state.currentPage - 1 < 1 ? 1 : this.state.currentPage - 1
    );
    store.dispatch(action);
    // console.log(this.state.currentPage);
  };

  goNext = () => {
    const action = paginateChangeAction(
      this.state.currentPage + 1 >
        Math.ceil(this.props.totalPosts / this.state.postPerPage)
        ? this.state.currentPage
        : this.state.currentPage + 1
    );
    store.dispatch(action);
    // console.log(this.state.currentPage);
  };

  render() {
    // console.log(this.state.currentPage);
    const pageNumbers = [];
    let totalPosts = this.props.totalPosts;
    let postPerPage = this.state.postPerPage;

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <>
        <nav className="mx-auto mypagination">
          <ul className="pagination">
            <li onClick={this.goPrevious} className="d-flex">
              <img
                src="/images/icon_Slippery_left.svg"
                alt=""
                className="align-self-center"
              />
            </li>
            {pageNumbers.map(item => (
              <li
                key={item}
                className={
                  item === this.state.currentPage
                    ? 'active page-item'
                    : 'page-item'
                }
              >
                <div onClick={this.paginate(item)} className="page-link">
                  {item}
                </div>
              </li>
            ))}
            <li onClick={this.goNext} className="d-flex">
              <img
                src="/images/icon_Slippery_right.svg"
                alt=""
                className="align-self-center"
              />
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default withRouter(Pagination);
