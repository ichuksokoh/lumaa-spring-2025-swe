// express.d.ts
import { Request } from 'express';

// declare global {
//     namespace Express {
//       interface Request {
//         user?: { userId: number; username?: string };  // Add user property to Request
//       }
//     }
//   }



declare namespace Express {
    interface Request {
      user?: {
        userId: number; 
        username?: string;
      };
    }
  }