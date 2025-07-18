/**
 * Sistema de traducciones para el portafolio
 * Contiene todas las cadenas de texto en español e inglés
 */

const TRANSLATIONS = {
    es: {
        // Navegación
        nav: {
            home: "Inicio",
            about: "Sobre mí",
            projects: "Proyectos",
            skills: "Habilidades",
            contact: "Contacto"
        },
        
        // Hero Section
        hero: {
            greeting: "Hola, soy",
            name: "Samuel Delgado",
            subtitle: "Desarrollador Frontend apasionado por crear experiencias digitales excepcionales",
            viewProjects: "Ver Proyectos",
            contact: "Contactar"
        },
        
        // Sobre Mí
        about: {
            title: "Sobre Mí",
            paragraph1: "Soy un desarrollador frontend dedicado a crear interfaces de usuario intuitivas y atractivas. Me especializo en tecnologías modernas, siempre buscando la mejor experiencia para el usuario.",
            paragraph2: "Mi pasión por el desarrollo web me impulsa a estar constantemente aprendiendo nuevas tecnologías y mejores prácticas para crear soluciones digitales innovadoras."
        },
        
        // Proyectos
        projects: {
            title: "Mis Proyectos",
            randomGenerator: {
                title: "Random Generator",
                description: "Una aplicación para encriptar texto, con un diseño moderno y sencillo, tiene varios métodos de cifrado comunes y uno propio de mi diseño."
            },
            priceCreator: {
                title: "Creador de Rotulaciones",
                description: "Una aplicación para crear rotulaciones para tiendas o supermercados con diseños básicos, de forma rápida y eficiente, para impresión tamaño carta."
            },
            sarcastiCalc: {
                title: "SarcastiCalc",
                description: "Una calculadora web única que combina funcionalidad matemática con humor, easter eggs, sistema de vidas, efectos visuales y múltiples modos de juego. ¡La calculadora más divertida y completa del mundo!"
            },
            geekToolkit: {
                title: "Geek Toolkit",
                description: "Una colección de herramientas útiles para desarrolladores y entusiastas de la tecnología, construida con React y diseñada con una interfaz moderna y responsive."
            },
            technologies: "Tecnologías utilizadas:",
            viewProject: "Ver Proyecto",
            viewCode: "Ver Código"
        },
        
        // Habilidades
        skills: {
            title: "Habilidades",
            frontend: "Frontend",
            tools: "Herramientas & Otros"
        },
        
        // Contacto
        contact: {
            title: "Contacto",
            subtitle: "¡Conectemos!",
            description: "¿Te gustó mi trabajo? Me encantaría conectar contigo y explorar oportunidades de colaboración.",
            location: "San José, Costa Rica"
        },
        
        // Footer
        footer: {
            copyright: "© 2025 Samuel Delgado. Todos los derechos reservados."
        },
        
        // Selector de idioma
        language: {
            spanish: "Español",
            english: "Inglés"
        }
    },
    
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            projects: "Projects",
            skills: "Skills",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            greeting: "Hello, I'm",
            name: "Samuel Delgado",
            subtitle: "Frontend Developer passionate about creating exceptional digital experiences",
            viewProjects: "View Projects",
            contact: "Contact"
        },
        
        // About
        about: {
            title: "About Me",
            paragraph1: "I'm a frontend developer dedicated to creating intuitive and attractive user interfaces. I specialize in modern technologies, always seeking the best user experience.",
            paragraph2: "My passion for web development drives me to constantly learn new technologies and best practices to create innovative digital solutions."
        },
        
        // Projects
        projects: {
            title: "My Projects",
            randomGenerator: {
                title: "Random Generator",
                description: "An application to encrypt text, with a modern and simple design, featuring several common encryption methods and one of my own design."
            },
            priceCreator: {
                title: "Price Label Creator",
                description: "An application to create price labels for stores or supermarkets with basic designs, quickly and efficiently, for letter-size printing."
            },
            sarcastiCalc: {
                title: "SarcastiCalc",
                description: "A unique web calculator that combines mathematical functionality with humor, easter eggs, life system, visual effects and multiple game modes. The most fun and complete calculator in the world!"
            },
            geekToolkit: {
                title: "Geek Toolkit",
                description: "A collection of useful tools for developers and technology enthusiasts, built with React and designed with a modern and responsive interface."
            },
            technologies: "Technologies used:",
            viewProject: "View Project",
            viewCode: "View Code"
        },
        
        // Skills
        skills: {
            title: "Skills",
            frontend: "Frontend",
            tools: "Tools & Others"
        },
        
        // Contact
        contact: {
            title: "Contact",
            subtitle: "Let's Connect!",
            description: "Did you like my work? I'd love to connect with you and explore collaboration opportunities.",
            location: "San José, Costa Rica"
        },
        
        // Footer
        footer: {
            copyright: "© 2025 Samuel Delgado. All rights reserved."
        },
        
        // Language selector
        language: {
            spanish: "Spanish",
            english: "English"
        }
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TRANSLATIONS;
} 