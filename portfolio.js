window.addEventListener('scroll', function() {
  var navBar = document.querySelector('nav');
  if (window.scrollY > 50) {
    navBar.classList.add('scrolled');
  } else {
    navBar.classList.remove('scrolled');
  }
});

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
  if (typeof canvas !== 'undefined') {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

const containerMeteoros = document.getElementById('meteoros-container');
const listaIcones = ['figma', 'security', 'python', 'git', 'vscode', 'mysql', 'pycharm', 'js', 'html', 'css'];

function criarMeteoro() {
  if (!containerMeteoros) return;

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

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess(name) {
  this.form.innerHTML = `
    <div class="feedback-success">
      <dotlottie-player 
        src="https://lottie.host/136da3b5-083d-4b81-a525-a6fb443cde5a/aq6wcgwaMb.lottie" 
        background="transparent" 
        speed="1" 
        style="width: 280px; height: 280px;" 
        loop 
        autoplay>
      </dotlottie-player>
      <h3 class="feedback-title"></h3>
      <p class="feedback-text"></p>
    </div>
  `;
  
  this.form.querySelector('.feedback-title').textContent = `Tudo certo, ${name}! ✨`;
  this.form.querySelector('.feedback-text').textContent = "Mensagem enviada. Que tal um cafézinho enquanto espera?";
}

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value.trim().substring(0, 500);
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    const button = this.form.querySelector(this.settings.button);
    if (button) {
      button.disabled = true;
      button.innerText = "Enviando...";
    }
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      const formData = this.getFormObject();
      
      if (formData.honeypot && formData.honeypot !== "") {
        this.displaySuccess("Visitante"); 
        return; 
      }

      const nameUsuario = formData.name || "Visitante";

      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        this.displaySuccess(nameUsuario);
      } else {
        this.displayError();
      }
    } catch (error) {
      this.displayError();
    }
  }

  init() {
    if (this.form) this.form.addEventListener("submit", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: '[data-form]',
  button: '[data-button]',
  error: '<h1 class="error">Ops! Algo deu errado. Por favor, tente novamente mais tarde. Enquanto isso, que tal dar uma olhada no meu portfólio? 🚀</h1>'
});

formSubmit.init();