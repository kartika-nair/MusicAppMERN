import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Button } from "@material-ui/core";
import classes from "./Auth.module.css";
import Background from '../../img/img7.jpg';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {},
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password,
		};

		this.props.loginUser(userData);
	};

	render() {
		const { errors } = this.state;

		return (
			<div style={{
				background: `url(${Background})`,
				height:'550px',
				backgroundSize: 'cover',
				backgroundRepeat:'no-repeat',
				backgroundPosition: 'center,center'
				}}>
				<div className={classes.centered}>
					<div style={{ marginTop: "4rem" }} className="row">
						<div className="col s8 offset-s2">
							<div
								className="col s12"
								style={{ paddingLeft: "11.250px" }}
							>
								<h4>
									<b>SIGN IN</b>
								</h4>
							</div>
							<form
								noValidate
								onSubmit={this.onSubmit}
								autoComplete="off"
							>
								<div className="input-field col s12">
									<input
										onChange={this.onChange}
										value={this.state.email}
										error={errors.email}
										id="email"
										type="email"
										className={classnames("", {
											invalid:
												errors.email ||
												errors.emailnotfound,
										})}
									/>
									<label htmlFor="email">Email</label>
									<span className="red-text">
										{errors.email}
										{errors.emailnotfound}
									</span>
								</div>
								<div className="input-field col s12">
									<input
										onChange={this.onChange}
										value={this.state.password}
										error={errors.password}
										id="password"
										type="password"
										className={classnames("", {
											invalid:
												errors.password ||
												errors.passwordincorrect,
										})}
									/>
									<label htmlFor="password">Password</label>
									<span className="red-text">
										{errors.password}
										{errors.passwordincorrect}
									</span>
								</div>
								<div
									className="col s12"
									style={{ paddingLeft: "11.250px" }}
								>
									<Button type="submit">SIGN IN</Button>
								</div>
							</form>
							<div
								className="col s12"
								style={{ paddingLeft: "11.250px" }}
							>
								<p className="grey-text text-darken-1">
									No account?{" "}
									<Link to="/register">Sign Up!</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
