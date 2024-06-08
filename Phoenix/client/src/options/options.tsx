import React, { useState, useEffect } from "react";
import { Combobox } from "../components/Combobox";
import { SwitchLabel } from "../components/SwitchLabel";
import {
  fetchCountries,
  fetchLeagues,
  fetchTeams,
} from "../services/apiService";

const Options = () => {
  return <div>Options</div>;
}
export default Options

/*const Options = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    const storedCountries = localStorage.getItem("countries");
    if (storedCountries) {
      setCountries(JSON.parse(storedCountries));
    } else {
      fetchCountries()
        .then((countriesData) => {
          setCountries(countriesData);
          localStorage.setItem("countries", JSON.stringify(countriesData));
        })
        .catch((error) => {
          console.log("Error occurred while fetching countries:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchTeams(selectedCountry.name)
        .then((teamsData) => {
          setTeams(teamsData);
          localStorage.setItem("teams", JSON.stringify(teamsData));
        })
        .catch((error) => {
          console.log("Error occurred while fetching teams:", error);
        });
    }
  }, [selectedCountry]);

 
  const handleCountrySelection = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
  };

  const handleTeamSelection = (selectedTeam) => {
    const isDuplicate = selectedTeams.some(
      (team) => team.id === selectedTeam.id
    );
    if (!isDuplicate) {
      setSelectedTeams((prevSelectedTeams) => [
        ...prevSelectedTeams,
        selectedTeam,
      ]);
    }
  };

  return (
    <div>
      <Combobox data={countries} onSelect={handleCountrySelection} />
      <Combobox data={teams} onSelect={handleTeamSelection} />
      {selectedTeams.map((team, index) => (
        <SwitchLabel key={index} team={team} />
      ))}
    </div>
  );
};

export default Options;*/
