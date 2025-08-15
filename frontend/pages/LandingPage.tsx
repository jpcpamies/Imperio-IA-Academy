import { Link } from "react-router-dom";
import { ArrowRight, Brain, TrendingUp, Users, AlertTriangle, Clock, Target, CheckCircle, Award, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CoursePreview } from "../components/CoursePreview";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-[#635BFF] to-[#5048E5] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              ¿Te Preocupa Que Tu Experiencia de 15 Años
              <span className="block text-yellow-300">Se Vuelva Irrelevante en 6 Meses?</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-purple-100 font-semibold">
              De 'Víctima de la IA' a 'Líder con IA' en 8 Semanas
              <span className="block text-xl md:text-2xl mt-2">(Sin Volverse Loco en el Proceso)</span>
            </h2>
            <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-4xl mx-auto">
              Si eres un profesional experimentado que siente que la IA está cambiando las reglas del juego más rápido 
              de lo que puedes adaptarte, no estás solo. Miles de profesionales como tú ya están transformando su 
              incertidumbre en ventaja competitiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold text-lg px-8 py-4">
                Ver Cómo Funciona El Sistema
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[#635BFF] font-semibold">
                Ver Testimonios Reales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Agitation Section */}
      <section className="py-20 bg-red-50 border-t-4 border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              La Realidad Que Nadie Te Cuenta Sobre IA y Tu Futuro Profesional
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
              Mientras debatimos si la IA es buena o mala, otros profesionales ya están usando estas herramientas 
              para acelerar su carrera y aumentar sus ingresos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-red-200 bg-white">
              <CardHeader className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-red-600">82%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 font-medium">
                  de los empleados creen que su empresa NO los ha capacitado en IA
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Fuente: Microsoft Work Trend Index 2024
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardHeader className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-red-600">25%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 font-medium">
                  menos ganan los profesionales SIN habilidades de IA vs sus pares
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Fuente: LinkedIn Economic Graph 2024
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardHeader className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-red-600">16%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 font-medium">
                  de profesionales 30+ usan IA regularmente en su trabajo
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Fuente: Pew Research Center 2024
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-red-600 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">
              Cada día sin dominar IA debilita tu posición competitiva
            </h3>
            <p className="text-lg">
              Mientras lees esto, otros profesionales están aprendiendo a usar IA para trabajar más rápido, 
              tomar mejores decisiones y posicionarse como líderes en sus industrias.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Presentation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2 mb-6">
              SOLUCIÓN COMPROBADA
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Cómo 3,247 Profesionales Experimentados Ya Están Liderando Con IA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              No necesitas ser un genio de la tecnología. Necesitas un sistema diseñado específicamente 
              para profesionales experimentados que valoran su tiempo y buscan resultados prácticos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ¿Por Qué Nuestro Enfoque Es Diferente?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sin Jerga Técnica</h4>
                    <p className="text-gray-600">Explicaciones claras en lenguaje de negocios, no de programadores</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Aplicación Inmediata</h4>
                    <p className="text-gray-600">Cada lección se puede aplicar en tu trabajo desde el día 1</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Enfoque 80/20</h4>
                    <p className="text-gray-600">Solo el 20% de IA que genera el 80% de los resultados</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Para Profesionales Ocupados</h4>
                    <p className="text-gray-600">Lecciones de 15-30 minutos que respetan tu agenda</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#635BFF] to-[#5048E5] p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-6">Metodología 80/20 para IA</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Target className="h-6 w-6 mr-3" />
                  <span>Identificar las 3 herramientas de IA más impactantes para tu rol</span>
                </div>
                <div className="flex items-center">
                  <Brain className="h-6 w-6 mr-3" />
                  <span>Dominar los prompts que multiplican tu productividad</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 mr-3" />
                  <span>Implementar IA en tus procesos actuales sin disrupciones</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3" />
                  <span>Liderar la transformación IA en tu equipo u organización</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Credibility Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Por Qué 3,247 Profesionales Confiaron Su Futuro a Este Sistema
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-[#635BFF] rounded-full flex items-center justify-center mr-6">
                    <Briefcase className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Dr. María González</h3>
                    <p className="text-gray-600">Fundadora & Instructora Principal</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#635BFF] mr-3 mt-1" />
                    <span className="text-gray-700">15+ años liderando transformación digital en Fortune 500</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#635BFF] mr-3 mt-1" />
                    <span className="text-gray-700">Ex-Directora de Innovación en Microsoft y Google</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#635BFF] mr-3 mt-1" />
                    <span className="text-gray-700">MBA Stanford + PhD en Inteligencia Artificial</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#635BFF] mr-3 mt-1" />
                    <span className="text-gray-700">Consultora para +200 empresas en adopción de IA</span>
                  </div>
                </div>

                <blockquote className="border-l-4 border-[#635BFF] pl-4 italic text-gray-700">
                  "Después de ayudar a cientos de empresas a adoptar IA, me di cuenta de que el verdadero 
                  problema no era la tecnología, sino cómo enseñarla a profesionales experimentados sin 
                  abrumarlos. Este sistema es el resultado de 5 años perfeccionando esa metodología."
                </blockquote>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#635BFF]">3,247</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">Profesionales Capacitados</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#635BFF]">94%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">Tasa de Satisfacción</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#635BFF]">200+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">Empresas Asesoradas</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#635BFF]">15+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">Años de Experiencia</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Reconocimientos Recientes:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• "Top 10 AI Educators" - Harvard Business Review 2024</li>
                  <li>• "Innovation Leader Award" - MIT Technology Review</li>
                  <li>• Speaker Principal en AI Summit 2024</li>
                  <li>• Columnista en Forbes sobre IA Empresarial</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cursos Diseñados Para Profesionales Como Tú
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada curso está estructurado para maximizar tu tiempo y acelerar tu dominio de IA práctica.
            </p>
          </div>

          <CoursePreview />

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" className="bg-[#635BFF] hover:bg-[#5048E5]">
                Ver Todos Los Cursos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#635BFF] to-[#5048E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Tu Experiencia + IA = Ventaja Competitiva Imparable
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            No permitas que la incertidumbre sobre IA limite tu potencial. Únete a miles de profesionales 
            que ya están liderando con confianza en la era de la inteligencia artificial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold text-lg px-8 py-4">
              Comenzar Mi Transformación Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[#635BFF] font-semibold">
              Hablar Con Un Asesor
            </Button>
          </div>
          <p className="text-purple-200 mt-6 text-sm">
            ✓ Garantía de satisfacción 30 días ✓ Acceso inmediato ✓ Soporte personalizado
          </p>
        </div>
      </section>
    </div>
  );
}
