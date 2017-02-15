/*
 * Gregor Thomson - 2029108
 *
 * Honours Project
 */
var getNClosestMatches = function(n, vec, skills) {
  var sims = [];
  var sim;
  var curentskillVec = [];
  for (var i = 0; i < skills.length; i++) {
    // Convert string to array. "[vec1; vec2]" -> Array[vec1, vec2]
    curentskillVec = skills[i].vector;
    curentskillVec = curentskillVec.substring(1, curentskillVec.length - 1).split(";");
    sim = getCosSim(vec, curentskillVec);
    sims.push([skills[i].skill, sim, skills[i].skill_id]);
  }
  sims.sort(function(a, b) {
    return b[1] - a[1];
  });
  return sims.slice(0, n);
}

// helper functions ------------------------------------------------------------
function getCosSim(f1, f2) {
  return Math.abs(f1.reduce(function(sum, a, idx) {
    return sum + a*f2[idx];
  }, 0)/(mag(f1)*mag(f2))); //magnitude is 1 for all feature vectors
}

function mag(a) {
  return Math.sqrt(a.reduce(function(sum, val) {
    return sum + val*val;
  }, 0));
}

module.exports={
  getNClosestMatches:getNClosestMatches
}
