/* ==========================================================================
   NarrativeToys — Zero-Dependency Interactive Lab Engine for 叙事构造
   ========================================================================== */
(function (global) {
  'use strict';

  const registry = new Map();
  const mounted = new Set();

  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs && typeof attrs === 'object') {
      Object.keys(attrs).forEach((k) => {
        const v = attrs[k];
        if (v === undefined || v === null || v === false) return;
        if (k === 'class' || k === 'className') el.className = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'dataset' && typeof v === 'object') Object.keys(v).forEach((dk) => { el.dataset[dk] = v[dk]; });
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'checked' || k === 'disabled' || k === 'selected') el[k] = Boolean(v);
        else if (k === 'value') el.value = v;
        else el.setAttribute(k, String(v));
      });
    }
    const append = (item) => {
      if (item === undefined || item === null || item === false) return;
      if (Array.isArray(item)) item.forEach(append);
      else if (item instanceof Node) el.appendChild(item);
      else el.appendChild(document.createTextNode(String(item)));
    };
    children.forEach(append);
    return el;
  }

  function slider({ label, min = 0, max = 100, step = 1, value = 50, unit = '', onChange }) {
    const valEl = h('span', { class: 'nc-slider-val' }, `${value}${unit}`);
    const input = h('input', {
      type: 'range', class: 'nc-range', min, max, step, value,
      onInput: (e) => { const n = Number(e.target.value); valEl.textContent = `${n}${unit}`; if (onChange) onChange(n); },
    });
    return h('div', { class: 'nc-control' }, h('div', { class: 'nc-control-head' }, h('label', { class: 'nc-label' }, label), valEl), input);
  }

  function meter({ label, value = 50, max = 100, tone = 'accent', suffix = '%' }) {
    const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
    const valSpan = h('span', { class: 'nc-meter-val' }, `${Math.round(value)}${suffix}`);
    const fill = h('div', { class: `nc-meter-fill tone-${tone}`, style: { width: `${pct}%` } });
    const el = h('div', { class: 'nc-meter' }, h('div', { class: 'nc-meter-head' }, h('span', {}, label), valSpan), h('div', { class: 'nc-meter-track' }, fill));
    el.update = (nextVal, nextTone, customText) => {
      const p = Math.max(0, Math.min(100, Math.round((nextVal / max) * 100)));
      valSpan.textContent = customText !== undefined ? customText : `${Math.round(nextVal)}${suffix}`;
      fill.style.width = `${p}%`;
      if (nextTone) fill.className = `nc-meter-fill tone-${nextTone}`;
    };
    return el;
  }

  function registerCompare(id, meta, items) {
    register(id, meta, (root) => {
      let idx = 0;
      const pills = h('div', { class: 'nc-row' });
      const grid = h('div', { class: 'nc-grid-2' });
      const foot = h('div', { class: 'nc-callout tone-success' });
      function render() {
        pills.innerHTML = '';
        items.forEach((it, i) => pills.appendChild(h('button', { type: 'button', class: `nc-btn nc-btn-sm ${i === idx ? 'is-active' : ''}`, onClick: () => { idx = i; render(); } }, it.tab)));
        const cur = items[idx];
        grid.innerHTML = '';
        grid.append(
          h('div', { class: 'nc-panel' }, h('h5', {}, cur.leftTitle || '旧定义 / 默认剧本'), h('div', {}, cur.left)),
          h('div', { class: 'nc-panel' }, h('h5', { style: { color: 'var(--toy-teal)' } }, cur.rightTitle || '重构定义 / 新行动空间'), h('div', { style: { fontWeight: 600 } }, cur.right))
        );
        foot.innerHTML = `<strong>构造洞察：</strong>${cur.takeaway}`;
      }
      render();
      root.append(pills, grid, foot);
    });
  }

  function registerStepper(id, meta, steps) {
    register(id, meta, (root) => {
      let step = 0;
      const dots = h('div', { class: 'nc-step-dots' });
      const panel = h('div', { class: 'nc-panel' });
      const nav = h('div', { class: 'nc-row' });
      function render() {
        dots.innerHTML = '';
        steps.forEach((s, i) => dots.appendChild(h('button', { type: 'button', class: `nc-step-dot ${i === step ? 'is-current' : i < step ? 'is-done' : ''}`, onClick: () => { step = i; render(); } }, s.label)));
        const s = steps[step];
        panel.innerHTML = '';
        panel.append(
          h('h5', {}, s.title),
          h('p', { style: { margin: '0.25rem 0' } }, s.body),
          h('div', { class: 'nc-callout tone-success', style: { marginTop: '0.45rem' } }, s.note)
        );
        nav.innerHTML = '';
        nav.append(
          h('button', { type: 'button', class: 'nc-btn nc-btn-sm', disabled: step === 0, onClick: () => { step -= 1; render(); } }, '← 上一步'),
          h('button', { type: 'button', class: 'nc-btn nc-btn-primary nc-btn-sm', disabled: step === steps.length - 1, onClick: () => { step += 1; render(); } }, '下一步 →')
        );
      }
      render();
      root.append(dots, panel, nav);
    });
  }

  function registerReframe(id, meta, config) {
    register(id, meta, (root) => {
      const fact = h('div', { class: 'nc-panel' }, h('h5', {}, '原始事实形态（同一事实）'), h('div', {}, config.fact));
      let idx = 0;
      const pills = h('div', { class: 'nc-row' });
      const detail = h('div', { class: 'nc-grid-2' });
      const actionBox = h('div', { class: 'nc-callout tone-success' });

      function render() {
        pills.innerHTML = '';
        config.frames.forEach((f, i) => pills.appendChild(h('button', { type: 'button', class: `nc-btn nc-btn-sm ${i === idx ? 'is-active' : ''}`, onClick: () => { idx = i; render(); } }, f.name)));
        const cur = config.frames[idx];
        detail.innerHTML = '';
        detail.append(
          h('div', { class: 'nc-panel' }, h('h5', {}, '激活的默认情绪与角色'), h('div', {}, cur.emotion)),
          h('div', { class: 'nc-panel' }, h('h5', { style: { color: 'var(--toy-teal)' } }, '自动携带的行动剧本'), h('div', { style: { fontWeight: 600 } }, cur.script))
        );
        actionBox.className = `nc-callout tone-${cur.tone || 'success'}`;
        actionBox.innerHTML = `<strong>现实检验：</strong>${cur.check}`;
      }
      render();
      root.append(fact, pills, detail, actionBox);
    });
  }

  function register(id, meta, mountFn) {
    if (!id || typeof mountFn !== 'function') throw new Error(`NarrativeToys.register invalid: ${id}`);
    if (registry.has(id)) return;
    registry.set(id, { id, meta: meta || {}, mountFn });
  }

  function mountOne(container) {
    const id = container.getAttribute('data-nc-toy');
    if (!id) return false;
    const entry = registry.get(id);
    if (!entry) {
      container.innerHTML = `<div class="nc-toy nc-toy-error"><strong>未注册的叙事实验：</strong> <code>${id}</code></div>`;
      return false;
    }
    const render = () => {
      container.innerHTML = '';
      const body = h('div', { class: 'nc-toy-body' });
      const resetBtn = h('button', { type: 'button', class: 'nc-btn nc-btn-ghost nc-btn-sm', onClick: render }, '重置');
      const card = h('section', { class: 'nc-toy', dataset: { toyId: id } },
        h('header', { class: 'nc-toy-header' },
          h('div', { class: 'nc-toy-title-group' },
            h('span', { class: 'nc-toy-badge' }, entry.meta.badge || '叙事实验'),
            h('h4', { class: 'nc-toy-title' }, entry.meta.title || id),
            entry.meta.subtitle ? h('p', { class: 'nc-toy-subtitle' }, entry.meta.subtitle) : null
          ),
          resetBtn
        ),
        body
      );
      container.appendChild(card);
      try { entry.mountFn(body, { h, slider, meter, reset: render }); mounted.add(id); }
      catch (err) { body.innerHTML = ''; body.appendChild(h('div', { class: 'nc-callout tone-danger' }, `实验异常 (${id}): ${err.message}`)); }
    };
    render();
    return true;
  }

  function mountAll(root) {
    let count = 0;
    (root || document).querySelectorAll('[data-nc-toy]').forEach((n) => { if (mountOne(n)) count += 1; });
    return count;
  }

  global.NarrativeToys = {
    version: '1.0.0', register, registerCompare, registerStepper, registerReframe,
    mountAll, h, slider, meter, list: () => Array.from(registry.keys()), mountedCount: () => mounted.size,
  };
})(window);
