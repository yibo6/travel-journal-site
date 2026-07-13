function parseTags(tags) {
  if (!tags) return [];
  try {
    return JSON.parse(tags);
  } catch {
    return String(tags)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
}

function groupPhotos(rows = []) {
  return rows.reduce(
    (groups, photo) => {
      const category = groups[photo.category] ? photo.category : "scenery";
      groups[category].push({
        src: photo.r2_key ? `/api/photo?key=${encodeURIComponent(photo.r2_key)}` : photo.src,
        caption: photo.caption,
      });
      return groups;
    },
    { scenery: [], me: [], food: [] },
  );
}

function diaryList(rows = []) {
  return rows.map((entry) => ({
    date: entry.date,
    memory: entry.memory,
  }));
}

export async function readTrips(db) {
  const [countriesResult, citiesResult, diariesResult, photosResult] = await Promise.all([
    db.prepare("SELECT * FROM countries ORDER BY order_index, title").all(),
    db.prepare("SELECT * FROM cities ORDER BY order_index, name").all(),
    db.prepare("SELECT * FROM diary_entries ORDER BY order_index, id").all(),
    db.prepare("SELECT * FROM photos ORDER BY order_index, id").all(),
  ]);

  const countries = countriesResult.results || [];
  const cities = citiesResult.results || [];
  const diaries = diariesResult.results || [];
  const photos = photosResult.results || [];

  return countries.map((country) => {
    const countryCities = cities.filter((city) => city.country_id === country.id);
    const countryDiaries = diaries.filter(
      (entry) => entry.country_id === country.id && !entry.city_id,
    );
    const countryPhotos = photos.filter(
      (photo) => photo.country_id === country.id && !photo.city_id,
    );

    return {
      id: country.id,
      title: country.title,
      place: country.place,
      date: country.date,
      route:
        country.route_x == null || country.route_y == null
          ? null
          : { x: country.route_x, y: country.route_y, landmark: country.landmark },
      cover: country.cover_url,
      summary: country.summary,
      tags: parseTags(country.tags),
      diary: diaryList(countryDiaries),
      footprintMap: country.map_title
        ? {
            title: country.map_title,
            note: country.map_note,
            places: countryCities.map((city) => ({
              name: city.map_label || city.name,
              id: city.id,
              x: city.map_x,
              y: city.map_y,
              visited: Boolean(city.visited),
            })),
          }
        : null,
      cities: countryCities.map((city) => {
        const cityDiaries = diaries.filter((entry) => entry.city_id === city.id);
        const cityPhotos = photos.filter((photo) => photo.city_id === city.id);
        return {
          id: city.id,
          name: city.name,
          date: city.date,
          summary: city.summary,
          diary: diaryList(cityDiaries),
          photoGroups: groupPhotos(cityPhotos),
        };
      }),
      photoGroups: groupPhotos(countryPhotos),
      photos: countryPhotos.map((photo) => ({
        src: photo.r2_key ? `/api/photo?key=${encodeURIComponent(photo.r2_key)}` : photo.src,
        caption: photo.caption,
      })),
    };
  });
}
