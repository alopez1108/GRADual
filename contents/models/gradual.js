// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

	var applications = new Array();

	//Hard code in schools for prototype
	applications.push(new Application("MIT", "September 1", "recruiter@mit.edu"));
	applications.push(new Application("Stanford", "September 2", "recruiter@standford.edu"));
	applications.push(new Application("Harvard", "September 1", "recruiter@college.harvard.edu"));



	//////////////////////
	// Search Applications 

	// Search by school 
	var find_application_by_school = function(school_name){
		for (i = 0; i < applications.length; i++) {
			var application = applications[i];
			if (application.school ==  school_name){
				return application;
			}
		}
	}



	//////////////////////
	// Set up page

	var replace_side_bar =''; 
	for (i = 0; i < applications.length; i++) {
		var application = applications[i];
		replace_side_bar = replace_side_bar + '<a class="mdl-navigation__link" id=' + application.school + '>' + application.school + '</a>';
	}

	$('#side-drawers').replaceWith('<nav id="side-drawers" class="mdl-navigation">' + replace_side_bar + '</nav>');

	$('.mdl-navigation__link').click(function(e){
		$('#school-name').text($(this).context.id);
		var application = find_application_by_school($(this).context.id);
		var replace_tasks = '';
		for (i=0; i < application.tasks.length; i++) {
			var task = application.tasks[i];
			replace_tasks = replace_tasks + '<tr><td id="task-name" class="mdl-data-table__cell--non-numeric">' + task.description + '</td></tr>';
		}
		$('#task-list').replaceWith('<table id="task-list" class="mdl-data-table mdl-js-data-table mdl-data-table--selectable"><thead><tr><th class="mdl-data-table__cell--non-numeric">Tasks</th></tr></thead><tbody>' + replace_tasks + '</tbody></table');
		componentHandler.upgradeElement($('#task-list'));
	});

});