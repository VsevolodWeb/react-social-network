import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import MessagesContainer from './components/Messages/MessagesContainer';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container mainGrid">
          <SidebarContainer />
          <div className="content">
            <Route path="/profile" render={() => <ProfileContainer />} />
            <Route path="/messages" render={() => <MessagesContainer />} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
