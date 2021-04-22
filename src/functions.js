import { generateFightLog, generateResultLog } from './logs.js';
import { handleDraw, player1, player2 } from './players.js';

const $arenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control');

const TARGET = ['head', 'body', 'legs'];

const TARGET_DAMAGE = {
	head: 30,
	body: 25,
	legs: 20
};

const getRandom = max => Math.floor(Math.random() * max) + 1;

const getRandomIndex = max => Math.floor(Math.random() * max);

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

function playerAttack() {
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

		item.checked = false;
	}

	return playerAction;
}

function fight() {
	const enemyAction = enemyAttack();
	const playerAction = playerAttack();

	const $player1HPCount = document.querySelector('.player1 .progressbar' +
		' .hpcount');
	const $player2HPCount = document.querySelector('.player2 .progressbar' +
		' .hpcount');

	const player1HP = $player1HPCount.innerText;
	const player2HP = $player2HPCount.innerText;

	// Check enemy and player's defence, set damage to 0, if hit target is
	// the same as defence target
	if (playerAction.hitTarget === enemyAction.defenceTarget) {
		generateFightLog('defence', player1, player2);
		playerAction.damage = 0;
	}
	if (enemyAction.hitTarget === playerAction.defenceTarget) {
		generateFightLog('defence', player2, player1);
		enemyAction.damage = 0;
	}

	// If draw conditions are fulfilled, execute draw, else
	// continue getting damage until one of the players' HP is 0, then
	// execute lose methods of objects to set a winner
	if (player1HP - enemyAction.damage <= 0 && player2HP -
		playerAction.damage <= 0) {
		player1.changeHP(enemyAction.damage);
		player2.changeHP(playerAction.damage);

		player1.renderHP();
		player2.renderHP();
		handleDraw();
		generateResultLog(true);
	} else {
		player2.getDamage(playerAction.damage);
		if (playerAction.damage !== 0) {

			generateFightLog('hit', player1, player2,
				playerAction.damage);
			console.log('if');
		}

		player1.getDamage(enemyAction.damage);
		if (enemyAction.damage !== 0) {
			generateFightLog('hit', player2, player1,
				enemyAction.damage);
		}

		if (player1.hp === 0) {
			player1.handleLose();
			generateResultLog(false, false);
		} else if (player2.hp === 0) {
			player2.handleLose();
			generateResultLog(false, true);
		}
	}

}

export {
	populateArena,
	createElement,
	createReloadButton,
	getRandom,
	fight,
	getRandomIndex,
	$arenas,
	$fightForm,
	TARGET,
	TARGET_DAMAGE
};