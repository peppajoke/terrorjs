function Options(_hardcore, _terrorSynergy, _autoBalance) {
	this.hardcore = _hardcore; //bool: determines whether or not kills/votes are revealed. True == hidden
	this.terrorSynergy = _terrorSynergy; //bool: terror synergy enabled means if all terrors (at least 3), pick the same person for the kill, they are converted to a terror and no kill is reported
	this.autoBalance = _autoBalance; //bool: automatically build the roles?
}