class Presence {
	constructor() {
		this.clear()
	}

	clear() {
		this.runnerAt = 0
                this.atBat = ""
		this.rbi = ""
		this.out = 0
		this.defensivePlay = []
		this.doublePlay = false
		this.line1Text = ""
		this.line2Text = ""
		this.line3Text = ""
		this.line4Text = ""
		this.visit = false
		this.jerseyNumber = ""
	}
}

export default Presence
