// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$(function() {

	var apps_dict = {};

	var on_homepage; 
	var on_school_page;

    var college_to_shorthand ={ 
	    "Harvard University" : "Harvard",
	    "Stanford University" : "Stanford",
	    "University of Chicago (Booth)" : "UChicago",
	    "University of Pennsylvania (Wharton)" : "Penn",
	    "Massachusetts Institute of Technology (Sloan)" : "MIT",
	    "Northwestern University (Kellogg)" : "Northwestern",
	    "Yale University" : "Yale",
	    "Columbia University" : "Columbia",
	    "Cornell University (Johnson)" : "Cornell",
	    "New York University" : "NYU",
	    "Duke University" : "Duke",
	    "Vanderbilt University" : "Vanderbilt",
	    "Johns Hopkins University" : "Johns Hopkins",
	    "Washington University in St. Louis" : "WashU",
	    "University of Michigan - Ann Arbor" : "UMich",
	    "Emory University" : "Emory",
	    "University of North Carolina - Chapel Hill" : "UNC",
	    "University of Notre Dame" : "NotreDame",
	    "Boston University" : "BU",
	    "University of Texas - Austin" : "UT",
	    "Georgetown University" : "Georgetown",
	    "University of Virginia" : "UVA",
	    "University of California - Berkeley" : "Berkeley",
	    "Dartmouth College (Tuck)" : "Dartmouth",
	    "Carnegie Mellon University (Tepper)" : "CMU",
	    "Rice University (Jones)" : "Rice",
	    "Boston College" : "BC",
	    "University of California - Davis" : "Davis",
	    "University of Georgia" : "UGA",
	    "University of Rochester" : "Rochester",
	    "Ohio State University" : "Ohio State",
	    "Brown University (Alpert)" : "Brown",
	    "University of Maryland" : "UMD",
	    "University of Utah" : "Utah",
	    "Tufts University" : "Tufts",
	    "University of Wisconsin - Madison" : "Wisconsin",
	};

	console.log(college_to_shorthand);

	//Hard code in schools for prototype
	apps_dict["MIT"] = new Application("MIT", "September 1", "recruiter@mit.edu", "http://web.mit.edu/admissions/graduate/", "../images/MITpic.jpg");
	apps_dict["Stanford"] = new Application("Stanford", "September 2", "recruiter@standford.edu", "http://gradadmissions.stanford.edu/", "../images/Stanfordpic.jpg");
	apps_dict["Harvard"] = new Application("Harvard", "September 1", "recruiter@college.harvard.edu", "http://www.gsas.harvard.edu/prospective_students/admissions_overview.php", "../images/Harvardpic.jpg");
	apps_dict["Columbia"] = new Application("Columbia", "September 1", "recruiter@columbia.edu", "http://gsas.columbia.edu/", "../images/Columbiapic.jpg");
	apps_dict["Yale"] = new Application("Yale", "September 1", "recruiter@yale.edy", "http://gsas.yale.edu/", "../images/Yalepic.jpg");
	apps_dict["Berkeley"] = new Application("Berkeley", "September 1", "recruiter@berkeley.cal.edu", "http://grad.berkeley.edu/programs/list/", "../images/Berkeleypic.jpg");

	//////////////////////
	// Search Applications 

	// Search by school 
	var find_application_by_school = function(school_name){
		for (i = 0; i < sessionStorage.length; i++) {
			var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
			if (application.school =  school_name){
				return application;
			}
		}
	}



	//////////////////////
	// Set up page

	var current_school; 

	var change_to_resources = function (){
		$('#navigation').replaceWith('<div id="navigation"><a id="school_name_link">' + current_school + '</a>   >   Resources </div>');
		var application = find_application_by_school(current_school);
		$('#resources-content').replaceWith('<div id="resources-content"><ul class="demo-list-item mdl-list"><li class="mdl-list__item"><a href= ' + application.application_link + ' class="mdl-list__item-primary-content">Link to Application Portal</a></li><li class="mdl-list__item"><a id="phone-numbers" class="mdl-list__item-primary-content">Important Phone Numbers</a></li><li class="mdl-list__item"><a id="emails" class="mdl-list__item-primary-content">Important Emails</a></li></ul></div>')
	}

	var change_to_documents = function(){
		$('#navigation').replaceWith('<div id="navigation"><a id="school_name_link">' + current_school + '</a>   >   Documents </div>');
	}

	var change_to_phone_numbers= function(){
		$('#navigation').replaceWith('<div id="navigation"><a id="school_name_link">' + current_school + '</a>   >   <a id="resources-link"> Resources</a>    >>>>>   Phone Numbers</div>');
		$('#resources-content').replaceWith('<div id="resources-content"><ul class="demo-list-item mdl-list"><li class="mdl-list__item"><a class="mdl-list__item-primary-content">Recruiter: (+1) 555 - 555 - 5555</a></li></ul></div>');
	}

	var change_to_emails= function(){
		$('#navigation').replaceWith('<div id="navigation"><a id="school_name_link">' + current_school + '</a>   >   <a id="resources-link"> Resources</a>    >>>>>   Emails</div>');
		var application = find_application_by_school(current_school);
		$('#resources-content').replaceWith('<div id="resources-content"><ul class="demo-list-item mdl-list"><li class="mdl-list__item"><a class="mdl-list__item-primary-content">Recruiter: ' + application.recruiter + '</a></li></ul></div>')
	}

	var change_to_school_page = function(school){
		current_school = school;
		on_school_page = true;
		$('.page-content').replaceWith('<div class="page-content"><h3 id="school-name"></h3><div id="tasks"><table id="task-list" class="mdl-data-table mdl-js-data-table mdl-data-table--selectable"></table></div><div id="buttons"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">+ Add Task</button><div id="buttons-container"><button id="resources-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Resources</button><button id="documents-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Documents</button><div></div></div>');
		$('#school-name').text(current_school);
		var application = find_application_by_school(current_school);
		var replace_tasks = '';
		var i = 0;
		for (var key in application.tasks) {
			if (application.tasks[key]){
				replace_tasks = replace_tasks + '<tr class="is-selected"><td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="row[' + i + ']"><input type="checkbox" id="row[' + i + ']" class="mdl-checkbox__input" /></label?</td><td id="task-name" class="mdl-data-table__cell--non-numeric">' + key + '</td></tr>';
				i = i + 1; 
			}
			else {
				replace_tasks = replace_tasks + '<tr><td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="row[' + i + ']"><input type="checkbox" id="row[' + i + ']" class="mdl-checkbox__input" /></label?</td><td id="task-name" class="mdl-data-table__cell--non-numeric">' + key + '</td></tr>';
				i = i + 1; 
			}
		}
		$('#task-list').replaceWith('<table id="task-list" class="mdl-data-table mdl-shadow--2dp"><tbody>' + replace_tasks + '</tbody></table>'
		);
		componentHandler.upgradeAllRegistered();
	}

	var replace_side_bar =''; 
	for (i = 0; i < sessionStorage.length; i++) {
		var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
		replace_side_bar = replace_side_bar + '<a class="mdl-navigation__link" id=' + application.school + '>' + application.school + '</a>';
	}

	$('#side-drawers').replaceWith('<nav id="side-drawers" class="mdl-navigation">' + replace_side_bar + '</nav>');

	$('.mdl-navigation__link').click(function(e){
		// current_school = $(this).context.id;
		// change_to_school_page(current_school);
		location.href = "./headWithSideBar.html?="+$(this).context.id
	});

	$('.mdl-layout__content').on('click', '#resources-button', function(){
		$('.page-content').replaceWith('<div class="page-content"><div id="navigation"></div><div id="resources-content"></div>');
		change_to_resources();
	});


	$('.mdl-layout__content').on('click', '#documents-button', function(){
		$('.page-content').replaceWith('<div class="page-content"><div id="navigation"></div><div id="documents-content"></div>');
		change_to_documents();
	});

	$('.mdl-layout__content').on('click', '#school_name_link', function(){
		change_to_school_page(current_school);
	});

	$('.mdl-layout__content').on('click', '#resources-link', function(){
		change_to_resources();
		console.log("RESOURCES LINK!");
	});

	$('.mdl-layout__content').on('click', '#phone-numbers', function(){
		change_to_phone_numbers();
	});

	$('.mdl-layout__content').on('click', '#emails', function(){
		change_to_emails();
	});

	document.getElementById("homeButton").addEventListener("click", function() {
		console.log("Go to Home Page");
		on_school_page = undefined;
	});

	document.getElementById("calendarButton").addEventListener("click", function() {
		console.log("Go to Calendar Page")
		on_school_page = undefined;
	});

	var url = window.location.href;
	if(url.indexOf('?')!=-1) {
		var escuela = url.substring(url.indexOf('?')+2);
		change_to_school_page(escuela);
	}

	var create_school_card = function(application){
		var card_string = '';
		card_string = card_string + "<td>";
		card_string = card_string + "<a href='./headWithSideBar.html?=" + application.school +  "''>";
		card_string = card_string + "<div class='demo-card-square mdl-card mdl-shadow--2dp'>";
		card_string = card_string + "<div class='mdl-card__title mdl-card--expand'>";
		card_string = card_string + "<img class='background' src=" + application.image + " width='320' height='289' left='0' z-index='0'>";
		card_string = card_string + "<h2 class='mdl-card__title-text'>" + application.school + "</h2></div>";
		card_string = card_string + "<div class='mdl-card__actions mdl-card--border'>";
		card_string = card_string + "<div id=" + application.school.toLowerCase() + "Progress" + " class='mdl-progress mdl-js-progress'></div></div>";
		card_string = card_string + "</div></a></td>";
		return card_string;
	}

	var create_add_new_card = function(){
		card_string = '';
		card_string = card_string + "<td><div id='newCard' class='demo-card-square mdl-card mdl-shadow--2dp'>";
		card_string = card_string + "<div class='mdl-card__title mdl-card--expand'><i id='addAppIcon' style='color:#B60611' class='material-icons'>add</i>";
		card_string = card_string + "<h2 id='newText' class='mdl-card__title-text' style='align:center'>Add New Application</h2>";
		card_string = card_string + "</div></td>";
		return card_string;
	}

	var create_homepage_table = function(){
		var table_string = "<table id='homepage-table'>";
		for (i = 0; i < sessionStorage.length + 1; i++){
			var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
			if (i % 4 === 0){
				if (i === sessionStorage.length){
					table_string = table_string + "<tr>" + create_add_new_card();
				}
				else {
					table_string = table_string + "<tr>" + create_school_card(application);
				}
			}
			else if (i % 4 === 3){
				if (i === sessionStorage.length){
					table_string = table_string + create_add_new_card() + "</tr>";
				}
				else {
					table_string = table_string + create_school_card(application) + "</tr>";
				}
			}
			else {
				if (i === sessionStorage.length){
					table_string = table_string + create_add_new_card();
				}
				else {
					table_string = table_string + create_school_card(application);
				}
			}
		}
		table_string = table_string + "</table>";
		return table_string;
	}

	$('#homepage-table').replaceWith(create_homepage_table());

	if (on_school_page == true){
	    var checkboxes = document.getElementById('task-list').querySelector('tbody').querySelectorAll('.mdl-checkbox__input');
	  	for (var i = 0; i < checkboxes.length; i++) {
	  		var task_name = checkboxes[i].parentNode.parentNode.parentNode.querySelector('#task-name').textContent;
	    	checkboxes[i].addEventListener('change', function(){
	    		console.log("clicked!");
	    		find_application_by_school(current_school).tasks[checkboxes[i].parentNode.parentNode.parentNode.querySelector('#task-name').textContent] = true;
	    		console.log(find_application_by_school(current_school));

	    	});
	  	}
	  	console.log(checkboxes);
  	}


	$(document.body).on('click', '#newCard', function() {
	    var dialog = document.querySelector('dialog');
	    if (! dialog) {
	        dialogPolyfill.registerDialog(dialog);
	    }
	    dialog.showModal();
    });



	dialog.querySelector('.close').addEventListener('click', function() {
	    $('#search_field')[0].reset(); //clear text
	    console.log("close");
	    dialog.close();
    });

    dialog.querySelector('.add').addEventListener('click',function() {
	    // add university to homepage
	    var text_input = $('#search_applications').val();
	    // check if it is in the array of colleges
	    if (jQuery.inArray(text_input, colleges) !== -1) {
	    	var app_string = text_input.split(" ")[0];
	    	if (app_string == "Massachusetts"){
	    		app_string = "MIT";
	    	}
	    	sessionStorage.setItem(app_string, JSON.stringify(apps_dict[app_string]));
	        $('#search_field')[0].reset(); //clear text
	        dialog.close();
	        $('#homepage-table').replaceWith(create_homepage_table());
	        add_progress_bars();
	    }
    });


    var colleges = [
	    "Harvard University",
	    "Stanford University",
	    "University of Chicago (Booth)",
	    "University of Pennsylvania (Wharton)",
	    "Massachusetts Institute of Technology (Sloan)",
	    "Northwestern University (Kellogg)",
	    "Yale University",
	    "Columbia University",
	    "Cornell University (Johnson)",
	    "New York University",
	    "Duke University",
	    "Vanderbilt University",
	    "Johns Hopkins University",
	    "Washington University in St. Louis",
	    "University of Michigan - Ann Arbor",
	    "University of North Carolina - Chapel Hill",
	    "University of Notre Dame",
	    "Boston University",
	    "University of Texas - Austin",
	    "Georgetown University",
	    "University of Virginia",
	    "University of California - Berkeley",
	    "Dartmouth College (Tuck)",
	    "Carnegie Mellon University (Tepper)",
	    "Rice University (Jones)",
	    "Vanderbilt University (Owen)",
	    "Georgetown University (McDonough)",
	    "Washington University in St. Louis (Olin)",
	    "New York University (Stern)",
	    "Boston College",
	    "University of California - Davis",
	    "Brown University (Alpert)",
	    "University of Maryland",
	    "University of Utah",
	    "Tufts University",
    ];

    $( "#search_applications" ).autocomplete({
    	source: colleges
    });

    $( "#search_applications" ).autocomplete("option", "appendTo", "#dialog");  

    var add_progress_bars = function(){
	    for (i = 0; i < sessionStorage.length; i ++ ){
	    	console.log("sessionStorage HAS LENGTH LONGER THAN ONE");
	    	var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
	    	var name = application.school.toLowerCase() + "Progress";
	    	console.log(application);
			componentHandler.upgradeAllRegistered();
			document.querySelector("#" + name).MaterialProgress.setProgress(application.percent_complete);
	    }
    }


	add_progress_bars();


});