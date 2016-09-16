function Game(_players, _options, _roles) {
	this.publicLog = [];
	this.godLog = [];
	this.graveyard = [];
	this.narrator = new Narrator(this.publicLog, this.godLog);
	this.gameStatus = new GameStatus(_players, _options, this.graveyard, this.publicLog, this.godLog);
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
		this.narrator.randomizePlayerRoles(_options, _players, _roles);
	}
}