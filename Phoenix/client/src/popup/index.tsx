import React from "react";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'
import {
    ClerkProvider,
} from "@clerk/chrome-extension";
import Popup from "./popup";
import { Route, Routes } from "react-router-dom";
import HomeView from "../views/HomeView";
import { Toaster } from "../components/ui/toaster"


function init() {
    const appContainer = document.createElement('div')
    const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;
    if (!PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key");
    }
    document.body.appendChild(appContainer)
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(appContainer)
    console.log(appContainer)
    root.render(
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}>
            <Popup />
            <Toaster />
        </ClerkProvider >

    );
}

init();