function Role(_name, _id, _goodGuy, _playerCountFunction, _bonusFunction, _publiclyKnown, _picksPlayerForBonus, special) {
	var name = _name;
	var id = _id;
	var goodGuy = _goodGuy;
	var getPlayerCount = _playerCountFunction;  // getPlayerCount(players.length)
	var bonusFunction = _bonusFunction; //bonusFunction(options, players, playerSelectionId, godLog, publicLog)
	var publiclyKnown = _publiclyKnown; //true if all players know that the role exists in the game
	var picksPlayerForBonus = _picksPlayerForBonus; //true if the bonus ability requires the player to choose another player.
	var special = _special;
}