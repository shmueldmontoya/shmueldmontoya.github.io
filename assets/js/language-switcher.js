/**
 * Sistema de cambio de idioma para el portafolio
 * Maneja la traducción dinámica del contenido
 */

class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'es';
        this.translations = TRANSLATIONS;
        this.init();
    }

    init() {
        // Detectar idioma guardado o del navegador
        this.currentLanguage = this.getStoredLanguage() || this.detectBrowserLanguage();
        
        // Aplicar idioma inicial
        this.applyLanguage(this.currentLanguage);
        
        // Crear selector de idioma
        this.createLanguageSelector();
        
        // Agregar event listeners
        this.addEventListeners();
    }

    getStoredLanguage() {
        return localStorage.getItem('portfolioLanguage');
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        
        // Verificar si el idioma del navegador está soportado
        return this.translations[shortLang] ? shortLang : 'es';
    }

    createLanguageSelector() {
        // Crear el selector de idioma
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <div class="language-toggle">
                <span class="current-lang">${this.currentLanguage.toUpperCase()}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="language-dropdown">
                <div class="language-option" data-lang="es">
                    <span class="flag">🇪🇸</span>
                    <span class="lang-name">${this.translations[this.currentLanguage].language.spanish}</span>
                </div>
                <div class="language-option" data-lang="en">
                    <span class="flag">🇺🇸</span>
                    <span class="lang-name">${this.translations[this.currentLanguage].language.english}</span>
                </div>
            </div>
        `;

        // Insertar en la navbar
        const navbar = document.querySelector('.nav-container');
        navbar.appendChild(languageSelector);

        // Agregar estilos
        this.addLanguageSelectorStyles();
    }

    addLanguageSelectorStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .language-selector {
                position: relative;
                margin-left: 2rem;
            }

            .language-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .language-toggle:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-1px);
            }

            .current-lang {
                font-weight: 600;
                color: var(--text-primary);
            }

            .language-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                z-index: 1000;
                min-width: 150px;
                margin-top: 0.5rem;
            }

            .language-selector:hover .language-dropdown {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .language-option {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1rem;
                cursor: pointer;
                transition: background 0.2s ease;
                border-radius: 8px;
                margin: 0.25rem;
            }

            .language-option:hover {
                background: rgba(99, 102, 241, 0.1);
            }

            .language-option.active {
                background: rgba(99, 102, 241, 0.2);
                color: var(--primary-color);
            }

            .flag {
                font-size: 1.2rem;
            }

            .lang-name {
                font-weight: 500;
            }

            @media (max-width: 768px) {
                .language-selector {
                    margin-left: 1rem;
                }
                
                .language-toggle {
                    padding: 0.4rem 0.8rem;
                }
                
                .current-lang {
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    addEventListeners() {
        // Event listeners para el selector de idioma
        document.addEventListener('click', (e) => {
            const languageOption = e.target.closest('.language-option');
            if (languageOption) {
                const newLang = languageOption.dataset.lang;
                this.changeLanguage(newLang);
            }
        });
    }

    changeLanguage(newLang) {
        if (newLang === this.currentLanguage) return;
        
        this.currentLanguage = newLang;
        this.applyLanguage(newLang);
        this.updateLanguageSelector();
        this.saveLanguagePreference(newLang);
    }

    applyLanguage(lang) {
        const t = this.translations[lang];
        
        // Navegación
        this.updateElement('.nav-link[href="#inicio"]', t.nav.home);
        this.updateElement('.nav-link[href="#sobre-mi"]', t.nav.about);
        this.updateElement('.nav-link[href="#proyectos"]', t.nav.projects);
        this.updateElement('.nav-link[href="#habilidades"]', t.nav.skills);
        this.updateElement('.nav-link[href="#contacto"]', t.nav.contact);

        // Hero Section
        this.updateHeroSection(t.hero);

        // Sobre Mí
        this.updateElement('#sobre-mi .section-title', t.about.title);
        this.updateElement('#sobre-mi .about-text p:first-child', t.about.paragraph1);
        this.updateElement('#sobre-mi .about-text p:nth-child(2)', t.about.paragraph2);

        // Proyectos
        this.updateElement('#proyectos .section-title', t.projects.title);
        this.updateProjects(t.projects);

        // Habilidades
        this.updateElement('#habilidades .section-title', t.skills.title);
        this.updateElement('#habilidades .skill-category:first-child h3', t.skills.frontend);
        this.updateElement('#habilidades .skill-category:last-child h3', t.skills.tools);

        // Contacto
        this.updateElement('#contacto .section-title', t.contact.title);
        this.updateElement('#contacto h3', t.contact.subtitle);
        this.updateElement('#contacto p', t.contact.description);

        // Footer
        this.updateElement('.footer p', t.footer.copyright);

        // Actualizar atributo lang del HTML
        document.documentElement.lang = lang;
    }

    updateHeroSection(heroTranslations) {
        // Actualizar el título del hero (manejar el span highlight)
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `${heroTranslations.greeting} <span class="highlight">${heroTranslations.name}</span>`;
        }

        // Actualizar subtítulo
        this.updateElement('.hero-subtitle', heroTranslations.subtitle);

        // Actualizar botones
        this.updateElement('.hero-buttons .btn-primary', heroTranslations.viewProjects);
        this.updateElement('.hero-buttons .btn-secondary', heroTranslations.contact);
    }

    updateProjects(projectsTranslations) {
        // Actualizar proyectos dinámicamente
        const projects = [
            {
                id: 1,
                title: projectsTranslations.randomGenerator.title,
                description: projectsTranslations.randomGenerator.description
            },
            {
                id: 2,
                title: projectsTranslations.priceCreator.title,
                description: projectsTranslations.priceCreator.description
            },
            {
                id: 3,
                title: projectsTranslations.sarcastiCalc.title,
                description: projectsTranslations.sarcastiCalc.description
            }
        ];

        // Actualizar el array de proyectos en script.js
        if (window.projects) {
            window.projects.forEach((project, index) => {
                if (projects[index]) {
                    project.title = projects[index].title;
                    project.description = projects[index].description;
                }
            });
            
            // Recargar proyectos si la función existe
            if (typeof loadProjects === 'function') {
                loadProjects();
            }
        }

        // Actualizar modal
        this.updateElement('#projectModal .modal-tech h4', projectsTranslations.technologies);
        this.updateElement('#projectModal .modal-links .btn-primary', projectsTranslations.viewProject);
        this.updateElement('#projectModal .modal-links .btn-secondary', projectsTranslations.viewCode);
    }

    updateElement(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }

    updateLanguageSelector() {
        const currentLangSpan = document.querySelector('.current-lang');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (currentLangSpan) {
            currentLangSpan.textContent = this.currentLanguage.toUpperCase();
        }

        // Actualizar nombres de idiomas en el dropdown
        languageOptions.forEach(option => {
            const lang = option.dataset.lang;
            const langNameSpan = option.querySelector('.lang-name');
            if (langNameSpan) {
                langNameSpan.textContent = this.translations[this.currentLanguage].language[lang === 'es' ? 'spanish' : 'english'];
            }
            
            // Marcar opción activa
            option.classList.toggle('active', lang === this.currentLanguage);
        });
    }

    saveLanguagePreference(lang) {
        localStorage.setItem('portfolioLanguage', lang);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que se carguen las traducciones
    if (typeof TRANSLATIONS !== 'undefined') {
        new LanguageSwitcher();
    } else {
        // Si las traducciones no están cargadas, esperar un poco
        setTimeout(() => {
            if (typeof TRANSLATIONS !== 'undefined') {
                new LanguageSwitcher();
            }
        }, 100);
    }
}); 