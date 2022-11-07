import React, { Component } from 'react';
import Header from '../components/Header';
// import Loading from '../components/Loading';
// import { getUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  // state = {
  //   isLoading: true,
  // };

  // async componentDidMount() {
  //   const fetch = getUser();
  //   this.setState({user});
  // }

  render() {
    // const { isLoading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {/* {
          isLoading
            ? <Loading />
            : (
              <form action="">
                <input type="text" />
              </form>
            )
        } */}
      </div>
    );
  }
}
