// Game States
// "WIN" - player robot has defeated all enemy-robots
//      *Fight all enemy-robots
//      *Defeat each enemy-robot
// "Lose" - Player robot's health is zero or less

//Define a knew function that asks the player if they want to play against the enemy
//Make a window.alert() that displays the players score
//Then ask the players if they want to play again
//If they say yes then triggar the fight() function
//If they say no then break

//Define new function that brings the player to the store
//Make a window.alert() that asks the player if they want to 'refill their health' or 'upgrade their attacks'
//if they choose to buy an attack upgrade deduct the correct amount of money and
//or if they choose to buy a health refill deduct the correct amount of money and if they choose to
//if they choose to leave then break

var fight = function(enemy) {

    while (playerInfo.health > 0 && enemy.health > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerInfo.money = Math.max(0, playerInfo.money - 10);
          console.log("playerMoney", playerInfo.money)
          break;
        }
      }
  
      // generate random damage value based on player's attack power 
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damage);
      
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.health - damage);

      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      
      }
    }
  };

var startGame = function() {
  
  //reset player Stats
  playerInfo.reset();

  for(var i = 0; i < enemyInfo.length; i++) {
      window.alert("Welcome to Robot Gladiators!  Round " + (i + 1) );

      var pickedEnemyObj = enemyInfo[i];
      
      pickedEnemyObj.health = randomNumber(40, 60);   
      
      fight(pickedEnemyObj);

      //if player is still alive and we're not at the last enemy in thr array 
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      } 
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  //play again
  endGame();
};

//function to end the entire game
var endGame = function() {
  window.alert("The game now ended. Let's see how you did!");
  
  //ask player if they'd like to play against
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the Game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }

  //if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've suervived the game! You now have a score of " + playerInfo.money + ".")
  }
};

var shop = function() {
  //ask the player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice." 
  );
  //Use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL": //new case
    case "refill":
      playerInfo.refillHealth();
      break;
    case "UPGRADE": // new case
    case "upgrade":  
      playerInfo.upgradeAttack();
      break;
    case "LEAVE": // new case
    case "leave":
      window.alert("Leaving the store.");
      
      // do nothing, so function will end
      break;
      default:
        window.alert("You did not pick a valid option. Try again.");

       // call shop() again to force player to pick valid shopOptionPrompt
       shop();
       break; 
  }
};

//function to generate a random numeric values
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//function is set to name
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, // comma!
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.")
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't  have enough money!");
    }
  }, //comma!
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars")
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!")
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

startGame();