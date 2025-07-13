/**
 * Efecto de Escritura de Código: solo typewriter con colores, luego fade out, luego fade in del título real.
 */

class CodeTypingEffect {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title');
        this.heroSubtitle = document.querySelector('.hero-subtitle');
        this.heroButtons = document.querySelector('.hero-buttons');
        this.heroImage = document.querySelector('.hero-image');
        this.originalTitle = this.heroTitle.innerHTML;
        this.originalSubtitle = this.heroSubtitle.innerHTML;
        this.originalButtons = this.heroButtons.innerHTML;
        
        // Configuración del efecto
        this.typingSpeed = 30; // Más rápido
        this.codeDelay = 200; // Menos delay inicial
        this.transitionDelay = 300; // Menos delay de transición
        
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
    }

    async startEffect() {
        await this.delay(this.codeDelay);
        await this.typeCode();
        await this.delay(this.transitionDelay);
        await this.fadeOutCode();
        await this.fadeInTitle();
        await this.showRemainingElements();
        await this.showRestOfPage(); // Mostrar el resto de la página al final
        this.showScroll(); // Mostrar scroll al final
    }

    async typeCode() {
        // Obtener el idioma actual y las traducciones correspondientes
        const currentLang = localStorage.getItem('portfolioLanguage') || 'es';
        const translations = TRANSLATIONS[currentLang];
        
        // Crear el código HTML con las traducciones
        const greeting = translations.hero.greeting;
        const name = translations.hero.name;
        const codeToType = `&lt;h1&gt;${greeting} &lt;span class="highlight"&gt;${name}&lt;/span&gt;&lt;/h1&gt;`;
        
        let currentCode = '';
        let coloredCode = ''; // Mover declaración fuera del bucle
        
        this.heroTitle.style.opacity = '1';
        this.heroTitle.style.fontFamily = 'Inter, sans-serif';
        this.heroTitle.style.fontSize = '2rem';
        this.heroTitle.style.background = 'none';
        this.heroTitle.style.padding = '0';
        this.heroTitle.style.border = 'none';
        this.heroTitle.style.boxShadow = 'none';
        this.heroTitle.style.textAlign = 'left';
        this.heroTitle.style.lineHeight = '1.4';
        this.heroTitle.style.transform = 'none'; // Asegurar que no hay transformaciones
        
        for (let i = 0; i < codeToType.length; i++) {
            const char = codeToType[i];
            currentCode += char;
            
            // Aplicar colores al código
            coloredCode = currentCode
                .replace(/&lt;/g, '<span style="color: #ef4444;">&lt;</span>')
                .replace(/&gt;/g, '<span style="color: #ef4444;">&gt;</span>')
                .replace(/class=/g, '<span style="color: #3b82f6;">class=</span>')
                .replace(/"highlight"/g, '<span style="color: #10b981;">"highlight"</span>')
                .replace(/"hero-subtitle"/g, '<span style="color: #10b981;">"hero-subtitle"</span>')
                .replace(/"hero-buttons"/g, '<span style="color: #10b981;">"hero-buttons"</span>')
                .replace(/"btn btn-primary"/g, '<span style="color: #10b981;">"btn btn-primary"</span>')
                .replace(/"btn btn-secondary"/g, '<span style="color: #10b981;">"btn btn-secondary"</span>')
                .replace(/"#proyectos"/g, '<span style="color: #10b981;">"#proyectos"</span>')
                .replace(/"#contacto"/g, '<span style="color: #10b981;">"#contacto"</span>')
                .replace(/href=/g, '<span style="color: #3b82f6;">href=</span>');
            
            this.heroTitle.innerHTML = coloredCode + '<span class="typing-cursor">|</span>';
            this.playTypingSound();
            await this.delay(this.typingSpeed);
        }
        
        this.heroTitle.innerHTML = coloredCode; // Quitar cursor al final
    }

    playTypingSound() {
        // Sonido opcional, muy sutil
        // Puedes comentar esto si no lo quieres
        /*
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.07, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.07);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.07);
        } catch (e) {}
        */
    }

    async fadeOutCode() {
        this.heroTitle.style.transition = 'opacity 0.4s ease-in-out';
        this.heroTitle.style.opacity = '0';
        await this.delay(400);
    }

    async fadeInTitle() {
        // Resetear todos los estilos y aplicar solo el fade
        this.heroTitle.style.transition = 'opacity 0.6s ease-in-out';
        this.heroTitle.style.fontFamily = '';
        this.heroTitle.style.fontSize = '';
        this.heroTitle.style.textAlign = '';
        this.heroTitle.style.lineHeight = '';
        this.heroTitle.style.transform = 'none'; // Asegurar que no hay transformaciones
        
        // Obtener el idioma actual y las traducciones correspondientes
        const currentLang = localStorage.getItem('portfolioLanguage') || 'es';
        const translations = TRANSLATIONS[currentLang];
        
        // Crear el título final con las traducciones
        const finalTitle = `${translations.hero.greeting} <span class="highlight">${translations.hero.name}</span>`;
        this.heroTitle.innerHTML = finalTitle;
        
        this.heroTitle.style.opacity = '1';
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
        
        this.heroTitle.classList.remove('code-mode');
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