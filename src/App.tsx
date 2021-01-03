import React, {Suspense, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {QueryParamProvider} from 'use-query-params'
import {Layout} from 'antd'
import {connect, useSelector} from 'react-redux'
import {AppStateType} from './redux/redux-store'
import MainHeader from './components/MainHeader/MainHeader'
import MessagesContainer from './components/Messages/MessagesContainer'
import {Login} from './components/Login/Login'
import Preloader from './components/common/Preloader/Preloader'
import {initializeThunkCreator} from './redux/app-reducer'
import MainMenu from './components/MainMenu/MainMenu'
import {getAuthIsAuth} from './redux/auth-selectors'
import './App.css'
const {Header, Content, Footer, Sider} = Layout

const UsersContainer = React.lazy(
	() => import('./components/Users/UsersContainer')
		.then(module => ({default: module.UsersPage}))
)
const ProfileContainer = React.lazy(
	() => import('./components/Profile/ProfileContainer').then(module => ({default: module.ProfileContainer}))
)

type MapDispatchToPropsType = {
	initialize: () => void
}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const App: React.FC<PropsType> = props => {
	const isAuth = useSelector(getAuthIsAuth)

	useEffect(() => {
		props.initialize()
	}, [props])

	if (!props.initialized) {
		return <Preloader/>
	}

	return (
		<Layout>
			<Header className="header">
				<MainHeader/>
			</Header>
			<Content style={{padding: '0 50px'}}>
				<Layout className="site-layout-background" style={{padding: '24px 0'}}>
					{isAuth && <Sider width={200}>
						<MainMenu/>
					</Sider>}
					<Content style={{padding: '0 24px', minHeight: 280}}>
						<Switch>
							<Redirect exact from="/" to="/profile"/>
							<Route path="/profile/:userIdParam?"
							       render={() => <Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}/>
							<Route path="/messages" component={MessagesContainer}/>
							<Route path="/users" render={() => {
								return <Suspense fallback={<Preloader/>}>
									<QueryParamProvider ReactRouterRoute={Route}>
										<UsersContainer/>
									</QueryParamProvider>
								</Suspense>
							}}/>
							<Route path="/login" component={Login}/>
							<Route render={() => <div>404</div>}/>
						</Switch>
					</Content>
				</Layout>
			</Content>
			<Footer style={{textAlign: 'center'}}>©{new Date().getFullYear()} React Social Network</Footer>
		</Layout>
		// <>
		// 	<Header/>
		// 	<main>
		// 		<div className="container mainGrid">
		// 			<Sidebar/>
		// 			<div className="content">
		// 				<Switch>
		// 					<Redirect exact from="/" to="/profile"/>
		// 					<Route path="/profile/:userIdParam?"
		// 					       render={() => <Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}/>
		// 					<Route path="/messages" component={MessagesContainer}/>
		// 					<Route path="/users" render={() => {
		// 						return <Suspense fallback={<Preloader/>}>
		// 							<QueryParamProvider ReactRouterRoute={Route}>
		// 								<UsersContainer/>
		// 							</QueryParamProvider>
		// 						</Suspense>
		// 					}}/>
		// 					<Route path="/login" component={Login}/>
		// 					<Route render={() => <div>404</div>}/>
		// 				</Switch>
		// 			</div>
		// 		</div>
		// 	</main>
		// </>
	)
}


const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialization
})


export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
(mapStateToProps, {initialize: initializeThunkCreator})(App)
