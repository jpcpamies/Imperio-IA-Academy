import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, TrendingUp, Users, AlertTriangle, Clock, Target, CheckCircle, Award, Briefcase, Star, Quote, X, BookOpen, Shield, Zap, Crown, HelpCircle, Play, Lightbulb, Rocket, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CoursePreview } from "../components/CoursePreview";
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
      {/* Hero Section - Purple Gradient Style */}
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

      {/* Solution Introduction */}
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
              El ÚNICO sistema específicamente creado para profesionales experimentados que quieren dominar IA generativa 
              sin tecnoestrés ni curvas de aprendizaje imposibles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Metodología 80/20 para IA
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 mt-1">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Enfoque 80/20</h4>
                    <p className="text-gray-600 leading-relaxed">Domina el 80% de aplicaciones prácticas con el 20% del esfuerzo</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 mt-1">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Sin Código</h4>
                    <p className="text-gray-600 leading-relaxed">Cero experiencia técnica requerida, solo sentido común empresarial</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 mt-1">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Aplicación Inmediata</h4>
                    <p className="text-gray-600 leading-relaxed">Resultados desde el primer día, no teoría abstracta</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 mt-1">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Metodología de PRINCIPIOS</h4>
                    <p className="text-gray-600 leading-relaxed">Aprende fundamentos atemporales vs herramientas que caducan</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#635BFF] to-[#5048E5] p-10 rounded-2xl text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-8">Sistema de 8 Semanas</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-4">
                    <span className="text-white font-bold">1-2</span>
                  </div>
                  <span className="text-lg">Fundamentos sin jerga técnica</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-4">
                    <span className="text-white font-bold">3-4</span>
                  </div>
                  <span className="text-lg">Herramientas esenciales y prompts efectivos</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-4">
                    <span className="text-white font-bold">5-6</span>
                  </div>
                  <span className="text-lg">Implementación en tu trabajo actual</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-4">
                    <span className="text-white font-bold">7-8</span>
                  </div>
                  <span className="text-lg">Liderazgo y transformación organizacional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Por Qué Nuestro Enfoque Es Diferente
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
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
                      <strong>Tiempo Requerido</strong>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">15-30 min por sesión</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Horas de estudio intensivo</p>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-6 font-semibold text-gray-900 text-lg">
                      <strong>Resultado</strong>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Liderazgo y ventaja competitiva</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="font-medium text-gray-900 text-lg">Solo uso básico de herramientas</p>
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

      {/* Segmented Social Proof */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Resultados Reales de Profesionales Como Tú
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Estos profesionales experimentados transformaron su incertidumbre sobre IA en ventaja competitiva. 
              Sus resultados hablan por sí solos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Marketing Manager Testimonial */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-2xl">MG</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">María González</h3>
                    <p className="text-sm text-gray-600">Marketing Director | 42 años</p>
                    <p className="text-sm text-[#635BFF] font-medium">Banco Santander</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Quote className="h-10 w-10 text-[#635BFF] mb-6 opacity-20" />
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg">
                  "Tenía 20 años de experiencia en marketing, pero me sentía como una novata frente a la IA. 
                  En 6 semanas pasé de evitar el tema en reuniones a liderar la estrategia de marketing con IA 
                  de todo el banco. Mi equipo aumentó productividad 340% y obtuve el ascenso que llevaba 3 años esperando."
                </blockquote>
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                  <p className="text-sm font-bold text-green-800 mb-2">RESULTADO MEDIBLE:</p>
                  <p className="text-sm text-green-700">Ascenso a Marketing Director + aumento salarial 45%</p>
                </div>
              </CardContent>
            </Card>

            {/* Entrepreneur Testimonial */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-2xl">CR</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Carlos Ruiz</h3>
                    <p className="text-sm text-gray-600">Fundador & CEO | 38 años</p>
                    <p className="text-sm text-[#635BFF] font-medium">Consultoría Legal Tech</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Quote className="h-10 w-10 text-[#635BFF] mb-6 opacity-20" />
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg">
                  "Mi competencia estaba automatizando servicios que yo tardaba semanas en entregar. 
                  En lugar de contratar desarrolladores, aprendí a estructurar servicios con IA que me 
                  posicionaron 2 años por delante. Facturación creció 280% sin aumentar plantilla."
                </blockquote>
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                  <p className="text-sm font-bold text-green-800 mb-2">RESULTADO MEDIBLE:</p>
                  <p className="text-sm text-green-700">Facturación €180K → €684K anual</p>
                </div>
              </CardContent>
            </Card>

            {/* Middle Management Testimonial */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-2xl">JL</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">José Luis Fernández</h3>
                    <p className="text-sm text-gray-600">Director de Operaciones | 45 años</p>
                    <p className="text-sm text-[#635BFF] font-medium">Multinacional Logística</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Quote className="h-10 w-10 text-[#635BFF] mb-6 opacity-20" />
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg">
                  "Lideraba un equipo de 50 personas pero me sentía perdido con la transformación digital. 
                  Ahora soy el referente de IA en la empresa. Redujimos costos operativos 35% y mi equipo 
                  me ve como un líder visionario, no como alguien que se resiste al cambio."
                </blockquote>
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                  <p className="text-sm font-bold text-green-800 mb-2">RESULTADO MEDIBLE:</p>
                  <p className="text-sm text-green-700">Promoción a VP + reconocimiento como líder innovador</p>
                </div>
              </CardContent>
            </Card>

            {/* Freelancer Testimonial */}
            <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-2xl">AM</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Ana Martín</h3>
                    <p className="text-sm text-gray-600">Consultora RRHH | 44 años</p>
                    <p className="text-sm text-[#635BFF] font-medium">Freelance</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Quote className="h-10 w-10 text-[#635BFF] mb-6 opacity-20" />
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg">
                  "A los 44 años pensé que era tarde para reinventarme. Ahora soy la consultora de referencia 
                  en 'Gestión de Talento con IA' y mis tarifas aumentaron 200%. Tengo lista de espera de 3 meses 
                  y empresas Fortune 500 me contratan como asesora estratégica."
                </blockquote>
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                  <p className="text-sm font-bold text-green-800 mb-2">RESULTADO MEDIBLE:</p>
                  <p className="text-sm text-green-700">€45/hora → €150/hora + retainers mensuales €5K</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Badge className="bg-[#635BFF] text-white text-xl px-8 py-4 rounded-full">
              Promedio de aumento salarial: 156% en 6 meses
            </Badge>
          </div>
        </div>
      </section>

      {/* Curriculum/Methodology - 8 Week Structure */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Sistema de Transformación de 8 Semanas
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Cada semana está diseñada para construir sobre la anterior, llevándote desde cero conocimiento 
              hasta liderazgo en IA de forma progresiva y sin abrumar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Weeks 1-2 */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-800 mb-4">
                  Semanas 1-2: Fundamentos Sin Tecnoestrés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Qué es realmente la IA (sin jerga técnica)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Mitos vs realidades en tu industria</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Marco mental para tomar decisiones</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Primeros experimentos seguros</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Weeks 3-4 */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-green-800 mb-4">
                  Semanas 3-4: Herramientas y Prompts Efectivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Las 5 herramientas esenciales para tu rol</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Biblioteca de prompts por industria</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Automatización de tareas repetitivas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Primeros resultados medibles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Weeks 5-6 */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-orange-800 mb-4">
                  Semanas 5-6: Implementación en Tu Trabajo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Integración con tus procesos actuales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Casos de uso específicos para tu rol</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Métricas y medición de impacto</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Optimización y refinamiento</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Weeks 7-8 */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-purple-800 mb-4">
                  Semanas 7-8: Liderazgo y Transformación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Estrategia de adopción para tu equipo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Comunicación efectiva sobre IA</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Posicionamiento como líder innovador</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Plan de crecimiento continuo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#635BFF] to-[#5048E5] text-white p-10 rounded-2xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">
                Cada Semana: 15-30 Minutos de Tu Tiempo
              </h3>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Diseñado para profesionales ocupados que necesitan resultados rápidos sin sacrificar calidad.
              </p>
              <Button 
                size="lg" 
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold px-10 py-6 rounded-xl"
                onClick={openVideoModal}
              >
                Ver Cómo Funciona El Sistema Completo
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Credibility Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Por Qué 3,247 Profesionales Confiaron Su Futuro a Este Sistema
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white p-10 rounded-2xl shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#635BFF] to-[#5048E5] rounded-full flex items-center justify-center mr-6">
                    <Briefcase className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">Dr. María González</h3>
                    <p className="text-gray-600 text-lg">Fundadora & Instructora Principal</p>
                  </div>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <Award className="h-6 w-6 text-[#635BFF] mr-4 mt-1" />
                    <span className="text-gray-700 text-lg">15+ años liderando transformación digital en Fortune 500</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-6 w-6 text-[#635BFF] mr-4 mt-1" />
                    <span className="text-gray-700 text-lg">Ex-Directora de Innovación en Microsoft y Google</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-6 w-6 text-[#635BFF] mr-4 mt-1" />
                    <span className="text-gray-700 text-lg">MBA Stanford + PhD en Inteligencia Artificial</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-6 w-6 text-[#635BFF] mr-4 mt-1" />
                    <span className="text-gray-700 text-lg">Consultora para +200 empresas en adopción de IA</span>
                  </div>
                </div>

                <blockquote className="border-l-4 border-[#635BFF] pl-6 italic text-gray-700 text-lg leading-relaxed">
                  "Después de ayudar a cientos de empresas a adoptar IA, me di cuenta de que el verdadero 
                  problema no era la tecnología, sino cómo enseñarla a profesionales experimentados sin 
                  abrumarlos. Este sistema es el resultado de 5 años perfeccionando esa metodología."
                </blockquote>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-[#635BFF]">3,247</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium text-lg">Profesionales Capacitados</p>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-[#635BFF]">94%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium text-lg">Tasa de Satisfacción</p>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-[#635BFF]">200+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium text-lg">Empresas Asesoradas</p>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-[#635BFF]">15+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium text-lg">Años de Experiencia</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-10 bg-yellow-50 border border-yellow-200 p-8 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-4 text-xl">Reconocimientos Recientes:</h4>
                <ul className="text-gray-700 space-y-2 text-lg">
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Contenido Diseñado Para Profesionales Como Tú
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada módulo está estructurado para maximizar tu tiempo y acelerar tu dominio de IA práctica.
            </p>
          </div>

          <CoursePreview />

          <div className="text-center mt-16">
            <Link to="/courses">
              <Button size="lg" className="bg-[#635BFF] hover:bg-[#5048E5] px-10 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                Ver Todos Los Módulos
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="bg-[#635BFF] rounded-full p-6">
                <HelpCircle className="h-16 w-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Las 5 Preguntas Que Hacen TODOS los Profesionales Antes de Transformar Su Carrera
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Resolvemos las dudas más comunes para que puedas tomar la mejor decisión para tu futuro.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-2xl px-8 shadow-lg hover:shadow-xl transition-shadow">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#635BFF] text-lg py-6">
                "No tengo tiempo para esto ahora, trabajo 50+ horas semanales"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed text-lg pb-6">
                Por eso cada módulo está diseñado para 15-30 minutos máximo. La primera semana ya estarás 
                aplicando IA para AHORRAR tiempo en tus tareas diarias. Nuestros estudiantes reportan 
                recuperar 5-8 horas semanales después del primer mes. El tiempo que inviertes se multiplica 
                inmediatamente en productividad.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-gray-200 rounded-2xl px-8 shadow-lg hover:shadow-xl transition-shadow">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#635BFF] text-lg py-6">
                "Esto parece muy técnico, no soy programador ni nativo digital"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed text-lg pb-6">
                CERO código requerido. El 78% de nuestros estudiantes tiene más de 35 años y muchos se 
                consideraban "no técnicos" antes de empezar. Todo está explicado en lenguaje empresarial, 
                con ejemplos de tu industria. Si sabes usar email y navegador web, puedes dominar estas herramientas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-gray-200 rounded-2xl px-8 shadow-lg hover:shadow-xl transition-shadow">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#635BFF] text-lg py-6">
                "¿Realmente merece la pena invertir €597?"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed text-lg pb-6">
                Profesionales con habilidades IA ganan 25% más según LinkedIn. Este programa se paga solo 
                con el primer proyecto que implementes. Nuestros graduados reportan aumentos salariales 
                promedio de €8,400 anuales. Además, incluye garantía de 30 días - si no ves valor, 
                reembolso completo sin preguntas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-gray-200 rounded-2xl px-8 shadow-lg hover:shadow-xl transition-shadow">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#635BFF] text-lg py-6">
                "¿Y si para cuando lo aprenda ya ha cambiado todo?"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed text-lg pb-6">
                Te enseñamos PRINCIPIOS atemporales, no herramientas específicas. Los fundamentos de 
                prompting, automatización y pensamiento estratégico con IA no cambian. Además, las 
                actualizaciones de por vida están incluidas en el Plan Profesional y Elite. Siempre 
                estarás al día con las últimas tendencias.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-gray-200 rounded-2xl px-8 shadow-lg hover:shadow-xl transition-shadow">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#635BFF] text-lg py-6">
                "A mi edad (45+) ¿no es demasiado tarde?"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed text-lg pb-6">
                Tu edad es tu VENTAJA. El 43% de nuestros mejores casos de éxito son profesionales de 45+ años. 
                Tu experiencia + IA = combinación imparable. Los jóvenes saben tecnología, pero tú sabes 
                negocios. Esa perspectiva estratégica es lo que las empresas más valoran en la era IA.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Elige Tu Ruta de Transformación: 3 Formas de Convertirte en Líder con IA
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Cada plan está diseñado para diferentes niveles de ambición profesional. 
              Todos incluyen acceso inmediato y garantía de satisfacción.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Fundamentos */}
            <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gray-100 rounded-full p-4">
                    <Shield className="h-10 w-10 text-gray-600" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">Plan Fundamentos</CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-gray-900">€297</span>
                </div>
                <CardDescription className="mt-4 text-lg">
                  Perfecto para empezar tu transformación con IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Acceso completo a los 8 módulos de formación</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Librería básica de 150 prompts esenciales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Acceso a comunidad privada de profesionales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Soporte por email durante 3 meses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Certificado de finalización</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg rounded-xl">
                  Seleccionar Fundamentos
                </Button>
              </CardContent>
            </Card>

            {/* Plan Profesional - Most Popular */}
            <Card className="relative border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform scale-105 hover:scale-110">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#635BFF] text-white px-8 py-3 text-lg font-bold rounded-full shadow-lg">
                  ⭐ MÁS POPULAR
                </Badge>
              </div>
              <CardHeader className="text-center pb-6 pt-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-[#635BFF] rounded-full p-4">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">Plan Profesional</CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-[#635BFF]">€597</span>
                </div>
                <CardDescription className="mt-4 text-lg">
                  La opción más completa para profesionales ambiciosos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-[#635BFF] text-white p-4 rounded-xl mb-8 text-center">
                  <p className="font-bold text-lg">AHORRO: €285 vs comprar por separado</p>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-lg">TODO lo del Plan Fundamentos +</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Librería completa de 450+ prompts profesionales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Base de datos de 200+ herramientas evaluadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">25+ Templates y frameworks de implementación</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">2 sesiones de mentoría 1:1 personalizada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Actualizaciones de por vida</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#635BFF] hover:bg-[#5048E5] text-white font-bold py-4 text-lg rounded-xl shadow-xl">
                  Seleccionar Profesional ⭐
                </Button>
              </CardContent>
            </Card>

            {/* Plan Elite */}
            <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-yellow-100 rounded-full p-4">
                    <Crown className="h-10 w-10 text-yellow-600" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">Plan Elite</CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-gray-900">€1,197</span>
                </div>
                <CardDescription className="mt-4 text-lg">
                  Para líderes que quieren transformar organizaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-8 text-center">
                  <p className="font-bold text-green-800 text-lg">AHORRO: €497 vs comprar por separado</p>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-lg">TODO lo del Plan Profesional +</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">6 sesiones de mentoría 1:1 con especialistas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Certificación avanzada con badge LinkedIn</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Consulta estratégica para implementación organizacional</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg rounded-xl">
                  Seleccionar Elite
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-2xl max-w-3xl mx-auto">
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>Garantía de satisfacción:</strong> 30 días para probar sin riesgo. 
                Si no ves valor, reembolso completo sin preguntas.
              </p>
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
