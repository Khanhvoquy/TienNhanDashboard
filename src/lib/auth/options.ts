import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { z } from 'zod';

// Auth Schema
const AuthSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials Provider (for demo/testing)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Validate input
        try {
          AuthSchema.parse(credentials);
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new Error(error.errors.map(e => e.message).join(', '));
          }
          throw new Error('Invalid credentials');
        }

        // TODO: Replace with actual database lookup
        // For demo: accept any valid format credentials
        const user = {
          id: 'user-' + Date.now(),
          email: credentials.email,
          name: credentials.email.split('@')[0],
          role: 'L1' as const,
          currentXp: 0,
          realm: 'PHAM_NHAN' as const,
          levelInRealm: 1,
          isTamMa: false,
          isDoKiep: false,
          stats: {
            ticketsResolved: 0,
            avgSlaTime: 0,
            kbContributions: 0,
            totalBonus: 0
          }
        };

        return user;
      }
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),

    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    })
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.currentXp = (user as any).currentXp;
        token.realm = (user as any).realm;
        token.levelInRealm = (user as any).levelInRealm;
      }
      
      // Handle session updates
      if (trigger === 'update' && session) {
        return { ...token, ...session.user };
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.currentXp = token.currentXp as number;
        session.user.realm = token.realm as string;
        session.user.levelInRealm = token.levelInRealm as number;
      }
      return session;
    },
  },
  
  events: {
    async signIn({ user }) {
      console.log(`✅ User signed in: ${user.email}`);
    },
    async signOut({ token }) {
      console.log(`👋 User signed out: ${token.email}`);
    },
  },
  
  // Security settings
  secret: process.env.NEXTAUTH_SECRET,
  
  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
};

// Type augmentation
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      currentXp: number;
      realm: string;
      levelInRealm: number;
    };
  }
  
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    currentXp: number;
    realm: string;
    levelInRealm: number;
    isTamMa: boolean;
    isDoKiep: boolean;
    stats: {
      ticketsResolved: number;
      avgSlaTime: number;
      kbContributions: number;
      totalBonus: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    currentXp: number;
    realm: string;
    levelInRealm: number;
  }
}
