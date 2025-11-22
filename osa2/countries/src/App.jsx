import { useState, useEffect } from "react";
import countryServices from "./services/countries";
import Country from "./components/Country";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    console.log("effect");
    countryServices.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const onFilterChanged = (event) => {
    setSelectedCountry(null);
    setFilter(event.target.value);
  };

  let countriesToShow;
  if (selectedCountry) {
    countriesToShow = [selectedCountry];
  } else {
    countriesToShow = !filter
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase()),
        );
  }

  return (
    <div>
      <Filter filter={filter} onFilterChanged={onFilterChanged} />
      <Country
        countriesToShow={countriesToShow}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
}

export default App;
