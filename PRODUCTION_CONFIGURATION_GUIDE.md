# PRODUCTION CONFIGURATION GUIDE

## ENVIRONMENT VARIABLES SETUP

### Required Production Environment Variables

```bash
# JWT Configuration
JWT_SECRET=<generate-with-command-below>
JWT_EXPIRATION=7d
JWT_ISSUER=ai-academia
JWT_AUDIENCE=ai-academia-users

# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
DATABASE_POOL_SIZE=20
DATABASE_TIMEOUT=30000

# Email Service Configuration
EMAIL_SERVICE_PROVIDER=sendgrid  # or ses, mailgun, etc.
EMAIL_API_KEY=<your-email-service-api-key>
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
EMAIL_FROM_NAME="AI Academia"
EMAIL_REPLY_TO=support@yourdomain.com

# CORS and Security
CORS_ORIGIN=https://yourdomain.com
API_BASE_URL=https://api.yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
REDIS_URL=redis://localhost:6379  # Optional for distributed rate limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_ATTEMPTS=5

# Security Configuration
BCRYPT_ROUNDS=12
SESSION_TIMEOUT=86400000  # 24 hours in milliseconds
COOKIE_SECURE=true
COOKIE_SAME_SITE=strict

# Monitoring
HEALTH_CHECK_INTERVAL=30000  # 30 seconds
LOG_LEVEL=info
ENABLE_SECURITY_LOGGING=true

# Application
NODE_ENV=production
PORT=3000
```

### Generate Secure JWT Secret

```bash
# Generate a cryptographically secure 256-bit JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Alternative using OpenSSL
openssl rand -hex 32
```

## EMAIL SERVICE CONFIGURATION

### 1. SendGrid Configuration (Recommended)

```bash
EMAIL_SERVICE_PROVIDER=sendgrid
EMAIL_API_KEY=SG.your-sendgrid-api-key
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
```

### 2. AWS SES Configuration

```bash
EMAIL_SERVICE_PROVIDER=ses
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
```

### 3. SMTP Configuration (Generic)

```bash
EMAIL_SERVICE_PROVIDER=smtp
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

## MONITORING AND ALERTING SETUP

### Health Check Monitoring

```bash
# Add to your monitoring service (e.g., Datadog, New Relic)
curl -f https://api.yourdomain.com/auth/health || exit 1
```

### Security Event Monitoring

Set up alerts for:
- Failed login attempts > 10 per minute
- Rate limit violations
- Database connection failures
- JWT token validation failures
- Password reset requests > 5 per hour per IP

## SECURITY HARDENING CHECKLIST

### SSL/TLS Configuration
- [ ] SSL certificate installed and valid
- [ ] HTTPS redirect configured
- [ ] HSTS headers enabled
- [ ] Secure cookie flags set

### Security Headers
- [ ] Content Security Policy (CSP)
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] X-XSS-Protection
- [ ] Referrer-Policy

### Database Security
- [ ] Database user has minimal required permissions
- [ ] SSL connection to database enabled
- [ ] Database firewall configured
- [ ] Regular security updates applied

## DEPLOYMENT VALIDATION

### Pre-Deployment Checklist
- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] SSL certificates valid
- [ ] Email service tested
- [ ] Rate limiting configured
- [ ] Monitoring alerts active

### Post-Deployment Validation
- [ ] Health check endpoint responding
- [ ] User registration working
- [ ] User login working
- [ ] Password reset working
- [ ] Rate limiting functioning
- [ ] Security logging active

### Production Testing Scenarios

```bash
# Test user registration
curl -X POST https://api.yourdomain.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123"}'

# Test user login
curl -X POST https://api.yourdomain.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123"}'

# Test password reset request
curl -X POST https://api.yourdomain.com/auth/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test health check
curl https://api.yourdomain.com/auth/health

# Test rate limiting
for i in {1..10}; do
  curl -X POST https://api.yourdomain.com/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"wrong@example.com","password":"wrong"}'
done
```

## ROLLBACK PROCEDURES

### Database Rollback
```bash
# Backup current database
pg_dump -h hostname -U username -d database > backup_before_rollback.sql

# Restore previous version
psql -h hostname -U username -d database < backup_previous_version.sql
```

### Application Rollback
```bash
# Using Docker
docker pull yourdomain/app:previous-version
docker stop current-container
docker run -d --name new-container yourdomain/app:previous-version

# Using PM2
pm2 stop app
pm2 delete app
pm2 start previous-version/app.js --name app
```

## PERFORMANCE OPTIMIZATION

### Database Connection Pooling
```bash
DATABASE_POOL_SIZE=20
DATABASE_IDLE_TIMEOUT=30000
DATABASE_CONNECTION_TIMEOUT=5000
```

### Caching Configuration
```bash
# Redis for session storage and rate limiting
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600
```

### Load Balancer Configuration
```nginx
upstream api_backend {
    server api1.yourdomain.com:3000;
    server api2.yourdomain.com:3000;
    server api3.yourdomain.com:3000;
}

server {
    listen 443 ssl;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://api_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
