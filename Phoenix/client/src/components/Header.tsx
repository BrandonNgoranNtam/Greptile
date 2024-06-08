import React from "react";
import { Typography, Switch, FormControlLabel } from "@mui/material";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useClerk } from "@clerk/chrome-extension";

export default function Header() {
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();
  console.log("isSignedIn Header:", isSignedIn);
  if (isSignedIn) {
    return (
      <div className="flex items-center justify-between">
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      Welcome back, {user.firstName}!</h4>
      <Button onClick={() => clerk.signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h4">FootBlock Dashboard</Typography>
      <Typography variant="subtitle1">
        Manage your spoiler-blocking preferences
      </Typography>
      <div>Please sign in</div>
      {/*<FormControlLabel
        control={
          //<Switch checked={isExtensionEnabled} onChange={toggleExtension} />
          <Switch />
        }
        label="Enable Extension"
      />*/}
    </div>
  );
}
