import { handleDraw, player1, player2 } from './players.js';

const $arenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control');

// const $randomButton = document.querySelector('#randomHit');

const TARGET = ['head', 'body', 'legs'];

const TARGET_DAMAGE = {
	head: 30,
	body: 25,
	legs: 20
};

function getRandom(max) {
	return Math.floor(Math.random() * max) + 1;
}

const createElement = (tag, className, innerText) => {
	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);
	}

	if (innerText) {
		$tag.innerText = innerText;
	}

	return $tag;
};

function createReloadButton() {
	const $reloadWrap = createElement('div', 'reloadWrap');

	const $reloadButton = createElement('button', 'button', 'Restart');
	$reloadButton.addEventListener('click', () => window.location.reload());

	$reloadWrap.appendChild($reloadButton);

	$arenas.appendChild($reloadWrap);
}

const createPlayer = (player) => {
	const $player = createElement('div', 'player' + player.player);
	const $progressBar = createElement('div', 'progressbar');

	const $hp = createElement('div', 'hp');
	$hp.style.width = player.hp + '%';

	const $hpcount = createElement('div', 'hpcount', player.hp);

	const $name = createElement('div', 'name',
		player.displayName.toUpperCase());

	const $character = createElement('div', 'character');

	const $image = createElement('img');
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

const populateArena = (player1, player2) => {

	const $player1 = createPlayer(player1);
	const $player2 = createPlayer(player2);

	$arenas.appendChild($player1);
	$arenas.appendChild($player2);
};

function enemyAttack() {
	const hitTarget = TARGET[getRandom(3) - 1];
	const defenceTarget = TARGET[getRandom(3) - 1];

	return {
		damage: getRandom(TARGET_DAMAGE[hitTarget]),
		hitTarget,
		defenceTarget
	};
}

function fight(playerAction) {
	const enemyAction = enemyAttack();

	const $player1HPCount = document.querySelector('.player1 .progressbar' +
		' .hpcount');
	const $player2HPCount = document.querySelector('.player1 .progressbar' +
		' .hpcount');

	const player1HP = $player1HPCount.innerText;
	const player2HP = $player2HPCount.innerText;

	// Check enemy defence
	if (playerAction.hitTarget === enemyAction.defenceTarget) {
		playerAction.damage = 0;
	}

	// Check player defence
	if (enemyAction.hitTarget === playerAction.defenceTarget) {
		enemyAction.damage = 0;
	}

	if (player1HP - enemyAction.damage <= 0 && player2HP -
		playerAction.damage <= 0) {

		player1.changeHP(enemyAction.damage);
		player2.changeHP(playerAction.damage);

		player1.renderHP();
		player2.renderHP();
		handleDraw();
	} else {
		player2.getDamage(playerAction.damage);
		player1.getDamage(enemyAction.damage);
	}

}

export {
	populateArena,
	createElement,
	createReloadButton,
	getRandom,
	fight,
	$arenas,
	$fightForm,
	TARGET,
	TARGET_DAMAGE
	// $randomButton
};