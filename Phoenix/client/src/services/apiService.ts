const API_KEY = "9aa0362e1bdd227cc301a8a4d571086f";
const API_HOST = "v3.football.api-sports.io";

const fetchCountries = () => {
  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", API_KEY);
  myHeaders.append("x-rapidapi-host", API_HOST);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  return fetch(`https://${API_HOST}/countries`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.response.map((country) => ({
        code: country.code,
        name: country.name,
      }));
    })
    .catch((error) => {
      console.log("Error occurred while fetching countries:", error);
    });
};

const fetchLeagues = (countryName) => {
  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", API_KEY);
  myHeaders.append("x-rapidapi-host", API_HOST);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  return fetch(
    `https://${API_HOST}/leagues?country=${countryName}&type=league`,
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.response.map((league) => ({
        id: league.league.id,
        name: league.league.name,
      }));
    })
    .catch((error) => {
      console.log("Error occurred while fetching leagues:", error);
    });
};

const fetchTeams = (countryName) => {
  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", API_KEY);
  myHeaders.append("x-rapidapi-host", API_HOST);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  return fetch(
    `https://${API_HOST}/teams?country=${countryName}`,
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.response.map((team) => ({
        id: team.team.id,
        name: team.team.name,
        country: team.team.country,
        logo: team.team.logo,
      }));
    })
    .catch((error) => {
      console.log("Error occurred while fetching teams:", error);
    });
};

export { fetchCountries, fetchLeagues, fetchTeams };
