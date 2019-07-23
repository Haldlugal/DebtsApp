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

const PersonList = () => {

    const dispatch = useDispatch();
    let persons = useSelector(state => state.persons.persons);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(()=>{
        dispatch({type: types.GET_PERSONS_REQUEST});
    }, []);

    const classes = useStyles();

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

    const personsToShow = persons.filter((person)=>(person.first_name+' '+person.second_name).toLowerCase().includes(search));

    return (
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
                        native
                        onChange={handleSortChange}
                        name="sort"
                        inputProps={{
                            id: 'sort',
                        }}
                    >
                        <option value="" />
                        <option value={'name'}>Name</option>
                        <option value={'rubDebt'}>Debt in rub</option>
                        <option value={'eurDebt'}>Debt in eur</option>
                        <option value={'usdDebt'}>Debt in usd</option>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl+' '+classes.sortOrderForm}>
                    <Select
                        native
                        onChange={handleSortOrderChange}
                        name="sortOrder"
                        inputProps={{
                            id: 'sortOrder',
                        }}
                    >
                        <option value={'desc'}>DESC</option>
                        <option value={'asc'}>ASC</option>
                    </Select>
                </FormControl>
            </Toolbar>
            <div className={classes.root}> {
                personsToShow && sortPersons(personsToShow, sort, sortOrder)
                    .slice(page * 5, page * 5 + 5).map(person =>{
                        return <PersonCard person={person} key={person.tid}/>
                    })
                }
            </div>
            <TablePagination
                rowsPerPageOptions={[5]}
                count={personsToShow.length}
                rowsPerPage={5}
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'Rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                ActionsComponent={PaginationActions}
            />
        </Fragment>
    );

};

export default PersonList;

