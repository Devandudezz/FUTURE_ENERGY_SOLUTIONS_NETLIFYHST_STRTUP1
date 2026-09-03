/* =====================================================
   Future Energy Solutions — Complete JavaScript
   ===================================================== */

/* ── 1. NAVBAR: scroll shadow + mobile toggle ── */
(function () {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Add shadow on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
    }
  });

  // Mobile hamburger toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (navLinks && navLinks.classList.contains('open')) {
      if (navbar && !navbar.contains(e.target)) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      }
    }
  });
})();

/* ── 1.5. HERO IMAGE CAROUSEL CONTROLLER ── */
(function () {
  const slides   = document.querySelectorAll('.hero-slide');
  const dots     = document.querySelectorAll('.slider-dots .dot');
  const prevBtn  = document.getElementById('prevSlide');
  const nextBtn  = document.getElementById('nextSlide');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer    = null;

  function showSlide(index) {
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    let next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(nextSlide, 5500);
  }

  function stopAutoPlay() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      showSlide(i);
      startAutoPlay();
    });
  });

  // Start autoplay
  startAutoPlay();
})();

/* ── 1.8. HOMEPAGE INSTANT RESIDENTIAL SOLAR CALCULATOR ── */
(function () {
  const slider = document.getElementById('homeBillSlider');
  if (!slider) return;

  function calculateSolar() {
    // Get slider value - this is the monthly bill
    const monthlyBill = parseInt(slider.value, 10);

    // Update display value
    const billDisplay = document.getElementById('homeBillVal');
    if (billDisplay) {
      billDisplay.textContent = '₹ ' + monthlyBill.toLocaleString('en-IN') + ' / mo';
    }

    let systemSizeKW = 3.0;
    let subsidyAmount = 78000;
    let billCoveragePercent = 95;
    let systemDesc = 'Rooftop System';
    let showWarning = false;

    // EXACT CONSTRAINTS
    if (monthlyBill >= 3000 && monthlyBill < 6000) {
      // ₹3,000 - ₹5,999: Recommend 3 kW
      systemSizeKW = 3.0;
      subsidyAmount = 78000;
      billCoveragePercent = 95;
      systemDesc = 'Rooftop System';
      showWarning = false;
    } else if (monthlyBill >= 6000 && monthlyBill <= 10000) {
      // ₹6,000 - ₹10,000: Recommend 5 kW
      systemSizeKW = 5.0;
      subsidyAmount = 78000;
      billCoveragePercent = 90;
      systemDesc = 'Rooftop System';
      showWarning = false;
    } else if (monthlyBill > 10000) {
      // Greater than ₹10,000: Scale up from 10 kW
      // For every ₹5,000 above ₹10,000, add 5 kW
      const excessBill = monthlyBill - 10000;
      const additionalKw = Math.floor(excessBill / 5000) * 5;
      systemSizeKW = 10.0 + additionalKw;
      subsidyAmount = 78000;
      billCoveragePercent = 85;
      systemDesc = 'Custom System Required';
      showWarning = true;
    }

    // Calculate annual savings
    const monthlyCoverage = (monthlyBill * billCoveragePercent) / 100;
    const annualSavingsAmount = Math.round(monthlyCoverage * 12);

    // Calculate payback period
    const costPerKW = 55000;
    const totalSystemCost = systemSizeKW * costPerKW;
    const netCost = Math.max(0, totalSystemCost - subsidyAmount);
    const paybackYears = (netCost / annualSavingsAmount).toFixed(1);

    // Update all display elements
    document.getElementById('homeResSystem').textContent = systemSizeKW.toFixed(1) + ' kW';
    document.getElementById('homeResSystemSub').textContent = systemDesc;
    document.getElementById('homeResSubsidy').textContent = '₹ ' + subsidyAmount.toLocaleString('en-IN');
    document.getElementById('homeResSavings').textContent = '₹ ' + annualSavingsAmount.toLocaleString('en-IN');
    document.getElementById('homeResRoi').textContent = paybackYears + ' Years';

    // Show/hide warning message
    const warningElement = document.getElementById('calcQuoteNote');
    if (warningElement) {
      if (showWarning) {
        warningElement.style.display = 'block';
      } else {
        warningElement.style.display = 'none';
      }
    }
  }

  // Initialize
  slider.addEventListener('input', calculateSolar);
  slider.addEventListener('change', calculateSolar);
  calculateSolar();
})();



/* ── 2. AOS — Animate On Scroll ── */
(function () {
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Respect animation-delay if set inline
          const delay = entry.target.style.animationDelay || '0s';
          setTimeout(function () {
            entry.target.classList.add('aos-animate');
          }, parseFloat(delay) * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAOS);
  } else {
    initAOS();
  }
})();


/* ── 3. COUNTER ANIMATION (Stats bar) ── */
(function () {
  function animateCount(el, target, duration) {
    var start     = 0;
    var increment = target / (duration / 16);
    var timer     = setInterval(function () {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString('en-IN') + '+';
    }, 16);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el     = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          animateCount(el, target, 1800);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();


/* ── 4. SOLAR CALCULATOR ── */
function calcSolar() {
  var bill     = parseFloat(document.getElementById('monthlyBill').value)  || 0;
  var sunHours = parseFloat(document.getElementById('stateSelect').value)  || 4.0;
  var tariff   = parseFloat(document.getElementById('tariff').value)       || 7;
  var propType = document.getElementById('propType')
                   ? document.getElementById('propType').value
                   : 'residential';

  if (bill < 100) {
    clearResults();
    return;
  }

  // --- CALCULATIONS ---
  var monthlyUnits  = bill / tariff;                        // kWh/month
  var dailyUnits    = monthlyUnits / 30;                    // kWh/day
  var rawSize       = dailyUnits / sunHours;                // kW needed
  var systemSize    = Math.ceil(rawSize * 2) / 2;           // round to 0.5 kW

  // Coverage percentage (solar covers ~85% of load)
  var coverPct = Math.min(95, Math.round((systemSize * sunHours * 30 * tariff) / bill * 85));

  // Cost per kW by property type
  var costPerKw = propType === 'industrial' ? 42000
                : propType === 'commercial' ? 48000
                : 55000; // residential

  var totalCost  = systemSize * costPerKw;

  // Govt subsidy (PM Surya Ghar — residential only)
  var subsidy = 0;
  if (propType === 'residential') {
    if (systemSize <= 2) {
      subsidy = systemSize * 30000;
    } else if (systemSize <= 3) {
      subsidy = 60000 + (systemSize - 2) * 18000;
    } else {
      subsidy = 78000; // cap
    }
  }

  var netCost    = Math.max(0, totalCost - subsidy);
  var annualSave = Math.round(bill * 12 * (coverPct / 100));
  var roi        = netCost > 0 ? (netCost / annualSave).toFixed(1) : '< 1';
  var lifeSave   = annualSave * 25;

  // --- UPDATE DOM ---
  setText('systemSize', systemSize.toFixed(1) + ' kW');
  setText('syscost',    '₹' + formatINR(totalCost));
  setText('subsidy',    propType === 'residential' ? '₹' + formatINR(subsidy) : 'N/A (Commercial)');
  setText('netcost',    '₹' + formatINR(netCost));
  setText('annualSave', '₹' + formatINR(annualSave));
  setText('roi',        roi + ' yrs');
  setText('coverPct',   coverPct + '%');
  setText('lifeSave',   '₹' + formatINR(lifeSave));

  var bar = document.getElementById('coverBar');
  if (bar) bar.style.width = coverPct + '%';
}

function setText(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}

function clearResults() {
  ['systemSize','syscost','subsidy','netcost','annualSave','roi','lifeSave'].forEach(function(id){
    setText(id, '—');
  });
  setText('coverPct', '0%');
  var bar = document.getElementById('coverBar');
  if (bar) bar.style.width = '0%';
}

function formatINR(num) {
  num = Math.round(num);
  if (num >= 10000000) return (num / 10000000).toFixed(1) + ' Cr';
  if (num >= 100000)   return (num / 100000).toFixed(1) + ' L';
  return num.toLocaleString('en-IN');
}

// Run on page load if calculator exists
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('monthlyBill')) {
    calcSolar();
  }
});


/* ── 5. PROJECT FILTER ── */
function filterProjects(type, btn) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Show/hide cards
  document.querySelectorAll('.project-card').forEach(function (card) {
    if (type === 'all' || card.getAttribute('data-type') === type) {
      card.style.display = '';
      card.style.animation = 'fadeInUp .4s ease both';
    } else {
      card.style.display = 'none';
    }
  });
}


/* ── 6. FORM VALIDATION ── */
(function () {
  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      field.classList.remove('input-error');
      if (!field.value.trim()) {
        field.classList.add('input-error');
        valid = false;
      }
    });

    // Phone validation (10 digits minimum)
    var phone = form.querySelector('[name="phone"]');
    if (phone && phone.value.trim()) {
      var digits = phone.value.replace(/\D/g, '');
      if (digits.length < 10) {
        phone.classList.add('input-error');
        valid = false;
      }
    }

    // Email validation
    var email = form.querySelector('[name="email"]');
    if (email && email.value.trim()) {
      var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email.value.trim())) {
        email.classList.add('input-error');
        valid = false;
      }
    }

    return valid;
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Contact form
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        if (!validateForm(contactForm)) {
          e.preventDefault();
          showToast('Please fill all required fields correctly.', 'error');
        }
      });
    }

    // Quote form
    var quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
      quoteForm.addEventListener('submit', function (e) {
        if (!validateForm(quoteForm)) {
          e.preventDefault();
          showToast('Please fill all required fields correctly.', 'error');
        }
      });
    }

    // Remove error on input
    document.querySelectorAll('.form-input').forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('input-error');
      });
    });
  });
})();


/* ── 7. PROPERTY TYPE SELECTOR (Quote page) ── */
document.addEventListener('DOMContentLoaded', function () {
  var propOptions = document.querySelectorAll('.prop-option input[type="radio"]');
  propOptions.forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.querySelectorAll('.po-box').forEach(function (box) {
        box.classList.remove('selected');
      });
      radio.closest('.prop-option').querySelector('.po-box').classList.add('selected');
    });
    // Set initial selected state
    if (radio.checked) {
      radio.closest('.prop-option').querySelector('.po-box').classList.add('selected');
    }
  });
});


/* ── 8. TOAST NOTIFICATION ── */
function showToast(message, type) {
  type = type || 'success';
  var wrap = document.querySelector('.flash-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'flash-wrap';
    document.body.appendChild(wrap);
  }
  var toast = document.createElement('div');
  toast.className = 'flash flash-' + type;
  toast.innerHTML =
    '<span>' + (type === 'success' ? '✅' : '❌') + ' ' + message + '</span>' +
    '<button class="flash-close" onclick="this.parentElement.remove()">✕</button>';
  wrap.appendChild(toast);
  setTimeout(function () {
    if (toast.parentElement) toast.remove();
  }, 5000);
}


/* ── 9. SMOOTH SCROLL for anchor links ── */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80; // navbar height
        var top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});


/* ── 10. BACK TO TOP BUTTON ── */
(function () {
  var btn = document.createElement('button');
  btn.id        = 'backToTop';
  btn.innerHTML = '↑';
  btn.title     = 'Back to top';
  btn.style.cssText = [
    'position:fixed', 'bottom:24px', 'right:24px', 'z-index:999',
    'width:44px', 'height:44px', 'border-radius:50%',
    'background:#16a34a', 'color:#fff', 'border:none',
    'font-size:1.2rem', 'font-weight:700', 'cursor:pointer',
    'box-shadow:0 4px 16px rgba(22,163,74,.4)',
    'display:none', 'align-items:center', 'justify-content:center',
    'transition:all .3s ease', 'line-height:1'
  ].join(';');

  document.body.appendChild(btn);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btn.addEventListener('mouseenter', function () {
    btn.style.transform   = 'translateY(-3px)';
    btn.style.boxShadow   = '0 8px 24px rgba(22,163,74,.5)';
  });
  btn.addEventListener('mouseleave', function () {
    btn.style.transform   = '';
    btn.style.boxShadow   = '0 4px 16px rgba(22,163,74,.4)';
  });
})();


/* ── 11. EXTRA CSS injected via JS (mobile nav, form errors, filter btns) ── */
(function () {
  var style = document.createElement('style');
  style.textContent = `

    /* Mobile nav open state */
    @media (max-width: 900px) {
      .nav-toggle { display: flex !important; }
      .nav-links {
        display: none;
        position: absolute;
        top: 68px; left: 0; right: 0;
        background: #fff;
        flex-direction: column;
        padding: 16px 20px 24px;
        border-bottom: 1px solid #e5e7eb;
        box-shadow: 0 8px 24px rgba(0,0,0,.10);
        z-index: 998;
        gap: 4px;
      }
      .nav-links.open { display: flex !important; }
      .nav-links a { padding: 10px 14px; font-size: .95rem; }
      .nav-cta-li { margin-left: 0; margin-top: 8px; }
      .nav-cta-li a { width: 100%; justify-content: center; }

      .hero-grid { grid-template-columns: 1fr; gap: 40px; padding: 60px 0; }
      .hero-visual { display: none; }
      .hero h1 { font-size: 2.2rem; }
      .stats-bar { grid-template-columns: repeat(2,1fr); padding: 24px 20px; }
      .stat-sep { display: none; }
      .two-col { grid-template-columns: 1fr; gap: 36px; }
      .two-col.reverse .col-visual { order: 0; }
      .two-col.reverse .col-content { order: 0; }
      .cards-3 { grid-template-columns: 1fr; }
      .cards-4 { grid-template-columns: repeat(2,1fr); }
      .highlights-grid { grid-template-columns: 1fr; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .services-preview-grid { grid-template-columns: repeat(2,1fr); }
      .team-grid { grid-template-columns: repeat(2,1fr); }
      .cert-grid { grid-template-columns: repeat(2,1fr); }
      .footer-grid { grid-template-columns: 1fr; gap: 32px; }
      .calc-wrap { grid-template-columns: 1fr; }
      .contact-grid { grid-template-columns: 1fr; }
      .quote-grid { grid-template-columns: 1fr; }
      .projects-grid { grid-template-columns: 1fr; }
      .steps-grid { grid-template-columns: repeat(2,1fr); }
      .float-card { right: 0; bottom: -20px; min-width: 160px; }
      .cta-btns { flex-direction: column; align-items: center; }
      .hero-btns { flex-direction: column; }
      .btn-lg { width: 100%; justify-content: center; }
    }

    @media (max-width: 540px) {
      .cards-4 { grid-template-columns: 1fr; }
      .services-preview-grid { grid-template-columns: 1fr; }
      .team-grid { grid-template-columns: 1fr; }
      .cert-grid { grid-template-columns: 1fr; }
      .steps-grid { grid-template-columns: 1fr; }
      .result-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .prop-type-grid { grid-template-columns: 1fr; }
      .stats-bar { grid-template-columns: 1fr; }
      .proj-stats { grid-template-columns: repeat(2,1fr); }
      .quick-contact-grid { grid-template-columns: 1fr; }
    }

    /* Form validation error */
    .input-error {
      border-color: #dc2626 !important;
      background: #fef2f2 !important;
      box-shadow: 0 0 0 3px rgba(220,38,38,.1) !important;
    }

    /* Forms */
    .solar-form { display: flex; flex-direction: column; gap: 18px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-label { font-size: .88rem; font-weight: 600; color: #374151; }
    .form-input {
      padding: 12px 16px; border-radius: 10px;
      border: 1.5px solid #e5e7eb; font-size: .93rem;
      color: #374151; background: #fff;
      transition: all .25s ease; outline: none; width: 100%;
      font-family: inherit;
    }
    .form-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,.12); }
    .form-textarea { resize: vertical; min-height: 130px; }
    .form-select { cursor: pointer; appearance: auto; }
    .form-section-title {
      font-size: .82rem; font-weight: 700; color: #16a34a;
      text-transform: uppercase; letter-spacing: .7px;
      padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;
    }

    /* Property type selector */
    .prop-type-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
    .prop-option { cursor: pointer; }
    .prop-option input { display: none; }
    .po-box {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 16px 10px; border-radius: 10px;
      border: 2px solid #e5e7eb; background: #f9fafb;
      font-size: .85rem; font-weight: 600; color: #374151;
      transition: all .25s ease; cursor: pointer;
    }
    .po-box:hover { border-color: #16a34a; background: #f0fdf4; }
    .po-box.selected { border-color: #16a34a; background: #dcfce7; color: #15803d; }
    .po-box span:first-child { font-size: 1.5rem; }

    /* Filter tabs */
    .filter-tabs { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
    .filter-btn {
      padding: 9px 22px; border-radius: 999px;
      border: 2px solid #e5e7eb; background: #fff;
      font-size: .88rem; font-weight: 600; color: #6b7280;
      cursor: pointer; transition: all .25s ease;
    }
    .filter-btn:hover { border-color: #16a34a; color: #16a34a; }
    .filter-btn.active { background: #16a34a; border-color: #16a34a; color: #fff; }

    /* Project cards */
    .projects-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
    .project-card {
      background: #fff; border: 1px solid #f3f4f6; border-radius: 20px;
      overflow: hidden; transition: all .3s ease;
    }
    .project-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,.12); }
    .pc-visual {
      background: linear-gradient(135deg,#166534,#16a34a);
      padding: 36px 20px; text-align: center; position: relative;
    }
    .pc-type-badge {
      position: absolute; top: 12px; right: 12px;
      background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25);
      color: #fff; border-radius: 999px; padding: 3px 12px;
      font-size: .75rem; font-weight: 700;
    }
    .pc-body { padding: 22px; }
    .pc-body h3 { font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 8px; }
    .pc-body p  { font-size: .87rem; color: #6b7280; margin-bottom: 16px; line-height: 1.6; }
    .pc-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .pc-meta-item {
      display: flex; align-items: center; gap: 6px;
      font-size: .8rem; color: #374151;
      background: #f9fafb; border-radius: 7px; padding: 6px 10px;
    }

    /* Project stats */
    .proj-stats {
      display: grid; grid-template-columns: repeat(4,1fr); gap: 20px;
      background: linear-gradient(135deg,#14532d,#15803d);
      border-radius: 20px; padding: 36px 40px;
    }
    .ps-item { text-align: center; }
    .ps-num { font-size: 2rem; font-weight: 900; color: #4ade80; }
    .ps-lbl { font-size: .84rem; color: rgba(255,255,255,.7); margin-top: 4px; }

    /* Steps */
    .steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; margin-top: 40px; }
    .step-card {
      background: #fff; border: 1px solid #f3f4f6; border-radius: 16px;
      padding: 28px 20px; text-align: center; transition: all .3s ease; position: relative;
    }
    .step-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(0,0,0,.10); }
    .step-num {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      background: #16a34a; color: #fff; width: 28px; height: 28px;
      border-radius: 50%; font-size: .78rem; font-weight: 800;
      display: flex; align-items: center; justify-content: center;
    }
    .step-icon { font-size: 2.2rem; margin: 10px 0 14px; }
    .step-card h4 { font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 8px; }
    .step-card p  { font-size: .87rem; color: #6b7280; line-height: 1.6; }

    /* Calculator result items */
    .ri-icon { font-size: 1.4rem; margin-bottom: 6px; }
    .ri-val  { font-size: 1.2rem; font-weight: 800; color: #111827; }
    .ri-lbl  { font-size: .76rem; color: #6b7280; margin-top: 3px; }
    .result-item { background:#fff; border:1px solid #f3f4f6; border-radius:12px; padding:16px; text-align:center; }
    .highlight-result { background:#f0fdf4; border-color:#bbf7d0; }
    .highlight-result .ri-val { color: #16a34a; }
    .result-bar { margin-bottom: 20px; }
    .rb-label {
      display: flex; justify-content: space-between;
      font-size: .85rem; font-weight: 600; color: #374151; margin-bottom: 8px;
    }
    .rb-track {
      height: 10px; background: #e5e7eb; border-radius: 999px; overflow: hidden;
    }
    .rb-fill {
      height: 100%; background: linear-gradient(90deg,#22c55e,#16a34a);
      border-radius: 999px; transition: width .8s ease;
    }
    .result-savings-box {
      background: linear-gradient(135deg,#14532d,#15803d);
      border-radius: 12px; padding: 18px 20px;
      display: flex; align-items: center; justify-content: space-between;
      color: rgba(255,255,255,.85); font-size: .9rem; font-weight: 600;
    }
    .rsb-val { 
  font-size: 1.4rem; 
  font-weight: 900; 
  color: #4ade80; 
}

  `;
  document.head.appendChild(style);
})();


/* ── WHATSAPP FORM SUBMISSION WITH EMAIL ── */

function sendToWhatsApp(event) {
  event.preventDefault();

  // Get form values
  const name = document.querySelector('#contactForm input[name="name"]').value.trim();
  const phone = document.querySelector('#contactForm input[name="phone"]').value.trim();
  const email = document.querySelector('#contactForm input[name="email"]').value.trim();
  const location = document.querySelector('#contactForm input[name="location"]').value.trim();
  const message = document.querySelector('#contactForm textarea[name="message"]').value.trim();

  // Validate
  if (!name || !phone || !email || !location || !message) {
    alert('Please fill in all fields!');
    return;
  }

  // Create WhatsApp message
  const whatsappMessage = `
Hi Future Energy Solutions,

I'm interested in your solar solutions.

*Personal Details:*
• Name: ${name}
• Phone: ${phone}
• Email: ${email}
• Location: ${location}

*Message:*
${message}

Looking forward to your response!
  `.trim();

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const adminWhatsAppNumber = '919495240204';

  // Send confirmation email
  const emailData = {
    to_email: email,
    user_name: name,
    user_phone: phone,
    user_location: location,
    user_message: message,
    form_type: 'Contact Inquiry'
  };

  fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Email response:', data);
  })
  .catch(error => {
    console.error('Email error:', error);
  });

  // Redirect to WhatsApp
  const whatsappURL = `https://wa.me/${adminWhatsAppNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');

  // Show confirmation
  alert('Opening WhatsApp...\nConfirmation email sent to: ' + email);
}
