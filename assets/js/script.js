// Datos de proyectos
window.projects = [
    {
        id: 1,
        title: "Random Generator",
        description: "Una aplicación para encriptar texto, con un diseño moderno y sencillo, tiene varios métodos de cifrado comunes y uno propio de mi diseño.",
        image: "assets/images/randomgeretarorimage.png",
        technologies: ["JavaScript", "HTML", "CSS"],
        liveLink: "https://shmueldmontoya.github.io/randomgeneratorv2",
        codeLink: "https://github.com/shmueldmontoya/randomgeneratorv2"
    },
    {
        id: 2,
        title: "Creador de Rotulaciones",
        description: "Una aplicación para crear rotulaciones para tiendas o supermercados con diseños básicos, de forma rápida y eficiente, para impresión tamaño carta.",
        image: "assets/images/creadordepreciosimage.png",
        technologies: ["JavaScript", "HTML", "CSS"],
        liveLink: "https://shmueldmontoya.github.io/creadordeprecios",
        codeLink: "https://github.com/shmueldmontoya/creadordeprecios"
    },
    {
        id: 3,
        title: "SarcastiCalc",
        description: "Una calculadora web única que combina funcionalidad matemática con humor, easter eggs, sistema de vidas, efectos visuales y múltiples modos de juego. ¡La calculadora más divertida y completa del mundo!",
        image: "assets/images/sarcasticalcimage.png",
        technologies: ["JavaScript", "HTML", "CSS"],
        liveLink: "https://shmueldmontoya.github.io/sarcastiCalc",
        codeLink: "https://github.com/shmueldmontoya/sarcastiCalc"
    }
];

// Elementos del DOM
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectsGrid = document.getElementById('projectsGrid');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close');

// Navegación móvil
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navegación suave
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Ajuste para la navbar fija
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Cargar proyectos
function loadProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectCard.addEventListener('click', () => openProjectModal(project));
        projectsGrid.appendChild(projectCard);
    });
}

// Abrir modal de proyecto
function openProjectModal(project) {
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnologies = document.getElementById('modalTechnologies');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalCodeLink = document.getElementById('modalCodeLink');
    
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTechnologies.innerHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    modalLiveLink.href = project.liveLink;
    modalCodeLink.href = project.codeLink;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Eventos del modal
closeModal.addEventListener('click', closeProjectModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Cerrar modal con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeProjectModal();
    }
});



// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Animación de aparición para las etiquetas de habilidades
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    skillTags.forEach(tag => {
        tag.classList.add('animate-out');
        observer.observe(tag);
    });
}

// Efecto de aparición al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.classList.add('animate-out');
        observer.observe(element);
    });
}

// Cambio de color de la navbar al hacer scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    animateSkillTags();
    animateOnScroll();
    handleNavbarScroll();
    
    // Agregar clase activa al enlace de navegación según la sección visible
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
});

// Estilos adicionales para notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(notificationStyles); 