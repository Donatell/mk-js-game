import { Logs } from './logs.js';
import { Player } from './players.js';

export class Game {
	$arenas;
	$fightForm;
	TARGET_DAMAGE = {
		head: 30,
		body: 25,
		legs: 20
	};
	TARGET = ['head', 'body', 'legs'];
	player1;
	player2;
	logs;

	constructor() {
		this.$arenas = document.querySelector('.arenas');
		this.$fightForm = document.querySelector('.control');
		this.player1 = new Player({
			player: 1,
			displayName: 'Sub-Zero',
			name: 'subzero'
		});
		this.player2 = new Player({
			player: 2,
			displayName: 'Scorpion',
			name: 'scorpion'
		});
		this.logs = new Logs(this.player1, this.player2);
	}

	start() {
		this.populateArena(this.player1, this.player2);

		this.logs.generateFightLog('start', this.player1, this.player2);
	}

	getRandom = max => Math.floor(Math.random() * max) + 1;

	createElement = (tag, className, innerText) => {
		const $tag = document.createElement(tag);

		if (className) {
			$tag.classList.add(className);
		}

		if (innerText) {
			$tag.innerText = innerText;
		}

		return $tag;
	};

	createReloadButton() {
		const $reloadWrap = this.createElement('div', 'reloadWrap');

		const $reloadButton = this.createElement('button', 'button', 'Restart');
		$reloadButton.addEventListener('click', () => window.location.reload());

		$reloadWrap.appendChild($reloadButton);

		this.$arenas.appendChild($reloadWrap);
	}

	populateArena = (player1, player2) => {

		const $player1 = this.renderPlayer(player1);
		const $player2 = this.renderPlayer(player2);

		this.$arenas.appendChild($player1);
		this.$arenas.appendChild($player2);
	};

	handleLose(playerNumber) {
		const enemyNumber = playerNumber === 1 ? 2 : 1;

		const $winBanner = this.createElement('div', 'winBanner');
		const $winPlayer = document.querySelector(
			'.player' + enemyNumber + ' .progressbar .name');
		const winPlayerName = $winPlayer.innerText;
		$winBanner.innerText = winPlayerName + ' wins!';

		this.$fightForm.style.display = 'none';
		this.$arenas.appendChild($winBanner);

		this.createReloadButton();
	}

	renderPlayer(player) {
		const $player = this.createElement('div', 'player' + player.player);
		const $progressBar = this.createElement('div', 'progressbar');

		const $hp = this.createElement('div', 'hp');
		$hp.style.width = player.hp + '%';

		const $hpcount = this.createElement('div', 'hpcount', player.hp);

		const $name = this.createElement('div', 'name',
			player.displayName.toUpperCase());

		const $character = this.createElement('div', 'character');

		const $image = this.createElement('img');
		$image.src =
			`https://reactmarathon-api.herokuapp.com/assets/${player.name}.gif`;

		$progressBar.appendChild($hp);
		$progressBar.appendChild($hpcount);
		$progressBar.appendChild($name);

		$character.appendChild($image);

		$player.appendChild($progressBar);
		$player.appendChild($character);

		return $player;
	};

	enemyAttack() {
		const hitTarget = (this.TARGET)[this.getRandom(3) - 1];
		const defenceTarget = (this.TARGET)[this.getRandom(3) - 1];

		return {
			damage: this.getRandom((this.TARGET_DAMAGE)[hitTarget]),
			hitTarget,
			defenceTarget
		};
	}

	playerAttack() {
		const playerAction = {};

		// Read form input
		for (let item of this.$fightForm) {

			// Check for attack radio input
			if (item.checked && item.name === 'hit') {
				playerAction.hitTarget = item.value;
				playerAction.damage =
					this.getRandom(
						(this.TARGET_DAMAGE)[playerAction.hitTarget]);
			}

			// Check for defence radio input
			if (item.checked && item.name === 'defence') {
				playerAction.defenceTarget = item.value;
			}

			item.checked = false;
		}

		return playerAction;
	}

	handleDraw() {
		const $drawBanner = this.createElement('div', 'winBanner');
		$drawBanner.innerText = 'draw';

		this.$fightForm.style.display = 'none';
		this.$arenas.appendChild($drawBanner);

		this.createReloadButton();
	}

	fight() {
		const enemyAction = this.enemyAttack();
		const playerAction = this.playerAttack();

		const $player1HPCount = document.querySelector('.player1 .progressbar' +
			' .hpcount');
		const $player2HPCount = document.querySelector('.player2 .progressbar' +
			' .hpcount');

		const player1HP = $player1HPCount.innerText;
		const player2HP = $player2HPCount.innerText;

		// Check enemy and player's defence, set damage to 0, if hit target is
		// the same as defence target
		if (playerAction.hitTarget === enemyAction.defenceTarget) {
			this.logs.generateFightLog('defence', this.player1, this.player2);
			playerAction.damage = 0;
		}
		if (enemyAction.hitTarget === playerAction.defenceTarget) {
			this.logs.generateFightLog('defence', this.player2, this.player1);
			enemyAction.damage = 0;
		}

		// If draw conditions are fulfilled, execute draw, else
		// continue getting damage until one of the players' HP is 0, then
		// execute lose methods of objects to set a winner
		if (player1HP - enemyAction.damage <= 0 && player2HP -
			playerAction.damage <= 0) {
			this.player1.changeHP(enemyAction.damage);
			this.player2.changeHP(playerAction.damage);

			this.player1.renderHP();
			this.player2.renderHP();
			this.handleDraw();
			this.logs.generateResultLog(true);
		} else {
			this.player2.getDamage(playerAction.damage);
			if (playerAction.damage !== 0) {

				this.logs.generateFightLog('hit', this.player1, this.player2,
					playerAction.damage);
				console.log('if');
			}

			this.player1.getDamage(enemyAction.damage);
			if (enemyAction.damage !== 0) {
				this.logs.generateFightLog('hit', this.player2, this.player1,
					enemyAction.damage);
			}

			if (this.player1.hp === 0) {
				this.handleLose(this.player1.player);
				this.logs.generateResultLog(false, false);
			} else if (this.player2.hp === 0) {
				this.handleLose(this.player2.player);
				this.logs.generateResultLog(false, true);
			}
		}

	}

}