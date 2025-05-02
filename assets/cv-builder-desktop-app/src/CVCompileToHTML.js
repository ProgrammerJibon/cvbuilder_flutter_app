export const Design1HTML = ({
    name,
    address,
    email,
    link,
    summary,
    skills,
    experience,
    education,
    certifications,
    involvement,
    awards,
    references,
}) => {
    let html = `<div class="font-sans p-6 leading-relaxed text-sm sm:text-base">`;

    if (name || address || email || link) {
        if (name) html += `<h2 class="text-md font-bold text-center">${name}</h2>`;
        const contactLine = [address, email, link].filter(Boolean).join(' | ');
        if (contactLine) html += `<p class=" text-xs mb-4 text-center">${contactLine}</p>`;
    }

    if (summary) {
        html += `<h3 class="text-md font-semibold mt-4 mb-1">SUMMARY</h3><p class="text-xs">${summary}</p>`;
    }

    if (skills && skills.length > 0) {
        html += `<h3 class="text-md font-semibold mt-4 mb-1">SKILLS</h3><p>`;
        skills.forEach((s) => {
            if (s && s.sn && s.pl) {
                html += `${s.sn} (${s.pl}), `;
            }
        });
        html += `</p>`;
    }

    if (experience && experience.length > 0) {
        html += `<h3 class="text-md font-semibold mt-4 mb-1">EXPERIENCE</h3><ul class="list-disc list-inside">`;
        experience.forEach((e) => {
            if (e && e.c && e.p && e.sy && e.ey) {
                html += `<div class="text-xs">${e.c} | ${e.p} | ${e.sy} - ${e.ey}</div>`;
            }
        });
        html += `</ul>`;
    }

    if (education && education.length > 0) {
        html += `<h3 class="text-md font-semibold mt-4 mb-1">EDUCATION</h3><ul class="list-disc list-inside">`;
        education.forEach((ed) => {
            if (ed && ed.d && ed.i && ed.sy && ed.ey) {
                html += `<div class="text-xs">${ed.d} | ${ed.i} | ${ed.sy} - ${ed.ey}</div>`;
            }
        });
        html += `</ul>`;
    }

    if (certifications && certifications.length > 0) {
        html += `<h3 class="text-md font-semibold mt-4 mb-1">CERTIFICATIONS</h3><ul class="list-disc list-inside">`;
        certifications.forEach((c) => {
            if (c && c.t && c.a && c.y) {
                html += `<div class="text-xs">${c.t} | ${c.a} | ${c.y}</div>`;
            }
        });
        html += `</ul>`;
    }

    if (involvement && involvement.length > 0) {
        html += `<h3 class="text-md font-semibold mt-4 mb-1">INVOLVEMENT</h3><ul class="list-disc list-inside">`;
        involvement.forEach((iv) => {
            if (iv && iv.o && iv.r && iv.d) {
                html += `<div class="text-xs">${iv.o} | ${iv.r} | ${iv.d}</div>`;
            }
        });
        html += `</ul>`;
    }

    if (awards && awards.length > 0) {
        html += `<h3 class="text-md font-semibold mt-4 mb-1">WINNINGS & AWARDS</h3><ul class="list-disc list-inside">`;
        awards.forEach((a) => {
            if (a && a.t && a.y && a.d) {
                html += `<div class="text-xs">${a.t} | ${a.y} | ${a.d}</div>`;
            }
        });
        html += `</ul>`;
    }

    if (references && references.length > 0) {
        html += `<h3 class="text-md font-semibold mt-4 mb-1">REFERENCES</h3><ul class="list-disc list-inside">`;
        references.forEach((r) => {
            if (r && r.n && r.p && r.c) {
                html += `<div class="text-xs">${r.n} | ${r.p} | ${r.c}</div>`;
            }
        });
        html += `</ul>`;
    }

    html += `</div>`;
    return html;
};

export default Design1HTML;
