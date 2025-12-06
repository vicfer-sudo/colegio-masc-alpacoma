// ===== CONFIGURACIÓN DEL SITIO =====
// Archivo: config.js
// Agrega aquí tus configuraciones personalizadas

const SITE_CONFIG = {
    // Año actual (se actualiza automáticamente)
    currentYear: new Date().getFullYear(),
    
    // Redes Sociales (reemplaza con tus URLs)
    socialMedia: {
        facebook: '#',    // https://facebook.com/tupagina
        youtube: '#',     // https://youtube.com/tucanal  
        instagram: '#'    // https://instagram.com/tuperfil
    },
    
    // Información de contacto
    contactInfo: {
        phone: '+591 2 1234567',
        email: 'info@colegiosantacruz.edu.bo',
        address: 'Av. Principal #123, Alpacoma, La Paz, Bolivia'
    },
    
    // Configuración de la galería
    gallery: {
        maxImagesPerCategory: 12,
        categories: ['eventos', 'deportes', 'academico', 'cultural']
    }
};

// Cómo usar:
// 1. Reemplaza los # en socialMedia con tus URLs reales
// 2. Actualiza contactInfo con tu información real
// 3. Coloca tus imágenes en las carpetas correspondientes

console.log('✅ Configuración cargada - Año:', SITE_CONFIG.currentYear);
