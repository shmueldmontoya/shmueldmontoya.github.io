/**
 * Configuración del Portafolio
 * Archivo centralizado para todas las configuraciones del proyecto
 */

const CONFIG = {
    // Configuración de animaciones
    animations: {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        scrollThreshold: 0.1,
        staggerDelay: 100
    },
    
    // Configuración de la navegación
    navigation: {
        navbarHeight: 70,
        scrollOffset: 100
    },
    
    // Configuración de notificaciones
    notifications: {
        duration: 5000,
        position: 'top-right'
    },
    
    // Configuración de breakpoints
    breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1200
    },
    
    // Configuración de colores (para uso en JavaScript)
    colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b'
    }
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 