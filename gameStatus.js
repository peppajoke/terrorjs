function GameStatus(_players, _options, _graveyard, _publicLog, _godLog) {
	this.stage = CONSTANT.STAGE.PAUSE;
	this.day = 1;
	
	this.gameOver = false;
	this.winner = 0;
	
	this.readyForVote = false; //manually set
	this.finalizeVote = false; //needs to be manually set by the app
	this.finalizeSpecials = false; //needs to be manually set by the app
	
	this.moveToNextStage = function () {
		switch(this.stage) {
			case CONSTANT.STAGE.PAUSE:
				break;
			case CONSTANT.STAGE.VOTE:
				break;
			case CONSTANT.STAGE.SPECIALS:
				this.clearVotes();
				break;
		}
		if (this.stage < CONSTANT.STAGE.SPECIALS) {
			this.stage++;
			return;
		}
		this.stage = CONSTANT.STAGE.PAUSE;
		this.day++;
	}
	
	this.checkForStageProgression = function () {
		switch(this.stage) {
			case CONSTANT.STAGE.PAUSE:
				if (this.readyForVote) {
					this.moveToNextStage();
				}
				break;
			case CONSTANT.STAGE.VOTE:
				if (this.finalizeVote) {
					this.processVotes();
				}
				break;
			case CONSTANT.STAGE.SPECIALS:
				if (this.finalizeSpecials) {
					this.processTerrorVotes();
					this.readyForVote = false;
					this.finalizeVote = false;
					this.finalizeSpecials = false;
				}
				break;
		}
	}
	
	this.processVotes = function () {
		var playerVotes = {};
		for (var i=0;i<_players.length;i++) {
			var player = _players[i];
			if (typeof playerVotes[player.votePlayerId] === 'undefined') {
				playerVotes[player.votePlayerId] = 0;
			}
			playerVotes[player.votePlayerId]++;
			var targetPlayer = getPlayerFromId(_players, player.votePlayerId);
			_publicLog.push(_players[i].name + ' voted for ' + targetPlayer.name);
			_godLog.push(_players[i].name + ' voted for ' + targetPlayer.name);
		}
		var topId = -1;
		var topValue = 0;
		for (var playerId in playerVotes) {
			var forceChange = false;
			if (playerVotes[playerId] === topValue) {
				forceChange = Math.round(Math.random()) === 1; //if theres a tie, pick a random winner
			}
			if (forceChange || playerVotes[playerId] > topValue) {
				topId = playerId;
				topValue = playerVotes[playerId];
			}
		}
		if (topId === -1) { //if no one voted, pick at random
			topId = Math.round(Math.random() * _players.length);
		}
		for(var y=0;y<_players.length;y++) {
			if (_players[y].id === topId) {
				_players.currentStatus = CONSTANT.STATUS.VOTED;
			}
		}
		this.moveToNextStage();
	}
	
	this.processTerrorVotes = function () {
		var terrorVotes = {};
		for (var i=0;i<_players.length;i++) {
			var player = _players[i];
			if (player.role.id !== CONSTANT.ROLE_ID.TERROR) {
				continue;
			}
			if (typeof terrorVotes[player.specialTargetPlayerId] === 'undefined') {
				terrorVotes[player.specialTargetPlayerId] = 0;
			}
			terrorVotes[player.specialTargetPlayerId]++;
			var targetPlayer = getPlayerFromId(_players, player.specialTargetPlayerId);
			_godLog.push(_players[i].name + ' terror-voted for ' + targetPlayer.name);
		}
		var topId = -1;
		var topValue = 0;
		for (var playerId in terrorVotes) {
			var forceChange = false;
			if (terrorVotes[playerId] === topValue) {
				forceChange = Math.round(Math.random()) === 1; //if theres a tie, pick a random winner
			}
			if (forceChange || terrorVotes[playerId] > topValue) {
				topId = playerId;
				topValue = terrorVotes[playerId];
			}
		}
		if (topId === -1) { //if no one voted, pick at random
			topId = Math.round(Math.random() * _players.length);
		}
		for(var y=0;y<_players.length;y++) {
			if (_players[y].id === topId) {
				_players.currentStatus = CONSTANT.STATUS.MARKEDFORTAKE;
			}
		}
	}
	
	this.clearVotes = function () {
		for (var i=0;i<_players.length;i++) {
			_players[i].terrorVotePlayerId = -1;
			_players[i].votePlayerId = -1;
		}
	}
	
	this.checkForWin = function () {
		var terrorCount = 0;
		var innocentCount = 0;
		for(var i=0;i<_players.length;i++) {
			if (_players[i].role.id === CONSTANT.ROLE_ID.TERROR) {
				terrorCount++;
			} else {
				innocentCount++;
			}
		}
		if (terrorCount === 0 ) {
			this.gameOver = true;
			this.winner = CONSTANT.TEAM.INNOCENTS;
		} else if (terrorCount > innocentCount ) {
			this.gameOver = true;
			this.winner = CONSTANT.TEAM.TERRORS;
		}
	}
	
	this.processKills = function () {
		for(var i=0;i<_players.length;i++) {
			switch(_players[i].currentStatus) {
				case CONSTANT.STATUS.MARKEDFORTAKE:
					_players[i].currentStatus = CONSTANT.STATUS.TAKEN;
					break;
				case CONSTANT.STATUS.MARKEDFORDEATH:
					_players[i].currentStatus = CONSTANT.STATUS.KILLED;
					break;
				case CONSTANT.STATUS.MARKEDFORSAVE:
					_players[i].currentStatus = CONSTANT.STATUS.NORMAL;
					break;
			}
		}
	}
}