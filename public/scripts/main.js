const whatsappNumber = 'xxx';
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const rfpForm = document.getElementById('rfpForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const year = document.getElementById('year');
const siteHeader = document.querySelector('.site-header');

if (year) year.textContent = new Date().getFullYear();

function updateHeaderState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle('header-scrolled', window.scrollY > 24);
}

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenuButton.innerHTML = isOpen
      ? '<i data-lucide="menu" class="h-5 w-5"></i>'
      : '<i data-lucide="x" class="h-5 w-5"></i>';
    if (window.lucide) lucide.createIcons();
  });
}

document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (!mobileMenu || !mobileMenuButton) return;
    mobileMenu.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.innerHTML = '<i data-lucide="menu" class="h-5 w-5"></i>';
    if (window.lucide) lucide.createIcons();
  });
});

function showModal() {
  if (successModal) successModal.classList.add('modal-visible');
}

function hideModal() {
  if (successModal) successModal.classList.remove('modal-visible');
}

function openWhatsApp(message) {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

document.querySelectorAll('[data-wa-message]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    openWhatsApp(button.getAttribute('data-wa-message'));
  });
});

if (rfpForm) {
  rfpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(rfpForm);
    const message = [
      'Halo PT. Glin Asia Solusi, saya ingin konsultasi layanan perusahaan.',
      '',
      `Nama: ${formData.get('name')}`,
      `Perusahaan: ${formData.get('company')}`,
      `Email: ${formData.get('email')}`,
      `WhatsApp/Telepon: ${formData.get('phone')}`,
      `Layanan: ${formData.get('service')}`,
      `Ringkasan kebutuhan: ${formData.get('message')}`
    ].join('\n');

    openWhatsApp(message);
    rfpForm.reset();
    showModal();
  });
}

if (closeModal) closeModal.addEventListener('click', hideModal);
if (successModal) {
  successModal.addEventListener('click', (event) => {
    if (event.target === successModal) hideModal();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideModal();
});

if (window.lucide) lucide.createIcons();

const hero = document.querySelector('.hero-interactive');
const tiltCard = document.querySelector('[data-tilt-card]');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hero && canHover) {
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mouse-x', `${x}%`);
    hero.style.setProperty('--mouse-y', `${y}%`);
  });
}

if (tiltCard && canHover) {
  tiltCard.addEventListener('pointermove', (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 18;
    const rotateX = ((0.5 - (y / rect.height)) * 14);

    tiltCard.style.setProperty('--tilt-x', `${rotateX}deg`);
    tiltCard.style.setProperty('--tilt-y', `${rotateY}deg`);
  });

  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.setProperty('--tilt-x', '0deg');
    tiltCard.style.setProperty('--tilt-y', '0deg');
  });
}
