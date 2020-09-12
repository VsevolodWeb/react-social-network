import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MessagesContainer from './components/Messages/MessagesContainer';
import {Login} from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';
import {connect} from 'react-redux';
import {initializeThunkCreator} from './redux/app-reducer';
import {AppStateType} from './redux/redux-store';

const UsersContainer = React.lazy(
	() => import('./components/Users/UsersContainer')
		.then(module => ({default: module.UsersPage}))
);
const ProfileContainer = React.lazy(
	() => import('./components/Profile/ProfileContainer').then(module => ({default: module.ProfileContainer}))
);

type MapDispatchToPropsType = {
	initialize: () => void
}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const App: React.FC<PropsType> = props => {
	useEffect(() => {
		props.initialize()
	}, [props])

	if (!props.initialized) {
		return <Preloader/>
	}

	return (
		<>
			<Header/>
			<main>
				<div className="container mainGrid">
					<Sidebar/>
					<div className="content">
						<Switch>
							<Redirect exact from="/" to="/profile"/>
							<Route path="/profile/:userIdParam?"
							       render={() => <Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}/>
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
