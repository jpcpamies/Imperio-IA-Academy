import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, TrendingUp, Users, AlertTriangle, Clock, Target, CheckCircle, Award, Briefcase, Star, Quote, X, BookOpen, Shield, Zap, Crown, HelpCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoModal } from "../components/VideoModal";

export function LandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#635BFF] via-[#7C3AED] to-[#EC4899] text-white py-32">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          
          {/* Geometric shapes */}
          <svg className="absolute top-20 left-1/4 w-32 h-32 text-white/10" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-40 right-1/4 w-24 h-24 text-white/5" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
          
          {/* Flowing lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <path d="M0,400 Q300,200 600,400 T1200,400" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
              <path d="M0,500 Q400,300 800,500 T1200,500" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
              ¿Te Preocupa Que Tu Experiencia de 15 Años
              <span className="block text-yellow-300 mt-4">Se Vuelva Irrelevante en 6 Meses?</span>
            </h1>
            <h2 className="text-2xl md:text-4xl mb-8 text-purple-100 font-semibold leading-relaxed">
              De 'Víctima de la IA' a 'Líder con IA' en 8 Semanas
              <span className="block text-xl md:text-2xl mt-3 font-normal opacity-90">(Sin Volverse Loco en el Proceso)</span>
            </h2>
            <p className="text-lg md:text-xl mb-12 text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Si eres un profesional experimentado que siente que la IA está cambiando las reglas del juego más rápido 
              de lo que puedes adaptarte, no estás solo. Miles de profesionales como tú ya están transformando su 
              incertidumbre en ventaja competitiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold text-lg px-10 py-6 rounded-xl shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105"
                onClick={openVideoModal}
              >
                <Play className="mr-3 h-6 w-6" />
                Ver Cómo Funciona El Sistema
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-[#635BFF] font-semibold px-10 py-6 rounded-xl transition-all duration-300"
              >
                Ver Testimonios Reales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Agitation Section */}
      <section className="py-24 bg-gradient-to-br from-red-50 to-orange-50 border-t-4 border-red-500 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ef4444 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #ef4444 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="bg-red-100 rounded-full p-6">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              La Realidad Que Nadie Te Cuenta Sobre IA y Tu Futuro Profesional
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-16 leading-relaxed">
              Mientras debatimos si la IA es buena o mala, otros profesionales ya están usando estas herramientas 
              para acelerar su carrera y aumentar sus ingresos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-red-600 mb-2">82%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 font-medium text-lg mb-4">
                  de los empleados creen que su empresa NO los ha capacitado en IA
                </p>
                <p className="text-sm text-gray-600">
                  Fuente: Microsoft Work Trend Index 2024
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-red-600 mb-2">25%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 font-medium text-lg mb-4">
                  menos ganan los profesionales SIN habilidades de IA vs sus pares
                </p>
                <p className="text-sm text-gray-600">
                  Fuente: LinkedIn Economic Graph 2024
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-4xl font-bold text-red-600 mb-2">16%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 font-medium text-lg mb-4">
                  de profesionales 30+ usan IA regularmente en su trabajo
                </p>
                <p className="text-sm text-gray-600">
                  Fuente: Pew Research Center 2024
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-12 rounded-2xl text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-6">
              Cada día sin dominar IA debilita tu posición competitiva
            </h3>
            <p className="text-xl leading-relaxed">
              Mientras lees esto, otros profesionales están aprendiendo a usar IA para trabajar más rápido, 
              tomar mejores decisiones y posicionarse como líderes en sus industrias.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Presentation */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-100 rounded-full blur-2xl opacity-40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-green-100 text-green-800 text-lg px-6 py-3 mb-8 rounded-full">
              SOLUCIÓN COMPROBADA
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Cómo 3,247 Profesionales Experimentados Ya Están Liderando Con IA
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed">
              No necesitas ser un genio de la tecnología. Necesitas un sistema diseñado específicamente 
              para profesionales experimentados que valoran su tiempo y buscan resultados prácticos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                ¿Por Qué Nuestro Enfoque Es Diferente?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Sin Jerga Técnica</h4>
                    <p className="text-gray-600 leading-relaxed">Explicaciones claras en lenguaje de negocios, no de programadores</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Aplicación Inmediata</h4>
                    <p className="text-gray-600 leading-relaxed">Cada lección se puede aplicar en tu trabajo desde el día 1</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Enfoque 80/20</h4>
                    <p className="text-gray-600 leading-relaxed">Solo el 20% de IA que genera el 80% de los resultados</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Para Profesionales Ocupados</h4>
                    <p className="text-gray-600 leading-relaxed">Lecciones de 15-30 minutos que respetan tu agenda</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#635BFF] to-[#5048E5] p-10 rounded-2xl text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-8">Metodología 80/20 para IA</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-lg">Identificar las 3 herramientas de IA más impactantes para tu rol</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-4">
                    <Brain className="h-6 w-6" />
                  </div>
                  <span className="text-lg">Dominar los prompts que multiplican tu productividad</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="text-lg">Implementar IA en tus procesos actuales sin disrupciones</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-lg">Liderar la transformación IA en tu equipo u organización</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Por Qué Somos Diferentes de Otras Academias IA
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              No todas las academias de IA son iguales. Nosotros entendemos las necesidades específicas 
              de profesionales experimentados que buscan resultados, no solo conocimiento.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                    <th className="border border-gray-300 px-8 py-6 text-left font-bold text-gray-900 text-xl">
                      Aspecto
                    </th>
                    <th className="border border-gray-300 px-8 py-6 text-center font-bold text-[#635BFF] text-xl">
                      Nuestra Academia
                    </th>
                    <th className="border border-gray-300 px-8 py-6 text-center font-bold text-gray-500 text-xl">
                      Otras Academias
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-6 font-semibold text-gray-900 text-lg">
                      <strong>Enfoque</strong>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Profesionales 30+ con experiencia</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Programadores jóvenes/audiencia general</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-6 font-semibold text-gray-900 text-lg">
                      <strong>Contenido</strong>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Casos reales que inspiran aplicación inmediata</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Teoría profunda, contenido obsoleto</p>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-6 font-semibold text-gray-900 text-lg">
                      <strong>Metodología</strong>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">80/20, aplicación inmediata</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Cursos técnicos complejos</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-6 font-semibold text-gray-900 text-lg">
                      <strong>Comunidad</strong>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Profesionales de tu nivel</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Edades mixtas, estudiantes</p>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-6 font-semibold text-gray-900 text-lg">
                      <strong>Soporte</strong>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Mentoría personalizada 1:1</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Foros genéricos sin contexto</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-6 font-semibold text-gray-900 text-lg">
                      <strong>Resultado</strong>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Pensamiento estratégico + liderazgo</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Solo uso de herramientas</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#635BFF] to-[#5048E5] text-white p-10 rounded-2xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">
                La Diferencia Está en los Resultados
              </h3>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Mientras otras academias te enseñan herramientas, nosotros te enseñamos a liderar 
                la transformación IA en tu industria.
              </p>
              <Button 
                size="lg" 
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold px-10 py-6 rounded-xl"
                onClick={openVideoModal}
              >
                Ver Cómo Funciona Nuestro Sistema
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#635BFF] via-[#7C3AED] to-[#EC4899] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-white/5" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Tu Momento de Decisión: Liderar o Ser Liderado
          </h2>
          <p className="text-xl text-purple-100 mb-12 leading-relaxed">
            En 6 meses, habrá dos tipos de profesionales: los que dominan IA y los que fueron reemplazados por ella. 
            ¿De qué lado quieres estar?
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 mb-12">
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">30 días de garantía total</p>
                  <p className="text-sm text-purple-200">Si no ves valor, reembolso completo</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Solo 27 plazas restantes</p>
                  <p className="text-sm text-purple-200">Para la cohorte de Marzo 2025</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Zap className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Acceso inmediato</p>
                  <p className="text-sm text-purple-200">Empieza tu transformación hoy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold text-2xl px-16 py-8 rounded-2xl shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105">
              ASEGURAR MI PLAZA AHORA
              <ArrowRight className="ml-4 h-8 w-8" />
            </Button>
            <p className="text-purple-200 text-lg">
              ✓ Acceso inmediato a todos los módulos ✓ Garantía 30 días ✓ Soporte personalizado
            </p>
          </div>

          <div className="mt-16 text-center">
            <p className="text-purple-200 text-xl italic leading-relaxed">
              "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora."
            </p>
            <p className="text-purple-300 mt-4 text-lg">
              - Proverbio chino (aplicado a tu carrera con IA)
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={closeVideoModal} 
        videoId="1VdpHMKVZvA" 
      />
    </div>
  );
}
