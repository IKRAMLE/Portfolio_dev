
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ar' | 'fr' | 'es' | 'tr';

// Context props interface
interface LanguageContextProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  changeLanguage: () => {},
  t: (key: string) => key,
});

// Define translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.certificates': 'Certificates',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.greeting': 'Hello, I am',
    'hero.title': 'IKRAM LECHQER',
    'hero.subtitle': 'Computer Engineering Student & Full Stack Developer',
    'hero.cta': 'View My Work',
    
    // About section
    'about.title': 'About Me',
    'about.description': 'A highly motivated and detail-oriented 4th-year Computer Engineering student with a strong passion for web development, software engineering, and emerging technologies. Skilled in front-end and back-end development, with experience in modern frameworks and databases. Enthusiastic about building innovative, user-friendly, and scalable web applications. Continuously exploring new technologies to enhance problem-solving abilities and stay up to date with industry trends. Eager to contribute technical expertise and creativity to challenging projects in a collaborative environment.',
    
    // Education section
    'education.title': 'Education',
    'education.karabuk.title': 'Bachelor\'s degree, Computer Engineering',
    'education.karabuk.institution': 'Karabuk University',
    'education.karabuk.date': 'Oct 2021 - Oct 2025',
    'education.gomycode.title': 'Software Bootcamp',
    'education.gomycode.institution': 'GOMYCODE',
    'education.gomycode.date': 'Nov 2024 - Apr 2025',
    'education.turkish.title': 'Turkish Language Certificate',
    'education.turkish.institution': 'Karabuk University',
    'education.turkish.date': 'Oct 2020 - May 2021',
    'education.turkish.grade': 'Grade: B2',
    'education.highschool.title': 'High School Degree with Honor',
    'education.highschool.institution': 'Moulay Idriss 1er, Casablanca, Morocco',
    'education.highschool.date': '2017 - 2020',
    
    // Skills section
    'skills.title': 'Skills',
    'skills.languages.title': 'Languages',
    'skills.languages.amazigh': 'Amazigh (Native)',
    'skills.languages.arabic': 'Arabic (Native)',
    'skills.languages.french': 'French (B1)',
    'skills.languages.english': 'English (B2)',
    'skills.languages.turkish': 'Turkish (B2)',
    'skills.programming.title': 'Programming Skills',
    
    // Projects section
    'projects.title': 'Projects',
    'projects.travel.title': 'Travel Agency, Restaurant & E-Commerce Landing Pages',
    'projects.travel.tech': 'Technologies: HTML, Tailwind CSS, JavaScript (DOM Manipulation)',
    'projects.travel.description1': 'Designed modern, responsive, and user-friendly landing pages for a travel agency, restaurant, and e-commerce store',
    'projects.travel.description2': 'Focused on UI/UX optimization, enhancing accessibility and user engagement',
    'projects.travel.description3': 'Implemented dynamic DOM interactions for a seamless and interactive user experience',
    
    'projects.bakery.title': 'Bakery Website',
    'projects.bakery.tech': 'Technologies: HTML, CSS',
    'projects.bakery.description1': 'Designed a clean and elegant showcase website for a bakery',
    'projects.bakery.description2': 'Ensured cross-device compatibility for an optimal browsing experience',
    
    'projects.movie.title': 'MovieApp (MERN Stack)',
    'projects.movie.tech': 'Technologies: React.js, Tailwind CSS, Node.js, Express.js, MongoDB, TMDB API',
    'projects.movie.description1': 'Developed a full-stack movie application with a scalable architecture',
    'projects.movie.description2': 'Integrated TMDB API to display real-time movie data',
    'projects.movie.description3': 'Built secure backend routes for movie details including title, release year, trailer, rating, and synopsis',
    'projects.movie.description4': 'Implemented manual movie addition, a favorites section, and intuitive UI components',
    
    // Certificates section
    'certificates.title': 'Certificates',
    'certificates.jsalgo.title': 'JavaScript Algorithms and Data Structures',
    'certificates.jsalgo.issuer': 'freeCodeCamp',
    'certificates.jsalgo.date': 'Issued Feb 2025',
    'certificates.jsalgo.credential': 'Credential ID koukky-jaads',
    
    'certificates.postman.title': 'Postman API Fundamentals',
    'certificates.postman.issuer': 'Postman',
    'certificates.postman.date': 'Issued Feb 2025',
    
    'certificates.webdesign.title': 'Responsive Web Design',
    'certificates.webdesign.issuer': 'freeCodeCamp',
    'certificates.webdesign.date': 'Issued Jan 2025',
    'certificates.webdesign.credential': 'Credential ID koukky-rwd',
    
    'certificates.oracle.title': 'Database Design and Programming with SQL',
    'certificates.oracle.issuer': 'Oracle Academy',
    
    // Contact section
    'contact.title': 'Contact Me',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.rights': 'All Rights Reserved',
    'footer.madeby': 'Made with ❤️ by IKRAM LECHQER'
  },
  ar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة عني',
    'nav.education': 'التعليم',
    'nav.skills': 'المهارات',
    'nav.projects': 'المشاريع',
    'nav.certificates': 'الشهادات',
    'nav.contact': 'اتصل بي',
    
    // Hero section
    'hero.greeting': 'مرحباً، أنا',
    'hero.title': 'إكرام لشقر',
    'hero.subtitle': 'طالبة هندسة حاسوب ومطورة ويب متكاملة',
    'hero.cta': 'عرض أعمالي',
    
    // About section
    'about.title': 'نبذة عني',
    'about.description': 'طالبة هندسة كمبيوتر في السنة الرابعة، متحمسة ودقيقة في التفاصيل، ولدي شغف كبير بتطوير الويب وهندسة البرمجيات والتقنيات الناشئة. ماهرة في تطوير الواجهة الأمامية والخلفية، مع خبرة في الأطر والقواعد البيانات الحديثة. متحمسة لبناء تطبيقات ويب مبتكرة وسهلة الاستخدام وقابلة للتوسع. أستكشف باستمرار تقنيات جديدة لتعزيز قدراتي في حل المشكلات والبقاء على اطلاع بأحدث التطورات. متحمسة للمساهمة بخبرتي التقنية وإبداعي في المشاريع الصعبة ضمن بيئة تعاونية.',
    
    // Education section
    'education.title': 'التعليم',
    'education.karabuk.title': 'بكالوريوس، هندسة الحاسوب',
    'education.karabuk.institution': 'جامعة كارابوك',
    'education.karabuk.date': 'أكتوبر 2021 - أكتوبر 2025',
    'education.gomycode.title': 'معسكر تدريبي للبرمجيات',
    'education.gomycode.institution': 'GOMYCODE',
    'education.gomycode.date': 'نوفمبر 2024 - أبريل 2025',
    'education.turkish.title': 'شهادة اللغة التركية',
    'education.turkish.institution': 'جامعة كارابوك',
    'education.turkish.date': 'أكتوبر 2020 - مايو 2021',
    'education.turkish.grade': 'الدرجة: B2',
    'education.highschool.title': 'شهادة الثانوية بمرتبة الشرف',
    'education.highschool.institution': 'مولاي إدريس الأول، الدار البيضاء، المغرب',
    'education.highschool.date': '2017 - 2020',
    
    // Skills section
    'skills.title': 'المهارات',
    'skills.languages.title': 'اللغات',
    'skills.languages.amazigh': 'الأمازيغية (لغة أم)',
    'skills.languages.arabic': 'العربية (لغة أم)',
    'skills.languages.french': 'الفرنسية (B1)',
    'skills.languages.english': 'الإنجليزية (B2)',
    'skills.languages.turkish': 'التركية (B2)',
    'skills.programming.title': 'مهارات البرمجة',
    
    // Projects section
    'projects.title': 'المشاريع',
    'projects.travel.title': 'صفحات هبوط لوكالة سفر ومطعم ومتجر إلكتروني',
    'projects.travel.tech': 'التقنيات: HTML، Tailwind CSS، JavaScript (معالجة DOM)',
    'projects.travel.description1': 'تصميم صفحات هبوط حديثة ومتجاوبة وسهلة الاستخدام لوكالة سفر ومطعم ومتجر إلكتروني',
    'projects.travel.description2': 'تركيز على تحسين واجهة المستخدم وتجربة المستخدم وتعزيز إمكانية الوصول والمشاركة',
    'projects.travel.description3': 'تنفيذ تفاعلات DOM ديناميكية لتجربة مستخدم سلسة وتفاعلية',
    
    'projects.bakery.title': 'موقع مخبز',
    'projects.bakery.tech': 'التقنيات: HTML، CSS',
    'projects.bakery.description1': 'تصميم موقع عرض أنيق ونظيف لمخبز',
    'projects.bakery.description2': 'ضمان التوافق عبر مختلف الأجهزة لتجربة تصفح مثالية',
    
    'projects.movie.title': 'تطبيق أفلام (MERN Stack)',
    'projects.movie.tech': 'التقنيات: React.js، Tailwind CSS، Node.js، Express.js، MongoDB، TMDB API',
    'projects.movie.description1': 'تطوير تطبيق أفلام متكامل بهيكلية قابلة للتوسع',
    'projects.movie.description2': 'دمج TMDB API لعرض بيانات الأفلام في الوقت الفعلي',
    'projects.movie.description3': 'بناء مسارات خلفية آمنة لتفاصيل الفيلم بما في ذلك العنوان وسنة الإصدار والمقطع الدعائي والتقييم والملخص',
    'projects.movie.description4': 'تنفيذ إضافة الأفلام يدويًا وقسم المفضلة ومكونات واجهة مستخدم بديهية',
    
    // Certificates section
    'certificates.title': 'الشهادات',
    'certificates.jsalgo.title': 'خوارزميات وهياكل بيانات JavaScript',
    'certificates.jsalgo.issuer': 'freeCodeCamp',
    'certificates.jsalgo.date': 'صدرت في فبراير 2025',
    'certificates.jsalgo.credential': 'رقم الشهادة koukky-jaads',
    
    'certificates.postman.title': 'أساسيات Postman API',
    'certificates.postman.issuer': 'Postman',
    'certificates.postman.date': 'صدرت في فبراير 2025',
    
    'certificates.webdesign.title': 'تصميم الويب المتجاوب',
    'certificates.webdesign.issuer': 'freeCodeCamp',
    'certificates.webdesign.date': 'صدرت في يناير 2025',
    'certificates.webdesign.credential': 'رقم الشهادة koukky-rwd',
    
    'certificates.oracle.title': 'تصميم قواعد البيانات والبرمجة بلغة SQL',
    'certificates.oracle.issuer': 'أكاديمية أوراكل',
    
    // Contact section
    'contact.title': 'اتصل بي',
    'contact.name': 'الاسم',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.madeby': 'صنع بـ ❤️ بواسطة إكرام لشقر'
  },
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.education': 'Éducation',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.certificates': 'Certificats',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.greeting': 'Bonjour, je suis',
    'hero.title': 'IKRAM LECHQER',
    'hero.subtitle': 'Étudiante en Génie Informatique & Développeuse Full Stack',
    'hero.cta': 'Voir Mon Travail',
    
    // About section
    'about.title': 'À Propos de Moi',
    'about.description': 'Étudiante en 4ème année de Génie Informatique, motivée et soucieuse du détail, avec une forte passion pour le développement web, l\'ingénierie logicielle et les technologies émergentes. Compétente en développement front-end et back-end, avec une expérience dans les frameworks modernes et les bases de données. Enthousiaste à l\'idée de créer des applications web innovantes, conviviales et évolutives. Explorant continuellement de nouvelles technologies pour améliorer mes capacités de résolution de problèmes et rester à jour avec les tendances de l\'industrie. Désireuse de contribuer avec mon expertise technique et ma créativité à des projets stimulants dans un environnement collaboratif.',
    
    // Education section
    'education.title': 'Formation',
    'education.karabuk.title': 'Licence, Génie Informatique',
    'education.karabuk.institution': 'Université de Karabük',
    'education.karabuk.date': 'Oct 2021 - Oct 2025',
    'education.gomycode.title': 'Bootcamp de Développement',
    'education.gomycode.institution': 'GOMYCODE',
    'education.gomycode.date': 'Nov 2024 - Avr 2025',
    'education.turkish.title': 'Certificat de Langue Turque',
    'education.turkish.institution': 'Université de Karabük',
    'education.turkish.date': 'Oct 2020 - Mai 2021',
    'education.turkish.grade': 'Niveau: B2',
    'education.highschool.title': 'Baccalauréat avec Mention',
    'education.highschool.institution': 'Moulay Idriss 1er, Casablanca, Maroc',
    'education.highschool.date': '2017 - 2020',
    
    // Skills section
    'skills.title': 'Compétences',
    'skills.languages.title': 'Langues',
    'skills.languages.amazigh': 'Amazigh (Natif)',
    'skills.languages.arabic': 'Arabe (Natif)',
    'skills.languages.french': 'Français (B1)',
    'skills.languages.english': 'Anglais (B2)',
    'skills.languages.turkish': 'Turc (B2)',
    'skills.programming.title': 'Compétences en Programmation',
    
    // Projects section
    'projects.title': 'Projets',
    'projects.travel.title': 'Pages d\'Accueil pour Agence de Voyage, Restaurant et E-Commerce',
    'projects.travel.tech': 'Technologies: HTML, Tailwind CSS, JavaScript (Manipulation DOM)',
    'projects.travel.description1': 'Conception de pages d\'accueil modernes, responsives et conviviales pour une agence de voyage, un restaurant et une boutique e-commerce',
    'projects.travel.description2': 'Accent sur l\'optimisation UI/UX, amélioration de l\'accessibilité et de l\'engagement utilisateur',
    'projects.travel.description3': 'Implémentation d\'interactions DOM dynamiques pour une expérience utilisateur fluide et interactive',
    
    'projects.bakery.title': 'Site Web de Boulangerie',
    'projects.bakery.tech': 'Technologies: HTML, CSS',
    'projects.bakery.description1': 'Conception d\'un site vitrine élégant et épuré pour une boulangerie',
    'projects.bakery.description2': 'Compatibilité multi-appareils pour une expérience de navigation optimale',
    
    'projects.movie.title': 'Application de Films (MERN Stack)',
    'projects.movie.tech': 'Technologies: React.js, Tailwind CSS, Node.js, Express.js, MongoDB, TMDB API',
    'projects.movie.description1': 'Développement d\'une application de films full-stack avec une architecture évolutive',
    'projects.movie.description2': 'Intégration de l\'API TMDB pour afficher des données de films en temps réel',
    'projects.movie.description3': 'Construction de routes backend sécurisées pour les détails des films incluant titre, année de sortie, bande-annonce, note et synopsis',
    'projects.movie.description4': 'Implémentation d\'ajout manuel de films, d\'une section favoris et de composants UI intuitifs',
    
    // Certificates section
    'certificates.title': 'Certificats',
    'certificates.jsalgo.title': 'Algorithmes et Structures de Données JavaScript',
    'certificates.jsalgo.issuer': 'freeCodeCamp',
    'certificates.jsalgo.date': 'Délivré en Fév 2025',
    'certificates.jsalgo.credential': 'ID Certificat koukky-jaads',
    
    'certificates.postman.title': 'Fondamentaux API Postman',
    'certificates.postman.issuer': 'Postman',
    'certificates.postman.date': 'Délivré en Fév 2025',
    
    'certificates.webdesign.title': 'Conception Web Responsive',
    'certificates.webdesign.issuer': 'freeCodeCamp',
    'certificates.webdesign.date': 'Délivré en Jan 2025',
    'certificates.webdesign.credential': 'ID Certificat koukky-rwd',
    
    'certificates.oracle.title': 'Conception de Base de Données et Programmation avec SQL',
    'certificates.oracle.issuer': 'Oracle Academy',
    
    // Contact section
    'contact.title': 'Me Contacter',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    
    // Footer
    'footer.rights': 'Tous Droits Réservés',
    'footer.madeby': 'Créé avec ❤️ par IKRAM LECHQER'
  },
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mí',
    'nav.education': 'Educación',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.certificates': 'Certificados',
    'nav.contact': 'Contacto',
    
    // Hero section
    'hero.greeting': 'Hola, soy',
    'hero.title': 'IKRAM LECHQER',
    'hero.subtitle': 'Estudiante de Ingeniería Informática y Desarrolladora Full Stack',
    'hero.cta': 'Ver Mi Trabajo',
    
    // About section
    'about.title': 'Sobre Mí',
    'about.description': 'Estudiante de Ingeniería Informática de cuarto año, motivada y orientada al detalle, con una gran pasión por el desarrollo web, la ingeniería de software y las tecnologías emergentes. Habilidosa en desarrollo front-end y back-end, con experiencia en frameworks modernos y bases de datos. Entusiasta en la creación de aplicaciones web innovadoras, amigables y escalables. Explorando continuamente nuevas tecnologías para mejorar las habilidades de resolución de problemas y mantenerme al día con las tendencias de la industria. Deseosa de contribuir con experiencia técnica y creatividad a proyectos desafiantes en un entorno colaborativo.',
    
    // Education section
    'education.title': 'Educación',
    'education.karabuk.title': 'Licenciatura en Ingeniería Informática',
    'education.karabuk.institution': 'Universidad de Karabük',
    'education.karabuk.date': 'Oct 2021 - Oct 2025',
    'education.gomycode.title': 'Bootcamp de Software',
    'education.gomycode.institution': 'GOMYCODE',
    'education.gomycode.date': 'Nov 2024 - Abr 2025',
    'education.turkish.title': 'Certificado de Idioma Turco',
    'education.turkish.institution': 'Universidad de Karabük',
    'education.turkish.date': 'Oct 2020 - May 2021',
    'education.turkish.grade': 'Nivel: B2',
    'education.highschool.title': 'Diploma de Bachillerato con Honor',
    'education.highschool.institution': 'Moulay Idriss 1er, Casablanca, Marruecos',
    'education.highschool.date': '2017 - 2020',
    
    // Skills section
    'skills.title': 'Habilidades',
    'skills.languages.title': 'Idiomas',
    'skills.languages.amazigh': 'Amazigh (Nativo)',
    'skills.languages.arabic': 'Árabe (Nativo)',
    'skills.languages.french': 'Francés (B1)',
    'skills.languages.english': 'Inglés (B2)',
    'skills.languages.turkish': 'Turco (B2)',
    'skills.programming.title': 'Habilidades de Programación',
    
    // Projects section
    'projects.title': 'Proyectos',
    'projects.travel.title': 'Landing Pages de Agencia de Viajes, Restaurante y Tienda E-Commerce',
    'projects.travel.tech': 'Tecnologías: HTML, Tailwind CSS, JavaScript (Manipulación DOM)',
    'projects.travel.description1': 'Diseño de landing pages modernas, responsivas y amigables para una agencia de viajes, restaurante y tienda de comercio electrónico',
    'projects.travel.description2': 'Enfoque en optimización UI/UX, mejorando accesibilidad y participación del usuario',
    'projects.travel.description3': 'Implementación de interacciones DOM dinámicas para una experiencia de usuario fluida e interactiva',
    
    'projects.bakery.title': 'Sitio Web de Panadería',
    'projects.bakery.tech': 'Tecnologías: HTML, CSS',
    'projects.bakery.description1': 'Diseño de un sitio web limpio y elegante para una panadería',
    'projects.bakery.description2': 'Compatibilidad entre dispositivos para una experiencia de navegación óptima',
    
    'projects.movie.title': 'Aplicación de Películas (MERN Stack)',
    'projects.movie.tech': 'Tecnologías: React.js, Tailwind CSS, Node.js, Express.js, MongoDB, TMDB API',
    'projects.movie.description1': 'Desarrollo de una aplicación de películas full-stack con arquitectura escalable',
    'projects.movie.description2': 'Integración de TMDB API para mostrar datos de películas en tiempo real',
    'projects.movie.description3': 'Construcción de rutas backend seguras para detalles de películas incluyendo título, año de lanzamiento, tráiler, calificación y sinopsis',
    'projects.movie.description4': 'Implementación de adición manual de películas, sección de favoritos y componentes UI intuitivos',
    
    // Certificates section
    'certificates.title': 'Certificados',
    'certificates.jsalgo.title': 'Algoritmos y Estructuras de Datos JavaScript',
    'certificates.jsalgo.issuer': 'freeCodeCamp',
    'certificates.jsalgo.date': 'Emitido en Feb 2025',
    'certificates.jsalgo.credential': 'ID de Credencial koukky-jaads',
    
    'certificates.postman.title': 'Fundamentos de API Postman',
    'certificates.postman.issuer': 'Postman',
    'certificates.postman.date': 'Emitido en Feb 2025',
    
    'certificates.webdesign.title': 'Diseño Web Responsivo',
    'certificates.webdesign.issuer': 'freeCodeCamp',
    'certificates.webdesign.date': 'Emitido en Ene 2025',
    'certificates.webdesign.credential': 'ID de Credencial koukky-rwd',
    
    'certificates.oracle.title': 'Diseño de Base de Datos y Programación con SQL',
    'certificates.oracle.issuer': 'Oracle Academy',
    
    // Contact section
    'contact.title': 'Contáctame',
    'contact.name': 'Nombre',
    'contact.email': 'Correo',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    
    // Footer
    'footer.rights': 'Todos los Derechos Reservados',
    'footer.madeby': 'Hecho con ❤️ por IKRAM LECHQER'
  },
  tr: {
    // Header
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.education': 'Eğitim',
    'nav.skills': 'Yetenekler',
    'nav.projects': 'Projeler',
    'nav.certificates': 'Sertifikalar',
    'nav.contact': 'İletişim',
    
    // Hero section
    'hero.greeting': 'Merhaba, ben',
    'hero.title': 'IKRAM LECHQER',
    'hero.subtitle': 'Bilgisayar Mühendisliği Öğrencisi ve Full Stack Geliştirici',
    'hero.cta': 'Çalışmalarımı Gör',
    
    // About section
    'about.title': 'Hakkımda',
    'about.description': 'Web geliştirme, yazılım mühendisliği ve yeni teknolojilere büyük bir tutkusu olan, motive ve detay odaklı 4. sınıf Bilgisayar Mühendisliği öğrencisi. Modern framework\'ler ve veritabanlarında deneyimli, ön uç ve arka uç geliştirmede yetenekli. Yenilikçi, kullanıcı dostu ve ölçeklenebilir web uygulamaları oluşturma konusunda hevesli. Problem çözme yeteneklerini geliştirmek ve sektör trendleriyle güncel kalmak için sürekli olarak yeni teknolojiler keşfeden. İşbirlikçi bir ortamda zorlu projelere teknik uzmanlık ve yaratıcılık katkısında bulunmaya istekli.',
    
    // Education section
    'education.title': 'Eğitim',
    'education.karabuk.title': 'Lisans, Bilgisayar Mühendisliği',
    'education.karabuk.institution': 'Karabük Üniversitesi',
    'education.karabuk.date': 'Ekim 2021 - Ekim 2025',
    'education.gomycode.title': 'Yazılım Bootcamp',
    'education.gomycode.institution': 'GOMYCODE',
    'education.gomycode.date': 'Kasım 2024 - Nisan 2025',
    'education.turkish.title': 'Türkçe Dil Sertifikası',
    'education.turkish.institution': 'Karabük Üniversitesi',
    'education.turkish.date': 'Ekim 2020 - Mayıs 2021',
    'education.turkish.grade': 'Seviye: B2',
    'education.highschool.title': 'Onur Dereceli Lise Diploması',
    'education.highschool.institution': 'Moulay Idriss 1er, Casablanca, Fas',
    'education.highschool.date': '2017 - 2020',
    
    // Skills section
    'skills.title': 'Yetenekler',
    'skills.languages.title': 'Diller',
    'skills.languages.amazigh': 'Amazigh (Anadil)',
    'skills.languages.arabic': 'Arapça (Anadil)',
    'skills.languages.french': 'Fransızca (B1)',
    'skills.languages.english': 'İngilizce (B2)',
    'skills.languages.turkish': 'Türkçe (B2)',
    'skills.programming.title': 'Programlama Becerileri',
    
    // Projects section
    'projects.title': 'Projeler',
    'projects.travel.title': 'Seyahat Acentesi, Restoran ve E-Ticaret Açılış Sayfaları',
    'projects.travel.tech': 'Teknolojiler: HTML, Tailwind CSS, JavaScript (DOM Manipülasyonu)',
    'projects.travel.description1': 'Seyahat acentesi, restoran ve e-ticaret mağazası için modern, duyarlı ve kullanıcı dostu açılış sayfaları tasarladım',
    'projects.travel.description2': 'UI/UX optimizasyonu, erişilebilirlik ve kullanıcı etkileşimini artırmaya odaklandım',
    'projects.travel.description3': 'Sorunsuz ve etkileşimli bir kullanıcı deneyimi için dinamik DOM etkileşimleri uyguladım',
    
    'projects.bakery.title': 'Fırın Web Sitesi',
    'projects.bakery.tech': 'Teknolojiler: HTML, CSS',
    'projects.bakery.description1': 'Bir fırın için temiz ve zarif bir vitrin web sitesi tasarladım',
    'projects.bakery.description2': 'Optimum tarama deneyimi için cihazlar arası uyumluluk sağladım',
    
    'projects.movie.title': 'Film Uygulaması (MERN Stack)',
    'projects.movie.tech': 'Teknolojiler: React.js, Tailwind CSS, Node.js, Express.js, MongoDB, TMDB API',
    'projects.movie.description1': 'Ölçeklenebilir bir mimariye sahip tam yığın film uygulaması geliştirdim',
    'projects.movie.description2': 'Gerçek zamanlı film verilerini görüntülemek için TMDB API entegrasyonu yaptım',
    'projects.movie.description3': 'Başlık, yayın yılı, fragman, derecelendirme ve özet dahil film detayları için güvenli backend rotaları oluşturdum',
    'projects.movie.description4': 'Manuel film ekleme, favoriler bölümü ve sezgisel UI bileşenleri uyguladım',
    
    // Certificates section
    'certificates.title': 'Sertifikalar',
    'certificates.jsalgo.title': 'JavaScript Algoritmaları ve Veri Yapıları',
    'certificates.jsalgo.issuer': 'freeCodeCamp',
    'certificates.jsalgo.date': 'Şubat 2025\'te verildi',
    'certificates.jsalgo.credential': 'Kimlik No koukky-jaads',
    
    'certificates.postman.title': 'Postman API Temelleri',
    'certificates.postman.issuer': 'Postman',
    'certificates.postman.date': 'Şubat 2025\'te verildi',
    
    'certificates.webdesign.title': 'Duyarlı Web Tasarımı',
    'certificates.webdesign.issuer': 'freeCodeCamp',
    'certificates.webdesign.date': 'Ocak 2025\'te verildi',
    'certificates.webdesign.credential': 'Kimlik No koukky-rwd',
    
    'certificates.oracle.title': 'Veritabanı Tasarımı ve SQL ile Programlama',
    'certificates.oracle.issuer': 'Oracle Academy',
    
    // Contact section
    'contact.title': 'Benimle İletişime Geç',
    'contact.name': 'İsim',
    'contact.email': 'E-posta',
    'contact.message': 'Mesaj',
    'contact.send': 'Mesaj Gönder',
    
    // Footer
    'footer.rights': 'Tüm Hakları Saklıdır',
    'footer.madeby': 'IKRAM LECHQER tarafından ❤️ ile yapıldı'
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for current language
  const [language, setLanguage] = useState<Language>('en');

  // Effect to check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Default to browser language if available and supported
      const browserLang = navigator.language.split('-')[0] as Language;
      if (Object.keys(translations).includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  // Function to change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Set document direction for RTL languages
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Add language-specific class to the body for CSS targeting
    document.body.className = document.body.className
      .replace(/lang-\w+/g, '')
      .trim();
    document.body.classList.add(`lang-${lang}`);
  };

  // Translation function
  const t = (key: string): string => {
    const langObj = translations[language];
    return langObj[key] || key;
  };

  // Set initial direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.add(`lang-${language}`);
    
    return () => {
      document.body.classList.remove(`lang-${language}`);
    };
  }, [language]);

  // Value to provide through context
  const contextValue = {
    language,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
