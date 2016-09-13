function Player(_name, _id) {
	this.name = _name;
	this.id = _id;
	this.currentStatus = CONSTANT.STATUS.NORMAL;
	this.role;
	this.specialTargetPlayerId = -1;
	this.votePlayerId = -1;
	this.exposed = false;
}