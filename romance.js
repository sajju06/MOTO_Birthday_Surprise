/* ===== MOTO ROMANTIC CHAPTER INTERACTIONS ===== */
(() => {
  const reasons = [
    "Because your smile can make an ordinary day feel special.",
    "Because your happiness matters deeply to me.",
    "Because you make the word home feel like a person.",
    "Because even silence feels peaceful when we share it.",
    "Because your little habits make you unforgettable.",
    "Because you deserve to be celebrated, every day.",
    "Because your kindness makes the world softer.",
    "Because I love seeing you chase your dreams.",
    "Because your laughter is one of my favourite sounds.",
    "Because life feels brighter with you beside me.",
    "Because you are wonderfully, beautifully yourself.",
    "Because you make simple moments worth remembering.",
    "Because I want to hear about even your smallest day.",
    "Because your dreams deserve someone cheering loudly.",
    "Because I never want you to doubt your worth.",
    "Because you bring warmth into my world.",
    "Because your presence is a gift I never take lightly.",
    "Because you make me want to become a better person.",
    "Because there is always something new to admire in you.",
    "Because your smile stays in my thoughts long after I see it.",
    "Because you are my favourite hello.",
    "Because you make ordinary days feel like little celebrations.",
    "Because I want to learn all your favourite things.",
    "Because your hopes matter to me.",
    "Because I love the way we keep writing our story.",
    "Because you are precious beyond anything money can buy.",
    "Because I want to be your safe place.",
    "Because your voice can calm a busy mind.",
    "Because I want to make you laugh on difficult days.",
    "Because you deserve tenderness and respect.",
    "Because every season with you has its own beauty.",
    "Because I love planning little adventures with you.",
    "Because your courage inspires me.",
    "Because you make the future feel full of possibility.",
    "Because I want to celebrate every version of you.",
    "Because you are more than any birthday wish could describe.",
    "Because I love discovering the world through your eyes.",
    "Because your feelings will always matter to me.",
    "Because I want to keep making memories together.",
    "Because you are my favourite thought at the end of the day.",
    "Because you make love feel like a thousand little moments.",
    "Because I want to hold space for all your dreams.",
    "Because your uniqueness is your magic.",
    "Because you deserve patience on your hardest days.",
    "Because I love the way your happiness lights up a room.",
    "Because I want to grow beside you.",
    "Because every shared laugh becomes a treasure.",
    "Because I want to keep choosing kindness with you.",
    "Because you make forever sound beautiful.",
    "Because being your husband is a part of my story I cherish.",
    "Because I want to know the stories behind your smiles.",
    "Because you deserve to feel appreciated, not just today.",
    "Because your little victories are worth celebrating.",
    "Because I want to be there for the big moments and the small ones.",
    "Because you remind me that love lives in details.",
    "Because I love the dreams we have not lived yet.",
    "Because you make my world feel more colourful.",
    "Because I want to keep learning your heart.",
    "Because your comfort matters to me.",
    "Because you are a beautiful reason to be grateful.",
    "Because I want to make more ordinary days extraordinary.",
    "Because I love your way of seeing things.",
    "Because you deserve honest words and gentle actions.",
    "Because I want to be proud of us, always.",
    "Because your smile is worth a thousand photographs.",
    "Because I want to turn little plans into lovely memories.",
    "Because you make every chapter worth reading.",
    "Because I want to protect the joy we build together.",
    "Because you are never just another person in my life.",
    "Because I love the possibility of growing old with you.",
    "Because your dreams make me dream bigger too.",
    "Because I want to keep surprising you with thoughtful things.",
    "Because you deserve to be listened to fully.",
    "Because I love sharing this one life with you.",
    "Because your happiness is never a small thing to me.",
    "Because I want to be your biggest supporter.",
    "Because even a simple day can become our favourite memory.",
    "Because you are worth every effort to love well.",
    "Because I want to keep finding new reasons to adore you.",
    "Because your heart deserves gentleness.",
    "Because I love the story only we can write.",
    "Because I want to keep holding your hand through every season.",
    "Because you make hope feel close.",
    "Because I want to keep making you feel special.",
    "Because your presence is enough to make a moment meaningful.",
    "Because I admire the person you are and the person you are becoming.",
    "Because I want to share both adventures and quiet evenings with you.",
    "Because I love that our story is still unfolding.",
    "Because you deserve a love that shows up.",
    "Because I want to keep making space for your happiness.",
    "Because you are my favourite person to make memories with.",
    "Because I want to choose you in a hundred little ways.",
    "Because there is always more to love about you.",
    "Because you make my heart grateful.",
    "Because I want to keep celebrating the gift of you.",
    "Because my favourite future is one with you in it.",
    "Because you are loved more than this list can ever explain.",
    "Because if I could choose again, I would still choose you.",
    "Because you are MOTO — my one and only kind of magic.",
    "Because loving you is a journey I want to keep choosing, every single day."
  ];
  const reasonText = document.getElementById('reasonText');
  let reasonIndex = 0;
  function showReason(index) {
    if (!reasonText) return;
    reasonText.textContent = reasons[index];
    document.getElementById('reasonNumber').textContent = String(index + 1).padStart(2, '0');
    document.getElementById('nextReason').textContent = index === 99 ? 'You have all 100 reasons ♡' : 'Reveal the next reason ♡';
  }
  document.getElementById('nextReason')?.addEventListener('click', () => {
    reasonIndex = reasonIndex === 99 ? 0 : reasonIndex + 1;
    showReason(reasonIndex);
  });
  document.getElementById('reasonRestart')?.addEventListener('click', () => { reasonIndex = 0; showReason(0); });

  const heartMessages = [
    "MOTO, you make my world softer, warmer, and more beautiful just by being in it.",
    "I may not always find the perfect words, but my heart is always full of you.",
    "Your smile is one of my favourite places to return to.",
    "I want to be beside you in the little moments that make a life.",
    "You deserve a love that feels safe, patient, honest, and kind.",
    "No matter how many pages I write, you will always be my favourite story."
  ];
  let heartMessageIndex = 0;
  document.getElementById('revealHeartMessage')?.addEventListener('click', () => {
    heartMessageIndex = (heartMessageIndex + 1) % heartMessages.length;
    const target = document.getElementById('heartMessageText');
    target.classList.remove('message-pop');
    void target.offsetWidth;
    target.textContent = heartMessages[heartMessageIndex];
    target.classList.add('message-pop');
  });

  const touchMessages = [
    "You are precious to me, in more ways than words can hold.",
    "I am proud of you, even for the battles nobody else sees.",
    "You deserve happiness that stays, not just visits.",
    "I hope I never stop finding new ways to make you smile.",
    "You are my favourite person to dream about tomorrow with.",
    "Thank you for being you. That is already more than enough.",
    "I would still choose you, in every version of our story."
  ];
  let touchCount = 0;
  document.getElementById('touchHeartButton')?.addEventListener('click', () => {
    touchCount++;
    document.getElementById('touchHeartCount').textContent = 'LOVE NOTE ' + String(touchCount).padStart(2, '0');
    document.getElementById('touchHeartMessage').textContent = touchMessages[(touchCount - 1) % touchMessages.length];
    document.getElementById('touchHeartButton').classList.remove('heart-tap');
    void document.getElementById('touchHeartButton').offsetWidth;
    document.getElementById('touchHeartButton').classList.add('heart-tap');
  });

  document.querySelectorAll('.promise-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('open');
      card.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');
    });
  });
})();
