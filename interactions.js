// ── Joker search + rarity filter ──
const searchInput   = document.getElementById('joker-search');
const rarityBtns    = document.querySelectorAll('.rarity-btn');
const jokerLists    = document.querySelectorAll('ol[data-rarity]');
const jokerCount    = document.getElementById('joker-count');

const rarityH3 = {
    common:    document.getElementById('h3-common'),
    uncommon:  document.getElementById('h3-uncommon'),
    rare:      document.getElementById('h3-rare'),
    legendary: document.getElementById('h3-legendary'),
};

let activeRarity = 'all';

function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    let total = 0;

    jokerLists.forEach(ol => {
        const rarity = ol.dataset.rarity;
        const rarityMatch = activeRarity === 'all' || activeRarity === rarity;
        let visibleInSection = 0;

        ol.querySelectorAll('li').forEach(li => {
            const textMatch = !query || li.textContent.toLowerCase().includes(query);
            const show = rarityMatch && textMatch;
            li.style.display = show ? '' : 'none';
            if (show) { visibleInSection++; total++; }
        });

        // Show/hide the whole section + its h3
        const sectionVisible = rarityMatch && (visibleInSection > 0 || !query);
        ol.style.display = sectionVisible ? '' : 'none';
        if (rarityH3[rarity]) {
            rarityH3[rarity].style.display = sectionVisible ? '' : 'none';
        }
    });

    // Update count text
    if (query) {
        jokerCount.textContent = `${total} joker${total !== 1 ? 's' : ''} found`;
    } else {
        jokerCount.textContent = '';
    }
}

searchInput.addEventListener('input', applyFilters);

rarityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        rarityBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeRarity = btn.dataset.rarity;
        applyFilters();
    });
});

// ── Scroll-spy nav ──
const navLinks = document.querySelectorAll('#site-nav a');
const sections = ['section-jokers','section-blinds','section-tags','section-hands','section-decks','section-shop','section-vouchers','section-stakes','section-antes']
    .map(id => document.getElementById(id)).filter(Boolean);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

// Smooth scroll for nav links (offsets for sticky nav)
navLinks.forEach(a => {
    if (!a.getAttribute('href').startsWith('#')) return;
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            const offset = 60;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Back to top ──
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Collapsible h2 sections ──
document.querySelectorAll('h2').forEach(h2 => {
    h2.style.cursor = 'pointer';
    h2.title = 'Click to collapse';

    h2.addEventListener('click', () => {
        const collapsed = h2.classList.toggle('collapsed');
        h2.title = collapsed ? 'Click to expand' : 'Click to collapse';

        // Hide everything between this h2 and the next hr or h2
        let el = h2.nextElementSibling;
        while (el && el.tagName !== 'H2' && el.tagName !== 'HR') {
            // Don't hide the joker controls when collapsing
            if (el.id !== 'joker-controls') {
                el.style.display = collapsed ? 'none' : '';
            }
            el = el.nextElementSibling;
        }
    });
});

// ── List item hover highlight + Tooltip ──
(function () {
    const RARITY_COLOR = {
        common:    '#5bc8f5',
        uncommon:  '#4ecb5c',
        rare:      '#fe5f55',
        legendary: '#ffd700'
    };

    // Build joker lookup from minigame.js JOKERS array
    const jokerMap = {};
    if (typeof JOKERS !== 'undefined') {
        JOKERS.forEach(j => { jokerMap[j.name.toLowerCase()] = j; });
    }

    // Convert joker name to balatrowiki.org thumbnail URL
    function jokerImageUrl(name) {
        const ext      = name === 'Hologram' ? '.gif' : '.png';
        const filename = encodeURIComponent(name.replace(/ /g, '_')) + ext;
        return `https://balatrowiki.org/images/thumb/${filename}/80px-${filename}`;
    }

    // Create tooltip element
    const tip = document.createElement('div');
    tip.id = 'tooltip';
    tip.innerHTML = '<div class="tip-border"></div><div class="tip-body"></div>';
    document.body.appendChild(tip);
    const tipBorder = tip.querySelector('.tip-border');
    const tipBody   = tip.querySelector('.tip-body');

    function position(e) {
        let x = e.clientX + 18, y = e.clientY + 14;
        tip.style.left = x + 'px';
        tip.style.top  = y + 'px';
        requestAnimationFrame(() => {
            const r = tip.getBoundingClientRect();
            if (r.right  > window.innerWidth  - 8) tip.style.left = (e.clientX - r.width  - 14) + 'px';
            if (r.bottom > window.innerHeight - 8) tip.style.top  = (e.clientY - r.height - 14) + 'px';
        });
    }

    document.addEventListener('mousemove', e => {
        if (tip.classList.contains('visible')) position(e);
    });

    function show(e, borderColor, html) {
        tipBorder.style.background = borderColor;
        tipBody.innerHTML = html;
        tip.classList.add('visible');
        position(e);
    }
    function hide() { tip.classList.remove('visible'); }

    function jokerTip(li) {
        const ol     = li.closest('ol[data-rarity]');
        const rarity = ol ? ol.dataset.rarity : 'common';
        const color  = RARITY_COLOR[rarity] || '#d4d4e0';
        const text   = li.textContent;
        const name   = text.split(' - ')[0].trim();
        const joker  = jokerMap[name.toLowerCase()];
        const imgUrl = jokerImageUrl(name);

        let html = `<div class="tip-header">
            <img class="tip-img" src="${imgUrl}" alt="${name}" onerror="this.style.display='none'">
            <div class="tip-info">
                <div class="tip-name">${name}</div>
                <div class="tip-rarity" style="color:${color}">${rarity.charAt(0).toUpperCase() + rarity.slice(1)}</div>
            </div>
        </div>`;

        const parts = text.split(' - ');
        const desc = parts.length > 1 ? parts.slice(1).join(' - ') : '';
        if (desc) html += `<div class="tip-effect">${desc}</div>`;
        if (joker) {
            const stats = [];
            if (joker.chips)                      stats.push(`<span class="tip-chips">+${joker.chips} Chips</span>`);
            if (joker.mult)                        stats.push(`<span class="tip-mult">+${joker.mult} Mult</span>`);
            if (joker.xmult && joker.xmult !== 1) stats.push(`<span class="tip-xmult">×${joker.xmult} Mult</span>`);
            if (stats.length) html += `<div class="tip-stats">${stats.join('<span class="tip-dot"> · </span>')}</div>`;
        }
        return [color, html];
    }

    function genericTip(li) {
        const strong = li.querySelector('strong');
        const name   = strong ? strong.textContent : '';
        const text   = li.textContent.trim();
        const desc   = name ? text.slice(name.length).replace(/^\s*[-–—→]\s*/, '') : text;
        let html = '';
        if (name) html += `<div class="tip-name">${name}</div>`;
        if (desc) html += `<div class="tip-effect">${desc}</div>`;
        return ['var(--accent-red)', html];
    }

    document.querySelectorAll('li').forEach(li => {
        li.addEventListener('mouseenter', e => {
            li.classList.add('hovered');
            const isJoker = !!li.closest('ol[data-rarity]');
            const [color, html] = isJoker ? jokerTip(li) : genericTip(li);
            if (html) show(e, color, html);
        });
        li.addEventListener('mouseleave', () => {
            li.classList.remove('hovered');
            hide();
        });
    });
})();

// ── Highlight game terms in all li descriptions ──
(function() {
    const rules = [
        // Card enhancements
        [/\b(Gold [Cc]ards?)\b/g,    'term-gold'],
        [/\b(Lucky [Cc]ards?)\b/g,   'term-lucky'],
        [/\b(Steel [Cc]ards?)\b/g,   'term-steel'],
        [/\b(Glass [Cc]ards?)\b/g,   'term-glass'],
        [/\b(Stone [Cc]ards?)\b/g,   'term-stone'],
        [/\b(Wild [Cc]ards?)\b/g,    'term-wild'],
        [/\b(Bonus [Cc]ards?)\b/g,   'term-bonus'],
        [/\b(Mult [Cc]ards?)\b/g,    'term-mult-card'],
        // Seals
        [/\b(Gold Seal)\b/g,         'term-gold'],
        [/\b(Red Seal)\b/g,          'term-heart'],
        [/\b(Blue Seal)\b/g,         'term-spade'],
        [/\b(Purple Seal)\b/g,       'term-spectral'],
        // Suits
        [/\b(Diamond suit|Diamond cards?|Diamonds?)\b/g, 'term-diamond'],
        [/\b(Heart suit|Heart cards?|Hearts?)\b/g,       'term-heart'],
        [/\b(Spade suit|Spade cards?|Spades?)\b/g,       'term-spade'],
        [/\b(Club suit|Club cards?|Clubs?)\b/g,          'term-club'],
        // Consumable types
        [/\b(Tarot cards?)\b/g,      'term-tarot'],
        [/\b(Planet cards?)\b/g,     'term-planet'],
        [/\b(Spectral cards?)\b/g,   'term-spectral'],
        // Card editions
        [/\b(Foil)\b/g,              'term-foil'],
        [/\b(Holographic)\b/g,       'term-holo'],
        [/\b(Polychrome)\b/g,        'term-poly'],
        [/\b(Negative)\b/g,          'term-negative'],
        // Economy
        [/(\$\d+)/g,                 'term-money'],
        // Blinds
        [/\b(Boss Blind)\b/g,        'term-boss-blind'],
        // Face cards & ranks
        [/\b(face cards?)\b/g,       'term-face-card'],
        [/\b(Joker slots?)\b/g,      'term-joker-slot'],
        // RNG / probability
        [/(1 in \d+ chance)\b/g,     'term-rng'],
    ];

    document.querySelectorAll('li').forEach(li => {
        // Walk only text nodes to avoid breaking existing HTML spans
        const walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) {
            // Skip text inside already-styled spans
            if (!walker.currentNode.parentElement.closest('span')) nodes.push(walker.currentNode);
        }
        nodes.forEach(textNode => {
            let html = textNode.textContent;
            let changed = false;
            rules.forEach(([re, cls]) => {
                const next = html.replace(re, `<span class="${cls}">$1</span>`);
                if (next !== html) { html = next; changed = true; }
            });
            if (changed) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = html;
                textNode.replaceWith(...Array.from(wrapper.childNodes));
            }
        });
    });
})();


// ── Wrap chip/mult/xmult numbers in stat spans ──
document.querySelectorAll('ol[data-rarity] li').forEach(li => {
    li.innerHTML = li.innerHTML
        .replace(/(\+\d[\d,]*\s*Chips)/g, '<span class="stat-chips">$1</span>')
        .replace(/(\+\d[\d,]*\s*Mult)/g, '<span class="stat-mult">$1</span>')
        .replace(/(X[\d.]+\s*Mult)/g, '<span class="stat-xmult">$1</span>');
});
