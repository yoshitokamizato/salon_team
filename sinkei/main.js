(function(){
/*ペアの枚数*/
  var pairs = 2;
//ランダムに数値を入れる為の変数を配列にする
  var cards = [];

//一度に２枚以上めくれないようにする変数
  var flipCount = 0;
  var firstCard = null;
  var secondCard = null;

//時刻
  var startTime;
  var isRunning = false;
  var correctCount = 0;
  var timeoutId;

  function init(){/*初期化カードを生成する*/
    var i;
    var card;
    for ( i = 1; i <= pairs; i++){
      /*ペア分だけ枚数を繰り返す*/
      // document.getElementById('stage').appendChild(createCard(i));
      // document.getElementById('stage').appendChild(createCard(i));
      cards.push(createCard(i));
      cards.push(createCard(i));
    }

//めくるカードをランダムに表示する処理
  while (cards.length){
    card = cards.splice(Math.floor(Math.random() * cards.length),1)[0];
    document.getElementById('stage').appendChild(card);
    }
  }

  function createCard(num) {
    var container;
    var card;
    var inner;

   inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>';

    card = document.createElement('div');
    card.innerHTML = inner;
    card.className = 'card';
    card.addEventListener('click', function(){
      flipCard(this);

      if (isRunning === true){
        return;
      }
      isRunning = true;

      startTime = Date.now();
      runTimer();

      document.getElementById('restart').className = '';
    });

    container = document.createElement('div');
    container.className = 'card-container';
    container.appendChild(card);
    return container;
  }

  function flipCard(card) {
    if (firstCard !== null && secondCard !== null){
      return;
    }
//open
    if (card.className.indexOf('open') !== -1){
      return;
    }
    card.className = 'card open';
    flipCount++;
    if (flipCount % 2 === 1){
      firstCard = card;
    }else {
      secondCard = card;
      // check();
      secondCard.addEventListener('transitionend',chack)
    }
  }
//正誤判定
  function chack() {
    if (//もし違う時は
      firstCard.children[0].textContent !==
      secondCard.children[0].textContent
    ){//openクラスを外す
      firstCard.className  = 'card';
      secondCard.className = 'card';
    }else {
      correctCount++;
      if (correctCount === pairs){
        clearTimeout(timeoutId);
      }
    }
    secondCard.removeEventListener('transitionend',chack)
    firstCard = null;
    secondCard = null;
  }

//時刻表示
  function runTimer(){
    document.getElementById('score').textContent = ((Date.now() -startTime) / 1000).toFixed(2);
    timeoutId = setTimeout(function(){
      runTimer();
    },10);
  }

  init();
})();
