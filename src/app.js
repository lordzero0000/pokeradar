// Imports
var 
  UI = require('ui'),
  Pokeradar = require('./pokeradar.js'),
  Utils = require('./utils.js');


// Utils 
var
  getLocalization = Utils.getLocalization,
  radar = Utils.getPokevisionInfo;


var findNear = function (callback) {
  getLocalization(function (err, cords) {
    if (err) { return callback(err); }
    
    Pokeradar.getPokevisionInfo(
      cords.latitude, 
      cords.longitude, 
      callback
    );

  });
};

var main = new UI.Card({
  title: 'PokéRadar',
  icon: 'https://pokevision.com/asset/image/pokeballs/normal.png',
  subtitle: 'Gotta find \'em all',
  body: 'Press to start.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'up', function(e) {

});

main.on('click', 'select', function(e) {
  findNear(function functionName(err, pkmn) {
    if (err) {
      var card = new UI.Card();
      card.subtitle('Error!!!');
      card.body(err);
      card.show();
    } else {
      var menu = new UI.Menu({
        sections: [{
          items: pkmn
        }]
      });
      menu.on('select', function(e) {
        console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
        console.log('The item is titled "' + e.item.title + '"');
      });
      menu.show();
    }
  });
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.subtitle('Another Pokémon Tracker App');
  card.body('Developed by D.I.O.');
  card.show();
});
