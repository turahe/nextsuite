# NextSuite - React 19 Dashboard Application

A modern, feature-rich dashboard application built with **React 19**, **TypeScript**, and **Vite**. Now with full Docker support for streamlined development and deployment.

## ✨ Features

- **React 19** - Latest React with concurrent features and performance improvements
- **TypeScript** - Full type safety and modern development experience  
- **Vite** - Lightning-fast build tool with HMR
- **Docker Ready** - Complete containerization for development and production
- **Modern UI** - Beautiful, responsive dashboard components
- **SCSS Support** - Advanced styling capabilities
- **Performance Optimized** - Optimized builds and caching strategies

## 🚀 Quick Start

### Prerequisites

Choose your preferred development environment:

**Option 1: Local Development**
- Node.js 18+ (recommended: Node.js 20)
- npm or yarn package manager

**Option 2: Docker Development** ⭐ **Recommended**
- Docker Desktop or Docker Engine
- Docker Compose

### Installation

#### 🐳 Docker Development (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nextsuite
   ```

2. **Start development environment:**
   ```bash
   npm run docker:compose-dev
   ```

3. **Access the application:**
   - Open your browser at **http://localhost:3000**
   - Hot reloading enabled for live development

For detailed Docker instructions, see [docker-README.md](./docker-README.md)

#### 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nextsuite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Open your browser at **http://localhost:3000**

## 📚 Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run type-check      # TypeScript type checking
```

### Docker Commands
```bash
npm run docker:compose-dev    # Start development with Docker
npm run docker:compose-prod   # Start production with Docker
npm run docker:build          # Build production Docker image
npm run docker:build-dev      # Build development Docker image
npm run docker:compose-down   # Stop all Docker services
npm run docker:clean          # Clean Docker resources
```

## 🏗️ Build and Deployment

### Local Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Docker Production Build
```bash
npm run docker:compose-prod
```
Builds and serves the application via optimized Nginx container on port 80.

### Server Deployment

For Apache servers, create a `.htaccess` file in your deployment directory:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

## 🛠️ Development

### Project Structure
```
src/
├── components/         # Reusable UI components
├── pages/             # Page-level components
├── layout/            # Layout components and providers
├── assets/            # Static assets (SCSS, images)
├── utils/             # Utility functions
├── route/             # Routing configuration
└── App.tsx            # Main application component
```

### Adding New Pages

1. **Update Menu Data:**
   Add your page to `src/layout/menu/MenuData.js`:
   ```javascript
   // Single Page
   { icon: "icon-name", text: "Page Name", link: "/page-url" }
   
   // Directory with sub-pages
   { 
     icon: "icon-name", 
     text: "Directory Name", 
     link: "/directory", 
     submenu: [
       { text: "Sub Page", link: "/directory/sub-page" }
     ]
   }
   ```

2. **Create Page Component:**
   Create your component in `src/pages/` and export it:
   ```typescript
   // src/pages/YourPage.tsx
   import React from 'react';
   
   const YourPage: React.FC = () => {
     return <div>Your page content</div>;
   };
   
   export default YourPage;
   ```

3. **Add Route:**
   Include the route in `src/route/Index.tsx`:
   ```typescript
   import { lazy } from 'react';
   
   const YourPage = lazy(() => import('../pages/YourPage'));
   
   // Add to your routes
   <Route path="/your-page" element={<YourPage />} />
   ```

4. **Restart the application** and visit your new route.

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
# API Configuration  
VITE_API_URL=http://localhost:5000

# Docker Environment
COMPOSE_PROJECT_NAME=nextsuite
```

### TypeScript Configuration
The project uses relaxed TypeScript settings for gradual migration. See `tsconfig.json` for current configuration.

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

**Docker permission issues:**
```bash
sudo chown -R $USER:$USER .
```

**Build failures with JS files:**
Convert problematic `.js` files to `.tsx` when encountering build errors.

## 📖 Documentation

- [Migration Guide](./MIGRATION.md) - React 19 and TypeScript migration details
- [Docker Setup](./docker-README.md) - Comprehensive Docker documentation
- [React 19 Documentation](https://react.dev/) - Official React documentation
- [Vite Documentation](https://vitejs.dev/) - Official Vite documentation

## 🔄 Migration Status

✅ **Completed:**
- React 19 upgrade
- TypeScript integration  
- Vite build system
- Docker containerization
- Development environment setup

⚠️ **In Progress:**
- Converting remaining JavaScript files to TypeScript
- Production build optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker: `npm run docker:compose-dev`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For technical support:
- Check the [troubleshooting section](#-troubleshooting)
- Review the [migration guide](./MIGRATION.md)
- Consult the [Docker documentation](./docker-README.md)

---

**Built with ❤️ using React 19, TypeScript, Vite, and Docker**
