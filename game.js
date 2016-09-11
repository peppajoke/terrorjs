function Game(_players, _options, _roles) {
	var publicLog = [];
	var godLog = [];
	var graveyard = [];
	var narrator = new Narrator(publicLog, godLog);
	var gameStatus = new GameStatus(_players, _options, graveyard, publicLog, godLog);
	if (typeof _options === 'undefined') { //give the default options
		_options = {
			hardcore: false,
			terrorSynergy: false,
			autoBalance: true
		};
	}
	
	if (typeof _roles === 'undefined') { //give the default roles
		_roles = [
			CONSTANT.ROLE.VILLAGER,
			CONSTANT.ROLE.ANGEL,
			CONSTANT.ROLE.COP,
			CONSTANT.ROLE.DREAMER,
			CONSTANT.ROLE.PSYCHO,
			CONSTANT.ROLE.TERROR
		];
	}
	
	if (_options.AutoBalance) {
		narrator.randomizePlayerRoles(_options, _players, _roles);
	}
}