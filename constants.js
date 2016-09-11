var CONSTANT = {};
//STATUSES
CONSTANT.STATUS = {};
CONSTANT.STATUS.NORMAL = 0;
CONSTANT.STATUS.TAKEN = 1;
CONSTANT.STATUS.KILLED = 2;
CONSTANT.STATUS.VOTED = 3;
CONSTANT.STATUS.MARKEDFORDEATH = 4;
CONSTANT.STATUS.MARKEDFORTAKE = 5;
CONSTANT.STATUS.MARKEDFORSAVE = 6;

CONSTANT.EVENT = {};
CONSTANT.EVENT.VOTED = 0;
CONSTANT.EVENT.REVEAL_IDENTITY = 1;
CONSTANT.EVENT.SAVED = 2;
CONSTANT.EVENT.TAKEN = 3;
CONSTANT.EVENT.KILLED = 4;
CONSTANT.EVENT.REVEAL_IDENTITY = 5;

CONSTANT.ROLE_ID = {};

//ROLES
CONSTANT.ROLE = {};


CONSTANT.ROLE_ID.VILLAGER = 0;
CONSTANT.ROLE_ID.ANGEL = 1;
CONSTANT.ROLE_ID.COP = 2;
CONSTANT.ROLE_ID.DREAMER = 3;
CONSTANT.ROLE_ID.PSYCHO = 4;
CONSTANT.ROLE_ID.TERROR = 5;

CONSTANT.TEAM = {};
CONSTANT.TEAM.INNOCENTS = 1;
CONSTANT.TEAM.TERRORS = 2;

CONSTANT.STAGE = {};
CONSTANT.STAGE.PAUSE = 1;
CONSTANT.STAGE.VOTE = 2;
CONSTANT.STAGE.SPECIALS = 3;

CONSTANT.ROLE.VILLAGER = new Role('Villager', CONSTANT.ROLE_ID.VILLAGER, true, function(playerCount) {
	return 999;  //hardcoded, because every unassigned person becomes a villager
}, null, true, false, false);

CONSTANT.ROLE.ANGEL = new Role('Angel', CONSTANT.ROLE_ID.ANGEL, true, function(playerCount) {
	return Math.floor(playerCount * .9);
}, function (player, options, players, playerSelectionId, godLog, publicLog) {
	for(var i=0;i<players.length;i++) {
		if (playerSelectionId === players[i].id && players[i].currentStatus === CONSTANT.STATUS.MARKEDFORDEATH) {
			players[i].currentStatus = CONSTANT.STATUS.NORMAL;
			godLog.push(player.name + ' saved ' + players[i] + '.');
			publicLog.push('Someone was spared an unfortunate fate...');
			return "Saved " + players[i].name + "!";
		}
	}
}, true, true, true);

CONSTANT.ROLE.COP = new Role('Cop', CONSTANT.ROLE_ID.COP, true, function(playerCount) {
	return Math.floor(playerCount * .15);
}, function (player, options, players, playerSelectionId, godLog, publicLog) {
	for(var i=0;i<players.length;i++) {
		if (playerSelectionId === players[i].id) {
			var result = players[i].role.goodGuy ? 'innocent' : 'terror';
			godLog.push(player.name + ' investigated ' + players[i].name + ' (' + result + ')');
			return players[i].name + '...' + result;
		}
	}
}, true, true, true);

CONSTANT.ROLE.DREAMER = new Role('Dreamer', CONSTANT.ROLE_ID.DREAMER, true, function(playerCount) {
	return Math.floor(playerCount * .25);
}, function (player, options, players, playerSelectionId, godLog, publicLog) {
	var randomPlayer = Math.round(Math.random * players.length);
	var output = 'You see a vision of [' + players[randomPlayer].name + ']...';
	switch(players[randomPlayer].role.id) {
		case CONSTANT.ROLE_ID.VILLAGER:
			return output + 'they look pretty normal.';
		case CONSTANT.ROLE_ID.COP:
			return output + 'they look authoritative...';
		case CONSTANT.ROLE_ID.DREAMER:
			return output + 'they look like you.';
		case CONSTANT.ROLE_ID.PSYCHO:
			return output + 'they look emotionally unstable...';
		case CONSTANT.ROLE_ID.ANGEL:
			return output + 'they look very kind.';
		case CONSTANT.ROLE_ID.TERROR:
			return output + 'there is a darkness inside them.';
	}
	return "You see nothing.";
}, true, false, true);

CONSTANT.ROLE.PSYCHO = new Role('Psycho', CONSTANT.ROLE_ID.PSYCHO, true, function(playerCount) {
	return Math.abs(Math.min(Math.floor(playerCount * .9), .1 * playerCount * Math.random()));
}, function (player, options, players, playerSelectionId, godLog, publicLog) {
	for(var i=0;i<players.length;i++) {
		if (players[i].id === playerSelectionId && players[i].currentStatus !== CONSTANT.STATUS.MARKEDFORSAVE) {
			players[i].currentStatus = CONSTANT.STATUS.MARKEDFORDEATH;
			godLog.push(player.name + ' marked ' + players[i].name + ' for death!');
			return;
		}
	}
}, true, true, true);

CONSTANT.ROLE.TERROR = new Role('Terror', CONSTANT.ROLE_ID.TERROR, false, function(playerCount) {
	return Math.max(1, Math.floor(playerCount * .25));
}, null, true, true, false);