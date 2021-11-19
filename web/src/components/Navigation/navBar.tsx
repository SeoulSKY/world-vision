import React, { Component } from 'react'


const NavBar = () => {
        // @ts-ignore
    return (
            <div>


            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">World Vision</a>


              <button className="navbar-toggler" type="button" data-toggle="collapse"
                      data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                      aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">



                      <li className="nav-item">
                          <a className="nav-link" href="#">Home</a>

                      </li>


                      <li className="nav-item">
                          <a className="nav-link" href="#">Staff Dashboard</a>
                      </li>

                      <li className="nav-item">
                          <a className="nav-link" href="#">Customer Dashboard</a>
                      </li>




                      <li className="nav-item">

                      </li>
                  </ul>
                  <form className="form-inline my-50 my-lg-10">
                          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Signup</button>
                  </form>
              </div>
          </nav>

            </div>
        )
    }
    export default NavBar;

