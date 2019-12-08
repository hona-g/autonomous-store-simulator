import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Cart.css';

class Cart extends Component{
  constructor(props) {
    super();
  }

  render() {
    const { goods, goodsitem, location, setState } = this.props;

    return(
      <div>
        <table>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>진열개수</th>
          <th>담은개수</th>
          <th>담기</th>
        </tr>
        {Object.keys(goods).map((key) => {
          return (
            <tr>
              <td>
              {key}
              </td>
              <td>
              {goods[key].name}
              </td>
              <td>
              {goodsitem[key] ? goodsitem[key].stock : 'error'}
              </td>
              <td>
              {0}
              </td>
              <td>
              <input type="button" value="담기" />
              </td>
            </tr>
          );
        })}
        </table>
        <p>
        <input type="button" value="계산하기" onClick={()=>setState({ location: 'hall' })} />
        <input type="button" value="훔치기" />
        <input type="button" value="장바구니비우기" />
        <input type="button" value="아무 것도 안함" />
        </p>
      </div>
    );
  }
};

export default Cart;
