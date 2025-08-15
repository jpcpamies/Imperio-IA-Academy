import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Calendar, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6B7BFF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mi Perfil
          </h1>
          <p className="text-xl text-gray-600">
            Tu información personal y configuración de cuenta
          </p>
        </div>

        <div className="grid gap-6">
          {/* User Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Información Personal</CardTitle>
              <CardDescription>
                Tu información básica de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nombre completo</label>
                  <div className="mt-1 flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900 font-medium">{user.name}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <div className="mt-1 flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900 font-medium">{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Rol</label>
                  <div className="mt-1 flex items-center">
                    <Shield className="h-4 w-4 text-gray-400 mr-2" />
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Miembro desde</label>
                  <div className="mt-1 flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900 font-medium">
                      {formatDate('2024-01-15')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Estadísticas de Cuenta</CardTitle>
              <CardDescription>
                Tu actividad en AI Academia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6B7BFF] mb-2">2</div>
                  <div className="text-sm text-gray-600">Programas Inscritos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6B7BFF] mb-2">8</div>
                  <div className="text-sm text-gray-600">Módulos Completados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6B7BFF] mb-2">12h</div>
                  <div className="text-sm text-gray-600">Tiempo de Aprendizaje</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
