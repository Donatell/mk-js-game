import {
	$arenas, $fightForm, createElement, createReloadButton
} from './arena.js';

export class Player {
	hp = 100;

	constructor(props) {
		this.player = props.player;
		this.displayName = props.displayName;
		this.name = props.name;
	}

	changeHP(damage) {
		this.hp -= damage;

		if (this.hp <= 0) {
			this.hp = 0;
		}
	}

	getPlayerHPElements() {
		const $playerHP = document.querySelector(
			`.player${this.player} .progressbar .hp`);
		const $playerHPCount = document.querySelector(
			`.player${this.player} .progressbar .hpcount`);

		return { $playerHP, $playerHPCount };
	}

	renderHP() {
		const { $playerHP, $playerHPCount } = this.getPlayerHPElements();

		$playerHP.style.width = this.hp + '%';
		$playerHPCount.innerText = this.hp;
	}

	getDamage(damage) {
		this.changeHP(damage);
		this.renderHP();
	}

	handleLose() {
		const enemyNumber = this.player === 1 ? 2 : 1;

		const $winBanner = createElement('div', 'winBanner');
		const $winPlayer = document.querySelector(
			'.player' + enemyNumber + ' .progressbar .name');
		const winPlayerName = $winPlayer.innerText;
		$winBanner.innerText = winPlayerName + ' wins!';

		$fightForm.style.display = 'none';
		$arenas.appendChild($winBanner);

		createReloadButton();
	}

	renderPlayer() {
		const $player = createElement('div', 'player' + this.player);
		const $progressBar = createElement('div', 'progressbar');

		const $hp = createElement('div', 'hp');
		$hp.style.width = this.hp + '%';

		const $hpcount = createElement('div', 'hpcount', this.hp);

		const $name = createElement('div', 'name',
			this.displayName.toUpperCase());

		const $character = createElement('div', 'character');

		const $image = createElement('img');
		$image.src =
			`https://reactmarathon-api.herokuapp.com/assets/${this.name}.gif`;

		$progressBar.appendChild($hp);
		$progressBar.appendChild($hpcount);
		$progressBar.appendChild($name);

		$character.appendChild($image);

		$player.appendChild($progressBar);
		$player.appendChild($character);

		return $player;
	};

}