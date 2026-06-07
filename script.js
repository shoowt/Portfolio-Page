// 1. Efeito de Scroll Reveal (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.05 });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// 2. Animação das Barras de Habilidade ao Focar na Seção Habilidades
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-bar');
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) skillObserver.observe(skillsSection);

// 3. Barra de Progresso de Rolagem (Scroll Progress)
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressEl = document.getElementById('scrollProgress');
    if (progressEl) {
        progressEl.style.width = scrolled + '%';
    }

    // 4. Adicionar classe scrolled no navbar para efeito de sombra/compactação
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// 5. Menu Hambúrguer Móvel
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navAnchorLinks = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navAnchorLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// 6. Efeito de Digitação Dinâmica no Hero (Typing Effect)
const typingText = document.querySelector('.typing-text');
const words = [
    "Engenharia de Software",
    "Análise de Sistemas",
    "Dev Back-End (Java / Python)",
    "Ethical Hacking"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;

    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 80;
    if (isDeleting) {
        typeSpeed /= 2; // deleta mais rápido
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // pausa ao completar a palavra
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // pausa rápida antes de começar a próxima
    }

    setTimeout(type, typeSpeed);
}

// Inicia o efeito de digitação após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    if (typingText) {
        setTimeout(type, 1000);
    }
});

// 7. Filtragem da Linha do Tempo de Formação
const filterButtons = document.querySelectorAll('.filter-btn');
const timelineItems = document.querySelectorAll('.timeline-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        timelineItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('filtered-out');
            } else {
                item.classList.add('filtered-out');
            }
        });
    });
});

// 8. Lógica do Terminal Hacker Interativo
const terminalInput = document.getElementById('terminalInput');
const terminalLog = document.getElementById('terminalLog');
const terminalBody = document.getElementById('terminalBody');

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';
            if (cmd) {
                executeCommand(cmd);
            }
        }
    });

    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });
}

function printToTerminal(text, className = '') {
    if (!terminalLog || !terminalBody) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    terminalLog.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function executeCommand(cmd) {
    printToTerminal(`<span class="terminal-prompt">guest@marcosdev:~$</span> ${cmd}`, 'user-cmd-line');

    switch (cmd) {
        case 'help':
            printToTerminal(`Comandos disponíveis:<br>
 - <span style="color:#8b5cf6; font-weight:bold;">about</span>    : Exibe resumo sobre Marcos Gabriel<br>
 - <span style="color:#8b5cf6; font-weight:bold;">skills</span>   : Lista principais habilidades de desenvolvimento e segurança<br>
 - <span style="color:#8b5cf6; font-weight:bold;">projects</span> : Mostra projetos em destaque do portfólio<br>
 - <span style="color:#8b5cf6; font-weight:bold;">hack</span>     : Executa um scanner de portas de rede simulado<br>
 - <span style="color:#8b5cf6; font-weight:bold;">contact</span>  : Mostra e-mail e links sociais<br>
 - <span style="color:#8b5cf6; font-weight:bold;">clear</span>    : Limpa a tela do terminal`);
            break;
        case 'about':
            printToTerminal(`Marcos Gabriel é estudante de Engenharia de Software na Univassouras e ADS na UNINTER. Focado em desenvolvimento Back-end com Java e Python e aprofundamento em Segurança Cibernética e Ethical Hacking.`);
            break;
        case 'skills':
            printToTerminal(`[+] Habilidades Identificadas:<br>
  - Java SE & OOP (coleções, I/O, concorrência)<br>
  - Python (automação, script de redes, tratamento de dados)<br>
  - SQL & Modelagem de Bancos de Dados<br>
  - Hacking Ético (Kali Linux, Nmap, Wireshark, scan de portas)<br>
  - Desenvolvimento Web Front-end básico (HTML5, CSS3, JS)`);
            break;
        case 'projects':
            printToTerminal(`[+] Projetos Encontrados:<br>
  1. <strong>Legendary Adventure</strong>: RPG de aventura textual interativa em Python.<br>
  2. <strong>NetWatch</strong>: Toolkit CLI para diagnósticos de rede em Python.<br>
  3. <strong>Advocacia Premium</strong>: Landing page corporativa elegante para advogados.<br>
  4. <strong>Calculadora Financeira</strong>: Calculadora de juros compostos e amortizações.<br>
  5. <strong>Clínica Estética Premium</strong>: Portal moderno para clínicas de estética e bem-estar.<br>
  6. <strong>Dashboard Organizações</strong>: Painel administrativo com gráficos corporativos.<br>
  7. <strong>Gerador QR Code Pix</strong>: Gerador estático de cobranças instantâneas Pix.<br>
  8. <strong>Hamburgueria Gourmet</strong>: Cardápio interativo e sistema de pedidos de hambúrguer.<br>
  9. <strong>Landing Page de Conversão</strong>: Página de captura altamente otimizada para SEO.<br>
  10. <strong>Portal Cliente Faturamento</strong>: Painel B2B para boletos e faturas corporativas.<br>
  11. <strong>SmartHome Dashboard</strong>: Interface de automação residencial simulada.`);
            break;
        case 'contact':
            printToTerminal(`[+] Redes Sociais & Contato:<br>
  - GitHub   : https://github.com/MarcosPires04<br>
  - LinkedIn : https://www.linkedin.com/in/marcosspires/<br>
  - Instagram: https://www.instagram.com/prod.shoowt/<br>
  - E-mail   : (Use o formulário de contato abaixo na página!)`);
            break;
        case 'clear':
            terminalLog.innerHTML = '';
            break;
        case 'hack':
            runSimulatedHack();
            break;
        default:
            printToTerminal(`Comando inválido: "${cmd}". Digite <span style="color:#06b6d4;">help</span> para comandos suportados.`, 'error');
    }
}

function runSimulatedHack() {
    if (!terminalInput) return;
    terminalInput.disabled = true;
    
    const lines = [
        "Iniciando verificação de segurança no servidor virtual local...",
        "Varrendo subrede: 192.168.1.0/24...",
        "Host ativo encontrado: 192.168.1.42 (Marcos-PC)",
        "Escaneando as 1000 portas mais comuns...",
        "Porta 80/tcp  [ABERTA] - Servidor Web Apache HTTPD",
        "Porta 22/tcp  [ABERTA] - OpenSSH Server v9.0",
        "Iniciando ataque simulado de força bruta SSH na porta 22...",
        "Carregando wordlist de teste: admin_passwords.txt...",
        "Tentativa 1: admin/admin... falhou.",
        "Tentativa 2: root/admin123... falhou.",
        "Tentativa 3: marcos/root... falhou.",
        "Tentativa 4: marcos/shoowt2026... SUCESSO!",
        "[+] Sessão SSH estabelecida com privilégios de usuário.",
        "[!] Aviso: Varredura de segurança concluída. Habilidades aplicadas de forma estritamente defensiva/ética."
    ];

    let i = 0;
    function printNextLine() {
        if (i < lines.length) {
            let color = '#10b981'; // default hacker green
            if (lines[i].includes('SUCESSO')) {
                color = '#06b6d4; font-weight: bold;'; // cyan
            } else if (lines[i].includes('[!]')) {
                color = '#f59e0b;'; // yellow warning
            } else if (lines[i].includes('Host ativo')) {
                color = '#8b5cf6;'; // purple info
            }
            
            printToTerminal(`<span style="color:${color}">${lines[i]}</span>`);
            i++;
            setTimeout(printNextLine, 500);
        } else {
            terminalInput.disabled = false;
            terminalInput.focus();
        }
    }
    printNextLine();
}

// 9. Formulário de Contato - Envio Simulado
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById('name').value;
        const emailVal = document.getElementById('email').value;
        const msgVal = document.getElementById('message').value;

        // Animação de envio no botão
        const btnSubmit = contactForm.querySelector('button[type="submit"]');
        const origContent = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
            alert(`Obrigado pelo contato, ${nameVal}! Sua mensagem foi enviada com sucesso (Simulação).`);
            contactForm.reset();
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = origContent;
        }, 1500);
    });
}