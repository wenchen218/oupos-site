/**
 * OUPOS site configuration.
 * Replace these blank strings with VERIFIED public URLs before publishing.
 * Never place keys, tokens, or private server addresses in this file.
 */
document.documentElement.classList.add('motion-ready');
const SITE_LINKS = {
  appStore: '', // e.g. 'https://apps.apple.com/tw/app/your-app/id0000000000'
  github: ''    // e.g. 'https://github.com/your-org/oupos'
};

const icons = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const money = (amount) => `$${Number(amount).toLocaleString('zh-TW')}`;
const PRODUCTS = {
  '漢堡': [ ['burger','豬肉蛋堡',60],['cod','黃金鱈魚堡',70],['beef','牛肉起司堡',90],['chicken','香雞蛋堡',65],['tuna-burger','鮪魚蛋堡',65],['ham-burger','火腿蛋堡',55],['cheese-burger','起司蛋堡',50],['veggie-burger','蔬菜蛋堡',55] ],
  '吐司': [ ['tuna-toast','鮪魚蛋吐司',55],['pork-toast','豬肉蛋吐司',50],['ham-toast','火腿蛋吐司',45],['egg-toast','起司蛋吐司',45],['corn-toast','玉米蛋吐司',50],['chicken-toast','香雞吐司',60] ],
  '飲料': [ ['tea','紅茶 (L)',30],['milk-tea','奶茶 (L)',35],['soy','豆漿',30],['coffee','美式咖啡',50],['latte','拿鐵咖啡',65],['green','綠茶 (L)',30] ],
  '可頌': [ ['croissant-egg','起司蛋可頌',65],['croissant-ham','火腿可頌',70],['croissant-tuna','鮪魚可頌',75] ],
  '厚片': [ ['toast-choco','巧克力厚片',40],['toast-peanut','花生厚片',40],['toast-garlic','香蒜厚片',40] ],
  '丹麥': [ ['danish-ham','火腿蛋丹麥',70],['danish-cheese','起司丹麥',65] ]
};
const MODS = [ ['egg','加蛋',10],['cheese','加起司',10],['no-veggie','不加菜',0],['no-sauce','不要醬',0],['more-sauce','醬多',0] ];
const reportOrders = [
  ['#261011887','即時','線上',180,'LINE Pay'],
  ['#261011617','06:50','電話',80,'現金'],
  ['#261011009','10:02','外帶',100,'全支付'],
  ['#261011885','07:11','內用',220,'現金']
];
const onlineSeed = [
  {number:'#261010099',name:'線上訂購者',rows:[['黃金鱈魚堡',1,70],['紅茶 (L)',1,30]],total:100},
  {number:'#261010128',name:'線上訂購者',rows:[['鮪魚蛋吐司',2,110],['豆漿',1,30]],total:140},
  {number:'#261010157',name:'線上訂購者',rows:[['起司蛋可頌',1,65],['拿鐵咖啡',1,65]],total:130}
];

function createDemo(root){
  const state={
    view:'order',category:'漢堡',cart:[
      {lineId:1,id:'burger',name:'豬肉蛋堡',price:60,qty:1,mods:[]},
      {lineId:2,id:'tea',name:'紅茶 (L)',price:30,qty:1,mods:[]}
    ],lineSeq:2,selectedLine:1,payment:'',cashReceived:null,cashDraft:'0',modal:null,quantityTarget:null,
    code:'',online:[...onlineSeed],note:'',settingsTab:'商品庫存',toastId:0
  };
  const lineTotal=(l)=>l.qty*(l.price+l.mods.reduce((sum,m)=>sum+m[2],0));
  const total=()=>state.cart.reduce((sum,l)=>sum+lineTotal(l),0);
  const selected=()=>state.cart.find(l=>l.lineId===state.selectedLine);
  const viewLabels={order:'點餐',scan:'掃碼',online:'線上',reports:'報表',settings:'設定'};
  const viewIcons={order:'grid',scan:'scan',online:'globe',reports:'chart',settings:'settings'};
  const selectedModifiers=(line)=>line?.mods.map(m=>m[1]).join(' · ')||'';
  const safeText=(input)=>String(input).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function topBar(){
    const now=new Date();
    const day=`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
    const clock=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    return `<div class="pos-topbar"><div class="pos-top-left"><span class="pos-store">OUPOS｜Oupos早餐店</span><span class="pos-top-divider"></span><span class="pos-auto">自動接單</span><span class="pos-switch"></span></div><div class="pos-topnav">${Object.entries(viewLabels).map(([view,label])=>`<button type="button" class="pos-navbtn ${(state.view===view||(state.view==='checkout'&&view==='order'))?'active':''}" data-view="${view}" aria-label="示範：${label}">${icons(viewIcons[view])}<span>${label}</span>${view==='online'&&state.online.length?`<sup class="pos-badge">${state.online.length}</sup>`:''}</button>`).join('')}</div><div class="pos-clock"><span>${day}</span><strong>${clock}</strong></div></div>`;
  }
  function cart(){
    const checkout=state.view==='checkout';
    const cashValid=state.payment==='cash'&&state.cashReceived!==null;
    const change=state.cashReceived-total();
    return `<aside class="pos-cart"><div class="pos-cart-header"><h3>購物車</h3><button class="pos-clear" data-action="clear">清空</button></div><div class="pos-cart-items">${state.cart.length?state.cart.map(l=>`<div class="pos-cart-item"><button class="pos-remove" data-action="remove" data-line="${l.lineId}" title="移除商品">×</button><div class="pos-cart-text"><strong>${safeText(l.name)}</strong>${selectedModifiers(l)?`<small>+${safeText(selectedModifiers(l))}</small>`:''}</div><button class="pos-qty" data-action="qty" data-line="${l.lineId}" title="調整數量">${l.qty}</button><span class="pos-lineprice">${money(lineTotal(l))}</span></div>`).join(''):'<div class="pos-empty">購物車目前沒有商品</div>'}</div><div class="pos-cart-bottom"><div class="pos-total"><span>總計</span><span>${money(total())}</span></div>${checkout&&cashValid?`<div class="pos-cash-summary"><p><span>實收</span><span>${money(state.cashReceived)}</span></p><p class="${change<0?'pos-short':'pos-change'}"><span>${change<0?'尚差':'找零'}</span><span>${money(Math.abs(change))}</span></p></div>`:''}<div class="pos-cart-actions">${checkout?`<button class="pos-phone" data-action="back">返回</button><button class="pos-checkout" data-action="submit">下單 →</button>`:`<button class="pos-phone" data-action="phone">電話點餐</button><button class="pos-checkout" data-action="checkout">結帳 →</button>`}</div></div></aside>`;
  }
  function order(){
    return `<div class="pos-main"><div class="pos-categories">${Object.keys(PRODUCTS).map(cat=>`<button class="pos-cat ${cat===state.category?'active':''}" data-category="${cat}">${cat}</button>`).join('')}</div><div class="pos-center"><div class="pos-grid">${PRODUCTS[state.category].map(([id,name,price])=>`<button type="button" class="pos-product" data-product="${id}"><span>${name}</span><b>${money(price)}</b></button>`).join('')}</div><div class="pos-modifiers"><span class="pos-mod-title">配料選擇 ${selected()?`· ${safeText(selected().name)}`:''}</span><div class="pos-mod-options">${MODS.map(m=>`<button type="button" class="pos-mod ${selected()?.mods.some(selectedMod=>selectedMod[0]===m[0])?'active':''}" data-mod="${m[0]}"><span>${m[1]}</span><small>${m[2]?`+${m[2]}`:'不加價'}</small></button>`).join('')}</div></div></div>${cart()}</div>`;
  }
  function checkout(){
    const methods=[['cash','現金'],['linepay','LINE Pay'],['pxpay','全支付']];
    return `<div class="pos-main"><div class="pos-page"><h3>支付方式</h3><div class="pos-payment-list">${methods.map(([key,label])=>`<button type="button" class="pos-payment-option ${state.payment===key?'active':''}" data-payment="${key}">${label}</button>`).join('')}</div><label class="pos-note" for="${root.id}-note">訂單備註</label><textarea class="pos-notearea" id="${root.id}-note" placeholder="輸入訂單備註...">${safeText(state.note)}</textarea><p style="color:#8b8b8b;font-size:.95em;margin-top:12px">此畫面為互動展示，不會連線付款。</p></div>${cart()}</div>`;
  }
  function online(){
    return `<div class="pos-main"><div class="pos-online-cards">${state.online.length?state.online.map((item,i)=>`<div class="pos-online-card"><div class="pos-online-top"><strong>${item.number}</strong><em>即時</em></div><div class="pos-online-name">${item.name} · 線上</div>${item.rows.map(([name,qty,amount])=>`<div class="pos-online-row"><span>${name} ×${qty}</span><b>${money(amount)}</b></div>`).join('')}<div class="pos-online-subtotal">總計 ${money(item.total)}</div><div class="pos-online-actions"><button data-online="${i}" data-decision="reject">拒單</button><button data-online="${i}" data-decision="accept">接單</button></div></div>`).join(''):'<div class="pos-online-empty">目前沒有待處理的示範訂單</div>'}</div></div>`;
  }
  function reports(){
    return `<div class="pos-main"><div class="pos-reports"><div class="pos-report-head"><div class="pos-report-tabs"><span class="active">營業額</span><span>銷售統計</span></div><div class="pos-report-meta">◷ 2026/10/11 00:00 ~ 08:59</div></div><div class="pos-report-body"><div class="pos-report-left"><div class="pos-kpis"><div class="pos-kpi"><span>今日營業額</span><strong>${money(19982)}</strong></div><div class="pos-kpi"><span>總訂單數</span><strong>68</strong></div></div><div class="pos-chartbox"><h4>各支付方式統計</h4><div class="pos-pie"></div><div class="pos-chart-legend"><span>現金</span><span>LINE Pay</span><span>全支付</span></div></div></div><div class="pos-report-table"><table><thead><tr><th>訂單號</th><th>時間</th><th>桌號</th><th>金額</th><th>付款方式</th><th>操作</th></tr></thead><tbody>${reportOrders.map(o=>`<tr><td>${o[0]}</td><td>${o[1]}</td><td>${o[2]}</td><td>${money(o[3])}</td><td>${o[4]}</td><td><button class="pos-details" data-action="report-detail">詳情</button></td></tr>`).join('')}</tbody></table></div></div></div></div>`;
  }
  function scan(){return `<div class="pos-main"><div class="pos-scan-wrap"><div class="pos-camera">${icons('scan')}<span style="position:absolute;top:60%">相機畫面示意</span></div><div class="pos-keypad-wrap"><h4>或者輸入代碼</h4><div class="pos-code-display">${safeText(state.code)||'—'}</div><div class="pos-keypad">${['1','2','3','4','5','6','7','8','9','X','0','✓'].map(d=>`<button data-digit="${d}">${d}</button>`).join('')}</div></div></div></div>`;}
  function settings(){return `<div class="pos-main"><div class="pos-settings"><div class="pos-settings-tabs"><strong>${state.settingsTab}</strong><span>菜單管理</span><span>桌號設定</span><span>維修模式</span><span>外送設定</span><span>優惠券管理</span><span>設備設定</span></div><div class="pos-settings-body">設定頁面示意 · 請於實際 POS 中操作設定</div></div></div>`;}
  function modal(){
    if(!state.modal)return '';
    const isCash=state.modal==='cash';
    const draft=isCash?state.cashDraft:String(state.qtyDraft??'1');
    return `<div class="pos-modal-overlay" data-action="close-overlay"><div class="pos-key-modal" role="dialog" aria-label="${isCash?'實收金額':'商品數量'}" aria-modal="true"><h4>${isCash?'實收金額':'商品數量'}</h4><div class="pos-key-modal-display">${isCash?'$':''}${draft}</div><div class="pos-keypad">${['1','2','3','4','5','6','7','8','9','✕','0','✓'].map(n=>`<button class="${n==='✕'?'cancel':n==='✓'?'confirm':''}" data-key="${n}">${n}</button>`).join('')}</div></div></div>`;
  }
  function render(){
    root.innerHTML=topBar()+({order,checkout,online,reports,scan,settings}[state.view]||order)()+modal();
  }
  let toastTimer;
  function notify(message){
    const existing=root.querySelector('.demo-toast');if(existing)existing.remove();
    const el=document.createElement('div');el.className='demo-toast';el.setAttribute('role','status');el.textContent=message;root.appendChild(el);
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.remove(),2400);
  }
  function setView(view){state.view=view;state.modal=null;render();}
  root.addEventListener('input',event=>{if(event.target.classList.contains('pos-notearea'))state.note=event.target.value;});
  root.addEventListener('click',event=>{
    const btn=event.target.closest('button');
    if(!btn){if(event.target.classList.contains('pos-modal-overlay')){state.modal=null;render();}return;}
    if(btn.dataset.key){
      const key=btn.dataset.key;
      if(key==='✕'){state.modal=null;render();return;}
      if(key==='✓'){
        if(state.modal==='cash')state.cashReceived=Number(state.cashDraft);
        else{
          const line=state.cart.find(l=>l.lineId===state.quantityTarget);const n=Number(state.qtyDraft);
          if(line){if(n<=0)state.cart=state.cart.filter(l=>l!==line);else line.qty=Math.min(n,99);}
        }
        state.modal=null;render();return;
      }
      if(state.modal==='cash')state.cashDraft=(state.cashDraft==='0'?key:state.cashDraft+key).slice(0,7);
      else state.qtyDraft=(state.qtyDraft==='0'?key:state.qtyDraft+key).slice(0,2);
      render();return;
    }
    if(btn.dataset.view){setView(btn.dataset.view);return;}
    if(btn.dataset.category){state.category=btn.dataset.category;render();return;}
    if(btn.dataset.product){
      const found=Object.values(PRODUCTS).flat().find(p=>p[0]===btn.dataset.product);
      if(!found)return;
      let line=state.cart.find(l=>l.id===found[0]&&!l.mods.length);
      if(line)line.qty+=1;
      else{line={lineId:++state.lineSeq,id:found[0],name:found[1],price:found[2],qty:1,mods:[]};state.cart.push(line);}
      state.selectedLine=line.lineId;render();notify('已加入示範購物車');return;
    }
    if(btn.dataset.mod){
      const line=selected();if(!line){notify('請先選擇商品');return;}
      const mod=MODS.find(m=>m[0]===btn.dataset.mod);const i=line.mods.findIndex(m=>m[0]===mod[0]);
      if(i<0)line.mods.push(mod);else line.mods.splice(i,1);
      render();return;
    }
    if(btn.dataset.payment){
      state.payment=btn.dataset.payment;
      if(state.payment==='cash'){state.cashDraft=state.cashReceived===null?'0':String(state.cashReceived);state.modal='cash';}
      else state.modal=null;
      render();return;
    }
    if(btn.dataset.digit){
      const digit=btn.dataset.digit;
      if(digit==='X')state.code=state.code.slice(0,-1);
      else if(digit==='✓'){notify(state.code?'展示模式：代碼未送出':'請輸入代碼');return;}
      else state.code=(state.code+digit).slice(0,12);
      render();return;
    }
    if(btn.dataset.online!==undefined){
      state.online.splice(Number(btn.dataset.online),1);render();notify(btn.dataset.decision==='accept'?'已示範接單（未送出）':'已示範拒單（未送出）');return;
    }
    if(btn.dataset.action){
      const action=btn.dataset.action;
      if(action==='remove'){state.cart=state.cart.filter(l=>l.lineId!==Number(btn.dataset.line));if(!selected())state.selectedLine=state.cart[0]?.lineId;render();}
      else if(action==='clear'){if(state.cart.length&&window.confirm('清空示範購物車？')){state.cart=[];state.selectedLine=null;render();}}
      else if(action==='qty'){const line=state.cart.find(l=>l.lineId===Number(btn.dataset.line));if(!line)return;state.quantityTarget=line.lineId;state.qtyDraft=String(line.qty);state.modal='qty';render();}
      else if(action==='checkout')setView('checkout');
      else if(action==='back')setView('order');
      else if(action==='phone')notify('電話點餐：互動示意');
      else if(action==='report-detail')notify('訂單詳情：互動示意');
      else if(action==='submit'){
        if(!state.cart.length){notify('請先加入商品');return;}
        if(!state.payment){notify('請選擇支付方式');return;}
        if(state.payment==='cash'&&(state.cashReceived===null||state.cashReceived<total())){notify('請輸入足夠的實收金額');return;}
        notify('示範模式：不會產生實際訂單');
      }
    }
  });
  root.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&state.modal){state.modal=null;render();}
    if(event.key==='Enter'&&state.modal){event.preventDefault();const confirm=root.querySelector('[data-key="✓"]');confirm?.click();}
  });
  function setStoryScene(scene){
    // A deterministic six-step visual tour. The data never leaves this browser.
    state.category='漢堡';state.selectedLine=null;state.payment='';state.modal=null;state.cashReceived=null;
    state.online=[...onlineSeed];state.cart=[];
    if(scene===0){state.view='order';}
    if(scene===1){state.view='order';state.cart=[{lineId:1,id:'burger',name:'豬肉蛋堡',price:60,qty:1,mods:[]},{lineId:2,id:'tea',name:'紅茶 (L)',price:30,qty:1,mods:[]}];state.selectedLine=1;}
    if(scene===2){state.view='order';state.cart=[{lineId:1,id:'burger',name:'豬肉蛋堡',price:60,qty:2,mods:[MODS[0],MODS[1]]},{lineId:2,id:'tea',name:'紅茶 (L)',price:30,qty:1,mods:[]}];state.selectedLine=1;}
    if(scene===3){state.view='checkout';state.cart=[{lineId:1,id:'burger',name:'豬肉蛋堡',price:60,qty:2,mods:[MODS[0],MODS[1]]},{lineId:2,id:'tea',name:'紅茶 (L)',price:30,qty:1,mods:[]}];state.payment='cash';state.cashReceived=500;}
    if(scene===4){state.view='online';}
    if(scene===5){state.view='reports';}
    render();
  }
  render();
  return {setView,setStoryScene};
}



/* ---------- Product-site interactions ---------- */
const demos={};
for(const id of ['hero-pos','story-pos','showcase-pos']){
  const el=document.getElementById(id);
  if(el)demos[id]=createDemo(el);
}
const tabs=[...document.querySelectorAll('.showcase-option')];
function selectDemoTab(view){
  demos['showcase-pos']?.setView(view);
  tabs.forEach(btn=>{const active=btn.dataset.view===view;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',String(active));btn.tabIndex=active?0:-1;});
}
tabs.forEach(btn=>btn.addEventListener('click',()=>selectDemoTab(btn.dataset.view)));
const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobile-menu');
menuToggle?.addEventListener('click',()=>{const opening=mobileMenu.hidden;mobileMenu.hidden=!opening;menuToggle.setAttribute('aria-expanded',String(opening));menuToggle.setAttribute('aria-label',opening?'關閉網站選單':'開啟網站選單');});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.hidden=true;menuToggle?.setAttribute('aria-expanded','false');}));
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileMenu&&!mobileMenu.hidden){mobileMenu.hidden=true;menuToggle?.setAttribute('aria-expanded','false');}});

const lessMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window){
  const reveals=[...document.querySelectorAll('.reveal')];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target);}});
  },{threshold:.08,rootMargin:'0px 0px 0px 0px'});
  reveals.forEach(el=>observer.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));}

const storySteps=[
  {kicker:'選擇商品',title:'商品就在眼前。',description:'打開點餐畫面，分類和商品清楚排列，點一下就能開始。',callout:'01 · 商品分類'},
  {kicker:'加入購物車',title:'點一下。\n立即加入。',description:'商品與金額同步出現在右側購物車，不離開目前的操作畫面。',callout:'02 · 購物車即時更新'},
  {kicker:'調整配料',title:'想加蛋？\n就這麼簡單。',description:'加蛋、加起司和數量變更，金額跟著即時更新。',callout:'03 · 配料與數量'},
  {kicker:'現金結帳',title:'收款清楚。\n找零也清楚。',description:'一眼對照總計、實收及找零；現金鍵盤也能直接輸入。',callout:'04 · 找零即時計算'},
  {kicker:'線上訂單',title:'新訂單到了。\n不用手忙腳亂。',description:'線上訂單集中呈現，餐點、金額與接單操作都在同一畫面。',callout:'05 · 線上訂單'},
  {kicker:'營運報表',title:'每天的成果，\n一目了然。',description:'營收、訂單數與付款方式統計，讓管理資訊回到簡潔明瞭。',callout:'06 · 營運報表'}
];
const storyTrack=document.getElementById('story-track');
const storyCopy=document.getElementById('story-wording');
const storyTitle=document.getElementById('story-title');
const storyDescription=document.getElementById('story-description');
const storyKicker=document.getElementById('story-kicker');
const storyNumber=document.getElementById('story-number');
const storyCallout=document.getElementById('story-callout');
const storyFill=document.getElementById('story-progress-fill');
const storyBar=document.getElementById('story-progressbar');
let activeScene=-1,scrollQueued=false;
function changeScene(scene){
  const n=Math.max(0,Math.min(storySteps.length-1,scene));
  if(n===activeScene)return;
  activeScene=n;const info=storySteps[n];
  storyCopy?.classList.add('switching');
  storyTrack?.setAttribute('data-scene',String(n));
  demos['story-pos']?.setStoryScene(n);
  if(storyNumber)storyNumber.textContent=String(n+1).padStart(2,'0');
  if(storyKicker)storyKicker.textContent=info.kicker;
  if(storyTitle)storyTitle.innerHTML=info.title.replaceAll('\n','<br>');
  if(storyDescription)storyDescription.textContent=info.description;
  if(storyCallout)storyCallout.innerHTML='<span class="callout-dot"></span>'+info.callout;
  storyBar?.setAttribute('aria-valuenow',String(n+1));
  requestAnimationFrame(()=>storyCopy?.classList.remove('switching'));
}
function fitHero(){
  const slot=document.querySelector('.hero-app-crop');
  const view=document.getElementById('hero-pos');
  if(!slot||!view)return;
  view.style.transform=`scale(${slot.clientWidth/1040})`;
}
function fitStory(){
  const slot=document.querySelector('.story-screen-slot');
  const view=document.getElementById('story-pos');
  if(!slot||!view)return;
  const scale=slot.clientWidth/1040;
  slot.style.height=`${Math.max(1,570*scale)}px`;
  view.style.transform=`scale(${scale})`;
}
function getStoryDimensions(){
  const top=window.scrollY+storyTrack.getBoundingClientRect().top;
  const max=Math.max(1,storyTrack.offsetHeight-window.innerHeight+52);
  return {top,max};
}
function updateStory(){
  scrollQueued=false;if(!storyTrack)return;
  const {top,max}=getStoryDimensions();
  const progress=Math.max(0,Math.min(1,(window.scrollY-top)/max));
  const scene=Math.min(5,Math.floor(progress*6));
  changeScene(scene);
  storyTrack.style.setProperty('--cinema-progress',String(progress));
  if(storyFill)storyFill.style.width=`${Math.max(1,Math.min(100,progress*100))}%`;
}
function onScroll(){if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateStory);}}
function goToScene(n){
  const idx=Math.min(5,Math.max(0,n));
  changeScene(idx);
  const {top,max}=getStoryDimensions();
  window.scrollTo({top:top+max*((idx+.26)/6),behavior:lessMotion.matches?'instant':'smooth'});
}
document.getElementById('story-prev')?.addEventListener('click',()=>goToScene(activeScene-1));
document.getElementById('story-next')?.addEventListener('click',()=>goToScene(activeScene+1));
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',()=>{fitStory();fitHero();onScroll();},{passive:true});
if('ResizeObserver' in window){new ResizeObserver(()=>fitStory()).observe(document.querySelector('.story-screen-slot'));new ResizeObserver(()=>fitHero()).observe(document.querySelector('.hero-app-crop'));}
fitStory();fitHero();changeScene(0);onScroll();

const SITE_DIALOG=document.getElementById('info-dialog');
const dialogTitle=document.getElementById('info-dialog-title');
const dialogBody=document.getElementById('info-dialog-body');
function openInfo(title,body){
  dialogTitle.textContent=title;dialogBody.textContent=body;
  if(SITE_DIALOG?.showModal)SITE_DIALOG.showModal();else alert(`${title}\n${body}`);
}
for(const a of document.querySelectorAll('[data-external]')){
  const key=a.dataset.external,url=SITE_LINKS[key];
  if(url&&/^https:\/\//i.test(url)){a.href=url;a.target='_blank';a.rel='noopener noreferrer';}
  else a.addEventListener('click',ev=>{ev.preventDefault();openInfo(key==='appStore'?'App Store 連結尚未設定':'GitHub 連結尚未設定','請在 app.js 的 SITE_LINKS 填入已確認的正式公開網址。');});
}
for(const btn of document.querySelectorAll('[data-plan-dialog]')){
  btn.addEventListener('click',()=>openInfo('此方案尚在規劃中','OUPOS 目前僅確認免費開源版本。專業支援和多店營運方案的價格、功能與推出時間均未確認，網站中列出的是比較示意。'));
}
document.getElementById('dialog-close')?.addEventListener('click',()=>SITE_DIALOG?.close());
document.getElementById('dialog-ok')?.addEventListener('click',()=>SITE_DIALOG?.close());
SITE_DIALOG?.addEventListener('click',e=>{if(e.target===SITE_DIALOG)SITE_DIALOG.close();});
const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
