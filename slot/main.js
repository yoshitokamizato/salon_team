(function() {
  'use strict';
//panelを変数に入れる
  var panels = document.getElementsByClassName('panel');
//spinを変数に入れる
  var spin = document.getElementById('spin');
//カードの画像を配列に入れる
  var cards = [
    'img1.png',
    'img2.png',
    'img3.png'
  ];
//runSlotの返り値を取得する必要がある
  var timers = [];
//パネルを何回押したか保持する
  var stopCount = 0;

//①画像の入れ替えをランダムに表示してsetTimeoutで実行する
  function runSlot(n) {
      timers[n] = setTimeout(function() {
        panels[n].children[0].src =
         'img/' +
         cards[Math.floor(Math.random() * cards.length)];
         runSlot(n);
      }, 50);
    }

//３つあるストップボタンのイベント---------------------------------------------
  function initPanel() {
        var i;
        for (i = 0; i < panels.length; i++) {
          // for文の中でストップボタンのイベント-------------------------------
          panels[i].children[1].addEventListener('click', function() {
            //６stopボタンを連打してもinactiveクラスが含まれてなかったら
            if (this.className.indexOf('inactive') !== -1) {
              return;
            }
            clearTimeout(timers[this.dataset.index]);
            stopCount++;
            this.className = 'stop inactive';
            //正誤判定する
            if (stopCount === panels.length) {
              stopCount = 0;
              checkResults();//別関数で作る
              spin.className = '';
            }
    });
  }
}

  //４正誤判定する関数
  function checkResults() {
    var img0 = panels[0].children[0];
    var img1 = panels[1].children[0];
    var img2 = panels[2].children[0];

    if (img0.src !== img1.src && img0.src !== img2.src) {
      img0.className = 'unmatched';
    }
    if (img1.src !== img0.src && img1.src !== img2.src) {
      img1.className = 'unmatched';
    }
    if (img2.src !== img0.src && img2.src !== img1.src) {
      img2.className = 'unmatched';
    }
  }

  initPanel();

// ２スピンをクリック-------------------------------
  spin.addEventListener('click', function() {
      var i;
      //６SPINボタンを連打してもinactiveクラスが含まれてなかったら
      if (this.className.indexOf('inactive') !== -1) {
        return;
      }
      //５inactiveクラスをつける
      this.className = 'inactive';
      for (i = 0; i < panels.length; i++) {
        runSlot(i);
        //４正誤判定でついたクラスを取る
        panels[i].children[0].className = '';
        //５stopボタンからinactiveを外す
        panels[i].children[1].className = 'stop';
      }
    });

    })();
