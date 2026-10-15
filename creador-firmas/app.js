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
  certs: { crs: true, aei: true, realtor: true, sr23: false, sr24: true, lux: true },
  certUrls: { crs: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-CRS.png', aei: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-AEI.png', realtor: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-REALTOR.png', sr23: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-Best-of-DR-2023.png', sr24: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-Best-of-DR-2024.png', lux: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792088258/cert-Luxury-Homes-Expert.png' },
  extra: [],
  vis: { foto: true, zona: true, social: true, certs: true, legal: true },
  legal: 'The information in this email is confidential and intended solely for its recipient.'
};
const BRAND = { instagram: '#000000', whatsapp: '#25D366', linkedin: '#0A66C2' };
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
// Modern outline (line) icons, matching the Pamela reference. PNG = email-safe
// (email clients block SVG/Iconify, so brand/official logos ship as PNG images).
const lineIcon = (name, colorHex) => `https://img.icons8.com/ios/50/${colorHex.replace('#', '')}/${name}.png`;
const whiteGlyph = name => `https://img.icons8.com/ios-filled/50/ffffff/${name}.png`;
// Thick-outline white glyph (Material style) for the Instagram circle
const INSTAGRAM_LINE = 'https://img.icons8.com/material-outlined/48/ffffff/instagram-new--v1.png';

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
function certImgs(logoData, certs, h) {
  return CERT_DEFS.filter(([k]) => certs[k])
    .map(([k, alt]) => `<img src="${logoData[k]}" height="${h}" style="height:${h}px;width:auto;display:inline-block;border:0;" alt="${alt}">`);
}
function certsRow(logoData, certs, vis) {
  if (!vis.certs) return '';
  const imgs = certImgs(logoData, certs, 30);
  if (!imgs.length) return '';
  return `<tr><td align="center" style="padding-top:12px;"><div>${imgs.join('&nbsp;&nbsp;')}</div></td></tr>`;
}
function extraLinksRow(extra, c) {
  if (!extra.length) return '';
  const l = extra.map(e => `<a href="${e.url}" target="_blank" style="color:${c};font-size:12px;font-family:Arial,Helvetica,sans-serif;">${e.label}</a>`).join(' &nbsp;·&nbsp; ');
  return `<tr><td style="padding-top:8px;font-family:Arial,Helvetica,sans-serif;">${l}</td></tr>`;
}

async function buildHTML() {
  const s = state, c = cleanHex(s.color);
  const logoUrl = await toDataURL(s.logo);
  const logoData = {
    crs: await toDataURL(s.certUrls.crs),
    aei: await toDataURL(s.certUrls.aei),
    realtor: await toDataURL(s.certUrls.realtor),
    sr23: await toDataURL(s.certUrls.sr23),
    sr24: await toDataURL(s.certUrls.sr24),
    lux: await toDataURL(s.certUrls.lux)
  };
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
  const socials = !s.vis.social ? '' :
    socialBtn(s.instagram, BRAND.instagram, INSTAGRAM_LINE, 'Instagram') + '&nbsp;' +
    socialBtn(s.whatsapp, BRAND.whatsapp, whiteGlyph('whatsapp--v1'), 'WhatsApp') + '&nbsp;' +
    socialBtn(s.linkedin, BRAND.linkedin, whiteGlyph('linkedin--v1'), 'LinkedIn');

  const legal = s.vis.legal
    ? `<tr><td style="padding-top:12px;font-size:10px;line-height:14px;color:#8a94a8;text-align:center;font-family:Arial,Helvetica,sans-serif;max-width:560px;">${s.legal}</td></tr>` : '';
  const viewBtn = viewPropsBtn(s.listings, c);

  const certs = certsRow(logoData, s.certs, s.vis);
  const extras = extraLinksRow(s.extra, c);
  const zona = (s.vis.zona && s.zona) ? zonaText(s.zona) : '';

  if (s.tpl === 'broker') {
    return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;"><tbody>
<tr><td width="200" valign="middle" style="text-align:center;padding-right:10px;">${fotoCell(110)}
<div style="font-size:16px;font-weight:bold;color:#111;margin-top:10px;line-height:20px;">${s.nombre}</div>
<div style="font-size:12px;color:#555;">${s.cargo}</div>${zona}</td>
<td width="1" style="background-color:${c};width:1px;font-size:0;">&nbsp;</td><td width="20"></td>
<td valign="top"><table cellpadding="0" cellspacing="0" border="0">${rows}</table></td></tr>
<tr><td colspan="4"><table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px;border-top:1px solid ${c};"><tbody><tr>
<td valign="middle" align="center" style="padding-top:12px;">${s.vis.certs ? certImgs(logoData, s.certs, 28).join('&nbsp;') : ''}</td>
<td align="right" valign="middle" style="padding-top:12px;"><img src="${logoUrl}" width="130" style="width:130px;max-width:130px;display:inline-block;" alt="Canablue"><div style="padding-top:8px;">${viewBtn}</div><div style="padding-top:8px;">${socials}</div></td>
</tr></tbody></table></td></tr>${extras}${legal}</tbody></table>`;
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
</tr></tbody></table>${extras}${certs}${legal}</td></tr></tbody></table>`;
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
<tr><td style="border:1px solid #e3e8f0;border-top:0;border-radius:0 0 10px 10px;padding:0 22px 18px;"><div style="border-top:1px solid ${c};font-size:0;line-height:0;">&nbsp;</div><table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${extras}${legal}</table></td></tr>
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
<table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${extras}${legal}</table></td>
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
<tr><td colspan="3"><table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${extras}${legal}</table></td></tr>
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
<tr><td><table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${extras}${legal}</table></td></tr>
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
<tr><td colspan="3"><table cellpadding="0" cellspacing="0" border="0" width="100%">${certs}${extras}${legal}</table></td></tr>
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
${certs}${extras}${legal}</tbody></table>`;
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
  state.certUrls = { crs: $('fCertCRS').value, aei: $('fCertAEI').value, realtor: $('fCertRealtor').value, sr23: $('fCertSR23').value, sr24: $('fCertSR24').value, lux: $('fCertLux').value };
  state.vis = { foto: $('vFoto').checked, zona: $('vZona').checked, social: $('vSocial').checked, certs: $('vCerts').checked, legal: $('vLegal').checked };
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

function addLinkRow(label = '', url = '') {
  const d = document.createElement('div'); d.className = 'xlink';
  d.innerHTML = `<input placeholder="Label, e.g. TikTok" value="${label}"><input placeholder="https://…" value="${url}"><button>✕</button>`;
  const [li, ui, del] = d.querySelectorAll('input,input,button');
  const sync = () => { state.extra = [...document.querySelectorAll('#extraLinks .xlink')].map(r => { const i = r.querySelectorAll('input'); return { label: i[0].value, url: i[1].value }; }).filter(e => e.label || e.url); render(); };
  li.oninput = sync; ui.oninput = sync; del.onclick = () => { d.remove(); sync(); };
  $('extraLinks').appendChild(d);
}

const MAPS_DEFAULT = 'https://www.google.com/maps/place/Canablue+Real+Estate/data=!4m2!3m1!1s0x0:0x14220523874e3b46?sa=X&ved=1t:2428&ictx=111';
const DIR_DEFAULT = 'Local P104, Plaza San Juan Shopping Center, Bávaro, Punta Cana';
const BUILTIN_AGENTS = [
  { key: 'pamela', name: 'Pamela Núñez', role: 'Broker Owner', zona: 'Punta Cana · Cap Cana', tel: '+1 (809) 975-3900', email: 'pamela@canablue.com', web: 'canablue.com', dir: DIR_DEFAULT, dirUrl: MAPS_DEFAULT, instagram: 'https://www.instagram.com/pamela_canablue.rd', whatsapp: 'https://wa.me/18096080943', foto: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792087360/Firmas_de_correo_Electronico_pamela.png', listings: 'https://canablue.com/author/pamepam/', linkedin: 'https://do.linkedin.com/in/pamela-nunez-0280814a', certs: { crs: true, aei: true, realtor: true } },
  { key: 'candy', name: 'Candy Vander Horst', role: 'Sales | Rentals', zona: 'Bávaro · Punta Cana', tel: '+1 (849) 255-2500', email: 'candy@canablue.com', web: 'canablue.com', dir: DIR_DEFAULT, dirUrl: MAPS_DEFAULT, instagram: 'https://www.instagram.com/candy_canablue.rd', whatsapp: 'https://wa.me/18492552500', foto: 'https://res.cloudinary.com/ybkuwivn/image/upload/v1792072332/Screenshot_2026-10-15_095141.png', listings: 'https://canablue.com/agents/candy-vander-horst', linkedin: 'https://linkedin.com/in/candy-vander-horst', certs: { crs: false, aei: false, realtor: false } }
];
let AGENTS = BUILTIN_AGENTS.slice();
let JSON_AGENTS = [];
// ---- Static-page persistence: data/agents.json (shared source of truth, via fetch)
// + localStorage (per-browser autosave + custom agents). ----
const LS_FORM = 'canablue.form.v1', LS_CUSTOM = 'canablue.agents.custom.v1';
const getCustoms = () => { try { return JSON.parse(localStorage.getItem(LS_CUSTOM) || '[]'); } catch { return []; } };
const setCustoms = c => localStorage.setItem(LS_CUSTOM, JSON.stringify(c));
const isCustom = key => getCustoms().some(x => x.key === key);
const slug = s => (s || 'agent').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'agent';
async function loadAgents() {
  try {
    const r = await fetch('data/agents.json', { cache: 'no-store' });
    if (!r.ok) throw 0;
    const j = await r.json();
    if (Array.isArray(j) && j.length) { JSON_AGENTS = j; AGENTS = j.slice(); }
  } catch { /* file:// or offline: keep built-ins */ }
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

document.querySelectorAll('#tplGrid .tpl').forEach(b => b.onclick = () => { state.tpl = b.dataset.tpl; render(); });
document.querySelectorAll('.swatches button').forEach(b => b.onclick = () => { $('fColor').value = b.dataset.c; render(); });
['fColor','fColorHex','fNombre','fCargo','fZona','fTel','fEmail','fWeb','fDir','fDirUrl','fListings','fLinkedin','fInstagram','fWhatsapp','fFoto','fLogo','fCertCRS','fCertAEI','fCertRealtor','fCertSR23','fCertSR24','fCertLux','fLegal','cCRS','cAEI','cRealtor','cSR23','cSR24','cLux','vFoto','vZona','vSocial','vCerts','vLegal'].forEach(id => $(id).addEventListener('input', render));
$('fColorHex').addEventListener('change', e => { if (/^#[0-9a-f]{6}$/i.test(e.target.value)) $('fColor').value = e.target.value; render(); });
$('fFotoFile').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const fr = new FileReader(); fr.onload = () => { $('fFoto').value = fr.result; render(); toast('Photo loaded (for the final email use a public https link).'); }; fr.readAsDataURL(f);
});
$('btnAddLink').onclick = () => addLinkRow();
$('btnCopyRich').onclick = copyRich; $('btnCopyHtml').onclick = copyHtml; $('btnDownload').onclick = download;
$('agentSearch').addEventListener('focus', e => { renderAgentList(e.target.value); $('agentList').classList.remove('hidden'); });
$('agentSearch').addEventListener('input', e => { renderAgentList(e.target.value); $('agentList').classList.remove('hidden'); });
$('agentSearch').addEventListener('blur', () => setTimeout(() => $('agentList').classList.add('hidden'), 150));
$('agentSearch').addEventListener('keydown', e => { if (e.key === 'Enter') { const first = $('agentList').querySelector('.agent-item'); if (first) { fillAgent(AGENTS.find(x => x.key === first.dataset.key)); $('agentList').classList.add('hidden'); } } });
$('toggleCode').onchange = e => $('codeBox').classList.toggle('hidden', !e.target.checked);
$('btnSaveAgent').onclick = saveCurrentAgent;
$('btnExportAgents').onclick = exportAgentsJSON;
loadAgents().then(() => { restoreAutosave(); render(); });
