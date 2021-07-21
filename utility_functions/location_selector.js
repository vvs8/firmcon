var stateObject = {
    "Canada": {
        "Alberta": ["Banff", "Brooks", "Calgary", "Edmonton", "Fort McMurray", "Grande Prairie", "Jasper", "Lake Louise", "Lethbridge", "Medicine Hat", "Red Deer", "Saint Albert"],
        "British Columbia": ["Barkerville", "Burnaby", "Campbell River", "Chilliwack", "Courtenay", "Cranbrook", "Dawson Creek", "Delta", "Esquimalt", "Fort Saint James", "Fort Saint John", "Hope", "Kamloops", "Kelowna", "Kimberley", "Kitimat", "Langley", "Nanaimo", "Nelson", "New Westminster", "North Vancouver", "Oak Bay", "Penticton", "Powell River", "Prince George", "Prince Rupert", "Quesnel", "Revelstoke", "Rossland", "Trail", "Vancouver", "Vernon", "Victoria", "West Vancouver", "White Rock"],
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
        districtSel.length = 1; // remove all options bar first
        
        for (var state in stateObject[this.value]) {
            stateSel.options[stateSel.options.length] = new Option(state, state);
        }
    }
    countySel.onchange(); // reset in case page is reloaded
    
    var cities;
    stateSel.onchange = function () {
        districtSel.length = 1; // remove all options bar first
        
        var district = stateObject[countySel.value][this.value];
        for (var i = 0; i < district.length; i++) {
            districtSel.options[districtSel.options.length] = new Option(district[i], district[i]);
        }
        cities = district;
        
        autocomplete(document.getElementById("myInput"), cities);
    }

    console.log(cities);

    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
            } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
            } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
            }
        });
        function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
        }
        function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
        }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    }

    
    

    

}