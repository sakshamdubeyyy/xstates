import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [country, setCountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry, setselectedCountry] = useState('');
  const [selectedState, setselectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const[display, setDisplay] = useState(false)

  useEffect(() => {
    axios.get("https://crio-location-selector.onrender.com/countries").then(res => setCountry(res.data)).catch(err => console.error("Unable to fetch countries"))
  }, []);

  useEffect(() => {
    axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).then(res => setstate(res.data)).catch(err => console.error("Unable to fetch states"))
  }, [selectedCountry]);

  useEffect(() => {
    axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).then(res => setCity(res.data)).catch(err => console.error("Unable to fetch states"))
  }, [selectedState, selectedCountry]);


  return (
    <div className="App">
      <div className='city-selector'>
        <h1>Select Location</h1>
        <div className='dropdowns'>
          <select value={selectedCountry} className='dropdown' onChange={e => setselectedCountry(e.target.value)}>
            <option value="" disabled>
              Select Country
            </option>
            {country.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={selectedState} className='dropdown' onChange={e => setselectedState(e.target.value)}>
            <option value="" disabled>
              Select state
            </option>
            {state.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={selectedCity} className='dropdown' onChange={e => setDisplay(true)}>
            <option value="" disabled>
              Select City
            </option>
            {city.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {display ? <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>: <p></p>}
      </div>
    </div>
  );
}

export default App;
