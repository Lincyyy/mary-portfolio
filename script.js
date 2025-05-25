// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.1)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add animation classes and observe elements
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll("section:not(.hero)")
  sections.forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })

  // Add specific animations to elements
  const aboutText = document.querySelector(".about-text")
  const aboutStats = document.querySelector(".about-stats")
  const skillsGrid = document.querySelector(".skills-grid")
  const timelineItems = document.querySelectorAll(".timeline-item")
  const projectCards = document.querySelectorAll(".project-card")
  const certCards = document.querySelectorAll(".cert-card")
  const contactInfo = document.querySelector(".contact-info")
  const contactForm = document.querySelector(".contact-form-container")

  if (aboutText) {
    aboutText.classList.add("slide-in-left")
    observer.observe(aboutText)
  }

  if (aboutStats) {
    aboutStats.classList.add("slide-in-right")
    observer.observe(aboutStats)
  }

  if (skillsGrid) {
    skillsGrid.classList.add("fade-in")
    observer.observe(skillsGrid)
  }

  timelineItems.forEach((item, index) => {
    item.classList.add("fade-in")
    item.style.transitionDelay = `${index * 0.2}s`
    observer.observe(item)
  })

  projectCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  certCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  if (contactInfo) {
    contactInfo.classList.add("slide-in-left")
    observer.observe(contactInfo)
  }

  if (contactForm) {
    contactForm.classList.add("slide-in-right")
    observer.observe(contactForm)
  }
})

// Form submission
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true
    submitBtn.style.opacity = "0.7"

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.")
      contactForm.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
      submitBtn.style.opacity = "1"
    }, 2000)
  })
}

// Parallax effect for hero shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".floating-shape")

  shapes.forEach((shape, index) => {
    const speed = 0.3 + index * 0.1
    const yPos = -(scrolled * speed)
    const rotation = scrolled * 0.05
    shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`
  })
})

// Add hover effects to cards
document.querySelectorAll(".project-card, .stat-card, .cert-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Rotating subtitle functionality
function initRotatingSubtitle() {
  const subtitleElement = document.getElementById("rotating-subtitle")
  const roles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
  ]

  let currentIndex = 0

  function typeRole(text, callback) {
    let i = 0
    subtitleElement.textContent = ""

    function type() {
      if (i < text.length) {
        subtitleElement.textContent += text.charAt(i)
        i++
        setTimeout(type, 100)
      } else {
        setTimeout(callback, 2000) // Wait 2 seconds before next role
      }
    }

    type()
  }

  function eraseRole(callback) {
    const currentText = subtitleElement.textContent
    let i = currentText.length

    function erase() {
      if (i > 0) {
        subtitleElement.textContent = currentText.substring(0, i - 1)
        i--
        setTimeout(erase, 50)
      } else {
        setTimeout(callback, 500) // Wait 0.5 seconds before typing next
      }
    }

    erase()
  }

  function nextRole() {
    eraseRole(() => {
      currentIndex = (currentIndex + 1) % roles.length
      typeRole(roles[currentIndex], nextRole)
    })
  }

  // Start the rotation after initial load
  setTimeout(() => {
    typeRole(roles[currentIndex], nextRole)
  }, 2000)
}

// Initialize typing effect and rotating subtitle
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 80)
  }

  // Initialize rotating subtitle
  initRotatingSubtitle()
})

// Enhanced social link animations
document.querySelectorAll(".social-link").forEach((link, index) => {
  link.style.animationDelay = `${index * 0.1}s`

  // Add pulse effect on hover
  link.addEventListener("mouseenter", () => {
    link.style.animation = "pulse 0.6s ease-in-out"
  })

  link.addEventListener("mouseleave", () => {
    link.style.animation = ""
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Smooth reveal animations for elements
const revealElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        revealObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.15,
  },
)

revealElements.forEach((element) => {
  revealObserver.observe(element)
})

// Dynamic background colors for navbar
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollPercentage = scrollPosition / (documentHeight - windowHeight)

  // Change navbar accent based on scroll
  const navbar = document.querySelector(".navbar")
  const hue = Math.floor(scrollPercentage * 360)
  navbar.style.borderBottom = `3px solid hsl(${hue}, 70%, 60%)`
})

// Add click animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    this.appendChild(ripple)

    const x = e.clientX - e.target.offsetLeft
    const y = e.clientY - e.target.offsetTop

    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles and pulse animation
const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`
document.head.appendChild(additionalStyles)

// Preloader
window.addEventListener("load", () => {
  const preloader = document.createElement("div")
  preloader.className = "preloader"
  preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `

  const preloaderStyles = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
            color: white;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .preloader.fade-out {
            opacity: 0;
            pointer-events: none;
        }
    `

  const preloaderStyleSheet = document.createElement("style")
  preloaderStyleSheet.textContent = preloaderStyles
  document.head.appendChild(preloaderStyleSheet)

  document.body.appendChild(preloader)

  setTimeout(() => {
    preloader.classList.add("fade-out")
    setTimeout(() => {
      preloader.remove()
    }, 500)
  }, 1500)
})
