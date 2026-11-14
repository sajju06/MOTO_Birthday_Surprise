
/* Birthday-only scenes. Existing romance, password, music and Supabase flows remain untouched. */
(() => {
  const enter = document.getElementById('enterBirthdayExperience');
  enter?.addEventListener('click', () => showPage(0));

  document.querySelectorAll('.birthday-gift').forEach(card => {
    card.addEventListener('click', () => {
      const surprises = [
        {title:'A plate made for you ♡', image:'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=1100&q=90', alt:'A delicious plate of biryani', message:'Tumhari favourite biryani! Aaj ka pehla surprise sirf tumhare liye. 🍽️'},
        {title:'Your burger treat ♡', image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1100&q=90', alt:'A juicy burger', message:'Ek yummy burger, kyun ke birthday girl ko treat to banti hai! 🍔'},
        {title:'A spicy little treat ♡', image:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=1100&q=90', alt:'A bowl of spicy potato chips', message:'Spicy Lays aur Black Kukurey — tumhare favourite spicy snacks! 🌶️'}
      ];
      const item = surprises[Number(card.dataset.gift)] || surprises[0];
      document.querySelectorAll('.birthday-gift').forEach(gift => {
        gift.classList.remove('opened');
        gift.querySelector('.gift-emoji').textContent = '🎁';
        gift.querySelector('b').textContent = 'Open me';
        gift.querySelector('small').textContent = 'A little surprise ♡';
      });
      card.classList.add('opened');
      card.querySelector('.gift-emoji').textContent = '✨';
      card.querySelector('b').textContent = 'Surprise opened!';
      card.querySelector('small').textContent = 'Tap another gift to discover it';
      const reveal = document.getElementById('birthdayGiftReveal');
      reveal.innerHTML = '<button class="gift-reveal-close" type="button" aria-label="Close surprise">×</button><div class="gift-reveal-picture"><img src="'+item.image+'" alt="'+item.alt+'" loading="lazy"></div><div class="gift-reveal-copy"><p class="birthday-kicker">YOUR SURPRISE IS HERE</p><h3>'+item.title+'</h3><p>'+item.message+'</p></div>';
      reveal.classList.add('is-open');
      reveal.querySelector('.gift-reveal-close').addEventListener('click', () => {
        reveal.classList.remove('is-open');
        reveal.innerHTML = '<span class="gift-reveal-hint">Choose a wrapped gift to reveal what\'s inside ✨</span>';
        card.classList.remove('opened');
        card.querySelector('.gift-emoji').textContent = '🎁';
        card.querySelector('b').textContent = 'Open me';
      });
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
