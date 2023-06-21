import logo from './logo.svg';
import './App.css';

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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
