import React, { useState, useEffect, useRef } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// ⚠️  Remplacez par votre numéro WhatsApp au format international (sans + ni espaces)
const WHATSAPP_NUMBER = "213671192119";

// ─── DATA ────────────────────────────────────────────────────────────────────

// Curated 12-color shared palette (for lamp, board, heart pickers)
const LAMP_COLORS = [
  { id: "rouge",     name: "Rouge",        hex: "#c0392b" },
  { id: "rose",      name: "Rose",         hex: "#f48fb1" },
  { id: "peche",     name: "Pêche",        hex: "#ffcba4" },
  { id: "violet",    name: "Violet",       hex: "#9b59b6" },
  { id: "lavande",   name: "Lavande",      hex: "#b39ddb" },
  { id: "bleu",      name: "Bleu",         hex: "#2196f3" },
  { id: "turquoise", name: "Turquoise",    hex: "#00bcd4" },
  { id: "vert",      name: "Vert",         hex: "#4caf50" },
  { id: "jaune",     name: "Jaune",        hex: "#f9ca24" },
  { id: "orange",    name: "Orange",       hex: "#e67e22" },
  { id: "blanc",     name: "Blanc",        hex: "#ffffff" },
  { id: "noir",      name: "Noir",         hex: "#212121" },
];

// Flowers — each with its own curated color palette (max 3 colors each)
const FLOWERS = [
  {
    id: "rose", name: "Rose", nameAr: "وردة", emoji: "🌹", price: 500,
    colors: [
      { name: "Rouge",       hex: "#c0392b" },
      { name: "Rose tendre", hex: "#f48fb1" },
      { name: "Blanc",       hex: "#ffffff" },
    ],
  },
  {
    id: "lily", name: "Lily", nameAr: "زنبق", emoji: "🌸", price: 450,
    colors: [
      { name: "Blanc pur",   hex: "#ffffff" },
      { name: "Rose doux",   hex: "#ffd6e0" },
      { name: "Pêche",       hex: "#ffcba4" },
    ],
  },
  {
    id: "tournesol", name: "Tourne Sol", nameAr: "عباد الشمس", emoji: "🌻", price: 450,
    colors: [
      { name: "Jaune vif",    hex: "#f9ca24" },
      { name: "Jaune orangé", hex: "#e8a020" },
      { name: "Jaune pâle",   hex: "#fff176" },
    ],
  },
  {
    id: "tulipe", name: "Tulipe", nameAr: "توليب", emoji: "🌷", price: 450,
    colors: [
      { name: "Rouge",   hex: "#c0392b" },
      { name: "Violet",  hex: "#9b59b6" },
      { name: "Jaune",   hex: "#f9ca24" },
    ],
  },
  {
    id: "lavender", name: "Lavande", nameAr: "لافندر", emoji: "🌿", price: 115,
    colors: [
      { name: "Mauve clair",   hex: "#d8b4e2" },
      { name: "Lavande",       hex: "#b39ddb" },
      { name: "Violet profond",hex: "#6a0572" },
    ],
  },
  {
    id: "daisy", name: "Daisy", nameAr: "أقحوان", emoji: "🌼", price: 80,
    colors: [
      { name: "Blanc",  hex: "#ffffff" },
      { name: "Jaune",  hex: "#f9ca24" },
    ],
  },
];

const KEYCHAINS = FLOWERS.filter(f => ["rose","lily","tournesol","tulipe"].includes(f.id));

// Fillers (for bouquet/box/pot)
const FILLERS = [
  { id: "led",        name: "LED",               nameAr: "إضاءة LED",    price: 500, emoji: "✨" },
  { id: "artificial", name: "Filler Artificiel", nameAr: "حشو اصطناعي", price: 35,  emoji: "🌿" },
  { id: "greenery",   name: "Filler Pipe Cleaner", nameAr: "فيلر بايب كلينر", price: 35,  emoji: "🌿" },

];

// Packaging
const EMBALLAGE_BOUQUET = [
  { id: "small",  name: "Emballage Small", nameAr: "تغليف صغير",  price: 350, maxFlowers: 4  },
  { id: "medium", name: "Emballage Moyen", nameAr: "تغليف متوسط", price: 450, maxFlowers: 7  },
  { id: "large",  name: "Emballage Grand", nameAr: "تغليف كبير",  price: 600, maxFlowers: 999},
  { id: "tule_perles", name: "Tule & Perles", nameAr: "تول ولؤلؤ", price: 900, maxFlowers: 999},
];

// Paper colors
const PAPER_COLORS = [
  { id: "kraft",        name: "Kraft",         hex: "#c9a96e" },
  { id: "white_gloss",  name: "White Gloss",   hex: "#f5f5f5" },
  { id: "black_gloss",  name: "Black Gloss",   hex: "#1a1a1a" },
  { id: "black_matt",   name: "Black Matt",    hex: "#2d2d2d" },
  { id: "pink_clair",   name: "Pink Clair",    hex: "#ffd6e0" },
  { id: "pink_white",   name: "Pink & White",  hex: "#ffe4ec" },
  { id: "jaune_banane", name: "Jaune Banane",  hex: "#fff176" },
  { id: "purple",       name: "Purple",        hex: "#ce93d8" },
  { id: "rouge",        name: "Rouge",         hex: "#ef9a9a" },
  { id: "transparent",  name: "Transparent",   hex: "#e8f4f8" },
  { id: "journal",      name: "Journal Paper", hex: "#f0e6d3" },
];

// Ribbon colors
const RIBBON_COLORS = [
  { id: "creamy",      name: "Crème",       hex: "#fffde7" },
  { id: "rouge",       name: "Rouge",       hex: "#e53935" },
  { id: "bordeaux",    name: "Bordeaux",    hex: "#880e4f" },
  { id: "blanc",       name: "Blanc",       hex: "#ffffff" },
  { id: "noir",        name: "Noir",        hex: "#212121" },
  { id: "pink_clair",  name: "Pink Clair",  hex: "#ffd6e0" },
  { id: "pink_fonce",  name: "Pink Foncé",  hex: "#f06292" },
  { id: "jaune_matt",  name: "Jaune Matt",  hex: "#fff176" },
  { id: "pink_matt",   name: "Pink Matt",   hex: "#f48fb1" },
  { id: "blanc_matt",  name: "Blanc Matt",  hex: "#fafafa" },
];

// Ribbon types — Ruban Perles now has +80 DA cost
const RIBBON_TYPES = [
  { id: "moyen",  name: "Ruban Normal", nameAr: "شريط عادي",  extraCost: 0  },
  { id: "perles", name: "Ruban Perles", nameAr: "شريط لؤلؤ",  extraCost: 80 },
];

// Lamp models
const LAMP_MODELS = [
  { id: "rapunzel",  name: "Rapunzel",   nameAr: "رابونزل",    price: 2800, emoji: "🌟" },
  { id: "tournesol", name: "Tourne Sol", nameAr: "عباد الشمس", price: 2800, emoji: "🌻" },
  { id: "lily",      name: "Lily",       nameAr: "زنبق",       price: 2800, emoji: "🌸" },
  { id: "rose",      name: "Rose",       nameAr: "وردة",       price: 2800, emoji: "🌹" },
];

// Board configs — renamed as requested
const BOARD_CONFIGS = [
  { id: "small", name: "Small Board",  nameAr: "لوحة صغيرة",  basePrice: 800,  numDaisies: 6,  desc: "6 marguerites · 6 couleurs" },
  { id: "moyen", name: "Moyen Board",  nameAr: "لوحة متوسطة", basePrice: 1500, numDaisies: 12, desc: "12 marguerites · 12 couleurs" },
];

// Heart colors for Pot section
const HEART_COLORS = [
  { id: "rouge",       name: "Rouge",       hex: "#c0392b" },
  { id: "rose",        name: "Rose",        hex: "#f48fb1" },
  { id: "violet",      name: "Violet",      hex: "#9b59b6" },
  { id: "bleu",        name: "Bleu",        hex: "#2196f3" },
  { id: "blanc",       name: "Blanc",       hex: "#ffffff" },
  { id: "noir",        name: "Noir",        hex: "#212121" },
  { id: "jaune",       name: "Jaune",       hex: "#f9ca24" },
  { id: "vert",        name: "Vert",        hex: "#4caf50" },
  { id: "peche",       name: "Pêche",       hex: "#ffcba4" },
  { id: "bordeaux",    name: "Bordeaux",    hex: "#7d1128" },
];

// Wilayas — updated from ZR Express PDF
const WILAYAS = [
  { name: "Adrar",             stopDesk: 1070, home: 1450 },
  { name: "Ain Defla",         stopDesk: 570,  home: 900  },
  { name: "Ain Temouchent",    stopDesk: 570,  home: 900  },
  { name: "Alger",             stopDesk: 520,  home: 600  },
  { name: "Annaba",            stopDesk: 570,  home: 900  },
  { name: "Batna",             stopDesk: 570,  home: 900  },
  { name: "Béjaïa",            stopDesk: 570,  home: 900  },
  { name: "Béni Abbès",        stopDesk: 1070, home: 1400 },
  { name: "Biskra",            stopDesk: 670,  home: 950  },
  { name: "Béchar",            stopDesk: 770,  home: 1200 },
  { name: "Blida",             stopDesk: 520,  home: 700  },
  { name: "Bordj Bou Arréridj",stopDesk: 570,  home: 850  },
  { name: "Bouira",            stopDesk: 570,  home: 750  },
  { name: "Boumerdès",         stopDesk: 400,  home: 500  },
  { name: "Constantine",       stopDesk: 570,  home: 850  },
  { name: "Djelfa",            stopDesk: 670,  home: 950  },
  { name: "El Bayadh",         stopDesk: 670,  home: 1100 },
  { name: "El Menia",          stopDesk: 670,  home: 1100 },
  { name: "El Oued",           stopDesk: 670,  home: 1000 },
  { name: "El Tarf",           stopDesk: 570,  home: 900  },
  { name: "Ghardaïa",          stopDesk: 670,  home: 950  },
  { name: "Guelma",            stopDesk: 570,  home: 850  },
  { name: "In Guezzam",        stopDesk: 0,    home: 1650 },
  { name: "In Salah",          stopDesk: 1270, home: 1650 },
  { name: "Jijel",             stopDesk: 570,  home: 900  },
  { name: "Khenchela",         stopDesk: 570,  home: 900  },
  { name: "Laghouat",          stopDesk: 670,  home: 950  },
  { name: "Mascara",           stopDesk: 570,  home: 900  },
  { name: "Médéa",             stopDesk: 570,  home: 850  },
  { name: "Mila",              stopDesk: 570,  home: 900  },
  { name: "Mostaganem",        stopDesk: 570,  home: 900  },
  { name: "M'Sila",            stopDesk: 570,  home: 900  },
  { name: "Naâma",             stopDesk: 670,  home: 1200 },
  { name: "Oran",              stopDesk: 570,  home: 850  },
  { name: "Ouargla",           stopDesk: 670,  home: 1000 },
  { name: "Ouled Djellal",     stopDesk: 670,  home: 950  },
  { name: "Oum El Bouaghi",    stopDesk: 570,  home: 800  },
  { name: "Relizane",          stopDesk: 570,  home: 900  },
  { name: "Saïda",             stopDesk: 620,  home: 900  },
  { name: "Sétif",             stopDesk: 570,  home: 850  },
  { name: "Sidi Bel Abbès",    stopDesk: 570,  home: 900  },
  { name: "Skikda",            stopDesk: 570,  home: 900  },
  { name: "Souk Ahras",        stopDesk: 570,  home: 900  },
  { name: "Tamanrasset",       stopDesk: 1270, home: 1650 },
  { name: "Tébessa",           stopDesk: 570,  home: 950  },
  { name: "Tiaret",            stopDesk: 520,  home: 850  },
  { name: "Timimoun",          stopDesk: 1070, home: 1450 },
  { name: "Tipaza",            stopDesk: 570,  home: 800  },
  { name: "Tissemsilt",        stopDesk: 520,  home: 900  },
  { name: "Tizi Ouzou",        stopDesk: 570,  home: 750  },
  { name: "Tlemcen",           stopDesk: 570,  home: 900  },
  { name: "Touggourt",         stopDesk: 670,  home: 950  },
].sort((a, b) => a.name.localeCompare(b.name, "fr"));

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const sizeLabel = (n) => {
  if (n === 0) return "";
  if (n < 4)  return "Small";
  if (n <= 7) return "Medium";
  return "Large";
};

const fmtPrice = (n) => `${n.toLocaleString()} DA`;

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function FlowerCard({ flower, qty, color, onAdd, onRemove, onColorChange }) {
  const activeHex = color || flower.colors[0].hex;
  const isLight = (h) => ["#ffffff","#fff176","#ffd6e0","#ffcba4","#d8b4e2","#fff8e1","#fafafa"].includes(h);
  return (
    <div className={`flower-card${qty > 0 ? " selected" : ""}`}>
      <div className="flower-emoji">{flower.emoji}</div>
      <div className="flower-info">
        <span className="flower-name">{flower.name}</span>
        <span className="flower-ar">{flower.nameAr}</span>
        <span className="flower-price">{fmtPrice(flower.price)} / pcs</span>
        {qty > 0 && (
          <span className="flower-color-name" style={{ color: isLight(activeHex) ? "#888" : activeHex }}>
            ● {flower.colors.find(c => c.hex === activeHex)?.name}
          </span>
        )}
      </div>
      <div className="flower-controls">
        <div className="color-row">
          {flower.colors.map((c) => (
            <button key={c.hex}
              className={`color-dot${activeHex === c.hex ? " active" : ""}`}
              style={{ background: c.hex, border: isLight(c.hex) ? "1px solid #ccc" : "none" }}
              onClick={() => onColorChange(flower.id, c.hex)}
              title={c.name}
            />
          ))}
        </div>
        <div className="qty-row">
          <button className="qty-btn" onClick={() => onRemove(flower.id)} disabled={qty === 0}>−</button>
          <span className="qty-num">{qty}</span>
          <button className="qty-btn" onClick={() => onAdd(flower.id)}>+</button>
        </div>
      </div>
    </div>
  );
}

function StepBar({ step, total }) {
  return (
    <div className="step-bar">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`step-dot${i < step ? " done" : ""}${i === step - 1 ? " active" : ""}`} />
      ))}
    </div>
  );
}

function PriceTag({ price }) {
  return (
    <div className="price-tag">
      <span className="price-label">Total</span>
      <span className="price-value">{fmtPrice(price)}</span>
    </div>
  );
}

function ColorPicker({ label, colors, selected, onSelect }) {
  return (
    <>
      <label className="field-label">{label}</label>
      <div className="color-picker-row">
        {colors.map((c) => (
          <button
            key={c.id}
            className={`color-pill${selected === c.id ? " active" : ""}`}
            onClick={() => onSelect(c.id)}
            title={c.name}
          >
            <span className="pill-swatch" style={{ background: c.hex, border: (c.hex === "#ffffff" || c.hex === "#fafafa" || c.hex === "#fffde7" || c.hex === "#f5f5f5") ? "1px solid #ddd" : "none" }} />
            <span className="pill-name">{c.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// Multi-color picker — pick up to `maxPicks` colors (or unlimited if 0)
function MultiColorPicker({ label, colors, selected = [], onToggle, maxPicks = 0, note }) {
  return (
    <>
      <label className="field-label">{label} {note && <small style={{color:"#9c7f6e", textTransform:"none", letterSpacing:0}}>({note})</small>}</label>
      <div className="color-picker-row">
        {colors.map((c) => {
          const isActive = selected.includes(c.id);
          const disabled = !isActive && maxPicks > 0 && selected.length >= maxPicks;
          return (
            <button
              key={c.id}
              className={`color-pill${isActive ? " active" : ""}${disabled ? " disabled" : ""}`}
              onClick={() => !disabled && onToggle(c.id)}
              title={c.name}
            >
              <span className="pill-swatch" style={{ background: c.hex, border: (c.hex === "#ffffff" || c.hex === "#fafafa" || c.hex === "#fffde7") ? "1px solid #ddd" : "none" }} />
              <span className="pill-name">{c.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

// ─── WATERCOLOR FLORAL SVG ───────────────────────────────────────────────────

function FloralTop() {
  return (
    <svg className="floral-top" viewBox="0 0 480 140" xmlns="http://www.w3.org/2000/svg" style={{display:"block",width:"100%",marginBottom:"-2px"}}>
      {/* Sky wash background */}
      <defs>
        <radialGradient id="wash1" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#f2c4cf" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#fdfaf6" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="480" height="140" fill="url(#wash1)"/>

      {/* ── Stems & leaves ── */}
      <path d="M60 5 Q55 40 50 80" stroke="#8fa88a" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M70 0 Q80 35 75 75" stroke="#8fa88a" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <path d="M200 0 Q195 30 190 60" stroke="#8fa88a" strokeWidth="1.3" fill="none" opacity="0.5"/>
      <path d="M215 5 Q220 35 210 65" stroke="#8fa88a" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M390 0 Q395 30 400 70" stroke="#8fa88a" strokeWidth="1.4" fill="none" opacity="0.5"/>
      <path d="M410 5 Q405 30 415 60" stroke="#8fa88a" strokeWidth="1.1" fill="none" opacity="0.4"/>
      {/* hanging stems */}
      <path d="M240 0 Q238 25 242 55" stroke="#a99abf" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M255 0 Q258 20 252 50" stroke="#a99abf" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M130 0 Q128 30 132 65" stroke="#8fb5cc" strokeWidth="1.1" fill="none" opacity="0.45"/>
      <path d="M340 0 Q342 28 338 60" stroke="#8fb5cc" strokeWidth="1.3" fill="none" opacity="0.45"/>

      {/* ── Leaves ── */}
      <ellipse cx="58" cy="45" rx="8" ry="4" fill="#c8d8c4" opacity="0.6" transform="rotate(-30 58 45)"/>
      <ellipse cx="72" cy="38" rx="7" ry="3.5" fill="#8fa88a" opacity="0.45" transform="rotate(20 72 38)"/>
      <ellipse cx="194" cy="38" rx="9" ry="4" fill="#c8d8c4" opacity="0.55" transform="rotate(-25 194 38)"/>
      <ellipse cx="212" cy="42" rx="7" ry="3" fill="#8fa88a" opacity="0.4" transform="rotate(15 212 42)"/>
      <ellipse cx="396" cy="40" rx="8" ry="3.5" fill="#c8d8c4" opacity="0.55" transform="rotate(-20 396 40)"/>
      <ellipse cx="412" cy="35" rx="6" ry="3" fill="#8fa88a" opacity="0.4" transform="rotate(25 412 35)"/>
      <ellipse cx="135" cy="40" rx="6" ry="3" fill="#c8d8c4" opacity="0.5" transform="rotate(-15 135 40)"/>
      <ellipse cx="340" cy="36" rx="7" ry="3.5" fill="#c8d8c4" opacity="0.5" transform="rotate(-20 340 36)"/>

      {/* ── Pink roses / poppies ── */}
      {/* Large rose center-left */}
      <circle cx="64" cy="78" r="10" fill="#f2c4cf" opacity="0.55"/>
      <circle cx="64" cy="78" r="6" fill="#d4849a" opacity="0.6"/>
      <circle cx="64" cy="78" r="3" fill="#a85070" opacity="0.5"/>
      <circle cx="61" cy="75" r="7" fill="#f2c4cf" opacity="0.3"/>

      {/* Small pink top-right cluster */}
      <circle cx="395" cy="68" r="8" fill="#f2c4cf" opacity="0.5"/>
      <circle cx="395" cy="68" r="5" fill="#d4849a" opacity="0.55"/>
      <circle cx="392" cy="65" r="6" fill="#f2c4cf" opacity="0.28"/>

      {/* ── Blue / lavender wisteria clusters ── */}
      <circle cx="243" cy="48" r="4.5" fill="#b39ddb" opacity="0.55"/>
      <circle cx="250" cy="54" r="4" fill="#a99abf" opacity="0.5"/>
      <circle cx="238" cy="56" r="3.5" fill="#c8bcdb" opacity="0.5"/>
      <circle cx="245" cy="62" r="3.5" fill="#b39ddb" opacity="0.45"/>
      <circle cx="253" cy="44" r="3" fill="#a99abf" opacity="0.4"/>

      {/* Sky blue clusters */}
      <circle cx="132" cy="60" r="5" fill="#8fb5cc" opacity="0.5"/>
      <circle cx="125" cy="65" r="4" fill="#b3d5e8" opacity="0.45"/>
      <circle cx="138" cy="68" r="4.5" fill="#8fb5cc" opacity="0.45"/>

      <circle cx="342" cy="58" r="5" fill="#8fb5cc" opacity="0.5"/>
      <circle cx="335" cy="64" r="4" fill="#b3d5e8" opacity="0.45"/>
      <circle cx="348" cy="66" r="4" fill="#8fb5cc" opacity="0.4"/>

      {/* ── Yellow scattered flowers ── */}
      {[20,440,170,305].map((x,i) => (
        <g key={i} transform={`translate(${x},${[25,20,15,18][i]})`} opacity="0.55">
          {[0,60,120,180,240,300].map(a => (
            <ellipse key={a} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6}
              rx="3.5" ry="2" fill="#f9ca24" opacity="0.7"
              transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*6} ${Math.sin(a*Math.PI/180)*6})`}/>
          ))}
          <circle cx="0" cy="0" r="2.5" fill="#e8a020" opacity="0.8"/>
        </g>
      ))}

      {/* ── Small red/orange poppies bottom edge ── */}
      <circle cx="30" cy="118" r="7" fill="#e88070" opacity="0.55"/>
      <circle cx="30" cy="118" r="4" fill="#c04030" opacity="0.5"/>
      <circle cx="450" cy="115" r="6" fill="#e88070" opacity="0.5"/>
      <circle cx="450" cy="115" r="3.5" fill="#c04030" opacity="0.45"/>

      {/* ── Dragonfly ── */}
      <g transform="translate(268,32)" opacity="0.72">
        <ellipse cx="0" cy="0" rx="14" ry="5" fill="#80deea" opacity="0.55" transform="rotate(-10)"/>
        <ellipse cx="0" cy="0" rx="12" ry="4" fill="#80deea" opacity="0.4" transform="rotate(20)"/>
        <ellipse cx="0" cy="4" rx="8" ry="3.5" fill="#80deea" opacity="0.4" transform="rotate(-5)"/>
        <ellipse cx="0" cy="4" rx="7" ry="3" fill="#80deea" opacity="0.35" transform="rotate(15)"/>
        <line x1="-10" y1="4" x2="10" y2="4" stroke="#4e8fa8" strokeWidth="1.5"/>
        <circle cx="11" cy="4" r="2" fill="#2d6a80" opacity="0.6"/>
      </g>

      {/* ── Butterfly top-left ── */}
      <g transform="translate(165,22)" opacity="0.65">
        <ellipse cx="-6" cy="0" rx="8" ry="5" fill="#f2c4cf" opacity="0.7" transform="rotate(-20 -6 0)"/>
        <ellipse cx="6" cy="0" rx="8" ry="5" fill="#f2c4cf" opacity="0.7" transform="rotate(20 6 0)"/>
        <ellipse cx="-5" cy="4" rx="5" ry="3" fill="#d4849a" opacity="0.5" transform="rotate(-15 -5 4)"/>
        <ellipse cx="5" cy="4" rx="5" ry="3" fill="#d4849a" opacity="0.5" transform="rotate(15 5 4)"/>
        <line x1="0" y1="-6" x2="0" y2="8" stroke="#7a5068" strokeWidth="1.2"/>
        <line x1="-2" y1="-7" x2="-5" y2="-12" stroke="#7a5068" strokeWidth="0.8"/>
        <line x1="2" y1="-7" x2="5" y2="-12" stroke="#7a5068" strokeWidth="0.8"/>
      </g>

      {/* Ground greenery row */}
      <path d="M0 130 Q40 118 80 125 Q120 132 160 122 Q200 112 240 120 Q280 128 320 118 Q360 108 400 120 Q440 132 480 122 L480 140 L0 140 Z" fill="#eef4ec" opacity="0.8"/>
      <path d="M0 135 Q60 125 120 132 Q180 138 240 128 Q300 118 360 128 Q420 138 480 130 L480 140 L0 140 Z" fill="#c8d8c4" opacity="0.5"/>
    </svg>
  );
}

function FloralBottom() {
  return (
    <svg viewBox="0 0 480 130" xmlns="http://www.w3.org/2000/svg" style={{display:"block",width:"100%",marginTop:"-2px"}}>
      {/* Ground strip */}
      <path d="M0 10 Q60 0 120 8 Q180 16 240 5 Q300 -5 360 6 Q420 17 480 8 L480 130 L0 130 Z" fill="#eef4ec" opacity="0.7"/>
      <path d="M0 18 Q80 8 160 16 Q240 24 320 12 Q400 0 480 14 L480 130 L0 130 Z" fill="#c8d8c4" opacity="0.35"/>

      {/* Stems */}
      <path d="M50 18 Q48 50 52 85" stroke="#8fa88a" strokeWidth="1.4" fill="none" opacity="0.6"/>
      <path d="M100 10 Q104 45 98 80" stroke="#8fa88a" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M200 8 Q198 40 204 78" stroke="#a99abf" strokeWidth="1.3" fill="none" opacity="0.55"/>
      <path d="M280 6 Q284 38 278 75" stroke="#8fb5cc" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M380 12 Q376 44 382 80" stroke="#8fa88a" strokeWidth="1.4" fill="none" opacity="0.6"/>
      <path d="M430 8 Q434 40 428 78" stroke="#8fa88a" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M155 10 Q158 42 153 72" stroke="#d4849a" strokeWidth="1.1" fill="none" opacity="0.45"/>
      <path d="M330 5 Q326 35 332 70" stroke="#d4849a" strokeWidth="1.1" fill="none" opacity="0.45"/>

      {/* Leaves */}
      <ellipse cx="47" cy="50" rx="8" ry="3.5" fill="#c8d8c4" opacity="0.6" transform="rotate(-30 47 50)"/>
      <ellipse cx="105" cy="44" rx="7" ry="3" fill="#8fa88a" opacity="0.5" transform="rotate(20 105 44)"/>
      <ellipse cx="202" cy="46" rx="8" ry="3.5" fill="#c8d8c4" opacity="0.55" transform="rotate(-25 202 46)"/>
      <ellipse cx="282" cy="42" rx="7" ry="3" fill="#8fa88a" opacity="0.45" transform="rotate(18 282 42)"/>
      <ellipse cx="378" cy="48" rx="8" ry="3.5" fill="#c8d8c4" opacity="0.6" transform="rotate(-22 378 48)"/>
      <ellipse cx="432" cy="44" rx="7" ry="3" fill="#8fa88a" opacity="0.5" transform="rotate(20 432 44)"/>

      {/* Cornflowers / blue wildflowers */}
      {[85,175,310,395].map((x,i) => (
        <g key={i} transform={`translate(${x},${[75,70,72,78][i]})`} opacity="0.6">
          {[0,45,90,135,180,225,270,315].map(a => (
            <ellipse key={a} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7}
              rx="3.5" ry="2" fill={i%2===0?"#8fb5cc":"#a99abf"} opacity="0.75"
              transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*7} ${Math.sin(a*Math.PI/180)*7})`}/>
          ))}
          <circle cx="0" cy="0" r="2.5" fill={i%2===0?"#4a7a9b":"#7058a0"} opacity="0.7"/>
        </g>
      ))}

      {/* Purple globe thistles */}
      <circle cx="205" cy="72" r="9" fill="#c8bcdb" opacity="0.55"/>
      <circle cx="205" cy="72" r="6" fill="#a99abf" opacity="0.6"/>
      <circle cx="332" cy="68" r="8" fill="#c8bcdb" opacity="0.5"/>
      <circle cx="332" cy="68" r="5" fill="#a99abf" opacity="0.55"/>

      {/* Red poppies */}
      <circle cx="52" cy="82" r="9" fill="#e88070" opacity="0.6"/>
      <circle cx="52" cy="82" r="5.5" fill="#c04030" opacity="0.55"/>
      <circle cx="52" cy="82" r="2.5" fill="#1a1a1a" opacity="0.4"/>
      <circle cx="385" cy="78" r="9" fill="#e88070" opacity="0.6"/>
      <circle cx="385" cy="78" r="5.5" fill="#c04030" opacity="0.55"/>
      <circle cx="385" cy="78" r="2.5" fill="#1a1a1a" opacity="0.35"/>

      {/* Pink cosmos */}
      {[158,262].map((x,i) => (
        <g key={i} transform={`translate(${x},${[68,65][i]})`} opacity="0.6">
          {[0,40,80,120,160,200,240,280,320].map(a => (
            <ellipse key={a} cx={Math.cos(a*Math.PI/180)*8} cy={Math.sin(a*Math.PI/180)*8}
              rx="4" ry="2.2" fill="#f2c4cf" opacity="0.75"
              transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*8} ${Math.sin(a*Math.PI/180)*8})`}/>
          ))}
          <circle cx="0" cy="0" r="3" fill="#f9ca24" opacity="0.8"/>
        </g>
      ))}

      {/* Yellow wildflowers */}
      {[430,15].map((x,i) => (
        <g key={i} transform={`translate(${x},${[75,80][i]})`} opacity="0.55">
          {[0,60,120,180,240,300].map(a => (
            <ellipse key={a} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6}
              rx="3.5" ry="2" fill="#f9ca24" opacity="0.7"
              transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*6} ${Math.sin(a*Math.PI/180)*6})`}/>
          ))}
          <circle cx="0" cy="0" r="2.5" fill="#e8a020" opacity="0.8"/>
        </g>
      ))}
    </svg>
  );
}

// ─── STEP 1 — PRODUCT SELECTION (boutique landing) ───────────────────────────

function Step1_ProductType({ onSelect, basket = [], onViewBasket }) {
  const products = [
    { id: "bouquet",  icon: "💐", name: "Bouquet",      nameAr: "باقة زهور",      desc: "Bouquet pipe-cleaner personnalisé"   },
    { id: "box",      icon: "🎁", name: "Flower Box",   nameAr: "صندوق زهور",     desc: "Compositions en box personnalisée"   },
    { id: "lamp",     icon: "🪔", name: "Lampe",        nameAr: "مصباح زهري",     desc: "Lampe déco florale personnalisée"    },
    { id: "board",    icon: "🌸", name: "Spring Board", nameAr: "لوحة ربيعية",   desc: "Tableau décoratif personnalisé"      },
    { id: "pot",      icon: "🪴", name: "Pot",          nameAr: "وعاء زهور",     desc: "Pot fleurs & cœurs personnalisé"     },
    { id: "keychain", icon: "🗝️", name: "Porte-clé",   nameAr: "حاملة مفاتيح", desc: "Fleurs miniatures personnalisées"    },
  ];

  return (
    <div style={{background:"var(--cream)", minHeight:"100vh"}}>
      <BasketBar basket={basket} onViewBasket={onViewBasket} />
      <FloralTop />

      <div className="hero-inner">
        <div className="hero-logo">Jardin<span>Elle</span></div>
        <div className="hero-slogan">L'art des fleurs qui ne fanent jamais</div>
        <div className="hero-tagline">✦ Handmade · Pipe-cleaner · Personnalisé ✦</div>
        <div className="hero-badges">
          <span className="hero-badge">💐 Bouquets</span>
          <span className="hero-badge sage">🌿 Naturel</span>
          <span className="hero-badge lav">✨ Artisanal</span>
        </div>
      </div>

      <div className="section-header">
        <div className="section-ornament">✦ ✿ ✦</div>
        <h2>Créez votre <em>création florale</em></h2>
        <p>Choisissez votre produit et personnalisez chaque détail</p>
      </div>

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

      <FloralBottom />
    </div>
  );
}

function Step2_Customize({ productType, config, setConfig }) {
  const totalFlowers = Object.values(config.flowers || {}).reduce((a, b) => a + b, 0);

  const handleFlowerAdd    = (id) => setConfig((c) => ({ ...c, flowers: { ...(c.flowers || {}), [id]: ((c.flowers || {})[id] || 0) + 1 } }));
  const handleFlowerRemove = (id) => setConfig((c) => { const f = { ...(c.flowers || {}) }; if ((f[id] || 0) > 0) f[id]--; return { ...c, flowers: f }; });
  const handleColorChange  = (id, hex) => setConfig((c) => ({ ...c, colors: { ...(c.colors || {}), [id]: hex } }));
  const setFillerQty = (id, delta) => setConfig((c) => {
    const qtys = { ...(c.fillerQtys || {}) };
    qtys[id] = Math.max(0, (qtys[id] || 0) + delta);
    return { ...c, fillerQtys: qtys };
  });

  // Auto-remove disallowed packaging when flower count changes
  useEffect(() => {
    if (productType !== "bouquet") return;
    setConfig((c) => {
      const total = Object.values(c.flowers || {}).reduce((a, b) => a + b, 0);
      let emb = c.emballage;
      if (total > 7 && (emb === "small" || emb === "medium")) emb = null;
      else if (total > 4 && emb === "small") emb = null;
      return emb !== c.emballage ? { ...c, emballage: emb } : c;
    });
  }, [totalFlowers, productType]);

  // ── LAMP ─────────────────────────────────────────────────────────────────
  if (productType === "lamp") {
    const toggleLampColor = (colorId) => {
      setConfig((c) => {
        const sel = c.lampColors || [];
        if (sel.includes(colorId)) return { ...c, lampColors: sel.filter(x => x !== colorId) };
        if (sel.length >= 2)       return { ...c, lampColors: [sel[1], colorId] }; // replace oldest
        return { ...c, lampColors: [...sel, colorId] };
      });
    };
    return (
      <div className="step-content">
        <h2 className="step-title">Votre <em>Lampe</em> 🪔</h2>
        <p className="step-sub">2 800 DA · 1 pack de piles offert 🎁</p>

        <label className="field-label">Modèle de lampe</label>
        <div className="lamp-grid">
          {LAMP_MODELS.map((m) => (
            <button key={m.id} className={`lamp-card${config.lampModel === m.id ? " selected" : ""}`}
              onClick={() => setConfig((c) => ({ ...c, lampModel: m.id }))}>
              <span className="lamp-emoji">{m.emoji}</span>
              <span className="lamp-name">{m.name}</span>
              <span className="lamp-ar">{m.nameAr}</span>
              <span className="lamp-price">{fmtPrice(m.price)}</span>
            </button>
          ))}
        </div>

        <MultiColorPicker
          label="🎨 Couleurs des fleurs (choisir 2)"
          colors={LAMP_COLORS}
          selected={config.lampColors || []}
          onToggle={toggleLampColor}
          maxPicks={2}
          note="2 couleurs incluses"
        />
        {(config.lampColors || []).length > 0 && (
          <div className="info-box">
            ✅ Couleurs choisies : {(config.lampColors || []).map(hex => {
              const c = LAMP_COLORS.find(fc => fc.hex === hex);
              return c?.name;
            }).filter(Boolean).join(" · ")}
          </div>
        )}

        <label className="field-label" style={{marginTop: 20}}>🔋 Piles supplémentaires <small>(optionnel · +100 DA / pack)</small></label>
        <div className="option-row">
          {[0, 1, 2, 3].map(n => (
            <button key={n}
              className={`option-chip${(config.extraBatteries || 0) === n ? " selected" : ""}`}
              onClick={() => setConfig(c => ({ ...c, extraBatteries: n }))}>
              {n === 0 ? "Aucune" : `+${n} pack${n > 1 ? "s" : ""}`}
              {n > 0 && <><br /><small className="chip-price">+{fmtPrice(n * 100)}</small></>}
            </button>
          ))}
        </div>
        <div className="info-box">🎁 1 pack de piles offert · Packs supp. : <strong>100 DA / pack</strong></div>
      </div>
    );
  }

  // ── BOARD ─────────────────────────────────────────────────────────────────
  if (productType === "board") {
    const selectedBoard = BOARD_CONFIGS.find(b => b.id === config.boardConfig);
    const numDaisies = selectedBoard?.numDaisies || 0;

    const toggleDaisyColor = (idx, colorId) => {
      setConfig((c) => {
        const arr = [...(c.daisyColors || Array(numDaisies).fill(null))];
        arr[idx] = colorId;
        return { ...c, daisyColors: arr };
      });
    };

    return (
      <div className="step-content">
        <h2 className="step-title">Votre <em>Spring Board</em> 🌸</h2>
        <p className="step-sub">Tableau décoratif floral pipe-cleaner</p>

        <label className="field-label">Type de board</label>
        <div className="option-row wrap">
          {BOARD_CONFIGS.map((b) => (
            <button key={b.id} className={`option-chip${config.boardConfig === b.id ? " selected" : ""}`}
              onClick={() => setConfig((c) => ({ ...c, boardConfig: b.id, daisyColors: Array(b.numDaisies).fill(null) }))}>
              🌸 {b.name}<br />
              <small>{b.nameAr}</small><br />
              <small className="chip-price">{fmtPrice(b.basePrice)}</small><br />
              <small style={{color:"#9c7f6e"}}>{b.desc}</small>
            </button>
          ))}
        </div>

        <label className="field-label" style={{marginTop:20}}>✨ LED <small>(optionnel · +500 DA)</small></label>
        <button className={`option-chip${config.boardLed ? " selected" : ""}`}
          onClick={() => setConfig(c => ({ ...c, boardLed: !c.boardLed }))}>
          ✨ Ajouter LED · <span className="chip-price">+500 DA</span>
        </button>

        {selectedBoard && (
          <>
            <label className="field-label">🎨 Couleur de chaque marguerite</label>
            <p style={{fontSize:".8rem", color:"#9c7f6e", marginBottom:12}}>
              {selectedBoard.numDaisies} marguerites → {selectedBoard.numDaisies} couleurs individuelles
            </p>
            <div style={{display:"flex", flexDirection:"column", gap:12}}>
              {Array.from({ length: selectedBoard.numDaisies }, (_, i) => {
                const selColor = (config.daisyColors || [])[i];
                return (
                  <div key={i} style={{background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, padding:"10px 14px"}}>
                    <div style={{fontWeight:600, fontSize:".82rem", marginBottom:6}}>
                      🌼 Marguerite {i + 1}
                      {selColor && <span style={{marginLeft:8, color: selColor === "#ffffff" ? "#aaa" : selColor}}>
                        ● {LAMP_COLORS.find(c => c.hex === selColor)?.name}
                      </span>}
                    </div>
                    <div className="color-row" style={{flexWrap:"wrap", maxWidth:"100%", justifyContent:"flex-start"}}>
                      {LAMP_COLORS.map(c => (
                        <button key={c.hex + c.name}
                          className={`color-dot${selColor === c.hex ? " active" : ""}`}
                          style={{background: c.hex, border: ["#ffffff","#fff176","#d8b4e2"].includes(c.hex) ? "1px solid #ccc" : "none"}}
                          onClick={() => toggleDaisyColor(i, c.hex)}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  // ── POT ───────────────────────────────────────────────────────────────────
  if (productType === "pot") {
    const setFillerQty2 = (id, delta) => setConfig((c) => {
      const qtys = { ...(c.fillerQtys || {}) };
      qtys[id] = Math.max(0, (qtys[id] || 0) + delta);
      return { ...c, fillerQtys: qtys };
    });
    const toggleHeartColor = (id) => setConfig((c) => { const s = new Set(c.heartColors || []); s.has(id) ? s.delete(id) : s.add(id); return { ...c, heartColors: [...s] }; });

    return (
      <div className="step-content">
        <h2 className="step-title">Votre <em>Pot</em> 🪴</h2>
        <p className="step-sub">Prix = fleurs/cœurs + fillers + emballage pot (500 DA)</p>

        <label className="field-label">Type de composition</label>
        <div className="option-row">
          {["Fleurs", "Cœurs", "Mixte"].map((t) => (
            <button key={t} className={`option-chip${config.potType === t ? " selected" : ""}`}
              onClick={() => setConfig((c) => ({ ...c, potType: t }))}>{t}</button>
          ))}
        </div>

        {(config.potType === "Cœurs" || config.potType === "Mixte") && (
          <>
            <label className="field-label">💗 Couleurs des cœurs</label>
            <div className="color-picker-row">
              {HEART_COLORS.map(c => (
                <button key={c.id}
                  className={`color-pill${(config.heartColors || []).includes(c.id) ? " active" : ""}`}
                  onClick={() => toggleHeartColor(c.id)}>
                  <span className="pill-swatch" style={{background: c.hex, border: c.hex === "#ffffff" ? "1px solid #ddd" : "none"}} />
                  <span className="pill-name">{c.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {(config.potType === "Fleurs" || config.potType === "Mixte" || !config.potType) && (
          <>
            <label className="field-label">Fleurs</label>
            <div className="flowers-grid">
              {FLOWERS.map((f) => (
                <FlowerCard key={f.id} flower={f}
                  qty={(config.flowers || {})[f.id] || 0}
                  color={(config.colors || {})[f.id] || f.colors[0].hex}
                  onAdd={handleFlowerAdd} onRemove={handleFlowerRemove} onColorChange={handleColorChange} />
              ))}
            </div>
          </>
        )}

        <label className="field-label">Fillers <small>(optionnel)</small></label>
        <div className="fillers-grid">
          {FILLERS.map((fl) => {
            const qty = (config.fillerQtys || {})[fl.id] || 0;
            return (
              <div key={fl.id} className={`filler-row${qty > 0 ? " active" : ""}`}>
                <span className="filler-name">{fl.name}</span>
                <span className="filler-price chip-price">+{fmtPrice(fl.price)}/u</span>
                <div className="qty-row">
                  <button className="qty-btn" onClick={() => setFillerQty2(fl.id, -1)} disabled={qty===0}>−</button>
                  <span className="qty-num">{qty}</span>
                  <button className="qty-btn" onClick={() => setFillerQty2(fl.id, 1)}>+</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="info-box">🪴 Emballage pot inclus — <strong>500 DA</strong></div>
      </div>
    );
  }

  // ── KEYCHAIN ──────────────────────────────────────────────────────────────
  if (productType === "keychain") {
    return (
      <div className="step-content">
        <h2 className="step-title">Votre <em>Porte-clé</em> 🗝️</h2>
        <p className="step-sub">Fleurs miniatures pipe-cleaner</p>
        <div className="flowers-grid">
          {KEYCHAINS.map((f) => (
            <FlowerCard key={f.id} flower={f}
              qty={(config.flowers || {})[f.id] || 0}
              color={(config.colors || {})[f.id] || f.colors[0].hex}
              onAdd={handleFlowerAdd} onRemove={handleFlowerRemove} onColorChange={handleColorChange} />
          ))}
        </div>
      </div>
    );
  }

  // ── BOUQUET / BOX ─────────────────────────────────────────────────────────
  const isBouquet = productType === "bouquet";

  // Determine which packaging options are available
  const availablePackaging = isBouquet
    ? EMBALLAGE_BOUQUET.filter(e => totalFlowers <= e.maxFlowers)
    : [];

  const selectedRibbonType = RIBBON_TYPES.find(r => r.id === config.ribbonType);

  return (
    <div className="step-content">
      <h2 className="step-title">{isBouquet ? "Votre " : "Votre "}<em>{isBouquet ? "Bouquet 💐" : "Flower Box 🎁"}</em></h2>
      <p className="step-sub">{isBouquet ? "Choisissez vos fleurs, fillers et emballage" : "Composition en box · emballage box 2 000 DA"}</p>

      <div className="size-indicator">
        <span className="size-badge large">
          {totalFlowers === 0 ? "Ajoutez des fleurs ↓" : `${sizeLabel(totalFlowers)} · ${totalFlowers} fleur${totalFlowers > 1 ? "s" : ""}`}
        </span>
        <div className="size-hints">
          <span>Small &lt; 4</span>
          <span>Medium 4–7</span>
          <span>Large &gt; 7</span>
        </div>
      </div>

      <label className="field-label">🌷 Fleurs</label>
      <div className="flowers-grid">
        {FLOWERS.map((f) => (
          <FlowerCard key={f.id} flower={f}
            qty={(config.flowers || {})[f.id] || 0}
            color={(config.colors || {})[f.id] || f.colors[0].hex}
            onAdd={handleFlowerAdd} onRemove={handleFlowerRemove} onColorChange={handleColorChange} />
        ))}
      </div>

      <label className="field-label">🌿 Fillers <small>(optionnel)</small></label>
      <div className="fillers-grid">
        {FILLERS.map((fl) => {
          const qty = (config.fillerQtys || {})[fl.id] || 0;
          return (
            <div key={fl.id} className={`filler-row${qty > 0 ? " active" : ""}`}>
              <span className="filler-name">{fl.name}</span>
              <span className="filler-price chip-price">+{fmtPrice(fl.price)}/u</span>
              <div className="qty-row">
                <button className="qty-btn" onClick={() => setFillerQty(fl.id, -1)} disabled={qty===0}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setFillerQty(fl.id, 1)}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      {isBouquet && (
        <>
          <label className="field-label">🎀 Emballage bouquet</label>
          {totalFlowers > 4 && totalFlowers <= 7 && (
            <p style={{fontSize:".78rem", color:"#e05c3a", marginBottom:8}}>⚠️ Small packaging indisponible pour +4 fleurs</p>
          )}
          {totalFlowers > 7 && (
            <p style={{fontSize:".78rem", color:"#e05c3a", marginBottom:8}}>⚠️ Small & Medium indisponibles pour +7 fleurs</p>
          )}
          <div className="option-row wrap">
            {availablePackaging.map((e) => (
              <button key={e.id} className={`option-chip${config.emballage === e.id ? " selected" : ""}`}
                onClick={() => setConfig((c) => ({ ...c, emballage: e.id }))}>
                {e.name}<br /><small>{e.nameAr}</small><br /><small className="chip-price">{fmtPrice(e.price)}</small>
              </button>
            ))}
          </div>
        </>
      )}

      {!isBouquet && (
        <div className="info-box">🎁 Emballage box inclus — <strong>2 000 DA</strong></div>
      )}



      <label className="field-label">🎀 Type de ruban</label>
      <div className="option-row wrap">
        {RIBBON_TYPES.map((r) => (
          <button key={r.id} className={`option-chip${config.ribbonType === r.id ? " selected" : ""}`}
            onClick={() => setConfig((c) => ({ ...c, ribbonType: r.id }))}>
            {r.name}<br /><small>{r.nameAr}</small>
            {r.extraCost > 0 && <><br /><small className="chip-price">+{fmtPrice(r.extraCost)}</small></>}
          </button>
        ))}
      </div>


      <label className="field-label">🪩 Perles décoratives <small>(optionnel — +350 DA)</small></label>
      <button className={`option-chip${config.perles ? " selected" : ""}`}
        onClick={() => setConfig((c) => ({ ...c, perles: !c.perles }))}>
        🪩 Ajouter des perles · <span className="chip-price">+{fmtPrice(350)}</span>
      </button>
    </div>
  );
}

function Step3_Delivery({ config, setConfig, savedCustomer }) {
  const [touched, setTouched] = useState({ name: false, phone: false, address: false });
  const phone = (config.phone || "").replace(/\s/g, "");
  const phoneValid = /^0[5-7]\d{8}$/.test(phone);
  const errors = {
    name:    !(config.name || "").trim(),
    phone:   !phone ? "required" : (!phoneValid ? "format" : null),
    address: !(config.address || "").trim(),
  };
  const mark = (k) => setTouched(t => ({ ...t, [k]: true }));

  return (
    <div className="step-content">
      <h2 className="step-title">Détails de <em>livraison</em> 🚚</h2>

      {savedCustomer && (
        <div className="saved-customer-banner">
          ✅ Coordonnées pré-remplies depuis votre commande précédente. Modifiez si nécessaire.
        </div>
      )}

      <label className="field-label">Wilaya</label>
      <select className="field-select" value={config.wilaya || ""}
        onChange={(e) => setConfig((c) => ({ ...c, wilaya: e.target.value }))}>
        <option value="">— Choisir une wilaya —</option>
        {WILAYAS.map((w) => <option key={w.name} value={w.name}>{w.name}</option>)}
      </select>

      {config.wilaya && (
        <>
          <label className="field-label">Mode de livraison</label>
          <div className="option-row">
            {[
              { key: "stopDesk", label: "🏪 Stop Desk" },
              { key: "home",     label: "🏠 Domicile"  },
            ].map(({ key, label }) => {
              const w = WILAYAS.find((w) => w.name === config.wilaya);
              const price = w ? (key === "stopDesk" ? w.stopDesk : w.home) : 0;
              const unavailable = price === 0;
              return (
                <button key={key}
                  className={`option-chip delivery-chip${config.deliveryType === key ? " selected" : ""}${unavailable ? " disabled" : ""}`}
                  disabled={unavailable}
                  onClick={() => !unavailable && setConfig((c) => ({ ...c, deliveryType: key }))}>
                  {label}
                  <br /><small className="chip-price">{unavailable ? "Indisponible" : fmtPrice(price)}</small>
                </button>
              );
            })}
          </div>
        </>
      )}

      <label className="field-label" style={{ marginTop: 24 }}>
        📋 Vos informations <span style={{color:"var(--rose-deep)",fontWeight:400,textTransform:"none",letterSpacing:0}}>* champs obligatoires</span>
      </label>

      <input className={`field-input${touched.name && errors.name ? " field-error" : ""}`}
        type="text" placeholder="Nom complet * / الاسم الكامل"
        value={config.name || ""} onBlur={() => mark("name")}
        onChange={(e) => setConfig((c) => ({ ...c, name: e.target.value }))} />
      {touched.name && errors.name && <p className="field-err-msg">⚠️ Le nom est obligatoire.</p>}

      <input className={`field-input${touched.phone && errors.phone ? " field-error" : ""}`}
        type="tel" placeholder="Téléphone * — 10 chiffres ex: 0660606060"
        value={config.phone || ""} maxLength={10} onBlur={() => mark("phone")}
        onChange={(e) => setConfig((c) => ({ ...c, phone: e.target.value.replace(/\D/g,"") }))} />
      {touched.phone && errors.phone === "required" && <p className="field-err-msg">⚠️ Le téléphone est obligatoire.</p>}
      {touched.phone && errors.phone === "format"   && <p className="field-err-msg">⚠️ Format invalide — 10 chiffres requis (ex: 0660606060).</p>}

      <input className={`field-input${touched.address && errors.address ? " field-error" : ""}`}
        type="text" placeholder="Adresse complète * / العنوان الكامل"
        value={config.address || ""} onBlur={() => mark("address")}
        onChange={(e) => setConfig((c) => ({ ...c, address: e.target.value }))} />
      {touched.address && errors.address && <p className="field-err-msg">⚠️ L\'adresse est obligatoire.</p>}

      <textarea className="field-input" rows={3} placeholder="📝 Notes sur la commande (optionnel)"
        value={config.notes || ""}
        onChange={(e) => setConfig((c) => ({ ...c, notes: e.target.value }))} />
    </div>
  );
}

function Step4_Confirm({ productType, config, totalPrice, basket = [], onWhatsApp, onAddToBasket, onBack }) {
  const w = WILAYAS.find((w) => w.name === config.wilaya);
  const deliveryCost = w ? (config.deliveryType === "stopDesk" ? w.stopDesk : w.home) : 0;
  const flowerList = Object.entries(config.flowers || {}).filter(([, q]) => q > 0);

  const productLabels = {
    bouquet:  "Bouquet 💐",
    box:      "Flower Box 🎁",
    lamp:     "Lampe 🪔",
    board:    "Spring Board 🌸",
    pot:      "Pot 🪴",
    keychain: "Porte-clé 🗝️",
  };

  const allFlowers = [...FLOWERS, ...KEYCHAINS.filter(k => !FLOWERS.find(f => f.id === k.id))];
  const lines = [];

  if (productType === "lamp") {
    const m = LAMP_MODELS.find(m => m.id === config.lampModel);
    if (m) lines.push({ label: `${m.emoji} Lampe ${m.name}`, price: m.price });
    (config.lampColors || []).forEach(hex => {
      const c = LAMP_COLORS.find(fc => fc.hex === hex);
      if (c) lines.push({ label: `🎨 Couleur · ${c.name}`, price: 0, dot: hex });
    });
    lines.push({ label: "🎁 Pack de piles offert", price: 0 });
    if ((config.extraBatteries || 0) > 0) {
      lines.push({ label: `🔋 Piles supplémentaires ×${config.extraBatteries}`, price: config.extraBatteries * 100 });
    }
  }

  if (productType === "board") {
    const bc = BOARD_CONFIGS.find(b => b.id === config.boardConfig);
    if (bc) {
      lines.push({ label: `🌸 ${bc.name}`, price: bc.basePrice });
      if (config.boardLed) lines.push({ label: "✨ LED", price: 500 });
      (config.daisyColors || []).forEach((hex, i) => {
        if (hex) {
          const c = LAMP_COLORS.find(fc => fc.hex === hex);
          lines.push({ label: `🌼 Marguerite ${i + 1} · ${c?.name || ""}`, price: 0, dot: hex });
        }
      });
    }
  }

  if (productType === "box") lines.push({ label: "🎁 Emballage Box Fleurs", price: 1500 });
  if (productType === "pot") {
    lines.push({ label: "🪴 Emballage Pots", price: 500 });
    if ((config.heartColors || []).length > 0) {
      lines.push({ label: `💗 Cœurs · ${config.heartColors.map(id => HEART_COLORS.find(c => c.id === id)?.name).filter(Boolean).join(", ")}`, price: 0 });
    }
  }

  flowerList.forEach(([id, qty]) => {
    const f = allFlowers.find(fl => fl.id === id);
    const colorHex = (config.colors || {})[id] || f?.colors[0].hex;
    const colorName = f?.colors.find(c => c.hex === colorHex)?.name || "";
    if (f) lines.push({ label: `${f.emoji} ${f.name} × ${qty}`, sub: colorName, price: f.price * qty, dot: colorHex });
  });

  Object.entries(config.fillerQtys || {}).forEach(([id, qty]) => {
    const fl = FILLERS.find(f => f.id === id);
    if (fl && qty > 0) lines.push({ label: `${fl.emoji} ${fl.name} ×${qty}`, price: fl.price * qty });
  });

  if (productType === "bouquet" && config.emballage) {
    const e = EMBALLAGE_BOUQUET.find(e => e.id === config.emballage);
    if (e) lines.push({ label: `🎀 ${e.name}`, price: e.price });
  }


  if (config.ribbonType) {
    const rt = RIBBON_TYPES.find(r => r.id === config.ribbonType);
    lines.push({ label: `🎀 ${rt?.name}`, price: rt?.extraCost || 0 });
  }
  if (config.perles) lines.push({ label: "🪩 Perles décoratives", price: 350 });

  return (
    <div className="step-content">
      <h2 className="step-title">Résumé de <em>commande</em> ✨</h2>
      <div className="summary-card">
        <div className="summary-row header">
          <span>{productLabels[productType]}</span>
        </div>
        <div className="summary-section">
          {lines.map((l, i) => (
            <div key={i} className="summary-item">
              <span>
                {l.dot && <span className="flower-dot" style={{ background: l.dot, border: (l.dot === "#ffffff" || l.dot === "#eeeeee") ? "1px solid #ddd" : "none" }} />}
                {l.label}
                {l.sub && <span style={{ color: "#9c7f6e", fontSize: ".75rem" }}> · {l.sub}</span>}
              </span>
              <span>{l.price === 0 ? <span style={{color:"#9c7f6e", fontSize:".8rem"}}>inclus</span> : fmtPrice(l.price)}</span>
            </div>
          ))}
        </div>

        {config.wilaya && (
          <div className="summary-section">
            <span className="summary-section-title">🚚 Livraison</span>
            <div className="summary-item">
              <span>{config.wilaya} · {config.deliveryType === "stopDesk" ? "Stop Desk 🏪" : "Domicile 🏠"}</span>
              <span>{fmtPrice(deliveryCost)}</span>
            </div>
          </div>
        )}

        <div className="summary-divider" />
        <div className="summary-total">
          <span>Total</span>
          <span className="total-val">{fmtPrice(totalPrice)}</span>
        </div>
        <div className="summary-note">💰 Paiement à la livraison (cash)</div>
      </div>

      {config.name && (
        <div className="customer-card">
          <div className="customer-row"><span>👤</span><span>{config.name}</span></div>
          {config.phone   && <div className="customer-row"><span>📞</span><span>{config.phone}</span></div>}
          {config.address && <div className="customer-row"><span>📍</span><span>{config.address}</span></div>}
          {config.notes   && <div className="customer-row"><span>📝</span><span>{config.notes}</span></div>}
        </div>
      )}

      {basket.length > 0 && (
        <div className="basket-preview">
          <div className="basket-preview-title">🛒 Panier complet ({basket.length + 1} articles)</div>
          {basket.map((item, i) => (
            <div key={i} className="basket-preview-item">
              <span>{item.label}</span><span>{fmtPrice(item.price)}</span>
            </div>
          ))}
          <div className="basket-preview-item" style={{borderTop:"1px solid var(--border-lt)",paddingTop:6,marginTop:4,fontWeight:600}}>
            <span>Cet article</span><span>{fmtPrice(totalPrice)}</span>
          </div>
          <div className="basket-preview-item total-row">
            <span>Total panier</span>
            <span>{fmtPrice(basket.reduce((s,i)=>s+i.price,0)+totalPrice)}</span>
          </div>
        </div>
      )}

      <div className="delivery-note">
        🕒 <strong>Délai de préparation et d'expédition : 3 à 7 jours ouvrables.</strong>
      </div>

      {/* Action buttons */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:80}}>
        <button className="whatsapp-btn" onClick={onWhatsApp}>
          <span className="wa-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.ab-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </span>
          Commander immédiatement 📲
        </button>
        <button className="add-basket-btn" style={{width:"100%",padding:"13px",fontSize:".9rem",textAlign:"center"}} onClick={onAddToBasket}>
          🛒 Ajouter au panier &amp; créer un autre article
        </button>
        <button className="back-btn" style={{width:"100%",textAlign:"center",padding:"12px"}} onClick={onBack}>
          ← Retour (sans ajouter)
        </button>
      </div>
    </div>
  );
}

// ─── WHATSAPP MESSAGE BUILDER ────────────────────────────────────────────────

function buildWhatsAppMessage(productType, config, totalPrice) {
  const allFlowers = [...FLOWERS, ...KEYCHAINS.filter(k => !FLOWERS.find(f => f.id === k.id))];
  const fmtDA = (n) => `${n.toLocaleString()} DA`;

  const productLabels = {
    bouquet:  "Bouquet 💐",
    box:      "Flower Box 🎁",
    lamp:     "Lampe 🪔",
    board:    "Spring Board 🌸",
    pot:      "Pot 🪴",
    keychain: "Porte-clé 🗝️",
  };

  let lines = [];
  lines.push("🌸 *Nouvelle commande — JardinElle Store*");
  lines.push("━━━━━━━━━━━━━━━━━━━━━");
  lines.push(`📦 *Produit :* ${productLabels[productType]}`);
  lines.push("");

  // ── Lamp ──
  if (productType === "lamp") {
    const m = LAMP_MODELS.find(m => m.id === config.lampModel);
    if (m) lines.push(`${m.emoji} Modèle : ${m.name} — ${fmtDA(m.price)}`);
    const lampCols = (config.lampColors || []).map(hex => LAMP_COLORS.find(c => c.hex === hex)?.name).filter(Boolean);
    if (lampCols.length) lines.push(`🎨 Couleurs : ${lampCols.join(" · ")}`);
    lines.push("🎁 1 pack de piles offert");
    if ((config.extraBatteries || 0) > 0)
      lines.push(`🔋 Piles supp. ×${config.extraBatteries} — ${fmtDA(config.extraBatteries * 100)}`);
  }

  // ── Board ──
  if (productType === "board") {
    const bc = BOARD_CONFIGS.find(b => b.id === config.boardConfig);
    if (bc) {
      lines.push(`🌸 ${bc.name} — ${fmtDA(bc.basePrice)}`);
      if (config.boardLed) lines.push(`✨ LED — ${fmtDA(500)}`);
      (config.daisyColors || []).forEach((hex, i) => {
        if (hex) {
          const c = LAMP_COLORS.find(fc => fc.hex === hex);
          lines.push(`  🌼 Marguerite ${i + 1} : ${c?.name || hex}`);
        }
      });
    }
  }

  // ── Box ──
  if (productType === "box") lines.push(`🎁 Emballage Box — ${fmtDA(2000)}`);

  // ── Pot ──
  if (productType === "pot") {
    lines.push(`🪴 Emballage Pot — ${fmtDA(500)}`);
    if (config.potType) lines.push(`   Type : ${config.potType}`);
    const hearts = (config.heartColors || []).map(id => HEART_COLORS.find(c => c.id === id)?.name).filter(Boolean);
    if (hearts.length) lines.push(`💗 Couleurs cœurs : ${hearts.join(", ")}`);
  }

  // ── Flowers ──
  const flowerList = Object.entries(config.flowers || {}).filter(([, q]) => q > 0);
  if (flowerList.length) {
    lines.push("");
    lines.push("🌷 *Fleurs :*");
    flowerList.forEach(([id, qty]) => {
      const f = allFlowers.find(fl => fl.id === id);
      const colorHex = (config.colors || {})[id] || f?.colors[0].hex;
      const colorName = f?.colors.find(c => c.hex === colorHex)?.name || "";
      if (f) lines.push(`  ${f.emoji} ${f.name} ×${qty} · ${colorName} — ${fmtDA(f.price * qty)}`);
    });
  }

  // ── Fillers ──
  const fillerEntries = Object.entries(config.fillerQtys || {}).filter(([,q]) => q > 0);
  if (fillerEntries.length) {
    lines.push("");
    lines.push("🌿 *Fillers :*");
    fillerEntries.forEach(([id, qty]) => {
      const fl = FILLERS.find(f => f.id === id);
      if (fl) lines.push(`  ${fl.emoji} ${fl.name} ×${qty} — ${fmtDA(fl.price * qty)}`);
    });
  }

  // ── Emballage bouquet ──
  if (productType === "bouquet" && config.emballage) {
    const e = EMBALLAGE_BOUQUET.find(e => e.id === config.emballage);
    if (e) { lines.push(""); lines.push(`🎀 Emballage : ${e.name} — ${fmtDA(e.price)}`); }
  }

  // ── Papier & Ruban ──

  if (config.ribbonType) {
    const rt = RIBBON_TYPES.find(r => r.id === config.ribbonType);
    const extra = rt?.extraCost > 0 ? ` — ${fmtDA(rt.extraCost)}` : " (inclus)";
    lines.push(`🎀 Ruban : ${rt?.name}${extra}`);
  }
  if (config.perles) lines.push(`🪩 Perles décoratives — ${fmtDA(350)}`);

  // ── Livraison ──
  if (config.wilaya) {
    const w = WILAYAS.find(w => w.name === config.wilaya);
    const deliveryCost = w ? (config.deliveryType === "stopDesk" ? w.stopDesk : w.home) : 0;
    const mode = config.deliveryType === "stopDesk" ? "Stop Desk 🏪" : "Domicile 🏠";
    lines.push("");
    lines.push("🚚 *Livraison :*");
    lines.push(`  📍 ${config.wilaya} · ${mode} — ${fmtDA(deliveryCost)}`);
  }

  // ── Total ──
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━");
  lines.push(`💰 *Total : ${fmtDA(totalPrice)}*`);
  lines.push("💳 Paiement à la livraison (cash)");

  // ── Client ──
  lines.push("");
  lines.push("👤 *Informations client :*");
  if (config.name)    lines.push(`  Nom : ${config.name}`);
  if (config.phone)   lines.push(`  Tél : ${config.phone}`);
  if (config.address) lines.push(`  Adresse : ${config.address}`);
  if (config.notes)   lines.push(`  Notes : ${config.notes}`);

  return lines.join("\n");
}


function SuccessScreen({ onReset }) {
  return (
    <div className="success-screen">
      <FloralTop />
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"20px 24px 0",textAlign:"center"}}>
        <div className="success-icon">🌸</div>
        <h2>Commande confirmée !</h2>
        <p>شكراً على طلبك · Merci pour votre commande 💐</p>
        <p className="success-sub">Nous vous contacterons très bientôt pour confirmer votre composition.</p>
        <button className="confirm-btn" style={{maxWidth:280}} onClick={onReset}>✨ Nouvelle commande</button>
      </div>
      <FloralBottom />
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

// ─── BASKET BAR ──────────────────────────────────────────────────────────────
function BasketBar({ basket, onViewBasket }) {
  if (!basket.length) return null;
  return (
    <div className="landing-basket-bar" onClick={onViewBasket} style={{cursor:"pointer"}}>
      🛒 <strong>{basket.length} article{basket.length > 1 ? "s" : ""} dans le panier</strong>
      <span style={{marginLeft:8,color:"var(--sage)",fontWeight:600}}>
        {fmtPrice(basket.reduce((s,i)=>s+i.price,0))}
      </span>
      <span style={{marginLeft:"auto",fontSize:".78rem",color:"var(--rose-deep)",fontWeight:600}}>Voir →</span>
    </div>
  );
}

// ─── BASKET VIEW ─────────────────────────────────────────────────────────────
function BasketView({ basket, onRemoveItem, onContinueShopping, onCheckout }) {
  const total = basket.reduce((s, i) => s + i.price, 0);
  return (
    <div style={{background:"var(--cream)", minHeight:"100vh"}}>
      <FloralTop />
      <div style={{padding:"0 20px 120px"}}>
        <h2 style={{fontFamily:"var(--font-script)",fontSize:"2rem",color:"var(--rose-deep)",textAlign:"center",margin:"16px 0 4px"}}>
          Mon Panier 🛒
        </h2>
        <p style={{textAlign:"center",fontSize:".82rem",color:"var(--text-lt)",marginBottom:20}}>
          {basket.length} article{basket.length > 1 ? "s" : ""}
        </p>

        {basket.length === 0 ? (
          <div style={{textAlign:"center",padding:"40px 0",color:"var(--text-lt)"}}>
            <div style={{fontSize:"3rem",marginBottom:12}}>🌸</div>
            <p>Votre panier est vide</p>
          </div>
        ) : (
          basket.map((item, i) => (
            <div key={i} className="basket-view-item">
              <div className="basket-view-item-header">
                <span className="basket-view-label">{item.label}</span>
                <span className="basket-view-price">{fmtPrice(item.price)}</span>
              </div>
              <button className="basket-remove-btn" onClick={() => onRemoveItem(i)}>
                🗑️ Supprimer
              </button>
            </div>
          ))
        )}

        {basket.length > 0 && (
          <div className="basket-view-total">
            <span>Total</span>
            <span style={{fontFamily:"var(--font-serif)",fontSize:"1.4rem",color:"var(--rose-deep)",fontWeight:600}}>
              {fmtPrice(total)}
            </span>
          </div>
        )}
      </div>

      <div className="bottom-bar">
        <button className="back-btn" onClick={onContinueShopping}>← Continuer</button>
        {basket.length > 0 && (
          <button className="next-btn" onClick={onCheckout}>Commander →</button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep]               = useState(1);
  const [productType, setProductType] = useState(null);
  const [config, setConfig]           = useState({});
  const [ordered, setOrdered]         = useState(false);
  const [basket, setBasket]           = useState([]);
  const [viewBasket, setViewBasket]   = useState(false);
  // Memorized customer info: once filled, pre-populate for subsequent items
  const [savedCustomer, setSavedCustomer] = useState(null);
  const topRef = useRef(null);

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth" }); }, [step]);

  // When the user reaches step 3, pre-fill known customer data
  useEffect(() => {
    if (step === 3 && savedCustomer) {
      setConfig(c => ({
        ...c,
        name:    c.name    || savedCustomer.name,
        phone:   c.phone   || savedCustomer.phone,
        address: c.address || savedCustomer.address,
        notes:   c.notes   || savedCustomer.notes || "",
        wilaya:  c.wilaya  || savedCustomer.wilaya || "",
        deliveryType: c.deliveryType || savedCustomer.deliveryType || "",
      }));
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const calcPrice = (cfg = config, pType = productType) => {
    if (!pType) return 0;
    let total = 0;

    if (pType === "lamp") {
      const model = LAMP_MODELS.find((m) => m.id === cfg.lampModel);
      total = model ? model.price : 2800;
      total += (cfg.extraBatteries || 0) * 100;
    }

    if (pType === "board") {
      const bc = BOARD_CONFIGS.find((b) => b.id === cfg.boardConfig);
      total = bc?.basePrice || 0;
      if (cfg.boardLed) total += 500;
    }

    if (pType === "pot") total += 500;
    if (pType === "box") total += 2000;

    Object.entries(cfg.flowers || {}).forEach(([id, qty]) => {
      const f = FLOWERS.find((fl) => fl.id === id) || KEYCHAINS.find((fl) => fl.id === id);
      if (f && qty > 0) total += f.price * qty;
    });

    Object.entries(cfg.fillerQtys || {}).forEach(([id, qty]) => {
      const fl = FILLERS.find((f) => f.id === id);
      if (fl && qty > 0) total += fl.price * qty;
    });

    if (pType === "bouquet" && cfg.emballage) {
      const e = EMBALLAGE_BOUQUET.find((e) => e.id === cfg.emballage);
      if (e) total += e.price;
    }

    if (cfg.ribbonType) {
      const rt = RIBBON_TYPES.find(r => r.id === cfg.ribbonType);
      if (rt) total += rt.extraCost || 0;
    }

    if (cfg.perles) total += 350;

    if (cfg.wilaya && cfg.deliveryType) {
      const w = WILAYAS.find((w) => w.name === cfg.wilaya);
      if (w) total += cfg.deliveryType === "stopDesk" ? w.stopDesk : w.home;
    }

    return total;
  };

  const totalPrice = calcPrice();
  const STEPS = 4;

  const PRODUCT_LABELS = {
    bouquet:"Bouquet 💐", box:"Flower Box 🎁", lamp:"Lampe 🪔",
    board:"Spring Board 🌸", pot:"Pot 🪴", keychain:"Porte-clé 🗝️",
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, STEPS));
  const handleBack = () => {
    if (step === 1) { setProductType(null); return; }
    setStep((s) => s - 1);
  };

  const canNext = () => {
    if (step === 1) return !!productType;
    if (step === 2) {
      if (productType === "lamp")     return !!config.lampModel;
      if (productType === "keychain") return Object.values(config.flowers || {}).some((q) => q > 0);
      if (productType === "board")    return !!config.boardConfig;
      if (productType === "pot")      return (config.potType === "Cœurs")
        ? (config.heartColors || []).length > 0
        : Object.values(config.flowers || {}).some((q) => q > 0);
      return Object.values(config.flowers || {}).some((q) => q > 0);
    }
    if (step === 3) {
      const ph = (config.phone||"").replace(/\s/g,"");
      const phoneOk = /^0[5-7]\d{8}$/.test(ph);
      return !!(config.name?.trim() && phoneOk && config.address?.trim() && config.wilaya && config.deliveryType);
    }
    return true;
  };

  // Save customer info so next items are pre-filled
  const saveCustomerInfo = (cfg) => {
    if (cfg.name?.trim() && cfg.phone?.trim() && cfg.address?.trim()) {
      setSavedCustomer({
        name: cfg.name,
        phone: cfg.phone,
        address: cfg.address,
        notes: cfg.notes || "",
        wilaya: cfg.wilaya || "",
        deliveryType: cfg.deliveryType || "",
      });
    }
  };

  // Add current item to basket and return to product selector
  const addToBasket = () => {
    saveCustomerInfo(config);
    setBasket(b => [...b, {
      productType, label: PRODUCT_LABELS[productType],
      config: JSON.parse(JSON.stringify(config)),
      price: totalPrice,
    }]);
    // Keep customer info for next item
    const customerSnap = {
      name: config.name || "",
      phone: config.phone || "",
      address: config.address || "",
      notes: config.notes || "",
      wilaya: config.wilaya || "",
      deliveryType: config.deliveryType || "",
    };
    setProductType(null);
    setConfig(customerSnap); // preserve coords so step 3 pre-fills
    setStep(1);
  };

  // Remove item from basket
  const removeFromBasket = (index) => {
    setBasket(b => b.filter((_, i) => i !== index));
  };

  // Build full basket WA message (all items + single delivery block)
  const buildBasketWA = () => {
    const fmtDA = (n) => `${n.toLocaleString()} DA`;
    const all = [...basket, { productType, config, price: totalPrice, label: PRODUCT_LABELS[productType] }];

    // Delivery info from last item's config
    const lastConfig = config;
    const w = WILAYAS.find(wl => wl.name === lastConfig.wilaya);
    const deliveryCost = w ? (lastConfig.deliveryType === "stopDesk" ? w.stopDesk : w.home) : 0;
    const productTotal = all.reduce((s, i) => s + i.price, 0) - deliveryCost;
    const grand = all.reduce((s, i) => s + i.price, 0);

    let lines = ["🌸 *Nouvelle commande — JardinElle Store*", "━━━━━━━━━━━━━━━━━━━━━", `📦 *${all.length} article${all.length>1?"s":""}*`, ""];

    all.forEach((item, i) => {
      lines.push(`*— Article ${i+1} : ${item.label} —*`);
      // Build product-only lines (no client/delivery repetition)
      lines.push(buildProductLines(item.productType, item.config, item.price));
      lines.push("");
    });

    // Single delivery block
    if (lastConfig.wilaya) {
      const mode = lastConfig.deliveryType === "stopDesk" ? "Stop Desk 🏪" : "Domicile 🏠";
      lines.push("━━━━━━━━━━━━━━━━━━━━━");
      lines.push("🚚 *Livraison :*");
      lines.push(`  📍 ${lastConfig.wilaya} · ${mode} — ${fmtDA(deliveryCost)}`);
      lines.push("");
    }

    lines.push("━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`💰 *TOTAL PANIER : ${fmtDA(grand)}*`);
    lines.push("🕒 Délai de préparation et d'expédition : 3 à 7 jours ouvrables.");
    lines.push("💳 Paiement à la livraison (cash)");

    // Single client block
    lines.push("");
    lines.push("👤 *Informations client :*");
    if (lastConfig.name)    lines.push(`  Nom : ${lastConfig.name}`);
    if (lastConfig.phone)   lines.push(`  Tél : ${lastConfig.phone}`);
    if (lastConfig.address) lines.push(`  Adresse : ${lastConfig.address}`);
    if (lastConfig.notes)   lines.push(`  Notes : ${lastConfig.notes}`);

    return lines.join("\n");
  };

  // Basket view mode
  if (viewBasket) return (
    <div className="app-shell">
      <style>{CSS}</style>
      <BasketView
        basket={basket}
        onRemoveItem={removeFromBasket}
        onContinueShopping={() => setViewBasket(false)}
        onCheckout={() => {
          setViewBasket(false);
          // If no current item in config, start a new one
          if (!productType) {
            setProductType(null); setConfig(savedCustomer || {}); setStep(1);
          }
        }}
      />
    </div>
  );

  if (ordered) return (
    <div className="app-shell">
      <style>{CSS}</style>
      <SuccessScreen onReset={() => { setOrdered(false); setStep(1); setProductType(null); setConfig({}); setBasket([]); setSavedCustomer(null); }} />
    </div>
  );

  if (!productType) return (
    <div className="app-shell">
      <style>{CSS}</style>
      <Step1_ProductType
        onSelect={(t) => { setProductType(t); setConfig(savedCustomer ? {...savedCustomer} : {}); setStep(2); }}
        basket={basket}
        onViewBasket={() => setViewBasket(true)}
      />
    </div>
  );

  return (
    <div className="app-shell">
      <style>{CSS}</style>
      <header className="app-header" ref={topRef}>
        <button onClick={() => { setProductType(null); setStep(1); }}
          style={{background:"none",border:"none",cursor:"pointer",padding:"4px 8px 4px 0"}}>
          <span className="logo">Jardin<em>Elle</em></span>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {basket.length > 0 && (
            <button onClick={() => setViewBasket(true)}
              style={{fontSize:".75rem",background:"var(--rose-pale)",color:"var(--rose-deep)",
                border:"1px solid var(--rose-lt)",borderRadius:99,padding:"3px 10px",fontWeight:600,cursor:"pointer"}}>
              🛒 {basket.length}
            </button>
          )}
          <PriceTag price={totalPrice} />
        </div>
      </header>

      <div className="step-nav-bar">
        <StepBar step={step} total={STEPS} />
        <span className="step-label">Étape {step}/{STEPS}</span>
      </div>

      <main className="app-main">
        {step === 2 && <Step2_Customize productType={productType} config={config} setConfig={setConfig} />}
        {step === 3 && <Step3_Delivery config={config} setConfig={setConfig} savedCustomer={savedCustomer} />}
        {step === 4 && <Step4_Confirm
          productType={productType} config={config} totalPrice={totalPrice} basket={basket}
          onWhatsApp={() => {
            saveCustomerInfo(config);
            const msg = buildBasketWA();
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
            window.open(url, "_blank");
            setOrdered(true);
          }}
          onAddToBasket={addToBasket}
          onBack={handleBack}
        />}
      </main>

      {step < 4 && (
        <div className="bottom-bar">
          <button className="back-btn" onClick={handleBack}>← Retour</button>
          <div className="price-mini">{fmtPrice(totalPrice)}</div>
          <button className="next-btn" onClick={handleNext} disabled={!canNext()}>
            {step === 3 ? "Vérifier →" : "Suivant →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── PRODUCT-ONLY WA LINES (no client/delivery) ───────────────────────────────
function buildProductLines(productType, config, totalPrice) {
  const allFlowers = [...FLOWERS, ...KEYCHAINS.filter(k => !FLOWERS.find(f => f.id === k.id))];
  const fmtDA = (n) => `${n.toLocaleString()} DA`;
  let lines = [];

  if (productType === "lamp") {
    const m = LAMP_MODELS.find(m => m.id === config.lampModel);
    if (m) lines.push(`  ${m.emoji} Modèle : ${m.name} — ${fmtDA(m.price)}`);
    const lampCols = (config.lampColors || []).map(hex => LAMP_COLORS.find(c => c.hex === hex)?.name).filter(Boolean);
    if (lampCols.length) lines.push(`  🎨 Couleurs : ${lampCols.join(" · ")}`);
    if ((config.extraBatteries || 0) > 0) lines.push(`  🔋 Piles supp. ×${config.extraBatteries} — ${fmtDA(config.extraBatteries * 100)}`);
  }

  if (productType === "board") {
    const bc = BOARD_CONFIGS.find(b => b.id === config.boardConfig);
    if (bc) {
      lines.push(`  🌸 ${bc.name} — ${fmtDA(bc.basePrice)}`);
      if (config.boardLed) lines.push(`  ✨ LED — ${fmtDA(500)}`);
    }
  }

  if (productType === "box") lines.push(`  🎁 Emballage Box — ${fmtDA(2000)}`);
  if (productType === "pot") {
    lines.push(`  🪴 Emballage Pot — ${fmtDA(500)}`);
    if (config.potType) lines.push(`  Type : ${config.potType}`);
    const hearts = (config.heartColors || []).map(id => HEART_COLORS.find(c => c.id === id)?.name).filter(Boolean);
    if (hearts.length) lines.push(`  💗 Cœurs : ${hearts.join(", ")}`);
  }

  const flowerList = Object.entries(config.flowers || {}).filter(([, q]) => q > 0);
  if (flowerList.length) {
    lines.push("  🌷 Fleurs :");
    flowerList.forEach(([id, qty]) => {
      const f = allFlowers.find(fl => fl.id === id);
      const colorHex = (config.colors || {})[id] || f?.colors[0].hex;
      const colorName = f?.colors.find(c => c.hex === colorHex)?.name || "";
      if (f) lines.push(`    ${f.emoji} ${f.name} ×${qty} · ${colorName} — ${fmtDA(f.price * qty)}`);
    });
  }

  const fillerEntries = Object.entries(config.fillerQtys || {}).filter(([,q]) => q > 0);
  if (fillerEntries.length) {
    lines.push("  🌿 Fillers :");
    fillerEntries.forEach(([id, qty]) => {
      const fl = FILLERS.find(f => f.id === id);
      if (fl) lines.push(`    ${fl.emoji} ${fl.name} ×${qty} — ${fmtDA(fl.price * qty)}`);
    });
  }

  if (productType === "bouquet" && config.emballage) {
    const e = EMBALLAGE_BOUQUET.find(e => e.id === config.emballage);
    if (e) lines.push(`  🎀 Emballage : ${e.name} — ${fmtDA(e.price)}`);
  }

  if (config.ribbonType) {
    const rt = RIBBON_TYPES.find(r => r.id === config.ribbonType);
    const extra = rt?.extraCost > 0 ? ` — ${fmtDA(rt.extraCost)}` : " (inclus)";
    lines.push(`  🎀 Ruban : ${rt?.name}${extra}`);
  }
  if (config.perles) lines.push(`  🪩 Perles décoratives — ${fmtDA(350)}`);

  return lines.join("\n");
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Dancing+Script:wght@500;600;700&family=Jost:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --sage:       #7a9e7e;
  --sage-lt:    #b8d4ba;
  --sage-pale:  #edf5ee;
  --rose:       #c9768e;
  --rose-lt:    #edb8c5;
  --rose-pale:  #fdf0f3;
  --rose-deep:  #a85570;
  --lavender:   #9b8dbf;
  --lav-lt:     #c4b8d8;
  --lav-pale:   #f2eef8;
  --sky:        #7aaec8;
  --sky-pale:   #e8f4fa;
  --yellow:     #e8c060;
  --beige:      #f5ede0;
  --cream:      #fdfaf5;
  --parchment:  #f8f3ea;
  --text:       #2e221a;
  --text-mid:   #6e5448;
  --text-lt:    #a8907e;
  --border:     #e8d8cc;
  --border-lt:  #f0e4d8;
  --white:      #ffffff;
  --shadow:     0 2px 24px rgba(80,50,30,.07);
  --shadow-md:  0 8px 40px rgba(80,50,30,.13);
  --shadow-rose:0 6px 24px rgba(201,118,142,.22);
  --r-xs: 8px;
  --r-sm: 14px;
  --r-md: 20px;
  --r-lg: 32px;
  --font-script: 'Dancing Script', cursive;
  --font-serif:  'Cormorant Garamond', serif;
  --font-body:   'Jost', sans-serif;
}

html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body); background: var(--cream);
  color: var(--text); min-height: 100vh;
  background-image:
    radial-gradient(ellipse at 10% 20%, rgba(212,180,200,.08) 0%, transparent 60%),
    radial-gradient(ellipse at 90% 80%, rgba(144,190,160,.08) 0%, transparent 60%);
}

/* ═══ SHELL ═══════════════════════════════════════════════════════ */
.app-shell { max-width: 480px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; position: relative; }

/* ═══ WATERCOLOR SVG BORDERS ══════════════════════════════════════ */
.floral-top, .floral-bottom { width: 100%; display: block; }

/* ═══ LANDING HERO ════════════════════════════════════════════════ */
.hero-inner {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 0 28px 4px; position: relative;
}
.hero-logo {
  font-family: var(--font-script);
  font-size: clamp(3rem, 13vw, 3.8rem);
  color: var(--text); line-height: 1;
  letter-spacing: -1.5px; margin-bottom: 6px;
  text-shadow: 0 2px 8px rgba(80,40,30,.08);
}
.hero-logo span { color: var(--rose-deep); }
.hero-slogan {
  font-family: var(--font-serif); font-style: italic;
  font-size: 1rem; color: var(--text-mid); letter-spacing: .3px;
  margin-bottom: 20px; font-weight: 300; line-height: 1.5;
}
.hero-tagline {
  font-size: .72rem; color: var(--text-lt); letter-spacing: 3px;
  text-transform: uppercase; margin-bottom: 24px; font-weight: 500;
}
.hero-badges { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 4px; }
.hero-badge {
  font-size: .68rem; padding: 5px 14px; border-radius: 99px;
  border: 1px solid var(--rose-lt); color: var(--rose-deep); background: var(--rose-pale);
  font-weight: 600; letter-spacing: .5px;
}
.hero-badge.sage { border-color: var(--sage-lt); color: var(--sage); background: var(--sage-pale); }
.hero-badge.lav  { border-color: var(--lav-lt); color: var(--lavender); background: var(--lav-pale); }

/* ═══ SECTION HEADER ══════════════════════════════════════════════ */
.section-header { text-align: center; padding: 24px 24px 16px; }
.section-ornament {
  display: flex; align-items: center; justify-content: center;
  gap: 10px; margin-bottom: 12px; color: var(--rose-lt);
  font-size: 1rem; letter-spacing: 4px;
}
.section-header h2 {
  font-family: var(--font-serif); font-size: 1.55rem; font-weight: 600;
  color: var(--text); line-height: 1.25;
}
.section-header h2 em { color: var(--rose-deep); font-style: italic; font-weight: 300; }
.section-header p { font-size: .85rem; color: var(--text-mid); margin-top: 6px; font-weight: 300; }

/* ═══ PRODUCT GRID ════════════════════════════════════════════════ */
.product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 18px 28px; }
.product-card {
  background: var(--white);
  border: 1.5px solid var(--border-lt);
  border-radius: var(--r-md); padding: 22px 10px 18px;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  cursor: pointer; transition: all .28s ease; text-align: center;
  position: relative; overflow: hidden;
  box-shadow: 0 2px 12px rgba(80,40,30,.05);
}
.product-card::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--rose-pale), var(--lav-pale));
  opacity: 0; transition: opacity .28s;
}
.product-card:hover {
  border-color: var(--rose-lt);
  box-shadow: var(--shadow-rose);
  transform: translateY(-4px) scale(1.01);
}
.product-card:hover::after { opacity: 1; }
.product-card > * { position: relative; z-index: 1; }
.product-icon { font-size: 2.4rem; margin-bottom: 3px; filter: drop-shadow(0 2px 4px rgba(80,40,30,.12)); }
.product-name { font-family: var(--font-serif); font-weight: 600; font-size: 1rem; color: var(--text); letter-spacing: -.2px; }
.product-name-ar { font-size: .72rem; color: var(--text-lt); direction: rtl; }
.product-desc { font-size: .68rem; color: var(--text-mid); line-height: 1.5; margin-top: 2px; font-weight: 300; }
.product-price-hint {
  font-size: .7rem; font-weight: 600; color: var(--white);
  background: var(--sage); padding: 3px 10px; border-radius: 99px;
  margin-top: 6px; letter-spacing: .3px;
}

/* ═══ HEADER (step screens) ═══════════════════════════════════════ */
.app-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 20px;
  background: rgba(253,250,245,.96);
  border-bottom: 1px solid var(--border-lt);
  position: sticky; top: 0; z-index: 100;
  box-shadow: 0 1px 20px rgba(80,50,30,.07);
  backdrop-filter: blur(10px);
}
.logo { font-family: var(--font-script); font-size: 1.6rem; color: var(--text); letter-spacing: -.5px; line-height: 1; }
.logo em { color: var(--rose-deep); font-style: normal; }

/* ═══ STEP BAR ════════════════════════════════════════════════════ */
.step-nav-bar {
  display: flex; align-items: center; gap: 12px;
  padding: 9px 20px;
  background: var(--parchment);
  border-bottom: 1px solid var(--border-lt);
}
.step-bar { display: flex; gap: 5px; flex: 1; }
.step-dot { flex: 1; height: 3px; border-radius: 99px; background: var(--border); transition: background .35s; }
.step-dot.done { background: var(--sage); }
.step-dot.active { background: linear-gradient(90deg, var(--rose), var(--lavender)); }
.step-label { font-size: .7rem; color: var(--text-lt); white-space: nowrap; font-weight: 500; letter-spacing: .5px; }

/* ═══ PRICE TAG ═══════════════════════════════════════════════════ */
.price-tag { display: flex; flex-direction: column; align-items: flex-end; }
.price-label { font-size: .58rem; color: var(--text-lt); text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; }
.price-value { font-family: var(--font-serif); font-size: 1.15rem; color: var(--rose-deep); font-weight: 600; }

/* ═══ MAIN / STEP CONTENT ═════════════════════════════════════════ */
.app-main { flex: 1; overflow-y: auto; padding-bottom: 90px; }
.step-content { padding: 24px 20px; }
.step-title {
  font-family: var(--font-serif); font-size: 1.7rem; line-height: 1.2;
  margin-bottom: 5px; color: var(--text); font-weight: 600;
}
.step-title em { color: var(--rose-deep); font-style: italic; font-weight: 300; }
.step-sub { color: var(--text-mid); font-size: .87rem; margin-bottom: 26px; font-weight: 300; line-height: 1.6; }

/* ═══ FIELD LABELS ════════════════════════════════════════════════ */
.field-label {
  display: block; font-weight: 600; font-size: .7rem;
  text-transform: uppercase; letter-spacing: 1.4px;
  color: var(--text-mid); margin: 22px 0 10px;
}

/* ═══ FLOWER CARDS ════════════════════════════════════════════════ */
.flowers-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.flower-card {
  background: var(--white); border: 1.5px solid var(--border-lt);
  border-radius: var(--r-md); padding: 14px 16px;
  display: flex; align-items: flex-start; gap: 12px;
  transition: border-color .2s, box-shadow .2s;
  box-shadow: 0 1px 8px rgba(80,40,30,.04);
}
.flower-card.selected { border-color: var(--rose-lt); background: var(--rose-pale); box-shadow: 0 3px 16px rgba(201,118,142,.15); }
.flower-emoji { font-size: 2rem; flex-shrink: 0; }
.flower-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.flower-name { font-family: var(--font-serif); font-weight: 600; font-size: .95rem; color: var(--text); }
.flower-ar { font-size: .7rem; color: var(--text-lt); direction: rtl; text-align: right; }
.flower-price { font-size: .72rem; color: var(--sage); font-weight: 600; }
.flower-color-name { font-size: .68rem; font-weight: 600; margin-top: 2px; }
.flower-controls { display: flex; flex-direction: column; gap: 7px; align-items: flex-end; flex-shrink: 0; }
.color-search {
  width: 100px; padding: 4px 8px; border: 1px solid var(--border);
  border-radius: var(--r-xs); font-size: .68rem; font-family: var(--font-body);
  background: var(--parchment); color: var(--text); outline: none;
  transition: border-color .15s;
}
.color-search:focus { border-color: var(--rose-lt); }
.color-row { display: flex; gap: 4px; flex-wrap: wrap; justify-content: flex-end; max-width: 130px; }
.color-dot {
  width: 16px; height: 16px; border-radius: 50%; cursor: pointer;
  transition: transform .15s, box-shadow .15s; flex-shrink: 0;
}
.color-dot:hover { transform: scale(1.3); }
.color-dot.active { box-shadow: 0 0 0 2.5px var(--rose-deep), 0 0 0 4.5px white; transform: scale(1.2); }
.qty-row { display: flex; align-items: center; gap: 8px; }
.qty-btn {
  width: 30px; height: 30px; border-radius: 50%;
  border: 1.5px solid var(--border); background: var(--parchment);
  font-size: 1.1rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .18s; color: var(--text);
}
.qty-btn:hover:not(:disabled) { background: var(--rose-deep); color: white; border-color: var(--rose-deep); box-shadow: 0 2px 8px rgba(168,85,112,.3); }
.qty-btn:disabled { opacity: .28; cursor: not-allowed; }
.qty-num { font-family: var(--font-serif); font-weight: 600; min-width: 22px; text-align: center; font-size: 1rem; color: var(--rose-deep); }

/* ═══ SIZE INDICATOR ══════════════════════════════════════════════ */
.size-indicator {
  background: linear-gradient(135deg, var(--rose-pale), var(--lav-pale));
  border: 1px solid var(--rose-lt);
  border-radius: var(--r-md); padding: 12px 16px; margin-bottom: 20px;
}
.size-badge { font-family: var(--font-serif); font-weight: 600; font-size: .95rem; color: var(--rose-deep); display: block; margin-bottom: 5px; font-style: italic; }
.size-hints { display: flex; gap: 16px; font-size: .68rem; color: var(--text-lt); }

/* ═══ OPTION CHIPS ════════════════════════════════════════════════ */
.option-row { display: flex; gap: 8px; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; margin-bottom: 4px; }
.option-row.wrap { flex-wrap: wrap; overflow: visible; }
.option-chip {
  flex-shrink: 0; border: 1.5px solid var(--border);
  border-radius: var(--r-md); padding: 9px 16px;
  background: var(--white); cursor: pointer;
  font-size: .77rem; line-height: 1.55; text-align: center;
  transition: all .2s; color: var(--text); font-family: var(--font-body);
  box-shadow: 0 1px 6px rgba(80,40,30,.04);
}
.option-chip:hover:not(.disabled) { border-color: var(--rose-lt); background: var(--rose-pale); transform: translateY(-1px); }
.option-chip.selected {
  border-color: var(--rose-deep); background: var(--rose-pale);
  color: var(--rose-deep); font-weight: 600;
  box-shadow: 0 2px 10px rgba(168,85,112,.18);
}
.option-chip.disabled { opacity: .38; cursor: not-allowed; }
.chip-price { color: var(--sage); font-weight: 600; }
.delivery-chip { min-width: 136px; }

/* ═══ COLOR PILLS ═════════════════════════════════════════════════ */
.color-picker-row { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 8px; }
.color-pill {
  display: flex; align-items: center; gap: 6px;
  border: 1.5px solid var(--border); border-radius: 99px;
  padding: 5px 11px 5px 6px; background: var(--white); cursor: pointer;
  font-size: .73rem; transition: all .16s; color: var(--text);
  box-shadow: 0 1px 4px rgba(80,40,30,.04);
}
.color-pill:hover:not(.disabled) { border-color: var(--rose-lt); transform: translateY(-1px); }
.color-pill.active { border-color: var(--rose-deep); background: var(--rose-pale); font-weight: 600; color: var(--rose-deep); }
.color-pill.disabled { opacity: .38; cursor: not-allowed; }
.pill-swatch { width: 13px; height: 13px; border-radius: 50%; flex-shrink: 0; }
.pill-name { white-space: nowrap; }

/* ═══ FORM FIELDS ═════════════════════════════════════════════════ */
.field-select, .field-input {
  width: 100%; border: 1.5px solid var(--border); border-radius: var(--r-sm);
  padding: 13px 16px; font-family: var(--font-body); font-size: .9rem;
  background: var(--white); color: var(--text); margin-bottom: 10px;
  appearance: none; outline: none; transition: all .18s;
  box-shadow: 0 1px 6px rgba(80,40,30,.04);
}
.field-select:focus, .field-input:focus {
  border-color: var(--rose-lt);
  box-shadow: 0 0 0 3px rgba(201,118,142,.1), 0 2px 12px rgba(80,40,30,.06);
}
textarea.field-input { resize: vertical; }

/* ═══ LAMP GRID ═══════════════════════════════════════════════════ */
.lamp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
.lamp-card {
  background: var(--white); border: 1.5px solid var(--border-lt);
  border-radius: var(--r-md); padding: 20px 12px;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  cursor: pointer; transition: all .22s; text-align: center;
  box-shadow: 0 2px 10px rgba(80,40,30,.05);
}
.lamp-card:hover { border-color: var(--rose-lt); box-shadow: var(--shadow-rose); transform: translateY(-2px); }
.lamp-card.selected { border-color: var(--rose-deep); background: var(--rose-pale); box-shadow: var(--shadow-rose); }
.lamp-emoji { font-size: 2.2rem; filter: drop-shadow(0 2px 4px rgba(80,40,30,.1)); }
.lamp-name { font-family: var(--font-serif); font-weight: 600; font-size: .95rem; color: var(--text); }
.lamp-ar { font-size: .7rem; color: var(--text-lt); }
.lamp-price { font-size: .82rem; color: var(--sage); font-weight: 600; margin-top: 4px; }

/* ═══ INFO BOX ════════════════════════════════════════════════════ */
.info-box {
  background: linear-gradient(135deg, var(--sage-pale), #f0faf2);
  border: 1px solid var(--sage-lt);
  border-radius: var(--r-sm); padding: 11px 16px;
  font-size: .82rem; color: var(--sage); margin: 10px 0; font-weight: 400;
}

/* ═══ SUMMARY ═════════════════════════════════════════════════════ */
.summary-card {
  background: var(--white); border: 1.5px solid var(--border-lt);
  border-radius: var(--r-md); overflow: hidden; margin-bottom: 16px;
  box-shadow: var(--shadow-md);
}
.summary-row.header {
  padding: 16px 20px;
  background: linear-gradient(135deg, var(--rose-pale) 0%, var(--lav-pale) 60%, var(--sage-pale) 100%);
  font-family: var(--font-serif); font-weight: 600; font-size: 1.05rem;
  color: var(--text); border-bottom: 1px solid var(--border-lt); font-style: italic;
}
.summary-section { padding: 12px 20px; border-bottom: 1px solid var(--border-lt); }
.summary-section-title {
  font-size: .65rem; font-weight: 600; text-transform: uppercase;
  letter-spacing: 1.5px; color: var(--text-lt); display: block; margin-bottom: 8px;
}
.summary-item {
  display: flex; justify-content: space-between; align-items: center;
  font-size: .85rem; padding: 3px 0; color: var(--text);
}
.flower-dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 7px; vertical-align: middle; }
.summary-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--border-lt), transparent); }
.summary-total {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; font-weight: 700; font-size: 1rem;
}
.total-val { font-family: var(--font-serif); font-size: 1.5rem; color: var(--rose-deep); font-weight: 600; }
.summary-note { text-align: center; font-size: .73rem; color: var(--text-lt); padding: 0 20px 16px; font-style: italic; }
.customer-card {
  background: linear-gradient(135deg, var(--parchment), var(--beige));
  border: 1px solid var(--border-lt);
  border-radius: var(--r-md); padding: 16px 20px; margin-bottom: 20px;
}
.customer-row { display: flex; gap: 10px; font-size: .85rem; padding: 4px 0; color: var(--text); }
.customer-row span:first-child { width: 20px; flex-shrink: 0; }

/* ═══ BOTTOM BAR ══════════════════════════════════════════════════ */
.bottom-bar {
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 100%; max-width: 480px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 20px;
  background: rgba(253,250,245,.95);
  border-top: 1px solid var(--border-lt);
  box-shadow: 0 -8px 32px rgba(80,50,30,.1);
  backdrop-filter: blur(12px); z-index: 100;
}
.back-btn {
  border: 1.5px solid var(--border); border-radius: var(--r-sm);
  padding: 10px 18px; background: transparent; cursor: pointer;
  font-size: .83rem; font-family: var(--font-body); color: var(--text-mid);
  transition: all .16s;
}
.back-btn:hover { color: var(--text); border-color: var(--text-mid); background: var(--parchment); }
.price-mini { font-family: var(--font-serif); font-size: 1.1rem; color: var(--rose-deep); font-weight: 600; font-style: italic; }
.next-btn {
  background: linear-gradient(135deg, var(--rose-deep), var(--rose));
  color: white; border: none;
  border-radius: var(--r-sm); padding: 12px 28px;
  font-size: .88rem; font-weight: 600; font-family: var(--font-body);
  cursor: pointer; transition: all .2s; letter-spacing: .4px;
  box-shadow: 0 3px 14px rgba(168,85,112,.3);
}
.next-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(168,85,112,.4); }
.next-btn:disabled { opacity: .32; cursor: not-allowed; transform: none; box-shadow: none; }

/* ═══ CONFIRM / WHATSAPP ══════════════════════════════════════════ */
.confirm-btn {
  width: 100%; background: linear-gradient(135deg, var(--sage), #6a9470); color: white; border: none;
  border-radius: var(--r-md); padding: 15px; font-size: .95rem; font-weight: 600;
  font-family: var(--font-body); cursor: pointer; transition: all .2s; margin-top: 8px;
  box-shadow: 0 3px 14px rgba(122,158,126,.3);
}
.confirm-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(122,158,126,.4); }

.whatsapp-btn {
  width: 100%; background: linear-gradient(135deg, #25D366, #1dab56); color: white; border: none;
  border-radius: var(--r-md); padding: 16px; font-size: .95rem; font-weight: 600;
  font-family: var(--font-body); cursor: pointer; transition: all .2s; margin-top: 8px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 4px 18px rgba(37,211,102,.28);
  letter-spacing: .3px;
}
.whatsapp-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,.4); }
.wa-icon { display: flex; align-items: center; flex-shrink: 0; }

/* ═══ SUCCESS SCREEN ══════════════════════════════════════════════ */
.success-screen {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 40px 24px; text-align: center; gap: 14px;
  background: var(--cream);
}
.success-icon { font-size: 5.5rem; animation: bloom .8s cubic-bezier(.34,1.56,.64,1); }
@keyframes bloom {
  from { transform: scale(0.2) rotate(-20deg); opacity: 0; }
  to   { transform: scale(1) rotate(0); opacity: 1; }
}
.success-screen h2 { font-family: var(--font-script); font-size: 2.4rem; color: var(--rose-deep); }
.success-screen p { color: var(--text-mid); font-weight: 300; }
.success-sub { font-size: .875rem; max-width: 290px; line-height: 1.75; font-style: italic; color: var(--text-mid); }

/* ═══ ORNAMENT DIVIDER ════════════════════════════════════════════ */
.ornament-divider {
  display: flex; align-items: center; gap: 10px;
  margin: 22px 0 8px; color: var(--rose-lt); font-size: .8rem; letter-spacing: 3px;
}
.ornament-divider::before, .ornament-divider::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
}

/* ═══ BASKET UI ══════════════════════════════════════════════════ */
.landing-basket-bar {
  background: linear-gradient(135deg, var(--rose-pale), var(--lav-pale));
  border-bottom: 1px solid var(--rose-lt);
  padding: 10px 20px; font-size: .85rem; color: var(--text);
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-body);
}

.add-basket-btn {
  border: 1.5px solid var(--sage-lt); border-radius: var(--r-sm);
  padding: 10px 16px; background: var(--sage-pale); cursor: pointer;
  font-size: .82rem; font-family: var(--font-body); color: var(--sage);
  transition: all .16s; font-weight: 600; white-space: nowrap;
}
.add-basket-btn:hover { background: var(--sage-lt); color: var(--text); }

.basket-preview {
  background: var(--parchment); border: 1px solid var(--border-lt);
  border-radius: var(--r-md); padding: 14px 18px; margin-bottom: 16px;
}
.basket-preview-title {
  font-family: var(--font-serif); font-size: .95rem; font-weight: 600;
  color: var(--text); margin-bottom: 10px; font-style: italic;
}
.basket-preview-item {
  display: flex; justify-content: space-between;
  font-size: .83rem; padding: 3px 0; color: var(--text);
}
.basket-preview-item.total-row {
  font-family: var(--font-serif); font-size: 1rem; color: var(--rose-deep);
  font-weight: 600; margin-top: 6px; padding-top: 6px;
  border-top: 1px solid var(--border-lt);
}

.delivery-note {
  background: linear-gradient(135deg, #fff8e8, #fffde8);
  border: 1px solid #e8d080; border-radius: var(--r-sm);
  padding: 12px 16px; font-size: .85rem; color: #7a6010;
  margin-bottom: 14px; line-height: 1.5;
}

/* ═══ FORM VALIDATION ════════════════════════════════════════════ */
.field-error { border-color: var(--rose-deep) !important; }
.field-err-msg {
  font-size: .75rem; color: var(--rose-deep); margin: -6px 0 8px 2px;
  font-weight: 500;
}

/* ═══ SECTION ORNAMENT ════════════════════════════════════════════ */
.section-ornament {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; margin-bottom: 10px; color: var(--rose-lt); font-size: .9rem;
}

/* ═══ PRODUCT IMAGES ═════════════════════════════════════════════ */
.product-img {
  width: 64px; height: 64px; object-fit: cover;
  border-radius: 12px; display: block;
  box-shadow: 0 2px 8px rgba(80,40,30,.15);
  transition: transform .2s;
}
.product-card:hover .product-img { transform: scale(1.06); }

/* ═══ FILLERS GRID ═══════════════════════════════════════════════ */
.fillers-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.filler-row {
  display: flex; align-items: center; gap: 10px;
  background: var(--white); border: 1.5px solid var(--border-lt);
  border-radius: var(--r-sm); padding: 10px 14px;
  transition: border-color .18s, background .18s;
}
.filler-row.active { border-color: var(--sage-lt); background: var(--sage-pale); }
.filler-name { flex: 1; font-size: .85rem; font-weight: 500; color: var(--text); }
.filler-price { font-size: .75rem; color: var(--sage); font-weight: 600; margin-right: 8px; }

/* ═══ BASKET VIEW ════════════════════════════════════════════════ */
.basket-view-item {
  background: var(--white); border: 1.5px solid var(--border-lt);
  border-radius: var(--r-md); padding: 16px 18px; margin-bottom: 12px;
  box-shadow: var(--shadow);
}
.basket-view-item-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 10px;
}
.basket-view-label {
  font-family: var(--font-serif); font-size: 1.05rem; font-weight: 600;
  font-style: italic; color: var(--text);
}
.basket-view-price {
  font-family: var(--font-serif); font-size: 1.1rem; color: var(--rose-deep); font-weight: 600;
}
.basket-remove-btn {
  background: var(--rose-pale); border: 1px solid var(--rose-lt);
  border-radius: var(--r-sm); padding: 6px 14px; font-size: .78rem;
  color: var(--rose-deep); cursor: pointer; font-weight: 600;
  transition: all .16s;
}
.basket-remove-btn:hover { background: var(--rose-lt); }
.basket-view-total {
  display: flex; justify-content: space-between; align-items: center;
  background: linear-gradient(135deg, var(--rose-pale), var(--lav-pale));
  border: 1.5px solid var(--rose-lt); border-radius: var(--r-md);
  padding: 16px 20px; margin-top: 8px; font-weight: 700; font-size: 1rem;
  color: var(--text);
}

/* ═══ SAVED CUSTOMER BANNER ══════════════════════════════════════ */
.saved-customer-banner {
  background: linear-gradient(135deg, var(--sage-pale), #e8f8e8);
  border: 1px solid var(--sage-lt); border-radius: var(--r-sm);
  padding: 10px 14px; font-size: .82rem; color: var(--sage);
  margin-bottom: 16px; font-weight: 500; line-height: 1.5;
}
`;
