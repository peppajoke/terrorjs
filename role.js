function Role(_name, _id, _goodGuy, _playerCountFunction, _bonusFunction, _publiclyKnown, _picksPlayerForBonus, _special) {
	this.name = _name;
	this.id = _id;
	this.goodGuy = _goodGuy;
	this.getPlayerCount = _playerCountFunction;  // getPlayerCount(players.length)
	this.bonusFunction = _bonusFunction; //bonusFunction(options, players, playerSelectionId, godLog, publicLog)
	this.publiclyKnown = _publiclyKnown; //true if all players know that the role exists in the game
	this.picksPlayerForBonus = _picksPlayerForBonus; //true if the bonus ability requires the player to choose another player.
	this.special = _special;
}