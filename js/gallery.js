// ===== GALERÍA DINÁMICA CON TUS IMÁGENES REALES =====
document.addEventListener("DOMContentLoaded", function() {
    console.log("🎨 Inicializando galería con imágenes reales...");
    
    // Inicializar galería
    initGallery();
});

function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!galleryGrid) return;
    
    // Datos REALES de tus imágenes (basado en tu directorio)
    const galleryImages = {
        eventos: [
            { src: 'images/galeria/eventos/evento1.jpg', alt: 'Evento escolar 1' },
            { src: 'images/galeria/eventos/evento2.jpg', alt: 'Evento escolar 2' },
            { src: 'images/galeria/eventos/evento3.jpg', alt: 'Evento escolar 3' },
            { src: 'images/galeria/eventos/evento4.jpg', alt: 'Evento escolar 4' },
            { src: 'images/galeria/eventos/evento5.jpg', alt: 'Evento escolar 5' },
            { src: 'images/galeria/eventos/evento6.jpg', alt: 'Evento escolar 6' },
            { src: 'images/galeria/eventos/evento7.jpg', alt: 'Evento escolar 7' },
            { src: 'images/galeria/eventos/evento8.jpg', alt: 'Evento escolar 8' }
            // Tienes 8 imágenes en eventos
        ],
        deportes: [
            { src: 'images/galeria/deportes/deporte1.jpg', alt: 'Deporte 1' },
            { src: 'images/galeria/deportes/deporte2.jpg', alt: 'Deporte 2' },
            { src: 'images/galeria/deportes/deporte3.jpg', alt: 'Deporte 3' },
            { src: 'images/galeria/deportes/deporte4.jpg', alt: 'Deporte 4' },
            { src: 'images/galeria/deportes/deporte5.jpg', alt: 'Deporte 5' },
            { src: 'images/galeria/deportes/deporte6.jpg', alt: 'Deporte 6' },
            { src: 'images/galeria/deportes/deporte7.jpg', alt: 'Deporte 7' },
            { src: 'images/galeria/deportes/deporte8.jpg', alt: 'Deporte 8' }
            // Tienes 8 imágenes de deportes (usando las primeras 8)
        ],
        academico: [
            { src: 'images/galeria/academico/academico1.jpg', alt: 'Actividad académica 1' },
            { src: 'images/galeria/academico/academico2.jpg', alt: 'Actividad académica 2' },
            { src: 'images/galeria/academico/academico3.jpg', alt: 'Actividad académica 3' },
            { src: 'images/galeria/academico/academico4.jpg', alt: 'Actividad académica 4' },
            { src: 'images/galeria/academico/academico5.jpg', alt: 'Actividad académica 5' },
            { src: 'images/galeria/academico/academico6.jpg', alt: 'Actividad académica 6' },
            { src: 'images/galeria/academico/academico7.jpg', alt: 'Actividad académica 7' },
            { src: 'images/galeria/academico/academico8.jpg', alt: 'Actividad académica 8' }
            // Tienes 10 imágenes, usamos las primeras 8
        ],
        cultural: [
            { src: 'images/galeria/cultural/cultural1.jpg', alt: 'Actividad cultural 1' },
            { src: 'images/galeria/cultural/cultural2.jpg', alt: 'Actividad cultural 2' },
            { src: 'images/galeria/cultural/cultural3.jpg', alt: 'Actividad cultural 3' },
            { src: 'images/galeria/cultural/cultural4.jpg', alt: 'Actividad cultural 4' },
            { src: 'images/galeria/cultural/cultural5.jpg', alt: 'Actividad cultural 5' },
            { src: 'images/galeria/cultural/cultural6.jpg', alt: 'Actividad cultural 6' },
            { src: 'images/galeria/cultural/cultural7.jpg', alt: 'Actividad cultural 7' },
            { src: 'images/galeria/cultural/cultural8.jpg', alt: 'Actividad cultural 8' }
            // Tienes 8 imágenes culturales
        ]
    };
    
    // Crear array con todas las imágenes
    const allImages = [];
    Object.keys(galleryImages).forEach(category => {
        if (galleryImages[category]) {
            galleryImages[category].forEach(img => {
                allImages.push({
                    ...img,
                    category: category
                });
            });
        }
    });
    
    // Función para crear galería simple
    function renderGallery(images) {
        galleryGrid.innerHTML = '';
        
        if (!images || images.length === 0) {
            galleryGrid.innerHTML = `
                <div class="gallery-loader">
                    <p>📷 No hay imágenes en esta categoría</p>
                </div>
            `;
            return;
        }
        
        // Mostrar máximo 8 imágenes por diseño
        const imagesToShow = images.slice(0, 8);
        
        imagesToShow.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', image.category);
            
            // Agregar retraso de animación
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" 
                     onclick="openImageModal('${image.src}', '${image.alt}')"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'">
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Función para filtrar imágenes
    function filterGallery(category) {
        let filteredImages;
        
        if (category === 'todos') {
            filteredImages = allImages;
        } else {
            filteredImages = allImages.filter(img => img.category === category);
        }
        
        // Animación de transición
        galleryGrid.style.opacity = '0.5';
        galleryGrid.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            renderGallery(filteredImages);
            galleryGrid.style.opacity = '1';
        }, 300);
    }
    
    // Configurar botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar galería
            const filter = this.getAttribute('data-filter');
            filterGallery(filter);
        });
    });
    
    // Renderizar todas las imágenes al inicio
    renderGallery(allImages);
    
    console.log(`✅ Galería cargada con ${allImages.length} imágenes`);
}

// Modal mejorado con navegación y fondo semitransparente
let currentImageIndex = 0;
let currentImagesArray = [];

function openImageModal(src, alt) {
    // Obtener todas las imágenes visibles
    const visibleItems = document.querySelectorAll('.gallery-item:not([style*="display: none"])');
    currentImagesArray = [];
    
    visibleItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            currentImagesArray.push({
                src: img.src,
                alt: img.alt
            });
        }
    });
    
    // Encontrar el índice de la imagen clickeada
    currentImageIndex = currentImagesArray.findIndex(img => img.src.includes(src.split('/').pop()));
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.92);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    `;
    
    // Contenedor principal
    const container = document.createElement('div');
    container.className = 'modal-container';
    container.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    `;
    
    // Imagen
    const img = document.createElement('img');
    img.src = currentImagesArray[currentImageIndex].src;
    img.alt = currentImagesArray[currentImageIndex].alt;
    img.className = 'modal-image';
    img.style.cssText = `
        max-width: 100%;
        max-height: 75vh;
        border-radius: 10px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.7);
        cursor: pointer;
        animation: zoomIn 0.3s ease;
    `;
    
    // Título
    const title = document.createElement('div');
    title.className = 'modal-title';
    title.textContent = currentImagesArray[currentImageIndex].alt;
    title.style.cssText = `
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
        text-align: center;
        padding: 10px 20px;
        background: rgba(0,0,0,0.5);
        border-radius: 20px;
        backdrop-filter: blur(10px);
    `;
    
    // Contador (X de Y)
    const counter = document.createElement('div');
    counter.className = 'modal-counter';
    counter.textContent = `${currentImageIndex + 1} / ${currentImagesArray.length}`;
    counter.style.cssText = `
        color: white;
        font-size: 1rem;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.5);
        padding: 5px 15px;
        border-radius: 15px;
        backdrop-filter: blur(10px);
    `;
    
    // Botón cerrar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.className = 'modal-close';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: rgba(255,255,255,0.1);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        z-index: 10000;
    `;
    
    // Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.className = 'modal-nav prev';
    prevBtn.style.cssText = `
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.1);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        z-index: 10000;
    `;
    
    // Botón siguiente
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.className = 'modal-nav next';
    nextBtn.style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.1);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        z-index: 10000;
    `;
    
    // Funciones de navegación
    function showImage(index) {
        if (index < 0) index = currentImagesArray.length - 1;
        if (index >= currentImagesArray.length) index = 0;
        
        currentImageIndex = index;
        
        // Efecto de transición
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = currentImagesArray[currentImageIndex].src;
            img.alt = currentImagesArray[currentImageIndex].alt;
            title.textContent = currentImagesArray[currentImageIndex].alt;
            counter.textContent = `${currentImageIndex + 1} / ${currentImagesArray.length}`;
            img.style.opacity = '1';
        }, 200);
    }
    
    function navigateNext() {
        showImage(currentImageIndex + 1);
    }
    
    function navigatePrev() {
        showImage(currentImageIndex - 1);
    }
    
    // Eventos
    prevBtn.onclick = navigatePrev;
    nextBtn.onclick = navigateNext;
    closeBtn.onclick = closeModal;
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // Navegación con teclado
    function handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                navigatePrev();
                break;
            case 'ArrowRight':
                navigateNext();
                break;
            case 'Escape':
                closeModal();
                break;
        }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Cerrar al hacer click fuera
    modal.onclick = function(e) {
        if (e.target === modal) closeModal();
    };
    
    // Agregar animaciones CSS
    if (!document.querySelector('#modalAnimations')) {
        const style = document.createElement('style');
        style.id = 'modalAnimations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes zoomIn {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            .modal-nav:hover, .modal-close:hover {
                background: rgba(255,255,255,0.2) !important;
                transform: translateY(-50%) scale(1.1) !important;
            }
            
            .modal-close:hover {
                transform: scale(1.1) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Agregar elementos al modal
    container.appendChild(counter);
    container.appendChild(img);
    container.appendChild(title);
    
    modal.appendChild(container);
    modal.appendChild(prevBtn);
    modal.appendChild(nextBtn);
    modal.appendChild(closeBtn);
    
    document.body.appendChild(modal);
    
    // Limpiar event listener al cerrar
    modal.addEventListener('animationend', function handler(e) {
        if (e.animationName === 'fadeOut') {
            document.removeEventListener('keydown', handleKeyDown);
        }
    });
}
