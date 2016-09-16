function Narrator() {
	this.randomizePlayerRoles = function (_options, _players, _roles) {
		var roles = _roles;
		roles.sort(function (a,b) { return a.id-b.id; });
		var copCount
		var assignedPlayers = [];
		var roleCounts = {};
		for(var i=0;i< _roles.length;i++) {
			var role = _roles[i];
			var rolesToGiveOut = role.getPlayerCount(_players.length);
			var rolesGivenOut = 0;
			while (rolesGivenOut < rolesToGiveOut || assignedPlayers.length === _players.length) {
				var randomPlayerIndex = Math.round(Math.random()*_players.length);
				if (!~assignedPlayers.indexOf(randomPlayerIndex)) {
					players[randomPlayerIndex].role = role;
					assignedPlayers.push(randomPlayerIndex);
					rolesGivenOut++;
				}
			}
		}
	}
}