# PRODUCTION DEPLOYMENT GUIDE

## ENVIRONMENT SETUP

### Required Environment Variables

```bash
# JWT Configuration
JWT_SECRET=<generate-strong-256-bit-secret>

# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com

# Email Service (when implemented)
EMAIL_SERVICE_API_KEY=<your-email-service-key>
EMAIL_FROM_ADDRESS=noreply@yourdomain.com

# Rate Limiting (optional - for Redis)
REDIS_URL=redis://localhost:6379
```

### Generate JWT Secret

```bash
# Generate a secure 256-bit secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## DATABASE SETUP

### 1. Create Production Database

```sql
-- Create database
CREATE DATABASE ai_academia_prod;

-- Create user with limited privileges
CREATE USER ai_academia_user WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE ai_academia_prod TO ai_academia_user;
GRANT USAGE ON SCHEMA public TO ai_academia_user;
GRANT CREATE ON SCHEMA public TO ai_academia_user;
```

### 2. Run Migrations

```bash
# Ensure migrations are applied in order
# 1_create_users_table.up.sql
# 2_create_security_logs.up.sql
```

### 3. Verify Database Setup

```sql
-- Check tables exist
\dt

-- Verify indexes
\di

-- Check constraints
\d users
\d security_logs
```

## SECURITY CONFIGURATION

### 1. SSL/HTTPS Setup

- Ensure SSL certificates are properly configured
- Force HTTPS redirects
- Set secure cookie flags

### 2. CORS Configuration

```typescript
// Configure CORS for production domain
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 3. Rate Limiting

- Configure Redis for distributed rate limiting
- Set appropriate limits for production traffic
- Monitor rate limit violations

## MONITORING SETUP

### 1. Health Checks

```bash
# Test health endpoint
curl https://yourdomain.com/auth/health
```

### 2. Security Monitoring

- Set up alerts for failed login attempts
- Monitor rate limit violations
- Track unusual authentication patterns

### 3. Performance Monitoring

- Database query performance
- Authentication response times
- Token generation/validation metrics

## DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] CORS configured for production domain
- [ ] Rate limiting configured
- [ ] Monitoring and alerting set up

### Post-Deployment

- [ ] Health check endpoint responding
- [ ] User registration working
- [ ] User login working
- [ ] Token validation working
- [ ] Rate limiting functioning
- [ ] Security logging active

### Testing in Production

```bash
# Test user registration
curl -X POST https://yourdomain.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123"}'

# Test user login
curl -X POST https://yourdomain.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123"}'

# Test token validation
curl -X POST https://yourdomain.com/auth/verify-token \
  -H "Content-Type: application/json" \
  -d '{"token":"your-jwt-token"}'
```

## BACKUP AND RECOVERY

### Database Backups

```bash
# Daily backup script
pg_dump -h hostname -U username -d ai_academia_prod > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -h hostname -U username -d ai_academia_prod < backup_20240101.sql
```

### Security Logs Retention

```sql
-- Archive old security logs (keep 1 year)
DELETE FROM security_logs WHERE created_at < NOW() - INTERVAL '1 year';
```

## PERFORMANCE OPTIMIZATION

### Database Optimization

```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM users WHERE LOWER(email) = 'test@example.com';

-- Update table statistics
ANALYZE users;
ANALYZE security_logs;
```

### Connection Pooling

- Configure database connection pooling
- Set appropriate pool sizes for production load
- Monitor connection usage

## SECURITY BEST PRACTICES

### 1. Regular Security Audits

- Review security logs weekly
- Monitor for suspicious patterns
- Update dependencies regularly

### 2. Password Policy

- Enforce strong password requirements
- Consider implementing password history
- Regular password expiration reminders

### 3. Account Security

- Implement account lockout policies
- Monitor for brute force attacks
- Set up automated threat detection

## TROUBLESHOOTING

### Common Issues

1. **Database Connection Errors**
   - Check connection string
   - Verify SSL configuration
   - Check firewall rules

2. **JWT Token Issues**
   - Verify JWT secret is set
   - Check token expiration
   - Validate issuer/audience claims

3. **Rate Limiting Problems**
   - Check Redis connectivity
   - Verify rate limit configuration
   - Monitor rate limit metrics

### Debug Commands

```bash
# Check environment variables
env | grep -E "(JWT|DATABASE|CORS)"

# Test database connectivity
psql $DATABASE_URL -c "SELECT 1;"

# Check application logs
tail -f /var/log/app/auth.log
```

## MAINTENANCE

### Regular Tasks

- [ ] Weekly security log review
- [ ] Monthly dependency updates
- [ ] Quarterly security audit
- [ ] Annual penetration testing

### Monitoring Alerts

Set up alerts for:
- High number of failed login attempts
- Database connection failures
- Unusual authentication patterns
- Rate limit violations
- Health check failures

## SCALING CONSIDERATIONS

### Horizontal Scaling

- JWT tokens are stateless (good for scaling)
- Rate limiting may need Redis cluster
- Database read replicas for high load

### Performance Metrics

Monitor:
- Authentication requests per second
- Database query response times
- JWT token generation/validation times
- Memory and CPU usage
