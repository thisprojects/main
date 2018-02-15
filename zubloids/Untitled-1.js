function combat (wep, ac, bonus, mod){

    var add = bonus + mod;
    var roll = Math.round(Math.random() * 20);
    
    if (roll + add < ac){

        console.log("rand is " + roll + " and bonus + mod is " + add +  " and AC is " + ac + "\n" + " miss");
        return false;
    } 

    var dmg = Math.round(Math.random() * wep) + bonus;
    

    if (roll == 20){

        console.log("Crit! damage is " + dmg * 2);
        return dmg * 2;

    }else{
        console.log("hit! damage is " + dmg);
    return dmg;
    }

}

combat(4, 10, 2, 2);