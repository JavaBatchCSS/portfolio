(function () {
  "use strict";

  const data = window.PORTFOLIO;
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  document.querySelectorAll("[data-field]").forEach((element) => {
    const value = data[element.dataset.field];
    if (value) element.textContent = value;
  });
  document.title = `Portfolio — ${data.name}`;
  document.querySelector('meta[name="description"]').content = `Portfolio étudiant de ${data.name} — parcours, compétences et projets.`;

  document.getElementById("journey-list").innerHTML = data.journey.map((item) => `
    <article class="journey-item">
      <span class="journey-date">${escapeHtml(item.date)}</span>
      <span class="journey-marker" aria-hidden="true"></span>
      <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.detail)}</p></div>
      <span class="journey-arrow" aria-hidden="true">↗</span>
    </article>`).join("");

  document.getElementById("project-grid").innerHTML = data.projects.map((project) => {
    const tags = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const content = `<div class="project-visual ${escapeHtml(project.color)}"><span class="project-number">${escapeHtml(project.number)} / 03</span><span class="project-symbol" aria-hidden="true">${project.number === "01" ? "✳" : project.number === "02" ? "◌" : "↗"}</span><span class="project-open" aria-hidden="true">↗</span></div><div class="project-info"><span class="project-category">${escapeHtml(project.category)}</span><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p><div class="project-tags">${tags}</div></div>`;
    return project.link
      ? `<a class="project-card" href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">${content}</a>`
      : `<article class="project-card">${content}</article>`;
  }).join("");

  document.getElementById("skill-list").innerHTML = data.skills.map((skill) => `
    <div class="skill-item"><div class="skill-label"><strong>${escapeHtml(skill.name)}</strong><span>${escapeHtml(skill.level)}</span></div><div class="skill-track" role="progressbar" aria-label="${escapeHtml(skill.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Number(skill.percent)}"><span style="--level:${Math.max(0, Math.min(100, Number(skill.percent)))}%"></span></div></div>`).join("");
  document.getElementById("quality-list").innerHTML = data.qualities.map((item) => `<span>${escapeHtml(item)}</span>`).join("");

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
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") document.documentElement.dataset.theme = "dark";
  themeToggle.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    themeToggle.setAttribute("aria-label", dark ? "Activer le thème clair" : "Activer le thème sombre");
  });
  document.getElementById("print-button").addEventListener("click", () => window.print());

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".profile-grid, .journey-item, .project-card, .skills-grid, .contact-section").forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
})();
