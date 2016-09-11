function GameStatus(_players, _options, _graveyard, _publicLog, _godLog) {
	var stage = CONSTANT.STAGE.PAUSE;
	var day = 1;
	
	var gameOver = false;
	var winner = 0;
	
	var readyForVote = false; //manually set
	var finalizeVote = false; //needs to be manually set by the app
	var finalizeSpecials = false; //needs to be manually set by the app
	
	function moveToNextStage() {
		switch(stage) {
			case CONSTANT.STAGE.PAUSE:
				break;
			case CONSTANT.STAGE.VOTE:
				break;
			case CONSTANT.STAGE.SPECIALS:
				this.clearVotes();
				break;
		}
		if (stage < CONSTANT.STAGE.SPECIALS) {
			stage++;
			return;
		}
		stage = CONSTANT.STAGE.PAUSE;
		day++;
	}
	
	function checkForStageProgression() {
		switch(stage) {
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
	
	function processVotes() {
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
	
	function processTerrorVotes() {
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
	
	function clearVotes () {
		for (var i=0;i<_players.length;i++) {
			_players[i].terrorVotePlayerId = -1;
			_players[i].votePlayerId = -1;
		}
	}
	
	function checkForWin() {
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
	
	function processKills() {
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