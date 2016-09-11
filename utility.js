function getRemainingPlayerCounts(players) {
	var remaining = {};
	remaining.innocents = 0;
	remaining.specials = 0;
	remaining.terrors = 0;
	for(var i=0;i<players.length;i++) {
		var player = players[i];
		if (player.currentStatus === CONSTANT.STATUS.NORMAL || CONSTANT.STATUS.MARKEDFORSAVE || CONSTANT.STATUS.MARKEDFORDEATH ) {			
			if (player.role.special) {
				remaining.specials++;
			}
			if (player.role.goodGuy) {
				remaining.innocents++;
			} else {
				remaining.terrors++;
			}
		}
	}
	return remaining;
}

function getPlayerFromId(_players, _playerId) {
	for(var i=0;i<_players.length;i++) {
		if (_players[i].id === _playerId) {
			return _players[i];
		}
	}
}