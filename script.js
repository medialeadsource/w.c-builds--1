<<<<<<< HEAD
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMenu = document.querySelector(".nav-menu")

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

const linksToCloseMenu = document.querySelectorAll(".nav-link, .mobile-phone, .mobile-social a")

linksToCloseMenu.forEach((link) => {
  link.addEventListener("click", () => {
  
    mobileMenuToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})


window.addEventListener("load", () => {
  let current = ""
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  const navLinks = document.querySelectorAll(".nav-link") 
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

const comparisonContainer = document.querySelector(".comparison-container")
const comparisonHandle = document.querySelector(".comparison-handle")
const comparisonAfter = document.querySelector(".comparison-after")

let isDragging = false

function updateComparison(x) {
  if (!comparisonContainer) return 

  const containerRect = comparisonContainer.getBoundingClientRect()
  const containerWidth = containerRect.width
  const offsetX = x - containerRect.left
  const percentage = Math.max(0, Math.min(100, (offsetX / containerWidth) * 100))

  comparisonHandle.style.left = `${percentage}%`

  comparisonAfter.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`
}

comparisonHandle.addEventListener("mousedown", (e) => {
  e.preventDefault() 
  isDragging = true
  comparisonContainer.classList.add("dragging")
})

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    updateComparison(e.clientX)
  }
})

document.addEventListener("mouseup", () => {
  isDragging = false
  comparisonContainer.classList.remove("dragging")
})


comparisonHandle.addEventListener("touchstart", (e) => {
  e.preventDefault()
  isDragging = true
  comparisonContainer.classList.add("dragging")
})

document.addEventListener("touchmove", (e) => {
  if (isDragging && e.touches.length > 0) {
    updateComparison(e.touches[0].clientX)
  }
})

document.addEventListener("touchend", () => {
  isDragging = false
  comparisonContainer.classList.remove("dragging")
})


const galleryVideos = document.querySelectorAll(".gallery-video")

const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target
      if (entry.isIntersecting) {
        video.play().catch((error) => {
          console.log("[v0] Video autoplay prevented:", error)
        })
      } else {
        video.pause()
      }
    })
  },
  {
    threshold: 0.5,
  },
)

galleryVideos.forEach((video) => {
  videoObserver.observe(video)
})

const galleryItems = document.querySelectorAll(".gallery-item")
const galleryModal = document.getElementById("galleryModal")
const modalImage = document.getElementById("modalImage")
const modalVideo = document.getElementById("modalVideo")
const modalClose = document.querySelector(".modal-close")
const modalPrev = document.querySelector(".modal-prev")
const modalNext = document.querySelector(".modal-next")
const modalCounter = document.getElementById("modalCounter")
const totalItems = 3

let currentIndex = 0

function openModal(index) {
  currentIndex = index
  updateModalContent()
  galleryModal.classList.add("active")
  document.body.style.overflow = "hidden" 
}

function closeModal() {
  galleryModal.classList.remove("active")
  document.body.style.overflow = ""

  modalVideo.pause()
  modalVideo.style.display = "none"
  modalImage.style.display = "none"
}

function updateModalContent() {

  if (currentIndex < 0 || currentIndex >= galleryItems.length) return

  const item = galleryItems[currentIndex]
  const type = item.getAttribute("data-type")


  modalImage.style.display = "none"
  modalVideo.style.display = "none"
  modalVideo.pause() 

  if (type === "video") {
    const videoSource = item.querySelector("source")
      ? item.querySelector("source").src
      : item.querySelector("video").src
    modalVideo.querySelector("source").src = videoSource
    modalVideo.load() 
    modalVideo.style.display = "block"
    modalVideo.play().catch((e) => console.log("Modal video play error:", e))
  } else {
    const img = item.querySelector("img")
    modalImage.src = img.src
    modalImage.alt = img.alt
    modalImage.style.display = "block"
  }

  modalCounter.textContent = `${currentIndex + 1} / ${totalItems}`
}

function showPrev() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems
  updateModalContent()
}

function showNext() {
  currentIndex = (currentIndex + 1) % totalItems
  updateModalContent()
}


galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openModal(index)
=======
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})


const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

const sections = document.querySelectorAll("section[id]")

function highlightNavLink() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 150
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLink) {
        navLink.classList.add("active")
      }
    }
  })
}

window.addEventListener("scroll", highlightNavLink)

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const navbarHeight = navbar.offsetHeight
      const targetPosition = target.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
>>>>>>> d33b8d42c84e88cd4e7b975187458265d262fe19
  })
})


<<<<<<< HEAD
modalClose.addEventListener("click", closeModal)
modalPrev.addEventListener("click", showPrev)
modalNext.addEventListener("click", showNext)


document.addEventListener("keydown", (e) => {
  if (!galleryModal.classList.contains("active")) return

  if (e.key === "Escape") closeModal()
  if (e.key === "ArrowLeft") showPrev()
  if (e.key === "ArrowRight") showNext()
})


galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeModal()
  }
})

const observerOptions = {
  threshold: 0.15, 
  rootMargin: "0px 0px -80px 0px",
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      observer.unobserve(entry.target)
=======
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
>>>>>>> d33b8d42c84e88cd4e7b975187458265d262fe19
    }
  })
}, observerOptions)


<<<<<<< HEAD
document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) => {
  revealObserver.observe(el)
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && href.length > 1) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offsetTop = target.offsetTop - 80 
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    }
  })
})
=======
document.querySelectorAll(".service-card, .feature-card, .value-card, .stat-card").forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(30px)"
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(element)
})

const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

 
  console.log("Form submitted:", data)

 
  alert("Thank you for your message! We'll get back to you soon.")

  
  contactForm.reset()
})


function animateCounter(element, target, duration = 2000) {
  let start = 0
  const suffix = element.textContent.replace(/[0-9]/g, "")
  const numericTarget = Number.parseInt(target)
  const increment = numericTarget / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= numericTarget) {
      element.textContent = target + suffix
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start) + suffix
    }
  }, 16)
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const number = entry.target.textContent
        entry.target.classList.add("counted")
        animateCounter(entry.target, number)
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".stat-number").forEach((stat) => {
  statObserver.observe(stat)
})

window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})


document.body.style.opacity = "0"
document.body.style.transition = "opacity 0.3s ease"

const serviceCards = document.querySelectorAll(".service-card")
const modal = document.getElementById("serviceModal")
const modalOverlay = document.getElementById("modalOverlay")
const modalClose = document.getElementById("modalClose")
const modalTitle = document.getElementById("modalTitle")
const modalBody = document.getElementById("modalBody")

const serviceData = {
  kitchen: {
    title: "Kitchen Remodeling",
    description:
      "Transform your kitchen into the heart of your home with our expert remodeling services. We specialize in creating functional, beautiful spaces that combine modern design with practical functionality.",
    features: [
      "Custom cabinet design and installation",
      "Countertop selection and installation (granite, quartz, marble)",
      "Modern appliance integration",
      "Lighting design and installation",
      "Flooring options (hardwood, tile, luxury vinyl)",
      "Backsplash design and installation",
      "Plumbing and electrical updates",
      "Space optimization and layout redesign",
    ],
    images: [
      "/public/modern-white-kitchen.png",
      "/public/luxury-marble-kitchen.png",
      "/public/contemporary-kitchen.png",
      "/public/kitchen-renovation.png",
    ],
    video: "/public/kitchen-remodeling-timelapse-video.jpg",
  },
  bathroom: {
    title: "Bathroom Remodeling",
    description:
      "Create your personal spa retreat with our comprehensive bathroom remodeling services. From modern fixtures to luxurious finishes, we bring your vision to life.",
    features: [
      "Walk-in shower and tub installations",
      "Custom vanity design",
      "Tile work and waterproofing",
      "Modern fixture installation",
      "Heated flooring options",
      "Lighting and ventilation",
      "Storage solutions",
      "Accessibility modifications",
    ],
    images: [
      "/public/luxury-bathroom-walk-in-shower.png",
      "/public/modern-bathroom-vanity.jpg",
      "/public/spa-bathroom-design.jpg",
      "/public/bathroom-tile-work.jpg",
    ],
    video: "/public/bathroom-renovation-process-video.jpg",
  },
  basement: {
    title: "Basement Finishing",
    description:
      "Unlock the potential of your basement with our professional finishing services. Add valuable living space to your home with a fully finished basement.",
    features: [
      "Framing and drywall installation",
      "Flooring installation",
      "Electrical and lighting",
      "Plumbing for bathrooms or wet bars",
      "Insulation and climate control",
      "Egress window installation",
      "Custom built-ins and storage",
      "Home theater or entertainment areas",
    ],
    images: [
      "/public/finished-basement-living-room.jpg",
      "/public/basement-home-theater.jpg",
      "/public/basement-bar-area.jpg",
      "/public/basement-bedroom.jpg",
    ],
    video: "/public/basement-finishing-transformation-video.jpg",
  },
  addition: {
    title: "Home Additions",
    description:
      "Expand your living space without moving. Our home addition services seamlessly integrate new space with your existing home structure.",
    features: [
      "Room additions (bedrooms, bathrooms, offices)",
      "Second-story additions",
      "Sunroom and porch enclosures",
      "Garage additions",
      "In-law suites",
      "Structural engineering and permits",
      "Matching existing architecture",
      "Complete interior finishing",
    ],
    images: [
      "/public/home-addition-construction.jpg",
      "/public/second-story-addition.jpg",
      "/public/sunroom-addition.jpg",
      "/public/master-suite-addition.jpg",
    ],
    video: "/public/home-addition-building-process-video.jpg",
  },
  commercial: {
    title: "Commercial Construction",
    description:
      "Professional commercial construction services for businesses of all sizes. From retail spaces to office buildings, we deliver quality results on time and on budget.",
    features: [
      "Retail space build-outs",
      "Office renovations",
      "Restaurant construction",
      "Medical facility build-outs",
      "Warehouse construction",
      "ADA compliance",
      "Commercial HVAC and electrical",
      "Project management and coordination",
    ],
    images: [
      "/public/commercial-retail-space.jpg",
      "/public/office-renovation.jpg",
      "/public/restaurant-construction.jpg",
      "/public/warehouse-interior.jpg",
    ],
    video: "/public/commercial-construction-timelapse-video.jpg",
  },
  custom: {
    title: "Custom Home Building",
    description:
      "Build the home of your dreams from the ground up. Our custom home building services bring your vision to life with quality craftsmanship and attention to detail.",
    features: [
      "Architectural design consultation",
      "Site preparation and foundation",
      "Framing and structural work",
      "Custom millwork and finishes",
      "Energy-efficient construction",
      "Smart home integration",
      "Landscaping coordination",
      "Final walkthrough and warranty",
    ],
    images: [
      "/public/custom-home-exterior.jpg",
      "/public/custom-home-interior.jpg",
      "/public/custom-home-kitchen.jpg",
      "/public/custom-home-master-bedroom.jpg",
    ],
    video: "/public/custom-home-building-process-video.jpg",
  },
}


serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const serviceType = card.getAttribute("data-service")
    const service = serviceData[serviceType]

    if (service) {
      modalTitle.textContent = service.title
      modalBody.innerHTML = `
        <p class="modal-description">${service.description}</p>
        
        <h3 style="font-family: var(--font-heading); font-size: 24px; margin-top: 32px; margin-bottom: 16px; color: var(--dark);">What We Offer</h3>
        <ul class="modal-features">
          ${service.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
        
        <h3 style="font-family: var(--font-heading); font-size: 24px; margin-top: 32px; margin-bottom: 16px; color: var(--dark);">Project Gallery</h3>
        <div class="modal-gallery">
          ${service.images
            .map((img) => `<div class="modal-gallery-item" style="background-image: url('${img}')"></div>`)
            .join("")}
        </div>
        
        <h3 style="font-family: var(--font-heading); font-size: 24px; margin-top: 32px; margin-bottom: 16px; color: var(--dark);">Watch Our Work</h3>
        <img src="${service.video}" alt="Service video" class="modal-video" />
        
        <div style="margin-top: 32px; padding: 24px; background: var(--gray-light); border-radius: 12px; text-align: center;">
          <p style="font-size: 18px; font-weight: 600; color: var(--dark); margin-bottom: 16px;">Ready to start your project?</p>
          <a href="#contact" class="btn btn-primary" style="display: inline-flex;">Get a Free Quote</a>
        </div>
      `

      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  })
})


function closeModal() {
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

modalClose.addEventListener("click", closeModal)
modalOverlay.addEventListener("click", closeModal)


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal()
  }
})


modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-primary")) {
    closeModal()
  }
})
>>>>>>> d33b8d42c84e88cd4e7b975187458265d262fe19
