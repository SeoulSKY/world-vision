import React, { useEffect, useState } from 'react';

import './App.css';
import NavBar from './components/Navigation/navBar';
import StaffDashboard from './components/Pages/staffDashboard'


// import NavBarComp from './components/ DesignerNavbar';


function App() {

  // let [flaskMessage, setFlaskMessage] = useState("Failed to connect to the server.")

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/hello")
  //   .then((response) => {
  //     response.text().then((text) => setFlaskMessage(text)).catch(error => console.log(error));
  //   })
  //   .catch((error) => console.log(error));
  // }, []);

  return (

      
      <div className='App'>



      <NavBar/>

      <StaffDashboard/>


      
    </div>
  );
}

export default App;
