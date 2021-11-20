import React, { useEffect, useState } from 'react';
import NavBar from "./components/Navigation/navBar";

import './App.css';
// import NavBar from './components/Navigation/navBar';
import StaffDashboard from './components/StaffDashboard/staffDashboard'
import StaffPost from "./components/StaffDashboard/staffPost";
import StaffPut from "./components/StaffDashboard/staffPut";
import StaffDelete from "./components/StaffDashboard/staffDelete";
import StaffGet from "./components/StaffDashboard/staffGet";
import RecipientPost from "./components/StaffDashboard/recipientPost";
import RecipientPut from "./components/StaffDashboard/recipientPut";
import RecipientDelete from "./components/StaffDashboard/recipientDelete";
import RecipientGet from "./components/StaffDashboard/recipientGet";
import CustomerRecipientGet from "./components/StaffDashboard/customerRecipientGet";



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
