
    $("#export").on("click", startExport);
    $("#import").on("click", function() {
      startImport(prompt("Please paste your save:", ""));
     });
    $("#toString").on("click", toString);
    $(window).on("paste", function(e) {
      startImport(e.originalEvent.clipboardData.getData("text/plain"));
    });

    window.onload = function(){
        document.getElementById('close').onclick = function(){
            this.parentNode.parentNode.parentNode
            .removeChild(this.parentNode.parentNode);
            return false;
        };
    };

    function confirmation() {
      if (confirm("Are you sure you want to reset?")) {
        localStorage.clear();
         window.location.href ="/"
         window.scrollTo(0,0);
      }
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

    function copyToClipboard(text) {
      var dummy = $('<div>');
      $("body").append(dummy);
      dummy.attr("contenteditable", true)
        .html(text).select()
        .on("focus", function() { document.execCommand("selectAll", false, null) })
        .focus();

      document.execCommand("copy");
      dummy.remove();
    }

  function hideForm(){
    document.getElementById("clipboard").hidden = true;
  }

      function startExport() {
        if (localStorage.getItem('checked-checkboxes') && $.parseJSON(localStorage.getItem('checked-checkboxes')).length !== 0) {
          var encoded = btoa(localStorage.getItem('checked-checkboxes'));
          copyToClipboard(encoded);
          if (screen.width<"601"){
            document.forms['yourform']['yourtextarea'].value = encoded;
            document.getElementById("clipboard").hidden = false;
          }
          else{
            alert("Copied to Clipboard!");  
          }
        } else {
          alert("Nothing to export!");
        }
      }

      function startImport(data) {
        try {
          var decoded = atob(data);
          var arrCheckedCheckboxes = $.parseJSON(decoded);

          // simple document ready code
          $(arrCheckedCheckboxes.toString()).prop('checked', true);
          arrCheckedCheckboxes.forEach(function(obj) {
            var num = "cont";
            var n = obj.substr(1);
            num += n;
            document.getElementById(num).style.backgroundColor = "#62D17A";
          })
          var checkedBoxes = document.querySelectorAll('input[name=dex]:checked');
          var width = Math.round(checkedBoxes.length/376*10000)/100;
          document.getElementById("myBar").style.width = width + '%';
          document.getElementById("barLabel").innerHTML = "Pokedex Completion: ";
          document.getElementById("barLabel").innerHTML += width * 1  + '%';
          document.getElementById("barLabel").innerHTML += " | ";
          document.getElementById("barLabel").innerHTML += checkedBoxes.length;
          document.getElementById("barLabel").innerHTML += " / 376";
          localStorage.setItem('checked-checkboxes', JSON.stringify(arrCheckedCheckboxes));

          alert("Import successful!");
          location.reload();
        } catch (Exception) {
          alert("Pasted invalid data!")
        }
      }

$(document).ready(function () {

    if (localStorage.getItem('checked-checkboxes') && $.parseJSON(localStorage.getItem('checked-checkboxes')).length !== 0)
    {
      var arrCheckedCheckboxes = $.parseJSON(localStorage.getItem('checked-checkboxes'));
      $(arrCheckedCheckboxes.toString()).prop('checked', true);
      arrCheckedCheckboxes.forEach(function(obj) {
        var num = "cont";
        var n = obj.substr(1);
        num += n;
        document.getElementById(num).style.backgroundColor = "#62D17A";
      })
      var checkedBoxes = document.querySelectorAll('input[name=dex]:checked');
      var width = Math.round(checkedBoxes.length/376*10000)/100;
      document.getElementById("myBar").style.width = width + '%';
      document.getElementById("barLabel").innerHTML = "Pokedex Completion: ";
      document.getElementById("barLabel").innerHTML += width * 1  + '%';
      document.getElementById("barLabel").innerHTML += " | ";
      document.getElementById("barLabel").innerHTML += checkedBoxes.length;
      document.getElementById("barLabel").innerHTML += " / 376";
    }
    $("input:checkbox").change(function () {
      var arrCheckedCheckboxes = [];
      $.each($("input:checkbox:checked"), function () {
          arrCheckedCheckboxes.push("#" + $(this).attr('id'));
      });
      var num = "cont";
      num += $(this).attr('id');
      if(this.checked){
        document.getElementById(num).style.backgroundColor = "#62D17A";
      }
      else{
        document.getElementById(num).style.backgroundColor = "#D3D3D3";}
      var checkedBoxes = document.querySelectorAll('input[name=dex]:checked');
      var width = Math.round(checkedBoxes.length/376*10000)/100;
      document.getElementById("myBar").style.width = width + '%';
      document.getElementById("barLabel").innerHTML = "Pokedex Completion: ";
      document.getElementById("barLabel").innerHTML += width * 1  + '%';
      document.getElementById("barLabel").innerHTML += " | ";
      document.getElementById("barLabel").innerHTML += checkedBoxes.length;
      document.getElementById("barLabel").innerHTML += " / 376";
      localStorage.setItem('checked-checkboxes', JSON.stringify(arrCheckedCheckboxes));
    });

});


var PokedexController = /** @class */ (function () {
    function PokedexController(pokedexService) {
        this.pokedexService = pokedexService;
        this.genOne = this.pokedexService.entries.slice(0,151);
        this.genTwo = this.pokedexService.entries.slice(151,250);
        this.genThree = this.pokedexService.entries.slice(250,376);
    }
    PokedexController.prototype.print = function () {
        window.print();
    };
    return PokedexController;
}());

var PokedexService = /** @class */ (function () {
    function PokedexService() {
        this.shinies = [{ "id": "001", "name": "Bulbasaur" }, { "id": "002", "name": "Ivysaur" }, { "id": "003", "name": "Venusaur" }, { "id": "004", "name": "Charmander" }, { "id": "005", "name": "Charmeleon" }, { "id": "006", "name": "Charizard" }, { "id": "007", "name": "Squirtle" }, { "id": "008", "name": "Wortortle" }, { "id": "009", "name": "Blastoise" }, { "id": "025", "name": "Pikachu" }, { "id": "025-party", "name": "Party Pikachu" }, { "id": "026", "name": "Raichu" }, { "id": "026-party", "name": "Party Raichu" }, { "id": "090", "name": "Shellder" }, { "id": "091", "name": "Cloister" }, { "id": "126", "name": "Magmar" }, { "id": "129", "name": "Magicarp", }, { "id": "130", "name": "Gyarados" }, { "id": "133", "name": "Eevee" }, { "id": "134", "name": "Vaporeon" }, { "id": "135", "name": "Jolteon" }, { "id": "136", "name": "Flareon" }, { "id": "138", "name": "Omanyte" }, { "id": "139", "name": "Omantar" }, { "id": "140", "name": "Kabuto" }, { "id": "141", "name": "Kabutops" }, { "id": "142", "name": "Aerodactyl" }, { "id": "144", "name": "Articuno" }, { "id": "145", "name": "Zapdos" }, { "id": "147", "name": "Dratini" }, { "id": "148", "name": "Dragonair" }, { "id": "149", "name": "Dragonite" }, { "id": "172", "name": "Pichu" }, { "id": "172-party", "name": "Party Pichu" }, { "id": "175", "name": "Togepi" }, { "id": "176", "name": "Togetic" }, { "id": "179", "name": "Mareep" }, { "id": "180", "name": "Flaafy" }, { "id": "181", "name": "Ampharos" }, { "id": "196", "name": "Espeon" }, { "id": "197", "name": "Umbreon" }, { "id": "198", "name": "Murkrow" }, { "id": "202", "name": "Wobbuffet" }, { "id": "209", "name": "Snubbull" }, { "id": "210", "name": "Granbull" }, { "id": "228", "name": "Houndour" }, { "id": "229", "name": "Houndoom" }, { "id": "240", "name": "Magby" }, { "id": "246", "name": "Larvitar" }, { "id": "247", "name": "Pupitar" }, { "id": "248", "name": "Tyranitar" }, { "id": "249", "name": "Lugia" }, { "id": "250", "name": "Ho-oh" }, { "id": "261", "name": "Poochyena" }, { "id": "262", "name": "Mighyena" }, { "id": "296", "name": "Makuhita" }, { "id": "297", "name": "Hariyama" }, { "id": "302", "name": "Sableye" }, { "id": "303", "name": "Mawile" }, { "id": "304", "name": "Aron" }, { "id": "305", "name": "Lairon" }, { "id": "306", "name": "Aggron" }, { "id": "307", "name": "Meditite" }, { "id": "308", "name": "Medicham" }, { "id": "311", "name": "Plusle" }, { "id": "312", "name": "Minun" }, { "id": "315", "name": "Roselia" }, { "id": "320", "name": "Wailmer" }, { "id": "321", "name": "Waillord" }, { "id": "333", "name": "Swablu" }, { "id": "334", "name": "Altaria" }, { "id": "353", "name": "Shuppet" }, { "id": "354", "name": "Banette" }, { "id": "355", "name": "Duskull" }, { "id": "356", "name": "Dusclops" }, { "id": "359", "name": "Absol" }, { "id": "360", "name": "Wynaut" }, { "id": "361", "name": "Snorunt" }, { "id": "362", "name": "Glaile" }, { "id": "370", "name": "Luvdisk" }, { "id": "382", "name": "Kyogre" }];
        this.special = [{ "id": "172-santa", "name": "Santa Pichu" },
        { "id": "025-santa", "name": "Santa Pikachu" },
        { "id": "026-santa", "name": "Santa Raichu" },
        { "id": "025-party", "name": "Party Pikachu" },
        { "id": "026-party", "name": "Party Raichu" },
        { "id": "172-ash", "name": "Ash Pichu" },
        { "id": "025-ash", "name": "Ash Pikachu" },
        { "id": "026-ash", "name": "Ash Raichu" },
        { "id": "172-halloween", "name": "Witch Pichu" },
        { "id": "025-halloween", "name": "Witch Pikachu" },
        { "id": "026-halloween", "name": "Witch Raichu" },
        { "id": "172-summer", "name": "Summer Pichu" },
        { "id": "025-summer", "name": "Summer Pikachu" },
        { "id": "026-summer", "name": "Summer Raichu" },
        { "id": "007-sunglasses", "name": "Summer Squirtle" },
        { "id": "008-sunglasses", "name": "Summer Wartortle" },
        { "id": "009-sunglasses", "name": "Summer Blastoise" },
        { "id": "351-s", "name": "Sunny Castform" },
        { "id": "351-r", "name": "Rainy Castform" },
        { "id": "351-i", "name": "Snowy Castform" }];
        this.alolan = [{ "id": "019-a", "name": "Rattata" },
        { "id": "020-a", "name": "Raticate" },
        { "id": "026-a", "name": "Raichu" },
        { "id": "027-a", "name": "Sandshrew" },
        { "id": "028-a", "name": "Sandslash" },
        { "id": "037-a", "name": "Vulpix" },
        { "id": "038-a", "name": "Ninetales" },
        { "id": "050-a", "name": "Diglett" },
        { "id": "051-a", "name": "Dugtrio" },
        { "id": "052-a", "name": "Meowth" },
        { "id": "053-a", "name": "Persian" },
        { "id": "074-a", "name": "Geodude" },
        { "id": "075-a", "name": "Graveler" },
        { "id": "076-a", "name": "Golem" },
        { "id": "088-a", "name": "Grimer" },
        { "id": "089-a", "name": "Muk" },
        { "id": "103-a", "name": "Exeggutor" },
        { "id": "105-a", "name": "Marowak" }];
        this.unowns = [{ "id": "201-a", "name": "A" },
        { "id": "201-c", "name": "C" },
        { "id": "201-d", "name": "D" },
        { "id": "201-e", "name": "E" },
        { "id": "201-f", "name": "F" },
        { "id": "201-g", "name": "G" },
        { "id": "201-h", "name": "H" },
        { "id": "201-i", "name": "I" },
        { "id": "201-k", "name": "K" },
        { "id": "201-l", "name": "L" },
        { "id": "201-m", "name": "M" },
        { "id": "201-o", "name": "O" },
        { "id": "201-p", "name": "P" },
        { "id": "201-r", "name": "R" },
        { "id": "201-s", "name": "S" },
        { "id": "201-t", "name": "T" },
        { "id": "201-u", "name": "U" },
        { "id": "201-w", "name": "W" },
        { "id": "201-y", "name": "Y" }];
        this.unavailable = [{ "id": "201-b", "name": "B" },
        { "id": "201-j", "name": "J" },
        { "id": "201-n", "name": "N" },
        { "id": "201-q", "name": "Q" },
        { "id": "201-v", "name": "V" },
        { "id": "201-x", "name": "X" },
        { "id": "201-z", "name": "Z" },
        { "id": "235", "name": "Smeargle" },
        { "id": "290", "name": "Nincada" },
        { "id": "291", "name": "Ninjask" },
        { "id": "292", "name": "Shedinja" },
        { "id": "352", "name": "Kecleon" },
        { "id": "366", "name": "Clamperl" },
        { "id": "367", "name": "Huntail" },
        { "id": "368", "name": "Gorebyss" },
        { "id": "377", "name": "Regirock" },
        { "id": "385", "name": "Jirachi" },
        { "id": "386", "name": "Deoxys" }];
        this.entries = [{ "id": "001", "name": "Bulbasaur", "egg": "-1" }, { "id": "002", "name": "Ivysaur", "egg": "-1" }, { "id": "003", "name": "Venusaur", "egg": "-1" }, { "id": "004", "name": "Charmander", "egg": "-1" }, { "id": "005", "name": "Charmeleon", "egg": "-1" }, { "id": "006", "name": "Charizard", "egg": "-1" }, { "id": "007", "name": "Squirtle", "egg": "-1" }, { "id": "008", "name": "Wartortle", "egg": "-1" }, { "id": "009", "name": "Blastoise", "egg": "-1" }, { "id": "010", "name": "Caterpie", "egg": "-1" }, { "id": "011", "name": "Metapod", "egg": "-1" }, { "id": "012", "name": "Butterfree", "egg": "-1" }, { "id": "013", "name": "Weedle", "egg": "-1" }, { "id": "014", "name": "Kakuna", "egg": "-1" }, { "id": "015", "name": "Beedrill", "egg": "-1" }, { "id": "016", "name": "Pidgey", "egg": "-1" }, { "id": "017", "name": "Pidgeotto", "egg": "-1" }, { "id": "018", "name": "Pidgeot", "egg": "-1" }, { "id": "019", "name": "Rattata", "egg": "-1" }, { "id": "020", "name": "Raticate", "egg": "-1" }, { "id": "021", "name": "Spearow", "egg": "-1" }, { "id": "022", "name": "Fearow", "egg": "-1" }, { "id": "023", "name": "Ekans", "egg": "-1" }, { "id": "024", "name": "Arbok", "egg": "-1" }, { "id": "025", "name": "Pikachu", "egg": "-1" }, { "id": "026", "name": "Raichu", "egg": "-1" }, { "id": "027", "name": "Sandshrew", "egg": "-1" }, { "id": "028", "name": "Sandslash", "egg": "-1" }, { "id": "029", "name": "Nidoran", "egg": "-1" }, { "id": "030", "name": "Nidorina", "egg": "-1" }, { "id": "031", "name": "Nidoqueen", "egg": "-1" }, { "id": "032", "name": "Nidoran", "egg": "-1" }, { "id": "033", "name": "Nidorino", "egg": "-1" }, { "id": "034", "name": "Nidoking", "egg": "-1" }, { "id": "035", "name": "Clefairy", "egg": "-1" }, { "id": "036", "name": "Clefable", "egg": "-1" }, { "id": "037", "name": "Vulpix", "egg": "-1" }, { "id": "038", "name": "Ninetales", "egg": "-1" }, { "id": "039", "name": "Jigglypuff", "egg": "-1" }, { "id": "040", "name": "Wigglytuff", "egg": "-1" }, { "id": "041", "name": "Zubat", "egg": "-1" }, { "id": "042", "name": "Golbat", "egg": "-1" }, { "id": "043", "name": "Oddish", "egg": "-1" }, { "id": "044", "name": "Gloom", "egg": "-1" }, { "id": "045", "name": "Vileplume", "egg": "-1" }, { "id": "046", "name": "Paras", "egg": "-1" }, { "id": "047", "name": "Parasect", "egg": "-1" }, { "id": "048", "name": "Venonat", "egg": "-1" }, { "id": "049", "name": "Venomoth", "egg": "-1" }, { "id": "050", "name": "Diglett", "egg": "-1" }, { "id": "051", "name": "Dugtrio", "egg": "-1" }, { "id": "052", "name": "Meowth", "egg": "-1" }, { "id": "053", "name": "Persian", "egg": "-1" }, { "id": "054", "name": "Psyduck", "egg": "-1" }, { "id": "055", "name": "Golduck", "egg": "-1" }, { "id": "056", "name": "Mankey", "egg": "-1" }, { "id": "057", "name": "Primeape", "egg": "-1" }, { "id": "058", "name": "Growlithe", "egg": "-1" }, { "id": "059", "name": "Arcanine", "egg": "-1" }, { "id": "060", "name": "Poliwag", "egg": "-1" }, { "id": "061", "name": "Poliwhirl", "egg": "-1" }, { "id": "062", "name": "Poliwrath", "egg": "-1" }, { "id": "063", "name": "Abra", "egg": "-1" }, { "id": "064", "name": "Kadabra", "egg": "-1" }, { "id": "065", "name": "Alakazam", "egg": "-1" }, { "id": "066", "name": "Machop", "egg": "-1" }, { "id": "067", "name": "Machoke", "egg": "-1" }, { "id": "068", "name": "Machamp", "egg": "-1" }, { "id": "069", "name": "Bellsprout", "egg": "-1" }, { "id": "070", "name": "Weepinbell", "egg": "-1" }, { "id": "071", "name": "Victreebel", "egg": "-1" }, { "id": "072", "name": "Tentacool", "egg": "-1" }, { "id": "073", "name": "Tentacruel", "egg": "-1" }, { "id": "074", "name": "Geodude", "egg": "-1" }, { "id": "075", "name": "Graveler", "egg": "-1" }, { "id": "076", "name": "Golem", "egg": "-1" }, { "id": "077", "name": "Ponyta", "egg": "-1" }, { "id": "078", "name": "Rapidash", "egg": "-1" }, { "id": "079", "name": "Slowpoke", "egg": "-1" }, { "id": "080", "name": "Slowbro", "egg": "-1" }, { "id": "081", "name": "Magnemite", "egg": "-1" }, { "id": "082", "name": "Magneton", "egg": "-1" }, { "id": "083", "name": "Farfetch'd", "egg": "-1", "availability": "Only catchable in Asia" }, { "id": "084", "name": "Doduo", "egg": "-1" }, { "id": "085", "name": "Dodrio", "egg": "-1" }, { "id": "086", "name": "Seel", "egg": "-1" }, { "id": "087", "name": "Dewgong", "egg": "-1" }, { "id": "088", "name": "Grimer", "egg": "-1" }, { "id": "089", "name": "Muk", "egg": "-1" }, { "id": "090", "name": "Shellder", "egg": "-1" }, { "id": "091", "name": "Cloyster", "egg": "-1" }, { "id": "092", "name": "Gastly", "egg": "-1" }, { "id": "093", "name": "Haunter", "egg": "-1" }, { "id": "094", "name": "Gengar", "egg": "-1" }, { "id": "095", "name": "Onix", "egg": "-1" }, { "id": "096", "name": "Drowzee", "egg": "-1" }, { "id": "097", "name": "Hypno", "egg": "-1" }, { "id": "098", "name": "Krabby", "egg": "-1" }, { "id": "099", "name": "Kingler", "egg": "-1" }, { "id": "100", "name": "Voltorb", "egg": "-1" }, { "id": "101", "name": "Electrode", "egg": "-1" }, { "id": "102", "name": "Exeggcute", "egg": "-1" }, { "id": "103", "name": "Exeggutor", "egg": "-1" }, { "id": "104", "name": "Cubone", "egg": "-1" }, { "id": "105", "name": "Marowak", "egg": "-1" }, { "id": "106", "name": "Hitmonlee", "egg": "-1" }, { "id": "107", "name": "Hitmonchan", "egg": "-1" }, { "id": "108", "name": "Lickitung", "egg": "-1" }, { "id": "109", "name": "Koffing", "egg": "-1" }, { "id": "110", "name": "Weezing", "egg": "-1" }, { "id": "111", "name": "Rhyhorn", "egg": "-1" }, { "id": "112", "name": "Rhydon", "egg": "-1" }, { "id": "113", "name": "Chansey", "egg": "-1" }, { "id": "114", "name": "Tangela", "egg": "-1" }, { "id": "115", "name": "Kangaskhan", "egg": "-1", "availability": "Only available in Australia" }, { "id": "116", "name": "Horsea", "egg": "-1" }, { "id": "117", "name": "Seadra", "egg": "-1" }, { "id": "118", "name": "Goldeen", "egg": "-1" }, { "id": "119", "name": "Seaking", "egg": "-1" }, { "id": "120", "name": "Staryu", "egg": "-1" }, { "id": "121", "name": "Starmie", "egg": "-1" }, { "id": "122", "name": "Mr. Mime", "egg": "-1", "availability": "Only available in Europe" }, { "id": "123", "name": "Scyther", "egg": "-1" }, { "id": "124", "name": "Jynx", "egg": "-1" }, { "id": "125", "name": "Electabuzz", "egg": "-1" }, { "id": "126", "name": "Magmar", "egg": "-1" }, { "id": "127", "name": "Pinsir", "egg": "-1" }, { "id": "128", "name": "Tauros", "egg": "-1", "availability": "Only available in North America" }, { "id": "129", "name": "Magikarp", "egg": "-1" }, { "id": "130", "name": "Gyarados", "egg": "-1" }, { "id": "131", "name": "Lapras", "egg": "-1" }, { "id": "132", "name": "Ditto", "egg": "-1" }, { "id": "133", "name": "Eevee", "egg": "-1" }, { "id": "134", "name": "Vaporeon", "egg": "-1" }, { "id": "135", "name": "Jolteon", "egg": "-1" }, { "id": "136", "name": "Flareon", "egg": "-1" }, { "id": "137", "name": "Porygon", "egg": "-1" }, { "id": "138", "name": "Omanyte", "egg": "-1" }, { "id": "139", "name": "Omastar", "egg": "-1" }, { "id": "140", "name": "Kabuto", "egg": "-1" }, { "id": "141", "name": "Kabutops", "egg": "-1" }, { "id": "142", "name": "Aerodactyl", "egg": "-1" }, { "id": "143", "name": "Snorlax", "egg": "-1" }, { "id": "144", "name": "Articuno", "egg": "-1" }, { "id": "145", "name": "Zapdos", "egg": "-1" }, { "id": "146", "name": "Moltres", "egg": "-1" }, { "id": "147", "name": "Dratini", "egg": "-1" }, { "id": "148", "name": "Dragonair", "egg": "-1" }, { "id": "149", "name": "Dragonite", "egg": "-1" }, { "id": "150", "name": "Mewtwo", "egg": "-1" }, { "id": "151", "name": "Mew", "egg": "-1", "availability": "Not currently available" }, { "id": "152", "name": "Chikorita", "egg": "-1" }, { "id": "153", "name": "Bayleef", "egg": "-1" }, { "id": "154", "name": "Meganium", "egg": "-1" }, { "id": "155", "name": "Cyndaquil", "egg": "-1" }, { "id": "156", "name": "Quilava", "egg": "-1" }, { "id": "157", "name": "Typhlosion", "egg": "-1" }, { "id": "158", "name": "Totodile", "egg": "-1" }, { "id": "159", "name": "Croconaw", "egg": "-1" }, { "id": "160", "name": "Feraligatr", "egg": "-1" }, { "id": "161", "name": "Sentret", "egg": "-1" }, { "id": "162", "name": "Furret", "egg": "-1" }, { "id": "163", "name": "Hoothoot", "egg": "-1" }, { "id": "164", "name": "Noctowl", "egg": "-1" }, { "id": "165", "name": "Ledyba", "egg": "-1" }, { "id": "166", "name": "Ledian", "egg": "-1" }, { "id": "167", "name": "Spinarak", "egg": "-1" }, { "id": "168", "name": "Ariados", "egg": "-1" }, { "id": "169", "name": "Crobat", "egg": "-1" }, { "id": "170", "name": "Chinchou", "egg": "-1" }, { "id": "171", "name": "Lanturn", "egg": "-1" }, { "id": "172", "name": "Pichu", "egg": "-1" }, { "id": "173", "name": "Cleffa", "egg": "-1" }, { "id": "174", "name": "Igglybuff", "egg": "-1" }, { "id": "175", "name": "Togepi", "egg": "-1" }, { "id": "176", "name": "Togetic", "egg": "-1" }, { "id": "177", "name": "Natu", "egg": "-1" }, { "id": "178", "name": "Xatu", "egg": "-1" }, { "id": "179", "name": "Mareep", "egg": "-1" }, { "id": "180", "name": "Flaaffy", "egg": "-1" }, { "id": "181", "name": "Ampharos", "egg": "-1" }, { "id": "182", "name": "Bellossom", "egg": "-1" }, { "id": "183", "name": "Marill", "egg": "-1" }, { "id": "184", "name": "Azumarill", "egg": "-1" }, { "id": "185", "name": "Sudowoodo", "egg": "-1" }, { "id": "186", "name": "Politoed", "egg": "-1" }, { "id": "187", "name": "Hoppip", "egg": "-1" }, { "id": "188", "name": "Skiploom", "egg": "-1" }, { "id": "189", "name": "Jumpluff", "egg": "-1" }, { "id": "190", "name": "Aipom", "egg": "-1" }, { "id": "191", "name": "Sunkern", "egg": "-1" }, { "id": "192", "name": "Sunflora", "egg": "-1" }, { "id": "193", "name": "Yanma", "egg": "-1" }, { "id": "194", "name": "Wooper", "egg": "-1" }, { "id": "195", "name": "Quagsire", "egg": "-1" }, { "id": "196", "name": "Espeon", "egg": "-1" }, { "id": "197", "name": "Umbreon", "egg": "-1" }, { "id": "198", "name": "Murkrow", "egg": "-1" }, { "id": "199", "name": "Slowking", "egg": "-1" }, { "id": "200", "name": "Misdreavus", "egg": "-1" }, { "id": "201", "name": "Unown", "egg": "-1" }, { "id": "202", "name": "Wobbuffet", "egg": "-1" }, { "id": "203", "name": "Girafarig", "egg": "-1" }, { "id": "204", "name": "Pineco", "egg": "-1" }, { "id": "205", "name": "Forretress", "egg": "-1" }, { "id": "206", "name": "Dunsparce", "egg": "-1" }, { "id": "207", "name": "Gligar", "egg": "-1" }, { "id": "208", "name": "Steelix", "egg": "-1" }, { "id": "209", "name": "Snubbull", "egg": "-1" }, { "id": "210", "name": "Granbull", "egg": "-1" }, { "id": "211", "name": "Qwilfish", "egg": "-1" }, { "id": "212", "name": "Scizor", "egg": "-1" }, { "id": "213", "name": "Shuckle", "egg": "-1" }, { "id": "214", "name": "Heracross", "egg": "-1", "availability": "Only available in South America and Florida" }, { "id": "215", "name": "Sneasel", "egg": "-1" }, { "id": "216", "name": "Teddiursa", "egg": "-1" }, { "id": "217", "name": "Ursaring", "egg": "-1" }, { "id": "218", "name": "Slugma", "egg": "-1" }, { "id": "219", "name": "Magcargo", "egg": "-1" }, { "id": "220", "name": "Swinub", "egg": "-1" }, { "id": "221", "name": "Piloswine", "egg": "-1" }, { "id": "222", "name": "Corsola", "egg": "-1", "availability": "Only available at latitudes between 26 and 31° latitude" }, { "id": "223", "name": "Remoraid", "egg": "-1" }, { "id": "224", "name": "Octillery", "egg": "-1" }, { "id": "225", "name": "Delibird", "egg": "-1" }, { "id": "226", "name": "Mantine", "egg": "-1" }, { "id": "227", "name": "Skarmory", "egg": "-1" }, { "id": "228", "name": "Houndour", "egg": "-1" }, { "id": "229", "name": "Houndoom", "egg": "-1" }, { "id": "230", "name": "Kingdra", "egg": "-1" }, { "id": "231", "name": "Phanpy", "egg": "-1" }, { "id": "232", "name": "Donphan", "egg": "-1" }, { "id": "233", "name": "Porygon2", "egg": "-1" }, { "id": "234", "name": "Stantler", "egg": "-1" }, { "id": "236", "name": "Tyrogue", "egg": "-1" }, { "id": "237", "name": "Hitmontop", "egg": "-1" }, { "id": "238", "name": "Smoochum", "egg": "-1" }, { "id": "239", "name": "Elekid", "egg": "-1" }, { "id": "240", "name": "Magby", "egg": "-1" }, { "id": "241", "name": "Miltank", "egg": "-1" }, { "id": "242", "name": "Blissey", "egg": "-1" }, { "id": "243", "name": "Raikou", "egg": "-1" }, { "id": "244", "name": "Entei", "egg": "-1" }, { "id": "245", "name": "Suicune", "egg": "-1" }, { "id": "246", "name": "Larvitar", "egg": "-1" }, { "id": "247", "name": "Pupitar", "egg": "-1" }, { "id": "248", "name": "Tyranitar", "egg": "-1" }, { "id": "249", "name": "Lugia", "egg": "-1" }, { "id": "250", "name": "Ho-Oh", "egg": "-1" }, { "id": "251", "name": "Celebi", "egg": "-1", "availability": "Not currently available" }, { "id": "252", "name": "Treecko", "egg": "5" }, { "id": "253", "name": "Grovyle", "egg": "-1" }, { "id": "254", "name": "Sceptile", "egg": "-1" }, { "id": "255", "name": "Torchic", "egg": "5" }, { "id": "256", "name": "Combusken", "egg": "-1" }, { "id": "257", "name": "Blaziken", "egg": "-1" }, { "id": "258", "name": "Mudkip", "egg": "5" }, { "id": "259", "name": "Marshtomp", "egg": "-1" }, { "id": "260", "name": "Swampert", "egg": "-1" }, { "id": "261", "name": "Poochyena", "egg": "2" }, { "id": "262", "name": "Mightyena", "egg": "-1" }, { "id": "263", "name": "Zigzagoon", "egg": "2" }, { "id": "264", "name": "Linoone", "egg": "-1" }, { "id": "265", "name": "Wurmple", "egg": "2" }, { "id": "266", "name": "Silcoon", "egg": "-1" }, { "id": "267", "name": "Beautifly", "egg": "-1" }, { "id": "268", "name": "Cascoon", "egg": "-1" }, { "id": "269", "name": "Dustox", "egg": "-1" }, { "id": "270", "name": "Lotad", "egg": "-1", "availability": "Not currently available" }, { "id": "271", "name": "Lombre", "egg": "-1", "availability": "Not currently available" }, { "id": "272", "name": "Ludicolo", "egg": "-1", "availability": "Not currently available" }, { "id": "273", "name": "Seedot", "egg": "-1" }, { "id": "274", "name": "Nuzleaf", "egg": "-1" }, { "id": "275", "name": "Shiftry", "egg": "-1" }, { "id": "276", "name": "Taillow", "egg": "-1", "availability": "Not currently available" }, { "id": "277", "name": "Swellow", "egg": "-1", "availability": "Not currently available" }, { "id": "278", "name": "Wingull", "egg": "-1", "availability": "Not currently available" }, { "id": "279", "name": "Pelipper", "egg": "-1", "availability": "Not currently available" }, { "id": "280", "name": "Ralts", "egg": "10" }, { "id": "281", "name": "Kirlia", "egg": "-1" }, { "id": "282", "name": "Gardevoir", "egg": "-1" }, { "id": "283", "name": "Surskit", "egg": "-1", "availability": "Not currently available" }, { "id": "284", "name": "Masquerain", "egg": "-1", "availability": "Not currently available" }, { "id": "285", "name": "Shroomish", "egg": "5" }, { "id": "286", "name": "Breloom", "egg": "-1" }, { "id": "287", "name": "Slakoth", "egg": "10" }, { "id": "288", "name": "Vigoroth", "egg": "-1" }, { "id": "289", "name": "Slaking", "egg": "-1" }, { "id": "293", "name": "Whismur", "egg": "-1", "availability": "Not currently available" }, { "id": "294", "name": "Loudred", "egg": "-1", "availability": "Not currently available" }, { "id": "295", "name": "Exploud", "egg": "-1", "availability": "Not currently available" }, { "id": "296", "name": "Makuhita", "egg": "5" }, { "id": "297", "name": "Hariyama", "egg": "-1" }, { "id": "298", "name": "Azurill", "egg": "5" }, { "id": "299", "name": "Nosepass", "egg": "-1", "availability": "Not currently available" }, { "id": "300", "name": "Skitty", "egg": "5" }, { "id": "301", "name": "Delcatty", "egg": "-1" }, { "id": "302", "name": "Sableye", "egg": "10" }, { "id": "303", "name": "Mawile", "egg": "-1" }, { "id": "304", "name": "Aron", "egg": "-1", "availability": "Not currently available" }, { "id": "305", "name": "Lairon", "egg": "-1", "availability": "Not currently available" }, { "id": "306", "name": "Aggron", "egg": "-1", "availability": "Not currently available" }, { "id": "307", "name": "Meditite", "egg": "-1" }, { "id": "308", "name": "Medicham", "egg": "-1" }, { "id": "309", "name": "Electrike", "egg": "-1" }, { "id": "310", "name": "Manectric", "egg": "-1" }, { "id": "311", "name": "Plusle", "egg": "-1", "availability": "Only available in Americas &amp; Africa" }, { "id": "312", "name": "Minun", "egg": "-1", "availability": "Only available in Europe, Asia &amp; Oceania" }, { "id": "313", "name": "Volbeat", "egg": "-1", "availability": "Not currently available" }, { "id": "314", "name": "Illumise", "egg": "-1", "availability": "Not currently available" }, { "id": "315", "name": "Roselia", "egg": "-1" }, { "id": "316", "name": "Gulpin", "egg": "2" }, { "id": "317", "name": "Swalot", "egg": "-1" }, { "id": "318", "name": "Carvanha", "egg": "-1", "availability": "Not currently available" }, { "id": "319", "name": "Sharpedo", "egg": "-1", "availability": "Not currently available" }, { "id": "320", "name": "Wailmer", "egg": "-1", "availability": "Not currently available" }, { "id": "321", "name": "Wailord", "egg": "-1", "availability": "Not currently available" }, { "id": "322", "name": "Numel", "egg": "-1", "availability": "Not currently available" }, { "id": "323", "name": "Camerupt", "egg": "-1", "availability": "Not currently available" }, { "id": "324", "name": "Torkoal", "egg": "-1", "availability": "Not currently available" }, { "id": "325", "name": "Spoink", "egg": "2" }, { "id": "326", "name": "Grumpig", "egg": "-1" }, { "id": "327", "name": "Spinda", "egg": "-1", "availability": "Not currently available" }, { "id": "328", "name": "Trapinch", "egg": "-1", "availability": "Not currently available" }, { "id": "329", "name": "Vibrava", "egg": "-1", "availability": "Not currently available" }, { "id": "330", "name": "Flygon", "egg": "-1", "availability": "Not currently available" }, { "id": "331", "name": "Cacnea", "egg": "-1", "availability": "Not currently available" }, { "id": "332", "name": "Cacturne", "egg": "-1", "availability": "Not currently available" }, { "id": "333", "name": "Swablu", "egg": "-1", "availability": "Not currently available" }, { "id": "334", "name": "Altaria", "egg": "-1", "availability": "Not currently available" }, { "id": "335", "name": "Zangoose", "egg": "-1", "availability": "Only available in Americas &amp; Africa" }, { "id": "336", "name": "Seviper", "egg": "-1", "availability": "Only available in Europe, Asia &amp; Oceania" }, { "id": "337", "name": "Lunatone", "egg": "-1", "availability": "Not currently available" }, { "id": "338", "name": "Solrock", "egg": "-1", "availability": "Not currently available" }, { "id": "339", "name": "Barboach", "egg": "-1", "availability": "Not currently available" }, { "id": "340", "name": "Whiscash", "egg": "-1", "availability": "Not currently available" }, { "id": "341", "name": "Corphish", "egg": "-1", "availability": "Not currently available" }, { "id": "342", "name": "Crawdaunt", "egg": "-1", "availability": "Not currently available" }, { "id": "343", "name": "Baltoy", "egg": "-1", "availability": "Not currently available" }, { "id": "344", "name": "Claydol", "egg": "-1", "availability": "Not currently available" }, { "id": "345", "name": "Lileep", "egg": "-1", "availability": "Not currently available" }, { "id": "346", "name": "Cradily", "egg": "-1", "availability": "Not currently available" }, { "id": "347", "name": "Anorith", "egg": "-1", "availability": "Not currently available" }, { "id": "348", "name": "Armaldo", "egg": "-1", "availability": "Not currently available" }, { "id": "349", "name": "Feebas", "egg": "-1", "availability": "Not currently available" }, { "id": "350", "name": "Milotic", "egg": "-1", "availability": "Not currently available" }, { "id": "351", "name": "Castform", "egg": "-1", "availability": "Not currently available" }, { "id": "353", "name": "Shuppet", "egg": "5" }, { "id": "354", "name": "Banette", "egg": "-1" }, { "id": "355", "name": "Duskull", "egg": "5" }, { "id": "356", "name": "Dusclops", "egg": "-1" }, { "id": "357", "name": "Tropius", "egg": "-1", "availability": "Not currently available" }, { "id": "358", "name": "Chimecho", "egg": "-1", "availability": "Not currently available" }, { "id": "359", "name": "Absol", "egg": "-1" }, { "id": "360", "name": "Wynaut", "egg": "5" }, { "id": "361", "name": "Snorunt", "egg": "-1", "availability": "Not currently available" }, { "id": "362", "name": "Glalie", "egg": "-1", "availability": "Not currently available" }, { "id": "363", "name": "Spheal", "egg": "-1", "availability": "Not currently available" }, { "id": "364", "name": "Sealeo", "egg": "-1", "availability": "Not currently available" }, { "id": "365", "name": "Walrein", "egg": "-1", "availability": "Not currently available" }, { "id": "369", "name": "Relicanth", "egg": "-1", "availability": "Not currently available" }, { "id": "370", "name": "Luvdisc", "egg": "-1", "availability": "Not currently available" }, { "id": "371", "name": "Bagon", "egg": "-1", "availability": "Not currently available" }, { "id": "372", "name": "Shelgon", "egg": "-1", "availability": "Not currently available" }, { "id": "373", "name": "Salamence", "egg": "-1", "availability": "Not currently available" }, { "id": "374", "name": "Beldum", "egg": "-1", "availability": "Not currently available" }, { "id": "375", "name": "Metang", "egg": "-1", "availability": "Not currently available" }, { "id": "376", "name": "Metagross", "egg": "-1", "availability": "Not currently available" }, { "id": "377", "name": "Regirock", "egg": "-1", "availability": "Not currently available" }, { "id": "378", "name": "Regice", "egg": "-1", "availability": "Not currently available" }, { "id": "379", "name": "Registeel", "egg": "-1", "availability": "Not currently available" }, { "id": "380", "name": "Latias", "egg": "-1", "availability": "Not currently available" }, { "id": "381", "name": "Latios", "egg": "-1", "availability": "Not currently available" }, { "id": "382", "name": "Kyogre", "egg": "-1", "availability": "Not currently available" }, { "id": "383", "name": "Groudon", "egg": "-1", "availability": "Not currently available" }, { "id": "384", "name": "Rayquaza", "egg": "-1", "availability": "Not currently available" }];
    }
    return PokedexService;
}());
angular
    .module('app', ['angular.filter'])
    .controller('PokedexController', PokedexController)
    .service('pokedexService', PokedexService);
