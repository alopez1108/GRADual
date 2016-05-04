// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$(function() {

	var apps_dict = {};

	var on_homepage; 
	var on_school_page;
	var on_login;
	if($("#loginButton").length==1) {
		on_login = true;
	} else {
		on_login = false;
	}
	if(on_login) {
		var ctx = document.getElementById("canvas").getContext("2d");
		ctx.canvas.height = window.innerHeight;
		ctx.canvas.width = window.innerWidth;
		ctx.fillStyle = "#B60611";
		ctx.fillRect(0, window.innerHeight/6, window.innerWidth, window.innerHeight*2/3);

		$("#loginButton").click(function() {
			if($("#username").val()=="GhostEmoji" && $("#password").val()=="password") {
				on_login=false;
				window.location.href = "./homepage.html";
			}
			else {
				$("#username").val("");
				$("#password").val("");
				window['counter'] = 0;
				var snackbarContainer = document.querySelector('#wrongLoginWarning');
	            var showToastButton = document.querySelector('#loginButton');
				var data = {
					message: 'Invalid Username/Password',
				};
	          	snackbarContainer.MaterialSnackbar.showSnackbar(data);
			}
		});
	}

	$("#logout").click(function() {
		window.location.replace("./login.html");
	});

    var college_to_shorthand ={ 
	    "Harvard University" : "Harvard",
	    "Stanford University" : "Stanford",
	    "University of Chicago (Booth)" : "UChicago",
	    "University of Pennsylvania (Wharton)" : "Penn",
	    "Massachusetts Institute of Technology (Sloan)" : "MIT",
	    "Yale University" : "Yale",
	    "Columbia University" : "Columbia",
	    "Cornell University (Johnson)" : "Cornell",
	    "Duke University" : "Duke",
	    "University of Notre Dame" : "NotreDame",
	    "Georgetown University" : "Georgetown",
	    "University of Virginia" : "UVA",
	    "University of California - Berkeley" : "UCBerkeley",
	    "Rice University (Jones)" : "Rice",
	    "Boston College" : "BC",
	};

	//Hard code in schools for prototype
	apps_dict["MIT"] = new Application("MIT", "September 1", "recruiter@mit.edu", "http://web.mit.edu/admissions/graduate/", "../images/MITpic.jpg");
	apps_dict["Stanford"] = new Application("Stanford", "September 2", "recruiter@standford.edu", "http://gradadmissions.stanford.edu/", "../images/Stanfordpic.jpg");
	apps_dict["Harvard"] = new Application("Harvard", "September 1", "recruiter@college.harvard.edu", "http://www.gsas.harvard.edu/prospective_students/admissions_overview.php", "../images/Harvardpic.jpg");
	apps_dict["Columbia"] = new Application("Columbia", "September 1", "recruiter@columbia.edu", "http://gsas.columbia.edu/", "../images/Columbiapic.jpg");
	apps_dict["Yale"] = new Application("Yale", "September 1", "recruiter@yale.edu", "http://gsas.yale.edu/", "../images/Yalepic.jpg");
	apps_dict["UCBerkeley"] = new Application("UC Berkeley", "September 1", "recruiter@berkeley.cal.edu", "http://grad.berkeley.edu/programs/list/", "../images/Berkeleypic.jpg");
	apps_dict["Cornell"] = new Application("Cornell", "September 3", "recruiter@cornell.edu", "http://gradschool.cornell.edu/", "../images/Cornellpic.jpg");
	apps_dict["NotreDame"] = new Application("Notre Dame", "September 2", "recruiter@nd.edu", "http://graduateschool.nd.edu/", "../images/NotreDamepic.jpg");
	apps_dict["BC"] = new Application("Boston College", "September 1", "recruiter@bc.edu", "http://www.bc.edu/schools/gsas/admissions.html", "../images/BostonCollegepic.jpg");
	apps_dict["Duke"] = new Application("Duke", "September 2", "recruiter@duke.edu", "https://gradschool.duke.edu/", "../images/Dukepic.jpg");
	apps_dict["Georgetown"] = new Application("Georgetown", "September 1", "recruiter@georgetown.edu", "https://grad.georgetown.edu/admissions/programs", "../images/Georgetownpic.jpg");
	apps_dict["Rice"] = new Application("Rice", "September 1", "recruiter@rice.edu", "https://graduate.rice.edu/", "../images/Ricepic.jpg");
	apps_dict["UChicago"] = new Application("UChicago", "September 2", "recruiter@uchicago.edu", "http://grad.uchicago.edu/", "../images/UChicagopic.jpg");
	apps_dict["UVA"] = new Application("UVA", "September 3", "recruiter@virginia.edu", "http://gsas.virginia.edu/", "../images/UVApic.jpg");
	apps_dict["Penn"] = new Application("UPenn", "September 2", "recruiter@upenn.edu", "http://www.upenn.edu/programs/graduate", "../images/UPennpic.jpg");
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
		$('#buttons').replaceWith('<div id="buttons"><a href= ' + application.application_link + '><button id="app-portal-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Go to Application Portal</button></a><div id="recruiter-info"><div>Recruiter X: (555) 555-5555 </div><div>Recruiter X: email@email.com</div></div></div>')
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
		$('.page-content').replaceWith('<div class="page-content"><h3 id="school-name"></h3><div><div id="tasks"><table id="task-list" class="mdl-data-table mdl-js-data-table mdl-data-table--selectable"></table><table id="done-list" class="mdl-data-table mdl-js-data-table"></table></div><div id="buttons"></div></div><div id="documents">HI BITCHES</div></div>');
		$('#school-name').text(current_school);
		var application = find_application_by_school(current_school);
		var replace_tasks = '';
		var done_tasks = '';
		var i = 0;
		var finished_tasks = 0;
		for (var key in application.tasks) {
			console.log(application.tasks[key]);
			if (application.tasks[key] == true){
				done_tasks = done_tasks + '<tr><td id="task-name-done" class="mdl-data-table__cell--non-numeric">' + key + '</td></tr>';
				i = i + 1; 
				finished_tasks = finished_tasks += 1; 
			}
			else {
				replace_tasks = replace_tasks + '<tr><td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="row[' + i + ']"><input type="checkbox" id="row[' + i + ']" class="mdl-checkbox__input" /></label?</td><td id="task-name" class="mdl-data-table__cell--non-numeric">' + key + '</td></tr>';
				i = i + 1; 
			}
		}
		$('#task-list').replaceWith('<table id="task-list" class="mdl-data-table mdl-shadow--2dp"><tbody>' + replace_tasks + '</tbody></table>'
		);
		if (finished_tasks == 0){
			//make table invisible
			// $('#done-list').hide();
		}
		else {
			console.log("hello");
			// $('#done-list').show();
			$('#done-list').replaceWith('<table id="done-list" class="mdl-data-table mdl-js-data-table"><tbody>' + done_tasks + '</tbody></table>');
			console.log(done_tasks);
			console.log($('#done-list'));
		}
		change_to_resources();
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
	});

	$('.mdl-layout__content').on('click', '#phone-numbers', function(){
		change_to_phone_numbers();
	});

	$('.mdl-layout__content').on('click', '#emails', function(){
		change_to_emails();
	});

	if(!on_login) {
		document.getElementById("homeButton").addEventListener("click", function() {
			on_school_page = undefined;
		});

		document.getElementById("calendarButton").addEventListener("click", function() {
			on_school_page = undefined;
		});
	}

	var url = window.location.href;
	if(url.indexOf('?')!=-1) {
		var escuela = url.substring(url.indexOf('?')+2);
		change_to_school_page(escuela);
	}

	var create_school_card = function(application){
		var card_string = '';
		card_string = card_string + "<div class='application_card'>";
		card_string = card_string + "<a href='./headWithSideBar.html?=" + application.school +  "''>";
		card_string = card_string + "<div class='demo-card-square mdl-card mdl-shadow--2dp'>";
		card_string = card_string + "<div class='mdl-card__title mdl-card--expand'>";
		card_string = card_string + "<img class='background' src=" + application.image + " width='320' height='289' left='0' z-index='0'>";
		card_string = card_string + "<h2 class='mdl-card__title-text'>" + application.school + "</h2></div>";
		card_string = card_string + "<div class='mdl-card__actions mdl-card--border'>";
		card_string = card_string + "<div id=" + application.school.toLowerCase() + "Progress" + " class='mdl-progress mdl-js-progress'></div></div>";
		card_string = card_string + "</div></a></div>";
		return card_string;
	}

	var create_add_new_card = function(){
		card_string = '';
		card_string = card_string + "<div class='application_card'><div id='newCard' class='demo-card-square mdl-card mdl-shadow--2dp'>";
		card_string = card_string + "<div class='mdl-card__title mdl-card--expand'><i id='addAppIcon' style='color:#B60611' class='material-icons'>add</i>";
		card_string = card_string + "<h2 id='newText' class='mdl-card__title-text' style='align:center'>Add New Application</h2>";
		card_string = card_string + "</div></div>";
		return card_string;	
	}
	
	var create_new_school_row = function(application){
		var row_string = '';
		row_string = row_string + "<tr><td ";
		row_string = row_string + "id='" + application.school.toLowerCase() + "row'" + " class='mdl-data-table__cell--non-numeric'";
		row_string = row_string + " style='height:80px; font-family: 'Quattrocento', serif; font-weight: bold;'>";
		row_string = row_string + application.school + "</td></tr>";
		console.log(row_string);
		return row_string;
	}

	var create_school_list = function(){
		var table_string = "<table id='school-list'";
		table_string = table_string + " class='mdl-data-table mdl-js-data-table mdl-data-table--selectable'>"
		table_string = table_string + "<thead style='background-color:#eee;'>"
		table_string = table_string + "<tr> <th class='mdl-data-table__cell--non-numeric' style='height:80px; text-align:left; font-family: 'Quattrocento', serif; font-weight: bold;'>All Schools</th></tr></thead>"
		table_string = table_string + "<tbody style='background-color:#eee;'>"
		for (i = 0; i < sessionStorage.length; i++){
			var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
			table_string = table_string + create_new_school_row(application);
		}
		table_string = table_string + "</tbody></table>";
		console.log(table_string);
		return table_string;
	}
	
	var create_homepage_table = function(){
		var table_string = "<div id='homepage-table'>";
		for (i = 0; i < sessionStorage.length + 1; i++){
			var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
			if (i === sessionStorage.length){
				table_string = table_string + create_add_new_card();
			}
			else {
				table_string = table_string + create_school_card(application);
			}
		}
		table_string = table_string + "</div>";
		return table_string;
	}

	$('#homepage-table').replaceWith(create_homepage_table());
	$('#school-list').replaceWith(create_school_list());

	if (on_school_page == true){
	    var checkboxes = document.getElementById('task-list').querySelector('tbody').querySelectorAll('.mdl-checkbox__input');
	    console.log("HELLLLOOO");
	    console.table(checkboxes);
	    console.log("GOODBYE");
	  	for (var i = 0; i < checkboxes.length; i++) {
	  		var task_name = checkboxes[i].parentNode.parentNode.parentNode.querySelector('#task-name').textContent;
    		var div_task = checkboxes[i];
	    	checkboxes[i].addEventListener('change', function(){
	    		console.log("clicked!");
	    		var curr_app = find_application_by_school(current_school);
	    		curr_app.tasks[div_task.parentNode.parentNode.parentNode.querySelector('#task-name').textContent] = true;
	    		apps_dict[current_school] = curr_app;
	    		sessionStorage.setItem(current_school, JSON.stringify(apps_dict[current_school]));
	    	});
	  	}
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
	    dialog.close();
    });

    dialog.querySelector('.add').addEventListener('click',function() {
	    // add university to homepage
	    var text_input = $('#search_applications').val();
	    // check if it is in the array of colleges
	    if (jQuery.inArray(text_input, colleges) !== -1) {
	    	app_string = college_to_shorthand[text_input]
	    	sessionStorage.setItem(app_string, JSON.stringify(apps_dict[app_string]));
	        $('#search_field')[0].reset(); //clear text
	        dialog.close();
	        $('#homepage-table').replaceWith(create_homepage_table());
	        add_progress_bars();
	        window['counter'] = 0;
			var snackbarContainer = document.querySelector('#applicationAddedNotice');
			var data = {
				message: app_string +' Application Added!',
			};
          	snackbarContainer.MaterialSnackbar.showSnackbar(data);
	    }
    });


    var colleges = [
	    "Harvard University",
	    "Stanford University",
	    "University of Chicago (Booth)",
	    "University of Pennsylvania (Wharton)",
	    "Massachusetts Institute of Technology (Sloan)",
	    "Yale University",
	    "Columbia University",
	    "Cornell University (Johnson)",
	    "Duke University",
	    "University of Notre Dame",
	    "Georgetown University",
	    "University of Virginia",
	    "University of California - Berkeley",
	    "Rice University (Jones)",
	    "Boston College",
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
			console.log(application.percent_complete);
			var num_completed = 0; 
			var num_total = 0; 
			for (var key in application.tasks) {
				if (application.tasks[key] == true) {
					num_completed += 1; 
				}
				num_total += 1; 
			}
			document.querySelector("#" + name).MaterialProgress.setProgress((num_completed/num_total) * 100);
	    }
    }


	add_progress_bars();

});