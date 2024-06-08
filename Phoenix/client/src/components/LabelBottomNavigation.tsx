import React, { SyntheticEvent } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from '@mui/icons-material/List';

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Paper from "@mui/material/Paper";

interface LabelBottomNavigationProps {
  setCurrentView: (view: string) => void;
}

export default function LabelBottomNavigation({
  setCurrentView,
}: LabelBottomNavigationProps) {
  const [value, setValue] = React.useState("home");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setCurrentView(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<SportsSoccerIcon />}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Edit"
          value="edit"
          icon={<ListIcon />}
        />
         <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

{/*
     <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <Tabs defaultValue="home" onValueChange={handleChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="home" className="flex flex-col items-center">
            <SportsSoccerIcon />
            <span>Home</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex flex-col items-center">
            <SearchIcon />
            <span>Search</span>
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex flex-col items-center">
            <ListIcon />
            <span>Edit</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col items-center">
            <SettingsIcon />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  }
}*/}
