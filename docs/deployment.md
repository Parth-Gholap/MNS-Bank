# Deployment Documentation

## Overview

This document provides comprehensive instructions for deploying the MNS Bank website to various environments. The deployment process is automated through CI/CD pipelines but manual deployment options are also available.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Automated Deployment](#automated-deployment)
4. [Manual Deployment](#manual-deployment)
5. [Environment-Specific Instructions](#environment-specific-instructions)
6. [Monitoring and Health Checks](#monitoring-and-health-checks)
7. [Rollback Procedures](#rollback-procedures)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools

- Node.js 18.x or higher
- npm 9.x or higher
- Docker (for containerized deployment)
- Git
- AWS CLI (for AWS deployment)
- Vercel CLI (for Vercel deployment)

### Access Requirements

- GitHub repository access
- Docker Hub account (for container deployment)
- AWS account with appropriate permissions
- Environment variables and secrets access

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
PORT=3000

# API Keys
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Database (if applicable)
DATABASE_URL=your_database_url

# Analytics and Monitoring
GOOGLE_ANALYTICS_ID=your_ga_id
SENTRY_DSN=your_sentry_dsn

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key

# External Services
API_BASE_URL=https://api.your-service.com
WEBHOOK_SECRET=your_webhook_secret
```

## Environment Configuration

### Development Environment

```bash
# .env.development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=dev_api_key
```

### Staging Environment

```bash
# .env.staging
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.mnsbank.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=staging_api_key
DATABASE_URL=staging_database_url
```

### Production Environment

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://www.mnsbank.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=prod_api_key
DATABASE_URL=production_database_url
```

## Automated Deployment

### GitHub Actions CI/CD

The project uses GitHub Actions for automated deployment. The pipeline includes:

1. **Code Quality Checks**
   - ESLint
   - TypeScript compilation
   - Prettier formatting
   - Unit and integration tests

2. **Testing**
   - E2E tests (Playwright)
   - Cross-browser compatibility tests
   - Accessibility tests
   - Performance tests
   - Security scans

3. **Build and Package**
   - Production build
   - Docker image creation
   - Artifact storage

4. **Deployment**
   - Staging deployment (on develop branch)
   - Production deployment (on main branch or release)

### Triggering Deployments

#### Automatic Triggers

- **Staging**: Push to `develop` branch
- **Production**: Push to `main` branch or create a release

#### Manual Triggers

```bash
# Trigger staging deployment
git push origin develop

# Trigger production deployment
git push origin main

# Create a release for production
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Manual Deployment

### Local Build

```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Start the application
npm start
```

### Docker Deployment

#### Build Docker Image

```bash
# Build the image
docker build -t mnsbank/banking-website .

# Tag the image
docker tag mnsbank/banking-website:latest mnsbank/banking-website:v1.0.0

# Push to registry
docker push mnsbank/banking-website:latest
docker push mnsbank/banking-website:v1.0.0
```

#### Run Docker Container

```bash
# Run the container
docker run -d \
  --name mnsbank-website \
  -p 3000:3000 \
  --env-file .env.production \
  mnsbank/banking-website:latest
```

### AWS Deployment

#### Using AWS ECS

```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name mnsbank-cluster

# Create task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service \
  --cluster mnsbank-cluster \
  --service-name mnsbank-service \
  --task-definition mnsbank-task:1 \
  --desired-count 2
```

#### Using AWS Elastic Beanstalk

```bash
# Initialize EB CLI
eb init mnsbank-website

# Create environment
eb create production

# Deploy
eb deploy
```

### Vercel Deployment

#### Install Vercel CLI

```bash
npm i -g vercel
```

#### Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod

# Link to project
vercel link
```

### Netlify Deployment

#### Using Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

## Environment-Specific Instructions

### Staging Environment

#### Purpose
- Testing new features
- Integration testing
- Performance testing
- User acceptance testing

#### Configuration
- Uses staging database
- Limited user access
- Reduced performance requirements
- Extended logging enabled

#### Deployment Steps
1. Merge feature branch to `develop`
2. Automatic deployment via GitHub Actions
3. Run smoke tests
4. Notify team of deployment status

### Production Environment

#### Purpose
- Live user traffic
- High availability required
- Performance optimized
- Security hardened

#### Configuration
- Production database
- Full user access
- High performance requirements
- Minimal logging for performance

#### Deployment Steps
1. Ensure all tests pass
2. Create release tag
3. Deploy via GitHub Actions
4. Run health checks
5. Monitor for issues
6. Notify stakeholders

## Monitoring and Health Checks

### Health Check Endpoints

#### Basic Health Check
```bash
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "production"
}
```

#### Detailed Health Check
```bash
GET /api/health/detailed
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": "healthy",
    "cache": "healthy",
    "external_api": "healthy"
  },
  "metrics": {
    "memory_usage": "45%",
    "cpu_usage": "23%",
    "response_time": "120ms"
  }
}
```

### Monitoring Setup

#### Application Monitoring

1. **Sentry Integration**
```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

2. **Performance Monitoring**
```javascript
// lib/monitoring.js
export const trackPerformance = (name, value) => {
  if (window.gtag) {
    window.gtag('event', name, { value });
  }
};
```

#### Infrastructure Monitoring

1. **CloudWatch Alarms** (AWS)
2. **Google Cloud Monitoring** (GCP)
3. **Datadog** (Third-party)
4. **New Relic** (Third-party)

### Log Management

#### Structured Logging
```javascript
// lib/logger.js
export const logger = {
  info: (message, meta = {}) => {
    console.log(JSON.stringify({ level: 'info', message, meta }));
  },
  error: (message, error) => {
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      error: error.message,
      stack: error.stack 
    }));
  }
};
```

#### Log Aggregation
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Splunk
- Papertrail
- LogDNA

## Rollback Procedures

### Automatic Rollback

#### GitHub Actions Rollback
```yaml
# .github/workflows/rollback.yml
name: Rollback Deployment

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to rollback'
        required: true
        default: 'production'
      version:
        description: 'Version to rollback to'
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.inputs.version }}
      
      - name: Deploy rollback
        run: |
          echo "Rolling back to version ${{ github.event.inputs.version }}"
          # Add rollback commands here
```

### Manual Rollback

#### Docker Rollback
```bash
# Stop current container
docker stop mnsbank-website

# Run previous version
docker run -d \
  --name mnsbank-website \
  -p 3000:3000 \
  --env-file .env.production \
  mnsbank/banking-website:previous-version
```

#### Git Rollback
```bash
# Reset to previous commit
git reset --hard HEAD~1

# Force push (use with caution)
git push --force-with-lease origin main

# Redeploy
git push origin main
```

#### Database Rollback
```bash
# Using migrations
npm run migrate:rollback

# Manual database restore
pg_restore -h localhost -U username -d database_name backup.sql
```

## Troubleshooting

### Common Issues

#### Build Failures

1. **Dependency Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm ci
```

2. **TypeScript Errors**
```bash
# Check TypeScript version
npx tsc --version

# Update types
npm update typescript @types/react @types/node

# Check configuration
npx tsc --noEmit
```

#### Runtime Errors

1. **Memory Issues**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Check memory usage
node --inspect app.js
```

2. **Port Conflicts**
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Use different port
PORT=3001 npm start
```

#### Performance Issues

1. **Slow Response Times**
```bash
# Enable performance monitoring
export NODE_ENV=production

# Check bundle size
npm run build:analyze

# Optimize images
npm run optimize:images
```

2. **High Memory Usage**
```bash
# Check memory leaks
node --inspect app.js

# Monitor with heapdump
npm install heapdump
```

### Debugging Tools

#### Browser DevTools
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

#### Node.js Debugging
```bash
# Debug with Node.js
node --inspect-brk app.js

# Debug with VS Code
code --inspect app.js
```

#### Performance Profiling
```bash
# Generate CPU profile
node --prof app.js

# Analyze profile
node --prof-process isolate-*.log > profile.txt
```

### Support Contacts

#### Development Team
- Lead Developer: dev-lead@mnsbank.com
- DevOps Engineer: devops@mnsbank.com
- QA Engineer: qa@mnsbank.com

#### Emergency Contacts
- On-call Engineer: oncall@mnsbank.com
- System Administrator: sysadmin@mnsbank.com

#### External Services
- Hosting Provider: support@hosting-provider.com
- CDN Provider: support@cdn-provider.com
- DNS Provider: support@dns-provider.com

## Security Considerations

### Production Security Checklist

- [ ] Environment variables are properly secured
- [ ] SSL/TLS certificates are valid
- [ ] Security headers are configured
- [ ] API endpoints are protected
- [ ] Database connections are encrypted
- [ ] Access controls are implemented
- [ ] Logging is enabled for security events
- [ ] Backup procedures are in place
- [ ] Regular security scans are scheduled

### Security Monitoring

1. **Intrusion Detection**
2. **Access Log Analysis**
3. **Vulnerability Scanning**
4. **Penetration Testing**
5. **Security Incident Response**

## Backup and Recovery

### Database Backups

#### Automated Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
pg_dump -h localhost -U username -d database_name > backup_$DATE.sql

# Upload to S3
aws s3 cp backup_$DATE.sql s3://backups/database/
```

#### Manual Backup
```bash
# Create backup
pg_dump -h localhost -U username -d database_name > manual_backup.sql

# Restore backup
psql -h localhost -U username -d database_name < manual_backup.sql
```

### File Backups

#### Static Assets
- S3 versioning enabled
- CloudFront cache invalidation
- CDN backup procedures

#### Application Files
- Git repository backup
- Docker image registry backup
- Configuration file backup

## Performance Optimization

### Production Optimizations

1. **Code Splitting**
2. **Lazy Loading**
3. **Image Optimization**
4. **Caching Strategies**
5. **CDN Configuration**
6. **Database Indexing**

### Monitoring Performance

1. **Core Web Vitals**
2. **Page Load Times**
3. **API Response Times**
4. **Database Query Performance**
5. **Server Resource Usage**

## Maintenance

### Regular Maintenance Tasks

#### Daily
- Check system health
- Review error logs
- Monitor performance metrics

#### Weekly
- Update dependencies
- Review security patches
- Clean up old logs

#### Monthly
- Performance audits
- Security assessments
- Backup verification

#### Quarterly
- Major dependency updates
- Infrastructure review
- Disaster recovery testing

### Update Procedures

#### Dependency Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Security updates
npm audit fix
```

#### System Updates
```bash
# Update server packages
sudo apt update && sudo apt upgrade

# Update Docker
docker pull mnsbank/banking-website:latest
```

---

This deployment documentation should be updated regularly to reflect changes in the deployment process, infrastructure, and best practices.
