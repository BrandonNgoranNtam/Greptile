{/*import React, { useState, useEffect } from "react";
import userService from "../services/userService";

interface Team {
  id: string;
  name: string;
}

export default function UserTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchUserTeams = async () => {
      setFetching(true);
      try {
        const response = await userService.getUserTeams();
        setTeams(response);
      } catch (error) {
        console.error("Error fetching user teams:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchUserTeams();
  }, []);

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (teams.length === 0) {
    return (
      <div>
        <h2>User Teams</h2>
        <p>Add teams to block</p>
      </div>
    );
  }

  return (
    <div>
      <h2>User Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}*/}

