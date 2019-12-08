import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Customer.css';

class Customer extends Component{
  constructor(props) {
    super();
    this.state = {
      input_id: 12345,
      input_name: 'New_Customer',
      input_age: 30,
    };
  }

  render() {
    const { customers, setState, add_customers, enter_hall } = this.props;
    const { input_id, input_name, input_age } = this.state;

    return(
      <div>
      <table>
      <tr>
      <th>
      ID
      </th>
      <th>
      이름
      </th>
      <th>
      나이
      </th>
      <th>
      등급
      </th>
      <th>
      선택
      </th>
      </tr>
      {Object.keys(customers).map((key) => {
          return (
              <tr>
                <td>
                {customers[key].id}
                </td>
                <td>
                {customers[key].name}
                </td>
                <td>
                {customers[key].age}
                </td>
                <td>
                {customers[key].tier}
                </td>
                <td>
                <input type="button" value="입장하기" onClick={()=>enter_hall(key)}/>
                </td>
              </tr>
            );
        })}
        <tr>
          <td>
          <input type="number" value={input_id} onChange={((m)=>this.setState({input_id: m.target.value}))} />
          </td>
          <td>
          <input type="text" value={input_name} onChange={((m)=>this.setState({input_name: m.target.value}))}/>
          </td>
          <td>
          <input type="number" value={input_age} onChange={((m)=>this.setState({input_age: m.target.value}))}/>
          </td>
          <td>
          X
          </td>
          <td>
          <input type="button" value="고객추가" onClick={()=>add_customers(input_id, input_name, input_age)} />
          </td>
        </tr>
        </table>
      </div>
    );
  }
};

export default Customer;
