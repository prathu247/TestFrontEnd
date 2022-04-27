import React from "react";
import "./Header.css";
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header = ({handleChildData }) => {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [queryString, setQueryString] = React.useState('');
  const handleClick= ()=>{
    console.log('here');
    handleChildData(toDate,fromDate,queryString);
  }

  const handleToDate=(newValue)=>{
    if(fromDate){
      if(fromDate.isSameOrAfter(newValue)){
        alert('ToDate can\'t  be less than FromDate');
      } else {
        setToDate(newValue);
      }
    } else{
      setToDate(newValue);
    }

  }

  const handleFromDate=(newValue)=>{
    if(toDate){
      if(toDate.isSameOrBefore(newValue)){
        alert('FromDate can\'t  be greater than ToDate');
      } else {
        setFromDate(newValue);
      }
    } else{
      setFromDate(newValue);
    }

  }
  return (
    <div className="nav">
      <div className="menu">
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
         
      <DatePicker
          label="From Date"
          value={fromDate}
          minDate={moment('2017-01-01')}
          onChange={(newValue) => {
            handleFromDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </Grid>
        <Grid item xs={3}>
        <DatePicker
          label="To Date"
          value={toDate}
          minDate={moment('2017-01-01')}
          onChange={(newValue) => {
            handleToDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </Grid >
        <Grid item xs={3}>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value= {queryString}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                setQueryString(e.target.value);
              }}
            />
          </Search>
        </Grid>
        <Grid item xs={2}>
        <Button variant="contained" onClick={()=>{ handleClick()}}>
          Get Result</Button>
        </Grid>
        </Grid>
         </LocalizationProvider>
      </div>

      
    </div>
  );
};

export default Header;