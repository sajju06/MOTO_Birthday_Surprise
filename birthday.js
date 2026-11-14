
/* Birthday-only scenes. Existing romance, password, music and Supabase flows remain untouched. */
(() => {
  const enter = document.getElementById('enterBirthdayExperience');
  enter?.addEventListener('click', () => showPage(0));

  document.querySelectorAll('.birthday-gift').forEach(card => {
    card.addEventListener('click', () => {
      const messages = [
        'Meri jaan, tum meri zindagi ka sabse khoobsurat tohfa ho. Main chahta hoon tumhara har din pyaar aur izzat se bhara ho. 💌',
        'Allah tumhare har naye saal ko sehat, sukoon, kamyabi, halal rizq aur dil ki khushiyon se bhar de. Ameen. ✨',
        'Aaj ki raat ki queen tum ho — aur meri zindagi ke har din ki favourite person bhi. 👑'
      ];
      document.querySelectorAll('.birthday-gift').forEach(item => item.classList.remove('opened'));
      card.classList.add('opened');
      const reveal = document.getElementById('birthdayGiftReveal');
      reveal.textContent = messages[Number(card.dataset.gift)] || messages[0];
    });
  });

  const candles = [...document.querySelectorAll('.cake-candle')];
  const cakeNext = document.getElementById('cakeNext');
  let blown = 0;
  candles.forEach(candle => candle.addEventListener('click', () => {
    if (candle.classList.contains('blown')) return;
    candle.classList.add('blown');
    blown++;
    if (blown === candles.length) {
      document.getElementById('cakeInstruction').classList.add('hidden');
      document.getElementById('cakeBlessing').classList.remove('hidden');
      cakeNext.disabled = false;
      cakeNext.textContent = 'See your birthday memories ♡';
    }
  }));

  document.querySelectorAll('.moto-photo-slot').forEach(slot => {
    const img = slot.querySelector('img');
    img.addEventListener('load', () => slot.classList.add('has-photo'));
    img.addEventListener('error', () => slot.classList.remove('has-photo'));
    slot.addEventListener('click', () => {
      if (!slot.classList.contains('has-photo')) return;
      const lightbox = document.getElementById('lightbox');
      const lightboxImage = document.getElementById('lightboxImage');
      const caption = document.getElementById('lightboxCaption');
      lightboxImage.src = slot.dataset.photo;
      lightboxImage.alt = slot.dataset.photo;
      caption.textContent = slot.dataset.caption;
      lightbox.classList.remove('hidden');
    });
  });

  cakeNext?.addEventListener('click', () => { if (!cakeNext.disabled) showPage(4); });
  document.getElementById('birthdayToMessageBook')?.addEventListener('click', () => showPage(23));
  document.getElementById('birthdayReplay')?.addEventListener('click', () => showPage(0));

  // A separate birthday track can be added without replacing the couple's original song.
  const birthdayAudio = document.getElementById('birthdayAudio');
  const musicMode = document.getElementById('musicModeToggle');
  if (musicMode && birthdayAudio) {
    let birthdayMode = false;
    musicMode.addEventListener('click', async () => {
      const coupleAudio = document.getElementById('backgroundMusic');
      const mainMusic = window.birthdaySong;
      birthdayMode = !birthdayMode;
      if (birthdayMode) {
        if (mainMusic) mainMusic.pause();
        if (coupleAudio) coupleAudio.pause();
        try {
          await birthdayAudio.play();
          musicMode.textContent = 'BIRTHDAY MUSIC ON';
        } catch (error) {
          musicMode.textContent = 'BIRTHDAY TRACK MISSING — OUR SONG';
          birthdayMode = false;
          if (mainMusic) { try { await mainMusic.play(); } catch (_) {} }
        }
      } else {
        birthdayAudio.pause();
        if (mainMusic) { try { await mainMusic.play(); } catch (_) {} }
        musicMode.textContent = 'OUR SONG PLAYING';
      }
    });
  }
})();
