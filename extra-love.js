
/* Four interactive romantic experiences for MOTO */
(() => {
  const stars = [...document.querySelectorAll('.named-star')];
  const starMessage = document.getElementById('namedStarMessage');
  stars.forEach(star => star.addEventListener('click', () => {
    stars.forEach(item => item.classList.remove('selected'));
    star.classList.add('selected');
    starMessage.textContent = star.dataset.star;
  }));

  const dreamCards = [...document.querySelectorAll('.dream-card')];
  const dreamReveal = document.getElementById('dreamReveal');
  const dreamCinema = document.getElementById('dreamCinema');
  const dreamVideo = document.getElementById('dreamCinemaVideo');
  const dreamBack = document.getElementById('dreamCinemaBack');
  if (dreamCinema && dreamCinema.parentElement !== document.body) document.body.appendChild(dreamCinema);
  const dreamTitle = document.getElementById('dreamCinemaTitle');
  const dreamKicker = document.getElementById('dreamCinemaKicker');
  const dreamLine = document.getElementById('dreamCinemaLine');
  const dreamProgress = document.getElementById('dreamCinemaProgress');
  let dreamTimer = null;
  let dreamLineIndex = 0;
  const dreamScenes = {
    home: {
      title: 'ہمارا اپنا گھر',
      kicker: 'ایک چھوٹا سا جہاں، صرف ہم دونوں کے لیے',
      video: 'https://www.pexels.com/download/video/34955006/',
      lines: [
        'ایک چھوٹا سا گھر ہو، جہاں ہر کونے میں ہماری محبت بسی ہو۔',
        'صبح تمہاری مسکراہٹ سے ہو، اور شام تمہارے ساتھ چائے سے۔',
        'دنیا کتنی بھی مصروف ہو، گھر لوٹ کر سکون صرف تم میں ملے۔',
        'میں تمہارے ساتھ ایسی ہزاروں عام مگر خوبصورت شامیں جینا چاہتا ہوں۔',
        'میرا خواب کوئی محل نہیں… بس تم، میں، اور ہمارا اپنا سا گھر۔'
      ]
    },
    travel: {
      title: 'دنیا کی سیر',
      kicker: 'ہاتھ میں ہاتھ، منزل سے زیادہ تمہارا ساتھ',
      video: 'https://www.pexels.com/download/video/37528377/',
      lines: [
        'کبھی پہاڑوں کے راستے ہوں، کبھی ڈوبتے سورج کے رنگ۔',
        'نئے شہر دیکھیں، نئی یادیں بنائیں، اور ہر سفر میں تم ساتھ ہو۔',
        'راستے لمبے ہوں تو کیا، تمہارا ہاتھ میرے ہاتھ میں ہو۔',
        'میں دنیا کی خوبصورتی تمہاری آنکھوں سے دیکھنا چاہتا ہوں۔',
        'میری پسندیدہ منزل ہمیشہ وہ جگہ ہوگی جہاں تم میرے ساتھ ہو۔'
      ]
    },
    joy: {
      title: 'چھوٹی چھوٹی خوشیاں',
      kicker: 'وہ لمحے جو تمہارے ساتھ خاص بن جاتے ہیں',
      video: 'https://www.pexels.com/download/video/34786652/',
      lines: [
        'بارش کی ہلکی آواز، کھڑکی کے پاس دو کپ چائے۔',
        'بے وجہ ہنسنا، چھوٹی چھوٹی باتیں، اور تمہاری پیاری سی مسکراہٹ۔',
        'کبھی خاموشی بھی ہو تو وہ تمہارے ساتھ خوبصورت لگے۔',
        'مجھے بڑی خوشیوں سے زیادہ تمہارے ساتھ کے یہ چھوٹے لمحے عزیز ہیں۔',
        'زندگی کی سب سے خوبصورت عادت… ہر دن تمہیں چننا ہے۔'
      ]
    }
  };
  function showDreamLine() {
    const scene = dreamScenes[dreamCinema?.dataset.scene];
    if (!scene) return;
    dreamLine.textContent = scene.lines[dreamLineIndex];
    dreamLine.classList.remove('dream-line-refresh');
    void dreamLine.offsetWidth;
    dreamLine.classList.add('dream-line-refresh');
    dreamProgress.style.width = ((dreamLineIndex + 1) / scene.lines.length * 100) + '%';
    dreamLineIndex = (dreamLineIndex + 1) % scene.lines.length;
  }
  function closeDreamCinema() {
    dreamCinema?.classList.remove('is-open');
    dreamCinema?.setAttribute('aria-hidden','true');
    if (dreamTimer) clearInterval(dreamTimer);
    dreamTimer = null;
    if (dreamVideo) { dreamVideo.pause(); dreamVideo.removeAttribute('src'); dreamVideo.load(); }
  }
  dreamCards.forEach(card => card.addEventListener('click', () => {
    const key = card.dataset.scene || 'home';
    const scene = dreamScenes[key];
    if (!scene || !dreamCinema || !dreamVideo) return;
    dreamCards.forEach(item => item.classList.remove('selected'));
    card.classList.add('selected');
    dreamCinema.dataset.scene = key;
    dreamTitle.textContent = scene.title;
    dreamKicker.textContent = scene.kicker;
    dreamLineIndex = 0;
    dreamVideo.src = scene.video;
    dreamCinema.classList.add('is-open');
    dreamCinema.setAttribute('aria-hidden','false');
    showDreamLine();
    dreamVideo.load();
    const playAttempt = dreamVideo.play();
    if (playAttempt?.catch) playAttempt.catch(() => {});
    if (dreamTimer) clearInterval(dreamTimer);
    dreamTimer = setInterval(showDreamLine, 5200);
  }));
  dreamBack?.addEventListener('click', closeDreamCinema);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dreamCinema?.classList.contains('is-open')) closeDreamCinema();
  });

  const heartbeatButton = document.getElementById('heartbeatButton');
  const heartbeatMessage = document.getElementById('heartbeatMessage');
  const heartbeatCount = document.getElementById('heartbeatCount');
  const heartbeatNotes = [
    'میرا دل ہر دھڑکن میں تمہارا نام لیتا ہے۔',
    'تمہاری خوشی میرے دل کا سب سے خوبصورت خواب ہے۔',
    'تم ساتھ ہو تو ہر مشکل راستہ آسان لگتا ہے۔',
    'میری ہر دعا میں تمہاری مسکراہٹ شامل ہے۔',
    'اگر دل کی آواز سنو تو ہر طرف تم ہی تم ہو۔',
    'میں ہر دن تمہیں پہلے سے زیادہ چاہنے کا وعدہ کرتا ہوں۔'
  ];
  let beats = 0;
  heartbeatButton?.addEventListener('click', () => {
    beats++;
    heartbeatMessage.textContent = heartbeatNotes[(beats - 1) % heartbeatNotes.length];
    heartbeatCount.textContent = 'دل کی دھڑکنیں: ' + String(beats).padStart(2, '0').replace(/[0-9]/g, n => '۰۱۲۳۴۵۶۷۸۹'[Number(n)]);
    heartbeatButton.classList.remove('heart-burst');
    void heartbeatButton.offsetWidth;
    heartbeatButton.classList.add('heart-burst');
  });

  const scenes = [
    'اگر زندگی مجھے دوبارہ شروع کرنے کا موقع دے...',
    'تو میں پھر تم سے ملنے کی دعا مانگوں گا۔',
    'پھر تمہاری مسکراہٹ کو اپنی خوشی بناؤں گا۔',
    'پھر تمہارے ساتھ خواب دیکھوں گا، اور ہر مشکل میں تمہارا ہاتھ تھاموں گا۔',
    'اور جب انتخاب کا وقت آئے گا، میرا دل پھر تمہیں ہی چنے گا۔'
  ];
  let scene = 0;
  const sceneText = document.getElementById('filmSceneText');
  const sceneNumber = document.getElementById('filmSceneNumber');
  const filmFrame = document.getElementById('filmFrame');
  const filmNext = document.getElementById('filmNext');
  const filmFinalLine = document.getElementById('filmFinalLine');
  const filmToFinale = document.getElementById('filmToFinale');
  filmNext?.addEventListener('click', () => {
    if (scene < scenes.length - 1) {
      scene++;
      if (filmFrame) filmFrame.dataset.scene = String(scene);
      sceneText.textContent = scenes[scene];
      sceneNumber.textContent = 'منظر ' + '۱۲۳۴۵'[scene] + ' / ۵';
      sceneText.classList.remove('scene-change');
      void sceneText.offsetWidth;
      sceneText.classList.add('scene-change');
    } else {
      filmNext.classList.add('hidden');
      filmFinalLine.classList.remove('hidden');
      filmToFinale.classList.remove('hidden');
    }
  });
})();
