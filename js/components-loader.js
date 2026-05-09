async function loadComponents() {
  try {
    const navRes = await fetch('components/nav.html');
    if (!navRes.ok) throw new Error('Failed to load nav');
    document.body.insertAdjacentHTML('afterbegin', await navRes.text());

    const page = document.querySelector('.page');

    const footerRes = await fetch('components/footer.html');
    if (!footerRes.ok) throw new Error('Failed to load footer');
    if (page) page.insertAdjacentHTML('beforeend', await footerRes.text());

    const taglineRes = await fetch('components/tagline-strip.html');
    if (!taglineRes.ok) throw new Error('Failed to load tagline');
    const footer = document.querySelector('footer');
    if (footer) footer.insertAdjacentHTML('beforebegin', await taglineRes.text());

    setActiveNavLink();
    initializeNav();
  } catch (err) {
    console.error('Error loading components:', err);
  }
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initializeNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!isOpen));
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', loadComponents);
