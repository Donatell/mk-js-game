const createPlayer = (player, playerData) => {
    const $player = document.createElement('div');
    $player.classList.add(player);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.innerText = playerData.hp;
    $life.style.width = '100%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = playerData.displayName.toUpperCase();

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $image = document.createElement('img');
    $image.src =
        `http://reactmarathon-api.herokuapp.com/assets/${playerData.name}.gif`;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    $character.appendChild($image);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
};

const populateArena = (player1, player2) => {

    const $player1 = createPlayer('player1', player1);
    const $player2 = createPlayer('player2', player2);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player1);
    $arenas.appendChild($player2);

    console.log('populated');
};

export {
    populateArena
};