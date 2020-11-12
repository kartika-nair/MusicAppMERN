import React, {Fragment} from 'react';
import classes from './App.module.css';
import Register from './components/authentication/register.js';
import Login from './components/authentication/login.js';
import AppBarComponent from './components/navigation/AppBar/AppBar.js'

class App extends React.Component {
	render(){
		return (
			<Fragment>
				<AppBarComponent />
				<div className = {classes.centered}>
					<Login />
				</div>
			</Fragment>
		)
	};
}

export default App;
