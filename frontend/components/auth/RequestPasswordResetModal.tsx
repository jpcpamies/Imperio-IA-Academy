import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import backend from '~backend/client';

interface RequestPasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RequestPasswordResetModal({ isOpen, onClose, onSwitchToLogin }: RequestPasswordResetModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await backend.auth.requestPasswordReset({ email });
      setIsSuccess(true);
      toast({
        title: "Solicitud Enviada",
        description: response.message,
      });
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err: any) {
      console.error("Password reset request failed:", err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Restablecer Contraseña</h2>
        
        {isSuccess ? (
          <Alert variant="default" className="mb-4 border-green-500 text-green-700">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Solicitud Enviada</AlertTitle>
            <AlertDescription>
              Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-gray-600 mb-4">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Enlace de Restablecimiento'}
              </Button>
            </form>
          </>
        )}
        
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Recordaste tu contraseña?{' '}
          <button onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:underline">
            Iniciar Sesión
          </button>
        </p>
      </div>
    </div>
  );
}
