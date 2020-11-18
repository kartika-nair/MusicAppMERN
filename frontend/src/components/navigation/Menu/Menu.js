import React from "react";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";

export default function SimpleMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MenuIcon />
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Link to="/myprofile" style={{ textDecoration: 'none', display: 'block'}}>
					<MenuItem onClick={handleClose}>My Profile</MenuItem>
				</Link>
				<Link to="/mysongs" style={{ textDecoration: 'none', display: 'block'}}>
					<MenuItem onClick={handleClose}>My Songs</MenuItem>
				</Link>
				<Link to="/recommended" style={{ textDecoration: 'none', display: 'block'}}>
					<MenuItem onClick={handleClose}>Suggestions</MenuItem>
				</Link>
				<Link to="/moresongs" style={{ textDecoration: 'none', display: 'block'}}>
					<MenuItem onClick={handleClose}>Choose More</MenuItem>
				</Link>
			</Menu>
		</div>
	);
}
