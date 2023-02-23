//=============================
// モンスターのHP
//=============================
const monsterMaxHp = 200; //モンスターの最大HP
let monsterHp = monsterMaxHp; //モンスターのHP

//=============================
// 攻撃技情報の配列
//=============================
var attack = [
  { name: "素手で攻撃", points: 30 },
  { name: "剣で攻撃", points: 50 },
  { name: "会心の一撃", points: 100 },
];

//=============================
// 攻撃ボタンが押された時の処理
//=============================
jQuery("#js-attack-btn").click(function () {
  //1秒間ボタン操作無効
  //------------
  var $this = jQuery(this);
  $this.css("pointer-events", "none"); //攻撃ボタンのクリックイベントを無効
  setTimeout(function () {
    $this.css("pointer-events", ""); //2秒後に攻撃ボタンのクリックイベント無効を解除
  }, 1000);

  //攻撃アニメーションの処理
  //------------
  jQuery("#js-brave .monster__img")
    .addClass("is-anm")
    .delay(300)
    .queue(function () {
      jQuery(this).removeClass("is-anm").dequeue();
    });

  //ランダムで攻撃を取得
  //------------
  attackObject = attack[Math.floor(Math.random() * attack.length)]; //attack配列からlength[配列番号]を取得
  attackName = attackObject["name"]; //攻撃名を変数に格納
  attackPoint = attackObject["points"]; //攻撃ダメージを変数に格納

  //ダメージ計算
  //------------
  monsterHp = monsterHp - attackPoint; //ダメージ計算 [モンスターのHP = モンスターのHP - 攻撃ダメージ]

  //攻撃メッセージと倒した時のイベント
  //------------
  jQuery("#js-message").text(`${attackName} / ${attackPoint}ダメージ`); //攻撃名と攻撃ポイントをメッセージを表示
  if (monsterHp <= 0) {
    //もしモンスターのHPが0以下の時
    monsterHpPercent = 0; //モンスターのHPの%を0
    jQuery("#js-monster,#js-attack-btn").fadeOut(); //モンスターと攻撃ボタンを非表示
    jQuery("#js-message")
      .delay(1000) //1秒後に
      .queue(function () {
        jQuery(this).text("敵を倒しました！！").dequeue(); //メッセージを表示
      });
  } else {
    //もしモンスターのHPが0以下ではない時は
    monsterHpPercent = monsterHp / monsterMaxHp; //モンスターのHPの%計算 [モンスターのHPの% = モンスターのHP / モンスターの最大HP]
    jQuery("#js-message")
      .delay(1000) //1秒後に
      .queue(function () {
        jQuery(this).text("　").dequeue(); //メッセージを非表示
      });
  }

  //HPゲージの処理
  //------------
  document.querySelector("#js-monster-hp").style.width = monsterHpPercent * 100 + "%"; //HPゲージのwidthをcssで変更
  if (monsterHpPercent <= 0.3) {
    //もしモンスターのHPが30%以下のときは
    document.querySelector("#js-monster-hp").style.backgroundColor = "red"; //HPゲージのbackground-colorをcssで変更
  }
});
