const JOKERS = [
    // Common
    { name: "Joker",          rarity: "common",    effect: "+4 Mult",                    mult: 4 },
    { name: "Jolly Joker",    rarity: "common",    effect: "+8 Mult (Pair)",              mult: 8,   condition: "pair" },
    { name: "Zany Joker",     rarity: "common",    effect: "+12 Mult (Three of a Kind)",  mult: 12,  condition: "three_of_a_kind" },
    { name: "Mad Joker",      rarity: "common",    effect: "+10 Mult (Two Pair)",          mult: 10,  condition: "two_pair" },
    { name: "Crazy Joker",    rarity: "common",    effect: "+12 Mult (Straight)",          mult: 12,  condition: "straight" },
    { name: "Droll Joker",    rarity: "common",    effect: "+10 Mult (Flush)",             mult: 10,  condition: "flush" },
    { name: "Sly Joker",      rarity: "common",    effect: "+50 Chips (Pair)",             chips: 50,  condition: "pair" },
    { name: "Wily Joker",     rarity: "common",    effect: "+100 Chips (Three of a Kind)", chips: 100, condition: "three_of_a_kind" },
    { name: "Clever Joker",   rarity: "common",    effect: "+80 Chips (Two Pair)",         chips: 80,  condition: "two_pair" },
    { name: "Devious Joker",  rarity: "common",    effect: "+100 Chips (Straight)",        chips: 100, condition: "straight" },
    { name: "Crafty Joker",   rarity: "common",    effect: "+80 Chips (Flush)",            chips: 80,  condition: "flush" },
    { name: "Cavendish",      rarity: "common",    effect: "X3 Mult",                      xmult: 3 },
    { name: "Ice Cream",      rarity: "common",    effect: "+100 Chips",                   chips: 100 },
    { name: "Popcorn",        rarity: "common",    effect: "+20 Mult",                     mult: 20 },
    { name: "Banner",         rarity: "common",    effect: "+90 Chips (3 discards)",       chips: 90 },
    { name: "Mystic Summit",  rarity: "common",    effect: "+15 Mult (0 discards left)",   mult: 15 },
    { name: "Misprint",       rarity: "common",    effect: "+0–23 Mult (avg ~12)",         mult: 12 },
    { name: "Gros Michel",    rarity: "common",    effect: "+15 Mult",                     mult: 15 },
    { name: "Abstract Joker", rarity: "common",    effect: "+3 Mult per Joker (~+9)",      mult: 9 },
    { name: "Half Joker",     rarity: "common",    effect: "+20 Mult",                     mult: 20 },
    { name: "Blue Joker",     rarity: "common",    effect: "+104 Chips",                   chips: 104 },
    { name: "Shoot the Moon", rarity: "common",    effect: "+39 Mult (3 Queens)",          mult: 39 },
    { name: "Swashbuckler",   rarity: "common",    effect: "+10 Mult",                     mult: 10 },
    { name: "Green Joker",    rarity: "common",    effect: "+5 Mult",                      mult: 5 },
    // Uncommon
    { name: "Constellation",  rarity: "uncommon",  effect: "X1.5 Mult",                   xmult: 1.5 },
    { name: "Photograph",     rarity: "uncommon",  effect: "X2 Mult (face card)",          xmult: 2 },
    { name: "Ramen",          rarity: "uncommon",  effect: "X2 Mult",                      xmult: 2 },
    { name: "Loyalty Card",   rarity: "uncommon",  effect: "X4 Mult",                      xmult: 4 },
    { name: "Blackboard",     rarity: "uncommon",  effect: "X3 Mult (all ♠/♣ in hand)",   xmult: 3,  condition: "flush" },
    { name: "Onyx Agate",     rarity: "uncommon",  effect: "+7 Mult",                      mult: 7 },
    { name: "Arrowhead",      rarity: "uncommon",  effect: "+50 Chips",                    chips: 50 },
    { name: "Acrobat",        rarity: "uncommon",  effect: "X3 Mult (final hand)",         xmult: 3 },
    { name: "Flash Card",     rarity: "uncommon",  effect: "+10 Mult",                     mult: 10 },
    { name: "Fibonacci",      rarity: "uncommon",  effect: "+24 Mult",                     mult: 24 },
    { name: "Steel Joker",    rarity: "uncommon",  effect: "X0.2 Mult per Steel Card (~X1.6)", xmult: 1.6 },
    { name: "Obelisk",        rarity: "uncommon",  effect: "X1.4 Mult",                    xmult: 1.4 },
    { name: "Bull",           rarity: "uncommon",  effect: "+40 Chips",                    chips: 40 },
    { name: "Erosion",        rarity: "uncommon",  effect: "+20 Mult",                     mult: 20 },
    { name: "Bloodstone",     rarity: "uncommon",  effect: "X1.5 Mult",                    xmult: 1.5 },
    { name: "Runner",         rarity: "uncommon",  effect: "+15 Chips (Straight)",         chips: 15, condition: "straight" },
    { name: "Spare Trousers", rarity: "uncommon",  effect: "+2 Mult (Two Pair)",           mult: 2,   condition: "two_pair" },
    // Rare
    { name: "Baron",          rarity: "rare",      effect: "X1.5 Mult (Kings in hand)",   xmult: 1.5 },
    { name: "Baseball Card",  rarity: "rare",      effect: "X1.5 Mult (Uncommons)",       xmult: 1.5 },
    { name: "The Duo",        rarity: "rare",      effect: "X2 Mult (Pair)",               xmult: 2,  condition: "pair" },
    { name: "The Trio",       rarity: "rare",      effect: "X3 Mult (Three of a Kind)",   xmult: 3,  condition: "three_of_a_kind" },
    { name: "The Family",     rarity: "rare",      effect: "X4 Mult (Four of a Kind)",    xmult: 4,  condition: "four_of_a_kind" },
    { name: "The Order",      rarity: "rare",      effect: "X3 Mult (Straight)",           xmult: 3,  condition: "straight" },
    { name: "The Tribe",      rarity: "rare",      effect: "X2 Mult (Flush)",              xmult: 2,  condition: "flush" },
    { name: "Stuntman",       rarity: "rare",      effect: "+250 Chips",                   chips: 250 },
    { name: "Bootstraps",     rarity: "uncommon",  effect: "+2 Mult per $5 held (scales with money)", mult: 0 },
    { name: "Campfire",       rarity: "rare",      effect: "X1.5 Mult",                    xmult: 1.5 },
    // Legendary
    { name: "Triboulet",      rarity: "legendary", effect: "X2 Mult (Kings/Queens)",      xmult: 2 },
    { name: "Canio",          rarity: "legendary", effect: "X1 Mult + X1 per face destroyed", xmult: 1 },
    { name: "Yorick",         rarity: "legendary", effect: "X1 Mult (growing)",            xmult: 1 },
    { name: "Chicot",         rarity: "legendary", effect: "Disables Boss Blind",          chips: 0 },
    { name: "Perkeo",         rarity: "legendary", effect: "Creates Negative copy",        chips: 0 },
];

const HANDS = [
    { name: "High Card",       chips: 5,   mult: 1,  type: "high_card" },
    { name: "Pair",            chips: 10,  mult: 2,  type: "pair" },
    { name: "Two Pair",        chips: 20,  mult: 2,  type: "two_pair" },
    { name: "Three of a Kind", chips: 30,  mult: 3,  type: "three_of_a_kind" },
    { name: "Straight",        chips: 30,  mult: 4,  type: "straight" },
    { name: "Flush",           chips: 35,  mult: 4,  type: "flush" },
    { name: "Full House",      chips: 40,  mult: 4,  type: "full_house" },
    { name: "Four of a Kind",  chips: 60,  mult: 7,  type: "four_of_a_kind" },
    { name: "Straight Flush",  chips: 100, mult: 8,  type: "straight_flush" },
    { name: "Royal Flush",     chips: 100, mult: 8,  type: "royal_flush" },
    { name: "Five of a Kind",  chips: 120, mult: 12, type: "five_of_a_kind" },
    { name: "Flush House",     chips: 140, mult: 14, type: "flush_house" },
    { name: "Flush Five",      chips: 160, mult: 16, type: "flush_five" },
];

// Which conditions each hand satisfies
const HAND_CONDITIONS = {
    high_card:         [],
    pair:              ["pair"],
    two_pair:          ["pair", "two_pair"],
    three_of_a_kind:   ["three_of_a_kind"],
    straight:          ["straight"],
    flush:             ["flush"],
    full_house:        ["pair", "two_pair", "three_of_a_kind"],
    four_of_a_kind:    ["four_of_a_kind"],
    straight_flush:    ["straight", "flush"],
    royal_flush:       ["straight", "flush"],
    five_of_a_kind:    ["three_of_a_kind", "four_of_a_kind", "five_of_a_kind"],
    flush_house:       ["pair", "two_pair", "three_of_a_kind", "flush"],
    flush_five:        ["three_of_a_kind", "four_of_a_kind", "five_of_a_kind", "flush"],
};

const RARITY_COLORS = {
    common:    "#5b9bd5",
    uncommon:  "#4ecdc4",
    rare:      "#ff6b6b",
    legendary: "#c084fc",
};

let slots = [null, null, null];

function pickUnique(exclude = []) {
    const pool = JOKERS.filter(j => !exclude.includes(j.name));
    return pool[Math.floor(Math.random() * pool.length)];
}

function rerollAll() {
    const picked = [];
    for (let i = 0; i < 3; i++) {
        const joker = pickUnique(picked.map(j => j.name));
        slots[i] = joker;
        picked.push(joker);
    }
    renderSlots();
    clearResult();
}

function rerollSlot(i) {
    const used = slots.filter((j, idx) => j && idx !== i).map(j => j.name);
    slots[i] = pickUnique(used);
    renderSlots();
    clearResult();
}

function renderSlots() {
    for (let i = 0; i < 3; i++) {
        const joker = slots[i];
        const el = document.getElementById(`joker-slot-${i}`);
        if (!joker) { el.innerHTML = '—'; continue; }
        const color = RARITY_COLORS[joker.rarity];
        el.style.borderColor = color;
        el.innerHTML = `
            <div class="jc-name" style="color:${color}">${joker.name}</div>
            <div class="jc-rarity">${joker.rarity}</div>
            <div class="jc-effect">${joker.effect}</div>
            <button class="jc-reroll" onclick="rerollSlot(${i})" title="Reroll this joker">↺</button>
        `;
    }
}

function jokerActive(joker, handType) {
    if (!joker.condition) return true;
    return (HAND_CONDITIONS[handType] || []).includes(joker.condition);
}

function playHand() {
    const handType = document.getElementById("hand-select").value;
    const hand = HANDS.find(h => h.type === handType);

    let chips = hand.chips;
    let mult = hand.mult;
    let xmults = [];

    const lines = [
        `<div class="calc-row calc-base">Base &nbsp;<span>${hand.chips} Chips &nbsp;×&nbsp; ${hand.mult} Mult</span></div>`
    ];

    for (const joker of slots) {
        if (!joker) continue;
        const active = jokerActive(joker, handType);
        if (active) {
            if (joker.chips) chips += joker.chips;
            if (joker.mult)  mult  += joker.mult;
            if (joker.xmult && joker.xmult !== 1) xmults.push({ name: joker.name, val: joker.xmult });
        }
        const color = RARITY_COLORS[joker.rarity];
        let valueStr = joker.chips  ? `+${joker.chips} Chips`
                     : joker.mult   ? `+${joker.mult} Mult`
                     : joker.xmult  ? `×${joker.xmult} Mult`
                     : "No score effect";
        const inactive = active ? "" : `<em class="inactive-tag"> (inactive)</em>`;
        lines.push(`
            <div class="calc-row ${active ? 'calc-active' : 'calc-dimmed'}">
                <span style="color:${color}">${joker.name}</span>${inactive}
                <span>${active ? valueStr : '—'}</span>
            </div>
        `);
    }

    const xmultTotal = xmults.reduce((acc, x) => acc * x.val, 1);
    const total = Math.round(chips * mult * xmultTotal);

    let formulaParts = [`${chips}`, `×`, `${mult}`];
    if (xmults.length) formulaParts.push(`×`, xmults.map(x => x.val).join(' × '));

    document.getElementById("score-breakdown").innerHTML = lines.join("");
    document.getElementById("score-final").innerHTML = `
        <div class="calc-formula">${chips} Chips × ${mult} Mult${xmults.length ? ' × ' + xmults.map(x => x.val).join(' × ') : ''}</div>
        <div class="calc-total">${total.toLocaleString()}</div>
    `;
    document.getElementById("score-result").hidden = false;
}

function clearResult() {
    document.getElementById("score-result").hidden = true;
}

// Panel toggle
const panelToggleBtn = document.getElementById("panel-toggle-btn");
const jokerPanel = document.getElementById("joker-panel");

panelToggleBtn.addEventListener("click", () => {
    jokerPanel.classList.toggle("open");
    panelToggleBtn.style.display = jokerPanel.classList.contains("open") ? "none" : "";
});
document.getElementById("panel-close-btn").addEventListener("click", () => {
    jokerPanel.classList.remove("open");
    panelToggleBtn.style.display = "";
});

// Populate hand select
const select = document.getElementById("hand-select");
HANDS.forEach(h => {
    const opt = document.createElement("option");
    opt.value = h.type;
    opt.textContent = `${h.name}  (${h.chips}c × ${h.mult}m)`;
    select.appendChild(opt);
});

document.getElementById("reroll-btn").addEventListener("click", rerollAll);
document.getElementById("play-btn").addEventListener("click", playHand);

rerollAll();
