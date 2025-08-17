-- Core application tables without authentication dependencies

-- Courses table
CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table
CREATE TABLE lessons (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, order_index),
  UNIQUE(course_id, slug)
);

-- User progress table (simplified without user authentication)
CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL, -- Simple integer ID, no foreign key constraint
  lesson_id BIGINT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create indexes for performance
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_lessons_slug ON lessons(slug);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);

-- Insert sample courses
INSERT INTO courses (title, description, thumbnail_url, slug) VALUES
('IA para Profesionales del Marketing', 'Domina las herramientas de IA que están revolucionando el marketing digital. Aprende a crear campañas más efectivas, automatizar procesos y generar contenido que convierte usando inteligencia artificial.', '/thumbnails/ia-marketing.jpg', 'ia-marketing-profesional'),
('Excel + IA: Productividad Extrema', 'Transforma tu trabajo con hojas de cálculo usando inteligencia artificial. Automatiza tareas repetitivas, crea análisis avanzados y genera reportes ejecutivos en minutos, no horas.', '/thumbnails/excel-ia.jpg', 'excel-ia-productividad'),
('Escritura Profesional con IA', 'Eleva tu comunicación empresarial con herramientas de escritura IA. Redacta emails persuasivos, propuestas ganadoras y presentaciones impactantes que destacan en el entorno corporativo.', '/thumbnails/escritura-ia.jpg', 'escritura-profesional-ia'),
('Liderazgo en la Era IA', 'Guía equipos hacia la transformación digital con confianza. Desarrolla las habilidades de liderazgo necesarias para implementar IA en tu organización y gestionar el cambio tecnológico exitosamente.', '/thumbnails/liderazgo-ia.jpg', 'liderazgo-era-ia');

-- Insert lessons for Course 1: IA para Profesionales del Marketing
INSERT INTO lessons (course_id, title, content, video_url, order_index, slug) VALUES
(1, '¿Por qué el marketing tradicional ya no funciona?', 'En esta lección exploraremos cómo el panorama del marketing ha cambiado radicalmente en los últimos años. Analizaremos por qué las estrategias tradicionales están perdiendo efectividad y cómo la IA está creando nuevas oportunidades para conectar con audiencias de manera más personalizada y eficiente.

Veremos casos reales de empresas que han transformado sus resultados al adoptar herramientas de IA en sus estrategias de marketing. También identificaremos las señales que indican cuándo es momento de evolucionar tu enfoque de marketing tradicional hacia uno potenciado por inteligencia artificial.

Al final de esta lección, tendrás una comprensión clara de las limitaciones del marketing tradicional y las oportunidades que presenta la IA para revolucionar tu estrategia de marketing.', '/videos/marketing-lesson-1.mp4', 1, 'por-que-marketing-tradicional-no-funciona'),

(1, 'ChatGPT para crear copys que conviertan', 'Descubre cómo utilizar ChatGPT para crear textos publicitarios que realmente conviertan. En esta lección práctica, aprenderás las técnicas específicas de prompting que utilizan los copywriters más exitosos para generar contenido persuasivo.

Exploraremos diferentes tipos de copy: desde headlines magnéticos hasta descripciones de producto que impulsan las ventas. Te enseñaré mi framework probado para estructurar prompts que generen copys adaptados a tu audiencia específica y objetivos de conversión.

Incluye ejercicios prácticos donde crearás copys para diferentes industrias y canales, desde emails de venta hasta anuncios de redes sociales. Al finalizar, tendrás un arsenal de prompts listos para usar en tus campañas.', '/videos/marketing-lesson-2.mp4', 2, 'chatgpt-crear-copys-conviertan'),

(1, 'Automatizar redes sociales con IA', 'Aprende a crear un sistema completo de automatización para redes sociales usando herramientas de IA. Esta lección te guiará paso a paso para configurar flujos de trabajo que generen, programen y optimicen contenido automáticamente.

Cubriremos las mejores herramientas de IA para cada plataforma social, desde generadores de contenido hasta analizadores de engagement. También veremos cómo mantener la autenticidad de tu marca mientras automatizas la mayor parte del proceso.

Incluye plantillas y workflows listos para implementar, además de estrategias para medir y optimizar el rendimiento de tu contenido automatizado. Transformarás horas de trabajo manual en minutos de supervisión estratégica.', '/videos/marketing-lesson-3.mp4', 3, 'automatizar-redes-sociales-ia'),

(1, 'Análisis de competencia con IA', 'Domina el arte del análisis competitivo usando herramientas de inteligencia artificial. En esta lección aprenderás a obtener insights profundos sobre las estrategias de tus competidores de manera automatizada y sistemática.

Exploraremos herramientas de IA que pueden analizar el contenido, precios, estrategias de SEO y campañas publicitarias de tu competencia. También veremos cómo interpretar estos datos para identificar oportunidades de mercado y gaps en tu estrategia.

Te enseñaré a crear dashboards automatizados que monitoreen constantemente a tu competencia y te alerten sobre cambios importantes en sus estrategias. Incluye casos de estudio reales y plantillas para diferentes industrias.', '/videos/marketing-lesson-4.mp4', 4, 'analisis-competencia-ia'),

(1, 'Tu primer funnel automatizado con IA', 'Construye tu primer funnel de ventas completamente automatizado usando IA. Esta lección práctica te guiará desde la conceptualización hasta la implementación de un sistema que genere leads y ventas mientras duermes.

Aprenderás a usar IA para crear cada elemento del funnel: desde el lead magnet hasta los emails de seguimiento, pasando por las páginas de venta. También veremos cómo optimizar automáticamente cada paso basándose en el comportamiento de los usuarios.

Incluye plantillas de funnels probados para diferentes industrias, scripts de automatización y métricas clave para medir el éxito. Al finalizar, tendrás un funnel funcionando que puedes replicar y escalar para diferentes productos o servicios.', '/videos/marketing-lesson-5.mp4', 5, 'primer-funnel-automatizado-ia');

-- Insert lessons for Course 2: Excel + IA: Productividad Extrema
INSERT INTO lessons (course_id, title, content, video_url, order_index, slug) VALUES
(2, 'Adiós a las hojas de cálculo manuales', 'Descubre cómo la IA está transformando el trabajo con hojas de cálculo y por qué seguir haciendo todo manualmente te está costando tiempo y oportunidades. En esta lección introductoria, exploraremos las limitaciones del trabajo manual en Excel y las posibilidades que abre la integración con IA.

Analizaremos casos reales de profesionales que han reducido su tiempo de trabajo en Excel de horas a minutos usando herramientas de IA. También identificaremos qué tareas son ideales para automatizar y cuáles requieren supervisión humana.

Estableceremos las bases para tu transformación hacia un flujo de trabajo potenciado por IA, definiendo objetivos claros y métricas para medir tu progreso en productividad.', '/videos/excel-lesson-1.mp4', 1, 'adios-hojas-calculo-manuales'),

(2, 'GPT para fórmulas complejas', 'Aprende a usar ChatGPT como tu asistente personal para crear fórmulas de Excel complejas sin ser un experto en funciones. Esta lección práctica te enseñará técnicas específicas de prompting para generar fórmulas exactas para cualquier necesidad.

Cubriremos desde fórmulas básicas hasta funciones avanzadas como BUSCARV, SUMAR.SI.CONJUNTO, y fórmulas matriciales. También veremos cómo pedirle a GPT que explique fórmulas existentes y las optimice para mejor rendimiento.

Incluye una biblioteca de prompts probados para diferentes tipos de cálculos: financieros, estadísticos, de texto y fechas. Al finalizar, podrás crear cualquier fórmula que necesites, sin importar su complejidad.', '/videos/excel-lesson-2.mp4', 2, 'gpt-formulas-complejas'),

(2, 'Automatizar reportes con IA', 'Transforma la creación de reportes de una tarea tediosa a un proceso automatizado. En esta lección aprenderás a configurar sistemas que generen reportes ejecutivos actualizados automáticamente usando IA.

Exploraremos herramientas que pueden conectar Excel con fuentes de datos externas, procesar la información y generar insights automáticamente. También veremos cómo crear plantillas de reportes que se actualicen solas y generen comentarios inteligentes sobre los datos.

Incluye plantillas de reportes para diferentes departamentos: ventas, marketing, finanzas y operaciones. También aprenderás a configurar alertas automáticas cuando los datos muestren tendencias importantes.', '/videos/excel-lesson-3.mp4', 3, 'automatizar-reportes-ia'),

(2, 'Predicciones y análisis avanzado', 'Descubre cómo usar IA para convertir tus datos históricos en predicciones precisas y análisis avanzados. Esta lección te enseñará a implementar modelos predictivos directamente en Excel sin necesidad de conocimientos técnicos profundos.

Aprenderás a identificar patrones en tus datos, crear modelos de forecasting y generar escenarios "qué pasaría si" usando herramientas de IA. También cubriremos técnicas de análisis de tendencias y detección de anomalías.

Incluye casos prácticos para diferentes industrias: predicción de ventas, análisis de inventario, forecasting financiero y planificación de recursos. Al finalizar, podrás tomar decisiones basadas en predicciones confiables, no solo en datos históricos.', '/videos/excel-lesson-4.mp4', 4, 'predicciones-analisis-avanzado'),

(2, 'Dashboard ejecutivo en 30 minutos', 'Aprende a crear dashboards ejecutivos profesionales en tiempo récord usando IA. Esta lección práctica te guiará paso a paso para construir visualizaciones impactantes que comuniquen insights clave de manera efectiva.

Cubriremos las mejores prácticas de diseño de dashboards, selección de KPIs relevantes y uso de IA para generar visualizaciones automáticamente. También veremos cómo hacer que tus dashboards sean interactivos y se actualicen en tiempo real.

Incluye plantillas de dashboards para diferentes roles ejecutivos: CEO, CFO, CMO y COO. También aprenderás técnicas de storytelling con datos para que tus dashboards no solo muestren información, sino que cuenten una historia convincente.', '/videos/excel-lesson-5.mp4', 5, 'dashboard-ejecutivo-30-minutos');

-- Insert lessons for Course 3: Escritura Profesional con IA
INSERT INTO lessons (course_id, title, content, video_url, order_index, slug) VALUES
(3, 'La comunicación que marca la diferencia', 'Explora cómo la comunicación efectiva se ha convertido en la habilidad más valorada en el entorno empresarial moderno. En esta lección fundamental, analizaremos qué separa la comunicación promedio de la comunicación que realmente impacta y genera resultados.

Estudiaremos casos de líderes empresariales cuya comunicación ha transformado organizaciones y carreras. También identificaremos los elementos clave que hacen que un mensaje sea memorable, persuasivo y accionable en el contexto profesional actual.

Estableceremos los principios fundamentales de la comunicación potenciada por IA, definiendo cómo la tecnología puede amplificar tu voz natural sin perder autenticidad. Al finalizar, tendrás una base sólida para desarrollar tu estilo de comunicación único y efectivo.', '/videos/escritura-lesson-1.mp4', 1, 'comunicacion-marca-diferencia'),

(3, 'Emails que se leen y responden', 'Domina el arte de escribir emails que no solo se abren, sino que generan respuestas y acciones. Esta lección práctica te enseñará las técnicas específicas para crear emails profesionales que destaquen en bandejas de entrada saturadas.

Aprenderás a usar IA para optimizar líneas de asunto, estructurar el contenido para máxima legibilidad y personalizar mensajes a escala. También cubriremos diferentes tipos de emails profesionales: seguimiento de ventas, comunicación interna, negociación y networking.

Incluye plantillas probadas para diferentes situaciones, técnicas de A/B testing automatizado y métricas para medir la efectividad de tus emails. Transformarás tu comunicación por email de una tarea rutinaria a una herramienta estratégica poderosa.', '/videos/escritura-lesson-2.mp4', 2, 'emails-se-leen-responden'),

(3, 'Propuestas comerciales ganadoras', 'Aprende a crear propuestas comerciales que se destaquen de la competencia y cierren más negocios. Esta lección te guiará a través del proceso completo de creación de propuestas usando IA para investigación, estructuración y personalización.

Cubriremos la anatomía de una propuesta ganadora: desde el análisis de necesidades hasta la presentación de soluciones y el cierre persuasivo. También veremos cómo usar IA para adaptar el tono y enfoque según el tipo de cliente y industria.

Incluye frameworks probados para diferentes tipos de propuestas: servicios profesionales, productos tecnológicos, consultorías y proyectos a largo plazo. Al finalizar, tendrás un sistema replicable para crear propuestas que conviertan consistentemente.', '/videos/escritura-lesson-3.mp4', 3, 'propuestas-comerciales-ganadoras'),

(3, 'Presentaciones que impactan', 'Transforma tus presentaciones de monólogos aburridos a experiencias que inspiran y persuaden. En esta lección aprenderás a usar IA para crear contenido de presentaciones que mantenga a tu audiencia comprometida y genere los resultados que buscas.

Exploraremos técnicas de storytelling empresarial, diseño de slides efectivos y uso de IA para generar contenido visual impactante. También cubriremos cómo adaptar tu mensaje según diferentes audiencias: ejecutivos, equipos técnicos, inversores y clientes.

Incluye plantillas de presentaciones para diferentes propósitos: pitch de ventas, reportes ejecutivos, propuestas de proyecto y presentaciones de resultados. También aprenderás técnicas de delivery que complementen tu contenido potenciado por IA.', '/videos/escritura-lesson-4.mp4', 4, 'presentaciones-impactan'),

(3, 'Tu style guide personal con IA', 'Desarrolla tu voz profesional única y consistente usando IA como tu editor personal. Esta lección final te ayudará a crear un style guide personalizado que refleje tu personalidad profesional mientras mantiene la efectividad en todas tus comunicaciones.

Aprenderás a entrenar herramientas de IA para que escriban en tu estilo específico, manteniendo consistencia en todos tus canales de comunicación. También cubriremos cómo adaptar tu voz según diferentes contextos sin perder autenticidad.

Incluye ejercicios para definir tu voz profesional, plantillas de style guides y técnicas para mantener consistencia a largo plazo. Al finalizar, tendrás un sistema completo para comunicarte de manera distintiva y efectiva en cualquier situación profesional.', '/videos/escritura-lesson-5.mp4', 5, 'style-guide-personal-ia');

-- Insert lessons for Course 4: Liderazgo en la Era IA
INSERT INTO lessons (course_id, title, content, video_url, order_index, slug) VALUES
(4, 'El líder que necesitan los equipos hoy', 'Descubre cómo el rol del liderazgo ha evolucionado en la era de la IA y qué habilidades necesitas desarrollar para guiar equipos exitosamente en este nuevo paradigma. Esta lección fundamental establece las bases del liderazgo moderno.

Analizaremos las diferencias entre el liderazgo tradicional y el liderazgo en la era IA, identificando las competencias clave que distinguen a los líderes exitosos de hoy. También exploraremos cómo la IA puede amplificar tus capacidades de liderazgo sin reemplazar el elemento humano esencial.

Estudiaremos casos de líderes que han navegado exitosamente la transformación digital en sus organizaciones, extrayendo lecciones prácticas que puedes aplicar inmediatamente. Al finalizar, tendrás una visión clara de tu evolución como líder en la era IA.', '/videos/liderazgo-lesson-1.mp4', 1, 'lider-necesitan-equipos-hoy'),

(4, 'Integrar IA en procesos de equipo', 'Aprende metodologías probadas para introducir herramientas de IA en tu equipo de manera efectiva y sin resistencia. Esta lección práctica te guiará a través del proceso completo de adopción tecnológica, desde la evaluación inicial hasta la implementación exitosa.

Cubriremos estrategias para identificar qué procesos son ideales para automatizar, cómo seleccionar las herramientas adecuadas y cómo entrenar a tu equipo para adoptarlas efectivamente. También abordaremos la gestión de la resistencia al cambio y cómo convertir a los escépticos en defensores.

Incluye frameworks de evaluación, planes de implementación paso a paso y métricas para medir el éxito de la adopción. También aprenderás a crear una cultura de innovación continua donde la experimentación con IA sea parte natural del trabajo diario.', '/videos/liderazgo-lesson-2.mp4', 2, 'integrar-ia-procesos-equipo'),

(4, 'Decisiones basadas en datos + IA', 'Transforma tu proceso de toma de decisiones combinando intuición de liderazgo con insights potenciados por IA. Esta lección te enseñará a usar datos e inteligencia artificial para tomar decisiones más informadas y precisas sin perder la agilidad ejecutiva.

Exploraremos herramientas de IA que pueden analizar grandes volúmenes de datos y presentar insights accionables en tiempo real. También cubriremos cómo balancear la información cuantitativa con factores cualitativos y la intuición de liderazgo.

Incluye casos de estudio de decisiones empresariales críticas tomadas con apoyo de IA, frameworks para estructurar el proceso de decisión y técnicas para comunicar decisiones basadas en datos a diferentes stakeholders. Desarrollarás confianza para tomar decisiones complejas con mayor precisión.', '/videos/liderazgo-lesson-3.mp4', 3, 'decisiones-datos-ia'),

(4, 'Gestionar el cambio tecnológico', 'Domina las habilidades esenciales para liderar transformaciones tecnológicas exitosas en tu organización. Esta lección te proporcionará un framework completo para gestionar el cambio, desde la planificación estratégica hasta la ejecución y sostenibilidad.

Aprenderás a identificar y superar las barreras más comunes en la adopción de tecnología, cómo comunicar la visión de cambio de manera convincente y cómo mantener el momentum durante todo el proceso de transformación.

Cubriremos técnicas específicas para diferentes tipos de resistencia: técnica, cultural y organizacional. También veremos cómo crear quick wins que generen confianza y apoyo para iniciativas más ambiciosas. Incluye plantillas de comunicación y planes de gestión del cambio probados en organizaciones reales.', '/videos/liderazgo-lesson-4.mp4', 4, 'gestionar-cambio-tecnologico'),

(4, 'Tu plan de transformación digital', 'Crea tu roadmap personalizado para liderar la transformación digital de tu área u organización. Esta lección final integra todo lo aprendido en un plan de acción concreto y ejecutable que puedes implementar inmediatamente.

Te guiaré a través del proceso de evaluación de tu situación actual, definición de objetivos de transformación y creación de un plan de implementación por fases. También cubriremos cómo asegurar recursos, construir coaliciones de apoyo y medir el progreso.

Incluye plantillas de planes de transformación para diferentes tamaños de organización, métricas de éxito y estrategias para mantener el momentum a largo plazo. Al finalizar, tendrás un plan detallado y las herramientas necesarias para convertirte en el líder de transformación que tu organización necesita.', '/videos/liderazgo-lesson-5.mp4', 5, 'plan-transformacion-digital');

-- Insert sample user progress data (using simple integer user IDs)
INSERT INTO user_progress (user_id, lesson_id, completed, completed_at) VALUES
-- User 1 has completed first course and is working on second
(1, 1, true, '2024-01-10 10:30:00'),
(1, 2, true, '2024-01-11 14:15:00'),
(1, 3, true, '2024-01-12 09:45:00'),
(1, 4, true, '2024-01-13 16:20:00'),
(1, 5, true, '2024-01-14 11:10:00'),
(1, 6, true, '2024-01-15 13:30:00'),
(1, 7, true, '2024-01-16 10:45:00'),
(1, 8, false, null),

-- User 2 is progressing through first and third courses
(2, 1, true, '2024-01-08 09:15:00'),
(2, 2, true, '2024-01-09 15:30:00'),
(2, 3, true, '2024-01-10 11:20:00'),
(2, 11, true, '2024-01-12 14:45:00'),
(2, 12, true, '2024-01-13 10:30:00'),
(2, 13, false, null),

-- User 3 is working on leadership course
(3, 16, true, '2024-01-05 08:30:00'),
(3, 17, true, '2024-01-07 16:15:00'),
(3, 18, true, '2024-01-09 12:45:00'),
(3, 19, false, null);
