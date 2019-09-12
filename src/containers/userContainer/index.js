import React, { Component } from 'react';
import './index.less';

export default class AContainer extends Component {
  async componentDidMount() {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('promise done');
      }, 3000);
    });
    console.log(res);
  }

  render() {
    return (
      <div>
        <h3>hello world ～ user page</h3>
      </div>
    );
  }
}
