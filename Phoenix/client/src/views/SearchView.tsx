import React from "react";
import { Typography, Button, FormControlLabel } from "@mui/material";
import CountrySelect from "../components/CountryTeamSelect";
import { Badge } from "../components/ui/badge";

import { cn } from "../../lib/utils";
import { Check } from "lucide-react";


export default function SearchView() {
  return (
    <div className="flex items-center justify-center h-screen">
      <CountrySelect />
    </div>
  );
}


/*<div>
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Select your teams!</h4>
      <div className=" flex flex-col items-center justify-center p-4 mb-8">
        <CountrySelect />
      </div>
    </div>*/

/*const SettingsView = ({ user, updateUserSettings, logout }) => {
  const handleNotificationChange = (event) => {
    updateUserSettings({ notifications: event.target.checked });
  };

  return (
    <div>
      <Typography variant="h4">Profile Settings</Typography>
      <Typography variant="h6">User: {user.name}</Typography>
      <FormControlLabel
        control={<Switch checked={user.settings.notifications} onChange={handleNotificationChange} />}
        label="Enable Notifications"
      />
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};*/
