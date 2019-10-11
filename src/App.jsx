import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/Users/UsersContainer';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container mainGrid">
          <SidebarContainer />
          <div className="content">
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/messages" render={() => <MessagesContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
