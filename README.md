# ReviewCraft 🌟

[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/review-platform/ci.yml?branch=main)](https://github.com/yourusername/review-platform/actions)
[![Deploy Status](https://img.shields.io/website?url=https%3A%2F%2Fyour-app.vercel.app)](https://your-app.vercel.app)
[![License](https://img.shields.io/github/license/yourusername/review-platform)](LICENSE)
[![Version](https://img.shields.io/github/package-json/v/yourusername/review-platform)](package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A modern, enterprise-grade review management platform built with Next.js 15, TypeScript, and Prisma.

![ReviewCraft Dashboard](https://placeholder-for-screenshot.com/dashboard.png)

## ✨ Features

- 🔐 **Authentication & Authorization** - NextAuth.js with Google OAuth and credentials
- 👥 **Multi-Client Management** - Manage multiple client accounts with role-based access
- ⭐ **Review System** - Complete review lifecycle with approval workflows
- 🎨 **Modern UI/UX** - Beautiful interface with Tailwind CSS and custom styling
- 📱 **Responsive Design** - Mobile-first approach with seamless cross-device experience
- 🔒 **Secure API** - RESTful API with authentication middleware
- 📊 **Analytics Dashboard** - Real-time insights and review analytics
- 🎯 **Widget Integration** - Embeddable review widgets for client websites
- 🗄️ **Database** - PostgreSQL with Prisma ORM for type-safe database operations
- ⚡ **Performance** - Optimized with Next.js 15 App Router and server components

## 🚀 Live Demo

**Production:** [https://your-app.vercel.app](https://your-app.vercel.app)  
**Staging:** [https://staging-your-app.vercel.app](https://staging-your-app.vercel.app)

## 📋 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom CSS
- **UI Components:** [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://github.com/colinhacks/zod)
- **State Management:** [TanStack Query](https://tanstack.com/query)
- **Deployment:** [Vercel](https://vercel.com/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (or npm/yarn)
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/review-platform.git
   cd review-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables in `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/reviewcraft"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # App Configuration
   NEXT_PUBLIC_APP_NAME="ReviewCraft"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma migrate dev
   
   # Seed the database (optional)
   pnpm prisma db seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking

# Database
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run database migrations
pnpm prisma:studio    # Open Prisma Studio
pnpm prisma:seed      # Seed the database
pnpm prisma:reset     # Reset database

# Testing
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── client/            # Client-specific pages
│   ├── dashboard/         # Dashboard components
│   └── widget/            # Widget integration
├── components/            # Reusable components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── middleware/       # Custom middleware
├── styles/               # Global styles and themes
├── types/                # TypeScript type definitions
└── utils/                # Utility functions

prisma/
├── schema.prisma         # Database schema
├── migrations/           # Database migrations
└── seed.ts              # Database seeding
```

### Code Style

This project follows strict coding standards:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for git hooks
- **lint-staged** for pre-commit linting

## 🌐 API Documentation

The application provides a comprehensive REST API:

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `GET /api/auth/session` - Get current session

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/[id]` - Get client details
- `PUT /api/clients/[id]` - Update client
- `DELETE /api/clients/[id]` - Delete client

### Reviews
- `GET /api/reviews` - List reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/[id]` - Update review status

### Health Check
- `GET /api/health` - Application health status

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. **Configure environment variables** in Vercel dashboard

3. **Set up database** - Connect your PostgreSQL database

### Docker

```bash
# Build the image
docker build -t reviewcraft .

# Run the container
docker run -p 3000:3000 --env-file .env.local reviewcraft
```

### Environment Variables

Required environment variables for production:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your domain URL
- `NEXTAUTH_SECRET` - Random secret for JWT signing
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (optional)
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret (optional)

## 📊 Database Schema

The application uses PostgreSQL with the following main entities:

- **User** - Application users with role-based access
- **Client** - Business clients using the platform
- **Review** - Customer reviews with ratings and content
- **APIKey** - API keys for client integration
- **AuditLog** - Activity tracking and audit trails
- **Media** - File uploads and media management

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

- 📧 Email: support@reviewcraft.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/review-platform/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/review-platform/discussions)
- 📖 Documentation: [docs.reviewcraft.com](https://docs.reviewcraft.com)

---

<div align="center">
  <strong>Built with ❤️ by the ReviewCraft Team</strong>
</div>
