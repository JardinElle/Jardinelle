import React, { useState, useEffect, useRef } from "react";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "213671192119";

// Palette de couleurs étendue pour les fleurs (12 couleurs)
const FLOWER_COLORS = [
  { id: "jaune",      name: "Jaune",      hex: "#f9ca24", category: "yellow" },
  { id: "blanc",      name: "Blanc pur",  hex: "#ffffff", category: "white" },
  { id: "rose_pastel",name: "Rose Pastel",hex: "#f8bbd0", category: "pink" },
  { id: "rouge",      name: "Rouge Passion", hex: "#e53935", category: "red" },
  { id: "bleu_ciel",  name: "Bleu Ciel",  hex: "#64b5f6", category: "blue" },
  { id: "violet",     name: "Violet",     hex: "#9b59b6", category: "purple" },
  { id: "orange",     name: "Orange",     hex: "#f39c12", category: "orange" },
  { id: "fuchsia",    name: "Fuchsia",    hex: "#e91e63", category: "pink" },
  { id: "menthe",     name: "Menthe",     hex: "#4fc3f7", category: "blue" },
  { id: "lavande",    name: "Lavande",    hex: "#b39ddb", category: "purple" },
  { id: "dore",       name: "Doré",       hex: "#f9a825", category: "yellow" },
  { id: "corail",     name: "Corail",     hex: "#ff7e67", category: "orange" },
];

// Fleurs disponibles
const FLOWERS = [
  { id: "rose", name: "Rose", nameAr: "وردة", emoji: "🌹", price: 500, colors: FLOWER_COLORS },
  { id: "lily", name: "Lily", nameAr: "زنبق", emoji: "🌸", price: 450, colors: FLOWER_COLORS },
  { id: "tournesol", name: "Tournesol", nameAr: "عباد الشمس", emoji: "🌻", price: 450, colors: FLOWER_COLORS },
  { id: "tulipe", name: "Tulipe", nameAr: "توليب", emoji: "🌷", price: 450, colors: FLOWER_COLORS },
  { id: "lavender", name: "Lavande", nameAr: "لافندر", emoji: "🌿", price: 115, colors: FLOWER_COLORS },
  { id: "daisy", name: "Daisy", nameAr: "أقحوان", emoji: "🌼", price: 80, colors: FLOWER_COLORS },
];

const KEYCHAINS = FLOWERS.filter(f => ["rose","lily","tournesol","tulipe"].includes(f.id));

// Couleurs pour les cœurs (Pot)
const HEART_COLORS = [
  { id: "rouge",      name: "Rouge",      hex: "#c0392b" },
  { id: "rose",       name: "Rose",       hex: "#f48fb1" },
  { id: "violet",     name: "Violet",     hex: "#9b59b6" },
  { id: "bleu",       name: "Bleu",       hex: "#2196f3" },
  { id: "blanc",      name: "Blanc",      hex: "#ffffff" },
  { id: "noir",       name: "Noir",       hex: "#212121" },
  { id: "jaune",      name: "Jaune",      hex: "#f9ca24" },
  { id: "vert",       name: "Vert",       hex: "#4caf50" },
  { id: "peche",      name: "Pêche",      hex: "#ffcba4" },
  { id: "bordeaux",   name: "Bordeaux",   hex: "#7d1128" },
  { id: "dore",       name: "Doré",       hex: "#f9a825" },
  { id: "argent",     name: "Argent",     hex: "#bdbdbd" },
];

// Fillers
const FILLERS = [
  { id: "led",        name: "LED",               nameAr: "إضاءة LED",    price: 500, emoji: "✨" },
  { id: "artificial", name: "Filler Artificiel", nameAr: "حشو اصطناعي", price: 35,  emoji: "🌿" },
  { id: "greenery",   name: "Filler Pipe Cleaner", nameAr: "فيلر بايب كلينر", price: 35,  emoji: "🌿" },
];

// Emballages bouquet
const EMBALLAGE_BOUQUET = [
  { id: "small",  name: "Emballage Small", nameAr: "تغليف صغير",  price: 350, maxFlowers: 4 },
  { id: "medium", name: "Emballage Moyen", nameAr: "تغليف متوسط", price: 450, maxFlowers: 7 },
  { id: "large",  name: "Emballage Grand", nameAr: "تغليف كبير",  price: 700, maxFlowers: 999 },
  { id: "tule_perles", name: "Tule & Perles", nameAr: "تول ولؤلؤ", price: 900, maxFlowers: 999 },
];

// Rubans
const RIBBON_TYPES = [
  { id: "moyen",  name: "Ruban Normal", nameAr: "شريط عادي",  extraCost: 0 },
  { id: "perles", name: "Ruban Perles", nameAr: "شريط لؤلؤ",  extraCost: 80 },
];

// Lampes
const LAMP_MODELS = [
  { id: "rapunzel",  name: "Rapunzel",   nameAr: "رابونزل",    price: 2800, emoji: "🌟" },
  { id: "tournesol", name: "Tournesol", nameAr: "عباد الشمس", price: 2800, emoji: "🌻" },
  { id: "lily",      name: "Lily",       nameAr: "زنبق",       price: 2800, emoji: "🌸" },
  { id: "rose",      name: "Rose",       nameAr: "وردة",       price: 2800, emoji: "🌹" },
];

const LAMP_COLORS = [
  { id: "rouge", name: "Rouge", hex: "#c0392b" }, { id: "rose", name: "Rose", hex: "#f48fb1" },
  { id: "peche", name: "Pêche", hex: "#ffcba4" }, { id: "violet", name: "Violet", hex: "#9b59b6" },
  { id: "lavande", name: "Lavande", hex: "#b39ddb" }, { id: "bleu", name: "Bleu", hex: "#2196f3" },
  { id: "turquoise", name: "Turquoise", hex: "#00bcd4" }, { id: "vert", name: "Vert", hex: "#4caf50" },
  { id: "jaune", name: "Jaune", hex: "#f9ca24" }, { id: "orange", name: "Orange", hex: "#e67e22" },
  { id: "blanc", name: "Blanc", hex: "#ffffff" }, { id: "noir", name: "Noir", hex: "#212121" },
];

// Boards
const BOARD_CONFIGS = [
  { id: "small", name: "Small Board", nameAr: "لوحة صغيرة", basePrice: 800, numDaisies: 6 },
  { id: "moyen", name: "Moyen Board", nameAr: "لوحة متوسطة", basePrice: 1500, numDaisies: 12 },
];

// Wilayas
const WILAYAS = [
  { name: "Alger", stopDesk: 520, home: 600 }, { name: "Oran", stopDesk: 570, home: 850 },
  { name: "Constantine", stopDesk: 570, home: 850 }, { name: "Annaba", stopDesk: 570, home: 900 },
  { name: "Blida", stopDesk: 520, home: 700 }, { name: "Sétif", stopDesk: 570, home: 850 },
  { name: "Tizi Ouzou", stopDesk: 570, home: 750 }, { name: "Béjaïa", stopDesk: 570, home: 900 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmtPrice = (n) => `${n.toLocaleString()} DA`;
const sizeLabel = (n) => { if (n === 0) return ""; if (n < 4) return "Small"; if (n <= 7) return "Medium"; return "Large"; };

// ─── COMPOSANT SÉLECTION MULTI-FLEURS ────────────────────────────────────────
function MultiFlowerSelector({ flower, selections = [], onAdd, onUpdateQuantity, onRemove }) {
  const [selectedColor, setSelectedColor] = useState(flower.colors[0].id);
  const [quantity, setQuantity] = useState(1);

  const getColorHex = (colorId) => flower.colors.find(c => c.id === colorId)?.hex || "#ccc";
  const isLightColor = (colorId) => ["#ffffff", "#f9ca24", "#f8bbd0", "#ffcba4"].includes(getColorHex(colorId));

  const handleAdd = () => { if (quantity > 0) { onAdd(flower.id, selectedColor, quantity); setQuantity(1); } };
  const existingForColor = selections.find(s => s.colorId === selectedColor);

  return (
    <div className="multi-flower-card">
      <div className="multi-flower-header">
        <span className="flower-emoji">{flower.emoji}</span>
        <div className="flower-info">
          <span className="flower-name">{flower.name}</span>
          <span className="flower-ar">{flower.nameAr}</span>
          <span className="flower-price">{fmtPrice(flower.price)} / pièce</span>
        </div>
      </div>
      <div className="multi-flower-controls">
        <div className="color-selection">
          <span className="selection-label">Couleur :</span>
          <div className="color-row">
            {flower.colors.map((c) => (
              <button key={c.id} className={`color-dot${selectedColor === c.id ? " active" : ""}`}
                style={{ background: c.hex, border: isLightColor(c.id) ? "1px solid #ccc" : "none" }}
                onClick={() => setSelectedColor(c.id)} title={c.name} />
            ))}
          </div>
        </div>
        <div className="quantity-selection">
          <span className="selection-label">Qté :</span>
          <div className="qty-row">
            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span className="qty-num">{quantity}</span>
            <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <button className="add-flower-btn" onClick={handleAdd}>➕ Ajouter</button>
      </div>
      {existingForColor && <div className="existing-badge">Déjà {existingForColor.quantity} × {flower.colors.find(c => c.id === selectedColor)?.name}</div>}
    </div>
  );
}

function SelectedFlowerItem({ flower, selection, onUpdate, onRemove }) {
  const color = flower.colors.find(c => c.id === selection.colorId);
  const isLight = ["#ffffff", "#f9ca24", "#f8bbd0", "#ffcba4"].includes(color?.hex || "");
  return (
    <div className="selected-flower-item">
      <span className="flower-dot" style={{ background: color?.hex, border: isLight ? "1px solid #ccc" : "none" }} />
      <span className="flower-name-sm">{flower.name}</span>
      <span className="flower-color-sm">· {color?.name}</span>
      <div className="selected-qty-control">
        <button className="qty-btn-sm" onClick={() => onUpdate(selection.colorId, Math.max(0, selection.quantity - 1))}>−</button>
        <span className="qty-num-sm">{selection.quantity}</span>
        <button className="qty-btn-sm" onClick={() => onUpdate(selection.colorId, selection.quantity + 1)}>+</button>
      </div>
      <button className="remove-btn-sm" onClick={() => onRemove(selection.colorId)}>🗑️</button>
    </div>
  );
}

// ─── COMPOSANT SÉLECTION CŒURS MULTI-COULEURS ────────────────────────────────
function HeartMultiSelector({ hearts = [], onAdd, onRemove, onUpdateQuantity }) {
  const [selectedColor, setSelectedColor] = useState(HEART_COLORS[0].id);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => { if (quantity > 0) { onAdd(selectedColor, quantity); setQuantity(1); } };

  return (
    <div className="multi-heart-selector">
      <div className="multi-heart-header">
        <span className="heart-icon">💗</span>
        <span className="heart-title">Cœurs décoratifs</span>
        <span className="heart-price">250 DA / cœur</span>
      </div>
      <div className="heart-controls">
        <div className="color-selection">
          <span className="selection-label">Couleur :</span>
          <div className="color-row">
            {HEART_COLORS.map((c) => (
              <button key={c.id} className={`color-dot${selectedColor === c.id ? " active" : ""}`}
                style={{ background: c.hex, border: c.hex === "#ffffff" ? "1px solid #ccc" : "none" }}
                onClick={() => setSelectedColor(c.id)} title={c.name} />
            ))}
          </div>
        </div>
        <div className="quantity-selection">
          <span className="selection-label">Qté :</span>
          <div className="qty-row">
            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span className="qty-num">{quantity}</span>
            <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <button className="add-heart-btn" onClick={handleAdd}>➕ Ajouter</button>
      </div>
      {hearts.length > 0 && (
        <div className="selected-hearts-list">
          {hearts.map((heart) => {
            const color = HEART_COLORS.find(c => c.id === heart.colorId);
            return (
              <div key={heart.colorId} className="selected-heart-item">
                <span className="heart-dot" style={{ background: color?.hex }} />
                <span>{color?.name}</span>
                <div className="selected-qty-control">
                  <button className="qty-btn-sm" onClick={() => onUpdateQuantity(heart.colorId, Math.max(0, heart.quantity - 1))}>−</button>
                  <span className="qty-num-sm">{heart.quantity}</span>
                  <button className="qty-btn-sm" onClick={() => onUpdateQuantity(heart.colorId, heart.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn-sm" onClick={() => onRemove(heart.colorId)}>🗑️</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── STEP 1 - SÉLECTION PRODUIT ──────────────────────────────────────────────
function Step1_ProductType({ onSelect, basket = [], onViewBasket }) {
  const products = [
    { id: "bouquet",  icon: "💐", name: "Bouquet",      nameAr: "باقة زهور", desc: "Bouquet personnalisé" },
    { id: "box",      icon: "🎁", name: "Flower Box",   nameAr: "صندوق زهور", desc: "Composition en box" },
    { id: "lamp",     icon: "🪔", name: "Lampe",        nameAr: "مصباح زهري", desc: "Lampe décorative" },
    { id: "board",    icon: "🌸", name: "Spring Board", nameAr: "لوحة ربيعية", desc: "Tableau décoratif" },
    { id: "pot",      icon: "🪴", name: "Pot",          nameAr: "وعاء زهور", desc: "Pot personnalisé" },
    { id: "keychain", icon: "🗝️", name: "Porte-clé",   nameAr: "حاملة مفاتيح", desc: "Miniature fleurie" },
  ];

  return (
    <div style={{background:"var(--cream)", minHeight:"100vh"}}>
      {basket.length > 0 && (
        <div className="landing-basket-bar" onClick={onViewBasket} style={{cursor:"pointer"}}>
          🛒 <strong>{basket.length} article{basket.length > 1 ? "s" : ""} dans le panier</strong>
          <span style={{marginLeft:8,color:"var(--sage)",fontWeight:600}}>{fmtPrice(basket.reduce((s,i)=>s+i.price,0))}</span>
          <span style={{marginLeft:"auto",fontSize:".78rem",color:"var(--rose-deep)"}}>Voir →</span>
        </div>
      )}
      <div className="hero-inner">
        <div className="hero-logo">Jardin<span>Elle</span></div>
        <div className="hero-slogan">L'art des fleurs qui ne fanent jamais</div>
        <div className="hero-tagline">✦ Handmade · Pipe-cleaner · Personnalisé ✦</div>
      </div>
      <div className="section-header"><h2>Créez votre <em>création florale</em></h2></div>
      <div className="product-grid">
        {products.map((p) => (
          <button key={p.id} className="product-card" onClick={() => onSelect(p.id)}>
            <span className="product-icon">{p.icon}</span>
            <span className="product-name">{p.name}</span>
            <span className="product-name-ar">{p.nameAr}</span>
            <span className="product-desc">{p.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── STEP 2 - PERSONNALISATION ───────────────────────────────────────────────
function Step2_Customize({ productType, config, setConfig }) {
  const flowerSelections = config.flowerSelections || {};
  
  const totalFlowers = Object.values(flowerSelections).reduce(
    (sum, selections) => sum + selections.reduce((s, sel) => s + sel.quantity, 0), 0
  );
  
  const updateFlowerSelection = (flowerId, colorId, deltaQty) => {
    setConfig((c) => {
      const current = { ...(c.flowerSelections || {}) };
      const arr = [...(current[flowerId] || [])];
      const idx = arr.findIndex(s => s.colorId === colorId);
      if (idx >= 0) {
        const newQty = arr[idx].quantity + deltaQty;
        if (newQty <= 0) arr.splice(idx, 1);
        else arr[idx] = { ...arr[idx], quantity: newQty };
      } else if (deltaQty > 0) arr.push({ colorId, quantity: deltaQty });
      if (arr.length === 0) delete current[flowerId];
      else current[flowerId] = arr;
      return { ...c, flowerSelections: current };
    });
  };
  
  const addFlower = (flowerId, colorId, qty) => updateFlowerSelection(flowerId, colorId, qty);
  const updateFlowerQty = (flowerId, colorId, newQty) => {
    setConfig((c) => {
      const current = { ...(c.flowerSelections || {}) };
      const arr = [...(current[flowerId] || [])];
      const idx = arr.findIndex(s => s.colorId === colorId);
      if (idx >= 0) {
        if (newQty <= 0) arr.splice(idx, 1);
        else arr[idx] = { ...arr[idx], quantity: newQty };
      } else if (newQty > 0) arr.push({ colorId, quantity: newQty });
      if (arr.length === 0) delete current[flowerId];
      else current[flowerId] = arr;
      return { ...c, flowerSelections: current };
    });
  };
  const removeFlowerColor = (flowerId, colorId) => updateFlowerQty(flowerId, colorId, 0);
  
  const heartSelections = config.heartSelections || [];
  const addHeart = (colorId, qty) => setConfig((c) => {
    const current = [...(c.heartSelections || [])];
    const idx = current.findIndex(h => h.colorId === colorId);
    if (idx >= 0) current[idx] = { ...current[idx], quantity: current[idx].quantity + qty };
    else current.push({ colorId, quantity: qty });
    return { ...c, heartSelections: current };
  });
  const updateHeartQty = (colorId, newQty) => setConfig((c) => {
    const current = [...(c.heartSelections || [])];
    const idx = current.findIndex(h => h.colorId === colorId);
    if (idx >= 0) {
      if (newQty <= 0) current.splice(idx, 1);
      else current[idx] = { ...current[idx], quantity: newQty };
    }
    return { ...c, heartSelections: current };
  });
  const removeHeart = (colorId) => updateHeartQty(colorId, 0);
  
  const setFillerQty = (id, delta) => setConfig((c) => {
    const qtys = { ...(c.fillerQtys || {}) };
    qtys[id] = Math.max(0, (qtys[id] || 0) + delta);
    return { ...c, fillerQtys: qtys };
  });
  
  // Auto-remove packaging
  useEffect(() => {
    if (productType !== "bouquet") return;
    setConfig((c) => {
      const total = Object.values(c.flowerSelections || {}).reduce(
        (sum, selections) => sum + selections.reduce((s, sel) => s + sel.quantity, 0), 0
      );
      let emb = c.emballage;
      if (total > 7 && (emb === "small" || emb === "medium")) emb = null;
      else if (total > 4 && emb === "small") emb = null;
      return emb !== c.emballage ? { ...c, emballage: emb } : c;
    });
  }, [totalFlowers, productType]);
  
  // LAMPE
  if (productType === "lamp") {
    const toggleLampColor = (colorId) => setConfig((c) => {
      const sel = c.lampColors || [];
      if (sel.includes(colorId)) return { ...c, lampColors: sel.filter(x => x !== colorId) };
      if (sel.length >= 2) return { ...c, lampColors: [sel[1], colorId] };
      return { ...c, lampColors: [...sel, colorId] };
    });
    return (
      <div className="step-content">
        <h2 className="step-title">Votre <em>Lampe</em> 🪔</h2>
        <label className="field-label">Modèle</label>
        <div className="lamp-grid">
          {LAMP_MODELS.map((m) => (
            <button key={m.id} className={`lamp-card${config.lampModel === m.id ? " selected" : ""}`}
              onClick={() => setConfig(c => ({ ...c, lampModel: m.id }))}>
              <span className="lamp-emoji">{m.emoji}</span>
              <span className="lamp-name">{m.name}</span>
              <span className="lamp-price">{fmtPrice(m.price)}</span>
            </button>
          ))}
        </div>
        <label className="field-label">🎨 Couleurs (choisir 2)</label>
        <div className="color-picker-row">
          {LAMP_COLORS.map(c => (
            <button key={c.id} className={`color-pill${(config.lampColors || []).includes(c.id) ? " active" : ""}`}
              onClick={() => toggleLampColor(c.id)}>
              <span className="pill-swatch" style={{ background: c.hex }} />
              <span className="pill-name">{c.name}</span>
            </button>
          ))}
        </div>
        <label className="field-label">🔋 Piles supplémentaires (+100 DA/pack)</label>
        <div className="option-row">
          {[0,1,2,3].map(n => (
            <button key={n} className={`option-chip${(config.extraBatteries || 0) === n ? " selected" : ""}`}
              onClick={() => setConfig(c => ({ ...c, extraBatteries: n }))}>
              {n === 0 ? "Aucune" : `+${n} pack${n > 1 ? "s" : ""}`}
              {n > 0 && <><br/><small>+{fmtPrice(n*100)}</small></>}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  // BOARD
  if (productType === "board") {
    const selectedBoard = BOARD_CONFIGS.find(b => b.id === config.boardConfig);
    const numDaisies = selectedBoard?.numDaisies || 0;
    const toggleDaisyColor = (idx, colorId) => setConfig(c => {
      const arr = [...(c.daisyColors || Array(numDaisies).fill(null))];
      arr[idx] = colorId;
      return { ...c, daisyColors: arr };
    });
    return (
      <div className="step-content">
        <h2 className="step-title">Spring Board 🌸</h2>
        <div className="option-row wrap">
          {BOARD_CONFIGS.map(b => (
            <button key={b.id} className={`option-chip${config.boardConfig === b.id ? " selected" : ""}`}
              onClick={() => setConfig(c => ({ ...c, boardConfig: b.id, daisyColors: Array(b.numDaisies).fill(null) }))}>
              {b.name}<br/><small className="chip-price">{fmtPrice(b.basePrice)}</small>
            </button>
          ))}
        </div>
        <button className={`option-chip${config.boardLed ? " selected" : ""}`}
          onClick={() => setConfig(c => ({ ...c, boardLed: !c.boardLed }))}>
          ✨ LED +500 DA
        </button>
        {selectedBoard && Array.from({ length: numDaisies }, (_, i) => {
          const selColor = (config.daisyColors || [])[i];
          return (
            <div key={i} className="daisy-row">
              <span>🌼 Marguerite {i+1}</span>
              <div className="color-row">
                {LAMP_COLORS.map(c => (
                  <button key={c.id} className={`color-dot${selColor === c.id ? " active" : ""}`}
                    style={{ background: c.hex }} onClick={() => toggleDaisyColor(i, c.id)} title={c.name} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  // POT
  if (productType === "pot") {
    const totalHearts = heartSelections.reduce((s, h) => s + h.quantity, 0);
    return (
      <div className="step-content">
        <h2 className="step-title">Pot 🪴</h2>
        <div className="size-indicator">
          <span className="size-badge">{totalFlowers} fleur{totalFlowers > 1 ? "s" : ""} · {totalHearts} cœur{totalHearts > 1 ? "s" : ""}</span>
        </div>
        {FLOWERS.map(flower => (
          <div key={flower.id}>
            <MultiFlowerSelector flower={flower} selections={flowerSelections[flower.id] || []}
              onAdd={addFlower} onUpdateQuantity={(flowerId, colorId, qty) => updateFlowerQty(flowerId, colorId, qty)}
              onRemove={(flowerId, colorId) => removeFlowerColor(flowerId, colorId)} />
            {(flowerSelections[flower.id] || []).map(sel => (
              <SelectedFlowerItem key={sel.colorId} flower={flower} selection={sel}
                onUpdate={(colorId, qty) => updateFlowerQty(flower.id, colorId, qty)}
                onRemove={(colorId) => removeFlowerColor(flower.id, colorId)} />
            ))}
          </div>
        ))}
        <HeartMultiSelector hearts={heartSelections} onAdd={addHeart} onRemove={removeHeart} onUpdateQuantity={updateHeartQty} />
        <label className="field-label">🌿 Fillers</label>
        {FILLERS.map(fl => {
          const qty = (config.fillerQtys || {})[fl.id] || 0;
          return (
            <div key={fl.id} className="filler-row">
              <span>{fl.name}</span>
              <span>{fmtPrice(fl.price)}/u</span>
              <div className="qty-row">
                <button onClick={() => setFillerQty(fl.id, -1)} disabled={qty===0}>−</button>
                <span>{qty}</span>
                <button onClick={() => setFillerQty(fl.id, 1)}>+</button>
              </div>
            </div>
          );
        })}
        <div className="info-box">🪴 Emballage pot inclus — 500 DA</div>
      </div>
    );
  }
  
  // KEYCHAIN
  if (productType === "keychain") {
    return (
      <div className="step-content">
        <h2 className="step-title">Porte-clé 🗝️</h2>
        {KEYCHAINS.map(flower => (
          <div key={flower.id}>
            <MultiFlowerSelector flower={flower} selections={flowerSelections[flower.id] || []}
              onAdd={addFlower} onUpdateQuantity={(flowerId, colorId, qty) => updateFlowerQty(flowerId, colorId, qty)}
              onRemove={(flowerId, colorId) => removeFlowerColor(flowerId, colorId)} />
            {(flowerSelections[flower.id] || []).map(sel => (
              <SelectedFlowerItem key={sel.colorId} flower={flower} selection={sel}
                onUpdate={(colorId, qty) => updateFlowerQty(flower.id, colorId, qty)}
                onRemove={(colorId) => removeFlowerColor(flower.id, colorId)} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  // BOUQUET / BOX
  const isBouquet = productType === "bouquet";
  const availablePackaging = isBouquet ? EMBALLAGE_BOUQUET.filter(e => totalFlowers <= e.maxFlowers) : [];
  
  return (
    <div className="step-content">
      <h2 className="step-title">{isBouquet ? "Bouquet 💐" : "Flower Box 🎁"}</h2>
      <div className="size-indicator">
        <span className="size-badge">{totalFlowers === 0 ? "Ajoutez des fleurs" : `${sizeLabel(totalFlowers)} · ${totalFlowers} fleur${totalFlowers > 1 ? "s" : ""}`}</span>
      </div>
      {FLOWERS.map(flower => (
        <div key={flower.id}>
          <MultiFlowerSelector flower={flower} selections={flowerSelections[flower.id] || []}
            onAdd={addFlower} onUpdateQuantity={(flowerId, colorId, qty) => updateFlowerQty(flowerId, colorId, qty)}
            onRemove={(flowerId, colorId) => removeFlowerColor(flowerId, colorId)} />
          {(flowerSelections[flower.id] || []).map(sel => (
            <SelectedFlowerItem key={sel.colorId} flower={flower} selection={sel}
              onUpdate={(colorId, qty) => updateFlowerQty(flower.id, colorId, qty)}
              onRemove={(colorId) => removeFlowerColor(flower.id, colorId)} />
          ))}
        </div>
      ))}
      <label className="field-label">🌿 Fillers</label>
      {FILLERS.map(fl => {
        const qty = (config.fillerQtys || {})[fl.id] || 0;
        return (
          <div key={fl.id} className="filler-row">
            <span>{fl.name}</span>
            <span>{fmtPrice(fl.price)}/u</span>
            <div className="qty-row">
              <button onClick={() => setFillerQty(fl.id, -1)} disabled={qty===0}>−</button>
              <span>{qty}</span>
              <button onClick={() => setFillerQty(fl.id, 1)}>+</button>
            </div>
          </div>
        );
      })}
      {isBouquet && (
        <>
          <label className="field-label">Emballage</label>
          <div className="option-row wrap">
            {availablePackaging.map(e => (
              <button key={e.id} className={`option-chip${config.emballage === e.id ? " selected" : ""}`}
                onClick={() => setConfig(c => ({ ...c, emballage: e.id }))}>
                {e.name}<br/><small>{fmtPrice(e.price)}</small>
              </button>
            ))}
          </div>
        </>
      )}
      {!isBouquet && <div className="info-box">🎁 Emballage box inclus — 2 000 DA</div>}
      <label className="field-label">Ruban</label>
      <div className="option-row wrap">
        {RIBBON_TYPES.map(r => (
          <button key={r.id} className={`option-chip${config.ribbonType === r.id ? " selected" : ""}`}
            onClick={() => setConfig(c => ({ ...c, ribbonType: r.id }))}>
            {r.name}{r.extraCost > 0 && <><br/><small>+{fmtPrice(r.extraCost)}</small></>}
          </button>
        ))}
      </div>
      <button className={`option-chip${config.perles ? " selected" : ""}`}
        onClick={() => setConfig(c => ({ ...c, perles: !c.perles }))}>
        🪩 Perles +350 DA
      </button>
    </div>
  );
}

// ─── STEP 3 - LIVRAISON ──────────────────────────────────────────────────────
function Step3_Delivery({ config, setConfig, savedCustomer }) {
  const [touched, setTouched] = useState({});
  const phone = (config.phone || "").replace(/\s/g, "");
  const phoneValid = /^0[5-7]\d{8}$/.test(phone);
  const nameValid = (config.name || "").trim().length > 0 && /^[a-zA-ZÀ-ÿ\s]+$/.test(config.name || "");
  const addressValid = (config.address || "").trim().length > 0 && /[a-zA-ZÀ-ÿ]/.test(config.address || "");
  
  return (
    <div className="step-content">
      <h2 className="step-title">Livraison 🚚</h2>
      {savedCustomer && <div className="saved-customer-banner">✅ Coordonnées pré-remplies</div>}
      <label className="field-label">Wilaya</label>
      <select className="field-select" value={config.wilaya || ""} onChange={e => setConfig(c => ({ ...c, wilaya: e.target.value }))}>
        <option value="">— Choisir —</option>
        {WILAYAS.map(w => <option key={w.name}>{w.name}</option>)}
      </select>
      {config.wilaya && (
        <>
          <label className="field-label">Mode de livraison</label>
          <div className="option-row">
            {[{key:"stopDesk",label:"🏪 Stop Desk"},{key:"home",label:"🏠 Domicile"}].map(({key,label}) => {
              const w = WILAYAS.find(w => w.name === config.wilaya);
              const price = w ? (key === "stopDesk" ? w.stopDesk : w.home) : 0;
              return (
                <button key={key} className={`option-chip${config.deliveryType === key ? " selected" : ""}${price === 0 ? " disabled" : ""}`}
                  disabled={price === 0} onClick={() => price > 0 && setConfig(c => ({ ...c, deliveryType: key }))}>
                  {label}<br/><small>{price === 0 ? "Indisponible" : fmtPrice(price)}</small>
                </button>
              );
            })}
          </div>
        </>
      )}
      <label className="field-label">Vos informations</label>
      <input className={`field-input${touched.name && !nameValid ? " field-error" : ""}`}
        placeholder="Nom complet *" value={config.name || ""}
        onChange={e => setConfig(c => ({ ...c, name: e.target.value }))}
        onBlur={() => setTouched(t => ({ ...t, name: true }))} />
      <input className={`field-input${touched.phone && !phoneValid ? " field-error" : ""}`}
        placeholder="Téléphone * (10 chiffres)" value={config.phone || ""} maxLength={10}
        onChange={e => setConfig(c => ({ ...c, phone: e.target.value.replace(/\D/g,"") }))}
        onBlur={() => setTouched(t => ({ ...t, phone: true }))} />
      <input className={`field-input${touched.address && !addressValid ? " field-error" : ""}`}
        placeholder="Adresse complète *" value={config.address || ""}
        onChange={e => setConfig(c => ({ ...c, address: e.target.value }))}
        onBlur={() => setTouched(t => ({ ...t, address: true }))} />
      <textarea className="field-input" rows={3} placeholder="Notes (optionnel)"
        value={config.notes || ""} onChange={e => setConfig(c => ({ ...c, notes: e.target.value }))} />
    </div>
  );
}

// ─── STEP 4 - CONFIRMATION ───────────────────────────────────────────────────
function Step4_Confirm({ productType, config, totalPrice, deliveryCost, grandTotal, basket, onWhatsApp, onAddToBasket, onBack }) {
  const productLabels = { bouquet:"Bouquet 💐", box:"Flower Box 🎁", lamp:"Lampe 🪔", board:"Spring Board 🌸", pot:"Pot 🪴", keychain:"Porte-clé 🗝️" };
  
  const formatFlowerList = () => {
    const selections = config.flowerSelections || {};
    const items = [];
    Object.entries(selections).forEach(([flowerId, colors]) => {
      const flower = FLOWERS.find(f => f.id === flowerId) || KEYCHAINS.find(f => f.id === flowerId);
      if (flower) {
        colors.forEach(({ colorId, quantity }) => {
          const color = flower.colors.find(c => c.id === colorId);
          items.push(`${flower.emoji} ${flower.name} ×${quantity} (${color?.name || colorId})`);
        });
      }
    });
    return items;
  };
  
  const formatHeartsList = () => {
    const hearts = config.heartSelections || [];
    return hearts.map(h => {
      const color = HEART_COLORS.find(c => c.id === h.colorId);
      return `💗 Cœur ${color?.name} ×${h.quantity}`;
    });
  };
  
  return (
    <div className="step-content">
      <h2 className="step-title">Résumé ✨</h2>
      <div className="summary-card">
        <div className="summary-row header">{productLabels[productType]}</div>
        <div className="summary-section">
          {formatFlowerList().map((item, i) => <div key={i} className="summary-item"><span>{item}</span></div>)}
          {formatHeartsList().map((item, i) => <div key={i} className="summary-item"><span>{item}</span></div>)}
          {Object.entries(config.fillerQtys || {}).map(([id, qty]) => qty > 0 && (
            <div key={id} className="summary-item"><span>🌿 {FILLERS.find(f=>f.id===id)?.name} ×{qty}</span></div>
          ))}
          {config.emballage && <div className="summary-item"><span>🎀 Emballage</span><span>{fmtPrice(EMBALLAGE_BOUQUET.find(e=>e.id===config.emballage)?.price)}</span></div>}
          {config.ribbonType && <div className="summary-item"><span>🎀 {RIBBON_TYPES.find(r=>r.id===config.ribbonType)?.name}</span><span>{fmtPrice(RIBBON_TYPES.find(r=>r.id===config.ribbonType)?.extraCost || 0)}</span></div>}
          {config.perles && <div className="summary-item"><span>🪩 Perles</span><span>+350 DA</span></div>}
          {config.lampModel && <div className="summary-item"><span>🪔 {LAMP_MODELS.find(m=>m.id===config.lampModel)?.name}</span><span>{fmtPrice(LAMP_MODELS.find(m=>m.id===config.lampModel)?.price)}</span></div>}
          {(config.extraBatteries || 0) > 0 && <div className="summary-item"><span>🔋 Piles +{config.extraBatteries}</span><span>{fmtPrice(config.extraBatteries * 100)}</span></div>}
          {config.boardConfig && <div className="summary-item"><span>🌸 {BOARD_CONFIGS.find(b=>b.id===config.boardConfig)?.name}</span><span>{fmtPrice(BOARD_CONFIGS.find(b=>b.id===config.boardConfig)?.basePrice)}</span></div>}
          {config.boardLed && <div className="summary-item"><span>✨ LED</span><span>+500 DA</span></div>}
          {(config.daisyColors || []).some(c=>c) && <div className="summary-item"><span>🌼 Marguerites personnalisées</span><span>inclus</span></div>}
        </div>
        {config.wilaya && (
          <div className="summary-section">
            <div className="summary-item"><span>🚚 Livraison ({config.wilaya} · {config.deliveryType === "stopDesk" ? "Stop Desk" : "Domicile"})</span><span>{fmtPrice(deliveryCost)}</span></div>
          </div>
        )}
        <div className="summary-divider" />
        <div className="summary-total"><span>Total</span><span className="total-val">{fmtPrice(grandTotal)}</span></div>
        <div className="summary-note">💰 Paiement à la livraison (cash)</div>
      </div>
      {config.name && (
        <div className="customer-card">
          <div>👤 {config.name}</div>
          <div>📞 {config.phone}</div>
          <div>📍 {config.address}</div>
          {config.notes && <div>📝 {config.notes}</div>}
        </div>
      )}
      <div className="delivery-note">🕒 Délai : 3 à 7 jours ouvrables</div>
      <button className="whatsapp-btn" onClick={onWhatsApp}>📲 Commander sur WhatsApp</button>
      <button className="add-basket-btn" onClick={onAddToBasket}>🛒 Ajouter au panier & continuer</button>
      <button className="back-btn" onClick={onBack}>← Retour</button>
    </div>
  );
}

// ─── FONCTIONS DE CALCUL ─────────────────────────────────────────────────────
const calcPrice = (cfg, pType) => {
  if (!pType) return 0;
  let total = 0;
  const selections = cfg.flowerSelections || {};
  Object.values(selections).forEach(flowerSelections => {
    flowerSelections.forEach(sel => {
      const flower = FLOWERS.find(f => f.id === sel.flowerId) || KEYCHAINS.find(f => f.id === sel.flowerId);
      if (flower) total += flower.price * sel.quantity;
    });
  });
  if (pType === "lamp") { total = LAMP_MODELS.find(m => m.id === cfg.lampModel)?.price || 2800; total += (cfg.extraBatteries || 0) * 100; }
  if (pType === "board") { total = BOARD_CONFIGS.find(b => b.id === cfg.boardConfig)?.basePrice || 0; if (cfg.boardLed) total += 500; }
  if (pType === "pot") { total += 500; (cfg.heartSelections || []).forEach(h => total += h.quantity * 250); }
  if (pType === "box") total += 2000;
  Object.entries(cfg.fillerQtys || {}).forEach(([id, qty]) => { const fl = FILLERS.find(f => f.id === id); if (fl) total += fl.price * qty; });
  if (pType === "bouquet" && cfg.emballage) { const e = EMBALLAGE_BOUQUET.find(e => e.id === cfg.emballage); if (e) total += e.price; }
  if (cfg.ribbonType) { const rt = RIBBON_TYPES.find(r => r.id === cfg.ribbonType); if (rt) total += rt.extraCost || 0; }
  if (cfg.perles) total += 350;
  return total;
};

const calcDelivery = (cfg) => {
  if (!cfg.wilaya || !cfg.deliveryType) return 0;
  const w = WILAYAS.find(w => w.name === cfg.wilaya);
  if (!w) return 0;
  return cfg.deliveryType === "stopDesk" ? w.stopDesk : w.home;
};

// ─── MESSAGE WHATSAPP ────────────────────────────────────────────────────────
const buildWhatsAppMessage = (productType, config, totalPrice) => {
  const lines = ["🌸 *JardinElle - Nouvelle commande*", "━━━━━━━━━━━━━━━━━━━━━"];
  lines.push(`📦 *Produit :* ${productType === "bouquet" ? "Bouquet 💐" : productType === "box" ? "Flower Box 🎁" : productType === "lamp" ? "Lampe 🪔" : productType === "board" ? "Spring Board 🌸" : productType === "pot" ? "Pot 🪴" : "Porte-clé 🗝️"}`);
  lines.push("");
  
  const selections = config.flowerSelections || {};
  Object.entries(selections).forEach(([flowerId, colors]) => {
    const flower = FLOWERS.find(f => f.id === flowerId) || KEYCHAINS.find(f => f.id === flowerId);
    if (flower && colors.length) {
      lines.push(`🌷 *${flower.name}* :`);
      colors.forEach(({ colorId, quantity }) => {
        const color = flower.colors.find(c => c.id === colorId);
        lines.push(`   ${quantity} × ${color?.name || colorId} — ${fmtPrice(flower.price * quantity)}`);
      });
      lines.push("");
    }
  });
  
  const hearts = config.heartSelections || [];
  if (hearts.length) {
    lines.push(`💗 *Cœurs décoratifs* :`);
    hearts.forEach(({ colorId, quantity }) => {
      const color = HEART_COLORS.find(c => c.id === colorId);
      lines.push(`   ${quantity} × ${color?.name || colorId} — ${fmtPrice(quantity * 250)}`);
    });
    lines.push("");
  }
  
  const fillers = Object.entries(config.fillerQtys || {}).filter(([,q]) => q > 0);
  if (fillers.length) {
    lines.push(`🌿 *Fillers* :`);
    fillers.forEach(([id, qty]) => {
      const fl = FILLERS.find(f => f.id === id);
      if (fl) lines.push(`   ${fl.name} ×${qty} — ${fmtPrice(fl.price * qty)}`);
    });
    lines.push("");
  }
  
  if (config.emballage) {
    const e = EMBALLAGE_BOUQUET.find(e => e.id === config.emballage);
    if (e) lines.push(`🎀 *Emballage* : ${e.name} — ${fmtPrice(e.price)}`);
  }
  if (config.ribbonType) {
    const rt = RIBBON_TYPES.find(r => r.id === config.ribbonType);
    if (rt && rt.extraCost > 0) lines.push(`🎀 *Ruban* : ${rt.name} — +${fmtPrice(rt.extraCost)}`);
  }
  if (config.perles) lines.push(`🪩 *Perles* : +350 DA`);
  if (config.lampModel) lines.push(`🪔 *Lampe* : ${LAMP_MODELS.find(m => m.id === config.lampModel)?.name} — ${fmtPrice(LAMP_MODELS.find(m => m.id === config.lampModel)?.price)}`);
  if (config.extraBatteries > 0) lines.push(`🔋 *Piles supplémentaires* : +${config.extraBatteries} pack — ${fmtPrice(config.extraBatteries * 100)}`);
  if (config.boardConfig) lines.push(`🌸 *Board* : ${BOARD_CONFIGS.find(b => b.id === config.boardConfig)?.name} — ${fmtPrice(BOARD_CONFIGS.find(b => b.id === config.boardConfig)?.basePrice)}`);
  if (config.boardLed) lines.push(`✨ *LED* : +500 DA`);
  
  if (config.wilaya) {
    const w = WILAYAS.find(w => w.name === config.wilaya);
    const cost = config.deliveryType === "stopDesk" ? w?.stopDesk : w?.home;
    lines.push("");
    lines.push("🚚 *Livraison* :");
    lines.push(`   📍 ${config.wilaya} · ${config.deliveryType === "stopDesk" ? "Stop Desk 🏪" : "Domicile 🏠"} — ${fmtPrice(cost || 0)}`);
  }
  
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━");
  lines.push(`💰 *Total : ${fmtPrice(totalPrice)}*`);
  lines.push("💳 Paiement à la livraison");
  lines.push("");
  lines.push("👤 *Client* :");
  if (config.name) lines.push(`   Nom : ${config.name}`);
  if (config.phone) lines.push(`   Tél : ${config.phone}`);
  if (config.address) lines.push(`   Adresse : ${config.address}`);
  if (config.notes) lines.push(`   Notes : ${config.notes}`);
  
  return lines.join("\n");
};

// ─── BASKET VIEW ─────────────────────────────────────────────────────────────
function BasketView({ basket, onRemoveItem, onContinueShopping, onCheckout, onWhatsAppBasket }) {
  const total = basket.reduce((s, i) => s + i.price, 0);
  return (
    <div style={{background:"var(--cream)", minHeight:"100vh"}}>
      <div style={{padding:"20px"}}>
        <h2 style={{fontFamily:"var(--font-script)",fontSize:"2rem",color:"var(--rose-deep)",textAlign:"center"}}>Mon Panier 🛒</h2>
        {basket.length === 0 ? <p style={{textAlign:"center"}}>Votre panier est vide</p> : (
          basket.map((item, i) => (
            <div key={i} className="basket-view-item">
              <div className="basket-view-item-header"><span className="basket-view-label">{item.label}</span><span className="basket-view-price">{fmtPrice(item.price)}</span></div>
              <button className="basket-remove-btn" onClick={() => onRemoveItem(i)}>🗑️ Supprimer</button>
            </div>
          ))
        )}
        {basket.length > 0 && <div className="basket-view-total"><span>Total</span><span>{fmtPrice(total)}</span></div>}
      </div>
      <div className="bottom-bar" style={{flexDirection:"column",gap:8}}>
        <button className="back-btn" onClick={onContinueShopping}>← Continuer</button>
        {basket.length > 0 && <button className="next-btn" onClick={onCheckout}>Ajouter un article →</button>}
        {basket.length > 0 && <button className="whatsapp-btn" onClick={onWhatsAppBasket}>📲 Commander le panier</button>}
      </div>
    </div>
  );
}

// ─── APP PRINCIPALE ──────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(1);
  const [productType, setProductType] = useState(null);
  const [config, setConfig] = useState({});
  const [ordered, setOrdered] = useState(false);
  const [basket, setBasket] = useState([]);
  const [viewBasket, setViewBasket] = useState(false);
  const [savedCustomer, setSavedCustomer] = useState(null);
  const topRef = useRef(null);
  
  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth" }); }, [step]);
  useEffect(() => {
    if (step === 3 && savedCustomer) {
      setConfig(c => ({ ...c, name: c.name || savedCustomer.name, phone: c.phone || savedCustomer.phone,
        address: c.address || savedCustomer.address, notes: c.notes || savedCustomer.notes,
        wilaya: c.wilaya || savedCustomer.wilaya, deliveryType: c.deliveryType || savedCustomer.deliveryType }));
    }
  }, [step]);
  
  const totalPrice = calcPrice(config, productType);
  const deliveryCost = calcDelivery(config);
  const basketTotal = basket.reduce((s, i) => s + i.price, 0);
  const grandTotal = basketTotal + totalPrice + deliveryCost;
  
  const canNext = () => {
    if (step === 1) return !!productType;
    if (step === 2) {
      if (productType === "lamp") return !!config.lampModel;
      if (productType === "board") return !!config.boardConfig;
      if (productType === "pot") {
        const hasFlowers = Object.values(config.flowerSelections || {}).some(arr => arr.length > 0);
        const hasHearts = (config.heartSelections || []).length > 0;
        return hasFlowers || hasHearts;
      }
      return Object.values(config.flowerSelections || {}).some(arr => arr.length > 0);
    }
    if (step === 3) {
      const phone = (config.phone || "").replace(/\s/g, "");
      const nameValid = (config.name || "").trim().length > 0 && /^[a-zA-ZÀ-ÿ\s]+$/.test(config.name || "");
      const addressValid = (config.address || "").trim().length > 0 && /[a-zA-ZÀ-ÿ]/.test(config.address || "");
      return nameValid && /^0[5-7]\d{8}$/.test(phone) && addressValid && config.wilaya && config.deliveryType;
    }
    return true;
  };
  
  const saveCustomerInfo = (cfg) => {
    if (cfg.name?.trim() && cfg.phone?.trim() && cfg.address?.trim()) {
      setSavedCustomer({ name: cfg.name, phone: cfg.phone, address: cfg.address, notes: cfg.notes || "", wilaya: cfg.wilaya || "", deliveryType: cfg.deliveryType || "" });
    }
  };
  
  const addToBasket = () => {
    saveCustomerInfo(config);
    setBasket(b => [...b, { productType, label: productType === "bouquet" ? "Bouquet 💐" : productType === "box" ? "Flower Box 🎁" : productType === "lamp" ? "Lampe 🪔" : productType === "board" ? "Spring Board 🌸" : productType === "pot" ? "Pot 🪴" : "Porte-clé 🗝️", config: JSON.parse(JSON.stringify(config)), price: totalPrice }]);
    setProductType(null);
    setConfig({});
    setStep(1);
  };
  
  const removeFromBasket = (index) => setBasket(b => b.filter((_, i) => i !== index));
  
  const buildBasketWA = () => {
    const all = [...basket, { productType, config, price: totalPrice }];
    const lastConfig = config;
    const w = WILAYAS.find(wl => wl.name === lastConfig.wilaya);
    const delivery = w ? (lastConfig.deliveryType === "stopDesk" ? w.stopDesk : w.home) : 0;
    const productsSum = all.reduce((s, i) => s + i.price, 0);
    let lines = ["🌸 *JardinElle - Commande complète*", "━━━━━━━━━━━━━━━━━━━━━", `📦 *${all.length} article${all.length>1?"s":""}*`, ""];
    all.forEach((item, i) => {
      lines.push(`*— Article ${i+1} —*`);
      lines.push(buildWhatsAppMessage(item.productType, item.config, item.price));
      lines.push("");
    });
    if (lastConfig.wilaya) {
      const mode = lastConfig.deliveryType === "stopDesk" ? "Stop Desk 🏪" : "Domicile 🏠";
      lines.push("━━━━━━━━━━━━━━━━━━━━━");
      lines.push(`🚚 *Livraison* : ${lastConfig.wilaya} · ${mode} — ${fmtPrice(delivery)}`);
      lines.push("");
    }
    lines.push("━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`💰 *TOTAL GÉNÉRAL : ${fmtPrice(productsSum + delivery)}*`);
    lines.push("💳 Paiement à la livraison");
    lines.push("");
    lines.push("👤 *Client* :");
    if (lastConfig.name) lines.push(`   Nom : ${lastConfig.name}`);
    if (lastConfig.phone) lines.push(`   Tél : ${lastConfig.phone}`);
    if (lastConfig.address) lines.push(`   Adresse : ${lastConfig.address}`);
    if (lastConfig.notes) lines.push(`   Notes : ${lastConfig.notes}`);
    return lines.join("\n");
  };
  
  if (ordered) return <div style={{textAlign:"center",padding:"50px"}}><h2>✨ Commande envoyée ! ✨</h2><button onClick={() => window.location.reload()}>Nouvelle commande</button></div>;
  if (viewBasket) return <BasketView basket={basket} onRemoveItem={removeFromBasket} onContinueShopping={() => setViewBasket(false)} onCheckout={() => { setViewBasket(false); if (!productType) setStep(1); }} onWhatsAppBasket={() => { const msg = buildBasketWA(); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank"); setOrdered(true); }} />;
  if (!productType) return <Step1_ProductType onSelect={(t) => { setProductType(t); setConfig(savedCustomer || {}); setStep(2); }} basket={basket} onViewBasket={() => setViewBasket(true)} />;
  
  return (
    <div className="app-shell">
      <header className="app-header">
        <button onClick={() => { setProductType(null); setStep(1); }} style={{background:"none",border:"none"}}><span className="logo">Jardin<em>Elle</em></span></button>
        {basket.length > 0 && <button onClick={() => setViewBasket(true)} className="basket-badge">🛒 {basket.length}</button>}
      </header>
      <div className="step-nav-bar"><div className="step-bar">{Array(4).fill().map((_,i) => <div key={i} className={`step-dot${i < step ? " done" : ""}${i === step-1 ? " active" : ""}`} />)}</div><span>Étape {step}/4</span></div>
      <main className="app-main">
        {step === 2 && <Step2_Customize productType={productType} config={config} setConfig={setConfig} />}
        {step === 3 && <Step3_Delivery config={config} setConfig={setConfig} savedCustomer={savedCustomer} />}
        {step === 4 && <Step4_Confirm productType={productType} config={config} totalPrice={totalPrice} deliveryCost={deliveryCost} grandTotal={grandTotal} basket={basket} onWhatsApp={() => { saveCustomerInfo(config); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBasketWA())}`, "_blank"); setOrdered(true); }} onAddToBasket={addToBasket} onBack={() => setStep(3)} />}
      </main>
      {step < 4 && (
        <div className="bottom-bar">
          <button className="back-btn" onClick={() => step === 1 ? setProductType(null) : setStep(s => s-1)}>← Retour</button>
          <div className="price-mini">{fmtPrice(step === 3 ? grandTotal : totalPrice)}</div>
          <button className="next-btn" onClick={() => setStep(s => Math.min(s+1,4))} disabled={!canNext()}>Suivant →</button>
        </div>
      )}
    </div>
  );
}

// ─── STYLES CSS ──────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Dancing+Script:wght@500;600&family=Jost:wght@300;400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --sage: #7a9e7e; --rose: #c9768e; --rose-deep: #a85570;
  --cream: #fdfaf5; --text: #2e221a; --text-mid: #6e5448;
  --border: #e8d8cc; --border-lt: #f0e4d8;
  --font-script: 'Dancing Script', cursive;
  --font-serif: 'Cormorant Garamond', serif;
  --font-body: 'Jost', sans-serif;
}

body { font-family: var(--font-body); background: var(--cream); color: var(--text); }
.app-shell { max-width: 480px; margin: 0 auto; min-height: 100vh; }

.app-header { display: flex; justify-content: space-between; padding: 12px 20px; background: rgba(253,250,245,.96); border-bottom: 1px solid var(--border-lt); position: sticky; top: 0; z-index: 100; }
.logo { font-family: var(--font-script); font-size: 1.6rem; color: var(--text); }
.logo em { color: var(--rose-deep); }
.basket-badge { background: var(--rose-pale); border: 1px solid var(--rose-lt); border-radius: 99px; padding: 3px 10px; font-size: .75rem; cursor: pointer; }

.step-nav-bar { display: flex; align-items: center; gap: 12px; padding: 9px 20px; background: #f8f3ea; }
.step-bar { display: flex; gap: 5px; flex: 1; }
.step-dot { flex: 1; height: 3px; border-radius: 99px; background: var(--border); }
.step-dot.done { background: var(--sage); }
.step-dot.active { background: linear-gradient(90deg, var(--rose), #9b8dbf); }

.bottom-bar { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 480px; display: flex; justify-content: space-between; padding: 12px 20px; background: rgba(253,250,245,.95); border-top: 1px solid var(--border-lt); backdrop-filter: blur(12px); z-index: 100; }
.back-btn, .next-btn { border-radius: 40px; padding: 10px 20px; cursor: pointer; font-family: var(--font-body); }
.back-btn { border: 1px solid var(--border); background: transparent; }
.next-btn { background: linear-gradient(135deg, var(--rose-deep), var(--rose)); color: white; border: none; font-weight: 600; }
.next-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.price-mini { font-family: var(--font-serif); font-size: 1.1rem; color: var(--rose-deep); }

.step-content { padding: 24px 20px; padding-bottom: 100px; }
.step-title { font-family: var(--font-serif); font-size: 1.7rem; margin-bottom: 20px; }
.step-title em { color: var(--rose-deep); font-style: italic; }

.field-label { display: block; font-weight: 600; font-size: .7rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-mid); margin: 20px 0 10px; }
.field-select, .field-input { width: 100%; border: 1.5px solid var(--border); border-radius: 14px; padding: 12px 16px; font-family: var(--font-body); background: white; }
.field-error { border-color: var(--rose-deep); }

.option-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.option-chip { border: 1.5px solid var(--border); border-radius: 40px; padding: 8px 16px; background: white; cursor: pointer; font-size: .8rem; }
.option-chip.selected { border-color: var(--rose-deep); background: var(--rose-pale); color: var(--rose-deep); font-weight: 600; }
.option-chip.disabled { opacity: 0.4; cursor: not-allowed; }

.color-row { display: flex; gap: 6px; flex-wrap: wrap; }
.color-dot { width: 24px; height: 24px; border-radius: 50%; cursor: pointer; transition: transform .15s; }
.color-dot.active { box-shadow: 0 0 0 2px var(--rose-deep), 0 0 0 4px white; transform: scale(1.15); }
.color-pill { display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--border); border-radius: 99px; padding: 4px 10px; background: white; cursor: pointer; }
.color-pill.active { border-color: var(--rose-deep); background: var(--rose-pale); }
.pill-swatch { width: 14px; height: 14px; border-radius: 50%; }

.qty-row { display: flex; align-items: center; gap: 8px; }
.qty-btn { width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--border); background: #f8f3ea; cursor: pointer; }
.qty-num { min-width: 24px; text-align: center; font-weight: 600; }

.multi-flower-card { background: white; border: 1px solid var(--border-lt); border-radius: 16px; padding: 14px; margin-bottom: 12px; }
.multi-flower-header { display: flex; gap: 12px; margin-bottom: 12px; }
.flower-emoji { font-size: 2rem; }
.flower-info { flex: 1; }
.flower-name { font-weight: 600; }
.flower-price { font-size: .75rem; color: var(--sage); }
.multi-flower-controls { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.color-selection, .quantity-selection { display: flex; align-items: center; gap: 8px; }
.selection-label { font-size: .7rem; color: var(--text-mid); }
.add-flower-btn { background: var(--sage); color: white; border: none; border-radius: 40px; padding: 6px 16px; cursor: pointer; }
.existing-badge { font-size: .7rem; color: var(--text-mid); margin-top: 8px; }

.selected-flower-item, .selected-heart-item { display: flex; align-items: center; gap: 8px; background: var(--cream); padding: 6px 12px; border-radius: 40px; margin: 6px 0; }
.flower-dot, .heart-dot { width: 10px; height: 10px; border-radius: 50%; }
.flower-name-sm { font-size: .8rem; }
.selected-qty-control { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.qty-btn-sm { width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--border); background: white; cursor: pointer; }
.qty-num-sm { min-width: 20px; text-align: center; font-size: .8rem; }
.remove-btn-sm { background: none; border: none; cursor: pointer; color: var(--rose-deep); }

.filler-row { display: flex; justify-content: space-between; align-items: center; background: white; border: 1px solid var(--border-lt); border-radius: 12px; padding: 10px 14px; margin-bottom: 8px; }

.summary-card { background: white; border-radius: 20px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0,0,0,.05); }
.summary-row.header { padding: 14px 20px; background: linear-gradient(135deg, var(--rose-pale), #f2eef8); font-weight: 600; }
.summary-section { padding: 12px 20px; border-bottom: 1px solid var(--border-lt); }
.summary-item { display: flex; justify-content: space-between; padding: 4px 0; }
.summary-divider { height: 1px; background: var(--border-lt); }
.summary-total { display: flex; justify-content: space-between; padding: 16px 20px; font-weight: 700; }
.total-val { font-size: 1.3rem; color: var(--rose-deep); }
.summary-note { text-align: center; font-size: .75rem; padding: 12px; }

.customer-card { background: #f8f3ea; border-radius: 16px; padding: 14px; margin-bottom: 16px; }
.whatsapp-btn { background: linear-gradient(135deg, #25D366, #1dab56); color: white; border: none; border-radius: 40px; padding: 14px; width: 100%; font-weight: 600; cursor: pointer; margin-bottom: 10px; }
.add-basket-btn { background: var(--sage); color: white; border: none; border-radius: 40px; padding: 12px; width: 100%; cursor: pointer; margin-bottom: 10px; }
.delivery-note { background: #fff8e8; border: 1px solid #e8d080; border-radius: 12px; padding: 10px; font-size: .8rem; margin-bottom: 16px; text-align: center; }

.product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 20px; }
.product-card { background: white; border: 1px solid var(--border); border-radius: 20px; padding: 20px; text-align: center; cursor: pointer; }
.product-icon { font-size: 2rem; }
.product-name { font-weight: 600; }
.hero-inner { text-align: center; padding: 30px 20px; }
.hero-logo { font-family: var(--font-script); font-size: 3rem; }
.hero-logo span { color: var(--rose-deep); }
.section-header { text-align: center; margin-bottom: 10px; }
.info-box { background: var(--sage-pale); border-radius: 12px; padding: 10px; text-align: center; font-size: .8rem; margin: 10px 0; }
.size-indicator { background: var(--rose-pale); border-radius: 12px; padding: 10px; margin-bottom: 20px; text-align: center; }
.basket-view-item { background: white; border-radius: 16px; padding: 14px; margin-bottom: 12px; }
.basket-view-item-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.basket-view-total { background: var(--rose-pale); border-radius: 16px; padding: 14px; display: flex; justify-content: space-between; font-weight: 700; }
.lamp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.lamp-card { background: white; border: 1px solid var(--border); border-radius: 16px; padding: 12px; text-align: center; cursor: pointer; }
.lamp-card.selected { border-color: var(--rose-deep); background: var(--rose-pale); }
.daisy-row { background: var(--cream); border-radius: 12px; padding: 10px; margin-bottom: 8px; }
`;

// Inject styles
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);
}
