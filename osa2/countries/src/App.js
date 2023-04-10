import { useState, useEffect } from "react";
import countryServices from "./services/countries";
import Country from "./components/Country";
import Filter from "./components/Filter";

function App() {
   const [countries, setCountries] = useState([]);
   const [filter, setFilter] = useState("");

   useEffect(() => {
    console.log("effect");
    countryServices.getAll().then((countries) => {
      console.log(countries);
      setCountries(countries);
    });
  }, []);

  const onFilterChanged = (event) => {
    setFilter(event.target.value);
  };

  const countriesToShow = !filter
  ? countries
  : countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div>
       <Filter filter={filter} onFilterChanged={onFilterChanged}/>
       <Country countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;
