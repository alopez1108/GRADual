// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

	var applications = new Array();

	//Hard code in schools for prototype
	applications.push(new Application("MIT", "September 1", "recruiter@mit.edu", "http://web.mit.edu/admissions/graduate/"));
	applications.push(new Application("Stanford", "September 2", "recruiter@standford.edu", "http://gradadmissions.stanford.edu/"));
	applications.push(new Application("Harvard", "September 1", "recruiter@college.harvard.edu", "http://www.gsas.harvard.edu/prospective_students/admissions_overview.php"));



	//////////////////////
	// Search Applications 

	// Search by school 
	var find_application_by_school = function(school_name){
		for (i = 0; i < applications.length; i++) {
			var application = applications[i];
			if (application.school =  school_name){
				return application;
			}
		}
	}



	//////////////////////
	// Set up page

	var current_school; 

	var change_to_resources = function (){
		$('#navigation').replaceWith('<div id="navigation"><a id="school_name_link">' + current_school + '</a>   >>>>>   Resources </div>');
		var application = find_application_by_school(current_school);
		$('#resources-content').replaceWith('<div id="resources-content"><ul class="demo-list-item mdl-list"><li class="mdl-list__item"><a href= ' + application.application_link + ' class="mdl-list__item-primary-content">Link to Application Portal</a></li><li class="mdl-list__item"><a id="phone-numbers" class="mdl-list__item-primary-content">Important Phone Numbers</a></li><li class="mdl-list__item"><a id="emails" class="mdl-list__item-primary-content">Important Emails</a></li></ul></div>')
	}

	var change_to_documents = function(){
		$('#navigation').replaceWith('<div id="navigation"><a id="school_name_link">' + current_school + '</a>   >>>>>   Resources </div>');
	}

	var change_to_phone_numbers= function(){
		$('#navigation').replaceWith('<div id="navigation"><a id="school_name_link">' + current_school + '</a>   >>>>>   <a id="resources-link"> Resources</a>    >>>>>   Phone Numbers</div>');
		$('#resources-content').replaceWith('<div id="resources-content"><ul class="demo-list-item mdl-list"><li class="mdl-list__item"><a class="mdl-list__item-primary-content">Recruiter: (+1) 555 - 555 - 5555</a></li></ul></div>');
	}

	var change_to_emails= function(){
		$('#navigation').replaceWith('<div id="navigation"><a id="school_name_link">' + current_school + '</a>   >>>>>   <a id="resources-link"> Resources</a>    >>>>>   Emails</div>');
		var application = find_application_by_school(current_school);
		$('#resources-content').replaceWith('<div id="resources-content"><ul class="demo-list-item mdl-list"><li class="mdl-list__item"><a class="mdl-list__item-primary-content">Recruiter: ' + application.recruiter + '</a></li></ul></div>')
	}

	var change_to_school_page = function(school){
		current_school = school;
		$('.page-content').replaceWith('<div class="page-content"><h3 id="school-name"></h3><div id="tasks"><table id="task-list" class="mdl-data-table mdl-js-data-table mdl-data-table--selectable"></table></div><div id="buttons"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">+ Add Task</button><div id="buttons-container"><button id="resources-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Resources</button><button id="documents-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Documents</button><div></div></div>');
		$('#school-name').text(current_school);
		var application = find_application_by_school(current_school);
		var replace_tasks = '';
		for (i=0; i < application.tasks.length; i++) {
			var task = application.tasks[i];
			replace_tasks = replace_tasks + '<tr><td id="task-name" class="mdl-data-table__cell--non-numeric">' + task.description + '</td></tr>';
		}
		$('#task-list').replaceWith('<table id="task-list" class="mdl-data-table mdl-js-data-table mdl-data-table--selectable"><thead><tr><th class="mdl-data-table__cell--non-numeric">Tasks</th></tr></thead><tbody>' + replace_tasks + '</tbody></table'
		);
		componentHandler.upgradeAllRegistered();
	}

	var replace_side_bar =''; 
	for (i = 0; i < applications.length; i++) {
		var application = applications[i];
		replace_side_bar = replace_side_bar + '<a class="mdl-navigation__link" id=' + application.school + '>' + application.school + '</a>';
	}

	$('#side-drawers').replaceWith('<nav id="side-drawers" class="mdl-navigation">' + replace_side_bar + '</nav>');

	$('.mdl-navigation__link').click(function(e){
		current_school = $(this).context.id;
		change_to_school_page(current_school);
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

	var url = window.location.href;
	if(url.indexOf('?')!=-1) {
		var escuela = url.substring(url.indexOf('?')+2);
		change_to_school_page(escuela);
	}

});