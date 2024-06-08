import React, { useState } from "react";
import "./popup.css";
import LabelBottomNavigation from "../components/LabelBottomNavigation";
import HomeView from "../views/HomeView";
import SettingsView from "../views/SettingsView";
import SearchView from "../views/SearchView";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import SignUpPage from "../tabs/components/SignUp";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import LoggedHomeView from "../views/LoggedIHomeView";
import { Button } from "@mui/material";
import { useClerk } from "@clerk/chrome-extension";
import EditListView from "../views/EditListView";


const Popup = () => {
  const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;
  const [currentView, setCurrentView] = useState("home");
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  console.log("isSignedIn HelloUser:", isSignedIn);

  const renderContent = () => {

    if (!isSignedIn) {
      switch (currentView) {
        case "home":
          return <HomeView />;
        case "search":
          return <SearchView />;
        case "settings":
          return <SettingsView />;
        case "edit":
          return <EditListView />
      }
    } else {
      switch (currentView) {
        case "home":
          return <LoggedHomeView />;
        case "search":
          return <SearchView />;
        case "settings":
          return <SettingsView />;
        case "edit":
          return <EditListView />;
      }
    }
  };

  return (

    <>
      {renderContent()}
      <LabelBottomNavigation setCurrentView={setCurrentView} />
    </>

  );

}
/*const Popup = () => {
  const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;
  const [currentView, setCurrentView] = useState("home");
  const navigate = useNavigate();

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }


  const { isSignedIn, user } = useUser();

  const renderContent = () => {

    if (!isSignedIn) {
      switch (currentView) {
        case "home":
          return <HomeView />;
        case "search":
          return <SearchView />;
      }
    } else {
      switch (currentView) {
        case "home":
          return <LoggedHomeView />;
        case "search":
          return <SearchView />;
      }
    }
  };



  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      <Router>

        <div>
          {renderContent()}
          <Routes>
            <Route path="/" element={<HomeView />} />
          </Routes>
          <LabelBottomNavigation setCurrentView={setCurrentView} />
        </div>
      </Router>
    </ClerkProvider>

  );
};*/

export default Popup;
