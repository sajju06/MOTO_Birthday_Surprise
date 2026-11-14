
/* Birthday-only scenes. Existing romance, password, music and Supabase flows remain untouched. */
(() => {
  const enter = document.getElementById('enterBirthdayExperience');
  enter?.addEventListener('click', () => showPage(0));

  // Full-screen cinematic food reveal for each mystery gift.
  const giftSurprises = [
    { title: 'A BIRYANI TREAT FOR YOU', subtitle: 'Your first birthday surprise', image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Chicken_Biryani_in_plate.jpg', alt: 'A full plate of chicken biryani', message: 'Tumhari favourite biryani — pehla surprise sirf tumhare liye! ♡' },
    { title: 'A BURGER JUST FOR YOU', subtitle: 'Your second birthday surprise', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=2000&q=95', alt: 'A delicious juicy burger', message: 'Birthday girl ke liye ek yummy burger treat! ♡' },
    { title: 'SPICY SNACKS TIME', subtitle: 'Your third birthday surprise', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=2000&q=95', alt: 'A bowl of crunchy spicy potato chips', message: 'Spicy Lays aur Black Kukurey — dono tumhare liye! 🌶️' }
  ];
  let giftModal = document.getElementById('giftCinemaModal');
  if (!giftModal) {
    giftModal = document.createElement('div');
    giftModal.id = 'giftCinemaModal';
    giftModal.className = 'gift-cinema-modal';
    giftModal.setAttribute('aria-hidden', 'true');
    giftModal.innerHTML = '<button class="gift-cinema-back" type="button" aria-label="Back to gifts">← <span>BACK TO GIFTS</span></button><div class="gift-cinema-image-wrap"><img class="gift-cinema-image" alt=""></div><div class="gift-cinema-caption"><p class="gift-cinema-subtitle"></p><h2 class="gift-cinema-title"></h2><p class="gift-cinema-message"></p></div>';
    document.body.appendChild(giftModal);
  }
  const closeGiftCinema = () => {
    giftModal.classList.remove('is-visible');
    giftModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gift-cinema-open');
    const image = giftModal.querySelector('.gift-cinema-image');
    image.removeAttribute('src');
  };
  giftModal.querySelector('.gift-cinema-back').addEventListener('click', closeGiftCinema);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && giftModal.classList.contains('is-visible')) closeGiftCinema();
  });
  document.querySelectorAll('.birthday-gift').forEach(card => {
    card.addEventListener('click', () => {
      const item = giftSurprises[Number(card.dataset.gift)] || giftSurprises[0];
      giftModal.querySelector('.gift-cinema-image').src = item.image;
      giftModal.querySelector('.gift-cinema-image').alt = item.alt;
      giftModal.querySelector('.gift-cinema-subtitle').textContent = item.subtitle;
      giftModal.querySelector('.gift-cinema-title').textContent = item.title;
      giftModal.querySelector('.gift-cinema-message').textContent = item.message;
      giftModal.classList.add('is-visible');
      giftModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('gift-cinema-open');
    });
  });

  const candles = [...document.querySelectorAll('#birthdayCake .cake-candle')];
  const cakeNext = document.getElementById('cakeNext');
  let blown = 0;
  candles.forEach(candle => candle.addEventListener('click', () => {
    if (candle.classList.contains('blown')) return;
    candle.classList.add('blown');
    candle.setAttribute('aria-label', 'Candle blown out');
    blown++;
    if (blown === candles.length) {
      document.getElementById('cakeInstruction').classList.add('hidden');
      const blessing = document.getElementById('cakeBlessing');
      blessing.classList.remove('hidden');
      blessing.scrollIntoView({behavior:'smooth',block:'nearest'});
      cakeNext.disabled = false;
      cakeNext.textContent = 'See your birthday memories ♡';
    }
  }));

  document.querySelectorAll('.moto-photo-slot').forEach(slot => {
    const img = slot.querySelector('img');
    img.addEventListener('load', () => slot.classList.add('has-photo'));
    img.addEventListener('error', () => slot.classList.remove('has-photo'));
    if(img.complete && img.naturalWidth>0) slot.classList.add('has-photo');
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
  document.getElementById('birthdayToMessageBook')?.addEventListener('click', () => showPage(27));
  document.getElementById('continueToOldChapters')?.addEventListener('click', () => showPage(10));
  document.getElementById('birthdayReplay')?.addEventListener('click', () => showPage(0));


  // Birthday sky wishes reveal one personal dua at a time.
  document.querySelectorAll('.sky-wish').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.sky-wish').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    const reveal=document.getElementById('skyWishReveal');
    if(reveal) reveal.textContent=button.dataset.wish;
  }));

  // Future-self letter opens like a sealed keepsake.
  document.getElementById('openFutureLetter')?.addEventListener('click', () => {
    const reveal=document.getElementById('futureLetterReveal');
    if(reveal){reveal.hidden=false;reveal.classList.add('revealed');}
    const button=document.getElementById('openFutureLetter');
    if(button){button.classList.add('opened');button.innerHTML='<span>♡</span><small>LETTER OPENED</small>';button.disabled=true;}
  });

  // Party mode: launch a short confetti burst on demand.
  document.getElementById('startBirthdayParty')?.addEventListener('click', () => {
    const status=document.getElementById('partyStatus');
    if(status) status.textContent='HAPPY BIRTHDAY, MOTO! Tonight is yours! ♡';
    const page=document.getElementById('birthdayParty');
    page?.classList.add('party-started');
    for(let i=0;i<65;i++){
      const piece=document.createElement('i');
      piece.className='party-confetti';
      piece.style.left=(Math.random()*100)+'%';
      piece.style.animationDelay=(Math.random()*1.8)+'s';
      piece.style.setProperty('--drift',(Math.random()*180-90)+'px');
      page?.appendChild(piece);
      setTimeout(()=>piece.remove(),4800);
    }
  });

  // Twelve month wishes, each with a different blessing.
  const monthWishes=[
    'May January bring fresh beginnings, calm mornings and renewed hope.',
    'May February surround you with tenderness, kindness and affection.',
    'May March bring courage for every new step you take.',
    'May April fill your days with blooming happiness and beautiful surprises.',
    'May May bring success to the work you put your heart into.',
    'May June give you peaceful days and laughter that lasts.',
    'May July bring new adventures and memories worth keeping.',
    'May August bless you with strength, confidence and good health.',
    'May September open doors to opportunities you have been praying for.',
    'May October bring warmth, comfort and the sweetest little moments.',
    'May November reward your patience with progress and barakah.',
    'May December end your year with gratitude, love and countless reasons to smile.'
  ];
  document.querySelectorAll('.month-wish').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.month-wish').forEach(item=>item.classList.remove('selected'));
    button.classList.add('selected');
    const reveal=document.getElementById('monthWishReveal');
    if(reveal) reveal.textContent=monthWishes[Number(button.dataset.month)];
  }));

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
