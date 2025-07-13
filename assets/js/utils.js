/**
 * Utilidades del Portafolio
 * Funciones reutilizables y helpers
 */

// Utilidades para DOM
const DOMUtils = {
    /**
     * Obtiene un elemento del DOM
     * @param {string} selector - Selector CSS
     * @returns {Element|null}
     */
    getElement: (selector) => document.querySelector(selector),
    
    /**
     * Obtiene múltiples elementos del DOM
     * @param {string} selector - Selector CSS
     * @returns {NodeList}
     */
    getElements: (selector) => document.querySelectorAll(selector),
    
    /**
     * Crea un elemento HTML
     * @param {string} tag - Tag del elemento
     * @param {Object} attributes - Atributos del elemento
     * @returns {Element}
     */
    createElement: (tag, attributes = {}) => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }
};

// Utilidades para validación
const ValidationUtils = {
    /**
     * Valida si un email es válido
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Valida si un campo está vacío
     * @param {string} value - Valor a validar
     * @returns {boolean}
     */
    isEmpty: (value) => {
        return !value || value.trim() === '';
    }
};

// Utilidades para animaciones
const AnimationUtils = {
    /**
     * Crea un observer para animaciones de scroll
     * @param {Function} callback - Función a ejecutar cuando el elemento es visible
     * @param {Object} options - Opciones del observer
     * @returns {IntersectionObserver}
     */
    createScrollObserver: (callback, options = {}) => {
        const defaultOptions = {
            threshold: CONFIG.animations.scrollThreshold,
            rootMargin: '0px'
        };
        
        return new IntersectionObserver(callback, { ...defaultOptions, ...options });
    },
    
    /**
     * Aplica animación de aparición a elementos
     * @param {NodeList|Array} elements - Elementos a animar
     * @param {number} staggerDelay - Delay entre elementos
     */
    animateOnScroll: (elements, staggerDelay = CONFIG.animations.staggerDelay) => {
        const observer = AnimationUtils.createScrollObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * staggerDelay);
                }
            });
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
            observer.observe(element);
        });
    }
};

// Utilidades para eventos
const EventUtils = {
    /**
     * Agrega un event listener con debounce
     * @param {Element} element - Elemento al que agregar el evento
     * @param {string} event - Tipo de evento
     * @param {Function} handler - Función manejadora
     * @param {number} delay - Delay del debounce
     */
    addDebouncedListener: (element, event, handler, delay = 300) => {
        let timeout;
        element.addEventListener(event, (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => handler(...args), delay);
        });
    }
};

// Exportar utilidades
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DOMUtils, ValidationUtils, AnimationUtils, EventUtils };
} 