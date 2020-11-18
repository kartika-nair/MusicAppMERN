import React from "react";
import { Link } from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SimpleMenu from "../Menu/Menu";
import classes from "./AppBar.module.css";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function AppBarComponent() {
	const classesStyle = useStyles();

	return (
		<div className={classesStyle.root}>
			<AppBar position="static">
				<Toolbar className={classes.ToolBar}>
					<IconButton
						edge="start"
						className={[classesStyle.menuButton].join(" ")}
						color="inherit"
						aria-label="menu"
					>
						<SimpleMenu />
					</IconButton>
					<Typography variant="h6" className={classesStyle.title}>
						MUSIC RECOMMENDER
					</Typography>
					<Button color="inherit" onClick={() => alert("Log Out?")}>
					<Link to="/" style={{ textDecoration: 'none', display: 'block'}}>
						Log Out
					</Link>
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}