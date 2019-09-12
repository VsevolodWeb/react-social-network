import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';

function App(props) {
  return (
    <>
      <Header />
      <main>
        <div className="container mainGrid">
          <Sidebar state={props.data.sidebarReducer.friends} dispatch={props.dispatch} />
          <div className="content">
            <Route path="/profile" render={() => <Profile state={props.data.profileReducer.postsData} dispatch={props.dispatch} />} />
            <Route path="/messages" render={() => <Messages state={props.data.dialogsReducer.dialogsData} dispatch={props.dispatch} />} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
