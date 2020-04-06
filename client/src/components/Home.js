import React from "react";
import './Home.css';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

class Home extends React.Component {

    state = {
        searchValue: '',
        display: true
    }
    handleBar =(e) =>{
        //get user input
        this.setState({searchValue : e.target.value});
    }
    handleSearch =() => {
        //get passed data from parent comppnet
        this.props.performSerch(this.state.searchValue);
    }
    handleBrowse=()=>{
        //get passed data from parent comppnet
        this.props.performBrowse();
    }
 render() {
    let imgUrl = "https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80";
    //got image from https://source.unsplash.com/
    return (
        <div>
            <div className = 'banner'
                style = {{ backgroundImage: `url(${imgUrl})`,
                height: '800px',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                }}>
                <div className='homeContainer'>
                    <h1 className='brand'>Movie Browser</h1>
                    <form>
                        <input className='input' type="text" placeholder="Search.." 
                                onChange={this.handleBar}/>
                    </form>
                    <div>
                        <Link to='/browse'>
                              <Button  size="large" variant="contained" color="primary" aria-label="contained primary button group" onClick = {this.handleSearch}>
                              Display Matching Movies </Button>
                        </Link>
                        <Link to='/browse'>
                         <Button  size="large" variant="contained" color="primary" aria-label="contained primary button group"onClick = {this.handleBrowse}>
                              Show All Movies </Button>
                        </Link>
                    </div>
                </div>
                <footer>
                    The image was retrieved from https://source.unsplash.com/
                    {/* <button ><a href={'http://localhost:8080/logout'}>Log out</a>
            </button> */}
                </footer>
            </div>
        </div>
        
    );
 }
}
export default Home