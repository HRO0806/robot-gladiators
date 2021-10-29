// Game States
// "WIN" - player robot has defeated all enemy-robots
//      *Fight all enemy-robots
//      *Defeat each enemy-robot
// "Lose" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//You can also log multiple  values ar once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

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

var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerMoney = playerMoney - 10;
          console.log("playerMoney", playerMoney)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');
  
        // award player money for winning
        playerMoney = playerMoney + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
      );
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      
      }
    }
  };

var startGame = function() {
  
  //reset player Stats
  playerHealth = 100;
  playerAttack =10;
  playerMoney = 10;

  for(var i = 0; i < enemyNames.length; i++) {
      window.alert("Welcome to Robot Gladiators!  Round " + (i + 1) );
      
      var pickedEnemyName = enemyNames[i];
      
      enemyHealth = 50;   
      
      fight(pickedEnemyName);

      //if player is still alive and we're not at the last enemy in thr array 
      if (playerHealth > 0 && i < enemyNames.length - 1) {
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
  if (playerHealth > 0) {
    window.alert("Great job, you've suervived the game! You now have a score of " + playerMoney + ".")
  }
  else {
    window.alert("You've lost your robot in the battle.");
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
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dallars.");
        
        //increase health and decrease money
      playerHealth = playerHealth + 20;
      playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }

      break;
    case "UPGRADE": // new case
    case "upgrade":  
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
      
      //increase attack and decrease playerMoney
      playerAttack = playerAttack + 6;
      playerMoney = playerMoney -7;
      }
      else {
        window.alert("You don't have enough money!");
      }

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

startGame();