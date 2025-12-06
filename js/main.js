// ===== MAIN.JS COMPLETO =====
document.addEventListener("DOMContentLoaded", function() {
    console.log("🎓 Colegio Mariscal Andrés de Santa Cruz - Alpacoma");
    console.log("📅 Año:", new Date().getFullYear());
    
    // Inicializar todo
    initSite();
});

function initSite() {
    // 1. Configurar año actual
    updateCurrentYear();
    
    // 2. Configurar menú móvil
    setupMobileMenu();
    
    // 3. Configurar contadores animados
    setupCounters();
    
    // 4. Configurar header scroll
    setupHeaderScroll();
    
    // 5. Configurar fechas automáticas
    setupAutoDates();
    
    // 6. Configurar video
    setupVideoPlayer();
    
    // 7. Configurar scroll suave
    setupSmoothScroll();
    
    // 8. Configurar enlaces de redes sociales
    setupSocialLinks();
    
    // 9. Inicializar partículas (opcional)
    initParticles();
}

function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    
    // Actualizar en múltiples lugares PERO EXCLUYENDO matrículas
    document.querySelectorAll('#currentYear, #currentYearShort, #footerYear').forEach(el => {
        if (!el) return;
        
        // NO actualizar si es el span dentro del botón de matrículas
        if (el.id === 'currentYearShort') {
            const isInMatriculaButton = el.closest('.btn-primary, [href="#contacto"]');
            if (isInMatriculaButton) {
                console.log('⚠️ Manteniendo 2026 en botón matrículas');
                return; // Saltar este elemento
            }
        }
        
        el.textContent = currentYear;
    });
    
    console.log('✅ Año actual actualizado:', currentYear);
}

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Cambiar ícono del menú
            const menuBars = document.querySelectorAll('.menu-bar');
            if (navMenu.classList.contains('active')) {
                menuBars.forEach((bar, index) => {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                });
            } else {
                menuBars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.querySelectorAll('.menu-bar').forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
}

function setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

function setupHeaderScroll() {
    const header = document.getElementById('header');
    
    if (header) {
        // Configurar estado inicial
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        
        // Escuchar scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Y aquí termina el archivo o continúan otras funciones
// Pero NO debe haber el código de newsDates.forEach

function setupVideoPlayer() {
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoElement = document.querySelector('.presentation-video');
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (videoPlayBtn && videoElement && videoOverlay) {
        // Configurar botón de play
        videoPlayBtn.addEventListener('click', function() {
            videoElement.play();
            videoOverlay.classList.add('hidden');
        });
        
        // Mostrar overlay cuando el video se pausa
        videoElement.addEventListener('pause', function() {
            videoOverlay.classList.remove('hidden');
        });
        
        // Ocultar overlay cuando el video termina
        videoElement.addEventListener('ended', function() {
            videoOverlay.classList.remove('hidden');
        });
        
        // Play/Pause con espacio
        videoElement.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                if (videoElement.paused) {
                    videoElement.play();
                    videoOverlay.classList.add('hidden');
                } else {
                    videoElement.pause();
                    videoOverlay.classList.remove('hidden');
                }
            }
        });
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo para enlaces internos
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Actualizar URL sin recargar
            history.pushState(null, null, href);
        });
    });
}

function setupSocialLinks() {
    // Estos enlaces se pueden configurar en config.js
    const socialLinks = {
        facebook: document.getElementById('facebookLink'),
        youtube: document.getElementById('youtubeLink'),
        instagram: document.getElementById('instagramLink')
    };
    
    // Agregar clases para estilos
    if (socialLinks.facebook) socialLinks.facebook.classList.add('facebook');
    if (socialLinks.youtube) socialLinks.youtube.classList.add('youtube');
    if (socialLinks.instagram) socialLinks.instagram.classList.add('instagram');
    
    console.log('🔗 Enlaces de redes sociales listos para configurar');
}

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Crear partículas simples
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Posición aleatoria
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: floatParticle ${duration}s infinite ${delay}s linear;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Agregar animación CSS para partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-40px) translateX(-5px);
                opacity: 0.8;
            }
            75% {
                transform: translateY(-20px) translateX(-10px);
                opacity: 0.6;
            }
            100% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Manejar errores globales
window.addEventListener('error', function(e) {
    console.error('❌ Error:', e.message);
    
    // Manejar errores de imágenes
    if (e.target.tagName === 'IMG') {
        console.warn('Imagen no encontrada:', e.target.src);
        // Podrías agregar un placeholder aquí
    }
});

// Cargar scripts adicionales
function loadAdditionalScripts() {
    // Aquí podrías cargar scripts adicionales si es necesario
    console.log('✅ Todos los scripts cargados correctamente');
}

// Llamar al final
setTimeout(loadAdditionalScripts, 1000);

// ===== HEADER QUE DESAPARECE EN CELULARES =====

function setupMobileHeaderHide() {
    const header = document.getElementById('header');
    if (!header) return;
    
    // SOLO para celulares (ancho <= 768px)
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        // Reset si no es móvil
        header.style.transform = '';
        header.style.transition = '';
        return;
    }
    
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        // Verificar nuevamente si es móvil (por si rotó la pantalla)
        if (window.innerWidth > 768) return;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Ocultar al bajar (scroll > 50px)
                if (scrollTop > lastScrollTop && scrollTop > 50) {
                    header.style.transform = 'translateY(-100%)';
                    header.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                } 
                // Mostrar al subir
                else if (scrollTop < lastScrollTop) {
                    header.style.transform = 'translateY(0)';
                    header.style.transition = 'transform 0.3s ease';
                }
                
                // Si está en el top, siempre mostrar
                if (scrollTop <= 10) {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Mostrar header al tocar menú hamburguesa
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            header.style.transform = 'translateY(0)';
        });
    }
    
    // Mostrar header al hacer tap en cualquier parte
    document.addEventListener('touchstart', function(e) {
        // Solo si tocamos cerca del top
        if (window.pageYOffset < 100) {
            header.style.transform = 'translateY(0)';
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', setupMobileHeaderHide);

// Re-inicializar al cambiar tamaño (rotar pantalla)
window.addEventListener('resize', setupMobileHeaderHide);

// También inicializar después de un delay (por si acaso)
setTimeout(setupMobileHeaderHide, 1000);