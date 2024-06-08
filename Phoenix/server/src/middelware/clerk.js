// server/middleware/clerk.js

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const clerkMiddleware = ClerkExpressRequireAuth({
  // your clerk configuration
  
});

module.exports = clerkMiddleware;
