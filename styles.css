:root { 
  --bg-main: #060913; 
  --bg-panel: #111524;
  --bg-panel-darker: #0a0d18;
  --gold-primary: #d97706;
  --gold-light: #fcd34d;
  --gold-dark: #92400e;
  --border-color: #334155;
  --text-main: #e2e8f0;
  --text-muted: #94a3b8;
  --ok: #34d399; 
  --bad: #ef4444; 
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body { 
  font-family: 'Inter', -apple-system, sans-serif; 
  background: radial-gradient(circle at top, #1e293b 0%, var(--bg-main) 100%);
  color: var(--text-main); 
  padding: 2rem;
  line-height: 1.5;
  min-height: 100vh;
}

/* Typography */
h1, h2, h3, .slot-text, .gold-text { font-family: 'Cinzel', serif; letter-spacing: 0.5px; }
.header-container { margin-bottom: 2.5rem; text-align: center; }
h1 { font-size: 2.2rem; font-weight: 700; color: var(--gold-light); text-shadow: 0 0 15px rgba(252, 211, 77, 0.3); }
.subtitle { color: var(--text-muted); font-size: 0.95rem; margin-top: 0.3rem; letter-spacing: 2px; text-transform: uppercase; }

/* Layout Grid */
.grid { display: grid; gap: 1.5rem; grid-template-columns: 380px 1fr; max-width: 1100px; margin: 0 auto; }

/* Panels (Game Menus) */
.panel { 
  background: var(--bg-panel); 
  border: 1px solid var(--border-color); 
  border-radius: 6px; 
  box-shadow: 0 10px 25px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02);
  overflow: hidden;
}
.panel-header {
  background: linear-gradient(to bottom, #1e293b, var(--bg-panel-darker));
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}
.panel-header h3 { font-size: 1.1rem; color: var(--gold-light); margin: 0; }
.panel-body { padding: 1.5rem; }

/* Inputs */
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.input-group label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.5px; }
input { 
  width: 100%; padding: 0.6rem; font-size: 0.95rem; 
  border: 1px solid var(--border-color); border-radius: 4px; 
  background: var(--bg-panel-darker); color: var(--text-main);
  transition: all 0.2s ease;
}
input:focus { outline: none; border-color: var(--gold-primary); box-shadow: 0 0 8px rgba(217, 119, 6, 0.4); }

/* Buttons */
button { 
  padding: 0.7rem 1rem; font-size: 0.95rem; font-weight: 600; 
  border-radius: 4px; cursor: pointer; transition: all 0.2s ease; 
  font-family: 'Cinzel', serif; letter-spacing: 1px;
}
.btn-gold { 
  background: linear-gradient(to bottom, #f59e0b, #d97706); 
  border: 1px solid #fbbf24; color: #111; 
  box-shadow: 0 2px 10px rgba(217,119,6,0.3); flex: 1;
}
.btn-gold:hover { background: linear-gradient(to bottom, #fbbf24, #f59e0b); transform: scale(1.02); }
.btn-dark { 
  background: #1e293b; border: 1px solid var(--border-color); color: var(--text-main); 
}
.btn-dark:hover { background: #334155; border-color: var(--text-muted); }
.toolbar { display: flex; gap: 0.5rem; }
.actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }

/* Tables */
.game-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.game-table th, .game-table td { padding: 0.6rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
.game-table th { color: var(--text-muted); font-weight: 500; }
.game-table td { font-family: 'JetBrains Mono', monospace; color: var(--gold-light); text-align: right;}
.row-total th, .row-total td { font-weight: 700; color: #fff; border-top: 1px solid var(--gold-primary); }
.stats-grid { display: grid; gap: 1.5rem; }

#probs table { width: 100%; font-size: 0.8rem; border-collapse: collapse; text-align: center; }
#probs th { background: var(--bg-panel-darker); padding: 0.5rem; color: var(--gold-light); border: 1px solid var(--border-color); }
#probs td { padding: 0.5rem; border: 1px solid rgba(255,255,255,0.05); }

/* Inventory Items */
.inv { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 0.8rem; }
.item { 
  background: linear-gradient(135deg, #1e293b, var(--bg-panel-darker));
  border: 1px solid var(--border-color); border-radius: 6px; 
  padding: 0.8rem; cursor: grab; text-align: center;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
  transition: all 0.2s ease;
}
.item:hover { border-color: var(--gold-light); box-shadow: inset 0 0 15px rgba(252,211,77,0.2); }
.item.drag { opacity: 0.5; }
.item strong { display: block; font-size: 0.85rem; color: var(--text-main); margin-bottom: 0.5rem; }
.chip.lvl { 
  background: var(--gold-dark); color: var(--gold-light); 
  padding: 0.1rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem; border: 1px solid var(--gold-primary);
}

/* Drop Slot */
.slot { 
  border: 2px dashed var(--border-color); border-radius: 8px; padding: 2rem; 
  min-height: 140px; display: flex; flex-direction: column; 
  align-items: center; justify-content: center; 
  background: rgba(0,0,0,0.3); text-align: center; 
  transition: all 0.3s ease;
}
.slot.over { background: rgba(217,119,6,0.1); border-color: var(--gold-primary); border-style: solid; box-shadow: inset 0 0 20px rgba(217,119,6,0.2); }
.slot-text { color: var(--border-color); font-size: 1.1rem; }

/* Stones (Glowing Orbs) */
.stones { display: flex; gap: 1.2rem; align-items: center; justify-content: center; flex-wrap: wrap; }
.stone { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; cursor: pointer; outline: none; }
.stone .dot { 
  width: 50px; height: 50px; border-radius: 50%; 
  display: flex; align-items: center; justify-content: center; 
  font-weight: 700; font-size: 0.8rem; color: #fff;
  border: 2px solid transparent;
  transition: all 0.3s;
}
.imo-orb { background: radial-gradient(circle at 30% 30%, #e2e8f0, #475569); box-shadow: 0 0 10px rgba(226,232,240,0.3); }
.hv-orb { background: radial-gradient(circle at 30% 30%, #60a5fa, #1e3a8a); box-shadow: 0 0 10px rgba(96,165,250,0.3); }
.uw-orb { background: radial-gradient(circle at 30% 30%, #a78bfa, #4c1d95); box-shadow: 0 0 10px rgba(167,139,250,0.3); }
.univ-orb { background: radial-gradient(circle at 30% 30%, #34d399, #064e3b); box-shadow: 0 0 10px rgba(52,211,153,0.3); }

.stone .label { font-size: 0.8rem; color: var(--text-muted); font-family: 'Cinzel', serif; letter-spacing: 0.5px; }

.stone:hover .dot { transform: scale(1.1); }
.stone.selected .dot { 
  transform: scale(1.15); 
  border-color: var(--gold-light); 
  box-shadow: 0 0 20px rgba(252,211,77,0.6); 
}
.stone.selected .label { color: var(--gold-light); text-shadow: 0 0 5px rgba(252,211,77,0.5); }

/* Log Console */
.log { 
  font-family: 'JetBrains Mono', monospace; 
  font-size: 0.85rem; background: #000; color: #aaa; 
  border: 1px solid var(--border-color); border-radius: 4px; 
  max-height: 200px; overflow-y: auto; padding: 1rem; 
  box-shadow: inset 0 0 15px rgba(0,0,0,1); display: flex; flex-direction: column; gap: 0.5rem;
}
.log div { padding-bottom: 0.5rem; border-bottom: 1px dashed rgba(255,255,255,0.1); }
.log div:last-child { border-bottom: none; }
.ok { color: var(--ok); text-shadow: 0 0 5px rgba(52,211,153,0.3); }
.bad { color: var(--bad); }

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
}
