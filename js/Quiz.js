class Quiz {
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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("lightBlue");

    //write code to show a heading for showing the result of Quiz
    textSize(25);
    text('RESULT OF THE QUIZ' ,400,35);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    //write code to add a note here
    if(allContestants!==undefined){
      fill('blue');
      textSize(20);
      var yPos=250;
      text('*note:Contestant who answered correct are highlighted in green',130,230);

    }

    //write code to highlight contest who answered correctly    
    for(var i in allContestants){
      var CQ= '2';
      if(CQ===allContestants[i].answer){
        fill('green');
        
      }
      else{
        fill('red');

      }
      textSize(20);
      yPos+=30;
      text(allContestants[i].name+' : '+allContestants[i].answer,400,yPos);

    }

  }

}
