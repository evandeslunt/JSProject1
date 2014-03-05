
$(document).ready(function(){
	changeTab();
	$("#conjugateBtn").click(function(){
		conjugate();
	});
});


/**
 * Displays the tab that was clicked and hides the others. Also sets the first tab to
 * be visible when page is loaded.
 */
function changeTab(){
	'use strict';
	$(".tabNavigation a").click(function(){
		$(".tab").hide(); //hides only divs that are of the .tab class
		$(this.hash).show();
		return false;
	}).filter(":first").click(); // this simulates a click on the first link
}

/**
 * Conjugates the given verb and displays the results.
 */
function conjugate(){
	'use strict';
	//remove any feedback and hide results from last time the conjugate button was clicked
	$(".feedback").remove();
	$("#results").hide();
	
	var verb = $("#word").val().toLowerCase();
	var stem = verb.slice(0, -2); //remove the infinitive suffix
	var suffix = verb.slice(-2); //get the suffix
	var showVos = $("#showVos").is(":checked");
	var conjugatedVerbs = [];
	
	if(!validateParams(verb, stem, suffix)){
		return; //stop processing rules
	}
	
	var AR_SUFFIXES = ["o", "as", "a", "&aacute;s", "amos", "an"];
	var ER_SUFFIXES = ["o", "es", "e", "&eacute;s", "emos", "en"];
	var IR_SUFFIXES = ["o", "es", "e", "&iacute;s", "imos", "en"];
		
	//populate the grid
	
	if (suffix == "ar"){
		conjugatedVerbs = addSuffixes(AR_SUFFIXES, stem);
	} else if (suffix == "er"){
		conjugatedVerbs = addSuffixes(ER_SUFFIXES, stem);
	} else if (suffix == "ir"){
		conjugatedVerbs = addSuffixes(IR_SUFFIXES, stem);
	} else {
		// We shouldn't get here, but if we do we got bad input that escaped the validator.
		// Show the error message and return.
		$("#conjform").before("<div class='feedback'>You must enter a regular infinitive verb!<div>");
		return;
	}
	
	populateGrid(verb, conjugatedVerbs, showVos);
	
	//display the grid
	$("#results").css("display", "block");
};

/**
 * Validates the word, stem, and suffix to make sure they are the right format for a 
 * regular verb. (Of course, it doesn't guarantee the input is a regular verb -- just
 * screens out ones that obviously are not.)
 */
function validateParams(verb, stem, suffix){
	if(verb == undefined || verb == null || verb.length == 0){
		//just return; don't do anything
		return false;
	} else if(stem.length == 0 || ( suffix != "ar" && suffix != "er" && suffix != "ir" )){
		$("#conjform").before("<div class='feedback'>You must enter a regular infinitive verb!<div>");
		return false;
	}
	return true;
	
}

/**
 * Adds the given suffixes to the verb stem that is supplied. 
 * Returns an array of conjugated verbs.
 */
function addSuffixes(suffixList, stem){
	'use strict';
	var conjugatedVerbs = [];
	for(var i = 0; i < suffixList.length; i++){
		conjugatedVerbs[i] = stem + suffixList[i];
	}
	return conjugatedVerbs;
};


/**
 * Populates the results grid with the conjugated verbs in the conjugatedVerbs array
 * passed as input. This function assumes that the conjugatedVerbs array contains the 
 * following information in this order:
 * conjugatedVerbs[0] = yo conjugation
 * conjugatedVerbs[1] = tu " "
 * conjugatedVerbs[2] = el " "
 * conjugatedVerbs[3] = vos " "
 * conjugatedVerbs[4] = nosotros " "
 * conjugatedVerbs[5] = ellos " "
 *
 * Additionally, this function will show/hide vosotros based on the showVos input, and 
 * will display the infinitive verb at the top of the table.
 */
function populateGrid(verb, conjugatedVerbs, showVos){
	'use strict';
	
	$("#verbname").html(verb.toUpperCase());
	
	$("#yo").html(conjugatedVerbs[0]);
	$("#tu").html(conjugatedVerbs[1]);
	$("#el").html(conjugatedVerbs[2]);
	if(showVos){
		$("#vos").html(conjugatedVerbs[3]);
	} else {
		$("#vos").html("");
	}
	$("#nos").html(conjugatedVerbs[4]);
	$("#ellos").html(conjugatedVerbs[5]);	
};
