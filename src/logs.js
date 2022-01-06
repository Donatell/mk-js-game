export class Logs {
	player1;
	player2;
	$chat;
	logs = {
		start: '[player1] and [player2] challenge each other.',
		end: [
			'Result of [playerWins] hit: [playerLose] is dead,
			'[playerLose] was killed by [playerWins],
			'[result of fight: [playerLose] - victim, [playerWins] - assassin.
		],
		hit: [
			"[playerDefence] tried to concentrate, but [playerKick] sprawled and crushed the enemy's left ear with his tailbone."
			"[playerDefence] was getting frustrated when suddenly, unexpectedly, [playerKick] accidentally crushed his opponent's sternum with his chest."
			"[playerDefence] clenched his eyes, while [playerKick], in a blink, shattered his opponent's groin with his fist."
			"[playerDefence] was scratching <censored>, and suddenly the undaunted [playerKick] desperately smashed his opponent's left bicep with his chest."
			"[playerDefence] hesitated, but suddenly [playerKick] accidentally slammed a brutal kick to his opponent's waist with his tailbone."
			"[playerDefence] was picking his teeth, but [playerKick] woke up and slammed a heavy finger punch into his opponent's Adam's apple."
			"[playerDefence] remembered something important, but suddenly [playerKick] yawned and smashed his opponent's jaw with an open palm."
			"[playerDefence] looked around, at which time [playerKick] crushed his opponent's appendix with his foot in passing."
			"[playerDefence] coughed, but suddenly [playerKick] showed his finger and smashed his opponent's chest with his finger."
			"[playerDefence] tried to say something, and the brutal [playerKick] woke up and smashed his opponent's left leg with his tailbone."
			"[playerDefence] was oblivious, as the suddenly insane [playerKick], out of boredom, slammed his knee into his opponent's left side."
			"[playerDefence] choked, and for that [playerKick] crushed his enemy's temple with his knee in passing."
			"[playerDefence] got frustrated, and in the meantime the insolent [playerKick] staggered to smash his opponent's lips with his tailbone."
			"[playerDefence] looked around, but suddenly [playerKick] timidly smashed his opponent's left eye with his knee."
			"[playerDefence] looked around, but [playerKick] broke into a crushing shoulder strike, punching a block where you wouldn't normally hit your opponent."
			"[playerDefence] was picking his teeth when suddenly, unexpectedly, [playerKick] desperately smashed his opponent's abs muscle with his shoulder."
			"[playerDefence] came to his senses, at which time [playerKick] delivered a smashing hand strike, punching a block, into his opponent's shin."
			"[playerDefence] staggered back, while [playerKick] giggled and slammed a rough open palm strike into his opponent's thighs."
		],
		defence: [
			"[playerKick] lost his momentum and the brave [playerDefence] jumped away from the open palm strike to his collarbone."
			"[playerKick] was not in control of the situation, so [playerDefence] put a block on the heel strike to his right chest."
			"[playerKick] lost momentum and [playerDefence] put a block on the knee to the spleen."
			"[playerKick] slipped and a thoughtful [playerDefence] put a block on a head poke to the eyebrow."
			"[playerKick] tried to take a punch, but the undefeated [playerDefence] sidestepped a tailbone kick right on the heel."
			"[playerKick] cheated and the brutal [playerDefence] blocked a foot strike to the solar plexus."
			"[playerKick] wasn't thinking about the fight, so a frustrated [playerDefence] jumped away from the fist punch where you don't usually get hit."
			"[playerKick] cheated and the brutal [playerDefence] blocked a foot strike to the solar plexus."
		],
		draw: "A draw is also a win!"
	};

	constructor(player1, player2) {
		this.$chat = document.querySelector('.chat');
		this.player1 = player1;
		this.player2 = player2;
	}

	getTime() {
		const date = new Date();
		return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	}

	getRandomIndex = max => Math.floor(Math.random() * max);

	generateResultLog(draw, player1Wins) {
		let message;

		if (!draw) {
			let playerWins;
			let playerLose;

			switch (player1Wins) {
				case true:
					playerWins = this.player1.displayName;
					playerLose = this.player2.displayName;
					break;
				case false:
					playerWins = this.player2.displayName;
					playerLose = this.player1.displayName;
					break;
			}

			message =
				(this.logs)['end'][this.getRandomIndex(
					(this.logs)['end'].length)]
					.replace('[playerWins]', playerWins)
					.replace('[playerLose]', playerLose);
		} else {
			message = (this.logs)['draw'];
		}

		const logElement = `<p>[${this.getTime()}] ${message}</p>`;
		this.$chat.insertAdjacentHTML('afterbegin', logElement);
	}

	generateFightLog(type, playerHit, playerDefence,
	                 damage) {
		let message;
		let logElement;

		switch (type) {
			case 'start':
				message = (this.logs)[type]
					.replace('[player1]', playerHit.displayName)
					.replace('[player2]', playerDefence.displayName);
				logElement = `<p>[${this.getTime()}] ${message}</p>`;
				break;
			case 'hit':
				message =
					(this.logs)[type][this.getRandomIndex(
						(this.logs)[type].length)]
						.replace('[playerKick]', playerHit.displayName)
						.replace('[playerDefence]', playerDefence.displayName);
				logElement =
					`<p>[${this.getTime()}] ${message} ${playerDefence.displayName} потерял ${damage} HP.</p>`;
				break;
			case 'defence':
				message =
					(this.logs)[type][this.getRandomIndex(
						(this.logs)[type].length)]
						.replace('[playerKick]', playerHit.displayName)
						.replace('[playerDefence]', playerDefence.displayName);
				logElement =
					`<p>[${this.getTime()}] ${message}</p>`;
				break;
		}

		this.$chat.insertAdjacentHTML('afterbegin', logElement);
	}
}
