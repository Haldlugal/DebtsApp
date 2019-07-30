import React, {Fragment, useEffect, useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import {NavLink} from 'react-router-dom';
import DebtCard from './DebtCard';
import {useDispatch, useSelector} from "react-redux";
import * as types from "../../store/sagas/debts/ActionTypes";
import CircularProgress from "@material-ui/core/CircularProgress";
import {PaginationActions} from "../PaginationActions";
import TablePagination from "@material-ui/core/TablePagination";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import moment from "moment";
import {TableFooter, TableRow} from "@material-ui/core";
import Table from "@material-ui/core/Table";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    navLink: {
        textDecoration: "none"
    },
    progress: {
        margin: theme.spacing(4),
        position: 'absolute',
        left: '50%',
        top: '40%',
        marginRight: 20
    },
    search: {
        bottom: 1,
        borderBottom: '1px solid grey',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 'auto',
        width: 200,
    },
    searchIcon: {
        width: theme.spacing(7),
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
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sortForm: {
        height: 37,
        bottom: 14,
        marginLeft: 15
    },
    sortOrderForm: {
        marginLeft: 15
    }
}));

const DebtList = () => {

    const dispatch = useDispatch();
    const fetching = useSelector(state=> state.debts.fetching);
    const debts = useSelector(state=>state.debts.debts);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect( () => {
        dispatch({type: types.GET_DEBTS_REQUEST});
    }, [dispatch]);

    const classes = useStyles();

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleSearchChange(event) {
        setSearch(event.target.value.toLowerCase());
    }

    function handleSortChange(event) {
        setSort(event.target.value);
    }

    function handleSortOrderChange(event) {
        setSortOrder(event.target.value);
    }

    function sortDebts(debts, sortType, sortOrder) {
        if (sortType!=='') {
            let sortingOrder = 1;

            if (sortOrder==="asc") sortingOrder = -1;
            else sortingOrder = 1;

            debts.sort(function (a, b) {
                switch(sortType){
                    case 'name':
                        if(a.Name < b.Name) return sortingOrder;
                        else return sortingOrder*(-1);
                    case 'currency':
                        if (a.Currency < b.Currency) return sortingOrder;
                        else return sortingOrder*(-1);
                    case 'amount':
                        if (a.Debt*1 < b.Debt*1) return sortingOrder;
                        else return sortingOrder*(-1);
                    case 'deadline':
                        if (moment(a.field_expiration_date) < moment(b.field_expiration_date)) return sortingOrder;
                        else return sortingOrder*(-1);
                    case 'dateTaken':
                        if (moment(a.field_creation_date) < moment(b.field_creation_date)) return sortingOrder;
                        else return sortingOrder*(-1);
                    default:
                        return 0;
                }
            });
            return debts;
        } else {
            return debts;
        }
    }
    const debtsToShow = debts? debts.filter((debt)=>debt.Name.toLowerCase().includes(search)): [];
    if (fetching) return (<CircularProgress className={classes.progress} root={classes.progress}/>)
    else return (
        <Fragment>
            <Toolbar>
                <NavLink to="/debts/create" className={classes.navLink}>
                    <Button variant="contained" size="medium" color="primary" className={classes.button} >
                        Create Debt
                    </Button>
                </NavLink>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'Search' }}
                        onChange={handleSearchChange}
                    />
                </div>
                <FormControl className={classes.formControl+' '+classes.sortForm}>
                    <InputLabel htmlFor="sort">Sort By</InputLabel>
                    <Select
                        native
                        onChange={handleSortChange}
                        name="sort"
                        inputProps={{
                            id: 'sort',
                        }}
                    >
                        <option value="" />
                        <option value={'name'}>Name</option>
                        <option value={'currency'}>Currency</option>
                        <option value={'amount'}>Amount</option>
                        <option value={'deadline'}>Deadline</option>
                        <option value={'dateTaken'}>Date Taken</option>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl+' '+classes.sortOrderForm}>
                    <Select
                        native
                        onChange={handleSortOrderChange}
                        name="sortOrder"
                        inputProps={{
                            id: 'sortOrder',
                            'aria-label': 'sortOrder'
                        }}
                    >
                        <option value={'desc'}>DESC</option>
                        <option value={'asc'}>ASC</option>
                    </Select>
                </FormControl>
            </Toolbar>
            <div className={classes.root}>
                {
                    debtsToShow &&
                    sortDebts(debtsToShow, sort, sortOrder)
                        .slice(page * 5, page * 5 + 5).map(debt =>{
                        return <DebtCard debt={debt} key={debt.Nid}/>
                    })
                }
            </div>
            <Table>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            count={debtsToShow.length}
                            rowsPerPage={5}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'Rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            ActionsComponent={PaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </Fragment>
    );
};

export default DebtList;