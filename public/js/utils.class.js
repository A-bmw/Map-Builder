function Utils()
{
  //this is used in testing, generates random numbers but is a repeatable generator
  this.isDependable = true;
  
  this.resetRandomizer = function()
  {
    console.log("Seeded with " + seed);
  }
  
  this.randomBetween = function(min, max) 
  { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
    
}

if(typeof module !== "undefined")  module.exports = Utils;