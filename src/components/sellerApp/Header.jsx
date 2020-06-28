// * Neetu Chauhan * /

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Moment from "moment";
import { connect } from "react-redux";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { withRouter } from "react-router-dom";
import { sendUserInformation } from "../../containers/actions/userActions";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        padding: "68px",
        backgroundColor: "beige"
    },
}));
function FullWidthGrid(props
) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Typography variant="h4" component="h2"
                style={{
                    fontFamily: "cursive",
                    fontSize: "3rem",
                    color: "darkblue"
                }}
            >Sales</Typography>
            <Grid
                container
                spacing={2}
                style={{
                    display: "flex",
                }}>
                {props.user.add_details && props.user.add_details.length ? (
                    <Grid container>
                        {props.user.add_details.map((user) => <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    {user.seller}

                                </Typography>
                                <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom style={{ fontFamily: "fantasy" }}>
                                    {user.title}
                                </Typography>
                                <Typography >
                                    {user.start
                                        ? Moment(new Date(user.start)).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                        )
                                        : "Not Specified"}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {user.location}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {user.description}

                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid>
                                        < Button style={{
                                            borderRadius: 30,
                                            backgroundColor: "#37D8B7",
                                            padding: "10px 28px",
                                            fontSize: "10px",
                                            marginTop: "6rem",
                                            marginRight: "1rem"
                                        }}
                                            variant="contained"
                                        >
                                            ACCEPT
                            </Button>
                                    </Grid>
                                    <Grid>
                                        <Button style={{
                                            borderRadius: 30,
                                            backgroundColor: "#D80F4F",
                                            padding: "10px 28px",
                                            fontSize: "10px",
                                            marginTop: "6rem",

                                        }}
                                            variant="contained"
                                        >REJECT</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        )}
                    </Grid>
                ) : (
                        <div style={{ marginLeft: "35rem", marginTop: "6rem" }}>
                            <NotificationsActiveIcon style={{ fontSize: "28rem", color: "lightblue" }} />
                            <div style={{ marginLeft: "6rem" }}>
                                <Typography gutterBottom variant="h5" component="h2" style={{ color: "red", fontFamily: "fantasy" }}>
                                    Nothing to show!
                        </Typography>
                                <Typography
                                    style={{ color: "darkslateblue", fontFamily: "fantasy" }}
                                    variant="body2"
                                    color="darkcyan"
                                    component="p">
                                    Nothing added,once you add you'll see here
                        </Typography>
                            </div>
                        </div>


                    )}

            </Grid>
        </div>
    );
}
const mapStateToProps = (state) => ({
    user: state.user
    ,
});

export default connect(mapStateToProps, {

    sendUserInformation,
})(withRouter(FullWidthGrid));
