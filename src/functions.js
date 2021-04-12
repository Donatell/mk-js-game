const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

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

function handleWin(lostPlayerNumber) {
	const $winBanner = createElement('div', 'winBanner');

	const winPlayerNumber = lostPlayerNumber === 1 ? 2 : 1;
	const $winPlayer = document.querySelector(
		'.player' + winPlayerNumber + ' .progressbar .name');
	const winPlayerName = $winPlayer.innerText;

	$winBanner.innerText = winPlayerName + ' wins!';

	$randomButton.style.display = 'none';
	$arenas.appendChild($winBanner);
}

const changeHP = (player) => {
	const damage = Math.floor(Math.random() * 20) + 1;

	player.hp -= damage;

	if (player.hp <= 0) {
		player.hp = 0;
	}

	const $playerHP = document.querySelector(
		'.player' + player.player + ' .progressbar .hp');
	const $playerHPCount = document.querySelector(
		'.player' + player.player + ' .progressbar .hpcount');

	$playerHP.style.width = player.hp + '%';
	$playerHPCount.innerText = player.hp;

	if (player.hp === 0) {
		handleWin(player.player);
	}
};

export {
	populateArena,
	changeHP,
	$arenas,
	$randomButton
};