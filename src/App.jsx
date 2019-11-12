import React from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { initializeThunkCreator } from './redux/app-reducer';
import './App.css';

import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {
  componentDidMount() {
      this.props.initialize();
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }

    return (
      <>
        <HeaderContainer />
        <main>
          <div className="container mainGrid">
            <SidebarContainer />
            <div className="content">
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/messages" render={() => <MessagesContainer />} />
              <Route path="/users" render={() => <UsersContainer />} />
              <Route path="/login" render={() => <Login />} />
            </div>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  initialized: state.app.initialization
})

export default connect(mapStateToProps, {initialize: initializeThunkCreator})(App);
