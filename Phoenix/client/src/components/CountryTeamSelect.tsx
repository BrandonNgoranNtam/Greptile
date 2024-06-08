import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { fetchCountries, fetchTeams } from "../services/apiService";
import { SwitchLabel } from "./SwitchLabel";
import { Badge } from "./ui/badge";
import { cn } from "../../lib/utils";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import userService from "../services/userService";
import { useAuth } from "@clerk/chrome-extension";
import { useToast } from "../components/ui/use-toast"
import { ToastAction } from "./ui/toast";





export default function CountrySelect() {
  const [countries, setCountries] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { getToken } = useAuth();
  const { toast } = useToast()



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
    console.log("Updated selected teams (after render):", selectedTeams);
  }, [selectedTeams]);

  useEffect(() => {
    if (selectedCountry) {
      {/*const storedTeams = localStorage.getItem("teams");
      if (storedTeams) {
        setTeams(JSON.parse(storedTeams));
      } else {*/}
        fetchTeams(selectedCountry.name)
          .then((teamsData) => {
            setTeams(teamsData);
            localStorage.setItem("teams", JSON.stringify(teamsData));
          })
          .catch((error) => {
            console.log("Error occurred while fetching teams:", error);
          });
      }
    {/*}}*/}
  }, [selectedCountry]);

  const handleCountrySelection = (event, value) => {
    setSelectedCountry(value);
    console.log("Selected country:", value);
  };

  const handleDeleteTeam = (teamId) => {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.filter((team) => team.id !== teamId)
    );
  };
  
  const handleAddTeams = async () => {
    console.log("Selected teams:", selectedTeams);
    try{
      const token = await getToken();
      const response = await userService.addUserTeams(selectedTeams, token);
      console.log("Response:", response);
      setSelectedTeams([]);
      console.log("User teams added successfully");
      toast({
        description: "You have successfully added your teams!",
      })
      const currentUserTeams = JSON.parse(localStorage.getItem("currentUserTeams") || "[]");
      const updatedTeams = [...currentUserTeams, ...selectedTeams];
      localStorage.setItem("currentUserTeams", JSON.stringify(updatedTeams));
    }catch(error){
      console.error("Error adding users teams:", error);
      toast({
        variant: "destructive",
        description: "An error occurred while adding your teams. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,

      })
    }

  };


  const handleTeamSelection = (event, value) => {
    console.log("Selected team:", value);
    const isDuplicate = selectedTeams.some(
      (team) => team.id === value.id
    );
    if (!isDuplicate) {
      setSelectedTeams((prevSelectedTeams) => [
        ...prevSelectedTeams,
        value,
      ]);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4 mb-8">
        <Card className={cn("w-[380px]")} >
          <CardHeader>
            <CardTitle>Select your teams!</CardTitle>
            <CardDescription>Please select the country of your team and then your team</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=''>
              <Autocomplete
                id="country-select-demo"
                placeholder="Choose a country"
                className='pt-2 pb-2'
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                  return (
                    <AutocompleteOption {...props}>
                      <ListItemDecorator>
                        {option.code ? (
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt=""
                          />
                        ) : (
                          <span></span>
                        )}
                      </ListItemDecorator>
                      <ListItemContent sx={{ fontSize: "sm" }}>
                        {option.name}
                      </ListItemContent>
                    </AutocompleteOption>
                  );
                }}
                onChange={handleCountrySelection}
              />
            </div>
            <div className=''>
              <Autocomplete
                id="team-select"
                placeholder="Choose a team"
                className='pt-2 pb-2'

                options={teams}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                  return (
                    <AutocompleteOption {...props}>
                      <ListItemDecorator>
                        <img
                          loading="lazy"
                          width="20"
                          srcSet={option.logo}
                          src={option.logo}
                          alt=""
                        />
                      </ListItemDecorator>
                      <ListItemContent sx={{ fontSize: "sm" }}>
                        {option.name}
                      </ListItemContent>
                    </AutocompleteOption>
                  );
                }}
                onChange={handleTeamSelection}
              />
            </div>
            <div className="flex flex-wrap justify-center">
              {selectedTeams.map((team, index) => (
                <Badge
                  key={index}
                  className="m-1 flex items-center space-x-2"
                  variant="secondary"
                >
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-4 h-4"
                  />
                  <span>{team.name}</span>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteTeam(team.id)}
                    className="ml-2"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleAddTeams()}>
              Add new team(s)
            </Button>
          </CardFooter>
        </Card>

      </div >
    </div >

  );
}


{/*<CardContent className="">
          {selectedTeams.map((team, index) => (
            <div
              key={index}
              className="mb-2 flex items-center space-x-2"
            >
              <img
                src={team.logo}
                alt={team.name}
                className="h-6 w-6 rounded-full"
              />
              <p className="text-sm font-medium leading-none">{team.name}</p>
            </div>
          ))}</CardContent>*/}
