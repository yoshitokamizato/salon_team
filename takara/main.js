(function(){
  'use strict'
//boxクラスを取得して変数に入れる
  var boxes = document.getElementsByClassName('box');
// ランダムに入れる画像を配列に入れておく
  var contents = [
    'hazure.png',
    'img2.png',
    'img1.png'
  ];

  function init(){//宝箱の初期設定

    var i;
    for ( i = 0; i < boxes.length; i++){

      // boxesをクリックしたら画像を取得
      boxes[i].addEventListener('click',function(){
        var j;
        if (this.className.indexOf('shake') === -1){
          return;
        }
        for ( j = 0; j < boxes.length; j++){
        boxes[j].src = 'img/' + contents[Math.floor(Math.random() * contents.length)];
        boxes[j].className = 'box disabled';
      }
      //for文を抜けるとshakeクラス・disablaedクラスを抜ける
       this.className = 'box';
       //for文を抜けるとrestartボタンのinactiveクラスを外す
       document.getElementById('btn').className= '';
      });
    }
  }
  init();
})();
