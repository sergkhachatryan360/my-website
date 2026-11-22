const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const serviceInfo = {
  alterations: {
    title: "Clothing Alterations",
    text: "A better fit can make a familiar piece feel new again. Ask us about trouser hemming, waist and seam adjustments, blouse alterations, dress alterations, coat and jacket alterations, shirt tailoring and other everyday clothing adjustments. The best approach and estimate depend on the garment and the work requested."
  },
  formal: {
    title: "Wedding & Formalwear",
    text: "Special occasions call for thoughtful preparation. We offer wedding dress alterations and alterations for formal dresses and occasionwear. Bring the garment in so we can review its fabric, construction, fit and timing with you. Cleaning or preservation options should be confirmed with the shop."
  },
  mens: {
    title: "Suits & Menswear",
    text: "From trousers and shirts to jackets and suits, the details of fit matter. Ask about suit tailoring, trouser alterations, shirt adjustments and uniform tailoring. We can discuss what is possible after seeing the garment."
  },
  dryclean: {
    title: "Dry Cleaning",
    text: "Some garments need care beyond an ordinary wash. Ask us about dry-cleaning options for your item, including fabric-specific considerations and expected turnaround. Service availability and timing are confirmed when you bring in or describe the garment."
  },
  curtains: {
    title: "Curtains & Drapery",
    text: "Curtains and drapery can be adjusted to better suit your windows and room. Ask about hemming, length adjustments and other curtain alteration needs. Please share the measurements and, if possible, bring the textile or a photo when requesting an estimate."
  },
  leather: {
    title: "Leather Repair",
    text: "Leather garments and accessories may require specialized attention. Ask about leather repair and care options. We will need to inspect the item before confirming whether the requested work is suitable and estimating the cost."
  },
  trousers: {
    title: "Trousers & Hemming",
    text: "A well-proportioned trouser length can make a noticeable difference. Ask about hemming, length adjustments and fit alterations. Bring the shoes you plan to wear with the trousers so the length can be discussed in context."
  },
  outerwear: {
    title: "Coats & Jackets",
    text: "Coats and jackets often need careful work around sleeves, seams and shape. Bring the item in so we can inspect its construction and discuss the alterations that may be possible."
  },
  shirts: {
    title: "Shirts & Blouses",
    text: "Ask about shirt tailoring and blouse alterations, including adjustments to fit and length. We can review the fabric and construction with you before recommending an approach."
  },
  children: {
    title: "Children's Clothing & Uniforms",
    text: "We offer alterations for children's clothing and uniforms. Bring the item in to discuss the fit, intended use and the adjustment required."
  }
};

const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

document.querySelectorAll(".service-card").forEach(card => {
  const open = () => {
    const info = serviceInfo[card.dataset.service];
    if (!info) return;
    modalTitle.textContent = info.title;
    modalText.textContent = info.text;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  card.addEventListener("click", open);
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelectorAll(".gallery-image").forEach(button => {
  button.addEventListener("click", () => {
    const thumb = button.querySelector("img");
    lightboxImage.src = thumb && thumb.currentSrc ? thumb.currentSrc.replace("w=900","w=1800") : button.dataset.full;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    closeLightbox();
  }
});

const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 500);
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach(element => {
    element.classList.add("visible");
  });
}

// If an online photo cannot load, keep the card polished with a navy-and-gold fallback.
document.querySelectorAll(".service-card img, .gallery-image img").forEach(image => {
  image.addEventListener("error", function onErr() {
    const next = (image.dataset.alt || "").split(" ").filter(Boolean);
    if (next.length) {
      image.dataset.alt = next.slice(1).join(" ");
      image.addEventListener("error", onErr, { once: true });
      image.src = next[0];
      return;
    }
    image.style.display = "none";
    const parent = image.closest(".service-card, .gallery-image");
    if (parent) parent.classList.add("image-unavailable");
  }, { once: true });
});
