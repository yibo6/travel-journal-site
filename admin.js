const statusEl = document.querySelector("#admin-status");
const loginPanel = document.querySelector("#admin-login");
const appPanel = document.querySelector("#admin-app");
const loginForm = document.querySelector("#login-form");
const cityForm = document.querySelector("#city-form");
const diaryForm = document.querySelector("#diary-form");
const photoForm = document.querySelector("#photo-form");
const countrySelect = document.querySelector("#country-select");
const citySelects = document.querySelectorAll(".city-select");
const logoutButton = document.querySelector("#logout-button");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#9d4b4b" : "#557d5d";
}

function showApp(isLoggedIn) {
  loginPanel.hidden = isLoggedIn;
  appPanel.hidden = !isLoggedIn;
}

function formValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "请求失败");
  return data;
}

function fillSelects(countries, cities) {
  countrySelect.innerHTML = countries
    .map((country) => `<option value="${country.id}">${country.title}</option>`)
    .join("");

  const cityOptions = cities
    .map(
      (city) =>
        `<option value="${city.id}" data-country-id="${city.country_id}">${city.name}</option>`,
    )
    .join("");

  citySelects.forEach((select) => {
    select.innerHTML = cityOptions;
  });
}

async function refreshAdminData() {
  const data = await api("./api/admin/bootstrap");
  fillSelects(data.countries, data.cities);
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = formValues(loginForm);

  try {
    await api("./api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password: values.password }),
    });
    showApp(true);
    await refreshAdminData();
    setStatus("登录成功。");
  } catch (error) {
    setStatus(error.message, true);
  }
});

logoutButton?.addEventListener("click", async () => {
  try {
    await api("./api/admin/logout", { method: "POST", body: "{}" });
  } catch (error) {
    console.warn(error);
  }
  showApp(false);
  setStatus("已退出。");
});

cityForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = formValues(cityForm);
  const cityId = values.id || slugify(values.name);

  try {
    await api("./api/admin/cities", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        id: cityId,
        map_x: Number(values.map_x),
        map_y: Number(values.map_y),
      }),
    });

    cityForm.reset();
    await refreshAdminData();
    setStatus("城市已保存。");
  } catch (error) {
    setStatus(error.message, true);
  }
});

diaryForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = formValues(diaryForm);
  const city = [...citySelects[0].options].find((option) => option.value === values.city_id);

  try {
    await api("./api/admin/diary", {
      method: "POST",
      body: JSON.stringify(values),
    });
    diaryForm.reset();
    setStatus(`已给 ${city?.textContent || "城市"} 添加日记。`);
  } catch (error) {
    setStatus(error.message, true);
  }
});

photoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(photoForm);

  try {
    await api("./api/admin/photos", {
      method: "POST",
      body: data,
    });
    photoForm.reset();
    setStatus("照片已上传。");
  } catch (error) {
    setStatus(error.message, true);
  }
});

(async function initAdmin() {
  try {
    await refreshAdminData();
    showApp(true);
    setStatus("后台已连接。");
  } catch (error) {
    showApp(false);
    if (error.message.includes("Unauthorized")) return;
    setStatus("还没有连好 Cloudflare D1/R2，或者后台密码未设置。", true);
  }
})();
