const events = [
  {group:'soon',day:'Mar. 8 sept.',time:'14h00 → 16h00',title:'Atelier IA — Découverte',type:'Atelier',objective:'Comprendre l’IA générative et formuler ses premiers prompts utiles.',level:'🌱 Découverte',public:'Tous publics',place:'Au Jardin',price:'25 €',capacity:'3 places sur 8',low:true},
  {group:'week',day:'Jeu. 10 sept.',time:'10h00 → 12h00',title:'Initiation informatique',type:'Formation',objective:'Prendre confiance avec les fichiers, le navigateur et les usages essentiels.',level:'🌱 Découverte',public:'Particuliers',place:'Au Jardin',price:'20 €',capacity:'5 places sur 8'},
  {group:'week',day:'Ven. 11 sept.',time:'18h00 → 19h30',title:'Club Entreprises',type:'Rencontre',objective:'Partager des usages concrets de l’IA et du numérique en petite structure.',level:'Tous niveaux',public:'Professionnels',place:'À distance',price:'Gratuit',capacity:'Complet',full:true},
  {group:'later',day:'Sam. 19 sept.',time:'14h00 → 17h00',title:'Création musicale assistée par IA',type:'Création',objective:'Composer, arranger et repartir avec une première création personnelle.',level:'🌿 Initié',public:'Tous publics',place:'Studio',price:'35 €',capacity:'4 places sur 6'},
  {group:'later',day:'Mer. 23 sept.',time:'14h00 → 16h30',title:'Découverte de la techno-autonomie',type:'Expérimentation',objective:'Comparer coûts, consommations et utilité de plusieurs solutions.',level:'Tous niveaux',public:'Tous publics',place:'Au Jardin',price:'25 €',capacity:'6 places sur 8'},
  {group:'later',day:'Sam. 3 oct.',time:'10h00 → 12h00',title:'Atelier collaboratif — Votre projet web',type:'Atelier',objective:'Clarifier un besoin et transformer une idée en plan d’action réaliste.',level:'Tous niveaux',public:'Porteurs de projet',place:'Au Jardin',price:'30 €',capacity:'5 places sur 8'}
];

const experiments = {
  piccolina:['Habitat léger','Piccolina','Une petite construction de jardin évolutive, pensée comme futur espace d’accueil, d’atelier et d’expérimentation.'],
  solaire:['Énergie','Solaire & stockage','Une installation pour observer la production, le stockage, les usages réels et les arbitrages de consommation.'],
  douche:['Eau & confort','Douche autonome','Un système concret combinant réserve d’eau, pompage et chauffe-eau pour étudier autonomie, sécurité et confort.'],
  studio:['Création','Studio multimédia','Un espace multi-écrans et des outils audio, vidéo et IA pour apprendre et produire sans tout acheter.'],
  irrigation:['Jardin','Irrigation pilotée','Pompage solaire et goutte-à-goutte pour comparer simplicité, consommation et efficacité au jardin.'],
  ia:['Numérique','Expérimentations IA','Des essais guidés pour comprendre ce que l’IA sait faire, ce qu’elle ne sait pas faire et comment bien l’utiliser.']
};

function renderEvents(filter='all'){
  const list = filter === 'all' ? events : events.filter(event => event.group === filter);
  const host = document.querySelector('#events');
  host.innerHTML = list.length ? list.map((event,index)=>`<article class="event-card">
    <header><span>${event.day}</span><span>${event.time} · ${event.time.includes('17h')?'3h':event.time.includes('16h30')?'2h30':event.time.includes('19h30')?'1h30':'2h'}</span></header>
    <h3>${event.title}</h3><span class="eyebrow">${event.type}</span><p class="objective">${event.objective}</p>
    <div class="event-meta"><span>${event.level}</span><span>${event.public}</span><span>⌖ ${event.place}</span><span>${event.price}</span></div>
    <footer><span class="availability ${event.low?'low':''}">${event.full?'<span class="full-badge">Atelier complet</span>':event.capacity}</span><button class="button event-action" data-event="${index}">${event.full?'Me prévenir':'Réserver'}</button></footer>
  </article>`).join('') : '<p class="events-empty">Aucun événement de démonstration dans cette période.</p>';
}

function setTheme(theme){
  document.documentElement.dataset.theme = theme;
  document.querySelector('.theme-toggle').textContent = theme === 'dark' ? '☀' : '☾';
  localStorage.setItem('jardin-theme',theme);
}

const savedTheme = localStorage.getItem('jardin-theme');
setTheme(savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'));
document.querySelector('.theme-toggle').addEventListener('click',()=>setTheme(document.documentElement.dataset.theme === 'dark'?'light':'dark'));

const menuButton=document.querySelector('.menu-toggle');
menuButton.addEventListener('click',()=>{const nav=document.querySelector('#nav');const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#nav').classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

renderEvents();
document.querySelector('.filters').addEventListener('click',event=>{if(!event.target.matches('.filter'))return;document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));event.target.classList.add('active');renderEvents(event.target.dataset.filter);});
document.querySelector('#events').addEventListener('click',event=>{if(!event.target.matches('.event-action'))return;const card=event.target.closest('.event-card');const title=card.querySelector('h3').textContent;const full=event.target.textContent.includes('prévenir');alert(full?`Prototype : vous pourriez laisser vos coordonnées pour être informé(e) en priorité de la prochaine session « ${title} ».`:`Prototype : la réservation de « ${title} » sera reliée à la future plateforme externe.`);});

document.querySelectorAll('.demo-form').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;form.querySelector('.form-message').textContent=form.dataset.success;form.reset();}));

const dialog=document.querySelector('#experiment-dialog');
document.querySelector('.experiment-grid').addEventListener('click',event=>{const button=event.target.closest('button[data-modal]');if(!button)return;const [kicker,title,copy]=experiments[button.dataset.modal];document.querySelector('#dialog-kicker').textContent=kicker;document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-copy').textContent=copy;dialog.showModal();});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});

document.querySelector('#booking-button').addEventListener('click',()=>{const topic=document.querySelector('#booking-topic').value;document.querySelector('#booking-message').textContent=`« ${topic} » est sélectionné. La plateforme de réservation externe sera connectée ici avant l’ouverture au public.`;});
