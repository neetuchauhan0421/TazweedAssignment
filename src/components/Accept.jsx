
import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = {
    root: {
        width: "10rem"
    },

};
class Accept extends Component {


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h6" component="h2"
                    style={{
                        fontFamily: "cursive",
                        fontSize: "2rem",
                        color: "darkblue"
                    }}>
                    Sales</Typography>


                <Grid container

                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",

                    }}>
                    <Card className={classes.root}>
                        <CardContent>
                            < Button style={{
                                borderRadius: 30,
                                backgroundColor: "#37D8B7",
                                padding: "10px 28px",
                                fontSize: "10px",
                                marginRight: "1rem"
                            }}
                                variant="contained"
                            >
                                ACCEPT
                            </Button>

                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid>

                    <Card className={classes.root}>
                        <CardContent>
                            < Button style={{
                                borderRadius: 30,
                                backgroundColor: "#D80F4F",
                                padding: "10px 28px",
                                fontSize: "10px",
                                marginRight: "1rem"
                            }}
                                variant="contained"
                            >
                                REJECTED
                            </Button>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Grid>

            </div >

        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default (withStyles(styles)(Accept));




