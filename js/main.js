// Configuración de partículas
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#667eea'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#667eea',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Variables globales
let navbar = document.querySelector('.navbar');
let navMenu = document.querySelector('.nav-menu');
let hamburger = document.querySelector('.hamburger');
let navLinks = document.querySelectorAll('.nav-link');

// Navegación móvil
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú móvil al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Efecto scroll en navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de skills bars
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const skillLevel = skillItem.getAttribute('data-skill');
                const progressBar = skillItem.querySelector('.skill-progress');
                
                if (progressBar && skillLevel) {
                    setTimeout(() => {
                        progressBar.style.width = skillLevel + '%';
                    }, 300);
                }
                observer.unobserve(skillItem);
            }
        });
    }, {
        threshold: 0.5
    });

    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Animación de contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 50);
                
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animaciones al hacer scroll
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .about-text, .contact-info');
    
    elements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Efecto de escritura automática
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efecto de escritura en el nombre
function initTypeWriter() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 150);
        }, 1000);
    }
}

// Manejo del formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simular envío del formulario
        showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
        
        // Limpiar formulario
        this.reset();
        
        // En un proyecto real, aquí enviarías los datos a tu servidor
        console.log('Datos del formulario:', { name, email, subject, message });
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class=\"notification-content\">
            <i class=\"fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}\"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y eliminar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Efecto parallax suave
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}


// Función para alternar tema (opcional para futuras mejoras)
function setupThemeToggle() {
    // Esta función podría implementarse para alternar entre tema claro y oscuro
    // Por ahora, el portafolio usa un tema oscuro fijo
}
const cursor = document.querySelector('.cursor-neon');

document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Preloader (opcional)
function setupPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class=\"preloader-content\">
            <div class=\"spinner\"></div>
            <p>Cargando portafolio...</p>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0e27 0%, #131842 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Detectar dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimizaciones para móvil
function setupMobileOptimizations() {
    if (isMobileDevice()) {
        // Desactivar efectos pesados en móvil
        document.body.classList.add('mobile-device');
        
        // Configuración de partículas más ligera para móvil
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.number.value = 30;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
}

// Funciones de utilidad
const utils = {
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Generar ID único
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portafolio cargado correctamente');
    
    // Configurar preloader
    setupPreloader();
    
    // Inicializar todas las funcionalidades
    setTimeout(() => {
        animateSkillBars();
        animateCounters();
        setupScrollAnimations();
        setupContactForm();
        setupParallax();
        setupMobileOptimizations();
        
        // Efectos opcionales (comentar si causan problemas de rendimiento)
        if (!isMobileDevice()) {
            setupCustomCursor();
        }
        
        // Inicializar efecto de escritura después de un retraso
        // initTypeWriter();
        
        console.log('✅ Todas las animaciones inicializadas');
    }, 100);
});

// Optimización del rendimiento
window.addEventListener('scroll', utils.throttle(() => {
    // Funciones que se ejecutan al hacer scroll (ya implementadas arriba)
}, 16)); // ~60fps

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en el portafolio:', e.error);
});

// Exportar funciones útiles para debugging
window.portfolioUtils = {
    showNotification,
    utils,
    animateSkillBars,
    animateCounters
};