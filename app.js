(function () {
  "use strict";

  const data = window.PORTFOLIO;
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const competencyMap = Object.fromEntries(data.competencies.map((item) => [item.id, item]));

  document.querySelectorAll("[data-field]").forEach((element) => {
    const value = data[element.dataset.field];
    if (value) element.textContent = value;
  });
  document.title = `Portfolio BUT 1 GMP — ${data.name}`;
  document.querySelector('meta[name="description"]').content = `Portfolio BUT 1 Génie mécanique et productique de ${data.name} : compétences, situations professionnelles, preuves et autoévaluation.`;

  document.getElementById("competency-grid").innerHTML = data.competencies.map((item) => `
    <article class="competency-card">
      <div class="competency-top"><span class="competency-code">${escapeHtml(item.id)}</span><span class="competency-level">${escapeHtml(item.level)}</span></div>
      <h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.summary)}</p>
    </article>`).join("");

  document.getElementById("situation-grid").innerHTML = data.situations.map((item, index) => `
    <article class="situation-card">
      <div class="situation-top"><span class="situation-code">${escapeHtml(item.id)}</span><span>0${index + 1} / 03</span></div>
      <span class="project-category">${escapeHtml(item.subtitle)}</span>
      <h3>${escapeHtml(item.name)}</h3><p class="situation-description">${escapeHtml(item.description)}</p>
      <div class="situation-actions">${item.actions.map((action) => `<div><b>${escapeHtml(action.code)}</b><span>${escapeHtml(action.text)}</span></div>`).join("")}</div>
    </article>`).join("");

  const evidence = Array.isArray(data.evidence) ? data.evidence : [];
  const filters = document.getElementById("evidence-filters");
  const evidenceList = document.getElementById("evidence-list");
  const count = document.getElementById("evidence-count");
  let activeFilter = "all";

  function renderEvidence() {
    const shown = activeFilter === "all" ? evidence : evidence.filter((item) => (item.competencies || []).includes(activeFilter));
    count.textContent = `${shown.length} preuve${shown.length === 1 ? "" : "s"} ${shown.length ? "sélectionnée" + (shown.length === 1 ? "" : "s") : "à compléter"}`;
    if (!shown.length) {
      evidenceList.innerHTML = `<div class="empty-evidence"><span>✳</span><div><h3>${activeFilter === "all" ? "Ton portfolio commence ici." : `Aucune preuve liée à ${escapeHtml(activeFilter)} pour l’instant.`}</h3><p>Choisis une trace réelle (SAÉ, TP, TD, projet ou engagement), puis ajoute son contexte, ta contribution, le résultat et ton recul dans <code>evidence</code> du fichier <code>data.js</code>.</p><p class="empty-hint">Exemples de traces : photo annotée d’une pièce réalisée, extrait de dossier de production, maquette numérique ou compte rendu de TP.</p></div></div>`;
      return;
    }

    evidenceList.innerHTML = shown.map((item) => {
      const tags = (item.competencies || []).map((id) => `<span>${escapeHtml(id)} · ${escapeHtml(competencyMap[id]?.name || "Compétence")}</span>`).join("");
      const proofLink = typeof item.link === "string" && /^https?:\/\//i.test(item.link)
        ? `<a class="evidence-link" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">Voir la preuve <span aria-hidden="true">↗</span></a>`
        : "";
      return `<article class="evidence-card">
        <div class="evidence-card-head"><span class="evidence-context">${escapeHtml(item.context || "Contexte à préciser")}</span><span class="evidence-date">${escapeHtml(item.date || "Date à préciser")}</span></div>
        <h3>${escapeHtml(item.title || "Preuve sans titre")}</h3>
        <p>${escapeHtml(item.description || "")}</p>
        <div class="evidence-reflection"><span>MON RECUL</span><p>${escapeHtml(item.reflection || "À compléter : ce que j’ai appris, ce qui a été difficile et la prochaine étape.")}</p></div>
        <div class="evidence-card-foot"><div class="project-tags">${tags}</div>${proofLink}</div>
      </article>`;
    }).join("");
  }

  filters.innerHTML = `<button type="button" class="filter-chip is-active" data-filter="all" aria-pressed="true">Toutes <span>${evidence.length}</span></button>` +
    data.competencies.map((item) => {
      const total = evidence.filter((entry) => (entry.competencies || []).includes(item.id)).length;
      return `<button type="button" class="filter-chip" data-filter="${escapeHtml(item.id)}" aria-pressed="false">${escapeHtml(item.id)} <span>${total}</span></button>`;
    }).join("");
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    filters.querySelectorAll(".filter-chip").forEach((chip) => {
      const active = chip === button;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    renderEvidence();
  });
  renderEvidence();

  document.getElementById("assessment-grid").innerHTML = data.competencies.map((item) => `
    <article class="assessment-card">
      <div class="assessment-label"><span>${escapeHtml(item.id)} · ${escapeHtml(item.name)}</span><strong>${escapeHtml(data.assessment[item.id] || "À autoévaluer")}</strong></div>
      <p>Dans un cas simple, quelle preuve montre ce que tu sais déjà mobiliser ? Qu’est-ce qui te reste à travailler ?</p>
      <a href="#preuves" class="assessment-link">Relier à une preuve <span aria-hidden="true">↗</span></a>
    </article>`).join("");

  const emailLink = document.getElementById("email-link");
  emailLink.href = `mailto:${encodeURIComponent(data.email)}`;
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

  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    themeToggle.setAttribute("aria-label", dark ? "Activer le thème clair" : "Activer le thème sombre");
  });
  document.getElementById("print-button").addEventListener("click", () => window.print());

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".profile-grid, .competency-card, .situation-card, .evidence-card, .assessment-card, .contact-section").forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  }
})();
