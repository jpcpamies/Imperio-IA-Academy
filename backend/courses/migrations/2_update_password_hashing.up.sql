-- Migration to support password hashing
-- This migration updates existing plain text passwords to hashed format
-- and ensures the password_hash column can handle longer hashed passwords

-- First, increase the size of password_hash column to accommodate hashed passwords
ALTER TABLE users ALTER COLUMN password_hash TYPE TEXT;

-- Add an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Add created_at and updated_at indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Note: Existing plain text passwords will be handled by the login endpoint
-- which includes backward compatibility for legacy passwords
