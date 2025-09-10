// ======= Parameter Game =======
const MAX_LEVEL = 8;
const PROBS = {
  imortal: {1:0.50,2:0.30,3:0.30,4:0.30,5:0.30,6:0.30,7:0.30,8:0.30},
  ceu:     {1:0.65,2:0.45,3:0.45,4:0.45,5:0.45,6:0.45,7:0.45,8:0.45},
  maligna: {1:0.533,2:0.335,3:0.335,4:0.335,5:0.335,6:0.335,7:0.335,8:0.335},
  terra:   {1:1.00,2:0.25,3:0.10,4:0.04,5:0.02,6:0.0077,7:0.0047,8:0.0025},
};
const FAIL_RULE = { imortal:'reset', ceu:'reset', maligna:'drop', terra:'stay' };

// ======= Referensi UI =======
const pricesInputs = {
  imortal: document.getElementById('p_imortal'),
  ceu: document.getElementById('p_ceu'),
  maligna: document.getElementById('p_maligna'),
  terra: document.getElementById('p_terra'),
};
const $inv = document.getElementById('inventory');
const $slot = document.getElementById('table-slot');
const $log  = document.getElementById('log');
const $stones = document.getElementById('stones');

// ======= Keadaan (State) =======
const state = {
  items: [
    {id:'A', name:'Item 1', lvl:0},
    {id:'B', name:'Item 2', lvl:0},
    {id:'C', name:'Item 3', lvl:0},
  ],
  onTable: null,
  spent: {imortal:0, ceu:0, maligna:0, terra:0},
  used:  {imortal:0, ceu:0, maligna:0, terra:0},
  selectedStone: 'imortal',
};

// ======= Fungsi Pembantu =======
function fmt(n){ return String(Number(n).toFixed(2)).replace(/\.0+$/, ""); }
function priceOf(stone){ return Number(pricesInputs[stone].value || 0); }

function updateCostsUI(){
  const t = state.spent.imortal + state.spent.ceu + state.spent.maligna + state.spent.terra;
  document.getElementById('c_imortal').textContent = fmt(state.spent.imortal);
  document.getElementById('c_ceu').textContent     = fmt(state.spent.ceu);
  document.getElementById('c_maligna').textContent = fmt(state.spent.maligna);
  document.getElementById('c_terra').textContent   = fmt(state.spent.terra);
  document.getElementById('c_total').textContent   = fmt(t);
}
function updateUsageUI(){
  const totalUsed = state.used.imortal + state.used.ceu + state.used.maligna + state.used.terra;
  document.getElementById('u_imortal').textContent = state.used.imortal;
  document.getElementById('u_ceu').textContent     = state.used.ceu;
  document.getElementById('u_maligna').textContent = state.used.maligna;
  document.getElementById('u_terra').textContent   = state.used.terra;
  document.getElementById('u_total').textContent   = totalUsed;
}

// ======= Penyimpanan Harga =======
(function loadPrices(){
  const saved = JSON.parse(localStorage.getItem('pw_refine_prices') || '{}');
  for (const k of Object.keys(pricesInputs)) if (saved[k]!=null) pricesInputs[k].value = saved[k];
  updateCostsUI();
  updateUsageUI();
})();
document.getElementById('save-prices').onclick = () => {
  const toSave = {}; for (const k of Object.keys(pricesInputs)) toSave[k] = Number(pricesInputs[k].value||0);
  localStorage.setItem('pw_refine_prices', JSON.stringify(toSave));
};

// ======= Atur Ulang Semua =======
document.getElementById('reset-all').onclick = () => {
  state.items = state.items.map(it => ({...it, lvl:0}));
  state.spent = {imortal:0, ceu:0, maligna:0, terra:0};
  state.used  = {imortal:0, ceu:0, maligna:0, terra:0};
  state.onTable = null;
  renderInventory();
  updateCostsUI();
  updateUsageUI();
  $slot.textContent = 'Seret item ke sini';
  $log.textContent = '';
};

// ======= Inventory (bisa diseret) =======
function renderInventory(){
  $inv.innerHTML = '';
  state.items.forEach(it => {
    const card = document.createElement('div');
    card.className = 'item';
    card.draggable = true;
    card.dataset.id = it.id;
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <strong>${it.name}</strong>
        <span class="chip lvl">+${it.lvl}</span>
      </div>`;
    card.addEventListener('dragstart', e => { card.classList.add('drag'); e.dataTransfer.setData('text/plain', it.id); });
    card.addEventListener('dragend',   () => card.classList.remove('drag'));
    $inv.appendChild(card);
  });
}
renderInventory();

// ======= Kotak (drop target) =======
$slot.addEventListener('dragover', e => { e.preventDefault(); $slot.classList.add('over'); });
$slot.addEventListener('dragleave', () => $slot.classList.remove('over'));
$slot.addEventListener('drop', e => {
  e.preventDefault(); $slot.classList.remove('over');
  const id = e.dataTransfer.getData('text/plain');
  placeOnTable(id);
});
function placeOnTable(id){
  const it = state.items.find(x=>x.id===id);
  if (!it) return;
  state.onTable = id;
  $slot.innerHTML = `<div><strong>${it.name}</strong> <span class="chip">Level saat ini: <b>+${it.lvl}</b></span></div>`;
}
document.getElementById('remove').onclick = () => {
  state.onTable = null;
  $slot.textContent = 'Seret item ke sini';
};

// ======= Pemilihan batu (lingkaran) =======
$stones.addEventListener('click', (e) => {
  const stoneEl = e.target.closest('.stone');
  if (!stoneEl) return;
  document.querySelectorAll('.stone').forEach(el => el.classList.remove('selected'));
  stoneEl.classList.add('selected');
  state.selectedStone = stoneEl.dataset.stone;
});

// ======= Logika SATU percobaan (client-side) =======
function attemptOnce(currentLevel, stone){
  if (currentLevel >= MAX_LEVEL){
    return {success:false, new_level: currentLevel, applied_rule:'max'};
  }
  const need = currentLevel + 1;
  const p = PROBS[stone][need];
  const roll = Math.random();
  const success = roll < p;
  if (success){
    return {success:true, new_level: currentLevel + 1, applied_rule:'success'};
  } else {
    const rule = FAIL_RULE[stone];
    let newLevel = currentLevel;
    if (rule === 'drop') newLevel = Math.max(0, currentLevel - 1);
    else if (rule === 'reset') newLevel = 0;
    // 'stay' mantém
    return {success:false, new_level:newLevel, applied_rule:rule};
  }
}

// ======= Refine (1x dan 10x) =======
async function refineOnce(){
  if (!state.onTable){ log('Seret item ke Kotak Refine!', 'bad'); return; }
  const it = state.items.find(x=>x.id===state.onTable);
  if (it.lvl >= MAX_LEVEL){ log(`Item sudah mencapai level maksimum (+${MAX_LEVEL}).`, 'ok'); return; }

  const stone = state.selectedStone;
  state.spent[stone] += priceOf(stone);
  state.used[stone]  += 1;
  updateCostsUI();
  updateUsageUI();

  const res = attemptOnce(it.lvl, stone);
  it.lvl = res.new_level;

  renderInventory();
  placeOnTable(it.id);

  if (res.success) {
    log('Refined successfully!', 'ok');
  } else {
    let msg = 'Refining failed.';
    if (res.applied_rule === 'reset')      msg += ' Item level reset.';
    else if (res.applied_rule === 'stay')  msg += ' Item level unchanged.';
    else if (res.applied_rule === 'drop')  msg += ' Item level reduced by 1.';
    log(msg, 'bad');
  }
}
document.getElementById('refine').onclick  = () => refineOnce();
document.getElementById('refine10').onclick = async () => { for (let i=0;i<10;i++) await refineOnce(); };

function log(msg, cls){
  const line = document.createElement('div');
  if (cls) line.classList.add(cls);
  line.textContent = msg;
  $log.prepend(line);
}

// ======= Tabel probabilitas =======
(function renderProbs(){
  const host = document.getElementById('probs');
  const tbl = document.createElement('table');
  const head = document.createElement('tr');
  const name = {imortal:"IMO", ceu:"Heaven", maligna:"Underworld", terra:"Universal"};
  head.innerHTML = '<th>+</th>' + Object.keys(PROBS).map(k=>`<th>${name[k]}</th>`).join('');
  tbl.appendChild(head);
  for (let lvl=1; lvl<= MAX_LEVEL; lvl++){
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>+${lvl}</td>` + Object.keys(PROBS).map(k=>{
      const v = (PROBS[k][lvl]*100).toFixed(1)+'%';
      return `<td>${v}</td>`;
    }).join('');
    tbl.appendChild(tr);
  }
  host.appendChild(tbl);
})();
