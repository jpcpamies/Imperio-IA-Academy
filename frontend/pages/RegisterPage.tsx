import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../hooks/useAuth";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada. Bienvenido a AI Academia.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      let errorMessage = "Error de conexión. Por favor, intenta de nuevo.";
      
      if (error?.message?.includes("already exists")) {
        errorMessage = "Este email ya está registrado. ¿Quieres iniciar sesión en su lugar?";
      }
      
      toast({
        title: "Error de registro",
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
            Solicitar Acceso Ejecutivo
          </h2>
          <p className="text-gray-600">
            Únete a la transformación profesional con IA
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center">
              Comienza tu desarrollo en liderazgo con IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Tu nombre profesional"
                />
              </div>

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
                    placeholder="Mínimo 6 caracteres"
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

              <Button
                type="submit"
                className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white"
                disabled={loading}
              >
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿Ya tienes acceso ejecutivo?{" "}
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
