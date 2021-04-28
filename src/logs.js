export class Logs {
	player1;
	player2;
	$chat;
	logs = {
		start: '[player1] и [player2] бросили вызов друг другу.',
		end: [
			'Результат удара [playerWins]: [playerLose] - труп',
			'[playerLose] погиб от удара бойца [playerWins]',
			'Результат боя: [playerLose] - жертва, [playerWins] - убийца'
		],
		hit: [
			'[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
			'[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
			'[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
			'[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
			'[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
			'[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
			'[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
			'[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
			'[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
			'[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
			'[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
			'[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
			'[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
			'[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
			'[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
			'[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
			'[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
			'[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.'
		],
		defence: [
			'[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
			'[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
			'[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
			'[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
			'[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
			'[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
			'[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
			'[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
		],
		draw: 'Ничья - это тоже победа!'
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