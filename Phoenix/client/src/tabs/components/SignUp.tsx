import React from "react";
import {
  Link,
  Outlet,
  useNavigate,
  Routes,
  Route,
  MemoryRouter,
} from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useClerk,
  useUser,
  ClerkProvider,
} from "@clerk/chrome-extension";
import { Button } from "@mui/material";

const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function HelloUser() {
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  console.log("isSignedIn HelloUser:", isSignedIn);


  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <p>Hi, {user.primaryEmailAddress?.emailAddress}!</p>
      <p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => clerk.signOut()}
        >
          Sign Out
        </Button>
      </p>
    </>
  );
}

function SignUpPage() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      <div className="App">
        <header className="App-header">
          <p>Welcome to Clerk Chrome Extension Starter!</p>
          <a
            className="App-link"
            href="https://clerk.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about Clerk
          </a>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/sign-up/*" element={<SignUp signInUrl="/" />} />
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <HelloUser />
                  </SignedIn>
                  <SignedOut>
                    <SignIn afterSignInUrl="/" signUpUrl="/" />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </ClerkProvider>
  );
}

export default SignUpPage;
