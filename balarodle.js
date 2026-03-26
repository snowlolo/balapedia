// ── Balarodle ──
// Uses ALL_JOKERS + ABILITY_LABELS from joker-data.js

(function () {
    // Daily target — same joker for everyone, seeded from June 8 2024
    const BASE_MS  = new Date('2024-06-08').getTime();
    const dayIndex = Math.floor((Date.now() - BASE_MS) / 86400000);

    let target      = ALL_JOKERS[dayIndex % ALL_JOKERS.length];
    let guessesLeft = 10;
    let won         = false;
    let guessed     = new Set();

    const input        = document.getElementById('brd-input');
    const guessBtn     = document.getElementById('brd-guess-btn');
    const newBtn       = document.getElementById('brd-new-btn');
    const guessesEl    = document.getElementById('brd-guesses');
    const resultEl     = document.getElementById('brd-result');
    const mysteryImg   = document.getElementById('brd-mystery-img');
    const mysteryName  = document.getElementById('brd-mystery-name');

    const RARITY_CLS = {
        'Common':    'brd-common',
        'Uncommon':  'brd-uncommon',
        'Rare':      'brd-rare',
        'Legendary': 'brd-legendary',
    };

    function jokerImageUrl(name) {
        const ext      = name === 'Hologram' ? '.gif' : '.png';
        const filename = encodeURIComponent(name.replace(/ /g, '_')) + ext;
        return `https://balatrowiki.org/images/thumb/${filename}/80px-${filename}`;
    }

    // Cost comparison — exact=correct, ±2=close, else high/low with arrow
    function cmpCost(guess, tgt) {
        guess = +guess; tgt = +tgt;
        if (guess === tgt) return { cls: 'brd-correct', label: `$${guess}` };
        const diff = Math.abs(guess - tgt);
        const arrow = guess > tgt ? ' ↓' : ' ↑';
        if (diff <= 2) return { cls: 'brd-close', label: `$${guess}${arrow}` };
        return { cls: 'brd-wrong', label: `$${guess}${arrow}` };
    }

    function makeGuess() {
        if (won || guessesLeft <= 0) return;
        const name  = input.value.trim();
        const joker = ALL_JOKERS.find(j => j.name.toLowerCase() === name.toLowerCase());

        if (!joker)            { shake(); return; }
        if (guessed.has(joker.name)) { shake(); return; }

        guessed.add(joker.name);
        guessesLeft--;
        input.value = '';
        suggestions.innerHTML = '';

        const nameOk    = joker.name    === target.name;
        const costR     = cmpCost(joker.cost, target.cost);
        const rarityOk  = joker.rarity  === target.rarity;
        const abilityOk = joker.ability === target.ability;
        const scalingOk = joker.scaling === target.scaling;
        const rngOk     = joker.rng     === target.rng;

        // Name badge uses rarity color unless correct (green)
        const nameCls = nameOk ? 'brd-correct' : (RARITY_CLS[joker.rarity] || 'brd-dark');

        const row = document.createElement('div');
        row.className = 'brd-guess';
        row.innerHTML = `
            <div class="brd-badge brd-guess-name ${nameCls}">${joker.name}</div>
            <div class="brd-guess-body">
                <div class="brd-guess-img-wrap">
                    <img src="${jokerImageUrl(joker.name)}" alt="${joker.name}" onerror="this.style.opacity='0'">
                </div>
                <div class="brd-guess-attrs">
                    <div class="brd-attr-row">
                        <div class="brd-badge brd-attr ${costR.cls}">
                            <span class="brd-attr-label">Cost</span>
                            <span class="brd-attr-val">${costR.label}</span>
                        </div>
                        <div class="brd-badge brd-attr ${rarityOk ? 'brd-correct' : 'brd-wrong'}">
                            <span class="brd-attr-label">Rarity</span>
                            <span class="brd-attr-val">${joker.rarity}</span>
                        </div>
                    </div>
                    <div class="brd-attr-row">
                        <div class="brd-badge brd-attr ${abilityOk ? 'brd-correct' : 'brd-wrong'}">
                            <span class="brd-attr-label">Ability</span>
                            <span class="brd-attr-val">${ABILITY_LABELS[joker.ability]}</span>
                        </div>
                        <div class="brd-badge brd-attr ${scalingOk ? 'brd-correct' : 'brd-wrong'}">
                            <span class="brd-attr-label">Scaling</span>
                            <span class="brd-attr-val">${joker.scaling ? 'Yes' : 'No'}</span>
                        </div>
                        <div class="brd-badge brd-attr ${rngOk ? 'brd-correct' : 'brd-wrong'}">
                            <span class="brd-attr-label">RNG</span>
                            <span class="brd-attr-val">${joker.rng ? 'Yes' : 'No'}</span>
                        </div>
                    </div>
                </div>
            </div>`;

        guessesEl.appendChild(row);

        if (nameOk) {
            won = true;
            revealTarget();
            showResult(true);
        } else if (guessesLeft <= 0) {
            revealTarget();
            showResult(false);
        }
    }

    function revealTarget() {
        mysteryImg.src = jokerImageUrl(target.name);
        mysteryName.textContent = target.name;
        mysteryName.className = `brd-badge brd-mystery-name ${RARITY_CLS[target.rarity] || 'brd-dark'}`;
        input.disabled    = true;
        guessBtn.disabled = true;
        newBtn.hidden     = false;
    }

    function showResult(didWin) {
        resultEl.hidden    = false;
        resultEl.className = didWin ? 'brd-win brd-badge' : 'brd-loss brd-badge';
        const n = 6 - guessesLeft;
        resultEl.textContent = didWin
            ? `YOU WIN! Solved in ${n} guess${n !== 1 ? 'es' : ''}!`
            : `OUT OF GUESSES! The joker was ${target.name}.`;
    }

    function shake() {
        input.classList.add('brd-shake');
        setTimeout(() => input.classList.remove('brd-shake'), 400);
    }

    guessBtn.addEventListener('click', makeGuess);
    newBtn.addEventListener('click', () => {
        // Shift to next joker for "New Game" (cycling forward)
        const nextIdx = (ALL_JOKERS.indexOf(target) + 1) % ALL_JOKERS.length;
        target         = ALL_JOKERS[nextIdx];
        guessesLeft    = 10;
        won            = false;
        guessed        = new Set();
        guessesEl.innerHTML = '';
        resultEl.hidden     = true;
        input.value         = '';
        input.disabled      = false;
        guessBtn.disabled   = false;
        newBtn.hidden       = true;
        mysteryImg.src = 'https://www.balatrodle.com/jokers/undiscovered.png';
        mysteryName.textContent = '?????';
        mysteryName.className   = 'brd-badge brd-mystery-name brd-dark';
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') makeGuess(); });

    // Autocomplete
    const suggestions = document.createElement('ul');
    suggestions.id = 'brd-suggestions';
    document.getElementById('brd-input-wrap').appendChild(suggestions);

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        suggestions.innerHTML = '';
        if (!q) return;
        ALL_JOKERS
            .filter(j => j.name.toLowerCase().includes(q) && !guessed.has(j.name))
            .slice(0, 8)
            .forEach(j => {
                const li = document.createElement('li');
                li.textContent = j.name;
                li.addEventListener('mousedown', () => {
                    input.value = j.name;
                    suggestions.innerHTML = '';
                });
                suggestions.appendChild(li);
            });
    });

    input.addEventListener('blur', () => setTimeout(() => suggestions.innerHTML = '', 150));
})();
