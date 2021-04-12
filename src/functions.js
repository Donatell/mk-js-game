const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('#randomHit');
const $player1Button = document.querySelector('#player1hit');
const $player2Button = document.querySelector('#player2hit');
const $control = document.querySelector('.control');

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
	$hp.style.width = '100%';

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

export {
	populateArena,
	createElement,
	createReloadButton,
	$arenas,
	$randomButton,
	$player1Button,
	$player2Button,
	$control
};