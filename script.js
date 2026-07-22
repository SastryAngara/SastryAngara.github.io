const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

/*
  RESUME PROFILE CONFIGURATION

  To add a new category:
  1. Upload the PDF into the /resumes folder.
  2. Copy one object below.
  3. Change title, description, file, and updated.
  4. Commit the change.

  Keep filenames stable. When a resume is revised, replace the PDF using
  the same filename so recruiters always receive the latest version.
*/
const resumeProfiles = [
  {
    title: "Program Manager",
    description: "Enterprise program delivery, governance, budgets, risks, vendors, executive reporting, and stakeholder leadership.",
    file: "resumes/Sastry-Angara-Program-Manager.pdf",
    updated: "Upload latest approved version"
  },
  {
    title: "Technical Project Manager",
    description: "Cross-functional technology delivery spanning applications, infrastructure, data, security, testing, and operations.",
    file: "resumes/Sastry-Angara-Technical-Project-Manager.pdf",
    updated: "Upload latest approved version"
  },
  {
    title: "Scrum Master",
    description: "Agile delivery, sprint ceremonies, release coordination, impediment removal, governance, and team facilitation.",
    file: "resumes/Sastry-Angara-Scrum-Master.pdf",
    updated: "Upload latest approved version"
  },
  {
    title: "Business Analyst",
    description: "Requirements elicitation, process analysis, business rules, data mapping, user stories, UAT, and stakeholder collaboration.",
    file: "resumes/Sastry-Angara-Business-Analyst.pdf",
    updated: "Upload latest approved version"
  },
  {
    title: "Data / BI & Reporting",
    description: "Data analytics, reporting modernization, dashboards, KPI definition, SQL-based reporting, Power BI, and data delivery.",
    file: "resumes/Sastry-Angara-Data-BI-Reporting.pdf",
    updated: "Upload latest approved version"
  },
  {
    title: "Service Delivery / IT Operations",
    description: "Production support, ITIL operations, SLA governance, major incidents, service improvement, and executive reporting.",
    file: "resumes/Sastry-Angara-Service-Delivery.pdf",
    updated: "Upload latest approved version"
  }
];

const resumeGrid = document.getElementById('resume-grid');

if (resumeGrid) {
  resumeProfiles.forEach((profile) => {
    const card = document.createElement('article');
    card.className = 'resume-card';

    const title = document.createElement('h3');
    title.textContent = profile.title;

    const description = document.createElement('p');
    description.textContent = profile.description;

    const actions = document.createElement('div');
    actions.className = 'resume-actions';

    const viewLink = document.createElement('a');
    viewLink.className = 'button secondary';
    viewLink.href = profile.file;
    viewLink.target = '_blank';
    viewLink.rel = 'noopener';
    viewLink.textContent = 'View Resume';

    const downloadLink = document.createElement('a');
    downloadLink.className = 'button primary';
    downloadLink.href = profile.file;
    downloadLink.download = '';
    downloadLink.textContent = 'Download PDF';

    const updated = document.createElement('span');
    updated.className = 'resume-updated';
    updated.textContent = profile.updated;

    actions.append(viewLink, downloadLink);
    card.append(title, description, actions, updated);
    resumeGrid.appendChild(card);
  });
}
