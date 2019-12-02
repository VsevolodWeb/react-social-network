import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import Login from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

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
              <Route path="/profile/:userId?" render={() => {
                return <Suspense fallback={<Preloader/>}><ProfileContainer /></Suspense>
              }}/>
              <Route path="/messages" render={() => <MessagesContainer />} />
              <Route path="/users" render={() => {
                return <Suspense fallback={<Preloader/>}><UsersContainer /></Suspense>
              }} />
              <Route path="/login" render={() => <Login />} />
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
