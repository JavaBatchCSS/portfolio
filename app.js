(function () {
  "use strict";

  const data = window.PORTFOLIO;
  const evidence = Array.isArray(data.evidence) ? data.evidence : [];
  const competencyIds = data.competencies.map((item) => item.id);
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const competencyMap = Object.fromEntries(data.competencies.map((item) => [item.id, item]));
  const situationMap = Object.fromEntries(data.situations.map((item) => [item.id, item]));

  document.querySelectorAll("[data-field]").forEach((element) => {
    const value = data[element.dataset.field];
    if (value) element.textContent = value;
  });
  const initials = data.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase();
  document.querySelector("[data-field-initials]").textContent = initials || "GMP";
  document.title = `Portfolio BUT GMP — ${data.name}`;
  document.querySelector('meta[name="description"]').content = `Portfolio de ${data.name}, étudiant en Génie mécanique et productique : compétences, unités d’enseignement et preuves.`;

  const emailLink = `mailto:${encodeURIComponent(data.email)}`;
  document.getElementById("nav-email").href = emailLink;
  document.getElementById("profile-email").href = emailLink;

  document.getElementById("competency-list").innerHTML = data.competencies.map((item) => `
    <article class="competency-row">
      <span class="competency-code">${escapeHtml(item.id)}</span>
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <span class="competency-level">${escapeHtml(item.level)}</span>
    </article>`).join("");

  document.getElementById("situation-list").innerHTML = data.situations.map((item) => `
    <article class="situation-row">
      <span class="situation-code">${escapeHtml(item.id)}</span>
      <div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.subtitle)} · ${escapeHtml(item.description)}</p></div>
      <div class="situation-competencies">${item.actions.map((action) => `<span title="${escapeHtml(action.text)}">${escapeHtml(action.code)}</span>`).join("")}</div>
    </article>`).join("");

  const body = document.getElementById("matrix-body");
  const search = document.getElementById("matrix-search");
  const ueFilter = document.getElementById("ue-filter");
  const situationFilter = document.getElementById("situation-filter");
  const visibleCount = document.getElementById("visible-count");
  const matrixScroll = document.querySelector(".matrix-scroll");

  function safeLink(value) {
    if (typeof value !== "string") return "";
    const link = value.trim();
    return /^https?:\/\//i.test(link) || /^(?!\/)[\w./-]+(?:[?#][\w./?=&%-]*)?$/i.test(link) ? link : "";
  }

  function sortedRecords() {
    return evidence.slice().sort((a, b) => {
      const timeDifference = Date.parse(b.date || "") - Date.parse(a.date || "");
      if (!Number.isNaN(timeDifference) && timeDifference !== 0) return timeDifference;
      return String(a.ue || "").localeCompare(String(b.ue || ""), "fr");
    });
  }

  const formatDate = (value) => {
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? String(value || "Période à préciser")
      : new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" }).format(date);
  };

  function renderMatrix() {
    const query = search.value.trim().toLocaleLowerCase("fr");
    const records = sortedRecords().filter((item) => {
      const matchesUe = !ueFilter.value || item.ue === ueFilter.value;
      const matchesSituation = !situationFilter.value || (item.situations || []).includes(situationFilter.value);
      const searchable = [item.title, item.ue, item.context, item.description, item.reflection,
        ...(item.competencies || []), ...(item.situations || [])].join(" ").toLocaleLowerCase("fr");
      return matchesUe && matchesSituation && (!query || searchable.includes(query));
    });

    visibleCount.textContent = String(records.length);
    if (!records.length) {
      const message = evidence.length
        ? "Aucune réalisation ne correspond à ces filtres. Modifie la recherche ou efface les filtres."
        : "Aucune réalisation n’est encore renseignée. Ajoute tes travaux de SAÉ, TP, TD ou projet dans le tableau evidence de data.js.";
      body.innerHTML = `<tr><td class="empty-cell" colspan="5"><span class="empty-symbol">—</span><strong>${message}</strong><span>Pour chaque trace, indique la date, l’UE, les compétences mobilisées et les situations professionnelles concernées.</span></td></tr>`;
      return;
    }

    body.innerHTML = records.map((item) => {
      const activeCompetencies = new Set((item.competencies || []).filter((id) => competencyIds.includes(id)));
      const contextTags = (item.situations || []).filter((id) => situationMap[id])
        .map((id) => `<span class="situation-tag" title="${escapeHtml(situationMap[id].name)}">${escapeHtml(id)}</span>`).join("");
      const link = safeLink(item.link);
      const title = escapeHtml(item.title || "Réalisation sans titre");
      const card = `<div class="proof-card">
        <div class="proof-card-top"><span class="proof-context">${escapeHtml(item.context || "Travail de formation")}</span>${link ? `<a class="proof-link" href="${escapeHtml(link)}" target="_blank" rel="noreferrer" aria-label="Ouvrir la preuve : ${title}">↗</a>` : ""}</div>
        <strong>${title}</strong>
        <p>${escapeHtml(item.description || "")}</p>
        ${item.reflection ? `<details><summary>Mon analyse</summary><p>${escapeHtml(item.reflection)}</p></details>` : ""}
        ${contextTags ? `<div class="proof-tags">${contextTags}</div>` : ""}
      </div>`;
      const cells = competencyIds.map((id) => `<td class="${activeCompetencies.has(id) ? "has-proof" : "no-proof"}">${activeCompetencies.has(id) ? card : '<span aria-label="Aucune preuve rattachée">—</span>'}</td>`).join("");
      return `<tr><th class="record-context" scope="row"><span class="record-date">${escapeHtml(formatDate(item.date))}</span><strong>${escapeHtml(item.ue || "UE à préciser")}</strong><span>${escapeHtml(item.context || "Réalisation")}</span></th>${cells}</tr>`;
    }).join("");
  }

  const ueValues = [...new Set(evidence.map((item) => item.ue).filter(Boolean))].sort((a, b) => a.localeCompare(b, "fr"));
  ueValues.forEach((ue) => ueFilter.add(new Option(ue, ue)));
  data.situations.forEach((item) => situationFilter.add(new Option(`${item.id} · ${item.name}`, item.id)));
  search.addEventListener("input", renderMatrix);
  ueFilter.addEventListener("change", renderMatrix);
  situationFilter.addEventListener("change", renderMatrix);
  document.getElementById("clear-filters").addEventListener("click", () => {
    search.value = "";
    ueFilter.value = "";
    situationFilter.value = "";
    renderMatrix();
    search.focus();
  });
  renderMatrix();

  const ueCount = new Set(evidence.map((item) => item.ue).filter(Boolean)).size;
  const coveredCompetencies = new Set(evidence.flatMap((item) => item.competencies || []));
  document.getElementById("summary-proofs").textContent = String(evidence.length);
  document.getElementById("summary-ues").textContent = String(ueCount);
  document.getElementById("summary-competencies").textContent = `${coveredCompetencies.size} / ${competencyIds.length}`;

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("navigation");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
    navigation.classList.toggle("is-open", !isOpen);
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }));
  document.getElementById("print-button").addEventListener("click", () => window.print());
})();
