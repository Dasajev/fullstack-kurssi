const Country = ({ countriesToShow }) => {
  if (!countriesToShow.length) return null;
  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countriesToShow.length > 1) {
    return (
    <ul>
        {countriesToShow.map((country) => (
            <li>{country.name.common}</li>
        ))}
    </ul>
    );
  }
  const country = countriesToShow[0];
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital[0]} <br/>
      area {country.area}
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
            <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
    </div>
  );
};

export default Country;
