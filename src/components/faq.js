import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '70%',
		margin: '0 auto'
	},
	test: {
		height: '90vh'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}));

export default function FAQ() {
	const classes = useStyles();

	return (
		<div className={classes.test}>
			<Paper elevation={3} className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={classes.heading}>What is included in a snow clearing?</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							We will clear the public sidewalk parallel to your street, your sidewalk leading to your
							house, and any driveways as indicated by your order.
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography className={classes.heading}>To be continued</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
							amet blandit leo lobortis eget.
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</Paper>
		</div>
	);
}
