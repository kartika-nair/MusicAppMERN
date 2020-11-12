import React from 'react';
import './App.module.css';
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

class Register extends React.Component {
	state = {
		Username: "",
		Password: "",
		ConfirmPassword: "",
	};
	handleChange = (textfield, event) => {
		if (textfield === "Username") {
			this.setState({
				Username: event.target.value,
			});
		}
		if (textfield === "Password") {
			this.setState({
				Password: "*".repeat(event.target.value.length),
			});
		}
		if (textfield === "ConfirmPassword") {
			this.setState({
				ConfirmPassword: "*".repeat(event.target.value.length),
				<form>
					<div>
						<TextField
							id="ConfirmPassword"
							label="ConfirmPassword"
							value={this.state.ConfirmPassword}
							onChange={(e) =>
								this.handleChange("ConfirmPassword", e)
							}
							margin="normal"
							variant="outlined"
						/>
					</div>
                </form>
                <Button onClick={() => this.signupHandler()}>
					Sign Me Up!
				</Button>
			</React.Fragment>
		);
	}
}

export default Register;