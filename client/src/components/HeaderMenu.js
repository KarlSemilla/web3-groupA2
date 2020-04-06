import React from "react";
import "./MovieDetails.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
//import { NavLink } from 'react-router-dom';
//import {Route,Redirect} from 'react-router-dom';

class HeaderMenu extends React.Component {
  async componentDidMount() {
    //Fetch data it has not been stored in local storage
    try {
      const url = "/api/getUser";
      const response = await fetch(url);
      const jsonData = await response.json();
      this.setState({ jsonData: jsonData });
      this.loadFavsFromJsonData();
      this.loadUserIDFromJsonData();
      //this.state.jsonData.sort((a, b) => (a.title > b.title) ? 1 : -1)
      //this.setState( {movies: this.state.jsonData } );
    } catch (error) {
      console.error(error);
    }
  }

  loadFavsFromJsonData = () => {
    this.props.loadFavsFromDb(this.state.jsonData.user.favorites);
  };

  loadUserIDFromJsonData = () => {
    this.props.getCurrUserID(this.state.jsonData.user.id);
  };

  //handle show or hide the About component
  state = {
    show: false,
    showPro: false
  };

  handleClose = () => {
    //close About Modal
    this.setState({ show: false });
  };

  handleShow = () => {
    //show About Modal
    this.setState({ show: true });
  };
  handleProClose = () => {
    //close About Modal
    this.setState({ showPro: false });
  };

  handleProShow = () => {
    //show About Modal
    this.setState({ showPro: true });
  };

  // handleLogOut =() => {
  //       fetch('api/users')
  //     .then(response => response.json())
  //     .then(function (data){console.log(data)})
  // }

  render() {
    return (
      //Learned how to use Model and Button from https://react-bootstrap.github.io/components/modal/
      <>
      <div className="button1">
      <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={this.handleShow}>About</Button>
        <Button  onClick={this.handleProShow}>Profile</Button>
        <Button> <a href={"http://localhost:8080/logout"}>
            <span className="logout">Log out</span>
          </a></Button>
      </ButtonGroup>
      </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>COMP4513 - Assignment 2</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div class="body">
            <p>Group members</p>
            <ul>
            <li>Yichen Li</li>
            <li>Katrina Pauls</li>
            <li>Karl Semilla</li>
            <li>Derek Nguyen</li>
            <li>Chris Kwong </li>
            </ul>
            <p>
              <a href="https://github.com/lyc2760008/web3-groupA2">Github Link</a>
            </p>
            <p>Technology used: React, Node JS</p>
            <p>Learning sources:</p>
            <ul className="fa-ul">
              <li>
                <i className="fa-li fa fa-check-square"></i>
                <a href="https://www.youtube.com/watch?v=ZZS1irWSfxc&t=325s">
                  How to use localStorage with React
                </a>
              </li>
              <li>
                <i className="fa-li fa fa-check-square"></i>
                <a href="https://www.youtube.com/watch?v=NUQkajBdnmQ">
                  How to create page transitions with React Router
                </a>
              </li>
              <li>
                <i className="fa-li fa fa-check-square"></i>
                <a href="https://react-bootstrap.github.io/components/modal/">
                  Modals
                </a>
              </li>
              <li>
                <i className="fa-li fa fa-check-square"></i>
                <a href="https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component">
                  Prevent React setState on unmounted Component
                </a>
              </li>
              <li>
                <i className="fa-li fa fa-check-square"></i>
                <a href="https://stackoverflow.com/questions/41852818/react-fade-in-element">
                  Toggle Animation
                </a>
              </li>
            </ul>
            <p>
              Third party code used:
              </p>
              <ul>
              <li><a href=" https://codepen.io/kunihiko_sugiura/pen/YGbmKj">
                Half star for ratings
              </a></li>
              <li><a href=" https://material-ui.com/">
                Material UI
              </a></li>
            </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <div class="bottomBtn">
            <Button variant="contained" color="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </div>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showPro} onHide={this.handleProClose}>
          <Modal.Header closeButton>
            <div class="avatar">
            <img 
              src={
                this.state.jsonData &&
                this.state.jsonData.user &&
                this.state.jsonData.user.picture &&
                this.state.jsonData.user.picture.thumbnail
              }
              alt=""
            ></img>
            <div class="heading">
            <h1>
              {this.state.jsonData &&
                this.state.jsonData.user &&
                this.state.jsonData.user.details &&
                this.state.jsonData.user.details.firstname}  
                 </h1>
                 <h1>
                 {this.state.jsonData &&
                this.state.jsonData.user &&
                this.state.jsonData.user.details &&
                this.state.jsonData.user.details.lastname}
                </h1>
            </div>
              </div>
          </Modal.Header>
          <Modal.Body>
            <div class="details">
              {this.state.jsonData &&
                this.state.jsonData.user &&
                this.state.jsonData.user.details &&
                this.state.jsonData.user.details.city}  ,
                &nbsp;
              {this.state.jsonData &&
                this.state.jsonData.user &&
                this.state.jsonData.user.details &&
                this.state.jsonData.user.details.country} ,
                &nbsp;
                {this.state.jsonData &&
                this.state.jsonData.user &&
                this.state.jsonData.user.membership &&
                this.state.jsonData.user.membership.date_joined}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="secondary" onClick={this.handleProClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default HeaderMenu;
