/* ======================================
   مطابخ مودرن – Modern Kitchen
   Main JavaScript
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation ---
  const toggle = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelector('.navbar__links');
  const overlay = document.querySelector('.nav-overlay');

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on link click
    navLinks.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    lastScroll = currentScroll;
  });

  // --- Active Nav Link ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.navbar__link[href^="#"]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Testimonials Slider ---
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonials-nav button');
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (testimonialCards[index]) {
      testimonialCards[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    currentTestimonial = index;
  }

  if (testimonialCards.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
        resetTestimonialInterval();
      });
    });

    function autoAdvance() {
      testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
      }, 5000);
    }

    function resetTestimonialInterval() {
      clearInterval(testimonialInterval);
      autoAdvance();
    }

    autoAdvance();
  }

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox__img');
  const lightboxClose = document.querySelector('.lightbox__close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // --- Counter Animation ---
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(current) + suffix;
        }, 25);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || '';
      const email = formData.get('email') || '';
      const service = formData.get('service') || '';
      const message = formData.get('message') || '';

      // Format the message for WhatsApp
      let waText = `مرحباً، أود الاستفسار عن خدماتكم.%0A%0A`;
      waText += `*الاسم:* ${name}%0A`;
      waText += `*رقم الجوال:* ${phone}%0A`;
      if (email) waText += `*البريد الإلكتروني:* ${email}%0A`;
      waText += `*الخدمة المطلوبة:* ${service}%0A`;
      if (message) waText += `*تفاصيل المشروع:* ${message}%0A`;

      // Define the target WhatsApp number (using the one from the footer)
      const targetPhone = '966558459841';
      
      // Create the WhatsApp URL
      const waUrl = `https://wa.me/${targetPhone}?text=${waText}`;

      // Show success message briefly before redirecting
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: #25D366; color: white; padding: 16px 32px;
        border-radius: 12px; font-weight: 700; z-index: 9999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        animation: fadeIn 0.3s ease;
      `;
      successMsg.innerHTML = '<i class="fab fa-whatsapp"></i> جاري تحويلك إلى واتساب...';
      document.body.appendChild(successMsg);

      // Redirect to WhatsApp
      setTimeout(() => {
        window.open(waUrl, '_blank');
        successMsg.remove();
        contactForm.reset();
      }, 1500);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Blog Modal ---
  const blogModal = document.getElementById('blogModal');
  if (blogModal) {
    const readMoreLinks = document.querySelectorAll('.blog-card__link');
    const modalClose = document.getElementById('closeModal');
    const modalOverlay = blogModal.querySelector('.blog-modal__overlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalText = document.getElementById('modalText');

    readMoreLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Find the parent blog card
        const card = this.closest('.blog-card');
        if (!card) return;

        // Get data from the card
        const title = card.querySelector('.blog-card__title').textContent;
        const date = card.querySelector('.blog-card__date').textContent;

        // Populate modal basic details
        modalTitle.textContent = title;
        modalDate.textContent = date;
        
        // Get full text or fallback to excerpt
        const fullTextEl = card.querySelector('.blog-card__full-text');
        if (fullTextEl) {
          modalText.innerHTML = fullTextEl.innerHTML;
        } else {
          const excerpt = card.querySelector('.blog-card__excerpt').textContent;
          modalText.innerHTML = `<p>${excerpt}</p><p>تفاصيل المقال غير متوفرة حالياً.</p>`;
        }

        // Show modal
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeBlogModal = () => {
      blogModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeBlogModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeBlogModal);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && blogModal.classList.contains('active')) {
        closeBlogModal();
      }
    });
  }

  // --- Hero Background Slideshow ---
  const heroBgImg = document.querySelector('.hero__bg img');
  if (heroBgImg) {
    const images = [
      'assets/images/hero-kitchen.png',
      'assets/images/gallery-1.png',
      'assets/images/gallery-2.png',
      'assets/images/gallery-3.png',
      'assets/images/gallery-4.png'
    ];
    let currentImgIndex = 0;

    // Set initial transition
    heroBgImg.style.transition = 'opacity 0.8s ease-in-out';

    setInterval(() => {
      // Fade out
      heroBgImg.style.opacity = '0.2';

      setTimeout(() => {
        // Change image source
        currentImgIndex = (currentImgIndex + 1) % images.length;
        heroBgImg.src = images[currentImgIndex];

        // Wait a tiny bit for the new image to apply, then fade back in
        setTimeout(() => {
          heroBgImg.style.opacity = '1';
        }, 50);
      }, 800); // Wait for fade out to complete (0.8s)
    }, 6000); // Change image every 6 seconds
  }
});
