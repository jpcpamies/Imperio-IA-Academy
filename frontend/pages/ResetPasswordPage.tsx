import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import backend from "~backend/client";

export function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await backend.auth.resetPassword({ email });
      
      if (response.success) {
        setSuccess(true);
        if (response.temporaryPassword) {
          setTemporaryPassword(response.temporaryPassword);
          console.log(`🔐 Temporary Password for ${email}: ${response.temporaryPassword}`);
        }
        
        toast({
          title: "Solicitud enviada",
          description: response.message,
        });
      }
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setError("Error al procesar la solicitud. Por favor, intenta de nuevo.");
      toast({
        title: "Error",
        description: "No se pudo procesar la solicitud de restablecimiento.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center mb-8">
              <BookOpen className="h-12 w-12 text-[#6B7BFF] mr-3" />
              <span className="text-3xl font-bold text-gray-900">AI Academia</span>
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Solicitud Enviada</CardTitle>
              <CardDescription>
                Revisa tu email para las instrucciones de restablecimiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Si el email <strong>{email}</strong> está registrado en nuestro sistema, 
                  recibirás instrucciones para restablecer tu contraseña.
                </p>
                
                {temporaryPassword && (
                  <Alert className="mb-6 border-blue-200 bg-blue-50">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Modo Desarrollo:</strong> Tu contraseña temporal es: <code className="bg-blue-100 px-2 py-1 rounded">{temporaryPassword}</code>
                      <br />
                      <small>Úsala para iniciar sesión y luego cámbiala desde tu perfil.</small>
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleBackToLogin}
                  className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white"
                >
                  Volver al Inicio de Sesión
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    ¿No recibiste el email?{" "}
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setTemporaryPassword("");
                        setEmail("");
                      }}
                      className="text-[#6B7BFF] hover:text-[#5A6AEF] font-medium"
                    >
                      Intentar de nuevo
                    </button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-8">
            <BookOpen className="h-12 w-12 text-[#6B7BFF] mr-3" />
            <span className="text-3xl font-bold text-gray-900">AI Academia</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Restablecer Contraseña
          </h2>
          <p className="text-gray-600">
            Ingresa tu email para recibir instrucciones de restablecimiento
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">¿Olvidaste tu contraseña?</CardTitle>
            <CardDescription className="text-center">
              Te enviaremos instrucciones para crear una nueva contraseña
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
                <div className="relative mt-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu.email@empresa.com"
                    className="pl-10"
                  />
                  <Mail className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Instrucciones"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿Recordaste tu contraseña?{" "}
                <Link to="/login" className="text-[#6B7BFF] hover:text-[#5A6AEF] font-medium">
                  Iniciar sesión
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
