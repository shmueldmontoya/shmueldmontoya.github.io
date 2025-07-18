/**
 * Efecto de Escritura de Código: aplicado a todo el contenido del hero-container
 */

class CodeTypingEffect {
    constructor() {
        this.heroContainer = document.querySelector('.hero-container');
        this.heroTitle = document.querySelector('.hero-title');
        this.heroSubtitle = document.querySelector('.hero-subtitle');
        this.heroButtons = document.querySelector('.hero-buttons');
        this.heroImage = document.querySelector('.hero-image');
        this.navContainer = document.querySelector('.nav-container');
        
        // Configuración del efecto
        this.typingSpeed = 20; // Velocidad ajustada para más contenido
        this.codeDelay = 200;
        this.transitionDelay = 300;
        
        // Ocultar elementos inicialmente
        this.hideElements();
        this.hideRestOfPage();
        this.hideScroll();
    }

    hideElements() {
        this.heroTitle.style.opacity = '0';
        this.heroSubtitle.style.opacity = '0';
        this.heroButtons.style.opacity = '0';
        this.heroImage.style.opacity = '0';
        this.heroImage.style.transform = 'translateX(50px)';
        
        // Ocultar la navegación completamente
        if (this.navContainer) {
            this.navContainer.style.opacity = '0';
            this.navContainer.style.visibility = 'hidden';
            this.navContainer.style.display = 'none';
        }
    }

    hideRestOfPage() {
        // Ocultar todas las secciones excepto el hero
        const sections = document.querySelectorAll('section:not(#inicio)');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.visibility = 'hidden';
        });
        
        // Ocultar footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.opacity = '0';
            footer.style.visibility = 'hidden';
        }
    }

    hideScroll() {
        // Ocultar scroll
        document.body.style.overflow = 'hidden';
    }

    showScroll() {
        // Mostrar scroll
        document.body.style.overflow = 'auto';
    }

    showRestOfPage() {
        // Mostrar todas las secciones
        const sections = document.querySelectorAll('section:not(#inicio)');
        sections.forEach(section => {
            section.style.transition = 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out';
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        });
        
        // Mostrar footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.transition = 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out';
            footer.style.opacity = '1';
            footer.style.visibility = 'visible';
        }
        
        // Mostrar la navegación completamente con fade in
        if (this.navContainer) {
            this.navContainer.style.display = '';
            this.navContainer.style.opacity = '0';
            this.navContainer.style.visibility = 'visible';
            this.navContainer.style.transition = 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out';
            // Forzar reflow para que la transición funcione
            void this.navContainer.offsetWidth;
            setTimeout(() => {
                this.navContainer.style.opacity = '1';
            }, 10);
        }
    }

    async startEffect() {
        await this.delay(this.codeDelay);
        await this.typeAllContent();
        await this.delay(this.transitionDelay);
        await this.fadeOutCode();
        await this.fadeInRealContent();
        await this.showRemainingElements();
        await this.showRestOfPage();
        this.showScroll();
    }

    async typeAllContent() {
        // Obtener el idioma actual y las traducciones correspondientes
        const currentLang = localStorage.getItem('portfolioLanguage') || 'es';
        const translations = TRANSLATIONS[currentLang];
        
        // Solo el h1 con saludo y nombre
        const greeting = translations.hero.greeting;
        const name = translations.hero.name;
        
        // Usar los caracteres reales < y >
        const codeToType = `<h1 class=\"hero-title\"> ${greeting} <span class=\"highlight\">${name}</span> </h1>`;
        
        let currentCode = '';
        let coloredCode = '';
        
        // Crear un contenedor temporal para el código
        const codeContainer = document.createElement('div');
        codeContainer.style.cssText = `
            font-family: 'Inter', monospace;
            font-size: 2rem;
            line-height: 1.2;
            color: #1f2937;
            background:rgba(255, 255, 255, 0);
            padding: 0;
            white-space: pre-wrap;
            font-weight: 400;
            max-width: 100%;
            overflow: hidden;
            text-align: left;
        `;
        
        // Ocultar elementos originales
        this.heroTitle.style.display = 'none';
        this.heroSubtitle.style.display = 'none';
        this.heroButtons.style.display = 'none';
        this.heroImage.style.display = 'none';
        
        // Limpiar el contenedor y agregar el contenedor de código
        this.heroContainer.innerHTML = '';
        this.heroContainer.appendChild(codeContainer);
        this.heroContainer.style.opacity = '1';
        
        for (let i = 0; i < codeToType.length; i++) {
            const char = codeToType[i];
            currentCode += char;
            
            // Escapar primero todo el string
            let escapedCode = currentCode
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            // Luego aplicar coloreado de sintaxis sobre el string escapado
            coloredCode = escapedCode
                // Colorear < y > en rojo
                .replace(/&lt;/g, '<span style="color: #ef4444;">&lt;</span>')
                .replace(/&gt;/g, '<span style="color: #ef4444;">&gt;</span>')
                // Colorear nombres de etiqueta (h1, span) en #a21caf, incluso si hay atributos
                .replace(/(<span style=\\?"color: #ef4444;">&lt;<\\?\/span>\/?)([a-zA-Z0-9]+)/g, function(match, p1, p2) {
                    if (['h1','span'].includes(p2)) {
                        return p1 + '<span style="color: #a21caf;">' + p2 + '</span>';
                    }
                    return match;
                })
                // Colorear class= en azul
                .replace(/class=/g, '<span style="color: #3b82f6;">class=</span>')
                // Colorear valores de clase
                .replace(/"hero-title"/g, '<span style="color: #10b981;">"hero-title"</span>')
                .replace(/"highlight"/g, '<span style="color: #10b981;">"highlight"</span>');
            
            codeContainer.innerHTML = coloredCode + '<span class="typing-cursor">|</span>';
            await this.delay(this.typingSpeed);
        }
        
        codeContainer.innerHTML = coloredCode; // Quitar cursor al final
    }

    async fadeOutCode() {
        this.heroContainer.style.transition = 'opacity 0.4s ease-in-out';
        this.heroContainer.style.opacity = '0';
        await this.delay(400);
    }

    async fadeInRealContent() {
        // Resetear todos los estilos del contenedor
        this.heroContainer.style.transition = 'opacity 0.6s ease-in-out';
        this.heroContainer.style.fontFamily = '';
        this.heroContainer.style.fontSize = '';
        this.heroContainer.style.textAlign = '';
        this.heroContainer.style.lineHeight = '';
        this.heroContainer.style.transform = 'none';
        this.heroContainer.style.whiteSpace = '';
        this.heroContainer.style.fontWeight = '';
        
        // Obtener el idioma actual y las traducciones correspondientes
        const currentLang = localStorage.getItem('portfolioLanguage') || 'es';
        const translations = TRANSLATIONS[currentLang];
        
        // Restaurar la estructura original del hero-container
        this.heroContainer.innerHTML = `
            <div class="hero-content">
                <h1 class="hero-title">${translations.hero.greeting} <span class="highlight">${translations.hero.name}</span></h1>
                <p class="hero-subtitle">${translations.hero.subtitle}</p>
                <div class="hero-buttons">
                    <a href="#proyectos" class="btn btn-primary">${translations.hero.viewProjects}</a>
                    <a href="#contacto" class="btn btn-secondary">${translations.hero.contact}</a>
                </div>
            </div>
            <div class="hero-image">
                <div class="profile-image">
                    <img src="assets/images/foto.png" alt="Samuel Delgado" class="profile-photo">
                </div>
            </div>
        `;
        
        // Reasignar referencias a los elementos
        this.heroTitle = this.heroContainer.querySelector('.hero-title');
        this.heroSubtitle = this.heroContainer.querySelector('.hero-subtitle');
        this.heroButtons = this.heroContainer.querySelector('.hero-buttons');
        this.heroImage = this.heroContainer.querySelector('.hero-image');        
        this.heroContainer.style.opacity = '1';
        await this.delay(300);
    }

    async showRemainingElements() {
        // Mostrar todos los elementos de golpe
        this.heroSubtitle.style.transition = 'opacity 0.1s ease-in-out, transform 0.1s ease-in-out';
        this.heroSubtitle.style.opacity = '1';
        this.heroSubtitle.style.transform = 'translateY(0)';
        this.heroButtons.style.transition = 'opacity 0.1s ease-in-out, transform 0.1s ease-in-out';
        this.heroButtons.style.opacity = '1';
        this.heroButtons.style.transform = 'translateY(0)';
        this.heroImage.style.transition = 'opacity 0.1s ease-in-out, transform 0.1s ease-in-out';
        this.heroImage.style.opacity = '1';
        this.heroImage.style.transform = 'translateX(0)';
        await this.delay(100);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Efecto de cursor parpadeante
function addTypingCursorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .typing-cursor {
            color: var(--primary-color);
            animation: blink 1s infinite;
            font-weight: bold;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar el efecto cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    addTypingCursorStyles();
    
    // Siempre mostrar el efecto de escritura al cargar la página
    const typingEffect = new CodeTypingEffect();
    typingEffect.startEffect();
}); 