import React, {Fragment, useEffect, useState} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import PersonCard from './PersonCard';
import {useDispatch, useSelector} from 'react-redux';
import * as types from '../../store/sagas/persons/ActionTypes';
import {PaginationActions} from '../PaginationActions';
import TablePagination from "@material-ui/core/TablePagination";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import {TableRow, TableFooter} from "@material-ui/core";



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    navLink: {
        textDecoration: 'none'
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
        width: 300,
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
    option: {
        padding: 10,
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: 'rgba(10,10,10, 0.1)',
        }
    },
    sortForm: {
        width: 150,
        height: 37,
        bottom: 14,
        marginLeft: 15
    },
    sortOrderForm: {
        width: 150,
        height: 37,
        bottom: 14,
        marginLeft: 15

    },
    error: {
        marginLeft: 40,
        marginTop: 40,
        padding: 20,
        width: 400,
        border: '1px solid red'
    },
    progress: {
        margin: theme.spacing(4),
        position: 'absolute',
        left: '50%',
        top: '40%',
        marginRight: 20
    },
    hidden:{
        display: 'none'
    }
}));

const PersonList = () => {

    const dispatch = useDispatch();
    let persons = useSelector(state => state.persons.persons);
    const fetching = useSelector(state => state.persons.fetching);
    const error = useSelector(state=> state.persons.error);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(()=>{
        dispatch({type: types.GET_PERSONS_REQUEST});
    }, [dispatch]);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }
    function handleSearchChange(event) {
        setSearch(event.target.value.toLowerCase());
    }
    function handleSortChange(event){
        setSort(event.target.value);
    }
    function handleSortOrderChange(event) {
        setSortOrder(event.target.value);
    }
    function sortPersons(persons, sortType, sortOrder){
        if (sortType!=='') {
            let sortingOrder = 1;

            if (sortOrder==="asc") sortingOrder = -1;
            else sortingOrder = 1;

            persons.sort(function (a, b) {
                switch(sortType){
                    case 'name':
                        if((a.first_name+' '+a.secondName) < (b.first_name +' '+b.secondName)) return sortingOrder;
                        else return sortingOrder*(-1);
                    case 'rubDebt':
                        if ((a.theirDebtSummRub+a.myDebtSummRub) < (b.theirDebtSummRub+b.myDebtSummRub)) return sortingOrder;
                        else return sortingOrder*(-1);
                    case 'eurDebt':
                        if ((a.theirDebtSummEur+a.myDebtSummEur) < (b.theirDebtSummEur+b.myDebtSummEur)) return sortingOrder;
                        else return sortingOrder*(-1);
                    case 'usdDebt':
                        if ((a.theirDebtSummDol+a.myDebtSummDol) < (b.theirDebtSummDol+b.myDebtSummDol)) return sortingOrder;
                        else return sortingOrder*(-1);
                    default:
                        return 0;
                }
            });
            return persons;
        } else {
            return persons;
        }
    }

    const classes = useStyles();

    const personsToShow = persons.filter((person)=>(person.first_name+' '+person.second_name).toLowerCase().includes(search));
    if (fetching) {
        return (<CircularProgress size={40} className={classes.progress}/>);
    } else if (error) {
        return <div className={classes.error}>{error}</div>
    } else return (
        <Fragment>
            <Toolbar>
                <NavLink to="/persons/create" className={classes.navLink}>
                    <Button variant="contained" size="medium" color="primary" className={classes.button}>
                        Create Person
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
                        value={sort}
                        onChange={handleSortChange}
                        name="sort"
                        inputProps={{
                            'id': 'sort'
                        }}
                    >
                        <option className={classes.option} value={'name'}>Name</option>
                        <option className={classes.option} value={'rubDebt'}>Debt in rub</option>
                        <option className={classes.option} value={'eurDebt'}>Debt in eur</option>
                        <option className={classes.option} value={'usdDebt'}>Debt in usd</option>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl+' '+classes.sortOrderForm}>
                    <InputLabel htmlFor="sortOrder">Order By</InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        name="sortOrder"
                        inputProps={{
                            id: 'sortOrder',
                            'aria-label': 'sortOrder'
                        }}
                    >
                        <option className={classes.option} value={'desc'}>DESC</option>
                        <option className={classes.option} value={'asc'}>ASC</option>
                    </Select>
                </FormControl>
            </Toolbar>
            <div className={classes.root}> {
                personsToShow && sortPersons(personsToShow, sort, sortOrder)
                    .slice(page * 4, page * 4 + 4).map(person =>{
                        return <PersonCard person={person} key={person.tid}/>
                    })
                }
            </div>
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[4]}
                                count={personsToShow.length}
                                rowsPerPage={4}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'Rows per page' },
                                    native: true,
                                }}
                                className={personsToShow.length<=4?classes.hidden:''}
                                onChangePage={handleChangePage}
                                ActionsComponent={PaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
        </Fragment>
    );

};

export default PersonList;

