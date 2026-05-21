const categories = [
  { name: 'Hardware', detail: 'placas, memória e armazenamento', icon: '⚙' },
  { name: 'Periféricos', detail: 'teclados, mouses e headsets', icon: '⌨' },
  { name: 'Computadores', detail: 'máquinas prontas para jogar', icon: '▣' },
  { name: 'Monitores', detail: 'alta taxa e baixa latência', icon: '▤' },
  { name: 'Cadeiras gamer', detail: 'conforto para longas sessões', icon: '◈' },
  { name: 'Acessórios', detail: 'mousepads, suportes e luzes', icon: '✦' }
];

const products = [
  {
    name: 'Teclado Neon Strike',
    category: 'Periféricos',
    price: 429.9,
    promo: 329.9,
    image: 'produto-teclado.png',
    tag: 'RGB mecânico',
    description: 'Teclado gamer iluminado, switches mecânicos e visual premium para setups de alta performance.'
  },
  {
    name: 'Headset Rift 7.1',
    category: 'Periféricos',
    price: 449.9,
    promo: 379.9,
    image: 'produto-headset.png',
    tag: 'Som 7.1',
    description: 'Headset com microfone, iluminação neon e áudio imersivo para partidas e chamadas.'
  },
  {
    name: 'Mouse Pulse Pro',
    category: 'Periféricos',
    price: 259.9,
    promo: 199.9,
    image: 'produto-mouse.png',
    tag: '16K DPI',
    description: 'Mouse gamer com iluminação RGB, pegada confortável e precisão para jogos competitivos.'
  },
  {
    name: 'PC Gamer RTX Forge',
    category: 'Computadores',
    price: 6999.9,
    promo: 5899.9,
    image: 'produto-pc-gamer.png',
    tag: 'RTX ready',
    description: 'Desktop gamer com gabinete RGB, refrigeração reforçada e foco em alto desempenho.'
  },
  {
    name: 'Monitor Quantum 27',
    category: 'Monitores',
    price: 1899.9,
    promo: 1499.9,
    image: 'produto-monitor.png',
    tag: '165Hz QHD',
    description: 'Monitor gamer curvo com alta taxa de atualização, HDR e visual neon futurista.'
  },
  {
    name: 'Cadeira Victory Pro',
    category: 'Cadeiras gamer',
    price: 1399.9,
    promo: 1099.9,
    image: 'produto-cadeira.png',
    tag: 'Ergonômica',
    description: 'Cadeira gamer com apoio ajustável, materiais premium e estilo Level Up Games.'
  }
];

const contactInfo = {
  phone: '(11) 4002-2026',
  email: 'contato@levelupgames.com.br',
  instagram: '@levelupgames.gg',
  linkedin: 'Level Up Games',
  copyright: 'Level Up Games'
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

function renderCategories() {
  document.querySelectorAll('[data-categories]').forEach(container => {
    categories.forEach(category => {
      const article = document.createElement('article');
      article.className = 'category-card';
      article.innerHTML = `
        <span aria-hidden="true">${category.icon}</span>
        <h3>${category.name}</h3>
        <p>${category.detail}</p>
      `;
      container.appendChild(article);
    });
  });
}

function createProductCard(product) {
  const economy = product.price - product.promo;
  const article = document.createElement('article');
  article.className = 'product-card';
  article.innerHTML = `
    <img src="${getAssetPrefix()}${product.image}" alt="Imagem do produto ${product.name}">
    <div class="product-card__body">
      <div class="product-card__meta">
        <span>${product.tag}</span>
        <small>${product.category}</small>
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price-box">
        <del>${formatCurrency(product.price)}</del>
        <strong>${formatCurrency(product.promo)}</strong>
        <em>Economize ${formatCurrency(economy)}</em>
      </div>
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
          <img class="brand__logo" src="${getAssetPrefix()}logo-level-up-games-neon.png" alt="">
          <span class="brand__text">Level Up Games</span>
        </a>
        <p>Loja gamer fictícia com curadoria de hardware, periféricos, computadores, monitores, cadeiras e acessórios.</p>
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
    <p class="copyright">© ${new Date().getFullYear()} ${contactInfo.copyright}. Todos os direitos reservados.</p>
  `;
}

setupMenu();
markCurrentPage();
renderCategories();
renderProducts();
renderPromoTable();
setupContactForm();
renderFooter();
