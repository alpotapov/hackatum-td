var account_p1 = 100;
var account_p2 = 100;

function account_get(player){
  if(player == 1){
    return account_p1;
  }else{
    return account_p2;
  }
}

function account_add(player, change){
  if(player == 1){
    account_p1 += change;
  }else{
    account_p2 += change;
  }
  
  console.log("Player " + player + " gets " + change + "$");
}

function account_subtract(player, change){
  if(player == 1){
    if(account_p1 - change >= 0){
      account_p1 -= change;
      return true;
    }else{
      return false;
    }
  }else{
    if(account_p2 - change >= 0){
      account_p2 -= change;
      return true;
    }else{
      return false;
    }
  }
}