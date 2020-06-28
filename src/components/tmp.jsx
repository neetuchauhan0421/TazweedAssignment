import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';


import {
  IconButton,

} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  addtoCart,
  fetchDashboardData,
  productList,
} from "../containers/actions/userActions";


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 200,
  },







}));
function UserBox(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };


  function handleClose(e) {
    setOpen(false);
  }
  function handleClick(e) {

    console.log(e.target.Start.value)
  }
  function deleteFromCart(product) {
    console.log("d");
    let usercart = props.user.user_cart;
    let productlist = props.user.not_add_into_cart;
    //removing cart item
    let index = usercart.indexOf(product);
    usercart.splice(index, 1);
    let tmp = parseFloat(props.user.total_cost);
    tmp = tmp - product.price;
    tmp = tmp.toFixed(2);

    props.addtoCart([usercart, tmp]);

    //add back to list

    productlist.push(product);
    props.fetchDashboardData(productlist);
    let updatedList = props.user.product_list;
    updatedList.push(product);
    props.productList(updatedList);
  }
  const classes = useStyles();
  return (
    <div style={{ marginLeft: "auto" }}>
      <IconButton
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClickOpen("paper")}>

        <Badge
          badgeContent={props.user.user_cart && props.user.user_cart.length}
          color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title">
        <DialogTitle id="scroll-dialog-title">
          {/* <Grid
            
          </Grid> */}
        </DialogTitle>

        <FormControl className={classes.margin}>

          <form onSubmit={handleClick} className={classes.container} >
            <DialogContent dividers={scroll === "paper"}>

              <DialogTitle id="max-width-dialog-title">New Event</DialogTitle>
              <InputLabel htmlFor="input-with-icon-adornment">Title</InputLabel>
              <Input
                id="Title"
                startAdornment={
                  <InputAdornment position="start">
                  </InputAdornment>
                }
              />
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Location"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="datetime-local"
                label="Start Date"
                name="start"

                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="datetime-local"
                label="End Date"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputLabel htmlFor="input-with-icon-adornment">Description</InputLabel>
              <Input
                className={classes.margin}
                id="Description"
                startAdornment={
                  <InputAdornment position="start">
                  </InputAdornment>
                }
              />


              <Button onClick={handleClose} color="secondary">Cancel</Button>



            </DialogContent>
            <DialogActions>
              <Button type="submit" vacolor="primary">Save</Button>
            </DialogActions>
          </form>
        </FormControl>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  addtoCart,
  fetchDashboardData,
  productList,
})(withRouter(UserBox));



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
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
  },
}));




function FullWidthGrid(props
) {
  const classes = useStyles();
  function deleteFromCart() {
    console.log(props.user);
    console.log(props);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").findOne({}, function (err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
      });
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find({}).toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });

    });

    console.log("bjkj")
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        <Button onClick={deleteFromCart} >

          button
</Button>
        <div>

          {props.user.add_details.map((numb) => <li>data</li>)}
        </div>
        {/* <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>




                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
        </Typography>
                        <Typography variant="h5" component="h2">
                            nnmmm
        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
          <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid> */}
        {props.user.add_details.map((user) => <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {user.start}
            </Typography>
            <Typography variant="h5" component="h2">
              {user.end}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {user.title}
            </Typography>
            <Typography variant="body2" component="p">
              {user.description}

            </Typography></Paper>
        </Grid>
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



import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ClearAllSharpIcon from '@material-ui/icons/ClearAllSharp';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import {
  IconButton,
  Typography,
  Grid,

} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  addtoCart,
  fetchDashboardData,
  productList,
  sendUserInformation
} from "../containers/actions/userActions";



const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),

  },
}));
function UserBox(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  };

  function handleClick(e) {
    e.preventDefault();
    let dict = {};
    dict['start'] = e.target.start.value;
    dict['end'] = e.target.end.value;
    dict['description'] = e.target.description.value;
    dict['location'] = e.target.location.value;

    dict['title'] = e.target.title.value;
    let userdetail = props.user.add_details;
    userdetail.push(dict)

    props.sendUserInformation(userdetail)

    //props.history.push("/Seller")
    //const express = require("express");
    //const app = express();
    //const cors = require("cors");
    const PORT = 4000;
    const mongoose = require("mongoose");
    //app.use(cors());

    mongoose.connect("http://127.10.0.1:27017/mydb", {
      useNewUrlParser: true
    });

    const connection = mongoose.connection;

    connection.once("open", function () {
      console.log("Connection with MongoDB was successful");
    });

    console.log(e.target.start.value);
    console.log(e.target.end.value);
    console.log(e.target.description.value);
    console.log(e.target.title.value);
    console.log(props.user.user_detail)
    // whatever you typed into the input
    setOpen(false);

  }




  function deleteFromCart(product) {
    console.log("d");
    let usercart = props.user.user_cart;
    let productlist = props.user.not_add_into_cart;
    //removing cart item
    let index = usercart.indexOf(product);
    usercart.splice(index, 1);
    let tmp = parseFloat(props.user.total_cost);
    tmp = tmp - product.price;
    tmp = tmp.toFixed(2);

    props.addtoCart([usercart, tmp]);

    //add back to list

    productlist.push(product);
    props.fetchDashboardData(productlist);
    let updatedList = props.user.product_list;
    updatedList.push(product);
    props.productList(updatedList);
  }
  const classes = useStyles();
  return (
    <Grid style={{ margin: "auto", width: "90%" }}>
      {/* <IconButton
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClickOpen("paper")}>
        <Badge
          badgeContent={props.user.user_cart && props.user.user_cart.length}
          color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton> */}
      <Button
        variant="contained"
        style={{
          color: "#FFFFFF",
          backgroundColor: "black",
          borderRadius: "5px",
          width: "100%",
        }}
        onClick={handleClickOpen("paper")}>
        Add & Book
          </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title">
        {/* < CalendarTodayIcon /> */}
        <DialogTitle id="max-width-dialog-title">ADD & BOOK</DialogTitle>
        <FormControl className={classes.margin}>
          <form onSubmit={handleClick}>
            <Grid>
              <Grid >
                <InputLabel style={{ marginLeft: "4rem" }}>Add title</InputLabel>
                <Input
                  style={{ width: "30rem", marginLeft: "4rem" }}
                  name="title"
                  startAdornment={
                    <InputAdornment position="start"

                    >
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid style={{ marginTop: "2rem" }}>
                <AccessTimeIcon style={{ marginRight: "2rem", marginTop: "1rem" }} />
                <TextField
                  id="datetime-local"
                  label="Start Date"
                  name="start"

                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="datetime-local"
                  label="End Date"
                  name="end"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid>
                < LocationOnIcon style={{ marginTop: "3rem" }} />
                <TextField
                  className={classes.margin}
                  style={{
                    marginTop: "2rem",
                    marginLeft: "2rem",
                    width: "30rem"
                  }}
                  id="input-with-icon-textfield"
                  name="location"
                  label="Add Location"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid>
                <ClearAllSharpIcon style={{ marginTop: "3rem" }} />
                <TextField
                  className={classes.margin}
                  style={{
                    marginTop: "2rem",
                    marginLeft: "2rem",
                    width: "30rem"
                  }}
                  id="input-with-icon-textfield"
                  name="description"
                  label="Add Description"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <DialogActions >
              <Button onClick={handleClose} color="primary">
                Cancel
          </Button>
              <Button type="submit" variant="contained" color="primary">Save</Button>

            </DialogActions>
          </form>
        </FormControl>
      </Dialog>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  addtoCart,
  fetchDashboardData,
  productList,
  sendUserInformation,
})(withRouter(UserBox));
