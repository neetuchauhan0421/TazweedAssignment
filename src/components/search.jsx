import React from "react";

import ProductStub from '../assets/StubJson';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { productList } from "../containers/actions/userActions";

import IconButton from '@material-ui/core/IconButton';
import { withStyles, fade } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";





const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
});
class Search extends React.Component {
    state = {
        query: "",
        data: ProductStub,
        filteredData: []
    };

    handleInputChange = event => {
        const query = event.target.value;

        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.title.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredData
            };
        });
        this.props.productList(this.state.filteredData)
    };


    render() {

        return (


            <div>
                <TextField
                    style={{ marginLeft: "31rem", marginTop: "-4rem" }}
                    label="Search...."
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    InputProps={{

                        endAdornment: (
                            <InputAdornment
                            >
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>


        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
});



export default (withStyles(useStyles)(connect(mapStateToProps, {
    productList,

})(withRouter(Search))));

