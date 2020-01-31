function hero (name){

this.name = name;
this.level = 1; 
this.wep = 4 + this.level;
this.ac = 8 + this.level;
this.str =  5 + this.level;
this.xp = 0; 
this.hp = 10; 
this.gold =0;
this.combat = function (ac, str, wep){ // player combat dice rolls 
    
      var x = Math.round(Math.random() * 20) + str >= ac; // Simulate d20 dice roll 
 
  return (function (){ // self invoking closure function 
  
      if (x) { // if our dice roll is a hit 
       
          var roll =  Math.round(Math.random() * wep); // calculate and return dmg 
          return roll 
         
      }
  })();
}

this.updateReward = function () {

    this.gold += mob.gold;
    this.xp += mob.xp; 
}

this.health = function (hit) {

    this.hp -= hit; 
}

}


function monster (name, level){
this.level = level;
this.str = 5 + this.level;
this.wep = 1 + this.level;
this.name = name;
this.ac = 8 + this.level;
this.xp = this.level * 100;
this.gold = this.level; 
this.hp = 1; 


}

var monsterRota = ["Goblin", "Cave Spider", "Bat", "Cave Slime", "Cave Hound"]; 


var mobHelp = monsterRota.length -1;
var mobpicker = Math.round(Math.random() * mobHelp);

var mob = new monster (monsterRota[mobpicker], 1);
var player = new hero ("wibbins"); 

for (var i = 0; i < 10 ; i ++){
var x = player.combat(mob.ac, player.str, player.wep);

if (x) {
        console.log(player.name + " hits " + mob.name + " for " + x + " hp " + "\n" + player.name + " recieves " + mob.xp + " xp " + " and " + mob.gold + " gold "); 
            if ( x >= mob.hp) {
                console.log (mob.name + " has been defeated! "); 
                player.updateReward();
                console.log (player.xp + " " + player.gold); 
                break; 
              }
    } else {
        console.log(player.name + " misses the... " + mob.name);
        var y = player.combat(player.ac, mob.str, mob.wep);
            if (y) {
                        console.log(mob.name +" hits " + player.name + " for " + y + " damage");
                        player.health(y); 
                        console.log(player.name + " has " + player.hp +  " hit points");


            } else { console.log(mob.name + " misses " + player.name);}
    }
}
