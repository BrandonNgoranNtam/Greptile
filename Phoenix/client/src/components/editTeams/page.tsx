import { useEffect, useState } from "react";
import { TeamsInfo, columns } from "./columns"
import { DataTable } from "./data-table"
import { useAuth, useUser } from "@clerk/chrome-extension";
import userService from "../../services/userService";
import React from "react";

const IMG_URL = "https://media.api-sports.io/football/teams/";

export default  function EditTeams() {
    const { getToken } = useAuth();
    const { user } = useUser();
    const teams = localStorage.getItem("currentUserTeams");
    const [teamsData, setTeamsData] = useState<TeamsInfo[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      if (user) {
          fetchUserTeams();
      }
  }, [user]);
     
    
  const fetchUserTeams = async () => {
    try {
        const token = await getToken();
        const userTeams = await userService.getUserTeams(token);
        setTeamsData(userTeams.map((teamData) => ({
          id: teamData.external_id,
          name: teamData.name,
          logo: `${IMG_URL}${teamData.external_id}.png`
      })));        
    } catch (error) {
        console.error("Error fetching user teams:", error);
    } finally {
        setLoading(false);
    }
};

if (!user || loading) {
    return <div>Loading...</div>;
}

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={teamsData} />
    </div>
  )
}

