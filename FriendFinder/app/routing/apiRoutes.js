var friends = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    
    var newScores = req.body.scores;
    var scores = [];
    var beststart = 0;
    var match = 0;

    for(var i = 0; i < friends.length; i++) {
      var scoreDiff = 0;

      for(var j=0; j<newScores.length; j++){
        scoreDiff =+ (Math.abs(parseInt(friends[i].scores[j] - parseInt(newScores[j]))));
      }

      scores.push(scoreDiff);
    }

    for(var i = 0; i < scores.length; i++) {
     
      if(scores[i] <= scores[match]){
        match = i;
      }
    }

    var bestMatch = friends[match];
    res.json(bestMatch);

    friends.push(req.body);
  });
};