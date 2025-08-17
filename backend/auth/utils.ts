// Utility functions for authentication to ensure consistency

/**
 * Sanitize and normalize email consistently across the application
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }
  
  // Remove all types of whitespace and invisible characters
  const cleaned = email
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
    .replace(/\s+/g, '') // Remove all whitespace
    .toLowerCase();
  
  return cleaned;
}

/**
 * Sanitize password consistently - CRITICAL for auth consistency
 * This function MUST be used everywhere passwords are processed
 */
export function sanitizePassword(password: string): string {
  if (!password || typeof password !== 'string') {
    return '';
  }
  
  // Only trim leading/trailing whitespace, preserve internal spaces
  // This is CRITICAL - any change here affects auth compatibility
  return password.trim();
}

/**
 * Sanitize name for registration
 */
export function sanitizeName(name: string): string {
  if (!name || typeof name !== 'string') {
    return '';
  }
  
  // Remove invisible characters but preserve normal spaces
  return name
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
    .replace(/\s+/g, ' '); // Normalize multiple spaces to single space
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: "Password is required" };
  }

  // Use consistent sanitization
  const sanitizedPassword = sanitizePassword(password);

  if (sanitizedPassword.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" };
  }

  if (sanitizedPassword.length > 128) {
    return { isValid: false, message: "Password must be less than 128 characters long" };
  }

  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(sanitizedPassword);
  const hasNumber = /[0-9]/.test(sanitizedPassword);

  if (!hasLetter || !hasNumber) {
    return { isValid: false, message: "Password must contain at least one letter and one number" };
  }

  return { isValid: true };
}