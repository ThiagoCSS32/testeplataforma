
//jogo funcionando
let personagem = document.querySelector('.persona');
let stage = document.querySelector('.stage');
//posicao do personagem
let dx = 0;
let dy = 0;
let posx = personagem.style.left;
let posy = 523;
//ace leração gravidade
var ax = 0
var gravity = 3;
let isJumping = false;
let vel = 10;
//configuração do pulo
let pulo;
let queda;
console.log(!isJumping);
let tecla = false;
let teclaPulo = false;
let time = setInterval(enterFrame,1);


//Função de utilidade
//rangeIntersect usa as funções math.max e min para identificar se ha colisões;
var rangeIntersect = function(min0, max0, min1, max1) {
   return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
}
/*Este código define uma função chamada "rectIntersect" que recebe dois parâmetros: "r0" e "r1". Esses parâmetros representam dois retângulos, com as propriedades "left", "right", "top" e "bottom" que correspondem às posições x e y do retângulo. A função usa a função "rangeIntersect" para verificar se os intervalos das coordenadas x e y dos retângulos se cruzam e retorna true se eles se intersectarem e false caso contrário. */
var rectIntersect = function (r0, r1) {
   return rangeIntersect(r0.left, r0.right, r1.left, r1.right) && rangeIntersect(r0.top, r0.bottom, r1.top, r1.bottom)
}

function pararQueda(){
   setInterval(()=>{
    //pegar as posições das  
      var BBoxA = personagem.getBoundingClientRect()
      var BBoxB = stage.getBoundingClientRect()
    //Teste a colisão : Colisao e efeito
    if(rectIntersect(BBoxA, BBoxB)){
        personagem.style.background = "#f00"
        personagem.style.top = posy;
        clearInterval(queda);
    }else{

    }

   },10)

 }


function jump(){
   if(!isJumping){
       pulo = setInterval(()=>{
         posy -= 3; 
         personagem.style.top = (personagem.offsetTop - gravity)+ "px";
         console.log(posy); 
         if(posy <= 315){
            clearInterval(pulo)
            queda = setInterval(()=>{
               personagem.style.top = (personagem.offsetTop + gravity)+ "px";      
               },10)
               pararQueda()
               posy = 523;
         }
       },10)
      
       }
}

//Movimentação do personagem
document.addEventListener("keydown", teclaPress);
document.addEventListener("keyup", teclaUp)
/*document.addEventListener("keypress", function (event) {
   if (event.code === "Space") {
      jump()
      isJumping = true
    
   }
});*/

function teclaPress(event){
   if(event.key == ' '&& !isJumping){
      teclaPulo = true;
      jump();

   }else if (event.key == 'ArrowUp' && !isJumping){
      teclaPulo = true;
      jump()
      isJumping = true
     }else if(event.key == 'ArrowLeft'&& !isJumping){
         tecla = true;
         dx -= 1
         //   personagem.style.left = (personagem.offsetLeft - dx) + "px";
        }
      else if ( event.key == "ArrowRight"){
         teclaPulo = true;
         dx += 1
         //   personagem.style.left =(personagem.offsetLeft + dx) +"px";
     } else if ( teclaPulo && tecla && !isJumping){
            console.log(tecla, teclaPulo)
            personagem.style.top += 5
            jump();      
         }

   }

    function teclaUp (event){
   if (event.key == "ArrowUp") {
      // personagem.style.top = 523 + "px";
      isJumping = false;
      pararQueda();   
   }else if (event.key == ' '){
      teclaPulo = false
      if(teclaPulo){
         pararQueda();
         isJumping = false; 
      }
    
   }else if(event.key == 'ArrowLeft'){
    
      tecla = false;
      
  }else if ( event.key == "ArrowRight"){
      teclaPulo = false;

  }
}

function enterFrame(){
   posx = dx*vel;
   personagem.style.left=posx+"px"
}