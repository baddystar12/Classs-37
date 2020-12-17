class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hideDetails();
    text("YO Game started u wanna play??", 100, 100);
    Player.getInfo();
    if(allPlayers!= undefined){
      var displayPosition = 130;
      for(var playerYo in allPlayers){
        if (playerYo==="player"+player.index)
          fill("turquoise");
        else 
          fill("purple");
        
        displayPosition+=20;
        text(allPlayers[playerYo].name+":"+allPlayers[playerYo].distance, 120, displayPosition);
      }
    }
    if(keyIsDown(UP_ARROW)&&player.index!=null){
      player.distance = player.distance+50;
      player.update();
    }
  }
}
