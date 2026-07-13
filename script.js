const trips = window.TRIPS || [];

const travelMap = document.querySelector("#travel-map");
const tripPage = document.querySelector("#trip-page");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("p");
const lightboxClose = document.querySelector(".lightbox-close");
const backTop = document.querySelector("#back-top");

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function tripId(trip, index = 0) {
  return trip.id || slugify(trip.place) || `stop-${index + 1}`;
}

function tagList(tags) {
  return tags.map((tag) => `<span>${tag}</span>`).join("");
}

function diaryEntries(trip) {
  if (trip.diary?.length) return trip.diary;
  return (trip.notes || []).map((memory, index) => ({
    date: index === 0 ? trip.date : "Memory",
    memory,
  }));
}

function photoGroups(trip) {
  const groups = trip.photoGroups || {};
  return [
    {
      key: "scenery",
      title: "我拍的",
      photos: groups.scenery || trip.photos || [],
    },
    { key: "me", title: "我本人", photos: groups.me || [] },
    { key: "food", title: "我吃的", photos: groups.food || [] },
  ];
}

function renderPhotoButton(photo, place) {
  return `
    <button type="button" data-photo="${photo.src}" data-caption="${photo.caption} · ${place}">
      <img src="${photo.src}" alt="${photo.caption}">
      <span>${photo.caption}</span>
    </button>
  `;
}

function landmarkSvg(type) {
  const icons = {
    gate: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M24 92 H96" />
        <path d="M34 92 V46 H86 V92" />
        <path d="M26 46 H94 L82 30 H38 Z" />
        <path d="M49 92 V64 H71 V92 M44 56 H76" />
      </svg>
    `,
    chinaMountain: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M18 92 L42 50 L57 74 L72 36 L102 92 Z" />
        <path d="M42 50 L47 66 L35 66 M72 36 L80 58 L64 58" />
        <path d="M18 100 C34 92, 48 106, 62 98 S88 92, 104 100" />
        <path d="M24 34 C34 26, 48 26, 58 34" />
        <path d="M66 24 C78 16, 94 18, 102 28" />
      </svg>
    `,
    tower: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <rect x="48" y="36" width="24" height="58" rx="5" />
        <rect x="43" y="27" width="34" height="14" rx="4" />
        <path d="M52 27 L60 12 L68 27" />
        <circle cx="60" cy="52" r="8" />
        <path d="M38 95 H82 M45 74 H75" />
      </svg>
    `,
    burj: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M58 12 V100" />
        <path d="M58 24 C48 34, 45 50, 45 100" />
        <path d="M58 36 C70 48, 75 66, 75 100" />
        <path d="M42 100 H82" />
        <path d="M50 58 H66 M48 74 H72 M46 88 H76" />
        <path d="M34 100 V78 H44 M84 100 V70 H74" />
      </svg>
    `,
    eiffel: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M60 18 L36 100 H84 Z" />
        <path d="M45 54 H75 M41 72 H79 M32 100 H88" />
        <path d="M48 100 C54 82, 66 82, 72 100" />
      </svg>
    `,
    sun: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="52" r="24" />
        <path d="M60 16 V6 M60 98 V88 M24 52 H14 M106 52 H96 M35 27 L28 20 M92 84 L85 77 M85 27 L92 20 M28 84 L35 77" />
        <path d="M28 96 H92" />
      </svg>
    `,
    dome: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M30 96 V54 H90 V96" />
        <path d="M36 54 C40 28, 80 28, 84 54" />
        <path d="M60 28 V14 M48 96 V72 H72 V96 M24 96 H96" />
      </svg>
    `,
    mountain: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M18 96 L46 42 L64 96 Z" />
        <path d="M48 96 L78 28 L106 96 Z" />
        <path d="M46 42 L53 58 L40 58 M78 28 L88 52 L68 52" />
        <path d="M18 104 C34 96, 48 110, 64 102 S92 96, 106 104" />
      </svg>
    `,
  };
  return icons[type] || icons.tower;
}

function renderRoute() {
  if (!travelMap) return;

  travelMap.innerHTML = `
    <svg class="route-line" viewBox="0 0 1000 420" aria-hidden="true">
      <path class="route-base" d="M135 255 C205 170, 285 170, 360 250 S455 330, 515 245 S590 165, 650 258 S725 340, 790 240 S850 170, 875 250" />
      <path class="route-progress" pathLength="100" d="M135 255 C205 170, 285 170, 360 250 S455 330, 515 245 S590 165, 650 258 S725 340, 790 240 S850 170, 875 250" />
    </svg>
    <svg class="route-line-mobile" viewBox="0 0 360 900" aria-hidden="true">
      <path class="route-base" d="M96 70 C260 125, 82 205, 238 270 S92 395, 226 465 S92 585, 236 660 S112 785, 236 835" />
      <path class="route-progress" pathLength="100" d="M96 70 C260 125, 82 205, 238 270 S92 395, 226 465 S92 585, 236 660 S112 785, 236 835" />
    </svg>
    ${trips
      .filter((trip) => trip.route)
      .map(
        (trip, index) => `
          <a
            class="route-stop stop-${index + 1}"
            href="./trip.html?id=${tripId(trip, index)}"
            style="left: ${trip.route.x}%; top: ${trip.route.y}%"
            aria-label="打开 ${trip.title}"
            title="${trip.title}"
          >
            <span class="stop-number">${index + 1}</span>
            <span class="landmark">${landmarkSvg(trip.route.landmark)}</span>
            <strong>${trip.place}</strong>
            <small>${trip.title}</small>
          </a>
        `,
      )
      .join("")}
  `;
}

function startRouteAnimation() {
  if (!travelMap) return;

  const start = () => travelMap.classList.add("route-started");

  const startOnMobileScroll = () => {
    const check = () => {
      const mapTop = travelMap.getBoundingClientRect().top;
      if (mapTop < window.innerHeight * 0.42) {
        start();
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    requestAnimationFrame(check);
  };

  if (window.matchMedia("(max-width: 760px)").matches) {
    startOnMobileScroll();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    requestAnimationFrame(start);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        start();
        observer.disconnect();
      }
    },
    { threshold: 0.18 },
  );

  observer.observe(travelMap);
}

function renderTripPage() {
  if (!tripPage) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const trip =
    trips.find((item, index) => tripId(item, index) === id) ||
    trips[0];
  document.title = `${trip.title} - Ying's Little Atlas`;

  tripPage.innerHTML = `
    <a class="back-map" href="./index.html">← 返回路线</a>
    <article class="place-detail">
      <div class="detail-hero">
        <img src="${trip.cover}" alt="${trip.title}">
        <div>
          <p class="meta">${trip.place} / ${trip.date}</p>
          <h1>${trip.title}</h1>
          <p>${trip.summary}</p>
          <div class="tags">${tagList(trip.tags)}</div>
        </div>
      </div>
      <section class="detail-section">
        <p class="eyebrow">Travel diary</p>
        <h2>旅游日记</h2>
        <div class="diary-list">
          ${diaryEntries(trip)
            .map(
              (entry) => `
                <article class="diary-item">
                  <time>${entry.date}</time>
                  <p>${entry.memory}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="detail-section">
        <p class="eyebrow">Photos</p>
        <h2>照片</h2>
        <div class="photo-groups">
          ${photoGroups(trip)
            .map(
              (group) => `
                <section class="photo-category photo-category-${group.key}">
                  <h3>${group.title}</h3>
                  ${
                    group.photos.length
                      ? `<div class="detail-gallery">${group.photos
                          .map((photo) => renderPhotoButton(photo, trip.place))
                          .join("")}</div>`
                      : `<p class="empty-state">这一格先空着，等照片慢慢掉落。</p>`
                  }
                </section>
              `,
            )
            .join("")}
        </div>
      </section>
    </article>
  `;
}

function openLightbox(src, caption) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.hidden = false;
  document.body.classList.add("modal-open");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.classList.remove("modal-open");
}

renderRoute();
startRouteAnimation();
renderTripPage();

document.addEventListener("click", (event) => {
  const photoButton = event.target.closest("[data-photo]");
  if (photoButton) {
    openLightbox(photoButton.dataset.photo, photoButton.dataset.caption);
  }
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
});

window.addEventListener("scroll", () => {
  backTop?.classList.toggle("visible", window.scrollY > 520);
});

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
