import React from "react";
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import classes from "./App.module.css";
import { Button } from "@material-ui/core";

class Login extends React.Component {
	state = {
		Username: "",
		Password: "",
	};
	handleChange = (textfield, event) => {
		if (textfield === "Username") {
			this.setState({
				Username: event.target.value,
			});
		}
		if (textfield === "Password") {
			this.setState({
				Password: event.target.value,
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<form noValidate autoComplete="off">
					<div className = {classes.centered}>
					<div>
							<TextField
								type="text"
								id="Username"
								label="Username"
								value={this.state.Username}
								onChange={(e) => this.handleChange("Username", e)}
								margin="normal"
								variant="outlined"
							/>
						</div>
						<div>
							<TextField
								type="password"
								id="Password"
								label="Password"
								value={this.state.Password}
								onChange={(e) => this.handleChange("Password", e)}
								margin="normal"
								variant="outlined"
							/>
						</div>
						<Button>SIGN IN</Button>
					</div>
					<div className = {classes.lowered}>
						<h4>No account? <Link to = "/register">Sign Up!</Link></h4>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default Login;