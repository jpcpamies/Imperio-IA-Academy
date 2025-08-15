import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, TrendingUp, Users, CheckCircle, Award, Briefcase, Star, Quote, BookOpen, Shield, Zap, Crown, HelpCircle, Play, Target, Clock, Lightbulb, Rocket, Database } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean and Minimalist */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Construye Tu Ventaja Competitiva en IA
              <span className="block text-[#6B7BFF] mt-4">Sin Volverte Estudiante Otra Vez</span>
            </h1>
            <h2 className="text-xl md:text-2xl mb-8 text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto">
              El único ecosistema de aprendizaje que te permite dominar IA a tu ritmo, 
              con tu experiencia como base, no como obstáculo
            </h2>
            <p className="text-lg text-gray-500 mb-12 max-w-5xl mx-auto leading-relaxed">
              Librerías curadas + micro-habilidades aplicables + proyectos reales = 
              Tu transformación profesional sin tecnoestrés ni curvas imposibles
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white font-medium text-lg px-10 py-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                onClick={openVideoModal}
              >
                <Play className="mr-3 h-5 w-5" />
                Ver Cómo Funciona El Ecosistema
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-10 py-6 rounded-lg transition-all duration-300"
              >
                Explorar Librerías Gratuitas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-12 text-lg">
            Profesionales de estas empresas ya están usando nuestro ecosistema
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-40">
            <div className="text-xl font-medium text-gray-400">Microsoft</div>
            <div className="text-xl font-medium text-gray-400">Google</div>
            <div className="text-xl font-medium text-gray-400">Amazon</div>
            <div className="text-xl font-medium text-gray-400">IBM</div>
            <div className="text-xl font-medium text-gray-400">Deloitte</div>
            <div className="text-xl font-medium text-gray-400">McKinsey</div>
          </div>
        </div>
      </section>

      {/* Why This Is Not Another AI Course */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Por Qué Esto No Es "Otro Curso de IA"
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comparamos tres enfoques para que veas la diferencia clara
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Traditional Courses */}
            <Card className="border border-red-100 bg-red-50/30">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-red-700 mb-4">Cursos Tradicionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Horarios fijos e inflexibles</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Teoría sin aplicación inmediata</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Ignoran tu experiencia previa</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Contenido genérico para todos</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Certificado sin valor real</span>
                </div>
              </CardContent>
            </Card>

            {/* Professional Reality */}
            <Card className="border border-yellow-100 bg-yellow-50/30">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-yellow-700 mb-4">Realidad Profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Tiempo limitado y fragmentado</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Necesitas resultados inmediatos</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Tu experiencia es tu mayor activo</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Contexto específico de tu industria</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Impacto medible en tu carrera</span>
                </div>
              </CardContent>
            </Card>

            {/* Our Ecosystem */}
            <Card className="border border-[#4FD1C7] bg-teal-50/30">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-teal-700 mb-4">Nuestro Ecosistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Acceso 24/7 a tu ritmo</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Micro-habilidades aplicables hoy</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Construye sobre tu experiencia</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Librerías especializadas por sector</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Transformación profesional real</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ecosystem Structure */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              5 Librerías Especializadas Para Tu Transformación
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Cada librería está diseñada para que puedas aplicar inmediatamente lo que aprendes, 
              sin perder tiempo en teoría innecesaria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Librería de Conceptos */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">🧠 Librería de Conceptos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Fundamentos sin jerga técnica. Entiende qué es realmente importante 
                  y qué puedes ignorar sin riesgo.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• IA explicada en lenguaje de negocios</li>
                  <li>• Conceptos aplicables a tu industria</li>
                  <li>• Marcos mentales para tomar decisiones</li>
                </ul>
              </CardContent>
            </Card>

            {/* Librería de Herramientas */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">🛠 Librería de Herramientas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  200+ herramientas evaluadas y categorizadas. Solo las que realmente 
                  funcionan para profesionales como tú.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Evaluaciones honestas y prácticas</li>
                  <li>• Comparativas por caso de uso</li>
                  <li>• Guías de implementación rápida</li>
                </ul>
              </CardContent>
            </Card>

            {/* Banco de Prompts */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">⚡ Banco de Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  500+ prompts probados y organizados por sector profesional. 
                  Copia, pega y adapta a tu contexto.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Prompts específicos por industria</li>
                  <li>• Templates personalizables</li>
                  <li>• Casos de uso documentados</li>
                </ul>
              </CardContent>
            </Card>

            {/* Librería de Proyectos */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">🚀 Librería de Proyectos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Templates completos de proyectos reales. Desde la idea hasta 
                  la implementación, paso a paso.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Proyectos por nivel de experiencia</li>
                  <li>• Documentación completa</li>
                  <li>• Métricas de éxito incluidas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Casos de Éxito */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">👥 Casos de Éxito Reales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Historias completas de profesionales que transformaron su carrera. 
                  Con datos, procesos y lecciones aprendidas.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Transformaciones documentadas</li>
                  <li>• Estrategias replicables</li>
                  <li>• Resultados medibles</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white px-10 py-6 text-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              Explorar Todas Las Librerías
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Resultados Que Hablan Por Sí Solos
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Más de 3,000 profesionales han transformado su carrera usando nuestro ecosistema
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6B7BFF] mb-4">3,247+</div>
              <div className="text-gray-600 text-lg">
                Profesionales transformados
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6B7BFF] mb-4">94%</div>
              <div className="text-gray-600 text-lg">
                Aplican lo aprendido inmediatamente
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6B7BFF] mb-4">156%</div>
              <div className="text-gray-600 text-lg">
                Aumento salarial promedio
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6B7BFF] mb-4">15min</div>
              <div className="text-gray-600 text-lg">
                Para tu primera micro-habilidad
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Before/During/After Format */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Transformaciones Reales: Antes → Durante → Después
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Profesionales como tú comparten su proceso completo de transformación
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Testimonial 1 */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-xl">MG</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">María González</h3>
                    <p className="text-sm text-gray-600">Marketing Director | 42 años</p>
                    <p className="text-sm text-[#6B7BFF] font-medium">Banco Santander</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Badge className="bg-red-100 text-red-700 mb-3">ANTES</Badge>
                    <p className="text-gray-700 text-sm">
                      "Evitaba las reuniones sobre IA. Me sentía obsoleta después de 20 años en marketing. 
                      Veía cómo otros hablaban de herramientas que no entendía."
                    </p>
                  </div>
                  <div>
                    <Badge className="bg-yellow-100 text-yellow-700 mb-3">DURANTE</Badge>
                    <p className="text-gray-700 text-sm">
                      "En 3 semanas ya estaba usando prompts específicos para campañas. 
                      El banco de prompts me ahorró horas de trabajo cada día."
                    </p>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-700 mb-3">DESPUÉS</Badge>
                    <p className="text-gray-700 text-sm">
                      "Ahora lidero la estrategia de marketing con IA del banco. 
                      Mi equipo aumentó productividad 340% y obtuve el ascenso que esperaba."
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-6">
                  <p className="text-sm font-bold text-green-800 mb-1">RESULTADO MEDIBLE:</p>
                  <p className="text-sm text-green-700">Ascenso + aumento salarial 45%</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-xl">CR</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Carlos Ruiz</h3>
                    <p className="text-sm text-gray-600">Fundador & CEO | 38 años</p>
                    <p className="text-sm text-[#6B7BFF] font-medium">Consultoría Legal Tech</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Badge className="bg-red-100 text-red-700 mb-3">ANTES</Badge>
                    <p className="text-gray-700 text-sm">
                      "Mi competencia automatizaba servicios que yo tardaba semanas en entregar. 
                      Pensé en contratar desarrolladores pero era muy caro."
                    </p>
                  </div>
                  <div>
                    <Badge className="bg-yellow-100 text-yellow-700 mb-3">DURANTE</Badge>
                    <p className="text-gray-700 text-sm">
                      "La librería de proyectos me mostró cómo estructurar servicios con IA. 
                      Implementé mi primer proyecto en 2 semanas."
                    </p>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-700 mb-3">DESPUÉS</Badge>
                    <p className="text-gray-700 text-sm">
                      "Ahora estoy 2 años por delante de mi competencia. 
                      Facturación creció 280% sin aumentar plantilla."
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-6">
                  <p className="text-sm font-bold text-green-800 mb-1">RESULTADO MEDIBLE:</p>
                  <p className="text-sm text-green-700">Facturación €180K → €684K anual</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instructor Credibility Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Quién Está Detrás de Este Ecosistema
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-[#6B7BFF] rounded-full flex items-center justify-center mr-6">
                    <Briefcase className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Dr. María González</h3>
                    <p className="text-gray-600 text-lg">Fundadora & Arquitecta del Ecosistema</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#6B7BFF] mr-3 mt-1" />
                    <span className="text-gray-700">15+ años liderando transformación digital en Fortune 500</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#6B7BFF] mr-3 mt-1" />
                    <span className="text-gray-700">Ex-Directora de Innovación en Microsoft y Google</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#6B7BFF] mr-3 mt-1" />
                    <span className="text-gray-700">MBA Stanford + PhD en Inteligencia Artificial</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-[#6B7BFF] mr-3 mt-1" />
                    <span className="text-gray-700">Consultora para +200 empresas en adopción de IA</span>
                  </div>
                </div>

                <blockquote className="border-l-4 border-[#6B7BFF] pl-6 italic text-gray-700 leading-relaxed">
                  "Después de ayudar a cientos de empresas, entendí que el problema no era la tecnología, 
                  sino cómo enseñarla respetando la experiencia de profesionales exitosos. 
                  Este ecosistema es el resultado de 5 años perfeccionando esa metodología."
                </blockquote>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center bg-gray-50 border-0">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#6B7BFF]">3,247</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">Profesionales Transformados</p>
                  </CardContent>
                </Card>

                <Card className="text-center bg-gray-50 border-0">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#6B7BFF]">94%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">Tasa de Satisfacción</p>
                  </CardContent>
                </Card>

                <Card className="text-center bg-gray-50 border-0">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#6B7BFF]">200+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">Empresas Asesoradas</p>
                  </CardContent>
                </Card>

                <Card className="text-center bg-gray-50 border-0">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-[#6B7BFF]">15+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">Años de Experiencia</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-4">Reconocimientos Recientes:</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Explora Nuestras Librerías de Conocimiento
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada librería está diseñada para que puedas aplicar inmediatamente lo que aprendes
            </p>
          </div>

          <CoursePreview />

          <div className="text-center mt-16">
            <Link to="/courses">
              <Button 
                size="lg" 
                className="bg-[#6B7BFF] hover:bg-[#5A6AEF] px-10 py-6 text-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                Explorar Todas Las Librerías
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Accede a Tu Ecosistema de Aprendizaje
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Elige el nivel de acceso que mejor se adapte a tu ritmo y objetivos profesionales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Explorador */}
            <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gray-100 rounded-full p-4">
                    <Shield className="h-8 w-8 text-gray-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Plan Explorador</CardTitle>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">€297</span>
                </div>
                <CardDescription className="mt-4 text-lg">
                  Perfecto para empezar tu transformación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Acceso a 3 librerías fundamentales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">150 prompts esenciales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Comunidad privada de profesionales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Soporte por email durante 3 meses</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg rounded-lg">
                  Comenzar Exploración
                </Button>
              </CardContent>
            </Card>

            {/* Plan Profesional - Most Popular */}
            <Card className="border-2 border-[#6B7BFF] bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#6B7BFF] text-white px-6 py-2 text-sm font-bold rounded-full">
                  ⭐ MÁS POPULAR
                </Badge>
              </div>
              <CardHeader className="text-center pb-6 pt-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-[#6B7BFF] rounded-full p-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Plan Profesional</CardTitle>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-[#6B7BFF]">€597</span>
                </div>
                <CardDescription className="mt-4 text-lg">
                  El ecosistema completo para tu transformación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-[#6B7BFF] text-white p-4 rounded-lg mb-8 text-center">
                  <p className="font-bold">AHORRO: €285 vs acceso individual</p>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">TODO lo del Plan Explorador +</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Acceso completo a las 5 librerías</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">500+ prompts profesionales</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">200+ herramientas evaluadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Templates de proyectos completos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Actualizaciones de por vida</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white font-bold py-4 text-lg rounded-lg">
                  Acceder a Mi Ecosistema ⭐
                </Button>
              </CardContent>
            </Card>

            {/* Plan Elite */}
            <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-yellow-100 rounded-full p-4">
                    <Crown className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Plan Elite</CardTitle>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">€1,197</span>
                </div>
                <CardDescription className="mt-4 text-lg">
                  Para líderes que transforman organizaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">TODO lo del Plan Profesional +</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">6 sesiones de mentoría 1:1</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Certificación avanzada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4FD1C7] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Consulta estratégica organizacional</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg rounded-lg">
                  Transformar Organización
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg max-w-3xl mx-auto">
              <p className="text-gray-700 leading-relaxed">
                <strong>Garantía de satisfacción:</strong> 30 días para explorar sin riesgo. 
                Si no encuentras valor inmediato, reembolso completo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Preguntas Frecuentes Sobre El Ecosistema
            </h2>
            <p className="text-xl text-gray-600">
              Resolvemos las dudas más comunes de profesionales como tú
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#6B7BFF] py-6">
                "¿Realmente puedo aplicar esto sin conocimientos técnicos?"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                Absolutamente. El 78% de nuestros usuarios tiene más de 35 años y se consideraban "no técnicos". 
                Todo está explicado en lenguaje empresarial, con ejemplos de tu industria. 
                Si usas email y navegador web, puedes dominar estas herramientas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#6B7BFF] py-6">
                "¿Cuánto tiempo necesito dedicar semanalmente?"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                Cada micro-habilidad toma 15-30 minutos. Puedes avanzar a tu ritmo, cuando tengas tiempo. 
                La primera semana ya estarás aplicando IA para AHORRAR tiempo en tus tareas diarias. 
                Nuestros usuarios reportan recuperar 5-8 horas semanales después del primer mes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#6B7BFF] py-6">
                "¿Qué pasa si mi industria es muy específica?"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                Nuestras librerías están organizadas por sectores profesionales. Tenemos prompts, 
                herramientas y casos específicos para más de 20 industrias diferentes. 
                Además, te enseñamos a adaptar cualquier herramienta a tu contexto específico.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#6B7BFF] py-6">
                "¿Cómo sé que esto no se volverá obsoleto rápidamente?"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                Te enseñamos PRINCIPIOS atemporales, no herramientas específicas. Los fundamentos de 
                prompting, automatización y pensamiento estratégico con IA no cambian. 
                Además, las actualizaciones están incluidas en los planes Profesional y Elite.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#6B7BFF] py-6">
                "¿Puedo ver resultados inmediatos o necesito completar todo?"
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                Puedes aplicar tu primera micro-habilidad en 15 minutos. Cada elemento del ecosistema 
                está diseñado para uso inmediato. No necesitas "completar" nada - tomas lo que necesitas, 
                cuando lo necesitas, y lo aplicas inmediatamente en tu trabajo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[#6B7BFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Tu Momento de Decisión: Evolucionar o Quedarse Atrás
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Mientras otros profesionales construyen su ventaja competitiva con IA, 
            ¿vas a seguir esperando el momento perfecto?
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12">
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold">30 días de garantía</p>
                  <p className="text-sm text-blue-200">Explora sin riesgo</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Acceso inmediato</p>
                  <p className="text-sm text-blue-200">Empieza en 15 minutos</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Resultados inmediatos</p>
                  <p className="text-sm text-blue-200">Aplica desde el día 1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button 
              size="lg" 
              className="bg-white text-[#6B7BFF] hover:bg-gray-50 font-bold text-xl px-12 py-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Acceder a Mi Ecosistema de Aprendizaje
              <ArrowRight className="ml-4 h-6 w-6" />
            </Button>
            <p className="text-blue-200 text-lg">
              Empieza tu primera micro-habilidad en 15 minutos
            </p>
          </div>

          <div className="mt-16 text-center">
            <p className="text-blue-200 text-lg italic">
              "El mejor momento para construir tu ventaja competitiva fue ayer. El segundo mejor momento es ahora."
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
