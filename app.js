const $=s=>document.querySelector(s),V=()=>$('#view');
const P=s=>s.split(';').map(x=>{const[ko,r,en,e]=x.split('|');return{ko,r,en,e}});
const MODS=[
{id:'fruits',t:'Fruits (과일)',e:'🍎',w:P('사과|sagwa|apple|🍎;바나나|banana|banana|🍌;딸기|ttalgi|strawberry|🍓;포도|podo|grapes|🍇;오렌지|orenji|orange|🟠;수박|subak|watermelon|🍉;복숭아|boksunga|peach|🍑;배|bae|pear|🍐;체리|cheri|cherry|🍒;파인애플|pa-in-ae-peul|pineapple|🍍;망고|mango|mango|🥭;키위|kiwi|kiwi|🥝;레몬|remon|lemon|🍋;블루베리|beullube-ri|blueberry|🫐;감|gam|persimmon|🧡;귤|gyul|tangerine|🍊;자두|jadu|plum|🟣;멜론|maellon|melon|🍈;코코넛|kokonut|coconut|🥥;청포도|cheongpodo|green grapes|🟢')},
{id:'body',t:'Body parts (몸의 부분)',e:'🧍',w:P('머리|meori|head|🧑;눈|nun|eye|👁️;귀|gwi|ear|👂;코|ko|nose|👃;입|ip|mouth|👄;목|mok|neck|🧣;어깨|eokkae|shoulder|🤷;팔|pal|arm|💪;팔꿈치|palkkumchi|elbow|🦾;손|son|hand|🖐️;손가락|songarak|finger|☝️;가슴|gaseum|chest|🫁;배|bae|stomach|🫃;등|deung|back|🔙;엉덩이|eongdeong-i|hip|🍑;허벅지|heobeokji|thigh|🦵;무릎|muleup|knee|🦿;종아리|jong-ari|calf|🦶;발|bal|foot|🦶;발가락|balgarak|toe|🦶')},
{id:'animals',t:'Animals (동물)',e:'🐻',w:P('개|gae|dog|🐶;고양이|goyangi|cat|🐱;토끼|tokki|rabbit|🐰;곰|gom|bear|🐻;사자|saja|lion|🦁;코끼리|kokkiri|elephant|🐘;호랑이|horangi|tiger|🐯;여우|yeou|fox|🦊;원숭이|wonsungi|monkey|🐵;기린|girin|giraffe|🦒;판다|panda|panda|🐼;코알라|koalla|koala|🐨;소|so|cow|🐮;돼지|dwaeji|pig|🐷;양|yang|sheep|🐑;말|mal|horse|🐴;사슴|saseum|deer|🦌;다람쥐|daramjwi|squirrel|🐿️;오리|ori|duck|🦆;닭|dak|chicken|🐔')}];
const ALL=MODS.flatMap(m=>m.w);
const HOL=[['2026-12-25','Christmas (성탄절)','A public holiday in Korea: couples and friends go out, cities glow with lights.'],['2027-01-01','New Year (신정)','People watch the first sunrise and eat tteokguk (rice-cake soup).'],['2027-02-06','Seollal (설날)','Lunar New Year: families wear hanbok, bow to elders (sebae) and eat tteokguk.'],['2027-03-01','Samiljeol (삼일절)','Independence Movement Day, remembered with flags and ceremonies.'],['2027-05-05','Children’s Day (어린이날)','Gifts, parks and family outings for kids.'],['2027-05-13','Buddha’s Birthday (부처님 오신 날)','Temples are hung with colorful lotus lanterns.']];
const MOTTO=[['천 리 길도 한 걸음부터','A journey of a thousand miles begins with a single step.'],['시작이 반이다','Starting is half the work.'],['고생 끝에 낙이 온다','After hardship comes happiness.'],['세 살 버릇 여든까지 간다','Habits last a lifetime.'],['가는 말이 고와야 오는 말이 곱다','Speak kindly to be spoken to kindly.']];
const PHR=[['안녕하세요','Hello'],['감사합니다','Thank you'],['죄송합니다','I’m sorry'],['잘 먹겠습니다','Thank you for the meal'],['화이팅!','You can do it!'],['머리가 아파요','I have a headache'],['손을 씻어요','I wash my hands'],['과일을 좋아해요','I like fruit']];
const GAMES=[['flash','SRS flashcards','🃏'],['match','Picture match','🖼️'],['memory','Memory pairs 4×4','🧠'],['listen','Listening','🎧'],['trace','Trace Hangul','✍️'],['talk','Talk to Komdori','🐻'],['dialog','Spoken dialogues','🎤'],['builder','Word builder','🔤'],['rev','English → Korean','🔁'],['speed','Speed round','⚡'],['rom','Romanization','🅰️'],['gap','Fill the gap','📝'],['order','Sentence order','📚'],['sound','Sound match','👂'],['odd','Odd one out','🔍'],['boss','Boss quiz','👑']];
const sh=a=>[...a].sort(()=>Math.random()-.5);
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const slug=w=>w.en.replace(/ /g,'-');
const pic=w=>`<img class=pic src="/img/${slug(w)}.png" alt="" onerror="this.outerHTML='<span>${w.e}</span>'">`;
let S=JSON.parse(localStorage.getItem('bomi')||'null')||{xp:0,streak:0,freezes:2,last:'',user:'',theme:'',prog:{},played:{},srs:{}};
const save=()=>localStorage.setItem('bomi',JSON.stringify(S));
const day=d=>new Date(d).toISOString().slice(0,10);
const lvl=()=>Math.floor(S.xp/100)+1;
function addXP(n){const t=day(Date.now());if(S.last!==t){const gap=S.last?Math.round((new Date(t)-new Date(S.last))/864e5):1;if(gap===1)S.streak++;else if(gap===2&&S.freezes>0){S.freezes--;S.streak++}else S.streak=1;S.last=t}S.xp+=n;save();hdr()}
const hdr=()=>$('#hdr').innerHTML=`<span>🔥 ${S.streak}</span><span>🧊 ${S.freezes}</span><span>✨ ${S.xp} XP</span><span>⭐ Lv ${lvl()}</span>`;
function speak(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ko-KR';u.rate=.85;speechSynthesis.speak(u)}catch(e){}}
const beep=()=>{try{const a=new AudioContext(),o=a.createOscillator();o.connect(a.destination);o.frequency.value=660;o.start();o.stop(a.currentTime+.5)}catch(e){}};
function theme(){const t=S.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}
let tab='home';
const TABS=[['home','🏠','Home'],['games','🎮','Games'],['lessons','📖','Lessons'],['profile','👤','Profile']];
function go(t){tab=t||tab;$('#nav').innerHTML=TABS.map(([k,i,l])=>`<button class="${k===tab?'on':''}" onclick="go('${k}')"><b>${i}</b>${l}</button>`).join('');hdr();({home,games,lessons,profile})[tab]();V().parentElement.scrollTop=0}
function gate(fn){if(S.user)return fn();V().innerHTML=`<div class=card><h2>Create a free account 🌸</h2><p>Games, Hangul Lab and your word list need an account so your progress is saved.</p><input id=nm placeholder="Your name"><button class=btn id=ok>Save and continue</button></div>`;$('#ok').onclick=()=>{const n=$('#nm').value.trim();if(!n)return;S.user=n;save();fn()}}
function home(){const now=new Date(),nx=HOL.find(h=>new Date(h[0])>=now.setHours(0,0,0,0))||HOL[0],dd=Math.ceil((new Date(nx[0])-new Date())/864e5),mt=MOTTO[Math.floor(Date.now()/864e5)%MOTTO.length],m=MODS[0],p=pct(m);
V().innerHTML=`<h2>안녕${S.user?', '+S.user:''}! 🌸</h2><p class=mute>${new Date().toLocaleDateString('en',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
<div class=card><small>Soon in Korea</small><h3>${nx[1]} — ${dd} days</h3><details><summary>Traditions</summary>${nx[2]}</details></div>
<div class=card><div class=row><h3>⏱️ Focus timer</h3><b id=tm>25:00</b></div><button class=btn id=ts>Start 25 min</button> <small>+20 XP when done</small></div>
<div class=card><small>My path</small><h3>${m.e} ${m.t}</h3><div class=bar><div style="width:${p}%"></div></div><p class=mute>${p}% complete</p><button class=btn onclick="openMod(0)">Continue</button></div>
<div class=card><small>Daily motto</small><h3 style="font-size:1.4rem">${mt[0]}</h3><p>${mt[1]}</p><button class=ghost onclick="speak('${mt[0]}')">🔊</button></div>`;
let t=null,left=1500;$('#ts').onclick=e=>{if(t){clearInterval(t);t=null;e.target.textContent='Start 25 min';return}e.target.textContent='Stop';t=setInterval(()=>{left--;const el=$('#tm');if(!el){clearInterval(t);return}el.textContent=`${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;if(left<=0){clearInterval(t);beep();addXP(20)}},1000)}}
const pct=m=>Math.round((S.prog[m.id]||0)*10);
function lessons(sub='path'){const T=['path','ai','study','read','write'],N=['Path','AI teacher','Self-study','Reading','Writing'];
V().innerHTML=`<div class=tabs>${T.map((k,i)=>`<button class="ghost ${k===sub?'on':''}" onclick="lessons('${k}')">${N[i]}</button>`).join('')}</div><div id=sub></div>`;const s=$('#sub');
if(sub==='path')s.innerHTML=MODS.map((m,i)=>`<div class=card onclick="openMod(${i})"><h3>${m.e} Module ${i+1}: ${m.t}</h3><div class=bar><div style="width:${pct(m)}%"></div></div><small>${m.w.length} words · ${pct(m)}%</small></div>`).join('');
if(sub==='ai'){s.innerHTML=`<div class="card chat" id=ch><p>Hi! Ask me “how do you say cat?” or type a Korean word. 🌸</p></div><input id=q placeholder="Ask about Korean…"><button class=btn id=sd>Send</button> <button class=ghost id=tp>Mini TOPIK</button>`;
$('#sd').onclick=()=>{chatSend('bomi',$('#q').value,$('#ch'));$('#q').value=''};
$('#tp').onclick=()=>quiz('Mini TOPIK',mk(5,'ko2en'))}
if(sub==='study')s.innerHTML=`<div class=card><h3>Phrases</h3>${PHR.map(p=>`<div class=row><span><b>${p[0]}</b> — ${p[1]}</span><button class=ghost onclick="speak('${p[0]}')">🔊</button></div>`).join('')}</div>`;
if(sub==='read')s.innerHTML=`<div class=card><h3>Reading</h3><p style="font-size:1.3rem">저는 과일을 좋아해요.<br>사과와 딸기를 먹어요.</p><p class=mute>I like fruit. I eat apples and strawberries.</p><small>저 = I · 과일 = fruit · 좋아해요 = like · 먹어요 = eat</small><br><br><button class=btn onclick="speak('저는 과일을 좋아해요. 사과와 딸기를 먹어요.')">🔊 Read aloud</button></div>`;
if(sub==='write'){const w=sh(ALL)[0];s.innerHTML=`<div class=card><h3>Translate to Korean</h3><div class=big>${w.e} ${w.en}</div><input id=an placeholder="한국어…"><button class=btn id=ck>Check</button><p id=rs></p></div>`;$('#ck').onclick=()=>{const ok=$('#an').value.trim()===w.ko;$('#rs').textContent=ok?'✅ Correct! +5 XP':`❌ ${w.ko} (${w.r})`;if(ok)addXP(5)}}}
function openMod(i){const m=MODS[i];V().innerHTML=`<h2>${m.e} ${m.t}</h2><p><button class=btn onclick="quizMod(${i})">Start quiz</button> <button class=ghost onclick="lessons()">Back</button></p><div class=grid>${m.w.map(w=>`<div class=w onclick="speak('${w.ko}')"><i>${pic(w)}</i><b>${w.ko}</b><br><small>${w.r}</small><br>${w.en}</div>`).join('')}</div>${m.id==='animals'?'<p class=mute>Bonus: 강아지 (gangaji) = puppy 🐶</p>':''}`}
function mk(n,kind,pool=ALL){return sh(pool).slice(0,n).map(w=>{const o=sh([w,...sh(pool.filter(x=>x!==w)).slice(0,3)]);
if(kind==='pic')return{p:pic(w),o:o.map(x=>x.ko),a:w.ko};
if(kind==='listen')return{p:'🎧 Listen',say:w.ko,o:o.map(x=>pic(x)),a:pic(w)};
if(kind==='rev')return{p:w.en+'<br>'+pic(w),o:o.map(x=>x.ko),a:w.ko};
if(kind==='rom')return{p:w.ko,say:w.ko,o:o.map(x=>x.r),a:w.r};
if(kind==='sound')return{p:'🎧',say:w.ko,o:o.map(x=>x.r),a:w.r};
if(kind==='gap')return{p:'___ 주세요.<br><small>"'+w.en+', please."</small>',o:o.map(x=>x.ko),a:w.ko};
return{p:w.ko,say:w.ko,o:o.map(x=>x.en),a:w.en}})}
function quizMod(i){quiz(MODS[i].t,mk(10,'ko2en',MODS[i].w),ok=>{S.prog[MODS[i].id]=Math.max(S.prog[MODS[i].id]||0,ok);save()})}
function quiz(title,qs,end){let i=0,ok=0;const v=V(),step=()=>{if(i>=qs.length){const xp=ok*3+5;addXP(xp);v.innerHTML=`<div class=card><h2>${ok}/${qs.length} 🌸</h2><p>+${xp} XP</p><button class=btn onclick="go()">Done</button></div>`;end&&end(ok);return}
const q=qs[i];v.innerHTML=`<div class=card><small>${title} · ${i+1}/${qs.length}</small><div class=big>${q.p}</div>${q.say?'<button class=ghost id=sp>🔊 Play</button>':''}<div class=opts>${q.o.map((o,k)=>`<button class=opt data-k=${k}>${o}</button>`).join('')}</div></div>`;if(q.say){speak(q.say);$('#sp').onclick=()=>speak(q.say)}
v.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const r=q.o[b.dataset.k]===q.a;if(r)ok++;b.classList.add(r?'ok':'bad');v.querySelectorAll('.opt').forEach(x=>x.disabled=true);setTimeout(()=>{i++;step()},700)})};step()}
function games(){V().innerHTML=`<h2>Games</h2><div class=grid>${GAMES.map(g=>`<div class=w onclick="play('${g[0]}')"><i>${g[2]}</i><b style="font-size:.9rem">${g[1]}</b><br><small>${S.played[g[0]]?'Played ✓':'Never played'}</small></div>`).join('')}</div>`}
function play(id){gate(()=>{S.played[id]=1;save();({flash,match:()=>quiz('Picture match',mk(8,'pic')),memory,listen:()=>quiz('Listening',mk(8,'listen')),trace,talk,dialog,builder,order,speed,
rev:()=>quiz('English → Korean',mk(8,'rev')),rom:()=>quiz('Romanization',mk(8,'rom')),sound:()=>quiz('Sound match',mk(8,'sound')),
gap:()=>quiz('Fill the gap',mk(8,'gap',MODS[0].w)),odd:()=>quiz('Odd one out',odd(6)),
boss:()=>quiz('Boss quiz',sh([...mk(5,'ko2en'),...mk(5,'pic'),...mk(5,'rev'),...odd(3)]))}[id]||soon)()})}
const soon=()=>V().innerHTML=`<div class=card><h3>Coming soon 🌸</h3><p>This game is not built yet.</p><button class=btn onclick="go()">Back</button></div>`;
function flash(){const due=[...ALL].sort((a,b)=>(S.srs[a.ko]?.due||0)-(S.srs[b.ko]?.due||0))[0];V().innerHTML=`<div class=card><div class=big id=fc style="cursor:pointer">${due.e}<br>${due.en}</div><p class=mute style="text-align:center">Tap card to flip</p><div class=row id=bt hidden><button class=ghost id=ag>Again</button><button class=btn id=gd>Good</button></div></div>`;
$('#fc').onclick=()=>{$('#fc').innerHTML=`<b>${due.ko}</b><br><small>${due.r}</small>`;speak(due.ko);$('#bt').hidden=false};
const rate=g=>{const s=S.srs[due.ko]||{box:0};s.box=g?s.box+1:0;s.due=Date.now()+(g?864e5*2**s.box:6e4);S.srs[due.ko]=s;addXP(g?3:1);flash()};$('#ag').onclick=()=>rate(0);$('#gd').onclick=()=>rate(1)}
function memory(){const ws=sh(ALL).slice(0,8),cs=sh(ws.flatMap(w=>[{w,t:w.e},{w,t:w.ko}]));let a=null,m=0,lock=0;V().innerHTML=`<div class=card><h3>Memory pairs</h3><div class=grid style="grid-template-columns:repeat(4,1fr)">${cs.map((c,i)=>`<button class="opt mem" data-i=${i}>?</button>`).join('')}</div></div>`;
V().querySelectorAll('.mem').forEach(b=>b.onclick=()=>{if(lock||b.disabled||b===a)return;const c=cs[b.dataset.i];b.textContent=c.t;if(!a){a=b;return}const p=cs[a.dataset.i];if(p.w===c.w&&p.t!==c.t){a.disabled=b.disabled=true;a.classList.add('ok');b.classList.add('ok');a=null;if(++m===8){addXP(30);setTimeout(()=>V().innerHTML=`<div class=card><h2>All pairs found! 🌸</h2><p>+30 XP</p><button class=btn onclick="go()">Done</button></div>`,500)}}else{lock=1;const x=a;a=null;setTimeout(()=>{x.textContent=b.textContent='?';lock=0},800)}})}
function trace(){const L='ㄱㄴㄷㄹㅁㅂㅅㅇㅏㅓㅗㅜ'.split(''),l=sh(L)[0];V().innerHTML=`<div class=card><h3>Trace the letter</h3><canvas id=cv width=320 height=320></canvas><div class=row style="margin-top:10px"><button class=ghost id=cl>Clear</button><button class=btn id=dn>Done +5 XP</button></div></div>`;
const c=$('#cv'),x=c.getContext('2d');const ink=()=>getComputedStyle(document.body).color;const draw=()=>{x.clearRect(0,0,320,320);x.font='220px "Noto Sans KR",sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillStyle='rgba(240,143,174,.3)';x.fillText(l,160,170)};draw();x.lineWidth=12;x.lineCap='round';x.strokeStyle='#e0527f';let d=0;
const pt=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*320/r.width,(e.clientY-r.top)*320/r.height]};
c.onpointerdown=e=>{d=1;const[a,b]=pt(e);x.beginPath();x.moveTo(a,b)};c.onpointermove=e=>{if(!d)return;const[a,b]=pt(e);x.lineTo(a,b);x.stroke()};c.onpointerup=()=>d=0;$('#cl').onclick=draw;$('#dn').onclick=()=>{addXP(5);trace()}}
function profile(){V().innerHTML=`<div class=card><h2>${S.user||'Guest'}</h2><p>Level ${lvl()} · ${S.xp} XP · 🔥 ${S.streak}</p>${S.user?'':'<button class=btn onclick="gate(()=>profile())">Create account</button>'}</div><div class=card><button class=ghost id=th>Toggle light/dark</button> <button class=ghost id=rs>Reset progress</button></div><p class=mute>Progress is stored on this device.</p>`;
$('#th').onclick=()=>{S.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';save();theme()};$('#rs').onclick=()=>{if(confirm('Reset all progress?')){localStorage.removeItem('bomi');location.reload()}}}
theme();$('#begin').onclick=()=>{$('#splash').hidden=true;$('#app').hidden=false;go('home')};
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'));

async function ask(msgs,persona){try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:msgs.slice(-10),persona})});const j=await r.json();return j.text||null}catch(e){return null}}
const hist=[];
async function chatSend(persona,inp,box,say){const q=inp.trim();if(!q)return;box.innerHTML+=`<p class=me>${esc(q)}</p>`;hist.push({role:'user',content:q});let a=await ask(hist,persona);
if(!a){const w=ALL.find(x=>q.toLowerCase().includes(x.en)||q.includes(x.ko));a=w?`${w.e} ${w.ko} (${w.r}) = ${w.en}`:'AI is offline. Add your API key (see README).'}
hist.push({role:'assistant',content:a});box.innerHTML+=`<p>${esc(a)}</p>`;addXP(2);if(say){const k=a.match(/[가-힣][가-힣 ,.!?]*/);if(k)speak(k[0])}}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function hear(cb){if(!SR){alert('Voice input works in Chrome or Safari.');return}const r=new SR();r.lang='ko-KR';r.onresult=e=>cb(e.results[0][0].transcript);r.start()}
function talk(){hist.length=0;V().innerHTML=`<div class="card chat" id=ch><p>🐻 안녕! 나는 곰돌이야. (Hi! I’m Komdori.)</p></div><button class=btn id=mc>🎤 Speak</button> <input id=q placeholder="or type…"><button class=ghost id=sd>Send</button>`;
$('#sd').onclick=()=>{chatSend('komdori',$('#q').value,$('#ch'),1);$('#q').value=''};$('#mc').onclick=()=>hear(t=>chatSend('komdori',t,$('#ch'),1))}
function dialog(){const p=sh(PHR)[0];V().innerHTML=`<div class=card><h3>Say it aloud</h3><div class=big>${p[0]}</div><p style="text-align:center">${p[1]}</p><div class=row><button class=ghost id=pl>🔊 Listen</button><button class=btn id=mc>🎤 Speak</button></div><p id=rs></p><button class=ghost onclick="dialog()">Next</button></div>`;
$('#pl').onclick=()=>speak(p[0]);$('#mc').onclick=()=>hear(t=>{const n=s=>s.replace(/[\s.!?,]/g,'');const ok=n(t)===n(p[0]);$('#rs').textContent=ok?'✅ Great! +8 XP':'I heard: '+t;if(ok)addXP(8)})}
function assemble(title,head,units,target,sep,again){let got=[];V().innerHTML=`<div class=card><h3>${title}</h3><div class=big>${head}</div><div class=big id=ans style="font-size:1.6rem">…</div><div class=opts id=ps>${sh(units).map(c=>`<button class=opt>${c}</button>`).join('')}</div></div>`;
V().querySelectorAll('#ps .opt').forEach(b=>b.onclick=()=>{got.push(b.textContent);b.disabled=true;$('#ans').textContent=got.join(sep);if(got.length===units.length){if(got.join(sep)===target){addXP(6);speak(target);setTimeout(again,800)}else{got=[];$('#ans').textContent='✗ try again';V().querySelectorAll('#ps .opt').forEach(x=>x.disabled=false)}}})}
function builder(){const w=sh(ALL.filter(x=>x.ko.length>=2))[0];assemble('Build the word',pic(w)+'<br><small>'+w.en+'</small>',w.ko.split(''),w.ko,'',builder)}
function order(){const p=sh(PHR.filter(x=>x[0].includes(' ')))[0];assemble('Put in order',p[1],p[0].split(' '),p[0],' ',order)}
function speed(){let sc=0;const end=Date.now()+30000,v=V();const nx=()=>{if(Date.now()>=end){addXP(sc*2);v.innerHTML=`<div class=card><h2>${sc} correct ⚡</h2><p>+${sc*2} XP</p><button class=btn onclick="go()">Done</button></div>`;return}
const q=mk(1,'pic')[0];v.innerHTML=`<div class=card><small>⚡ ${Math.ceil((end-Date.now())/1000)}s · ${sc}</small><div class=big>${q.p}</div><div class=opts>${q.o.map(o=>`<button class=opt>${o}</button>`).join('')}</div></div>`;v.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(b.textContent===q.a)sc++;nx()})};nx()}
function odd(n){return Array.from({length:n},()=>{const[a,b]=sh(MODS),o=sh(b.w)[0],t=sh(a.w).slice(0,3),x=w=>pic(w)+' '+w.ko;return{p:'Which one is from a different group?',o:sh([...t,o]).map(x),a:x(o)}})}
