import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "../contexts/AuthContext";
import { AuthGuard } from "../components/AuthGuard";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Clear any existing sessions on component mount
  useEffect(() => {
    // Clear any stale authentication data
    localStorage.removeItem("auth_token");
  }, []);

  // Helper function to sanitize and normalize email
  const sanitizeEmail = (email: string): string => {
    if (!email || typeof email !== 'string') {
      return '';
    }
    
    // Remove all types of whitespace and invisible characters
    return email
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
      .replace(/\s+/g, '') // Remove all whitespace
      .toLowerCase();
  };

  // Helper function to sanitize name
  const sanitizeName = (name: string): string => {
    if (!name || typeof name !== 'string') {
      return '';
    }
    
    // Remove invisible characters but preserve normal spaces
    return name
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
      .replace(/\s+/g, ' '); // Normalize multiple spaces to single space
  };

  // Helper function to sanitize password
  const sanitizePassword = (password: string): string => {
    if (!password || typeof password !== 'string') {
      return '';
    }
    
    // Only trim leading/trailing whitespace, preserve internal spaces
    return password.trim();
  };

  // Helper function to validate email format
  const isValidEmail = (email: string): boolean => {
    if (!email || typeof email !== 'string') {
      return false;
    }
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  // Helper function to validate password strength
  const validatePasswordStrength = (password: string): { isValid: boolean; message?: string } => {
    if (!password || typeof password !== 'string') {
      return { isValid: false, message: "Password is required" };
    }

    const trimmedPassword = password.trim();

    if (trimmedPassword.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long" };
    }

    if (trimmedPassword.length > 128) {
      return { isValid: false, message: "Password must be less than 128 characters long" };
    }

    // Check for at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(trimmedPassword);
    const hasNumber = /[0-9]/.test(trimmedPassword);

    if (!hasLetter || !hasNumber) {
      return { isValid: false, message: "Password must contain at least one letter and one number" };
    }

    return { isValid: true };
  };

  // Real-time validation
  const validateField = (name: string, value: string) => {
    const newValidationErrors = { ...validationErrors };

    if (name === 'name') {
      const sanitizedName = sanitizeName(value);
      if (!sanitizedName) {
        newValidationErrors.name = "Name is required";
      } else if (sanitizedName.length < 2) {
        newValidationErrors.name = "Name must be at least 2 characters long";
      } else if (sanitizedName.length > 100) {
        newValidationErrors.name = "Name must be less than 100 characters long";
      } else {
        newValidationErrors.name = "";
      }
    }

    if (name === 'email') {
      const sanitizedEmail = sanitizeEmail(value);
      if (!sanitizedEmail) {
        newValidationErrors.email = "Email is required";
      } else if (!isValidEmail(sanitizedEmail)) {
        newValidationErrors.email = "Please enter a valid email address";
      } else {
        newValidationErrors.email = "";
      }
    }

    if (name === 'password') {
      const passwordValidation = validatePasswordStrength(value);
      if (!passwordValidation.isValid) {
        newValidationErrors.password = passwordValidation.message || "Invalid password";
      } else {
        newValidationErrors.password = "";
      }

      // Also validate confirm password if it has a value
      if (formData.confirmPassword) {
        const sanitizedPassword = sanitizePassword(value);
        const sanitizedConfirmPassword = sanitizePassword(formData.confirmPassword);
        if (sanitizedPassword !== sanitizedConfirmPassword) {
          newValidationErrors.confirmPassword = "Passwords do not match";
        } else {
          newValidationErrors.confirmPassword = "";
        }
      }
    }

    if (name === 'confirmPassword') {
      const sanitizedPassword = sanitizePassword(formData.password);
      const sanitizedConfirmPassword = sanitizePassword(value);
      if (!sanitizedConfirmPassword) {
        newValidationErrors.confirmPassword = "Please confirm your password";
      } else if (sanitizedPassword !== sanitizedConfirmPassword) {
        newValidationErrors.confirmPassword = "Passwords do not match";
      } else {
        newValidationErrors.confirmPassword = "";
      }
    }

    setValidationErrors(newValidationErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear any existing errors when user starts typing
    if (error) {
      setError("");
    }
    if (success) {
      setSuccess("");
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validate field in real-time
    validateField(name, value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Handle paste events to clean up potential invisible characters
    const pastedText = e.clipboardData.getData('text');
    const { name } = e.target as HTMLInputElement;
    
    let cleanedValue = pastedText;
    
    if (name === 'email') {
      cleanedValue = sanitizeEmail(pastedText);
    } else if (name === 'name') {
      cleanedValue = sanitizeName(pastedText);
    } else if (name === 'password' || name === 'confirmPassword') {
      cleanedValue = sanitizePassword(pastedText);
    }
    
    setFormData(prev => ({ ...prev, [name]: cleanedValue }));
    validateField(name, cleanedValue);
    e.preventDefault();
  };

  const validateForm = (): boolean => {
    const sanitizedName = sanitizeName(formData.name);
    const sanitizedEmail = sanitizeEmail(formData.email);
    const sanitizedPassword = sanitizePassword(formData.password);
    const sanitizedConfirmPassword = sanitizePassword(formData.confirmPassword);

    const newValidationErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    // Validate name
    if (!sanitizedName) {
      newValidationErrors.name = "Name is required";
      isValid = false;
    } else if (sanitizedName.length < 2) {
      newValidationErrors.name = "Name must be at least 2 characters long";
      isValid = false;
    } else if (sanitizedName.length > 100) {
      newValidationErrors.name = "Name must be less than 100 characters long";
      isValid = false;
    }

    // Validate email
    if (!sanitizedEmail) {
      newValidationErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(sanitizedEmail)) {
      newValidationErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate password
    const passwordValidation = validatePasswordStrength(formData.password);
    if (!passwordValidation.isValid) {
      newValidationErrors.password = passwordValidation.message || "Invalid password";
      isValid = false;
    }

    // Validate confirm password
    if (!sanitizedConfirmPassword) {
      newValidationErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (sanitizedPassword !== sanitizedConfirmPassword) {
      newValidationErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (loading) {
      return;
    }

    setError("");
    setSuccess("");

    if (!validateForm()) {
      // Focus on the first field with an error
      if (validationErrors.name) {
        nameRef.current?.focus();
      } else if (validationErrors.email) {
        emailRef.current?.focus();
      } else if (validationErrors.password) {
        passwordRef.current?.focus();
      } else if (validationErrors.confirmPassword) {
        confirmPasswordRef.current?.focus();
      }
      return;
    }

    setLoading(true);

    try {
      const sanitizedName = sanitizeName(formData.name);
      const sanitizedEmail = sanitizeEmail(formData.email);
      const sanitizedPassword = sanitizePassword(formData.password);

      console.log("Attempting registration with sanitized data");
      
      await register(sanitizedName, sanitizedEmail, sanitizedPassword);
      
      setSuccess("Account created successfully! Redirecting...");
      
      setTimeout(() => {
        navigate("/academy/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Provide user-friendly error messages
      if (error?.message) {
        if (error.message.includes("already exists")) {
          setError("An account with this email already exists. Please use a different email or try logging in.");
        } else if (error.message.includes("temporarily unavailable")) {
          setError("Our registration service is temporarily unavailable. Please try again in a few moments.");
        } else if (error.message.includes("valid email")) {
          setError("Please enter a valid email address.");
          emailRef.current?.focus();
        } else if (error.message.includes("password")) {
          setError(error.message);
          passwordRef.current?.focus();
        } else {
          setError(error.message);
        }
      } else {
        setError("Registration failed. Please check your internet connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Keyboard navigation improvements
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e as any);
    }
  };

  const hasValidationErrors = Object.values(validationErrors).some(error => error !== "");

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">AI Academia</span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Join AI Academia</CardTitle>
              <CardDescription className="text-center">
                Start your AI learning journey today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    ref={nameRef}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    className={`mt-1 ${validationErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your full name"
                    disabled={loading}
                    spellCheck={false}
                    autoCapitalize="words"
                    autoCorrect="off"
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationErrors.name}
                    </p>
                  )}
                  {!validationErrors.name && formData.name && sanitizeName(formData.name).length >= 2 && (
                    <p className="mt-1 text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Valid name
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    className={`mt-1 ${validationErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your email"
                    disabled={loading}
                    spellCheck={false}
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationErrors.email}
                    </p>
                  )}
                  {!validationErrors.email && formData.email && isValidEmail(sanitizeEmail(formData.email)) && (
                    <p className="mt-1 text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Valid email format
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      onPaste={handlePaste}
                      onKeyDown={handleKeyDown}
                      placeholder="Create a password (min. 8 characters)"
                      className={`pr-10 ${validationErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      disabled={loading}
                      spellCheck={false}
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationErrors.password}
                    </p>
                  )}
                  {!validationErrors.password && formData.password && validatePasswordStrength(formData.password).isValid && (
                    <p className="mt-1 text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Strong password
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative mt-1">
                    <Input
                      ref={confirmPasswordRef}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onPaste={handlePaste}
                      onKeyDown={handleKeyDown}
                      placeholder="Confirm your password"
                      className={`pr-10 ${validationErrors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      disabled={loading}
                      spellCheck={false}
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                  {!validationErrors.confirmPassword && formData.confirmPassword && 
                   sanitizePassword(formData.password) === sanitizePassword(formData.confirmPassword) && 
                   formData.confirmPassword.length > 0 && (
                    <p className="mt-1 text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Passwords match
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || hasValidationErrors || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link to="/login">
                    <Button variant="outline" className="w-full" disabled={loading}>
                      Sign in instead
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
