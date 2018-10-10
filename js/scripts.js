var page = window.location.pathname;
var pokemonNum = 377;
var item;
var colour;
$(document).ready(function () {

  if (page == '/' || page == '/index.html' || page == '/index') {
    item = "checked-checkboxes";
    colour = "#62D17A";
  } else if (page == '/lucky.html') {
    item = "lucky-checked-checkboxes";
    colour = "#FFDF7F";
  } else if (page == '/100.html') {
    item = "100-checked-checkboxes";
    colour = "#F5A65B";
  }

  if (localStorage.getItem('hideChecked') == null) {
    localStorage.setItem('hideChecked', "false");
  }

  if (localStorage.getItem(item) && $.parseJSON(localStorage.getItem(item)).length !== 0) {
    var arrCheckedCheckboxes = $.parseJSON(localStorage.getItem(item));
    $(arrCheckedCheckboxes.toString()).prop('checked', true);
    arrCheckedCheckboxes.forEach(function(obj) {
      var num = "cont";
      var n = obj.substr(1);
      num += n;
      document.getElementById(num).style.backgroundColor = colour;
      if (localStorage.getItem('hideChecked') == "false"){
        document.getElementById(num).parentElement.style.display = 'inline-grid';
      } else {
        $("#toggleChecked").html("Show");
        document.getElementById(num).parentElement.style.display = 'none';
      }
    })
    if (page == '/' || page == '/index.html' || page == '/index') {
      var checkedBoxes = document.querySelectorAll('input[name=dex]:checked');
      var width = Math.round(checkedBoxes.length / pokemonNum * 10000) / 100;
      document.getElementById("myBar").style.width = width + '%';
      document.getElementById("barLabel").innerHTML = "Pokedex Completion: " + width * 1  + '%' + " | " + checkedBoxes.length + " / " + pokemonNum;
    }

    $( ".section" ).each(function( index, obj ) {
      if($(obj).children(':visible').length < 2) {
        $(obj).children( ".sectionLabel" ).css( "display", "none" );
      }
    });
  }

  $("input:checkbox").change(function () {
    var arrCheckedCheckboxes = [];
    $.each($("input:checkbox:checked"), function () {
        arrCheckedCheckboxes.push("#" + $(this).attr('id'));
    });
    var num = "cont";
    num += $(this).attr('id');
    if (this.checked) {
      document.getElementById(num).style.backgroundColor = colour;
    }
    else {
      document.getElementById(num).style.backgroundColor = "#D3D3D3";
    }
    if (page == '/' || page == '/index.html' || page == '/index') {
      var checkedBoxes = document.querySelectorAll('input[name=dex]:checked');
      var width = Math.round(checkedBoxes.length / pokemonNum * 10000) / 100;
      document.getElementById("myBar").style.width = width + '%';
      document.getElementById("barLabel").innerHTML = "Pokedex Completion: " + width * 1  + '%' + " | " + checkedBoxes.length + " / " + pokemonNum;
    }
    localStorage.setItem(item, JSON.stringify(arrCheckedCheckboxes));
  });
});
$("#export").on("click", startExport);
$("#import").on("click", function() {
  if (screen.width<"601"){
    startImport(prompt("Please paste your save:", ""));
  }
  else{
    alert("To import data, simply paste the copied data!");
  }
 });
$("#toString").on("click", toString);
$("#toggleChecked").on("click", toggleChecked);
$(window).on("paste", function(e) {
  startImport(e.originalEvent.clipboardData.getData("text/plain"));
});

window.Clipboard = (function(window, document, navigator) {
  var textArea, copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range, selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function(text) {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };

  return {
    copy: copy
  };
})(window, document, navigator);

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

function menu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
    document.getElementById("line-break").style.display = "none";
  } else {
    x.style.display = "block";
    document.getElementById("line-break").style.display = "block";
  }
}

function toggleChecked(){
  var x = $("input:checkbox:checked").parent().parent();
  if(x.css("display") == "inline-grid") {
    x.css("display", "none");
    localStorage.setItem('hideChecked', true);
    hideLabels();
    $("#toggleChecked").html("Show");
  } else {
    x.css("display", "inline-grid");
    localStorage.setItem('hideChecked', false);
    showLabels();
    $("#toggleChecked").html("Hide");
  }
}

function hideLabels(){
  $( ".section" ).each(function( index, obj ) {
    if($(obj).children(':visible').length < 2) {
      $(obj).children( ".sectionLabel" ).css( "display", "none" );
    }
  });
}

function showLabels() {
  $( ".section" ).each(function( index, obj ) {
    $(obj).children( ".sectionLabel" ).css( "display", "block" );
  });
}

function startExport() {
  if ((localStorage.getItem(item) && $.parseJSON(localStorage.getItem(item)).length !== 0) ||
  (localStorage.getItem('lucky-checked-checkboxes') && $.parseJSON(localStorage.getItem('lucky-checked-checkboxes')).length !== 0 ) ||
  (localStorage.getItem('100-checked-checkboxes') && $.parseJSON(localStorage.getItem('100-checked-checkboxes')).length !== 0 )) {
    var encoded = btoa(JSON.stringify(localStorage));
    Clipboard.copy(encoded);
    alert("Copied to Clipboard!");
  } else {
    alert("Nothing to export!");
  }
}

function startImport(data) {
  try {
    Object.assign(localStorage,JSON.parse(atob(data)));
    if (localStorage.getItem(item) && $.parseJSON(localStorage.getItem(item)).length !== 0 ) {
      var checked = JSON.parse(localStorage.getItem(item));
      $(checked.toString()).prop('checked', true);
      checked.forEach(function(obj) {
        var num = "cont";
        var n = obj.substr(1);
        num += n;
        document.getElementById(num).style.backgroundColor = colour;
      })
    }
    alert("Import successful!");
    location.reload();
  } catch (Exception) {
    alert("Pasted invalid data!")
  }
}

var PokedexController = /** @class */ (function () {
  function PokedexController(pokedexService) {
    this.pokedexService = pokedexService;
  }
  PokedexController.prototype.print = function () {
    window.print();
  };
  return PokedexController;
}());

var PokedexService = /** @class */ (function () {
    function PokedexService() {
        this.shinies = [{ "id": "001", "name": "Bulbasaur" },
          { "id": "002", "name": "Ivysaur" },
          { "id": "003", "name": "Venusaur" },
          { "id": "004", "name": "Charmander" },
          { "id": "005", "name": "Charmeleon" },
          { "id": "006", "name": "Charizard" },
          { "id": "007", "name": "Squirtle" },
          { "id": "008", "name": "Wortortle" },
          { "id": "009", "name": "Blastoise" },
          { "id": "007-sunglasses", "name": "Summer Squirtle" },
          { "id": "008-sunglasses", "name": "Summer Wortortle" },
          { "id": "009-sunglasses", "name": "Summer Blastoise" },
          { "id": "025", "name": "Pikachu" },
          { "id": "026", "name": "Raichu" },
          { "id": "025-party", "name": "Party Pikachu" },
          { "id": "026-party", "name": "Party Raichu" },
          { "id": "025-fragment", "name": "Fragment Pikachu" },
          { "id": "026-fragment", "name": "Fragment Raichu" },
          { "id": "058", "name": "Growlithe" },
          { "id": "059", "name": "Arcanine" },
          { "id": "074", "name": "Geodude" },
          { "id": "075", "name": "Graveler" },
          { "id": "076", "name": "Golem" },
          { "id": "088", "name": "Grimer" },
          { "id": "089", "name": "Muk" },
          { "id": "090", "name": "Shellder" },
          { "id": "091", "name": "Cloister" },
          { "id": "096", "name": "Drowzee" },
          { "id": "097", "name": "Hypno" },
          { "id": "098", "name": "Krabby" },
          { "id": "099", "name": "Kingler" },
          { "id": "126", "name": "Magmar" },
          { "id": "129", "name": "Magicarp", },
          { "id": "130", "name": "Gyarados" },
          { "id": "133", "name": "Eevee" },
          { "id": "134", "name": "Vaporeon" },
          { "id": "135", "name": "Jolteon" },
          { "id": "136", "name": "Flareon" },
          { "id": "138", "name": "Omanyte" },
          { "id": "139", "name": "Omantar" },
          { "id": "140", "name": "Kabuto" },
          { "id": "141", "name": "Kabutops" },
          { "id": "142", "name": "Aerodactyl" },
          { "id": "144", "name": "Articuno" },
          { "id": "145", "name": "Zapdos" },
          { "id": "146", "name": "Moltres" },
          { "id": "147", "name": "Dratini" },
          { "id": "148", "name": "Dragonair" },
          { "id": "149", "name": "Dragonite" },
          { "id": "152", "name": "Chikorita" },
          { "id": "153", "name": "Bayleef" },
          { "id": "154", "name": "Meganium" },
          { "id": "172", "name": "Pichu" },
          { "id": "172-party", "name": "Party Pichu" },
          { "id": "175", "name": "Togepi" },
          { "id": "176", "name": "Togetic" },
          { "id": "177", "name": "Natu" },
          { "id": "178", "name": "Xatu" },
          { "id": "179", "name": "Mareep" },
          { "id": "180", "name": "Flaafy" },
          { "id": "181", "name": "Ampharos" },
          { "id": "191", "name": "Sunkern" },
          { "id": "192", "name": "Sunflora" },
          { "id": "196", "name": "Espeon" },
          { "id": "197", "name": "Umbreon" },
          { "id": "198", "name": "Murkrow" },
          { "id": "202", "name": "Wobbuffet" },
          { "id": "204", "name": "Pineco" },
          { "id": "205", "name": "Forretress" },
          { "id": "209", "name": "Snubbull" },
          { "id": "210", "name": "Granbull" },
          { "id": "228", "name": "Houndour" },
          { "id": "229", "name": "Houndoom" },
          { "id": "240", "name": "Magby" },
          { "id": "246", "name": "Larvitar" },
          { "id": "247", "name": "Pupitar" },
          { "id": "248", "name": "Tyranitar" },
          { "id": "249", "name": "Lugia" },
          { "id": "250", "name": "Ho-oh" },
          { "id": "261", "name": "Poochyena" },
          { "id": "278", "name": "Wingull" },
          { "id": "279", "name": "Pelipper" },
          { "id": "262", "name": "Mighyena" },
          { "id": "296", "name": "Makuhita" },
          { "id": "297", "name": "Hariyama" },
          { "id": "302", "name": "Sableye" },
          { "id": "303", "name": "Mawile" },
          { "id": "304", "name": "Aron" },
          { "id": "305", "name": "Lairon" },
          { "id": "306", "name": "Aggron" },
          { "id": "307", "name": "Meditite" },
          { "id": "308", "name": "Medicham" },
          { "id": "311", "name": "Plusle" },
          { "id": "312", "name": "Minun" },
          { "id": "315", "name": "Roselia" },
          { "id": "320", "name": "Wailmer" },
          { "id": "321", "name": "Waillord" },
          { "id": "333", "name": "Swablu" },
          { "id": "334", "name": "Altaria" },
          { "id": "353", "name": "Shuppet" },
          { "id": "354", "name": "Banette" },
          { "id": "355", "name": "Duskull" },
          { "id": "356", "name": "Dusclops" },
          { "id": "359", "name": "Absol" },
          { "id": "360", "name": "Wynaut" },
          { "id": "361", "name": "Snorunt" },
          { "id": "362", "name": "Glaile" },
          { "id": "370", "name": "Luvdisk" },
          { "id": "382", "name": "Kyogre" }];
        this.special = [{ "id": "172-santa", "name": "Santa Pichu" },
          { "id": "025-santa", "name": "Santa Pikachu" },
          { "id": "026-santa", "name": "Santa Raichu" },
          { "id": "172-party", "name": "Party Pichu" },
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
          { "id": "025-fragment", "name": "Fragment Pikachu" },
          { "id": "026-fragment", "name": "Fragment Raichu" },
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
        this.spinda = [{ "id": "327", "name": "#1" },
          { "id": "327-3", "name": "#3" },
          { "id": "327-8", "name": "#8" }];
        this.unowns = [{ "id": "201-a", "name": "A" },
          { "id": "201-b", "name": "B" },
          { "id": "201-c", "name": "C" },
          { "id": "201-d", "name": "D" },
          { "id": "201-e", "name": "E" },
          { "id": "201-f", "name": "F" },
          { "id": "201-g", "name": "G" },
          { "id": "201-h", "name": "H" },
          { "id": "201-i", "name": "I" },
          { "id": "201-j", "name": "J" },
          { "id": "201-k", "name": "K" },
          { "id": "201-l", "name": "L" },
          { "id": "201-m", "name": "M" },
          { "id": "201-n", "name": "N" },
          { "id": "201-o", "name": "O" },
          { "id": "201-p", "name": "P" },
          { "id": "201-q", "name": "Q" },
          { "id": "201-r", "name": "R" },
          { "id": "201-s", "name": "S" },
          { "id": "201-t", "name": "T" },
          { "id": "201-u", "name": "U" },
          { "id": "201-v", "name": "V" },
          { "id": "201-w", "name": "W" },
          { "id": "201-x", "name": "X" },
          { "id": "201-y", "name": "Y" },
          { "id": "201-z", "name": "Z" }];
        this.unavailable = [ { "id": "235", "name": "Smeargle" },
          { "id": "290", "name": "Nincada" },
          { "id": "291", "name": "Ninjask" },
          { "id": "292", "name": "Shedinja" },
          { "id": "352", "name": "Kecleon" },
          { "id": "366", "name": "Clamperl" },
          { "id": "367", "name": "Huntail" },
          { "id": "368", "name": "Gorebyss" },
          { "id": "385", "name": "Jirachi" }];
        this.gen1 = [{ "id": "001", "name": "Bulbasaur" },
          { "id": "002", "name": "Ivysaur" },
          { "id": "003", "name": "Venusaur" },
          { "id": "004", "name": "Charmander" },
          { "id": "005", "name": "Charmeleon" },
          { "id": "006", "name": "Charizard" },
          { "id": "007", "name": "Squirtle" },
          { "id": "008", "name": "Wartortle" },
          { "id": "009", "name": "Blastoise" },
          { "id": "010", "name": "Caterpie" },
          { "id": "011", "name": "Metapod" },
          { "id": "012", "name": "Butterfree" },
          { "id": "013", "name": "Weedle" },
          { "id": "014", "name": "Kakuna" },
          { "id": "015", "name": "Beedrill" },
          { "id": "016", "name": "Pidgey" },
          { "id": "017", "name": "Pidgeotto" },
          { "id": "018", "name": "Pidgeot" },
          { "id": "019", "name": "Rattata" },
          { "id": "020", "name": "Raticate" },
          { "id": "021", "name": "Spearow" },
          { "id": "022", "name": "Fearow" },
          { "id": "023", "name": "Ekans" },
          { "id": "024", "name": "Arbok" },
          { "id": "025", "name": "Pikachu" },
          { "id": "026", "name": "Raichu" },
          { "id": "027", "name": "Sandshrew" },
          { "id": "028", "name": "Sandslash" },
          { "id": "029", "name": "Nidoran" },
          { "id": "030", "name": "Nidorina" },
          { "id": "031", "name": "Nidoqueen" },
          { "id": "032", "name": "Nidoran" },
          { "id": "033", "name": "Nidorino" },
          { "id": "034", "name": "Nidoking" },
          { "id": "035", "name": "Clefairy" },
          { "id": "036", "name": "Clefable" },
          { "id": "037", "name": "Vulpix" },
          { "id": "038", "name": "Ninetales" },
          { "id": "039", "name": "Jigglypuff" },
          { "id": "040", "name": "Wigglytuff" },
          { "id": "041", "name": "Zubat" },
          { "id": "042", "name": "Golbat" },
          { "id": "043", "name": "Oddish" },
          { "id": "044", "name": "Gloom" },
          { "id": "045", "name": "Vileplume" },
          { "id": "046", "name": "Paras" },
          { "id": "047", "name": "Parasect" },
          { "id": "048", "name": "Venonat" },
          { "id": "049", "name": "Venomoth" },
          { "id": "050", "name": "Diglett" },
          { "id": "051", "name": "Dugtrio" },
          { "id": "052", "name": "Meowth" },
          { "id": "053", "name": "Persian" },
          { "id": "054", "name": "Psyduck" },
          { "id": "055", "name": "Golduck" },
          { "id": "056", "name": "Mankey" },
          { "id": "057", "name": "Primeape" },
          { "id": "058", "name": "Growlithe" },
          { "id": "059", "name": "Arcanine" },
          { "id": "060", "name": "Poliwag" },
          { "id": "061", "name": "Poliwhirl" },
          { "id": "062", "name": "Poliwrath" },
          { "id": "063", "name": "Abra" },
          { "id": "064", "name": "Kadabra" },
          { "id": "065", "name": "Alakazam" },
          { "id": "066", "name": "Machop" },
          { "id": "067", "name": "Machoke" },
          { "id": "068", "name": "Machamp" },
          { "id": "069", "name": "Bellsprout" },
          { "id": "070", "name": "Weepinbell" },
          { "id": "071", "name": "Victreebel" },
          { "id": "072", "name": "Tentacool" },
          { "id": "073", "name": "Tentacruel" },
          { "id": "074", "name": "Geodude" },
          { "id": "075", "name": "Graveler" },
          { "id": "076", "name": "Golem" },
          { "id": "077", "name": "Ponyta" },
          { "id": "078", "name": "Rapidash" },
          { "id": "079", "name": "Slowpoke" },
          { "id": "080", "name": "Slowbro" },
          { "id": "081", "name": "Magnemite" },
          { "id": "082", "name": "Magneton" },
          { "id": "083", "name": "Farfetch'd" },
          { "id": "084", "name": "Doduo" },
          { "id": "085", "name": "Dodrio" },
          { "id": "086", "name": "Seel" },
          { "id": "087", "name": "Dewgong" },
          { "id": "088", "name": "Grimer" },
          { "id": "089", "name": "Muk" },
          { "id": "090", "name": "Shellder" },
          { "id": "091", "name": "Cloyster" },
          { "id": "092", "name": "Gastly" },
          { "id": "093", "name": "Haunter" },
          { "id": "094", "name": "Gengar" },
          { "id": "095", "name": "Onix" },
          { "id": "096", "name": "Drowzee" },
          { "id": "097", "name": "Hypno" },
          { "id": "098", "name": "Krabby" },
          { "id": "099", "name": "Kingler" },
          { "id": "100", "name": "Voltorb" },
          { "id": "101", "name": "Electrode" },
          { "id": "102", "name": "Exeggcute" },
          { "id": "103", "name": "Exeggutor" },
          { "id": "104", "name": "Cubone" },
          { "id": "105", "name": "Marowak" },
          { "id": "106", "name": "Hitmonlee" },
          { "id": "107", "name": "Hitmonchan" },
          { "id": "108", "name": "Lickitung" },
          { "id": "109", "name": "Koffing" },
          { "id": "110", "name": "Weezing" },
          { "id": "111", "name": "Rhyhorn" },
          { "id": "112", "name": "Rhydon" },
          { "id": "113", "name": "Chansey" },
          { "id": "114", "name": "Tangela" },
          { "id": "115", "name": "Kangaskhan" },
          { "id": "116", "name": "Horsea" },
          { "id": "117", "name": "Seadra" },
          { "id": "118", "name": "Goldeen" },
          { "id": "119", "name": "Seaking" },
          { "id": "120", "name": "Staryu" },
          { "id": "121", "name": "Starmie" },
          { "id": "122", "name": "Mr. Mime" },
          { "id": "123", "name": "Scyther" },
          { "id": "124", "name": "Jynx" },
          { "id": "125", "name": "Electabuzz" },
          { "id": "126", "name": "Magmar" },
          { "id": "127", "name": "Pinsir" },
          { "id": "128", "name": "Tauros" },
          { "id": "129", "name": "Magikarp" },
          { "id": "130", "name": "Gyarados" },
          { "id": "131", "name": "Lapras" },
          { "id": "132", "name": "Ditto" },
          { "id": "133", "name": "Eevee" },
          { "id": "134", "name": "Vaporeon" },
          { "id": "135", "name": "Jolteon" },
          { "id": "136", "name": "Flareon" },
          { "id": "137", "name": "Porygon" },
          { "id": "138", "name": "Omanyte" },
          { "id": "139", "name": "Omastar" },
          { "id": "140", "name": "Kabuto" },
          { "id": "141", "name": "Kabutops" },
          { "id": "142", "name": "Aerodactyl" },
          { "id": "143", "name": "Snorlax" },
          { "id": "144", "name": "Articuno" },
          { "id": "145", "name": "Zapdos" },
          { "id": "146", "name": "Moltres" },
          { "id": "147", "name": "Dratini" },
          { "id": "148", "name": "Dragonair" },
          { "id": "149", "name": "Dragonite" },
          { "id": "150", "name": "Mewtwo" },
          { "id": "151", "name": "Mew" }];
        this.gen2 = [{ "id": "152", "name": "Chikorita" },
          { "id": "153", "name": "Bayleef" },
          { "id": "154", "name": "Meganium" },
          { "id": "155", "name": "Cyndaquil" },
          { "id": "156", "name": "Quilava" },
          { "id": "157", "name": "Typhlosion" },
          { "id": "158", "name": "Totodile" },
          { "id": "159", "name": "Croconaw" },
          { "id": "160", "name": "Feraligatr" },
          { "id": "161", "name": "Sentret" },
          { "id": "162", "name": "Furret" },
          { "id": "163", "name": "Hoothoot" },
          { "id": "164", "name": "Noctowl" },
          { "id": "165", "name": "Ledyba" },
          { "id": "166", "name": "Ledian" },
          { "id": "167", "name": "Spinarak" },
          { "id": "168", "name": "Ariados" },
          { "id": "169", "name": "Crobat" },
          { "id": "170", "name": "Chinchou" },
          { "id": "171", "name": "Lanturn" },
          { "id": "172", "name": "Pichu" },
          { "id": "173", "name": "Cleffa" },
          { "id": "174", "name": "Igglybuff" },
          { "id": "175", "name": "Togepi" },
          { "id": "176", "name": "Togetic" },
          { "id": "177", "name": "Natu" },
          { "id": "178", "name": "Xatu" },
          { "id": "179", "name": "Mareep" },
          { "id": "180", "name": "Flaaffy" },
          { "id": "181", "name": "Ampharos" },
          { "id": "182", "name": "Bellossom" },
          { "id": "183", "name": "Marill" },
          { "id": "184", "name": "Azumarill" },
          { "id": "185", "name": "Sudowoodo" },
          { "id": "186", "name": "Politoed" },
          { "id": "187", "name": "Hoppip" },
          { "id": "188", "name": "Skiploom" },
          { "id": "189", "name": "Jumpluff" },
          { "id": "190", "name": "Aipom" },
          { "id": "191", "name": "Sunkern" },
          { "id": "192", "name": "Sunflora" },
          { "id": "193", "name": "Yanma" },
          { "id": "194", "name": "Wooper" },
          { "id": "195", "name": "Quagsire" },
          { "id": "196", "name": "Espeon" },
          { "id": "197", "name": "Umbreon" },
          { "id": "198", "name": "Murkrow" },
          { "id": "199", "name": "Slowking" },
          { "id": "200", "name": "Misdreavus" },
          { "id": "201", "name": "Unown" },
          { "id": "202", "name": "Wobbuffet" },
          { "id": "203", "name": "Girafarig" },
          { "id": "204", "name": "Pineco" },
          { "id": "205", "name": "Forretress" },
          { "id": "206", "name": "Dunsparce" },
          { "id": "207", "name": "Gligar" },
          { "id": "208", "name": "Steelix" },
          { "id": "209", "name": "Snubbull" },
          { "id": "210", "name": "Granbull" },
          { "id": "211", "name": "Qwilfish" },
          { "id": "212", "name": "Scizor" },
          { "id": "213", "name": "Shuckle" },
          { "id": "214", "name": "Heracross" },
          { "id": "215", "name": "Sneasel" },
          { "id": "216", "name": "Teddiursa" },
          { "id": "217", "name": "Ursaring" },
          { "id": "218", "name": "Slugma" },
          { "id": "219", "name": "Magcargo" },
          { "id": "220", "name": "Swinub" },
          { "id": "221", "name": "Piloswine" },
          { "id": "222", "name": "Corsola" },
          { "id": "223", "name": "Remoraid" },
          { "id": "224", "name": "Octillery" },
          { "id": "225", "name": "Delibird" },
          { "id": "226", "name": "Mantine" },
          { "id": "227", "name": "Skarmory" },
          { "id": "228", "name": "Houndour" },
          { "id": "229", "name": "Houndoom" },
          { "id": "230", "name": "Kingdra" },
          { "id": "231", "name": "Phanpy" },
          { "id": "232", "name": "Donphan" },
          { "id": "233", "name": "Porygon2" },
          { "id": "234", "name": "Stantler" },
          { "id": "236", "name": "Tyrogue" },
          { "id": "237", "name": "Hitmontop" },
          { "id": "238", "name": "Smoochum" },
          { "id": "239", "name": "Elekid" },
          { "id": "240", "name": "Magby" },
          { "id": "241", "name": "Miltank" },
          { "id": "242", "name": "Blissey" },
          { "id": "243", "name": "Raikou" },
          { "id": "244", "name": "Entei" },
          { "id": "245", "name": "Suicune" },
          { "id": "246", "name": "Larvitar" },
          { "id": "247", "name": "Pupitar" },
          { "id": "248", "name": "Tyranitar" },
          { "id": "249", "name": "Lugia" },
          { "id": "250", "name": "Ho-Oh" },
          { "id": "251", "name": "Celebi" }];
        this.gen3 = [{ "id": "252", "name": "Treecko" },
          { "id": "253", "name": "Grovyle" },
          { "id": "254", "name": "Sceptile" },
          { "id": "255", "name": "Torchic" },
          { "id": "256", "name": "Combusken" },
          { "id": "257", "name": "Blaziken" },
          { "id": "258", "name": "Mudkip" },
          { "id": "259", "name": "Marshtomp" },
          { "id": "260", "name": "Swampert" },
          { "id": "261", "name": "Poochyena" },
          { "id": "262", "name": "Mightyena" },
          { "id": "263", "name": "Zigzagoon" },
          { "id": "264", "name": "Linoone" },
          { "id": "265", "name": "Wurmple" },
          { "id": "266", "name": "Silcoon" },
          { "id": "267", "name": "Beautifly" },
          { "id": "268", "name": "Cascoon" },
          { "id": "269", "name": "Dustox" },
          { "id": "270", "name": "Lotad" },
          { "id": "271", "name": "Lombre" },
          { "id": "272", "name": "Ludicolo" },
          { "id": "273", "name": "Seedot" },
          { "id": "274", "name": "Nuzleaf" },
          { "id": "275", "name": "Shiftry" },
          { "id": "276", "name": "Taillow" },
          { "id": "277", "name": "Swellow" },
          { "id": "278", "name": "Wingull" },
          { "id": "279", "name": "Pelipper" },
          { "id": "280", "name": "Ralts" },
          { "id": "281", "name": "Kirlia" },
          { "id": "282", "name": "Gardevoir" },
          { "id": "283", "name": "Surskit" },
          { "id": "284", "name": "Masquerain" },
          { "id": "285", "name": "Shroomish" },
          { "id": "286", "name": "Breloom" },
          { "id": "287", "name": "Slakoth" },
          { "id": "288", "name": "Vigoroth" },
          { "id": "289", "name": "Slaking" },
          { "id": "293", "name": "Whismur" },
          { "id": "294", "name": "Loudred" },
          { "id": "295", "name": "Exploud" },
          { "id": "296", "name": "Makuhita" },
          { "id": "297", "name": "Hariyama" },
          { "id": "298", "name": "Azurill" },
          { "id": "299", "name": "Nosepass" },
          { "id": "300", "name": "Skitty" },
          { "id": "301", "name": "Delcatty" },
          { "id": "302", "name": "Sableye" },
          { "id": "303", "name": "Mawile" },
          { "id": "304", "name": "Aron" },
          { "id": "305", "name": "Lairon" },
          { "id": "306", "name": "Aggron" },
          { "id": "307", "name": "Meditite" },
          { "id": "308", "name": "Medicham" },
          { "id": "309", "name": "Electrike" },
          { "id": "310", "name": "Manectric" },
          { "id": "311", "name": "Plusle" },
          { "id": "312", "name": "Minun" },
          { "id": "313", "name": "Volbeat" },
          { "id": "314", "name": "Illumise" },
          { "id": "315", "name": "Roselia" },
          { "id": "316", "name": "Gulpin" },
          { "id": "317", "name": "Swalot" },
          { "id": "318", "name": "Carvanha" },
          { "id": "319", "name": "Sharpedo" },
          { "id": "320", "name": "Wailmer" },
          { "id": "321", "name": "Wailord" },
          { "id": "322", "name": "Numel" },
          { "id": "323", "name": "Camerupt" },
          { "id": "324", "name": "Torkoal" },
          { "id": "325", "name": "Spoink" },
          { "id": "326", "name": "Grumpig" },
          { "id": "327", "name": "Spinda" },
          { "id": "328", "name": "Trapinch" },
          { "id": "329", "name": "Vibrava" },
          { "id": "330", "name": "Flygon" },
          { "id": "331", "name": "Cacnea" },
          { "id": "332", "name": "Cacturne" },
          { "id": "333", "name": "Swablu" },
          { "id": "334", "name": "Altaria" },
          { "id": "335", "name": "Zangoose" },
          { "id": "336", "name": "Seviper" },
          { "id": "337", "name": "Lunatone" },
          { "id": "338", "name": "Solrock" },
          { "id": "339", "name": "Barboach" },
          { "id": "340", "name": "Whiscash" },
          { "id": "341", "name": "Corphish" },
          { "id": "342", "name": "Crawdaunt" },
          { "id": "343", "name": "Baltoy" },
          { "id": "344", "name": "Claydol" },
          { "id": "345", "name": "Lileep" },
          { "id": "346", "name": "Cradily" },
          { "id": "347", "name": "Anorith" },
          { "id": "348", "name": "Armaldo" },
          { "id": "349", "name": "Feebas" },
          { "id": "350", "name": "Milotic" },
          { "id": "351", "name": "Castform" },
          { "id": "353", "name": "Shuppet" },
          { "id": "354", "name": "Banette" },
          { "id": "355", "name": "Duskull" },
          { "id": "356", "name": "Dusclops" },
          { "id": "357", "name": "Tropius" },
          { "id": "358", "name": "Chimecho" },
          { "id": "359", "name": "Absol" },
          { "id": "360", "name": "Wynaut" },
          { "id": "361", "name": "Snorunt" },
          { "id": "362", "name": "Glalie" },
          { "id": "363", "name": "Spheal" },
          { "id": "364", "name": "Sealeo" },
          { "id": "365", "name": "Walrein" },
          { "id": "369", "name": "Relicanth" },
          { "id": "370", "name": "Luvdisc" },
          { "id": "371", "name": "Bagon" },
          { "id": "372", "name": "Shelgon" },
          { "id": "373", "name": "Salamence" },
          { "id": "374", "name": "Beldum" },
          { "id": "375", "name": "Metang" },
          { "id": "376", "name": "Metagross" },
          { "id": "377", "name": "Regirock" },
          { "id": "378", "name": "Regice" },
          { "id": "379", "name": "Registeel" },
          { "id": "380", "name": "Latias" },
          { "id": "381", "name": "Latios" },
          { "id": "382", "name": "Kyogre" },
          { "id": "383", "name": "Groudon" },
          { "id": "384", "name": "Rayquaza" },
          { "id": "386", "name": "Deoxys" }];
    }
    return PokedexService;
}());
angular
    .module('app', ['angular.filter'])
    .controller('PokedexController', PokedexController)
    .service('pokedexService', PokedexService);
