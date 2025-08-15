import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../hooks/useAuth";
import backend from "~backend/client";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleDebugCheck = async () => {
    if (!email) {
      toast({
        title: "Debug Mode",
        description: "Ingresa un email para verificar el estado del usuario.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await backend.auth.debugLogin({ email });
      setDebugInfo(response);
      console.log("🐛 Debug Info:", response);
      
      if (response.userExists) {
        toast({
          title: "Debug: Usuario encontrado",
          description: `Rol: ${response.userInfo?.role}, Tiene contraseña: ${response.userInfo?.hasPassword ? 'Sí' : 'No'}`,
        });
      } else {
        toast({
          title: "Debug: Usuario no encontrado",
          description: "Este email no está registrado en el sistema.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Debug check failed:", error);
      toast({
        title: "Error de debug",
        description: "No se pudo verificar el estado del usuario.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión exitosamente.",
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login failed:", error);
      
      let errorMessage = "Error de conexión. Por favor, intenta de nuevo.";
      
      if (error?.message) {
        if (error.message.includes("Email o contraseña incorrectos")) {
          errorMessage = "Email o contraseña incorrectos. Verifica tus credenciales.";
        } else if (error.message.includes("Usuario no encontrado")) {
          errorMessage = "Usuario no encontrado. ¿Necesitas crear una cuenta?";
        } else if (error.message.includes("Usuario no tiene contraseña")) {
          errorMessage = "Tu cuenta necesita una contraseña. Usa 'Olvidé mi contraseña' para configurar una.";
        }
      }
      
      setError(errorMessage);
      toast({
        title: "Error de autenticación",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-8">
            <BookOpen className="h-12 w-12 text-[#6B7BFF] mr-3" />
            <span className="text-3xl font-bold text-gray-900">AI Academia</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Acceso Ejecutivo
          </h2>
          <p className="text-gray-600">
            Ingresa a tu portal de transformación profesional
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Continúa tu desarrollo en liderazgo con IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email corporativo</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="tu.email@empresa.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Tu contraseña segura"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link 
                  to="/reset-password" 
                  className="text-sm text-[#6B7BFF] hover:text-[#5A6AEF] font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Acceder al Portal"}
              </Button>
            </form>

            {/* Debug Mode Toggle */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Modo Debug (Desarrollo)</span>
                <button
                  type="button"
                  onClick={() => setDebugMode(!debugMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    debugMode ? 'bg-[#6B7BFF]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      debugMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {debugMode && (
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDebugCheck}
                    className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Verificar Estado del Usuario
                  </Button>
                  
                  {debugInfo && (
                    <div className="bg-gray-50 p-3 rounded text-xs">
                      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿No tienes acceso ejecutivo?{" "}
                <Link to="/register" className="text-[#6B7BFF] hover:text-[#5A6AEF] font-medium">
                  Solicitar acceso
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
                ← Volver al inicio
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
