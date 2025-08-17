import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';
import backend from '~backend/client';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (!resetToken) {
      setError('No se proporcionó un token de restablecimiento.');
      setIsLoading(false);
      return;
    }
    setToken(resetToken);

    const validateToken = async () => {
      try {
        const response = await backend.auth.validateResetToken({ token: resetToken });
        if (response.valid) {
          setIsTokenValid(true);
        } else {
          setError('El enlace de restablecimiento es inválido o ha expirado. Por favor, solicita uno nuevo.');
        }
      } catch (err) {
        setError('Ocurrió un error al validar el enlace. Por favor, intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!token) {
      setError('Token no encontrado.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const response = await backend.auth.resetPassword({ token, newPassword: password });
      setSuccess(response.message);
      setTimeout(() => navigate('/'), 5000);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al restablecer la contraseña.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Validando enlace...</p>;
    }

    if (success) {
      return (
        <Alert variant="default" className="border-green-500 text-green-700">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>¡Éxito!</AlertTitle>
          <AlertDescription>{success} Serás redirigido a la página principal.</AlertDescription>
        </Alert>
      );
    }

    if (!isTokenValid || error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-password">Nueva Contraseña</Label>
            <Input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="••••••••"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="••••••••"
            />
          </div>
        </div>
        <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
          {isSubmitting ? 'Restableciendo...' : 'Restablecer Contraseña'}
        </Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Restablecer tu Contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}
