import {
	$arenas, $control, createElement, createReloadButton
} from './functions.js';

// Player declaration
const player1 = {
	player: 1,
	displayName: 'Sub-Zero',
	name: 'subzero',
	hp: 100,
	img: '',
	weapon: ['Kori Blade', 'Ice Daggers'],
	attack: function () {
		console.log(`${this.name} attacks`);
	},
	getDamage,
	dealDamage,
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
	attack: function () {
		console.log(`${this.name} attacks`);
	},
	getDamage,
	dealDamage,
	changeHP,
	getPlayerHPElements,
	renderHP,
	handleLose
};

function changeHP(damage) {
	this.hp -= damage;

	if (this.hp <= 0) {
		this.hp = 0;
	}
}

// Player methods
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

function dealDamage(damage) {
	this.player === 1 ? player2.getDamage(damage) : player1.getDamage(damage);
}

function handleLose() {
	const enemyNumber = this.player === 1 ? 2 : 1;

	const $winBanner = createElement('div', 'winBanner');
	const $winPlayer = document.querySelector(
		'.player' + enemyNumber + ' .progressbar .name');
	const winPlayerName = $winPlayer.innerText;
	$winBanner.innerText = winPlayerName + ' wins!';

	$control.style.display = 'none';
	$arenas.appendChild($winBanner);

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
	handleLose
};