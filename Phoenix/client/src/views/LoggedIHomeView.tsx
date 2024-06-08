import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import SignUp from "../tabs/components/SignUp";
import { Link, useNavigate } from "react-router-dom";
import { ClerkProvider, useClerk, useUser } from "@clerk/clerk-react";
import { BlockList } from "../components/BlockList";
import { Button } from "../components/ui/button";
import { BlockInfo } from "../components/BlockInfo";

export default function LoggedHomeView() {



  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <div className="flex flex-col items-center space-y-12">
        <div className="flex flex-col items-center space-y-6">
          <BlockList />
          <BlockInfo />
        </div>
      </div>
    </div>

  );
}

