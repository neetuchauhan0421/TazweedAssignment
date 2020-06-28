import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Header from './Header';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addtoCart, productList, sendUserInformation } from "../../containers/actions/userActions";
import DashBoard from "../Dashboard";
const styles = {
    indicator: {
        backgroundColor: "white"
    },
    tabContainer: {
        margin: "-1rem -1.3rem 0rem -1.8rem",
        backgroundColor: "#1E6EC0",
        color: "#ffffff"
    }
};
class Home extends Component {
    state = {
        value: 0
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    classes={{
                        indicator: classes.indicator
                    }}
                    className={classes.tabContainer}
                >
                    <Tab label="Customer" id={0} />
                    {/* <Tab label="Create Appointment" id={1} /> */}
                    {/* <Tab label="Finalize/Cancel" id={2} /> */}
                    <Tab label="Seller" id={1} />


                </Tabs>
                {value === 0 && <DashBoard {...this.props} />}

                {value === 1 && <Header {...this.props} />}
                {/* {value === 1 && <Navbar {...this.props} />} */}

                <div>
                    {/* {JSON.stringify(this.props.user)} */}


                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default (withStyles(styles)(connect(mapStateToProps, {
    productList,
    addtoCart,
    sendUserInformation
})(withRouter(Home))));