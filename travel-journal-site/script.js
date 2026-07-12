const trips = window.TRIPS || [];

const featuredTrip = document.querySelector("#featured-trip");
const tripGrid = document.querySelector("#trip-grid");
const photoWall = document.querySelector("#photo-wall");
const noteList = document.querySelector("#note-list");

function tagList(tags) {
  return tags.map((tag) => `<span>${tag}</span>`).join("");
}

function renderFeatured(trip) {
  featuredTrip.innerHTML = `
    <img src="${trip.cover}" alt="${trip.title}">
    <div class="feature-copy">
      <p>${trip.place} / ${trip.date}</p>
      <h3>${trip.title}</h3>
      <p>${trip.summary}</p>
      <div class="tags">${tagList(trip.tags)}</div>
    </div>
  `;
}

function renderTrips() {
  tripGrid.innerHTML = trips
    .map(
      (trip) => `
        <article class="trip-card">
          <img src="${trip.cover}" alt="${trip.title}">
          <div>
            <p class="meta">${trip.place} / ${trip.date}</p>
            <h3>${trip.title}</h3>
            <p>${trip.summary}</p>
            <div class="tags">${tagList(trip.tags)}</div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderPhotos() {
  const photos = trips.flatMap((trip) =>
    trip.photos.map((photo) => ({
      ...photo,
      tripTitle: trip.title,
      place: trip.place,
    })),
  );

  photoWall.innerHTML = photos
    .map(
      (photo) => `
        <figure class="photo-card">
          <img src="${photo.src}" alt="${photo.caption}">
          <figcaption>
            <span>${photo.caption}</span>
            <small>${photo.place} / ${photo.tripTitle}</small>
          </figcaption>
        </figure>
      `,
    )
    .join("");
}

function renderNotes() {
  noteList.innerHTML = trips
    .map(
      (trip) => `
        <article class="note-item">
          <p class="meta">${trip.place} / ${trip.date}</p>
          <h3>${trip.title}</h3>
          <ul>
            ${trip.notes.map((note) => `<li>${note}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

if (trips.length > 0) {
  renderFeatured(trips[0]);
  renderTrips();
  renderPhotos();
  renderNotes();
}
