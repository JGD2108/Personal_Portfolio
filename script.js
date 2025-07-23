// Funciones para navegación suave

// Menu hamburguesa para móvil
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// Header con efecto de scroll
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Animación de elementos al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    const elementsToAnimate = document.querySelectorAll(
        '.sobre-mi-content, .proyecto-card, .skill-card, .contacto-links, ' + 
        '.bio-quote, .bio-detail-item, .stat-card, .timeline-item, ' + 
        '.certificacion-card, .comunidad-content'
    );
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Animación específica para las estadísticas - contador ascendente
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const finalValue = parseInt(statNumber.getAttribute('data-final')); // Use the stored value
                let startValue = 0;
                const duration = 2000; // 2 segundos
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                const increment = finalValue / totalFrames;
                
                let currentFrame = 0;
                const counter = setInterval(() => {
                    currentFrame++;
                    const currentValue = Math.round(startValue + currentFrame * increment);
                    
                    if (currentFrame === totalFrames) {
                        clearInterval(counter);
                        statNumber.textContent = finalValue;
                    } else {
                        statNumber.textContent = currentValue;
                    }
                }, frameDuration);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        // Guardar el valor original como atributo de datos
        const originalValue = stat.textContent.trim();
        stat.setAttribute('data-final', originalValue);
        stat.textContent = "0";
        statsObserver.observe(stat);
    });
    
    // Animación para el cronograma
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 300); // Animación escalonada para cada elemento del timeline
            }
        });
    }, { threshold: 0.2 });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => timelineObserver.observe(item));
});

// Filtro de habilidades
document.addEventListener('DOMContentLoaded', () => {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Función para filtrar habilidades
    function filterSkills(category) {
        skillCards.forEach(card => {
            if (category === 'all') {
                card.classList.remove('hidden');
            } else if (card.dataset.category === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    // Aplicar filtros al hacer clic en las pestañas
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover clase activa de todas las pestañas
            skillTabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase activa a la pestaña seleccionada
            tab.classList.add('active');
            
            // Obtener categoría y filtrar
            const category = tab.getAttribute('data-category');
            filterSkills(category);
        });
    });
    
    // Asegurar que todas las habilidades estén visibles inicialmente
    filterSkills('all');
    
    // Animación para las barras de progreso
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scaleX(1)';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
});

// --- Añadir estilos para las animaciones de JS ---
const style = document.createElement('style');
style.textContent = `
    .sobre-mi-content,
    .proyecto-card,
    .skill-card,
    .contacto-links,
    .certificacion-card,
    .comunidad-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.5, 0, 0.3, 1), transform 0.8s cubic-bezier(0.5, 0, 0.3, 1);
    }

    .sobre-mi-content.visible,
    .proyecto-card.visible,
    .skill-card.visible,
    .contacto-links.visible,
    .certificacion-card.visible,
    .comunidad-content.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .proyecto-card {
        transition-delay: calc(var(--card-index) * 0.1s);
    }
    
    .skill-card {
        transition-delay: calc(var(--card-index) * 0.05s);
    }
    
    .certificacion-card {
        transition-delay: calc(var(--cert-index) * 0.15s);
    }
    
    .comunidad-image {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .comunidad-info {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 1s ease, transform 1s ease;
        transition-delay: 0.2s;
    }
    
    .comunidad-content.visible .comunidad-image,
    .comunidad-content.visible .comunidad-info {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// Asignar índice a cada proyecto y habilidad para animación escalonada
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.proyecto-card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
    
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
    
    document.querySelectorAll('.bio-detail-item').forEach((item, index) => {
        item.style.setProperty('--detail-index', index);
    });
    
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.setProperty('--stat-index', index);
    });
    
    document.querySelectorAll('.certificacion-card').forEach((card, index) => {
        card.style.setProperty('--cert-index', index);
    });
});

// Efecto de máquina de escribir para el subtítulo
document.addEventListener('DOMContentLoaded', () => {
    const subtitleElement = document.getElementById('subtitle-text');
    const phrases = [
        "Estudiante de Ingeniería de Sistemas",
        "Desarrollador de Software",
        "Entusiasta de la IA y Ciberseguridad",
        "Músico y Jazán en formación"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Borrando
            subtitleElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Escribiendo
            subtitleElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        // Cambiar de estado
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pausa al final de la frase
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        
        // Velocidad variable para hacer más natural
        let typingSpeed = 120;
        if (isDeleting) typingSpeed = 60;
        if (!isDeleting && charIndex === currentPhrase.length) typingSpeed = 2000;
        if (isDeleting && charIndex === 0) typingSpeed = 500;
        
        setTimeout(type, typingSpeed);
    }

    // Iniciar el efecto solo cuando la sección es visible
    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(type, 500); // Pequeño retraso antes de empezar
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if(subtitleElement) {
        heroObserver.observe(document.querySelector('.hero'));
    }
});
