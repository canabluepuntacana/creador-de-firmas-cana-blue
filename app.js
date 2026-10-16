/* Canablue Signature Creator — table-based HTML, 100% email-client compatible */
const $ = id => document.getElementById(id);
const state = {
  tpl: 'principal',
  color: '#174176',
  nombre: 'Pamela Núñez', cargo: 'Broker Owner', zona: 'Punta Cana · Cap Cana',
  tel: '+1 (809) 975-3900', email: 'pamela@canablue.com', web: 'canablue.com',
  dir: 'Local P104, Plaza San Juan Shopping Center, Bávaro, Punta Cana',
  dirUrl: 'https://www.google.com/maps/place/Canablue+Real+Estate/data=!4m2!3m1!1s0x0:0x14220523874e3b46?sa=X&ved=1t:2428&ictx=111',
  listings: 'https://canablue.com/author/pamepam/',
  linkedin: 'https://do.linkedin.com/in/pamela-nunez-0280814a',
  instagram: 'https://www.instagram.com/pamela_canablue.rd',
  whatsapp: 'https://wa.me/18096080943',
  foto: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792087360/Firmas_de_correo_Electronico_pamela.png',
  logo: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792071937/10._logo-blue-google.png',
  certs: { crs: true, aei: true, realtor: true, sr23: true, sr24: true, lux: false },
  certLinks: { crs: '', aei: '', realtor: '', sr23: '', sr24: '', lux: '' },
  customCerts: [],
  certsAlign: 'center',
  extra: [],
  iconStyle: 'solid',
  vis: { foto: true, zona: true, social: true, certs: true, legal: true, listings: true },
  legal: 'The information in this email is confidential and intended solely for its recipient.'
};
const BRAND = { instagram: '#000000', whatsapp: '#25D366', linkedin: '#0A66C2' };
// Logo picker for extra links: official-style white glyph on brand color (email-safe PNG)
const NETWORKS = {
  facebook: { label: 'Facebook', bg: '#1877F2', slug: 'facebook-f', img: 'https://img.icons8.com/material-outlined/48/ffffff/facebook-f.png' },
  instagram: { label: 'Instagram', bg: '#000000', slug: 'instagram', img: 'https://img.icons8.com/material-outlined/48/ffffff/instagram.png' },
  whatsapp: { label: 'WhatsApp', bg: '#25D366', slug: 'whatsapp', img: 'https://img.icons8.com/material-outlined/48/ffffff/whatsapp.png' },
  linkedin: { label: 'LinkedIn', bg: '#0A66C2', slug: 'linkedin', img: 'https://img.icons8.com/material-outlined/48/ffffff/linkedin.png' },
  x: { label: 'X (Twitter)', bg: '#000000', slug: 'twitterx', img: 'https://img.icons8.com/material-outlined/48/ffffff/twitterx.png' },
  tiktok: { label: 'TikTok', bg: '#000000', slug: 'tiktok', img: 'https://img.icons8.com/material-outlined/48/ffffff/tiktok.png' },
  youtube: { label: 'YouTube', bg: '#FF0000', slug: 'youtube-play', img: 'https://img.icons8.com/material-outlined/48/ffffff/youtube-play.png' },
  telegram: { label: 'Telegram', bg: '#229ED9', slug: 'telegram-app', img: 'https://img.icons8.com/material-outlined/48/ffffff/telegram-app.png' },
  pinterest: { label: 'Pinterest', bg: '#E60023', slug: 'pinterest', img: 'https://img.icons8.com/material-outlined/48/ffffff/pinterest.png' },
  website: { label: 'Website / custom link', bg: '#174176', slug: 'link', img: 'https://img.icons8.com/material-outlined/48/ffffff/link.png' }
};
function networkGlyph(n, hex) {
  return `https://img.icons8.com/material-outlined/48/${hex}/${n.slug}.png`;
}
// Extra-link button in 3 shapes: circle (solid) / square (solid) / outline (line only, no fill)
// Global social icon style (solid / rounded / outline / frame / line / soft),
// always in official brand colors. Glyphs are thick official-style line logos.
function socialIcon(url, key, style, c) {
  const n = NETWORKS[key] || NETWORKS.website;
  const bg = key === 'website' ? c : (n.bg || c);
  const hex = bg.charAt(0) === '#' ? bg.slice(1) : bg;
  const box = 'display:inline-block;text-align:center;vertical-align:middle;';
  const im = (src, s, mt) => `<img src="${src}" width="${s}" height="${s}" alt="${n.label}" style="display:inline-block;width:${s}px;height:${s}px;margin-top:${mt}px;border:0;">`;
  if (style === 'rounded') return `<a href="${url}" target="_blank" style="${box}width:28px;height:28px;border-radius:8px;background-color:${bg};">${im(n.img, 15, 6)}</a>`;
  if (style === 'outline') return `<a href="${url}" target="_blank" style="${box}width:26px;height:26px;border-radius:50%;border:1px solid ${bg};background-color:transparent;">${im(networkGlyph(n, hex), 14, 6)}</a>`;
  if (style === 'frame') return `<a href="${url}" target="_blank" style="${box}width:26px;height:26px;border-radius:8px;border:1px solid ${bg};background-color:transparent;">${im(networkGlyph(n, hex), 14, 6)}</a>`;
  if (style === 'line') return `<a href="${url}" target="_blank" style="${box}">${im(networkGlyph(n, hex), 24, 0)}</a>`;
  if (style === 'soft') return `<a href="${url}" target="_blank" style="${box}width:28px;height:28px;border-radius:50%;background-color:${hexA(bg, .14)};">${im(networkGlyph(n, hex), 15, 6)}</a>`;
  return socialBtn(url, bg, n.img, n.label);
}
function extraBtn(e, c, style) { return socialIcon(e.url, e.icon, style || 'solid', c); }
// Fixed official certification artwork (uploaed to Cloudinary)
const CERT_IMG = {
  crs: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-CRS.png',
  aei: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-AEI.png',
  realtor: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-REALTOR.png',
  sr23: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-Best-of-DR-2023.png',
  sr24: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-Best-of-DR-2024.png',
  lux: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-Luxury-Homes-Expert.png'
};
const dataCache = {}; // local asset -> dataURL (so the copied signature carries its images)

async function toDataURL(url) {
  if (!url || url.startsWith('http') || url.startsWith('data:')) return url;
  if (dataCache[url]) return dataCache[url];
  try {
    const r = await fetch(url); const b = await r.blob();
    const d = await new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); });
    dataCache[url] = d; return d;
  } catch { return url; }
}
const cleanHex = h => (h || '#174176').trim();
const hexA = (hex, a) => {
  const h = String(hex || '').replace('#', '');
  const full = h.length === 3 ? h.split('').map(x => x + x).join('') : h;
  const n = parseInt(full, 16) || 0;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
// Modern outline (line) icons, matching the Pamela reference. PNG = email-safe
// (email clients block SVG/Iconify, so brand/official logos ship as PNG images).
const lineIcon = (name, colorHex) => `https://img.icons8.com/ios/50/${colorHex.replace('#', '')}/${name}.png`;
const whiteGlyph = name => `https://img.icons8.com/ios-filled/50/ffffff/${name}.png`;

function contactRow(iconUrl, contentHtml) {
  return `<tr><td width="22" style="vertical-align:middle;padding:3px 0;"><img src="${iconUrl}" width="15" height="15" style="display:block;width:15px;height:15px;" alt=""></td><td style="vertical-align:middle;font-size:12px;line-height:17px;color:#222222;font-family:Arial,Helvetica,sans-serif;">${contentHtml}</td></tr>`;
}
function socialBtn(href, bg, iconUrl, alt) {
  return `<a href="${href}" target="_blank" style="display:inline-block;width:28px;height:28px;border-radius:50%;background-color:${bg};text-align:center;vertical-align:middle;"><img src="${iconUrl}" width="15" height="15" alt="${alt}" style="display:inline-block;width:15px;height:15px;margin-top:6px;border:0;"></a>`;
}
// Pill button with modern home icon, placed next to the Canablue logo
function viewPropsBtn(listings, c) {
  if (!listings) return '';
  return `<a href="${listings}" target="_blank" style="display:inline-block;background-color:${c};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;text-decoration:none;border-radius:20px;padding:8px 16px;white-space:nowrap;"><img src="${whiteGlyph('home')}" width="14" height="14" alt="" style="display:inline-block;width:14px;height:14px;vertical-align:-2px;border:0;">&nbsp;View My Listings</a>`;
}
// Plain clean text, no pill background or border
function zonaText(zona) {
  return `<div style="margin-top:5px;font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:#5b6b84;line-height:16px;">Specializing in ${zona}</div>`;
}
// Logos only, no heading label
const CERT_DEFS = [
  ['crs', 'CRS'], ['aei', 'AEI'], ['realtor', 'REALTOR'],
  ['sr23', 'Best of DR 2023'], ['sr24', 'Best of DR 2024'], ['lux', 'Luxury Homes Expert']
];
function certImgTag(src, alt, link, h) {
  const img = `<img src="${src}" height="${h}" style="height:${h}px;width:auto;display:inline-block;border:0;" alt="${alt}">`;
  return link ? `<a href="${link}" target="_blank" style="text-decoration:none;border:0;">${img}</a>` : img;
}
function certImgs(certs, links, customs, h) {
  const out = CERT_DEFS.filter(([k]) => certs[k])
    .map(([k, alt]) => certImgTag(CERT_IMG[k], alt, links[k], h));
  (customs || []).filter(x => x.img).forEach(x => out.push(certImgTag(x.img, 'Certification', x.link, h)));
  return out;
}
function certsRow(certs, links, customs, vis, align) {
  if (!vis.certs) return '';
  const imgs = certImgs(certs, links, customs, 30);
  if (!imgs.length) return '';
  return `<tr><td align="${align || 'center'}" style="padding-top:12px;"><div>${imgs.join('&nbsp;&nbsp;')}</div></td></tr>`;
}
/* Extra links render as social circles appended to `socials` (see above). */

async function buildHTML() {
  const s = state, c = cleanHex(s.color);
  const logoUrl = await toDataURL(s.logo);
  const telHref = 'tel:' + s.tel.replace(/[^+\d]/g, '');
  const webHref = s.web.startsWith('http') ? s.web : 'https://' + s.web;
  const fotoCell = (size) => s.vis.foto
    ? `<div style="text-align:center;"><img src="${s.foto}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;display:inline-block;border:3px solid ${c}22;" alt="${s.nombre}"></div>` : '';

  // Contact rows: phone / email / web / address only (no listings row, no LinkedIn text row)
  const rows =
    contactRow(lineIcon('phone', c), `<a href="${telHref}" style="color:#222;text-decoration:none;">${s.tel}</a>`) +
    contactRow(lineIcon('new-post', c), `<a href="mailto:${s.email}" style="color:#222;text-decoration:none;">${s.email}</a>`) +
    contactRow(lineIcon('domain', c), `<a href="${webHref}" style="color:#222;text-decoration:none;">${s.web}</a>`) +
    contactRow(lineIcon('marker', c), s.dirUrl ? `<a href="${s.dirUrl}" target="_blank" style="color:#222;text-decoration:none;">${s.dir}</a>` : `<span>${s.dir}</span>`);

  // Social circles only: Instagram (outline glyph) / WhatsApp (flat) / LinkedIn.
  const ist = s.iconStyle || 'solid';
  const cal = ['left', 'center', 'right'].includes(s.certsAlign) ? s.certsAlign : 'center';
  // Only networks that actually have a URL are rendered — an empty link must not
  // leave a dangling icon in the signature.
  let socialParts = [
    ['instagram', s.instagram], ['whatsapp', s.whatsapp], ['linkedin', s.linkedin]
  ].filter(([, u]) => String(u || '').trim())
    .map(([k, u]) => socialIcon(String(u).trim(), k, ist, c));
  if (s.extra.length) {
    socialParts = socialParts.concat(s.extra.filter(e => String(e.url || '').trim()).map(e => extraBtn(e, c, ist)));
  }
  const socials = (!s.vis.social || !socialParts.length) ? '' : socialParts.join('&nbsp;');

  const legal = s.vis.legal
    ? `<tr><td style="padding-top:12px;font-size:10px;line-height:14px;color:#8a94a8;text-align:center;font-family:Arial,Helvetica,sans-serif;max-width:560px;">${s.legal}</td></tr>` : '';
  const viewBtn = s.vis.listings ? viewPropsBtn(s.listings, c) : '';

  const certs = certsRow(s.certs, s.certLinks, s.customCerts, s.vis, s.certsAlign);
  const zona = (s.vis.zona && s.zona) ? zonaText(s.zona) : '';

  if (s.tpl === 'broker') {
    return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody>
<tr><td width="200" valign="middle" style="text-align:center;padding-right:10px;">${fotoCell(110)}
<div style="font-size:16px;font-weight:bold;color:#111;margin-top:10px;line-height:20px;">${s.nombre}</div>
<div style="font-size:12px;color:#555;">${s.cargo}</div>${zona}</td>
<td width="1" style="background-color:${c};width:1px;font-size:0;">&nbsp;</td><td width="20"></td>
<td valign="top"><table cellpadding="0" cellspacing="0" border="0">${rows}</table></td></tr>
<tr><td colspan="4"><table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px;border-top:1px solid ${c};"><tbody><tr>
<td valign="middle" align="${cal}" style="padding-top:12px;">${s.vis.certs ? certImgs(s.certs, s.certLinks, s.customCerts, 28).join('&nbsp;') : ''}</td>
<td align="right" valign="middle" style="padding-top:12px;"><img src="${logoUrl}" width="130" style="width:130px;max-width:130px;display:inline-block;" alt="Canablue"><div style="padding-top:8px;">${viewBtn}</div><div style="padding-top:8px;">${socials}</div></td>
</tr></tbody></table></td></tr>${legal}</tbody></table>`;
  }
  if (s.tpl === 'moderna') {
    return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody>
<tr><td style="background-color:${c};border-radius:10px 10px 0 0;padding:18px 22px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tbody><tr>
<td valign="middle"><div style="color:#ffffff;font-size:19px;font-weight:bold;line-height:24px;">${s.nombre}</div><div style="color:#d7e1f2;font-size:12.5px;">${s.cargo}${s.vis.zona && s.zona ? ' · ' + s.zona : ''}</div></td>
<td width="90" align="right" valign="middle">${s.vis.foto ? `<img src="${s.foto}" width="76" height="76" style="width:76px;height:76px;border-radius:50%;border:3px solid #ffffff;display:inline-block;" alt="">` : ''}</td>
</tr></tbody></table></td></tr>
<tr><td style="border:1px solid #e3e8f0;border-top:0;border-radius:0 0 10px 10px;padding:16px 22px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tbody><tr>
<td valign="top" width="55%"><table cellpadding="0" cellspacing="0" border="0">${rows}</table></td>
<td valign="top" align="right"><img src="${logoUrl}" width="125" style="width:125px;display:inline-block;" alt="Canablue"><div style="margin-top:10px;">${viewBtn}</div><div style="margin-top:10px;">${socials}</div></td>
</tr></tbody></table>${certs}${legal}</td></tr></tbody></table>`;
  }
  if (s.tpl === 'banner') {
    const sqPhoto = s.vis.foto ? `<img src="${s.foto}" width="84" height="84" style="width:84px;height:84px;border-radius:50%;object-fit:cover;display:block;border:3px solid #ffffff;" alt="${s.nombre}">` : '';
    return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody>
<tr><td style="background-color:${c};border-radius:10px 10px 0 0;padding:20px 22px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tbody><tr>
<td width="100" valign="middle">${sqPhoto}</td>
<td valign="middle"><div style="color:#ffffff;font-size:21px;font-weight:bold;line-height:25px;">${s.nombre}</div><div style="color:#d7e1f2;font-size:12.5px;margin-top:3px;">${s.cargo}${s.vis.zona && s.zona ? ' · ' + s.zona : ''}</div></td>
</tr></tbody></table></td></tr>
<tr><td style="border:1px solid #e3e8f0;border-top:0;padding:18px 22px 6px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tbody><tr>
<td valign="top" width="56%"><table cellpadding="0" cellspacing="0" border="0">${rows}</table></td>
<td valign="middle" align="center"><div>${viewBtn}</div><div style="margin-top:12px;">${socials}</div><div style="margin-top:12px;"><img src="${logoUrl}" width="115" style="width:115px;display:inline-block;" alt="Canablue"></div></td>
</tr></tbody></table></td></tr>
<tr><td style="border:1px solid #e3e8f0;border-top:0;border-radius:0 0 10px 10px;padding:0 22px 18px;"><div style="border-top:1px solid ${c};font-size:0;line-height:0;">&nbsp;</div><table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${legal}</table></td></tr>
</tbody></table>`;
  }
  if (s.tpl === 'sidebar') {
    const sidePhoto = s.vis.foto ? `<img src="${s.foto}" width="88" height="88" style="width:88px;height:88px;border-radius:50%;object-fit:cover;display:inline-block;border:3px solid #ffffff;" alt="${s.nombre}">` : '';
    const sideZona = (s.vis.zona && s.zona) ? `<div style="margin-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d7e1f2;line-height:15px;">Specializing in ${s.zona}</div>` : '';
    return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody><tr>
<td width="190" valign="top" align="center" style="background-color:${c};border-radius:10px 0 0 10px;padding:24px 16px;">${sidePhoto}
<div style="color:#ffffff;font-size:16px;font-weight:bold;margin-top:12px;line-height:20px;">${s.nombre}</div>
<div style="color:#d7e1f2;font-size:12px;margin-top:2px;">${s.cargo}</div>${sideZona}
<div style="margin-top:14px;">${socials}</div></td>
<td valign="top" style="border:1px solid #e3e8f0;border-left:0;border-radius:0 10px 10px 0;padding:20px 22px;">
<table cellpadding="0" cellspacing="0" border="0">${rows}</table>
<div style="margin-top:12px;">${viewBtn}</div>
<div style="margin-top:14px;"><img src="${logoUrl}" width="120" style="width:120px;display:inline-block;" alt="Canablue"></div>
<table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${legal}</table></td>
</tr></tbody></table>`;
  }
  if (s.tpl === 'photo-left') {
    return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody><tr>
<td width="150" valign="top" align="center">${fotoCell(110)}
<div style="margin-top:12px;"><img src="${logoUrl}" width="110" style="width:110px;display:inline-block;" alt="Canablue"></div>
<div style="margin-top:10px;">${socials}</div></td>
<td width="24"></td>
<td valign="top"><div style="font-size:17px;font-weight:700;color:#111;line-height:22px;">${s.nombre}</div><div style="font-size:12px;color:#111;">${s.cargo}</div>${zona}
<div style="border-top:1px solid ${c};font-size:0;line-height:0;margin:10px 0;">&nbsp;</div>
<table cellpadding="0" cellspacing="0" border="0">${rows}</table>
<div style="margin-top:10px;">${viewBtn}</div></td>
</tr>
<tr><td colspan="3"><table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${legal}</table></td></tr>
</tbody></table>`;
  }
  if (s.tpl === 'photo-top') {
    return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody>
<tr><td align="center">${fotoCell(120)}</td></tr>
<tr><td align="center" style="padding-top:10px;"><div style="font-size:19px;font-weight:bold;color:#111;line-height:24px;">${s.nombre}</div><div style="font-size:12.5px;color:#555;margin-top:2px;">${s.cargo}</div>${zona}</td></tr>
<tr><td style="padding:12px 0;"><div style="border-top:1px solid ${c};font-size:0;line-height:0;">&nbsp;</div></td></tr>
<tr><td><table cellpadding="0" cellspacing="0" border="0" width="100%"><tbody><tr>
<td valign="top"><table cellpadding="0" cellspacing="0" border="0">${rows}</table><div style="margin-top:10px;">${viewBtn}</div></td>
<td valign="top" align="right"><img src="${logoUrl}" width="130" style="width:130px;display:inline-block;" alt="Canablue"><div style="margin-top:10px;">${socials}</div></td>
</tr></tbody></table></td></tr>
<tr><td><table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${legal}</table></td></tr>
<tr><td style="padding-top:12px;"><div style="border-top:1px solid ${c};font-size:0;line-height:0;">&nbsp;</div></td></tr>
</tbody></table>`;
  }
  if (s.tpl === 'photo-right') {
    return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody><tr>
<td valign="top"><div style="font-size:17px;font-weight:700;color:#111;line-height:22px;">${s.nombre}</div><div style="font-size:12px;color:#111;">${s.cargo}</div>${zona}
<div style="border-top:1px solid ${c};font-size:0;line-height:0;margin:10px 0;">&nbsp;</div>
<table cellpadding="0" cellspacing="0" border="0">${rows}</table>
<div style="margin-top:10px;">${viewBtn}</div></td>
<td width="24"></td>
<td width="170" valign="top" align="center">${fotoCell(120)}
<div style="margin-top:12px;"><img src="${logoUrl}" width="120" style="width:120px;display:inline-block;" alt="Canablue"></div>
<div style="margin-top:10px;">${socials}</div></td>
</tr>
<tr><td colspan="3"><table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${legal}</table></td></tr>
</tbody></table>`;
  }
  // Main template
  return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody>
<tr><td><table cellpadding="0" cellspacing="0" border="0"><tbody><tr>
<td width="130" valign="middle">${fotoCell(105)}</td>
<td valign="middle"><div style="font-size:17px;font-weight:700;color:#111;line-height:22px;">${s.nombre}</div><div style="font-size:12px;color:#111;">${s.cargo}</div>${zona}</td>
<td width="24"></td><td width="1" style="border-left:1px solid ${c};font-size:0;">&nbsp;</td><td width="24"></td>
<td valign="middle"><table cellpadding="0" cellspacing="0" border="0">${rows}</table></td>
</tr></tbody></table></td></tr>
<tr><td style="padding:14px 0 0;"><div style="border-top:1px solid ${c};font-size:0;line-height:0;">&nbsp;</div></td></tr>
<tr><td><table cellpadding="0" cellspacing="0" border="0" width="100%"><tbody><tr>
<td valign="middle"><table cellpadding="0" cellspacing="0" border="0"><tbody><tr><td valign="middle"><img src="${logoUrl}" width="128" style="width:128px;max-width:128px;display:block;" alt="Canablue"></td><td width="14"></td><td valign="middle">${viewBtn}</td></tr></tbody></table></td>
<td align="right" valign="middle">${socials}</td></tr></tbody></table></td></tr>
${certs}${legal}</tbody></table>`;
}

async function render() {
  syncStateFromInputs();
  const html = await buildHTML();
  $('sigPreview').innerHTML = html;
  $('codeText').textContent = html;
  autosave();
  return html;
}
function syncStateFromInputs() {
  state.color = $('fColor').value || '#174176'; $('fColorHex').value = state.color.toUpperCase();
  state.nombre = $('fNombre').value; state.cargo = $('fCargo').value; state.zona = $('fZona').value;
  state.tel = $('fTel').value; state.email = $('fEmail').value; state.web = $('fWeb').value; state.dir = $('fDir').value; state.dirUrl = $('fDirUrl').value;
  state.listings = $('fListings').value; state.linkedin = $('fLinkedin').value;
  state.instagram = $('fInstagram').value; state.whatsapp = $('fWhatsapp').value;
  state.foto = $('fFoto').value; state.logo = $('fLogo').value;
  state.certs = { crs: $('cCRS').checked, aei: $('cAEI').checked, realtor: $('cRealtor').checked, sr23: $('cSR23').checked, sr24: $('cSR24').checked, lux: $('cLux').checked };
  state.certLinks = { crs: $('fLinkCRS').value, aei: $('fLinkAEI').value, realtor: $('fLinkRealtor').value, sr23: $('fLinkSR23').value, sr24: $('fLinkSR24').value, lux: $('fLinkLux').value };
  state.customCerts = [...document.querySelectorAll('#customCerts .xlink')].map(r => { const i = r.querySelectorAll('input'); return { img: i[0].value, link: i[1].value }; }).filter(x => x.img || x.link);
  state.vis = { foto: $('vFoto').checked, zona: $('vZona').checked, social: $('vSocial').checked, listings: $('vListings').checked, certs: $('vCerts').checked, legal: $('vLegal').checked };
  state.legal = $('fLegal').value;
  document.querySelectorAll('#tplGrid .tpl').forEach(b => b.classList.toggle('active', b.dataset.tpl === state.tpl));
}
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2600); }

async function copyRich() {
  const html = await render();
  const text = `${state.nombre} · ${state.cargo}\n${state.zona}\n${state.tel} · ${state.email} · ${state.web}\nLinkedIn: ${state.linkedin}${state.listings ? '\nView My Listings: ' + state.listings : ''}`;
  try {
    const item = new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([text], { type: 'text/plain' }) });
    await navigator.clipboard.write([item]);
    toast('Signature copied. Paste it with Ctrl+V into your email.');
  } catch {
    const w = window.open('', '_blank', 'width=700,height=500'); w.document.write(html); w.document.close(); w.focus();
    w.getSelection().selectAllChildren(w.document.body); w.document.execCommand('copy');
    toast('Manual copy: press Ctrl+C in the opened window.');
  }
}
async function copyHtml() { const html = await render(); await navigator.clipboard.writeText(html); toast('HTML code copied.'); }
async function download() {
  const html = await render();
  const full = `<!DOCTYPE html><html><body>${html}</body></html>`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([full], { type: 'text/html' }));
  a.download = 'signature-' + state.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html'; a.click();
}

let ipickBound = false;
// Floating popups escape the scrolling editor: position fixed to the viewport
function placeFixed(menu, anchor, minW) {
  const r = anchor.getBoundingClientRect();
  menu.style.position = 'fixed';
  menu.style.top = (r.bottom + 5) + 'px';
  menu.style.left = Math.max(8, Math.min(r.left, window.innerWidth - minW - 8)) + 'px';
  menu.style.minWidth = Math.max(minW, r.width) + 'px';
  menu.style.zIndex = 999;
}
function hideFloatMenus() {
  document.querySelectorAll('.ipick-menu,.agent-list').forEach(m => m.classList.add('hidden'));
}
// Scrolling inside a floating menu must not close it (only scrolls from the
// page / editor behind it do), so the list stays open while browsing logos.
function onFloatScroll(e) {
  const t = e.target;
  if (t && t.nodeType === 1 && (t.closest('.ipick-menu') || t.closest('.agent-list'))) return;
  hideFloatMenus();
}
function iconPicker(selected, onPick) {
  const wrap = document.createElement('div'); wrap.className = 'ipick';
  const paint = k => {
    const n = NETWORKS[k] || NETWORKS.facebook;
    wrap.querySelector('.ipick-btn').innerHTML = `<span class="ipick-logo" style="background:${n.bg}"><img src="${n.img}" alt=""></span><span>${n.label}</span>`;
    wrap.querySelectorAll('.ipick-item').forEach(it => it.classList.toggle('sel', it.dataset.k === k));
  };
  const n0 = NETWORKS[selected] || NETWORKS.facebook;
  wrap.innerHTML = `<button type="button" class="ipick-btn"><span class="ipick-logo" style="background:${n0.bg}"><img src="${n0.img}" alt=""></span><span>${n0.label}</span></button><div class="ipick-menu hidden">${Object.keys(NETWORKS).map(k => {
    const n = NETWORKS[k];
    return `<div class="ipick-item${k === selected ? ' sel' : ''}" data-k="${k}"><span class="ipick-logo" style="background:${n.bg}"><img src="${n.img}" alt=""></span><span>${n.label}</span></div>`;
  }).join('')}</div>`;
  const menu = wrap.querySelector('.ipick-menu');
  wrap.querySelector('.ipick-btn').onclick = e => {
    e.stopPropagation();
    document.querySelectorAll('.ipick-menu').forEach(m => { if (m !== menu) m.classList.add('hidden'); });
    const opening = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    if (opening) placeFixed(menu, wrap.querySelector('.ipick-btn'), 200);
  };
  menu.querySelectorAll('.ipick-item').forEach(it => it.onclick = e => {
    e.stopPropagation(); paint(it.dataset.k); menu.classList.add('hidden'); onPick(it.dataset.k);
  });
  if (!ipickBound) { ipickBound = true; document.addEventListener('click', hideFloatMenus); document.addEventListener('scroll', onFloatScroll, true); window.addEventListener('resize', hideFloatMenus); }
  return wrap;
}
function setCertsAlign(a) {
  state.certsAlign = ['left', 'center', 'right'].includes(a) ? a : 'center';
  document.querySelectorAll('#certsAlignSeg button').forEach(b => b.classList.toggle('on', b.dataset.a === state.certsAlign));
}
function setIconStyle(s) {
  state.iconStyle = ['solid', 'rounded', 'outline', 'frame', 'line', 'soft'].includes(s) ? s : 'solid';
  document.querySelectorAll('#iconStyleSeg button').forEach(b => b.classList.toggle('on', b.dataset.s === state.iconStyle));
}
function addLinkRow(icon = 'facebook', url = '') {
  const d = document.createElement('div'); d.className = 'xlink xlink-net';
  d._icon = NETWORKS[icon] ? icon : 'facebook';
  const urlInput = document.createElement('input'); urlInput.placeholder = 'https://…'; urlInput.value = url || '';
  const del = document.createElement('button'); del.textContent = '✕'; del.title = 'Remove';
  const sync = () => { state.extra = [...document.querySelectorAll('#extraLinks .xlink-net')].map(r => ({ icon: r._icon || 'facebook', url: r.querySelector('input').value })).filter(e => e.url); render(); };
  d.appendChild(iconPicker(d._icon, k => { d._icon = k; sync(); }));
  d.appendChild(urlInput); d.appendChild(del);
  urlInput.oninput = sync; del.onclick = () => { d.remove(); sync(); };
  $('extraLinks').appendChild(d);
}
function addCertRow(img = '', link = '') {
  const d = document.createElement('div'); d.className = 'xlink';
  d.innerHTML = `<input placeholder="Logo image URL (PNG)" value="${img || ''}"><input placeholder="Click-through link (optional)" value="${link || ''}"><button>✕</button>`;
  const sync = () => { state.customCerts = [...document.querySelectorAll('#customCerts .xlink')].map(r => { const i = r.querySelectorAll('input'); return { img: i[0].value, link: i[1].value }; }).filter(x => x.img || x.link); render(); };
  d.querySelectorAll('input').forEach(i => i.oninput = sync); d.querySelector('button').onclick = () => { d.remove(); sync(); };
  $('customCerts').appendChild(d);
}

const MAPS_DEFAULT = 'https://www.google.com/maps/place/Canablue+Real+Estate/data=!4m2!3m1!1s0x0:0x14220523874e3b46?sa=X&ved=1t:2428&ictx=111';
const DIR_DEFAULT = 'Local P104, Plaza San Juan Shopping Center, Bávaro, Punta Cana';
const BUILTIN_AGENTS = [
  { key: 'pamela', name: 'Pamela Núñez', role: 'Broker Owner', zona: 'Punta Cana · Cap Cana', tel: '+1 (809) 975-3900', email: 'pamela@canablue.com', web: 'canablue.com', dir: DIR_DEFAULT, dirUrl: MAPS_DEFAULT, instagram: 'https://www.instagram.com/pamela_canablue.rd', whatsapp: 'https://wa.me/18096080943', foto: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792087360/Firmas_de_correo_Electronico_pamela.png', listings: 'https://canablue.com/author/pamepam/', linkedin: 'https://do.linkedin.com/in/pamela-nunez-0280814a', certs: { crs: true, aei: true, realtor: true, sr23: true, sr24: true, lux: false } },
  { key: 'candy', name: 'Candy Vander Horst', role: 'Sales | Rentals', zona: 'Bávaro · Punta Cana', tel: '+1 (849) 255-2500', email: 'candy@canablue.com', web: 'canablue.com', dir: DIR_DEFAULT, dirUrl: MAPS_DEFAULT, instagram: 'https://www.instagram.com/candy_canablue.rd', whatsapp: 'https://wa.me/18492552500', foto: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792072332/Screenshot_2026-10-15_095141.png', listings: 'https://canablue.com/agents/candy-vander-horst', linkedin: 'https://linkedin.com/in/candy-vander-horst', certs: { crs: false, aei: false, realtor: false, sr23: false, sr24: true, lux: false } }
];
let AGENTS = BUILTIN_AGENTS.slice();
let JSON_AGENTS = [];
// ---- Static-page persistence: data/agents.json (shared source of truth, via fetch)
// + localStorage (per-browser autosave + custom agents). ----
const LS_FORM = 'canablue.form.v2', LS_CUSTOM = 'canablue.agents.custom.v1';
const getCustoms = () => { try { return JSON.parse(localStorage.getItem(LS_CUSTOM) || '[]'); } catch { return []; } };
const setCustoms = c => localStorage.setItem(LS_CUSTOM, JSON.stringify(c));
const isCustom = key => getCustoms().some(x => x.key === key);
const slug = s => (s || 'agent').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'agent';
const SHEET_TAB = 'Agentes';
const LS_SHEET = 'canablue.sheet.id.v1';
function setDbStatus(msg, cls) {
  const s = $('dbStatus'); if (s) s.textContent = msg;
  const d = $('dbDot'); if (d) d.className = 'db-dot' + (cls ? ' ' + cls : '');
}
async function loadSheetAgents(id) {
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_TAB)}&headers=1`;
  const r = await fetch(url);
  if (!r.ok) throw 0;
  const t = await r.text();
  const json = JSON.parse(t.substring(t.indexOf('{'), t.lastIndexOf('}') + 1));
  const cols = (json.table.cols || []).map(c => String((c && c.label) || '').trim().toLowerCase());
  const B = v => v === true || v === 1 || String(v).toUpperCase() === 'TRUE' || String(v) === '1';
  return (json.table.rows || []).map(row => {
    const o = {}; const cells = row.c || [];
    cols.forEach((h, i) => { o[h] = cells[i] ? cells[i].v : null; });
    return {
      key: String(o.key || '').trim() || slug(o.name),
      color: o.color || '', name: o.name || '', role: o.role || '', zona: o.zona || '',
      tel: o.tel || '', email: o.email || '', web: o.web || 'canablue.com',
      dir: o.dir || DIR_DEFAULT, dirUrl: o.dirUrl || MAPS_DEFAULT,
      listings: o.listings || '', linkedin: o.linkedin || '',
      instagram: o.instagram || '', whatsapp: o.whatsapp || '',
      foto: o.foto || '', logo: o.logo || '',
      certs: { crs: B(o.crs), aei: B(o.aei), realtor: B(o.realtor), sr23: B(o.sr23), sr24: B(o.sr24), lux: o.lux == null ? false : B(o.lux) },
      iconStyle: ['solid', 'rounded', 'outline', 'frame', 'line', 'soft'].includes(String(o.iconstyle || '').toLowerCase()) ? String(o.iconstyle).toLowerCase() : 'solid',
      certsAlign: ['left', 'center', 'right'].includes(String(o.certsalign || '').toLowerCase()) ? String(o.certsalign).toLowerCase() : 'center'
    };
  }).filter(a => a.name);
}
async function loadAgents() {
  AGENTS = BUILTIN_AGENTS.slice();
  JSON_AGENTS = [];
  const sid = (($('fSheetId') && $('fSheetId').value) || '').trim();
  if (sid) {
    try {
      const sheet = await loadSheetAgents(sid);
      if (sheet.length) {
        AGENTS = sheet;
        try { localStorage.setItem(LS_SHEET, sid); } catch {}
        setDbStatus(`Google Sheets — ${sheet.length} agent(s) loaded`, 'ok');
      } else {
        setDbStatus('Google Sheets — empty sheet, using local data', 'err');
      }
    } catch {
      setDbStatus('Google Sheets — check ID / sharing, using local data', 'err');
    }
  } else {
    try {
      const r = await fetch('data/agents.json', { cache: 'no-store' });
      if (!r.ok) throw 0;
      const j = await r.json();
      if (Array.isArray(j) && j.length) { JSON_AGENTS = j; AGENTS = j.slice(); }
      setDbStatus(`Local file — ${AGENTS.length} agent(s). Paste a Sheet ID for live data.`, '');
    } catch { setDbStatus('Built-in data (offline or file://).', ''); }
  }
  getCustoms().forEach(c => {
    const i = AGENTS.findIndex(a => a.key === c.key);
    if (i >= 0) AGENTS[i] = c; else AGENTS.push(c);
  });
}
function collectAgent(key) {
  return {
    key, color: $('fColor').value, name: $('fNombre').value, role: $('fCargo').value,
    zona: $('fZona').value, tel: $('fTel').value, email: $('fEmail').value, web: $('fWeb').value,
    dir: $('fDir').value, dirUrl: $('fDirUrl').value, listings: $('fListings').value,
    linkedin: $('fLinkedin').value, instagram: $('fInstagram').value, whatsapp: $('fWhatsapp').value,
    foto: $('fFoto').value, logo: $('fLogo').value,
    extra: [...document.querySelectorAll('#extraLinks .xlink-net')].map(r => ({ icon: r._icon || 'facebook', url: r.querySelector('input').value })).filter(e => e.url),
    iconStyle: state.iconStyle,
    certsAlign: state.certsAlign,
    certLinks: { crs: $('fLinkCRS').value, aei: $('fLinkAEI').value, realtor: $('fLinkRealtor').value, sr23: $('fLinkSR23').value, sr24: $('fLinkSR24').value, lux: $('fLinkLux').value },
    customCerts: [...document.querySelectorAll('#customCerts .xlink')].map(r => { const i = r.querySelectorAll('input'); return { img: i[0].value, link: i[1].value }; }).filter(x => x.img || x.link),
    certs: { crs: $('cCRS').checked, aei: $('cAEI').checked, realtor: $('cRealtor').checked, sr23: $('cSR23').checked, sr24: $('cSR24').checked, lux: $('cLux').checked }
  };
}
function applyAgent(a) {
  if (a.color && /^#[0-9a-f]{6}$/i.test(a.color)) $('fColor').value = a.color;
  $('fNombre').value = a.name || ''; $('fCargo').value = a.role || '';
  $('fZona').value = a.zona || ''; $('fTel').value = a.tel || '';
  $('fEmail').value = a.email || ''; $('fWeb').value = a.web || 'canablue.com';
  $('fDir').value = a.dir || DIR_DEFAULT; $('fDirUrl').value = a.dirUrl || MAPS_DEFAULT;
  $('fListings').value = a.listings || ''; $('fLinkedin').value = a.linkedin || '';
  $('fInstagram').value = a.instagram || ''; $('fWhatsapp').value = a.whatsapp || '';
  $('fFoto').value = a.foto || ''; if (a.logo) $('fLogo').value = a.logo;
  const ct = a.certs || {};
  $('cCRS').checked = !!ct.crs; $('cAEI').checked = !!ct.aei; $('cRealtor').checked = !!ct.realtor;
  if (ct.sr23 !== undefined) $('cSR23').checked = !!ct.sr23;
  if (ct.sr24 !== undefined) $('cSR24').checked = !!ct.sr24;
  if (ct.lux !== undefined) $('cLux').checked = !!ct.lux;
  const linkIds = { crs: 'fLinkCRS', aei: 'fLinkAEI', realtor: 'fLinkRealtor', sr23: 'fLinkSR23', sr24: 'fLinkSR24', lux: 'fLinkLux' };
  for (const k in linkIds) { const el = $(linkIds[k]); if (el) el.value = (a.certLinks && a.certLinks[k]) || ''; }
  document.querySelectorAll('#extraLinks .xlink-net').forEach(n => n.remove());
  (a.extra || []).forEach(x => addLinkRow(x.icon, x.url));
  setIconStyle(a.iconStyle || 'solid');
  setCertsAlign(a.certsAlign || 'center');
  document.querySelectorAll('#customCerts .xlink').forEach(n => n.remove());
  (a.customCerts || []).forEach(x => addCertRow(x.img, x.link));
  $('agentSearch').value = a.name || '';
}
function saveCurrentAgent() {
  const a = collectAgent(slug($('fNombre').value));
  if (!a.name) { toast('Enter the agent name first.'); return; }
  const cs = getCustoms(); const i = cs.findIndex(x => x.key === a.key);
  if (i >= 0) cs[i] = a; else cs.push(a);
  setCustoms(cs);
  const j = AGENTS.findIndex(x => x.key === a.key);
  if (j >= 0) AGENTS[j] = a; else AGENTS.push(a);
  $('agentSearch').value = a.name;
  renderAgentList('');
  render();
  toast('Agent saved in this browser.');
}
function deleteCustomAgent(key) {
  setCustoms(getCustoms().filter(x => x.key !== key));
  const base = JSON_AGENTS.length ? JSON_AGENTS : BUILTIN_AGENTS;
  AGENTS = AGENTS.filter(x => x.key !== key);
  const b = base.find(x => x.key === key);
  if (b) AGENTS.push(b);
  renderAgentList($('agentSearch').value);
  render();
  toast('Saved agent deleted.');
}
function exportAgentsJSON() {
  const merged = (JSON_AGENTS.length ? JSON_AGENTS : BUILTIN_AGENTS).map(a => ({ ...a }));
  getCustoms().forEach(c => {
    const i = merged.findIndex(x => x.key === c.key);
    if (i >= 0) merged[i] = c; else merged.push(c);
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(merged, null, 2)], { type: 'application/json' }));
  a.download = 'agents.json'; a.click();
  toast('agents.json downloaded — replace data/agents.json and commit.');
}
let saveT = null;
function autosave() {
  clearTimeout(saveT);
  saveT = setTimeout(() => { try { localStorage.setItem(LS_FORM, JSON.stringify(collectAgent('draft'))); } catch {} }, 600);
}
function restoreAutosave() {
  try {
    const d = JSON.parse(localStorage.getItem(LS_FORM) || 'null');
    if (!d || !d.name) return;
    applyAgent(d);
  } catch {}
}
function fillAgent(a) {
  applyAgent(a);
  render();
}
function renderAgentList(filter = '') {
  const list = $('agentList'); const q = filter.trim().toLowerCase();
  const hits = AGENTS.filter(a => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q));
  list.innerHTML = hits.length ? hits.map(a => {
    const ini = a.name.split(' ').map(w => w[0]).slice(0, 2).join('');
    const custom = isCustom(a.key);
    return `<div class="agent-item" data-key="${a.key}"><span class="avatar">${ini}</span><span style="flex:1"><b>${a.name}</b><small>${a.role}${custom ? ' · saved' : ''}</small></span>${custom ? '<span class="agent-del" title="Delete saved agent">✕</span>' : ''}</div>`;
  }).join('') : '<div class="agent-none">No agents found</div>';
  list.querySelectorAll('.agent-item').forEach(el => el.onmousedown = e => {
    e.preventDefault();
    if (e.target.closest('.agent-del')) { deleteCustomAgent(el.dataset.key); return; }
    fillAgent(AGENTS.find(x => x.key === el.dataset.key));
    list.classList.add('hidden');
  });
}

document.querySelectorAll('#certsAlignSeg button').forEach(b => b.onclick = () => { setCertsAlign(b.dataset.a); render(); });
document.querySelectorAll('#iconStyleSeg button').forEach(b => b.onclick = () => { setIconStyle(b.dataset.s); render(); });
document.querySelectorAll('.rail button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.rail button').forEach(x => x.classList.toggle('on', x === b));
  document.querySelectorAll('.editor .card').forEach(c => c.classList.toggle('show', c.id === b.dataset.sec));
});
document.querySelectorAll('#tplGrid .tpl').forEach(b => b.onclick = () => { state.tpl = b.dataset.tpl; render(); });
document.querySelectorAll('.swatches button').forEach(b => b.onclick = () => { $('fColor').value = b.dataset.c; render(); });
['fColor','fColorHex','fNombre','fCargo','fZona','fTel','fEmail','fWeb','fDir','fDirUrl','fListings','fLinkedin','fInstagram','fWhatsapp','fFoto','fLogo','fLinkCRS','fLinkAEI','fLinkRealtor','fLinkSR23','fLinkSR24','fLinkLux','fLegal','cCRS','cAEI','cRealtor','cSR23','cSR24','cLux','vFoto','vZona','vSocial','vListings','vCerts','vLegal'].forEach(id => $(id).addEventListener('input', render));
$('fColorHex').addEventListener('change', e => { if (/^#[0-9a-f]{6}$/i.test(e.target.value)) $('fColor').value = e.target.value; render(); });
$('fFotoFile').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const fr = new FileReader(); fr.onload = () => { $('fFoto').value = fr.result; render(); toast('Photo loaded (for the final email use a public https link).'); }; fr.readAsDataURL(f);
});
$('btnAddLink').onclick = () => addLinkRow();
$('btnAddCert').onclick = () => addCertRow();
$('btnCopyRich').onclick = copyRich; $('btnCopyHtml').onclick = copyHtml; $('btnDownload').onclick = download;
$('agentSearch').addEventListener('focus', e => { renderAgentList(e.target.value); $('agentList').classList.remove('hidden'); placeFixed($('agentList'), e.target, 220); });
$('agentSearch').addEventListener('input', e => { renderAgentList(e.target.value); $('agentList').classList.remove('hidden'); placeFixed($('agentList'), e.target, 220); });
$('agentSearch').addEventListener('blur', () => setTimeout(() => $('agentList').classList.add('hidden'), 150));
$('agentSearch').addEventListener('keydown', e => { if (e.key === 'Enter') { const first = $('agentList').querySelector('.agent-item'); if (first) { fillAgent(AGENTS.find(x => x.key === first.dataset.key)); $('agentList').classList.add('hidden'); } } });
$('toggleCode').onchange = e => $('codeBox').classList.toggle('hidden', !e.target.checked);
$('btnSaveAgent').onclick = saveCurrentAgent;
$('btnExportAgents').onclick = exportAgentsJSON;
$('btnReloadDb').onclick = () => loadAgents().then(() => { renderAgentList($('agentSearch').value); render(); });
$('fSheetId').addEventListener('change', e => { try { localStorage.setItem(LS_SHEET, e.target.value.trim()); } catch {} });
try { const sid = localStorage.getItem(LS_SHEET); if (sid) $('fSheetId').value = sid; } catch {}
loadAgents().then(() => { restoreAutosave(); render(); });
