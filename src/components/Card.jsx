import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserCart from "../components/UserCart";
import {
  addtoCart,
  fetchDashboardData,
  productList,
} from "../containers/actions/userActions";

const useStyles = makeStyles({
  root: {
    //width: 349,
    //height: 580,
  },

  CardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  media: {
    height: "30rem",
  },
});

function MediaCard(props) {
  const classes = useStyles();

  function AddCartClick() {
    // gets cart list from redux and updates the cart
    let temp = props.user.user_cart;
    //props.user.size_filter();
    temp.push(props.product);
    let tmp = parseFloat(props.user.total_cost);
    tmp = tmp + props.product.price;
    tmp = tmp.toFixed(2);
    props.addtoCart([temp, tmp]);

    temp = props.user.not_add_into_cart;
    let index = props.user.not_add_into_cart.indexOf(props.product);
    temp.splice(index, 1);
    props.fetchDashboardData(temp);
    const updatedList = props.user.product_list.filter(
      (product) => product.id !== props.product.id
    );
    props.productList(updatedList);
  }

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            style={{ margin: "auto" }}
            className={classes.media}
            image={require("../assets" + props.product.src_1)}
          />
          <CardContent className={classes.CardContent}>
            <Typography gutterBottom variant="body2">
              {props.product.title}
            </Typography>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="body1">$ {props.product.price}</Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <UserCart detail={props.product} style={{ width: "100%" }} />

        </CardActions>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  addtoCart,
  fetchDashboardData,
  productList,
})(withRouter(MediaCard));
