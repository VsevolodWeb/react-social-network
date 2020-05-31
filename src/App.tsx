import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';

import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import Login from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';
import {connect} from "react-redux";
import {initializeThunkCreator} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapDispatchToPropsType = {
  initialize: () => void
}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const App: React.FC<PropsType> = props => {
	useEffect(() => {
		props.initialize()
	}, [])
	
	if (!props.initialized) {
		return <Preloader/>
	}

	return (
		<>
			<HeaderContainer/>
			<main>
				<div className="container mainGrid">
					<SidebarContainer/>
					<div className="content">
						<Switch>
							<Redirect exact from="/" to="/profile"/>
							<Route path="/profile/:userId?" render={() => {
								return <Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>
							}}/>
							<Route path="/messages" component={MessagesContainer}/>
							<Route path="/users" render={() => {
								return <Suspense fallback={<Preloader/>}><UsersContainer/></Suspense>
							}}/>
							<Route path="/login" component={Login}/>
							<Route render={() => <div>404</div>}/>
						</Switch>
					</div>
				</div>
			</main>
		</>
	);
}


const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialization
});


export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
  (mapStateToProps, {initialize: initializeThunkCreator})(App);