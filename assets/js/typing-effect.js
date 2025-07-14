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
        
        // Guardar contenido original
        this.originalContent = {
            title: this.heroTitle.innerHTML,
            subtitle: this.heroSubtitle.innerHTML,
            buttons: this.heroButtons.innerHTML
        };
        
        // Configuración del efecto
        this.typingSpeed = 8; // Velocidad ajustada para más contenido
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
        
        // Ocultar la navegación
        if (this.navContainer) {
            this.navContainer.style.opacity = '0';
            this.navContainer.style.visibility = 'hidden';
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
        
        // Mostrar la navegación
        if (this.navContainer) {
            this.navContainer.style.transition = 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out';
            this.navContainer.style.opacity = '1';
            this.navContainer.style.visibility = 'visible';
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
        
        // Crear el código HTML completo con las traducciones
        const greeting = translations.hero.greeting;
        const name = translations.hero.name;
        const subtitle = translations.hero.subtitle;
        const viewProjects = translations.hero.viewProjects;
        const contact = translations.hero.contact;
        
        const codeToType = `&lt;div class="hero-content"&gt;
    &lt;h1&gt;${greeting} &lt;span class="highlight"&gt;${name}&lt;/span&gt;&lt;/h1&gt;
    &lt;p&gt;${subtitle}&lt;/p&gt;
    &lt;div class="hero-buttons"&gt;
        &lt;a href="#proyectos" class="btn btn-primary"&gt;${viewProjects}&lt;/a&gt;
        &lt;a href="#contacto" class="btn btn-secondary"&gt;${contact}&lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;`;
        
        let currentCode = '';
        let coloredCode = '';
        
        // Crear un contenedor temporal para el código
        const codeContainer = document.createElement('div');
        codeContainer.style.cssText = `
            font-family: 'Inter', monospace;
            font-size: 1.5rem;
            line-height: 1.6;
            color: #1f2937;
            background:rgba(255, 255, 255, 0);
            padding: 0;
            white-space: pre-wrap;
            font-weight: 400;
            max-width: 100%;
            overflow-x: auto;
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
            
            // Aplicar colores al código
            coloredCode = currentCode
                .replace(/&lt;/g, '<span style="color: #ef4444;">&lt;</span>')
                .replace(/&gt;/g, '<span style="color: #ef4444;">&gt;</span>')
                .replace(/class=/g, '<span style="color: #3b82f6;">class=</span>')
                .replace(/href=/g, '<span style="color: #3b82f6;">href=</span>')
                .replace(/"highlight"/g, '<span style="color: #10b981;">"highlight"</span>')
                .replace(/"hero-subtitle"/g, '<span style="color: #10b981;">"hero-subtitle"</span>')
                .replace(/"hero-buttons"/g, '<span style="color: #10b981;">"hero-buttons"</span>')
                .replace(/"btn btn-primary"/g, '<span style="color: #10b981;">"btn btn-primary"</span>')
                .replace(/"btn btn-secondary"/g, '<span style="color: #10b981;">"btn btn-secondary"</span>')
                .replace(/"#proyectos"/g, '<span style="color: #10b981;">"#proyectos"</span>')
                .replace(/"#contacto"/g, '<span style="color: #10b981;">"#contacto"</span>')
                .replace(/"hero-content"/g, '<span style="color: #10b981;">"hero-content"</span>');
            
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
        // Mostrar subtítulo
        this.heroSubtitle.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        this.heroSubtitle.style.opacity = '1';
        this.heroSubtitle.style.transform = 'translateY(0)';
        await this.delay(200);
        
        // Mostrar botones
        this.heroButtons.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        this.heroButtons.style.opacity = '1';
        this.heroButtons.style.transform = 'translateY(0)';
        await this.delay(200);
        
        // Mostrar imagen
        this.heroImage.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        this.heroImage.style.opacity = '1';
        this.heroImage.style.transform = 'translateX(0)';
        await this.delay(400);
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