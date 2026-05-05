// Load shared HTML components
async function loadComponents() {
  try {
    // Load nav
    const navResponse = await fetch('components/nav.html');
    if (!navResponse.ok) throw new Error('Failed to load nav');
    const navHTML = await navResponse.text();
    const navContainer = document.querySelector('body');
    navContainer.insertAdjacentHTML('afterbegin', navHTML);

    // Load footer
    const footerResponse = await fetch('components/footer.html');
    if (!footerResponse.ok) throw new Error('Failed to load footer');
    const footerHTML = await footerResponse.text();
    const page = document.querySelector('.page');
    if (page) {
      page.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Load tagline strip before footer (now that footer exists in DOM)
    const taglineResponse = await fetch('components/tagline-strip.html');
    if (!taglineResponse.ok) throw new Error('Failed to load tagline');
    const taglineHTML = await taglineResponse.text();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.insertAdjacentHTML('beforebegin', taglineHTML);
    }

    // Set active nav link based on current page
    setActiveNavLink();

    // Initialize nav after loading
    initializeNav();
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

// Set active nav link based on current page URL
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Initialize nav toggle (from nav.js)
function initializeNav() {
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // close on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('open');
    });
  });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
