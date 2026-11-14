
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
  dreamCards.forEach(card => card.addEventListener('click', () => {
    dreamCards.forEach(item => item.classList.remove('selected'));
    card.classList.add('selected');
    dreamReveal.textContent = card.dataset.dream;
  }));

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
  const filmNext = document.getElementById('filmNext');
  const filmFinalLine = document.getElementById('filmFinalLine');
  const filmToFinale = document.getElementById('filmToFinale');
  filmNext?.addEventListener('click', () => {
    if (scene < scenes.length - 1) {
      scene++;
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
