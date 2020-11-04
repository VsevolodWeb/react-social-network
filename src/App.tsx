import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {QueryParamProvider} from 'use-query-params'
import {Breadcrumb, Layout, Menu} from "antd";
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import './App.css';
//import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MessagesContainer from './components/Messages/MessagesContainer';
import {Login} from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';
import {connect} from 'react-redux';
import {initializeThunkCreator} from './redux/app-reducer';
import {AppStateType} from './redux/redux-store';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

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
		<Layout>
			<Header/>
			<Content style={{padding: '0 50px'}}>
				<Breadcrumb style={{margin: '16px 0'}}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<Layout className="site-layout-background" style={{padding: '24px 0'}}>
					<Sider className="site-layout-background" width={200}>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							style={{height: '100%'}}
						>
							<SubMenu key="sub1" icon={<UserOutlined/>} title="subnav 1">
								<Menu.Item key="1">option1</Menu.Item>
								<Menu.Item key="2">option2</Menu.Item>
								<Menu.Item key="3">option3</Menu.Item>
								<Menu.Item key="4">option4</Menu.Item>
							</SubMenu>
							<SubMenu key="sub2" icon={<LaptopOutlined/>} title="subnav 2">
								<Menu.Item key="5">option5</Menu.Item>
								<Menu.Item key="6">option6</Menu.Item>
								<Menu.Item key="7">option7</Menu.Item>
								<Menu.Item key="8">option8</Menu.Item>
							</SubMenu>
							<SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
								<Menu.Item key="9">option9</Menu.Item>
								<Menu.Item key="10">option10</Menu.Item>
								<Menu.Item key="11">option11</Menu.Item>
								<Menu.Item key="12">option12</Menu.Item>
							</SubMenu>
						</Menu>
					</Sider>
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
			<Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
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
	);
}


const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialization
});


export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
(mapStateToProps, {initialize: initializeThunkCreator})(App);
