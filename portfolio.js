// ===================== NAV SCROLL =====================
window.addEventListener('scroll', function() {
  var navBar = document.querySelector('nav');
  if (window.scrollY > 50) {
    navBar.classList.add('scrolled');
  } else {
    navBar.classList.remove('scrolled');
  }
});

// ===================== ACTIVE STATE NAV =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav li a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`nav li a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// ===================== ANIMAÇÃO SOBRE MIM =====================
const elementosAnimados = document.querySelectorAll('.conteudo-glass-texto, .imagem-sobremim');

const observerAnimacao = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.2 });

elementosAnimados.forEach(el => observerAnimacao.observe(el));


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});




// ===================== FIX DA CHUVA DE ÍCONES =====================
const containerMeteoros = document.getElementById('meteoros-container');
const listaIcones = ['figma', 'security', 'python', 'git', 'vscode', 'mysql', 'pycharm', 'js', 'html', 'css'];

function criarMeteoro() {
  if (!containerMeteoros) {
    console.error("Elo avisou: O container 'meteoros-container' não foi encontrado no HTML!");
    return;
  }

  const meteoro = document.createElement('div');
  meteoro.classList.add('meteoro');

  const iconeSorteado = listaIcones[Math.floor(Math.random() * listaIcones.length)];
  meteoro.classList.add(iconeSorteado);

  const posicaoX = Math.random() * 100;
  meteoro.style.left = `${posicaoX}%`;

  const duracao = Math.random() * 3 + 4;
  const atraso = Math.random() * 2;

 
  meteoro.style.animation = `cairMeteoro ${duracao}s linear ${atraso}s forwards`;

  containerMeteoros.appendChild(meteoro);

  setTimeout(() => {
    meteoro.remove();
  }, (duracao + atraso) * 1000);
}


setInterval(criarMeteoro, 600);
// ===================== MENU MOBILE =====================//

const menuBtn = document.querySelector('#mobile-menu');
const navContent = document.querySelector('.nav-list');
if (menuBtn && navContent) {
    menuBtn.addEventListener('click', () => {
        
        navContent.classList.toggle('active');
        
        menuBtn.classList.toggle('is-active');
    });

    
    document.querySelectorAll('.nav li a').forEach(link => {
        link.addEventListener('click', () => {
            navContent.classList.remove('active');
            menuBtn.classList.remove('is-active');
        });
    });
}