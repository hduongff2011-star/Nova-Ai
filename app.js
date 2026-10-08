const chat=document.querySelector('#chat'), form=document.querySelector('#form'), input=document.querySelector('#input');
const dlg=document.querySelector('#dlg'), endpoint=document.querySelector('#endpoint'), key=document.querySelector('#key');
let history=JSON.parse(localStorage.getItem('nova_history')||'[]');
endpoint.value=localStorage.getItem('nova_endpoint')||'';
key.value=localStorage.getItem('nova_key')||'';
function add(role,text){const d=document.createElement('div');d.className='msg '+role;const b=document.createElement('div');b.className='bubble';b.textContent=text;d.appendChild(b);chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
if(history.length){document.querySelector('.welcome')?.remove();history.forEach(x=>add(x.role,x.text))}
function save(){localStorage.setItem('nova_history',JSON.stringify(history.slice(-100)))}
form.addEventListener('submit',async e=>{e.preventDefault();const text=input.value.trim();if(!text)return;document.querySelector('.welcome')?.remove();input.value='';add('user',text);history.push({role:'user',text});save();const ep=localStorage.getItem('nova_endpoint');if(!ep){add('assistant','Bạn chưa cấu hình API endpoint. Nhấn ⚙️ để kết nối app với backend AI của bạn.');return}add('assistant','Đang trả lời…');const last=chat.lastElementChild;try{const headers={'Content-Type':'application/json'};const k=localStorage.getItem('nova_key');if(k)headers.Authorization='Bearer '+k;const r=await fetch(ep,{method:'POST',headers,body:JSON.stringify({messages:history})});if(!r.ok)throw new Error('HTTP '+r.status);const data=await r.json();const answer=data.output_text||data.content||data.message||data.reply||'Backend không trả về nội dung.';last.querySelector('.bubble').textContent=answer;history.push({role:'assistant',text:answer});save()}catch(err){last.querySelector('.bubble').textContent='Không kết nối được backend: '+err.message+'\n\nKiểm tra endpoint và CORS.'}});
document.querySelector('#settings').onclick=()=>dlg.showModal();
document.querySelector('#close').onclick=()=>dlg.close();
document.querySelector('#save').onclick=()=>{localStorage.setItem('nova_endpoint',endpoint.value.trim());localStorage.setItem('nova_key',key.value);dlg.close()};
input.addEventListener('input',()=>{input.style.height='auto';input.style.height=Math.min(input.scrollHeight,130)+'px'});
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
