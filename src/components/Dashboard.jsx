import React, { Component } from "react";
import Card from "./Card";
import ProductStub from "../assets/StubJson";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addtoCart, productList } from "../containers/actions/userActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";
import Home from "../components/sellerApp/index";
import IconButton from "@material-ui/core/IconButton";
import Search from "../components/search"


class Dashboard extends Component {
  state = {
    newProductList: ProductStub,
    anchorEl: null,
  };
  ITEM_HEIGHT = 48;

  //const [anchorEl, setAnchorEl] = React.useState(null);

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  sortByPriceDes = () => {
    let newProductList = this.props.user.product_list;
    for (var i = 0; i < newProductList.length; i++) {
      let p1 = parseFloat(newProductList[i].price);
      for (var j = 0; j < newProductList.length; j++) {
        let p2 = parseFloat(newProductList[j].price);

        if (p1 > p2) {
          let tmp = newProductList[i];
          newProductList[i] = newProductList[j];
          newProductList[j] = tmp;
        }
      }
    }
    this.props.productList(newProductList);
    this.setState({ anchorEl: null });
  };
  sortByPriceAsc = () => {
    let newProductList = this.props.user.product_list;
    for (var i = 0; i < newProductList.length; i++) {
      let p1 = parseFloat(newProductList[i].price);
      for (var j = 0; j < newProductList.length; j++) {
        let p2 = parseFloat(newProductList[j].price);

        if (p1 < p2) {
          let tmp = newProductList[i];
          newProductList[i] = newProductList[j];
          newProductList[j] = tmp;
        }
      }
    }
    this.props.productList(newProductList);
    this.setState({ anchorEl: null });
    console.log(this.props.user.user_detail)
  };
  render() {
    let open = Boolean(this.state.anchorEl);

    return (
      <div>
        <div style={{ height: "5rem" }}>
          {/* <Appbar /> */}
        </div>
        <Grid container spacing={1}>
          <div style={{ width: "100%", display: "flex" }}>
            {/* <Grid item>Sizes:&nbsp;&nbsp;</Grid> */}

            <Grid
              item
              xs={6}
            // sm={3}
            >
              <IconButton onClick={this.handleClick}>
                <SortIcon />
              </IconButton>


              <Menu
                id="long-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: this.ITEM_HEIGHT * 4.5,
                    width: "25ch",
                  },
                }}>
                <MenuItem onClick={this.sortByPriceDes}>
                  Highest to Lowest
                </MenuItem>
                <MenuItem onClick={this.sortByPriceAsc}>
                  Lowest to Highest
                </MenuItem>
              </Menu>
              <Search style={{ marginLeft: "31rem", marginTop: "-4rem" }} />

              {/* <TextField
                style={{ marginLeft: "31rem", marginTop: "-4rem" }}
                label="Search...."
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              /> */}
            </Grid>
          </div>
          <Grid container spacing={1}>
            {this.props.user.product_list.map((product, index) =>
              product ? (
                <Grid key={index} xs={3} item>
                  <Card product={product} />
                </Grid>
              ) : null
            )}
          </Grid>



        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  productList,
  addtoCart,
})(withRouter(Dashboard, Home));
