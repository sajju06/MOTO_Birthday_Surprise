const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const pages = $$('.page');
let currentPage = 0;
let heartsCaught = 0, gameTimer = null, gameStarted = false;
const PASSWORD = '28-11-2006';

function makeParticles(){
  const host = $('#particles');
  for(let i=0;i<75;i++){
    const p=document.createElement('i'); p.className='particle';
    p.style.left=Math.random()*100+'%'; p.style.top=Math.random()*100+'%';
    p.style.animationDelay=(Math.random()*4)+'s'; p.style.animationDuration=(3+Math.random()*5)+'s';
    host.appendChild(p);
  }
}
makeParticles();



const birthdaySong = new Audio('./music/our-song.mp3.mp4');

birthdaySong.loop = true;
birthdaySong.volume = 0.7;
birthdaySong.preload = 'auto';

let songStarted = false;

async function playBirthdaySong() {
    if (songStarted) return;

    try {
        await birthdaySong.play();
        songStarted = true;
        console.log('Birthday song started!');
    } catch (error) {
        console.log('Waiting for user interaction:', error);
    }
}

document.addEventListener('click', playBirthdaySong);
document.addEventListener('touchstart', playBirthdaySong);

window.addEventListener('load', playBirthdaySong);


function showPage(index){
  if(index<0 || index>=pages.length) return;
  if(currentPage===4 && index!==4 && gameStarted && heartsCaught<10) return;

  
  pages.forEach((p,i)=>p.classList.toggle('active',i===index));
  currentPage=index;
  $('#progressBar').style.width=((index)/(pages.length-1)*100)+'%';

  if(index===11) startFireworks();

  window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-next]').forEach(btn=>btn.addEventListener('click',()=>showPage(currentPage+1)));
$('#unlockBtn').addEventListener('click',unlock);
$('#passwordInput').addEventListener('keydown',e=>{if(e.key==='Enter')unlock()});
function unlock(){
  const value=$('#passwordInput').value.trim(); 
  if(value===PASSWORD){$('#lockScreen').classList.add('unlocked');$('#lockError').textContent='';}
  else{$('#lockError').textContent='That is not our secret date. Try again ♡';$('#passwordInput').value='';$('#passwordInput').focus();}
}

$('#yesSpecial').onclick=()=>$('#specialReply').textContent='Then let me remind you: you are one of the best things in my life. ♡';
$('#noSpecial').onclick=()=>$('#specialReply').textContent='You are my once-in-a-lifetime kind of person. Never forget that.';


const quizData = [
  {
    q: 'What is my favourite place to be?',
    a: [
      'Anywhere with you',
      'At the moon',
      'In a crowded room',
      'Nowhere at all'
    ],
    correct: 0,
    why: 'Exactly. Anywhere feels better when you are there.'
  },
  {
    q: 'What do I wish for you most?',
    a: [
      'More expensive things',
      'A happy heart and fulfilled dreams',
      'More rainy days',
      'Endless sleep'
    ],
    correct: 1,
    why: 'Your happiness is one of my favourite wishes.'
  },
  {
    q: 'How long do I want to keep making memories?',
    a: [
      'One day',
      'A little while',
      'As long as life lets me',
      'Until the next page'
    ],
    correct: 2,
    why: 'The answer is always: as long as I get to.'
  }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz() {

  const item = quizData[quizIndex];
  quizAnswered = false;

  $('#quizCount').textContent =
    `QUESTION 0${quizIndex + 1} / 03`;

  $('#quizScore').textContent = '♡ ' + quizScore;

  $('#quizProgress').style.width =
    (quizIndex / quizData.length * 100) + '%';

  $('#quizQuestion').textContent = item.q;

  $('#quizFeedback').textContent = '';

  $('#quizNext').classList.add('hidden');

  const host = $('#quizOptions');
  host.innerHTML = '';

  item.a.forEach((answer, i) => {

    const b = document.createElement('button');

    b.className = 'quiz-option';
    b.textContent = answer;

    b.onclick = function () {

      if (quizAnswered) return;

      // WRONG ANSWER
      if (i !== item.correct) {

        b.classList.add('wrong');

        $('#quizFeedback').textContent =
          "I don't expect that from you 🥺 Try again!";

        $('#quizNext').classList.add('hidden');

        return;
      }

      // CORRECT ANSWER
      quizAnswered = true;
      quizScore++;

      b.classList.add('correct');

      $('#quizFeedback').textContent = item.why;

      $('#quizScore').textContent = '♡ ' + quizScore;

      $('#quizProgress').style.width =
        ((quizIndex + 1) / quizData.length * 100) + '%';

      $$('.quiz-option', host).forEach(option => {
        option.disabled = true;
      });

      $('#quizNext').classList.remove('hidden');

      $('#quizNext').textContent =
        quizIndex === quizData.length - 1
          ? 'Finish our quiz →'
          : 'Next question →';
    };

    host.appendChild(b);
  });
}

// NEXT QUESTION BUTTON
$('#quizNext').onclick = function () {

  if (!quizAnswered) return;

  if (quizIndex < quizData.length - 1) {

    quizIndex++;
    renderQuiz();

  } else {

    quizIndex = 0;
    renderQuiz();
    showPage(4);

  }
};

// START QUIZ
renderQuiz();


function spawnHeart(){
  if(heartsCaught>=10)return;
  const h=document.createElement('button');h.className='fall-heart';h.innerHTML=Math.random()>.5?'♥':'♡';
  h.style.left=(4+Math.random()*90)+'%';h.style.fontSize=(20+Math.random()*23)+'px';
  h.style.animationDuration=(4+Math.random()*3)+'s';h.style.animationDelay=(Math.random()*.4)+'s';
  h.setAttribute('aria-label','Catch heart');
  h.onclick=()=>{if(h.dataset.caught)return;h.dataset.caught='1';heartsCaught++;$('#heartCount').textContent=String(heartsCaught).padStart(2,'0');$('#heartProgress').style.width=(heartsCaught*10)+'%';h.remove();if(heartsCaught>=10)finishGame();};
  $('#heartField').appendChild(h);setTimeout(()=>h.remove(),8000);
}
function finishGame(){clearInterval(gameTimer);$('#gameComplete').classList.remove('hidden');$('#gameContinue').classList.remove('hidden');$('#startGame').classList.add('hidden');}
$('#startGame').onclick=()=>{if(gameStarted)return;gameStarted=true;$('#startGame').textContent='Catch the hearts!';gameTimer=setInterval(spawnHeart,430);for(let i=0;i<5;i++)setTimeout(spawnHeart,i*200);};


/* ===== MEMORIES ANIMATION ===== */

const memoryCards = document.querySelectorAll('.memory-card');

const memoryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      memoryObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

memoryCards.forEach(card => {
  memoryObserver.observe(card);
});

/* Continue Journey */

document.getElementById('memoryContinue').addEventListener('click', () => {
  showPage(7);
});



function closeLightbox(){$('#lightbox').classList.add('hidden');$('#lightboxImage').style.display='block';}
$('#closeLightbox').onclick=closeLightbox;$('#lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

let letterOpened=false;
$('#envelope').onclick=()=>{
  if(letterOpened)return;letterOpened=true;$('#envelope').classList.add('open');$('#envelopeHint').textContent='A LITTLE NOTE FROM MY HEART';
  setTimeout(()=>{
    $('#letterText').classList.remove('hidden');
    const target='Happy Birthday, My Beautiful Wife! ❤️🎂 Meri jaan, tum meri zindagi ka woh khoobsurat hissa ho jiske bina meri duniya adhoori hai. Tumhari muskurahat mere din ko roshan kar deti hai, tumhari awaaz mere dil ko sukoon deti hai, aur tumhara saath meri zindagi ka sabse khoobsurat tohfa hai.Main shayad lafzon mein kabhi bayan na kar sakoon ke tum mere liye kitni khaas ho. Bas itna jaanta hoon ke har guzarta din mujhe tumse aur zyada mohabbat karna sikha deta hai. ❤️Aaj tumhare birthday par meri dua hai ke Allah tumhari zindagi ko khushiyon, sehat, kamyabi aur bepanah mohabbat se bhar de. Tumhari aankhon mein kabhi aansu na aayein, tumhari muskurahat kabhi kam na ho, aur tumhare har khwab ko haqeeqat banne ka mauqa mile.Main tumse sirf aaj nahi, har aane wale din mohabbat karna chahta hoon. Main chahta hoon ke zindagi ke har naye saal mein tumhare saath naye khwab dekhoon, naye lamhe jeeyoon aur hazaaron khoobsurat yaadein banaoon.You are not just my wife, you are my favourite person, my happiness, my peace, and my forever love. 💕Happy Birthday, meri mohabbat  I love you more than words could ever explain. Today, tomorrow, and forever. ❤️♾️';
    
    
    
    
    
    
    const el=$('#typedLetter');el.textContent='';let i=0;
    const timer=setInterval(()=>{el.textContent+=target[i++]||'';if(i>target.length)clearInterval(timer)},25);
  },900);
};
$$('.wish-star').forEach(star=>star.onclick=()=>{$('#wishMessage').textContent=star.dataset.message;star.style.color='#fff';});
$$('.future-choice').forEach(choice=>choice.onclick=()=>{$$('.future-choice').forEach(c=>c.classList.remove('selected'));choice.classList.add('selected');$('#futureReply').textContent=choice.dataset.future;});

function openGift(){
  if($('#giftBox').classList.contains('open'))return;
  $('#giftBox').classList.add('open');$('#giftMessage').classList.add('show');$('#openGift').classList.add('hidden');$('#giftNext').classList.remove('hidden');
}
$('#openGift').onclick=openGift;$('#giftBox').onclick=openGift;$('#giftBox').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openGift()}};

const audio=$('#backgroundMusic'),musicBtn=$('#musicToggle');
musicBtn.onclick=async()=>{try{if(audio.paused){await audio.play();musicBtn.classList.add('playing');$('#musicLabel').textContent='NOW PLAYING'}else{audio.pause();musicBtn.classList.remove('playing');$('#musicLabel').textContent='OUR SONG'}}catch(e){$('#musicLabel').textContent='ADD YOUR SONG';}};
audio.onended=()=>{musicBtn.classList.remove('playing');$('#musicLabel').textContent='OUR SONG'};

let fireworkFrame=null;
function startFireworks(){
  const canvas=$('#fireworks'),ctx=canvas.getContext('2d');canvas.width=canvas.offsetWidth*devicePixelRatio;canvas.height=canvas.offsetHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);
  const w=canvas.offsetWidth,h=canvas.offsetHeight;let particles=[];
  function burst(){
    const x=Math.random()*w,y=Math.random()*h*.65+20;
    for(let i=0;i<45;i++){const a=Math.PI*2*i/45,s=1+Math.random()*3;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:65+Math.random()*30,max:95});}
  }
  if(fireworkFrame)cancelAnimationFrame(fireworkFrame);
  let ticks=0;
  function draw(){
    ctx.clearRect(0,0,w,h);if(ticks%55===0)burst();ticks++;
    particles=particles.filter(p=>p.life>0);
    particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.018;p.vx*=.99;p.life--;ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.life%3===0?'#f4d7a5':'#eea6c6';ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill()});
    ctx.globalAlpha=1;fireworkFrame=requestAnimationFrame(draw);
  }draw();
}
$('#replay').onclick=()=>{if(fireworkFrame)cancelAnimationFrame(fireworkFrame);heartsCaught=0;gameStarted=false;clearInterval(gameTimer);$('#heartField').innerHTML='';$('#heartCount').textContent='00';$('#heartProgress').style.width='0';$('#gameComplete').classList.add('hidden');$('#gameContinue').classList.add('hidden');$('#startGame').classList.remove('hidden');$('#startGame').textContent='Let the hearts fall';letterOpened=false;$('#envelope').classList.remove('open');$('#letterText').classList.add('hidden');$('#envelopeHint').textContent='TAP THE ENVELOPE TO OPEN';showPage(0);$('#lockScreen').classList.remove('unlocked');};


document.getElementById("continueJourney").addEventListener("click", function () {
    document.querySelector('[data-page="2"]').classList.remove("active");
    document.querySelector('[data-page="3"]').classList.add("active");
});

