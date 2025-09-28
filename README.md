# Bowmen Stack - Modern Full-Stack Web Application Boilerplate

🚀 **The ultimate starter template for modern web applications**

A production-ready boilerplate built with Next.js 15, featuring complete authentication system, database integration, caching, and a beautiful UI. Perfect for kickstarting your next SaaS, web app, or full-stack project with industry best practices built-in.

[Live Demo](https://bowmen-stack.vercel.app/) | [GitHub Repo](https://github.com/OmarHosamCodes/bowmen-stack)

![Bowmen Stack Screenshot](/assets/screenshot.png)

## ✨ Features

- 🔐 **Secure Authentication**: Credential-based auth with bcrypt password hashing
- ⚡ **Performance**: React Query for client-side caching and Redis for server-side caching
- 🎨 **Modern UI**: Beautiful, responsive design with shadcn/ui components
- 🔒 **Route Protection**: Middleware-based route protection and authentication checks
- 📱 **Mobile-First**: Fully responsive design that works on all devices
- 🚀 **Production Ready**: Built with TypeScript, proper error handling, and validation
- 🎯 **Developer Experience**: Hot reload, type safety, and comprehensive tooling

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) with Credentials Provider
- **Database**: [PostgreSQL](https://postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Caching**: [Redis](https://redis.io/) with [ioredis](https://github.com/redis/ioredis)
- **State Management**: [TanStack Query](https://tanstack.com/query) (React Query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Validation**: [Zod](https://zod.dev/) for type-safe validation
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod resolvers
- **Password Hashing**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js/)
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js 18+
- Bun (recommended) or npm/yarn
- Docker (for PostgreSQL and Redis)

### 1. Clone and Install

```bash
git clone https://github.com/OmarHosamCodes/bowmen-stack
cd bowmen-stack
bun install
```

### 2. Environment Setup

Copy the environment file and configure your variables:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bowmen_db"

# Redis
REDIS_URL="redis://localhost:6379"

# NextAuth.js - Generate a secure secret
AUTH_SECRET="your-super-secure-secret-here"

# Development
NODE_ENV="development"
```

Generate a secure AUTH_SECRET:
```bash
bunx --bun auth secret
```

### 3. Start Services

Start PostgreSQL and Redis using Docker:

```bash
docker-compose up -d
```

### 4. Database Setup

Generate and run migrations:

```bash
# Generate migration files
bun run db:generate

# Apply migrations
bun run db:migrate

# (Optional) Seed the database
bun run db:seed
```

### 5. Start Development Server

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/          # Authentication API routes
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── auth/              # Authentication-related components
│   ├── layout/            # Layout components (Header, etc.)
│   ├── sections/          # Homepage sections
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
│   └── useAuth.ts         # Authentication hooks
├── lib/                   # Utility libraries
│   ├── password.ts        # Password hashing utilities
│   ├── redis.ts           # Redis client and cache utilities
│   └── utils.ts           # General utilities
├── providers/             # React context providers
│   ├── react-query-provider.tsx
│   └── toaster-provider.tsx
└── server/                # Server-side code
    ├── auth/              # NextAuth configuration
    └── db/                # Database schema and connection
```

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email/password
2. **Login**: Credential verification with secure session creation
3. **Session Management**: JWT-based sessions with Redis caching
4. **Route Protection**: Middleware protects authenticated routes
5. **Logout**: Secure session cleanup and cache invalidation

## 🎨 UI Components

The application uses a modern design system built on:

- **shadcn/ui**: High-quality, accessible components
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **React Hook Form**: Performant forms with validation
- **Zod**: Type-safe schema validation

## 📊 Caching Strategy

### Client-Side (React Query)
- User session data cached for 5 minutes
- Query invalidation on auth state changes
- Optimistic updates for better UX

### Server-Side (Redis)
- Session data cached for 1 hour
- User profile data cached for 30 minutes
- Automatic cache invalidation on data changes

## 🛡️ Security Features

- **Password Security**: bcrypt with 12 salt rounds
- **Password Validation**: Strong password requirements
- **Session Security**: Secure JWT tokens with short expiration
- **Route Protection**: Middleware-based authentication
- **Input Validation**: Zod schemas for all user inputs
- **SQL Injection Protection**: Drizzle ORM with prepared statements

## 🚀 Deployment

### Environment Variables for Production

```bash
# Production database (use connection pooling)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Production Redis (use Redis Cloud or similar)
REDIS_URL="redis://user:password@host:6379"

# Secure auth secret (generate with: npx auth secret)
AUTH_SECRET="your-production-secret"

# Production environment
NODE_ENV="production"
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Deploy with Docker

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## 📈 Performance Optimizations

- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Pre-generated static pages where possible
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Splitting**: Automatic code splitting
- **Redis Caching**: Reduced database queries
- **React Query**: Intelligent client-side caching

## 🧪 Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server

# Database
bun run db:generate  # Generate migration files
bun run db:migrate   # Run migrations
bun run db:push      # Push schema changes
bun run db:studio    # Open Drizzle Studio
bun run db:seed      # Seed database

# Code Quality
bun run typecheck    # Run TypeScript checks
bun run check        # Run Biome linting
bun run check:write  # Fix linting issues

# UI Components
bun run ui:add       # Add new shadcn/ui component
```

### Adding New Components

```bash
# Add a new shadcn/ui component
bun run ui:add button
bun run ui:add dialog
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [T3 Stack](https://create.t3.gg/) for the foundational structure
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [TanStack Query](https://tanstack.com/query) for data fetching
