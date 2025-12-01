export const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Shop', href: '#shop' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export const DEFAULT_CONTENT = {
  hero: {
    title: 'Luxury Hair & Beauty, Redefined',
    subtitle: 'Experience the art of transformation',
    ctaPrimary: { label: 'Book Appointment', href: '#contact' },
    ctaSecondary: { label: 'View Services', href: '#services' }
  },
  services: [
    {
      title: 'Hair Styling',
      description: 'Professional cuts, coloring, and treatments for every style.',
      price: 'From $50',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'
    },
    {
      title: 'Beauty Services',
      description: 'Facials, lashes, brows, and makeup for flawless beauty.',
      price: 'From $40',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80'
    }
  ],
  products: [
    { name: 'Premium Hair Extensions', price: '$199', description: '100% human hair, salon quality', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80' },
    { name: 'Luxury Lace Wigs', price: '$299', description: 'Natural looking, comfortable fit', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80' },
    { name: 'Beauty Treatment Kit', price: '$89', description: 'Professional grade skincare essentials', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80' }
  ],
  reviews: [
    { name: 'Sarah Johnson', rating: 5, comment: 'Absolutely love my hair! The stylists are so talented and professional.', date: '2 weeks ago' },
    { name: 'Emily Davis', rating: 5, comment: 'Best beauty salon experience ever. The attention to detail is incredible.', date: '1 month ago' },
    { name: 'Jessica Martinez', rating: 5, comment: 'The extensions look so natural! I get compliments all the time.', date: '3 weeks ago' }
  ]
};

function buildMenu() {
  const menu = document.getElementById('main-nav');
  if (!menu) return;
  menu.innerHTML = NAV_LINKS.map(l => `<a href="${l.href}">${l.name}</a>`).join('');
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (typeof c === 'string') node.appendChild(document.createTextNode(c));
    else if (c) node.appendChild(c);
  });
  return node;
}

export function heroSection(data) {
  return el('section', { class: 'hero section', id: 'home' }, [
    el('div', { class: 'container' }, [
      el('h1', {}, data.title),
      el('p', {}, data.subtitle),
      el('div', { class: 'cta' }, [
        el('a', { class: 'btn primary', href: data.ctaPrimary.href }, data.ctaPrimary.label),
        el('a', { class: 'btn outline', href: data.ctaSecondary.href }, data.ctaSecondary.label),
      ])
    ])
  ]);
}

export function servicesSection(items) {
  return el('section', { class: 'section', id: 'services' }, [
    el('div', { class: 'container' }, [
      el('h2', {}, 'Our Services'),
      el('div', { class: 'grid services' }, items.map(s => card(s)))
    ])
  ]);
}

function card(s) {
  return el('article', { class: 'card' }, [
    el('img', { src: s.image, alt: s.title }),
    el('div', { class: 'pad' }, [
      el('h3', {}, s.title),
      el('p', {}, s.description),
      el('div', { class: 'price' }, s.price)
    ])
  ]);
}

export function productsSection(items) {
  return el('section', { class: 'section alt', id: 'shop' }, [
    el('div', { class: 'container' }, [
      el('h2', {}, 'Shop Premium Products'),
      el('div', { class: 'grid services' }, items.map(p => card({
        title: p.name, description: p.description, price: p.price, image: p.image
      })))
    ])
  ]);
}

export function reviewsSection(items) {
  return el('section', { class: 'section', id: 'reviews' }, [
    el('div', { class: 'container' }, [
      el('h2', {}, 'What Our Clients Say'),
      el('div', { class: 'grid services' }, items.map(r => el('article', { class: 'card' }, [
        el('div', { class: 'pad' }, [
          el('h3', {}, r.name),
          el('p', {}, '★★★★★'.slice(0, r.rating)),
          el('p', {}, r.comment),
          el('small', {}, r.date)
        ])
      ])))
    ])
  ]);
}

async function getServerContent() {
  try {
    const res = await fetch('./data/content.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Not found');
    return await res.json();
  } catch (e) {
    throw e;
  }
}

export async function loadContent() {
  // Try server JSON first
  try {
    const server = await getServerContent();
    return server;
  } catch {}
  // Then browser localStorage
  const stored = localStorage.getItem('habc-content');
  if (stored) return JSON.parse(stored);
  // Fallback to defaults
  return DEFAULT_CONTENT;
}

export async function render() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  buildMenu();
  const data = await loadContent();
  const root = document.getElementById('content');
  if (!root) return;
  root.innerHTML = '';
  root.append(
    heroSection(data.hero),
    servicesSection(data.services),
    productsSection(data.products),
    reviewsSection(data.reviews),
    el('section', { class: 'section dark', id: 'contact' }, [
      el('div', { class: 'container' }, [
        el('h2', {}, 'Ready for Your Transformation?'),
        el('div', { class: 'cta', style: 'justify-content:center' }, [
          el('a', { class: 'btn outline', href: 'tel:+15551234567' }, 'Call Us'),
          el('a', { class: 'btn outline', href: 'mailto:info@habcbeauty.com' }, 'Email Us')
        ])
      ])
    ])
  );
}

window.addEventListener('DOMContentLoaded', () => { render(); });
