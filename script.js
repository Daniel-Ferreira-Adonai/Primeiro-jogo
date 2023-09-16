var mago1_hp = 20;
var mago2_hp = 20;
var mana = 8;
var caixaDoNumero = document.getElementById("numero");
var mageElement = document.querySelector(".mage");
var cooldown = false;

 
 function startGame() {
  ff()
  alert("Game started!");
 
  document.removeEventListener("keydown", keyPressHandler);
  var startMessage = document.getElementById("startMessage");
  if (startMessage) {
    startMessage.style.display = "none";
  }
}
function keyPressHandler(event) {
  
  startGame();
}

document.addEventListener("keydown", keyPressHandler);

var ffsong = document.getElementById("ff");


function ff () {
  ffsong.currentTime = 0; 
  ffsong.play();
  ffsong.volume = 0.1;

}

var fire = document.getElementById("fire");


function fireSound() {
  fire.currentTime = 0; 
  fire.play();
}


var sliceAudio = document.getElementById("sliceAudio");


function playSliceSound() {
  sliceAudio.currentTime = 0; 
  sliceAudio.play();
}

var coinAudio = document.getElementById("coin");


function playcoinSound() {
  coinAudio.currentTime = 0; 
  coinAudio.play();
}



function botaoClicado() {
  if (cooldown) {
    return;
  }

  var botaoAdivinhar = document.getElementById("botao");
  botaoAdivinhar.disabled = true;
  cooldown = true;

  if (parseInt(caixaDoNumero.value) === 1 && mago2_hp > 0) {
    mago2_hp -= 2;
    alert("O mago dos sorteios puxa sua peixeira magica, ao atacar causa 2 de dano.     " + "Mago Sapateiro HP: " + mago2_hp);
    var moveElement = document.querySelector(".mage_of_sorteio");
    moveElement.classList.add("move_animation2");

    moveElement.addEventListener("animationend", function () {
      moveElement.classList.remove("move_animation2");
      moveElement.removeEventListener("animationend", arguments.callee);
    });

    playSliceSound()
    var slashElement = document.querySelector(".slash");
    slashElement.style.opacity = 1;
    slashElement.classList.add("slash-animation");

    slashElement.addEventListener("animationend", function () {
      slashElement.style.opacity = 0;
      slashElement.classList.remove("slash-animation");
      
      slashElement.removeEventListener("animationend", arguments.callee);
    
    });

   
  } else if (parseInt(caixaDoNumero.value) === 2 && mago2_hp > 0 && mana > 0) {
   
    mana = mana -= 2
    mago2_hp -= 3;
    alert("Mago dos sorteios cospe o seu lança perfume causando 3 de dano       " + "Mago Sapateiro HP: " + mago2_hp + ". Your current Mana is " + mana);

    var moveElement = document.querySelector(".mage_of_sorteio");
    moveElement.classList.add("move_animation2");

    moveElement.addEventListener("animationend", function () {
      moveElement.classList.remove("move_animation2");
      moveElement.removeEventListener("animationend", arguments.callee);
    });

    fireSound()
    var explosionElement = document.querySelector(".explosion");
    explosionElement.style.opacity = 1;
    explosionElement.classList.add("magic_animation");

    explosionElement.addEventListener("animationend", function () {
      explosionElement.style.opacity = 0;
      explosionElement.classList.remove("magic_animation");
  
      explosionElement.removeEventListener("animationend", arguments.callee);
    });
  } else if (parseInt(caixaDoNumero.value) === 3 && mana > 0 ) {
    var coindamage = Math.floor(Math.random() * 4) + 1
    mago2_hp -= coindamage;
    mana -= 2
    alert("O Mago dos sorteios tem muito dinheiro, sente pena de você e joga um trocado. + "<br>" + Mago Sapateiro HP: " + mago2_hp + ". "<br>" + current Mana is " + mana);

    playcoinSound()
    var moveElement = document.querySelector(".mage_of_sorteio");
    moveElement.classList.add("move_animation2");

    moveElement.addEventListener("animationend", function () {
      moveElement.classList.remove("move_animation2");
      moveElement.removeEventListener("animationend", arguments.callee);
    });


    var coinElement = document.querySelector(".coin");
    coinElement.style.opacity = 1;
    coinElement.classList.add("coin-animation");

    coinElement.addEventListener("animationend", function () {
      coinElement.style.opacity = 0;
      coinElement.classList.remove("coin-animation");
      
      coinElement.removeEventListener("animationend", arguments.callee);
    });
  } else if (parseInt(caixaDoNumero.value) === 4) {
    alert("you try to dodge");
  } else if (parseInt(caixaDoNumero.value) >= 5) {
    alert("numero invalido");
  } else {
   alert("numero invalido")
  }

  setTimeout(function () {
    cooldown = false;
    botaoAdivinhar.disabled = false;
    var randomTimeout = Math.floor(Math.random() * 10) + 1;
    if (randomTimeout >= 5 && mago2_hp > 0 && parseInt(caixaDoNumero.value) !== 4) {
      mageElement.classList.add("move_animation");

      mageElement.addEventListener("animationend", function () {
        mageElement.classList.remove("move_animation");
        mago1_hp -= 2;
        playSliceSound()
        alert("Your hp is " + mago1_hp);
       
        mageElement.removeEventListener("animationend", arguments.callee);
      });
    } else if (parseInt(caixaDoNumero.value) === 4 && randomTimeout >= 4) {
      alert("you dodged");
    } 
    else if (mago2_hp <= 0) { 
      mageElement.classList.add("damage");

      mageElement.addEventListener("animationend", function () {
        mageElement.classList.remove("damage");
        mageElement.style.display = "none";
       
        mageElement.removeEventListener("animationend", arguments.callee);
      });
    } 
     
    else {
      playSliceSound()
      mageElement.classList.add("move_animation");

      mageElement.addEventListener("animationend", function () {
        mageElement.classList.remove("move_animation");
        mago1_hp -= 3;
        alert("Your hp is " + mago1_hp);
        
        mageElement.removeEventListener("animationend", arguments.callee);
      });
    }

    console.log("Random Timeout: " + randomTimeout + " seconds");
  }, 3000);
}

var botaoAdivinhar = document.getElementById("botao");
botaoAdivinhar.onclick = botaoClicado;
