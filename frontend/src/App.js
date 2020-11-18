import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from './components/authentication/register.js';
import Login from './components/authentication/login.js';
import Profile from './components/profile.js';
import Songs from './components/songs.js';
import Choose from './components/choose.js';
import Recommended from './components/recommended.js';

class App extends React.Component {
	render(){
		return (
			<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/myprofile" exact component={Profile} />
				<Route path="/mysongs" exact component={Songs} />
				<Route path="/moresongs" exact component={Choose} />
				<Route path="/recommended" exact component={Recommended} />
			</Switch>
		</BrowserRouter>
		)
	};
}

export default App;
