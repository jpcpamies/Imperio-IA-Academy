import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, BookOpen, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "../contexts/AuthContext";
import { AuthGuard } from "../components/AuthGuard";

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || "/academy/dashboard";

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

  // Real-time validation
  const validateField = (name: string, value: string) => {
    const newValidationErrors = { ...validationErrors };

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
      const sanitizedPassword = sanitizePassword(value);
      if (!sanitizedPassword) {
        newValidationErrors.password = "Password is required";
      } else if (sanitizedPassword.length < 1) {
        newValidationErrors.password = "Password cannot be empty";
      } else {
        newValidationErrors.password = "";
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
    
    if (name === 'email') {
      const cleanedEmail = sanitizeEmail(pastedText);
      setFormData(prev => ({ ...prev, email: cleanedEmail }));
      validateField('email', cleanedEmail);
      e.preventDefault();
    } else if (name === 'password') {
      const cleanedPassword = sanitizePassword(pastedText);
      setFormData(prev => ({ ...prev, password: cleanedPassword }));
      validateField('password', cleanedPassword);
      e.preventDefault();
    }
  };

  const validateForm = (): boolean => {
    const sanitizedEmail = sanitizeEmail(formData.email);
    const sanitizedPassword = sanitizePassword(formData.password);

    const newValidationErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    // Validate email
    if (!sanitizedEmail) {
      newValidationErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(sanitizedEmail)) {
      newValidationErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate password
    if (!sanitizedPassword) {
      newValidationErrors.password = "Password is required";
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

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const sanitizedEmail = sanitizeEmail(formData.email);
      const sanitizedPassword = sanitizePassword(formData.password);

      console.log("Attempting login with sanitized email:", sanitizedEmail);
      
      await login(sanitizedEmail, sanitizedPassword);
      
      console.log("Login successful, navigating to:", from);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Provide user-friendly error messages
      if (error?.message) {
        if (error.message.includes("Invalid email or password")) {
          setError("The email or password you entered is incorrect. Please check your credentials and try again.");
        } else if (error.message.includes("verify your email")) {
          setError("Please verify your email address before logging in. Check your inbox for a verification link.");
        } else if (error.message.includes("temporarily unavailable")) {
          setError("Our authentication service is temporarily unavailable. Please try again in a few moments.");
        } else {
          setError(error.message);
        }
      } else {
        setError("Login failed. Please check your internet connection and try again.");
      }

      // Focus on the first field with an error
      if (validationErrors.email) {
        emailRef.current?.focus();
      } else if (validationErrors.password) {
        passwordRef.current?.focus();
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      onPaste={handlePaste}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your password"
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !!validationErrors.email || !!validationErrors.password}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">New to AI Academia?</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link to="/register">
                    <Button variant="outline" className="w-full" disabled={loading}>
                      Create an account
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
