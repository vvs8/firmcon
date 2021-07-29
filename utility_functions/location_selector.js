var stateObject = {
    "Canada": {
        "Alberta": ["Banff", "Brooks", "Calgary", "Edmonton", "Fort McMurray", "Grande Prairie", "Jasper", "Lake Louise", "Lethbridge", "Medicine Hat", "Red Deer", "Saint Albert"],
        "British Columbia": ["Barkerville", "Burnaby", "Campbell River", "Chilliwack", "Courtenay", "Cranbrook", "Dawson Creek", "Delta", "Esquimalt", "Fort Saint James", "Fort Saint John", "Hope", "Kamloops", "Kelowna", "Kimberley", "Kitimat", "Langley", "Nanaimo", "Nelson", "New Westminster", "North Vancouver", "Oak Bay", "Penticton", "Powell River", "Prince George", "Prince Rupert", "Quesnel", "Revelstoke", "Rossland", "Surrey", "Trail", "Vancouver", "Vernon", "Victoria", "West Vancouver", "White Rock"],
        "Manitoba": ["Brandon", "Churchill", "Dauphin", "Flin Flon", "Kildonan", "Saint Boniface", "Swan River", "Thompson", "Winnipeg", "York Factory"],
        "New Brunswick": ["Bathurst", "Caraquet", "Dalhousie", "Fredericton", "Miramichi", "Moncton", "Saint John"],
        "Newfoundland and Labrador": ["Argentia", "Bonavista", "Channel-Port aux Basques", "Corner Brook", "Ferryland", "Gander", "Grand Falls–Windsor", "Happy Valley–Goose Bay", "Harbour Grace", "Labrador City", "Placentia", "Saint Anthony", "St. John’s", "Wabana"],
        "Northwest Territories": ["Fort Smith", "Hay River", "Inuvik", "Tuktoyaktuk", "Yellowknife"],
        "Nova Scotia": ["Baddeck", "Digby", "Glace Bay", "Halifax", "Liverpool", "Louisbourg", "Lunenburg", "Pictou", "Port Hawkesbury", "Springhill", "Sydney", "Yarmouth"],
        "Nunavut": ["Iqaluit"],
        "Ontario": ["Bancroft", "Barrie", "Belleville", "Brampton", "Brantford", "Brockville", "Burlington", "Cambridge", "Chatham", "Chatham-Kent", "Cornwall", "Elliot Lake", "Etobicoke", "Fort Erie", "Fort Frances", "Gananoque", "Guelph", "Hamilton", "Iroquois Falls", "Kapuskasing", "Kawartha Lakes", "Kenora", "Kingston", "Kirkland Lake", "Kitchener", "Laurentian Hills", "London", "Midland", "Mississauga", "Moose Factory", "Moosonee", "Niagara Falls", "Niagara-on-the-Lake", "North Bay", "North York", "Oakville", "Orillia", "Oshawa", "Ottawa", "Parry Sound", "Perth", "Peterborough", "Picton", "Port Colborne", "Saint Catharines", "Saint Thomas", "Sarnia-Clearwater", "Sault Sainte Marie", "Scarborough", "Simcoe", "Stratford", "Sudbury", "Temiskaming Shores", "Thorold", "Thunder Bay", "Timmins", "Toronto", "Trenton", "Waterloo", "Welland", "West Nipissing", "Windsor", "Woodstock", "York"],
        "Prince Edward Island": ["Borden", "Cavendish", "Charlottetown", "Souris", "Summerside"],
        "Quebec": ["Asbestos", "Baie-Comeau", "Beloeil", "Cap-de-la-Madeleine", "Chambly", "Charlesbourg", "Châteauguay", "Chibougamau", "Côte-Saint-Luc", "Dorval", "Gaspé", "Gatineau", "Granby", "Havre-Saint-Pierre", "Hull", "Jonquière", "Kuujjuaq", "La Salle", "La Tuque", "Lachine", "Laval", "Lévis", "Longueuil", "Magog", "Matane", "Montreal", "Montréal-Nord", "Percé", "Port-Cartier", "Quebec", "Rimouski", "Rouyn-Noranda", "Saguenay", "Saint-Eustache", "Saint-Hubert", "Sainte-Anne-de-Beaupré", "Sainte-Foy", "Sainte-Thérèse", "Sept-Îles", "Sherbrooke", "Sorel-Tracy", "Trois-Rivières", "Val-d’Or", "Waskaganish"],
        "Saskatchewan": ["Batoche", "Cumberland House", "Estevan", "Flin Flon", "Moose Jaw", "Prince Albert", "Regina", "Saskatoon", "Uranium City"],
        "Yukon Territory": ["Dawson", "Watson Lake", "Whitehorse"]
    }
}


window.onload = function () {
    var countySel = document.getElementById("countySel"),
    stateSel = document.getElementById("stateSel"),
    districtSel = document.getElementById("districtSel");
    for (var country in stateObject) {
        countySel.options[countySel.options.length] = new Option(country, country);
    }
    countySel.onchange = function () {
        stateSel.length = 1; // remove all options bar first
        //districtSel.length = 1; // remove all options bar first
        
        for (var state in stateObject[this.value]) {
            stateSel.options[stateSel.options.length] = new Option(state, state);
        }
    }
    countySel.onchange(); // reset in case page is reloaded
    
    var cities;
    stateSel.onchange = function () {
        //districtSel.length = 1; // remove all options bar first
        
        var district = stateObject[countySel.value][this.value];
        
        cities = district;
        
        autocomplete(document.getElementById("myInput"), cities);
    }

    function autocomplete(inp, arr) {
        var currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        b.addEventListener("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                        a.appendChild(b);
                }
            }
        });

        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } 
            else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } 
            else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    
}