function Player(_name, _id) {
	var name = _name;
	var id = _id;
	var currentStatus = CONSTANT.STATUS.NORMAL;
	var role;
	var specialTargetPlayerId = -1;
	var votePlayerId = -1;
	
	var exposed = false;
	var inGame = function () {
		return Status === CONSTANT.STATUS.NORMAL;
	}
}