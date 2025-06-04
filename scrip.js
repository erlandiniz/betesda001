document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Controle dos Menus Fixos (Header)
    // =============================================
    const headerPrimario = document.querySelector('.header-fixo');
    const headerSecundario = document.querySelector('.header-secundario');
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;

        // Rolar para baixo
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            headerPrimario.style.transform = 'translateY(-100%)';
            headerPrimario.style.opacity = '0';
            headerSecundario.classList.add('show');
        } 
        // Rolar para cima
        else if (currentScroll < lastScroll) {
            if (currentScroll <= scrollThreshold) {
                headerPrimario.style.transform = 'translateY(0)';
                headerPrimario.style.opacity = '1';
                headerSecundario.classList.remove('show');
            }
        }

        lastScroll = currentScroll;
    });

    // =============================================
    // Controle do Slider (SEM AUTOPLAY)
    // =============================================
    let slideIndex = 1;
    const slides = document.getElementsByClassName('slide');
    const totalSlides = slides.length;

    // Inicializa o slider mostrando o primeiro slide
    showSlides(slideIndex);

    // Função principal para mostrar slides
    function showSlides(n) {
        // Ajusta o índice se passar dos limites
        if (n > totalSlides) { slideIndex = 1 }
        if (n < 1) { slideIndex = totalSlides }

        // Esconde todos os slides
        for (let i = 0; i < totalSlides; i++) {
            slides[i].style.display = "none";
        }

        // Mostra o slide atual
        slides[slideIndex-1].style.display = "block";

        // Atualiza a navegação manual (bolinhas)
        updateManualNavigation();
        
        // Atualiza a navegação automática (se existir)
        updateAutoNavigation();
        
        // Atualiza os radio buttons
        updateRadioButtons();
    }

    // Atualiza a navegação manual (bolinhas)
    function updateManualNavigation() {
        const manualBtns = document.getElementsByClassName('manual-btn');
        for (let i = 0; i < manualBtns.length; i++) {
            manualBtns[i].className = manualBtns[i].className.replace(" active", "");
        }
        if (manualBtns.length > 0) {
            manualBtns[slideIndex-1].className += " active";
        }
    }

    // Atualiza a navegação automática (mantida para sincronização)
    function updateAutoNavigation() {
        const autoBtns = document.querySelectorAll('.auto-btn1, .auto-btn2, .auto-btn3, .auto-btn4');
        for (let i = 0; i < autoBtns.length; i++) {
            autoBtns[i].className = autoBtns[i].className.replace(" active", "");
        }
        const currentAutoBtn = document.querySelector(`.auto-btn${slideIndex}`);
        if (currentAutoBtn) {
            currentAutoBtn.className += " active";
        }
    }

    // Atualiza os radio buttons
    function updateRadioButtons() {
        const radio = document.getElementById(`radio${slideIndex}`);
        if (radio) {
            radio.checked = true;
        }
    }

    // Navegação: Avançar/Retroceder
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Navegação para slide específico
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // =============================================
    // Configuração dos Eventos
    // =============================================
    
    // Botões de navegação laterais
    document.querySelector('.prev-btn')?.addEventListener('click', () => plusSlides(-1));
    document.querySelector('.next-btn')?.addEventListener('click', () => plusSlides(1));

    // Navegação por bolinhas
    const manualBtns = document.querySelectorAll('.manual-btn');
    manualBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => currentSlide(index + 1));
    });

    // =============================================
    // Criação dos Botões de Navegação (Fallback)
    // =============================================
    if (!document.querySelector('.slide-btn')) {
        createNavigationButtons();
    }

    function createNavigationButtons() {
        const slider = document.querySelector('.slider');
        if (!slider) return;

        // Botão Anterior
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slide-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.onclick = () => plusSlides(-1);

        // Botão Próximo
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slide-btn next-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.onclick = () => plusSlides(1);

        // Insere os botões
        slider.insertBefore(prevBtn, slider.firstChild);
        slider.appendChild(nextBtn);
    }
});

// Controle do Menu Sanduíche menu novo
const menuToggle = document.querySelector('.menu-toggle');
const menuMobile = document.querySelector('.menu-mobile');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-mobile a');

function toggleMenu() {
    menuToggle.classList.toggle('active');
    menuMobile.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Event listeners
menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link
menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Atualizar slider quando o menu é aberto/fechado
function handleResize() {
    const slider = document.querySelector('.slider');
    if (slider) {
        const width = slider.offsetWidth;
        slider.style.height = (width * 0.5625) + 'px';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menuMobile = document.querySelector('.menu-superior-direito .menu-lista');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menuMobile.classList.toggle('active');
    });
    
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de scroll no header secundário
    window.addEventListener('scroll', function() {
        const headerSec = document.querySelector('.header-secundario');
        if (headerSec && window.scrollY > 100) {
            headerSec.classList.add('show');
        } else if (headerSec) {
            headerSec.classList.remove('show');
        }
    });
});

// PAGINA DE DOWNLOADS

// Menu Mobile
const menuToggleE = document.querySelector('.menu-toggleE');
const menuMobileE = document.querySelector('.menu-mobileE');
const menuOverlayY = document.querySelector('.menu-overlayY');

menuToggle.addEventListener('click', () => {
    menuToggleE.classList.toggle('active');
    menuMobileE.classList.toggle('active');
    menuOverlayY.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

menuOverlay.addEventListener('click', () => {
    menuToggleE.classList.remove('active');
    menuMobileE.classList.remove('active');
    menuOverlayY.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

// Filtros
const filterBtns = document.querySelectorAll('.filter-btn');
const downloadItems = document.querySelectorAll('.download-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        downloadItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Barra de Pesquisa
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    downloadItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Header no Scroll
const headerFixo = document.querySelector('.header-fixo');
const headerSecundario = document.querySelector('.header-secundario');

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Esconde/mostra header principal
    if (currentScroll > lastScroll && currentScroll > 100) {
        headerFixo.classList.add('hide');
    } else {
        headerFixo.classList.remove('hide');
    }
    
    // Mostra header secundário após certo scroll
    if (currentScroll > 200) {
        headerSecundario.classList.add('show');
    } else {
        headerSecundario.classList.remove('show');
    }
    
    lastScroll = currentScroll;
});

// Botões de Download (simulação)
const downloadBtns = document.querySelectorAll('.download-btn');

downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const itemTitle = btn.closest('.download-card').querySelector('h3').textContent;
        alert(`Iniciando download de: ${itemTitle}`);
        // Aqui você adicionaria a lógica real de download
    });
});

// Botões de Visualização (simulação)
const previewBtns = document.querySelectorAll('.preview-btn');

previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const itemTitle = btn.closest('.download-card').querySelector('h3').textContent;
        alert(`Abrindo visualização de: ${itemTitle}`);
        // Aqui posso abrir um modal ou nova página com o preview
    });
});


//ao vivo

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current nav item
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath) {
            link.classList.add('active');
        }
    });
});