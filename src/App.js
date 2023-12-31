import "./App.css";
import Form from "./Components/Form";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Protected from "./Protected";
import Table from "./Components/Table";

export const countryStateCityArray = [
  {
    Country: "India",
    StateList: [
      {
        State: "Gujarat",
        CityList: ["Surat", "Rajkot", "Ahmedabad"],
      },
      {
        State: "Punjab",
        CityList: ["Chandigarh", "Ludhiana", "Jalandhar"],
      },
      {
        State: "UP",
        CityList: ["Kanpur", "Lucknow", "Ayodhya"],
      },
    ],
  },
  {
    Country: "USA",
    StateList: [
      {
        State: "Alabama",
        CityList: ["Montgomery", "Birmingham", "Auburn"],
      },
      {
        State: "Alaska",
        CityList: ["Anchorage", "Juneau", "Fairbanks"],
      },
      {
        State: "Arizona",
        CityList: ["Phoenix", "Tucson", "Mesa"],
      },
    ],
  },
  {
    Country: "Newzealand",
    StateList: [
      {
        State: "Auckland",
        CityList: ["Napier", "Nelson", "Queenstown"],
      },
      {
        State: "Wellington",
        CityList: ["Lower Hutt", "Porirua", "Upper Hutt"],
      },
      {
        State: "Canterbury",
        CityList: ["Tekapo", "Sheffield", "Lyttelton"],
      },
    ],
  },
];

function App() {
  const [loginCredentials, setLoginCredentials] = useState({
    userId: "",
    password: "",
  });
  return (
    <div className="App">
      <h1>CRUD Operation Using React</h1>
      <hr />
      <Routes>
        <Route
          path="/"
          element={
            <Login
              loginCredentials={loginCredentials}
              setLoginCredentials={setLoginCredentials}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Protected loginCredentials={loginCredentials}>
              <>
                <Form />
                <br />
                <Table />
              </>
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
