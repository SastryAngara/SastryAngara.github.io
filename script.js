const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.site-nav');
menuButton?.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen));});
document.querySelectorAll('.site-nav a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();

const GITHUB_OWNER='SastryAngara';
const GITHUB_REPO='SastryAngara.github.io';
const RESUME_FOLDER='resumes';

const resumeList=document.getElementById('resume-list');
const resumeStatus=document.getElementById('resume-status');

function formatFileSize(bytes){
  if(bytes<1024)return `${bytes} B`;
  if(bytes<1024*1024)return `${(bytes/1024).toFixed(1)} KB`;
  return `${(bytes/(1024*1024)).toFixed(1)} MB`;
}
function displayName(filename){
  return filename.replace(/\.(pdf|docx?|PDF|DOCX?)$/i,'').replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim();
}
async function loadResumes(){
  if(!resumeList||!resumeStatus)return;
  const apiUrl=`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${RESUME_FOLDER}`;
  try{
    const response=await fetch(apiUrl,{headers:{Accept:'application/vnd.github+json'}});
    if(!response.ok)throw new Error(`GitHub returned ${response.status}`);
    const files=await response.json();
    const resumes=files.filter(file=>file.type==='file'&&/\.(pdf|doc|docx)$/i.test(file.name)).sort((a,b)=>a.name.localeCompare(b.name));
    resumeStatus.hidden=true;
    if(resumes.length===0){resumeStatus.hidden=false;resumeStatus.textContent='No resume files are currently available.';return;}
    resumes.forEach(file=>{
      const ext=file.name.split('.').pop().toUpperCase();
      const item=document.createElement('article'); item.className='resume-item';
      const details=document.createElement('div');
      const title=document.createElement('h3'); title.className='resume-name'; title.textContent=displayName(file.name);
      const meta=document.createElement('div'); meta.className='resume-meta'; meta.textContent=`${ext} · ${formatFileSize(file.size)}`;
      details.append(title,meta);
      const actions=document.createElement('div'); actions.className='resume-actions';
      if(ext==='PDF'){const view=document.createElement('a');view.className='button secondary';view.href=file.download_url;view.target='_blank';view.rel='noopener';view.textContent='View';actions.appendChild(view);}
      const download=document.createElement('a');download.className='button primary';download.href=file.download_url;download.download=file.name;download.textContent='Download';actions.appendChild(download);
      item.append(details,actions);resumeList.appendChild(item);
    });
  }catch(error){
    resumeStatus.classList.add('error');
    resumeStatus.textContent='Resume files could not be loaded right now. Please try again shortly.';
    console.error(error);
  }
}
loadResumes();
