import { player1, player2 } from '../main.js';
import { generateFightLog, generateResultLog } from './logs.js';
import { getRandom, TARGET, TARGET_DAMAGE } from './utils.js';

const $arenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control');

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

const populateArena = (player1, player2) => {

	const $player1 = player1.renderPlayer();
	const $player2 = player2.renderPlayer();

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

function handleDraw() {
	const $drawBanner = createElement('div', 'winBanner');
	$drawBanner.innerText = 'draw';

	$fightForm.style.display = 'none';
	$arenas.appendChild($drawBanner);

	createReloadButton();
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
	fight,
	$arenas,
	$fightForm
};