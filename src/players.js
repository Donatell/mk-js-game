const player1 = {
    displayName: 'Sub-Zero',
    name: 'subzero',
    hp: 100,
    img: '',
    weapon: ['Kori Blade', 'Ice Daggers'],
    attack: function () {
        console.log(`${this.name} attacks`);
    }
};

const player2 = {
    displayName: 'Scorpion',
    name: 'scorpion',
    hp: 100,
    img: '',
    weapon: ['Kunai', 'Katana'],
    attack: function () {
        console.log(`${this.name} attacks`);
    }
};

export {
    player1,
    player2
};