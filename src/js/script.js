const products = [
  {
    name: 'Teclado Nebula TKL',
    category: 'Periférico',
    price: 329.9,
    promo: 279.9,
    image: 'keyboard.svg',
    tag: 'Switch red',
    description: 'Formato compacto, resposta rápida e iluminação configurável para setups menores.'
  },
  {
    name: 'Headset Rift 7.1',
    category: 'Áudio',
    price: 449.9,
    promo: 379.9,
    image: 'headset.svg',
    tag: 'Som imersivo',
    description: 'Microfone destacável e áudio espacial para ouvir passos, efeitos e chamadas com clareza.'
  },
  {
    name: 'Mouse Pulse Pro',
    category: 'Precisão',
    price: 259.9,
    promo: 199.9,
    image: 'mouse.svg',
    tag: '16K DPI',
    description: 'Sensor preciso, peso reduzido e pegada confortável para partidas competitivas.'
  },
  {
    name: 'Controle Orion X',
    category: 'Console',
    price: 389.9,
    promo: 339.9,
    image: 'controller.svg',
    tag: 'Wireless',
    description: 'Controle sem fio com gatilhos responsivos para corrida, aventura e jogos de luta.'
  },
  {
    name: 'Combo Stream Start',
    category: 'Combo',
    price: 899.9,
    promo: 749.9,
    image: 'stream-combo.svg',
    tag: 'Creator',
    description: 'Kit com webcam, microfone e luz de mesa para começar transmissões com imagem limpa.'
  },
  {
    name: 'Mousepad Arena XL',
    category: 'Acessório',
    price: 149.9,
    promo: 99.9,
    image: 'mousepad.svg',
    tag: 'Extra large',
    description: 'Superfície ampla, base antiderrapante e costura reforçada para movimentos longos.'
  }
];

const contactInfo = {
  phone: '(11) 4002-2026',
  email: 'contato@levelupgames.com.br',
  instagram: '@levelupgames.gg',
  linkedin: 'Level Up Games'
};

const formatCurrency = value => value.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const getAssetPrefix = () => {
  const isInsidePages = window.location.pathname.includes('/pages/');
  return isInsidePages ? '../src/assets/img/' : 'src/assets/img/';
};

function setupMenu() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!button || !nav) return;

  button.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
}

function markCurrentPage() {
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === page) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card';
  article.innerHTML = `
    <img src="${getAssetPrefix()}${product.image}" alt="Imagem do produto ${product.name}">
    <div class="product-card__body">
      <span>${product.tag}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>${formatCurrency(product.promo)}</strong>
    </div>
  `;
  return article;
}

function renderProducts() {
  const preview = document.querySelector('[data-products-preview]');
  const list = document.querySelector('[data-products-list]');

  if (preview) {
    products.slice(0, 3).forEach(product => preview.appendChild(createProductCard(product)));
  }

  if (list) {
    products.forEach(product => list.appendChild(createProductCard(product)));
  }
}

function renderPromoTable() {
  const tbody = document.querySelector('[data-promo-table]');
  if (!tbody) return;

  products.forEach(product => {
    const economy = product.price - product.promo;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${formatCurrency(product.price)}</td>
      <td><strong>${formatCurrency(product.promo)}</strong></td>
      <td>${formatCurrency(economy)}</td>
    `;
    tbody.appendChild(row);
  });
}

function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  const message = document.querySelector('[data-form-message]');
  if (!form || !message) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const description = String(data.get('description') || '').trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name.length < 3 || !emailIsValid || description.length < 15) {
      message.textContent = 'Confira nome, email e descrição antes de enviar.';
      message.className = 'form-message form-message--error';
      return;
    }

    message.textContent = `Obrigado, ${name}! Sua mensagem foi enviada para a equipe Level Up Games.`;
    message.className = 'form-message form-message--success';
    form.reset();
  });
}

function renderFooter() {
  const footer = document.querySelector('[data-footer]');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-grid">
      <div>
        <a class="brand brand--footer" href="${document.body.dataset.page === 'home' ? 'index.html' : '../index.html'}">
          <span class="brand__mark">LUG</span>
          <span class="brand__text">Level Up Games</span>
        </a>
        <p>Loja gamer com curadoria para montar setups competitivos, confortáveis e bonitos.</p>
      </div>
      <address>
        <strong>Contato</strong>
        <a href="tel:+551140022026">${contactInfo.phone}</a>
        <a href="mailto:${contactInfo.email}">${contactInfo.email}</a>
      </address>
      <div>
        <strong>Redes sociais</strong>
        <p>${contactInfo.instagram}</p>
        <p>${contactInfo.linkedin}</p>
      </div>
    </div>
    <p class="copyright">© ${new Date().getFullYear()} Level Up Games. Todos os direitos reservados.</p>
  `;
}

setupMenu();
markCurrentPage();
renderProducts();
renderPromoTable();
setupContactForm();
renderFooter();
