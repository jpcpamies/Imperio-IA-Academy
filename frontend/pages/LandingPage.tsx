import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, TrendingUp, Users, AlertTriangle, Clock, Target, CheckCircle, Award, Briefcase, Star, Quote, X, BookOpen, Shield, Zap, Crown, HelpCircle, Play, TrendingDown, UserX, Calendar } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-[#0A2342] text-white py-32">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/3 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
          
          {/* Professional geometric patterns */}
          <svg className="absolute top-20 left-1/4 w-32 h-32 text-white/5" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-40 right-1/4 w-24 h-24 text-white/3" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
          
          {/* Subtle grid lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <path d="M0,400 Q300,200 600,400 T1200,400" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
              <path d="M0,500 Q400,300 800,500 T1200,500" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-12 leading-tight tracking-tight text-white">
              ¿Te Preocupa Que Tu Experiencia de 15 Años Se Vuelva Irrelevante en 6 Meses?
            </h1>
            <h2 className="text-2xl md:text-3xl mb-12 text-gray-200 font-light leading-relaxed max-w-4xl mx-auto">
              De 'Víctima de la IA' a 'Líder con IA' en 8 Semanas
              <span className="block text-xl md:text-2xl mt-6 font-normal opacity-90">
                (Sin Volverse Loco en el Proceso)
              </span>
            </h2>
            <p className="text-lg md:text-xl mb-16 text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Si eres un profesional experimentado que siente que la revolución de la IA está dejando atrás 
              décadas de experiencia valiosa, no estás solo. Miles de ejecutivos y profesionales senior están 
              transformando su incertidumbre en ventaja competitiva a través de un enfoque estratégico y práctico 
              para dominar la inteligencia artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button 
                size="lg" 
                className="bg-[#D95D39] text-white hover:bg-[#C54A2C] font-semibold text-lg px-12 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={openVideoModal}
              >
                <Play className="mr-3 h-6 w-6" />
                Ver Cómo Funciona El Sistema
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 text-white bg-transparent hover:bg-white hover:text-[#0A2342] font-semibold px-12 py-6 rounded-lg transition-all duration-300"
              >
                Casos de Éxito Ejecutivos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Agitation Section */}
      <section className="py-32 bg-[#F8F9FA] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 rounded-full p-8">
                <AlertTriangle className="h-16 w-16 text-[#6C757D]" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#212529] mb-12 leading-tight">
              La Realidad Que Nadie Te Cuenta Sobre IA y Tu Futuro Profesional
            </h2>
            <p className="text-xl text-[#6C757D] max-w-4xl mx-auto mb-20 leading-relaxed font-light">
              Mientras las organizaciones implementan IA a velocidad acelerada, los profesionales experimentados 
              enfrentan una realidad incómoda: su experiencia valiosa necesita evolucionar o corre el riesgo de 
              volverse obsoleta.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                  <UserX className="h-12 w-12 text-[#6C757D]" />
                </div>
                <CardTitle className="text-3xl font-serif font-bold text-[#212529] mb-4">82%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#212529] font-medium text-lg mb-6 leading-relaxed">
                  de empleados creen que su empresa no los ha capacitado en IA
                </p>
                <p className="text-sm text-[#6C757D] font-light">
                  Fuente: Microsoft Work Trend Index 2024
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                  <TrendingDown className="h-12 w-12 text-[#6C757D]" />
                </div>
                <CardTitle className="text-3xl font-serif font-bold text-[#212529] mb-4">25%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#212529] font-medium text-lg mb-6 leading-relaxed">
                  menos ganan los profesionales SIN habilidades de IA comparado con sus pares
                </p>
                <p className="text-sm text-[#6C757D] font-light">
                  Fuente: LinkedIn Economic Graph 2024
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                  <Calendar className="h-12 w-12 text-[#6C757D]" />
                </div>
                <CardTitle className="text-3xl font-serif font-bold text-[#212529] mb-4">16%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#212529] font-medium text-lg mb-6 leading-relaxed">
                  de profesionales 30+ usan IA regularmente en su trabajo
                </p>
                <p className="text-sm text-[#6C757D] font-light">
                  Fuente: Pew Research Center 2024
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[#0A2342] text-white p-16 rounded-lg text-center shadow-2xl">
            <h3 className="text-3xl font-serif font-bold mb-8">
              Cada Día Sin Dominar IA Debilita Tu Posición Competitiva
            </h3>
            <p className="text-xl leading-relaxed font-light text-gray-200">
              Mientras tus colegas y competidores adoptan herramientas de IA para aumentar su productividad 
              y tomar decisiones más informadas, la brecha de habilidades se amplía exponencialmente.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Presentation */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="bg-[#7ED321] text-white text-lg px-8 py-4 mb-12 rounded-lg font-medium">
              METODOLOGÍA COMPROBADA
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#212529] mb-12 leading-tight">
              Cómo 3,247 Profesionales Experimentados Ya Están Liderando Con IA
            </h2>
            <p className="text-xl text-[#6C757D] max-w-4xl mx-auto mb-20 leading-relaxed font-light">
              A diferencia de las academias técnicas que te abruman con código y teoría, nuestro enfoque 80/20 
              te permite dominar las aplicaciones prácticas de IA que realmente importan para tu rol ejecutivo, 
              sin el estrés tecnológico.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h3 className="text-3xl font-serif font-bold text-[#212529] mb-12">
                El Enfoque 80/20 Para Profesionales Experimentados
              </h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-[#7ED321] rounded-full p-3 mr-6 mt-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#212529] text-xl mb-3">Aplicación Inmediata en Tu Rol</h4>
                    <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                      Cada herramienta y estrategia se diseña para implementar directamente en tu contexto profesional actual
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#7ED321] rounded-full p-3 mr-6 mt-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#212529] text-xl mb-3">Sin Jerga Técnica Innecesaria</h4>
                    <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                      Enfoque en resultados de negocio, no en complejidades tecnológicas que no necesitas dominar
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#7ED321] rounded-full p-3 mr-6 mt-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#212529] text-xl mb-3">Respeto Por Tu Tiempo Ejecutivo</h4>
                    <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                      Módulos de alta densidad diseñados para profesionales con agendas demandantes
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#7ED321] rounded-full p-3 mr-6 mt-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#212529] text-xl mb-3">Red de Pares de Tu Nivel</h4>
                    <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                      Conecta con otros profesionales senior que enfrentan desafíos similares en sus organizaciones
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#0A2342] p-12 rounded-lg text-white shadow-2xl">
              <h3 className="text-3xl font-serif font-bold mb-12">Metodología Estratégica de IA</h3>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-6">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-light">Identifica oportunidades de IA específicas para tu industria</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-6">
                    <Brain className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-light">Domina frameworks estratégicos para transformación organizacional</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-6">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-light">Implementa procesos de IA dentro de estructuras operacionales existentes</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-6">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-light">Lidera iniciativas de adopción de IA y gestión del cambio empresarial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Credibility Section */}
      <section className="py-32 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#212529] mb-12">
              Por Qué 3,247 Profesionales Confiaron Su Futuro a Este Sistema
            </h2>
            <p className="text-xl text-[#6C757D] max-w-4xl mx-auto leading-relaxed font-light">
              Desarrollado por ejecutivos para ejecutivos, con un enfoque que respeta tu experiencia 
              mientras te prepara para liderar en la era de la IA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="bg-white p-12 rounded-lg shadow-2xl">
              {/* Professional headshot placeholder */}
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-8 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <Briefcase className="h-12 w-12 text-gray-500" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-serif font-bold text-[#212529] mb-4">
                  [Instructor Principal]
                </h3>
                <p className="text-lg text-[#6C757D] mb-6 font-medium">
                  Ex-Director de Transformación Digital, Fortune 500
                </p>
                <div className="text-left space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-3 mt-1" />
                    <span className="text-[#6C757D] leading-relaxed">15+ años liderando transformaciones tecnológicas en empresas multinacionales</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-3 mt-1" />
                    <span className="text-[#6C757D] leading-relaxed">MBA de [Universidad Prestigiosa] + Certificaciones en IA Estratégica</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-3 mt-1" />
                    <span className="text-[#6C757D] leading-relaxed">Asesor de C-Suite en implementación de IA para organizaciones de 10,000+ empleados</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#7ED321] mr-3 mt-1" />
                    <span className="text-[#6C757D] leading-relaxed">Autor de "IA Estratégica para Líderes" (bestseller en Amazon Business)</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-serif font-bold text-[#212529] mb-12">
                Un Enfoque Diseñado Por y Para Profesionales Senior
              </h3>
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-[#D95D39] mr-4" />
                    <h4 className="font-bold text-[#212529] text-xl">Experiencia Ejecutiva Real</h4>
                  </div>
                  <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                    No es teoría académica. Cada estrategia proviene de implementaciones reales en 
                    entornos corporativos complejos con presupuestos de millones y equipos de cientos.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <Users className="h-8 w-8 text-[#D95D39] mr-4" />
                    <h4 className="font-bold text-[#212529] text-xl">Comprende Tu Contexto</h4>
                  </div>
                  <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                    Sabe lo que significa gestionar stakeholders escépticos, presupuestos ajustados, 
                    y la presión de mostrar ROI inmediato en iniciativas de transformación.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-[#D95D39] mr-4" />
                    <h4 className="font-bold text-[#212529] text-xl">Resultados Comprobados</h4>
                  </div>
                  <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                    Ha guiado a más de 3,000 profesionales senior a través de transiciones exitosas 
                    hacia liderazgo con IA, con un 94% de satisfacción ejecutiva.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-20">
            <div className="bg-[#0A2342] text-white p-12 rounded-lg shadow-2xl">
              <Quote className="h-12 w-12 text-white/30 mx-auto mb-8" />
              <p className="text-xl italic leading-relaxed font-light text-gray-200 mb-8">
                "Después de 20 años en consultoría estratégica, pensé que había visto todas las metodologías. 
                Este enfoque para IA ejecutiva es diferente: práctico, respeta tu tiempo, y produce resultados 
                medibles desde la primera semana."
              </p>
              <div className="text-center">
                <p className="font-semibold text-lg">María Elena Rodríguez</p>
                <p className="text-gray-300 font-light">Directora de Estrategia, Multinacional de Consultoría</p>
                <p className="text-gray-400 text-sm mt-2">Edad: 42 años • 18 años de experiencia ejecutiva</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#212529] mb-12">
              Desarrollo Ejecutivo vs. Capacitación Técnica
            </h2>
            <p className="text-xl text-[#6C757D] max-w-4xl mx-auto leading-relaxed font-light">
              Distinguido de los programas de capacitación técnica, nuestro enfoque de desarrollo ejecutivo 
              aborda los requisitos de liderazgo estratégico de profesionales senior en entornos empresariales.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0A2342]">
                    <th className="border border-gray-300 px-8 py-8 text-left font-serif font-bold text-white text-xl">
                      Características del Programa
                    </th>
                    <th className="border border-gray-300 px-8 py-8 text-center font-serif font-bold text-[#D95D39] text-xl">
                      Liderazgo Ejecutivo en IA
                    </th>
                    <th className="border border-gray-300 px-8 py-8 text-center font-serif font-bold text-[#6C757D] text-xl">
                      Programas de Capacitación Técnica
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Audiencia Objetivo
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Ejecutivos senior y líderes estratégicos</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Profesionales técnicos y desarrolladores</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Enfoque de Contenido
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Aplicaciones estratégicas de negocio e impacto organizacional</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Implementación técnica y fundamentos de programación</p>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Metodología de Aprendizaje
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Frameworks estratégicos basados en casos</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Ejercicios técnicos prácticos</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Red de Pares
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">C-suite y profesionales de alta dirección</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Niveles de experiencia y etapas profesionales mixtas</p>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Soporte Ejecutivo
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Asesoría estratégica dedicada y guía de implementación</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Foros de discusión general y soporte comunitario</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Enfoque de Resultados
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Transformación organizacional y ventaja competitiva</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Adquisición de habilidades técnicas y competencia en herramientas</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-20">
            <div className="bg-[#0A2342] text-white p-12 rounded-lg shadow-2xl">
              <h3 className="text-3xl font-serif font-bold mb-8">
                Excelencia Ejecutiva a Través del Liderazgo Estratégico en IA
              </h3>
              <p className="text-xl text-gray-200 mb-12 leading-relaxed font-light">
                Mientras la capacitación técnica desarrolla capacidades operacionales, el desarrollo ejecutivo 
                crea líderes estratégicos que impulsan la transformación organizacional y la ventaja competitiva sostenible.
              </p>
              <Button 
                size="lg" 
                className="bg-[#D95D39] text-white hover:bg-[#C54A2C] font-semibold px-12 py-6 rounded-lg"
                onClick={openVideoModal}
              >
                Detalles del Programa Ejecutivo
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-[#0A2342] relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-12 leading-tight">
            Liderazgo Estratégico en la Era de la IA: Tu Ventaja Competitiva
          </h2>
          <p className="text-xl text-gray-200 mb-16 leading-relaxed font-light">
            Las organizaciones que dominarán la próxima década están siendo lideradas hoy por ejecutivos que 
            entienden la IA como un imperativo estratégico, no meramente como una herramienta tecnológica.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-12 mb-16">
            <div className="grid md:grid-cols-3 gap-12 text-white">
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-4 mr-6">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Garantía Ejecutiva</p>
                  <p className="text-sm text-gray-300 font-light">Evaluación de valor estratégico de 30 días</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-4 mr-6">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Inscripción Limitada</p>
                  <p className="text-sm text-gray-300 font-light">Cohorte exclusiva de 25 ejecutivos senior</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-4 mr-6">
                  <Zap className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Acceso Inmediato</p>
                  <p className="text-sm text-gray-300 font-light">Comienza la transformación estratégica hoy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Button size="lg" className="bg-[#D95D39] text-white hover:bg-[#C54A2C] font-semibold text-xl px-16 py-8 rounded-lg shadow-2xl transition-all duration-300">
              ASEGURAR INSCRIPCIÓN EJECUTIVA
              <ArrowRight className="ml-4 h-8 w-8" />
            </Button>
            <p className="text-gray-300 text-lg font-light">
              Acceso inmediato al programa • Garantía ejecutiva • Soporte de asesoría estratégica
            </p>
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-300 text-xl italic leading-relaxed font-light">
              "El mejor momento para establecer ventaja estratégica fue ayer. El segundo mejor momento es ahora."
            </p>
            <p className="text-gray-400 mt-6 text-lg font-light">
              Principio de Liderazgo Estratégico
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
