// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

// Verificar preferência do usuário
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
} else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateIcon('dark');
}

// Alternar tema
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

// Atualizar ícone
function updateIcon(theme) {
    icon.className = theme === 'dark' ? 'fas fa-dumbbell' : 'fas fa-dumbbell';
}

// Navbar Scroll Effect
function updateNavbarStyle() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Inicializar navbar e adicionar listener de scroll
document.addEventListener('DOMContentLoaded', function() {
    updateNavbarStyle();
    window.addEventListener('scroll', updateNavbarStyle);
});

// Smooth Scroll com atualização da navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Fecha o menu mobile
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Atualiza o estilo da navbar após a rolagem
            setTimeout(updateNavbarStyle, 100);
        }
    });
});

// Animação de fade-in para elementos ao rolar
const fadeElements = document.querySelectorAll('.card, .contact-info, .form-control');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        }
    });
}

// Animation on Scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.service-card, .class-card, .price-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize elements with fade-in effect
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .class-card, .price-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Trigger initial check
    window.dispatchEvent(new Event('scroll'));
});

// Adicionar classe active ao link do menu atual
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Gerenciamento dos cards de preço
document.addEventListener('DOMContentLoaded', function() {
    const priceCards = document.querySelectorAll('.price-card');
    
    // Define o card Premium como ativo por padrão
    const premiumCard = Array.from(priceCards).find(card => 
        card.querySelector('.price-header h3').textContent.includes('Premium')
    );
    if (premiumCard) {
        premiumCard.classList.add('active');
    }

    priceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove a classe active de todos os cards
            priceCards.forEach(c => c.classList.remove('active'));
            // Adiciona a classe active apenas ao card clicado
            this.classList.add('active');
        });
    });
}); 