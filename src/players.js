import {
	$arenas, $fightForm, createElement, createReloadButton, fight, getRandom,
	TARGET_DAMAGE
} from './functions.js';

// Player declaration
const player1 = {
	player: 1,
	displayName: 'Sub-Zero',
	name: 'subzero',
	hp: 100,
	img: '',
	weapon: ['Kori Blade', 'Ice Daggers'],
	attack,
	getDamage,
	changeHP,
	getPlayerHPElements,
	renderHP,
	handleLose

};

const player2 = {
	player: 2,
	displayName: 'Scorpion',
	name: 'scorpion',
	hp: 100,
	img: '',
	weapon: ['Kunai', 'Katana'],
	attack,
	getDamage,
	changeHP,
	getPlayerHPElements,
	renderHP,
	handleLose
};

// Player methods

function changeHP(damage) {
	this.hp -= damage;

	if (this.hp <= 0) {
		this.hp = 0;
	}
}

function getPlayerHPElements() {
	const $playerHP = document.querySelector(
		'.player' + this.player + ' .progressbar .hp');
	const $playerHPCount = document.querySelector(
		'.player' + this.player + ' .progressbar .hpcount');

	return { $playerHP, $playerHPCount };
}

function renderHP() {
	const { $playerHP, $playerHPCount } = this.getPlayerHPElements();

	$playerHP.style.width = this.hp + '%';
	$playerHPCount.innerText = this.hp;
}

function attack($fightForm) {
	const playerAction = {};

	// Read form input
	for (let item of $fightForm) {

		// Check for attack radio input
		if (item.checked && item.name === 'hit') {
			playerAction.hitTarget = item.value;
			playerAction.damage =
				getRandom(TARGET_DAMAGE[playerAction.hitTarget]);
		}

		// Check for defence radio input
		if (item.checked && item.name === 'defence') {
			playerAction.defenceTarget = item.value;
		}
	}

	fight(playerAction);
}

function handleLose() {
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

function handleDraw() {

	const $drawBanner = createElement('div', 'winBanner');
	$drawBanner.innerText = 'draw';

	$fightForm.style.display = 'none';
	$arenas.appendChild($drawBanner);

	createReloadButton();
}

function getDamage(damage) {
	this.changeHP(damage);
	this.renderHP();

	if (this.hp === 0) {
		this.handleLose();
	}
}

export {
	player1,
	player2,
	getDamage,
	changeHP,
	getPlayerHPElements,
	renderHP,
	handleLose,
	handleDraw,
	attack
};