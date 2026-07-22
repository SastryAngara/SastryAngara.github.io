const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/*
  AUTOMATIC DOCUMENT LIST

  Upload any PDF, DOC, or DOCX file to the public "resumes" folder.
  No filename format or naming convention is required.
*/

const GITHUB_OWNER = 'SastryAngara';
const GITHUB_REPO = 'SastryAngara.github.io';
const DOCUMENT_FOLDER = 'resumes';
const SUPPORTED_EXTENSIONS = /\.(pdf|doc|docx)$/i;

const documentList = document.getElementById('resume-list');
const documentStatus = document.getElementById('resume-status');

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes)) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileType(filename) {
  const dotPosition = filename.lastIndexOf('.');
  return dotPosition >= 0
    ? filename.slice(dotPosition + 1).toUpperCase()
    : 'FILE';
}

async function loadDocuments() {
  if (!documentList || !documentStatus) return;

  const apiUrl =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}` +
    `/contents/${encodeURIComponent(DOCUMENT_FOLDER)}`;

  try {
    const response = await fetch(apiUrl, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const folderContents = await response.json();

    if (!Array.isArray(folderContents)) {
      throw new Error('The configured GitHub path is not a folder.');
    }

    const documents = folderContents
      .filter((item) =>
        item.type === 'file' &&
        !item.name.startsWith('.') &&
        SUPPORTED_EXTENSIONS.test(item.name)
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: 'base'
        })
      );

    documentList.replaceChildren();

    if (documents.length === 0) {
      documentStatus.hidden = false;
      documentStatus.classList.remove('error');
      documentStatus.textContent =
        'No PDF, DOC, or DOCX files are currently available.';
      return;
    }

    documentStatus.hidden = true;

    documents.forEach((file) => {
      const fileType = getFileType(file.name);

      const item = document.createElement('article');
      item.className = 'resume-item';

      const details = document.createElement('div');

      const title = document.createElement('h3');
      title.className = 'resume-name';

      // Display the filename exactly as uploaded.
      title.textContent = file.name;

      const metadata = document.createElement('div');
      metadata.className = 'resume-meta';
      metadata.textContent = `${fileType} · ${formatFileSize(file.size)}`;

      details.append(title, metadata);

      const actions = document.createElement('div');
      actions.className = 'resume-actions';

      if (fileType === 'PDF') {
        const viewLink = document.createElement('a');
        viewLink.className = 'button secondary';
        viewLink.href = file.download_url;
        viewLink.target = '_blank';
        viewLink.rel = 'noopener noreferrer';
        viewLink.textContent = 'View';
        actions.appendChild(viewLink);
      }

      const downloadLink = document.createElement('a');
      downloadLink.className = 'button primary';
      downloadLink.href = file.download_url;
      downloadLink.setAttribute('download', file.name);
      downloadLink.textContent = 'Download';

      actions.appendChild(downloadLink);
      item.append(details, actions);
      documentList.appendChild(item);
    });
  } catch (error) {
    documentList.replaceChildren();
    documentStatus.hidden = false;
    documentStatus.classList.add('error');
    documentStatus.textContent =
      'Documents could not be loaded right now. Please try again shortly.';
    console.error('Document library error:', error);
  }
}

loadDocuments();
