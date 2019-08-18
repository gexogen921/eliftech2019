const Hotdog = require('./models/hotdog');

Hotdog.countDocuments().exec((err, count) => {
  if (count > 0) {
    return;
  }

  const hotdog1 = new Hotdog({ name: 'freshMeat', price: 2.5, image: 'https://www.ballparkbrand.com/sites/default/files/Hero_Dog_0.png' });
  const hotdog2 = new Hotdog({ name: 'onionBomb', price: 3.5, image: 'https://www.ballparkbrand.com/sites/default/files/Hero_Dog_0.png' });
  const hotdog3 = new Hotdog({ name: 'cheeseParty', price: 6.7, image: 'https://www.ballparkbrand.com/sites/default/files/Hero_Dog_0.png' });
  const hotdog4 = new Hotdog({ name: 'zombySnack', price: 9.2, image: 'https://www.ballparkbrand.com/sites/default/files/Hero_Dog_0.png' });

  Hotdog.create([hotdog1, hotdog2, hotdog3, hotdog4], (error) => {
    if (!error) {
      // console.log('ready to go....');
    }
  });
});
