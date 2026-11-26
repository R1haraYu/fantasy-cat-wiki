/* Homepage hero: birthday characters, or the official community fallback. */
(() => {
  "use strict";
  const hero = document.getElementById("birthdayHero");
  const media = document.getElementById("heroMedia");
  const caption = document.getElementById("heroCaption");
  const chip = document.getElementById("heroChip");
  const WIKI_VERSION = "0.8.1";
  if (!hero || !media || !caption) return;

  const roster = (window.CODEX || []).filter((c) => !c.hidden);
  const params = new URLSearchParams(location.search);
  const forced = params.get("date");
  const now = new Date();
  const today = forced || `${now.getMonth() + 1}月${now.getDate()}日`;
  const birthdays = roster.filter((c) => String(c.birthday || "").trim() === today);
  let timer = null;

  function imageFor(c) {
    return `img/bust/${c.id}.png`;
  }
  function fallbackFor(c) {
    return `img/icon/${c.id}.png`;
  }

  function setImage(src, fallback, alt) {
    media.innerHTML = "";
    const img = new Image();
    img.alt = alt || "";
    img.loading = "eager";
    img.src = src;
    img.onerror = () => {
      if (fallback && img.src.indexOf(fallback) < 0) img.src = fallback;
    };
    media.appendChild(img);
  }

  function renderBirthday(index) {
    const c = birthdays[index];
    hero.classList.add("is-birthday");
    hero.classList.remove("is-community");
    setImage(imageFor(c), fallbackFor(c), c.name);
    caption.innerHTML = `<small>TODAY'S BIRTHDAY</small><b>今日是${c.name}的生日。</b><span>生日快乐。</span>`;
    chip.textContent = birthdays.length > 1 ? `BIRTHDAY ${index + 1}/${birthdays.length}` : `VERSION / ${WIKI_VERSION}`;
  }

  function renderCommunity() {
    hero.classList.add("is-community");
    hero.classList.remove("is-birthday");
    setImage("img/brand/qq_group.webp", "", "幻想之都的黑猫官方QQ群");
    caption.innerHTML = `<small>OFFICIAL COMMUNITY</small><b>BUG反馈、建议、吹水 都可以来啊</b><span>官方QQ群 · 444215288</span>`;
    chip.textContent = `VERSION / ${WIKI_VERSION}`;
  }

  if (!birthdays.length) {
    renderCommunity();
    return;
  }

  let index = 0;
  const show = (i) => {
    index = (i + birthdays.length) % birthdays.length;
    renderBirthday(index);
  };
  show(0);
  if (birthdays.length > 1) {
    timer = window.setInterval(() => show(index + 1), 5200);
    hero.addEventListener("mouseenter", () => window.clearInterval(timer));
    hero.addEventListener("mouseleave", () => { timer = window.setInterval(() => show(index + 1), 5200); });
  }
})();
