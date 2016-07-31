var // Imports
    Ajax = require('ajax'),
    PokemonList = require('./pokemon-list.json');


var // Constants
  apiUrl = 'https://pokevision.com/map/data/',
  imageUrl = 'https://ugc.pokevision.com/images/pokemon/';


var // Utils
    getPokevisionInfo = function (lat, lon, callback) {
        var info = apiUrl + lat + "/" + lon;
        Ajax(
            { url: info, method: 'get', type: 'json' },
            function(data) {
                if (data.status !== "success") {
                    return callback("Failed obtaining the pokémon.");
                } 
                callback(null, data.pokemon);
            },
            function (err) { return callback("Failed obtaining the data from server."); }
        );
    },
    humanizePokevisionInfo = function(pkmnData) {
        var pkmn = [];
        var timeNow = new Date();
        for (var i in pkmnData) {
            var time = new Date(pkmnData[i].expiration_time);
            var diffMs = (timeNow - time);
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            var p = {
            title: pokemon[pkmnData[i].pokemonId - 1],
            icon: imageUrl + pkmnData[i].pokemonId + ".png",
            subtitle: "Despawns in " + diffMins + "mins."
            };
            pkmn.push(p);
        }
        return pkmn;
    };



module.exports = {
    findNearPokemons = function(lat, long, callback) {
        getPokevisionInfo(lat, long, function(err, pkmnData) {
            if (err) {
                return callback(err);
            }
            
            pkmns = humanizePokevisionInfo(pkmnData);
            callback(pkmn);
        });
    }
}