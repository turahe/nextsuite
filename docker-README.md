# Docker Setup for NextSuite React 19 Application

This document provides comprehensive instructions for running the NextSuite application using Docker.

## 📋 Prerequisites

- Docker Desktop or Docker Engine installed
- Docker Compose (included with Docker Desktop)
- At least 4GB of available RAM

## 🏗️ Docker Architecture

The project includes multiple Docker configurations:

### 1. Production Dockerfile (`Dockerfile`)
- **Multi-stage build** for optimized production images
- Uses Node.js 20 Alpine for building
- Serves via Nginx for production deployment
- Includes security hardening and performance optimizations

### 2. Development Dockerfile (`Dockerfile.dev`)
- Single-stage build for development
- Includes hot reloading support
- Mounts source code for live development

### 3. Docker Compose (`docker-compose.yml`)
- Orchestrates both development and production services
- Includes networking and volume configurations
- Ready for backend API integration

## 🚀 Quick Start

### Development Mode

1. **Start development environment:**
   ```bash
   npm run docker:compose-dev
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Hot reloading enabled for live development

### Production Mode

1. **Build and run production environment:**
   ```bash
   npm run docker:compose-prod
   ```

2. **Access the application:**
   - Frontend: http://localhost
   - Optimized production build served via Nginx

## 📚 Available Scripts

### Build Commands
```bash
# Build production image
npm run docker:build

# Build development image  
npm run docker:build-dev

# Build all services with docker-compose
npm run docker:compose-build
```

### Run Commands
```bash
# Run production container
npm run docker:run

# Run development container with volume mounting
npm run docker:run-dev

# Start development service with docker-compose
npm run docker:compose-dev

# Start production service with docker-compose
npm run docker:compose-prod
```

### Management Commands
```bash
# Stop all services
npm run docker:compose-down

# Clean up unused Docker resources
npm run docker:clean
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# API Configuration
VITE_API_URL=http://localhost:5000

# Docker Environment
COMPOSE_PROJECT_NAME=nextsuite

# Development/Production Mode
NODE_ENV=development
```

### Backend Integration

To add a backend API service, uncomment the backend service in `docker-compose.yml`:

```yaml
backend:
  image: your-backend-image:latest
  ports:
    - "5000:5000"
  environment:
    - NODE_ENV=production
    - DATABASE_URL=${DATABASE_URL}
  networks:
    - nextsuite-network
```

## 🔒 Security Features

### Production Security
- Non-root user execution
- Nginx security headers
- Content Security Policy
- No sensitive information in build layers

### Network Security
- Isolated Docker network
- Only necessary ports exposed
- Health check endpoints

## 📊 Performance Optimizations

### Build Optimizations
- Multi-stage builds reduce image size
- Layer caching for faster rebuilds
- Optimized nginx configuration

### Runtime Optimizations
- Gzip compression enabled
- Static asset caching (1 year)
- Efficient nginx worker configuration

## 🏥 Health Checks

### Built-in Health Monitoring
- HTTP health check endpoint: `/health`
- Container health monitoring
- Automatic restart on failure

### Monitoring Commands
```bash
# Check container health
docker ps

# View container logs
docker-compose logs nextsuite-prod

# Monitor resource usage
docker stats
```

## 🐛 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using port 3000/80
sudo lsof -i :3000
sudo lsof -i :80

# Stop conflicting services
npm run docker:compose-down
```

**Volume mounting issues (development):**
```bash
# Rebuild with no cache
docker-compose build --no-cache nextsuite-dev
```

**Permission issues:**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Log Analysis
```bash
# View application logs
docker-compose logs -f nextsuite-dev

# View nginx logs (production)
docker-compose exec nextsuite-prod tail -f /var/log/nginx/access.log
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: |
          docker build -t nextsuite:${{ github.sha }} .
          
      - name: Run tests in container
        run: |
          docker run --rm nextsuite:${{ github.sha }} npm test
```

### Production Deployment
```bash
# Build for production
docker build -t nextsuite:latest .

# Tag for registry
docker tag nextsuite:latest your-registry/nextsuite:latest

# Push to registry
docker push your-registry/nextsuite:latest
```

## 📈 Scaling Considerations

### Horizontal Scaling
```yaml
# In docker-compose.yml
nextsuite-prod:
  deploy:
    replicas: 3
    resources:
      limits:
        memory: 512M
      reservations:
        memory: 256M
```

### Load Balancing
- Configure reverse proxy (nginx/Apache)
- Use container orchestration (Kubernetes, Docker Swarm)
- Implement service mesh for microservices

## 🔍 Advanced Usage

### Custom nginx Configuration
Modify `nginx.conf` for:
- SSL/TLS termination
- Custom caching policies
- API proxy configuration
- Rate limiting

### Multi-environment Setup
```bash
# Create environment-specific compose files
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up
```

### Database Integration
```yaml
# Add to docker-compose.yml
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: nextsuite
    POSTGRES_USER: ${DB_USER}
    POSTGRES_PASSWORD: ${DB_PASSWORD}
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

## 📝 Best Practices

1. **Use specific image tags** instead of `latest`
2. **Minimize layers** in Dockerfile
3. **Use .dockerignore** to exclude unnecessary files
4. **Run containers as non-root** users
5. **Implement proper health checks**
6. **Use multi-stage builds** for production
7. **Keep secrets out** of Docker images
8. **Regular security updates** for base images

## 🆘 Support

For Docker-related issues:
1. Check container logs: `docker-compose logs`
2. Verify environment configuration
3. Ensure Docker daemon is running
4. Check available system resources
5. Review nginx configuration for production issues

---

**Note:** This Docker setup is optimized for React 19 with Vite and includes all modern development and production best practices.