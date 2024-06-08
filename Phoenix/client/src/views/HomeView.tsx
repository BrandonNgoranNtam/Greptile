import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import SignUp from "../tabs/components/SignUp";

export default function HomeView() {
  console.log("HomeView called");
  return (
    <div>
      <Header />
    </div>
  );
}
