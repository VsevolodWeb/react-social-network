import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Column from './components/Column/Column';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';

function App(props) {
  return (
    <>
      <Header />
      <main>
        <div className="container mainGrid">
          <Column state={props.data.friends} />
          <div className="content">
            <Route path="/profile" render={() => <Profile state={props.data.profile} dispatch={props.dispatch} />} />
            <Route path="/messages" render={() => <Messages state={props.data.dialogs} dispatch={props.dispatch} />} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
