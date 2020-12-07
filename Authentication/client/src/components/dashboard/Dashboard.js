import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button } from "@material-ui/core";
import Background from '../../img/img5.png';

class Dashboard extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const { user } = this.props.auth;
		return (
			<div
			style={{
				   background: `url(${Background})`,
				   height:'550px',
				   backgroundSize:'cover',
				   backgroundRepeat:'no-repeat',
				   backgroundPosition: 'center,center'
				 }}>
				<div
					style={{ height: "75vh" }}
					className="container valign-wrapper"
				>
					<div className="row">
						<div className="landing-copy col s12 center-align">
							<h4>
								<b>Hey there,</b> {user.name.split(" ")[0]}
								<p className="flow-text grey-text text-darken-1">
									You have logged in to{" "}
									<span
										style={{
											fontFamily: "monospace",
											color: "black",
										}}
									>
										ΜΟΥΣΙΚΗ
									</span>
								</p>
							</h4>
							<a href="http://localhost:4000">
								<Button>Go to site</Button>
							</a>
							<br />
							<Button onClick={this.onLogoutClick}>Log Out</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
