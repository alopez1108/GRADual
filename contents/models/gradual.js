// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$(function() {
	console.log(sessionStorage);

	var url = window.location.href
    if(url.charAt(url.length-1)==='#') {
    	window.location.href = window.location.href.substring(0, url.length-2)
    }

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

	$("#notificationsButton").click(function(event) {
		if(event.currentTarget.childNodes[1].getAttribute("data-badge")!=null) {
			event.currentTarget.childNodes[1].removeAttribute("data-badge")
			event.currentTarget.childNodes[1].removeAttribute("style")
		}
	});

    var college_to_shorthand ={ 
	    "Harvard University" : "Harvard",
	    "Stanford University" : "Stanford",
	    "University of Chicago" : "UChicago",
	    "University of Pennsylvania" : "UPenn",
	    "Massachusetts Institute of Technology" : "MIT",
	    "Yale University" : "Yale",
	    "Columbia University" : "Columbia",
	    "Cornell University" : "Cornell",
	    "Duke University" : "Duke",
	    "University of Notre Dame" : "NotreDame",
	    "Georgetown University" : "Georgetown",
	    "University of Virginia" : "UVA",
	    "University of California - Berkeley" : "UCBerkeley",
	    "Rice University" : "Rice",
	    "Boston College" : "bostoncollege",
	};

	var common_name_to_shorthand ={ 
	    "Harvard" : "Harvard",
	    "Stanford" : "Stanford",
	    "UChicago" : "UChicago",
	    "UPenn" : "UPenn",
	    "MIT" : "MIT",
	    "Yale" : "Yale",
	    "Columbia" : "Columbia",
	    "Cornell" : "Cornell",
	    "Duke" : "Duke",
	    "Notre Dame" : "NotreDame",
	    "Georgetown" : "Georgetown",
	    "UVA" : "UVA",
	    "UC Berkeley" : "UCBerkeley",
	    "Rice" : "Rice",
	    "Boston College" : "bostoncollege",
	};

	var shorthand_to_common_name ={ 
	    "Harvard" : "Harvard",
	    "harvard" : "Harvard",
	    "Stanford" : "Stanford",
	    "stanford" : "Stanford",
	    "UChicago" : "UChicago",
	    "uchicago" : "UChicago",
	    "UPenn" : "UPenn",
	    "upenn" : "UPenn",
	    "MIT" : "MIT",
	    "mit" : "MIT",
	    "Yale" : "Yale",
	    "Columbia" : "Columbia",
	    "Cornell" : "Cornell",
	    "Duke" : "Duke",
	    "yale" : "Yale",
	    "columbia" : "Columbia",
	    "cornell" : "Cornell",
	    "duke" : "Duke",
	    "NotreDame": "Notre Dame",
	    "notredame": "Notre Dame",
	    "Georgetown" : "Georgetown",
	    "georgetown" : "Georgetown",
	    "UVA" : "UVA",
	    "uva" : "UVA",
	    "UCBerkeley" : "UC Berkeley",
	    "ucberkeley" : "UC Berkeley",
	    "Rice" : "Rice",
	    "rice" : "Rice",
	    "bostoncollege" : "Boston College",
	};
	
	MITevents = {events: [{title  : 'Interview', start  : '2016-07-19', editable : true, color : '#ff4d4d', school : "MIT"},
				{title  : 'Application Due', start  : '2016-05-17', editable : true, color : '#ff4d4d', school : "MIT"},
				{title  : 'Letters of Recommendation Due', start  : '2016-03-17', editable : true, color : '#ff4d4d', school : "MIT"},
				{title  : 'Admissions Results', start  : '2016-07-31', editable : true, color : '#ff4d4d', school : "MIT"}]};

	Stanfordevents = {events: [{title  : 'Interview', start  : '2016-04-01', editable : true, color : '#6666ff', school : "Stanford"},
				{title  : 'Application Due', start  : '2016-03-05', editable : true, color : '#6666ff', school : "Stanford"},
				{title  : 'Letters of Recommendation Due', start  : '2016-03-27', editable : true, color : '#6666ff', school : "Stanford"},
				{title  : 'Admissions Results', start  : '2016-07-27', editable : true, color : '#6666ff', school : "Stanford"}]};
    
    Harvardevents = {events: [{title  : 'Interview', start  : '2016-04-03', editable : true, color : '#ff80ff', school : "Harvard"},
				{title  : 'Application Due', start  : '2016-04-23', editable : true, color : '#ff80ff', school : "Harvard"},
				{title  : 'Letters of Recommendation Due', start  : '2016-04-12', editable : true, color : '#ff80ff', school : "Harvard"},
				{title  : 'Admissions Results', start  : '2016-05-31', editable : true, color : '#ff80ff', school : "Harvard"}]};

	Columbiaevents = {events: [{title  : 'Interview', start  : '2016-05-12', editable : true, color : '#ff8c1a', school : "Columbia"},
				{title  : 'Application Due', start  : '2016-05-17', editable : true, color : '#ff8c1a', school : "Columbia"},
				{title  : 'Letters of Recommendation Due', start  : '2016-04-22', editable : true, color : '#ff8c1a', school : "Columbia"},
				{title  : 'Admissions Results', start  : '2016-06-20', editable : true, color : '#ff8c1a', school : "Columbia"}]};

	Yaleevents = {events: [{title  : 'Interview', start  : '2016-03-01', editable : true, color : '#ffff33', school : "Yale"},
				{title  : 'Application Due', start  : '2016-04-04', editable : true, color : '#ffff33', school : "Yale"},
				{title  : 'Letters of Recommendation Due', start  : '2016-04-04', editable : true, color : '#ffff33', school : "Yale"},
				{title  : 'Admissions Results', start  : '2016-05-08', editable : true, color : '#ffff33', school : "Yale"}]};

	UCBerkeleyevents = {events: [{title  : 'Interview', start  : '2016-05-21', editable : true, color : '#80ff80', school : "UC Berkeley"},
				{title  : 'Application Due', start  : '2016-05-05', editable : true, color : '#80ff80', school : "UC Berkeley"},
				{title  : 'Letters of Recommendation Due', start  : '2016-04-30', editable : true, color : '#80ff80', school : "UC Berkeley"},
				{title  : 'Admissions Results', start  : '2016-06-13', editable : true, color : '#80ff80', school : "UC Berkeley"}]};
				
	Cornellevents = {events: [{title  : 'Interview', start  : '2016-07-02', editable : true, color : '#999999', school : "Cornell"},
				{title  : 'Application Due', start  : '2016-06-16', editable : true, color : '#999999', school : "Cornell"},
				{title  : 'Letters of Recommendation Due', start  : '2016-06-13', editable : true, color : '#999999', school : "Cornell"},
				{title  : 'Admissions Results', start  : '2016-08-11', editable : true, color : '#999999', school : "Cornell"}]};
				
	NotreDameevents = {events: [{title  : 'Interview', start  : '2016-05-17', editable : true, color : '#ff9f80', school : "Notre Dame"},
				{title  : 'Application Due', start  : '2016-05-18', editable : true, color : '#ff9f80', school : "Notre Dame"},
				{title  : 'Letters of Recommendation Due', start  : '2016-04-29', editable : true, color : '#ff9f80', school : "Notre Dame"},
				{title  : 'Admissions Results', start  : '2016-06-05', editable : true, color : '#ff9f80', school : "Notre Dame"}]};
				
	BCevents = {events: [{title  : 'Interview', start  : '2016-04-09', editable : true, color : '#cce0ff', school : "Boston College"},
				{title  : 'Application Due', start  : '2016-04-20', editable : true, color : '#cce0ff', school : "Boston College"},
				{title  : 'Letters of Recommendation Due', start  : '2016-05-01', editable : true, color : '#cce0ff', school : "Boston College"},
				{title  : 'Admissions Results', start  : '2016-07-26', editable : true, color : '#cce0ff', school : "Boston College"}]};
				
	Dukeevents = {events: [{title  : 'Interview', start  : '2016-02-28', editable : true, color : '#ffb3b3', school : "Duke"},
				{title  : 'Application Due', start  : '2016-03-04', editable : true, color : '#ffb3b3', school : "Duke"},
				{title  : 'Letters of Recommendation Due', start  : '2016-03-07', editable : true, color : '#ffb3b3', school : "Duke"},
				{title  : 'Admissions Results', start  : '2016-04-15', editable : true, color : '#ffb3b3', school : "Duke"}]};
				
	Georgetownevents = {events: [{title  : 'Interview', start  : '2016-03-16', editable : true, color : '#ffb366', school : "Georgetown"},
				{title  : 'Application Due', start  : '2016-03-17', editable : true, color : '#ffb366', school : "Georgetown"},
				{title  : 'Letters of Recommendation Due', start  : '2016-03-22', editable : true, color : '#ffb366', school : "Georgetown"},
				{title  : 'Admissions Results', start  : '2016-06-02', editable : true, color : '#ffb366', school : "Georgetown"}]};
				
	Riceevents = {events: [{title  : 'Interview', start  : '2016-08-17', editable : true, color : '#ffffb3', school : "Rice"},
				{title  : 'Application Due', start  : '2016-08-22', editable : true, color : '#ffffb3', school : "Rice"},
				{title  : 'Letters of Recommendation Due', start  : '2016-08-04', editable : true, color : '#ffffb3', school : "Rice"},
				{title  : 'Admissions Results', start  : '2016-09-19', editable : true, color : '#ffffb3', school : "Rice"}]};
				
	UChicagoevents = {events: [{title  : 'Interview', start  : '2016-01-12', editable : true, color : '#ccffcc', school : "UChicago"},
				{title  : 'Application Due', start  : '2016-03-30', editable : true, color : '#ccffcc', school : "UChicago"},
				{title  : 'Letters of Recommendation Due', start  : '2016-03-16', editable : true, color : '#ccffcc', school : "UChicago"},
				{title  : 'Admissions Results', start  : '2016-04-21', editable : true, color : '#ccffcc', school : "UChicago"}]};
				
	UVAevents = {events: [{title  : 'Interview', start  : '2016-02-07', editable : true, color : '#d9d9d9', school : "UVA"},
				{title  : 'Application Due', start  : '2016-02-13', editable : true, color : '#d9d9d9', school : "UVA"},
				{title  : 'Letters of Recommendation Due', start  : '2016-03-01', editable : true, color : '#d9d9d9', school : "UVA"},
				{title  : 'Admissions Results', start  : '2016-06-06', editable : true, color : '#d9d9d9', school : "UVA"}]};
				
	Pennevents = {events: [{title  : 'Interview', start  : '2016-07-15', editable : true, color : '#00ffff', school : "UPenn"},
				{title  : 'Application Due', start  : '2016-07-17', editable : true, color : '#00ffff', school : "UPenn"},
				{title  : 'Letters of Recommendation Due', start  : '2016-07-10', editable : true, color : '#00ffff', school : "UPenn"},
				{title  : 'Admissions Results', start  : '2016-08-20', editable : true, color : '#00ffff', school : "UPenn"}]};

	mitTasks = {};
	mitTasks["Essay 1"] = false;
	mitTasks["Essay 2"] = false;
	mitTasks["Recommendation 1"] = false;
	mitTasks["Recommendation 2"] = false;
	mitTasks["Send GRE Scores"] = false;

	stanfordTasks = {};
	stanfordTasks["Essay 1"] = false;
	stanfordTasks["Essay 2"] = false;
	stanfordTasks["Essay 3"] = false;
	stanfordTasks["Recommendation 1"] = false;
	stanfordTasks["Interview"] = false;
	stanfordTasks["Take MCAT Exam"] = false;

	harvardTasks = {};
	harvardTasks["Essay 1"] = false;
	harvardTasks["Essay 2"] = false;
	harvardTasks["Bribe Admissons Officer"] = false;
	harvardTasks["Recommendation 1"] = false;
	harvardTasks["Recommendation 2"] = false;
	harvardTasks["Eye Exam"] = false;
	harvardTasks["Phone Interview"] = false;

	columbiaTasks = {};
	columbiaTasks["Essay 1"] = false;
	columbiaTasks["Essay 2"] = false;
	columbiaTasks["Recommendation 1"] = false;
	columbiaTasks["Recommendation 2"] = false;
	columbiaTasks["Recommendation 3"] = false;
	columbiaTasks["Interview 1"] = false;
	columbiaTasks["Interview 2"] = false;

	yaleTasks = {};
	yaleTasks["Essay 1"] = false;
	yaleTasks["Recommendation 1"] = false;
	yaleTasks["Recommendation 2"] = false;
	yaleTasks["Submit Acting Reel"] = false;
	yaleTasks["Interview"] = false;
	yaleTasks["Take MCAT Exam"] = false;

	//Hard code in schools for prototype
	apps_dict["MIT"] = new Application("MIT", "September 1", "recruiter@mit.edu", "http://web.mit.edu/admissions/graduate/", "../images/MITpic.jpg", mitTasks, "1", MITevents);
	apps_dict["Stanford"] = new Application("Stanford", "September 2", "recruiter@standford.edu", "http://gradadmissions.stanford.edu/", "../images/Stanfordpic.jpg", stanfordTasks, "2", Stanfordevents);
	apps_dict["Harvard"] = new Application("Harvard", "September 1", "recruiter@college.harvard.edu", "http://www.gsas.harvard.edu/prospective_students/admissions_overview.php", "../images/Harvardpic.jpg", harvardTasks, "3", Harvardevents);
	apps_dict["Columbia"] = new Application("Columbia", "September 1", "recruiter@columbia.edu", "http://gsas.columbia.edu/", "../images/Columbiapic.jpg", columbiaTasks, "4", Columbiaevents);
	apps_dict["Yale"] = new Application("Yale", "September 1", "recruiter@yale.edu", "http://gsas.yale.edu/", "../images/Yalepic.jpg", yaleTasks, "5", Yaleevents);
	apps_dict["UCBerkeley"] = new Application("UC Berkeley", "September 1", "recruiter@berkeley.cal.edu", "http://grad.berkeley.edu/programs/list/", "../images/Berkeleypic.jpg", mitTasks, "6", UCBerkeleyevents);
	apps_dict["Cornell"] = new Application("Cornell", "September 3", "recruiter@cornell.edu", "http://gradschool.cornell.edu/", "../images/Cornellpic.jpg", stanfordTasks, "7", Cornellevents);
	apps_dict["NotreDame"] = new Application("Notre Dame", "September 2", "recruiter@nd.edu", "http://graduateschool.nd.edu/", "../images/NotreDamepic.jpg", harvardTasks, "8", NotreDameevents);
	apps_dict["bostoncollege"] = new Application("Boston College", "September 1", "recruiter@bc.edu", "http://www.bc.edu/schools/gsas/admissions.html", "../images/BostonCollegepic.jpg", columbiaTasks, "9", BCevents);
	apps_dict["Duke"] = new Application("Duke", "September 2", "recruiter@duke.edu", "https://gradschool.duke.edu/", "../images/Dukepic.jpg", yaleTasks, "10", Dukeevents);
	apps_dict["Georgetown"] = new Application("Georgetown", "September 1", "recruiter@georgetown.edu", "https://grad.georgetown.edu/admissions/programs", "../images/Georgetownpic.jpg", mitTasks, "11", Georgetownevents);
	apps_dict["Rice"] = new Application("Rice", "September 1", "recruiter@rice.edu", "https://graduate.rice.edu/", "../images/Ricepic.jpg", stanfordTasks, "12", Riceevents);
	apps_dict["UChicago"] = new Application("UChicago", "September 2", "recruiter@uchicago.edu", "http://grad.uchicago.edu/", "../images/UChicagopic.jpg", harvardTasks, "13", UChicagoevents);
	apps_dict["UVA"] = new Application("UVA", "September 3", "recruiter@virginia.edu", "http://gsas.virginia.edu/", "../images/UVApic.jpg", columbiaTasks, "14", UVAevents);
	apps_dict["UPenn"] = new Application("UPenn", "September 2", "recruiter@upenn.edu", "http://www.upenn.edu/programs/graduate", "../images/UPennpic.jpg", yaleTasks, "15", Pennevents);
	//////////////////////
	// Search Applications 

	// Search by school 
	var find_application_by_school = function(school_name){
		for (i = 0; i < sessionStorage.length; i++) {
			var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
			if (application.school ==  school_name){
				return application;
			}
		}
	}



	//////////////////////
	// Set up page

	var current_school; 
	console.log(apps_dict);
	var change_to_resources = function (){
		$('#buttons').replaceWith('<div id="buttons"><a href= ' + application.application_link + ' id="app-portal-button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Go to Application Portal</a><div id="recruiter-info"><h6>Recruiter X: (555) 555-5555 </h6><h6>Recruiter X: email@email.com</h6></div></div>')
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
		$('.page-content').replaceWith('<div class="page-content"><h3 id="school-name"></h3><div id="tasks"><table id="task-list" class="mdl-data-table mdl-js-data-table mdl-data-table--selectable"></table><table id="done-list" class="mdl-data-table mdl-js-data-table"></table></div><div id="buttons"></div><div id="documents"></div></div>');
		$('#school-name').text(current_school);
		console.log(school);
		var application = find_application_by_school(current_school);
		var replace_tasks = '';
		var done_tasks = '';
		var i = 0;
		var finished_tasks = 0;
		for (var key in application.tasks) {
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
		$('#task-list').replaceWith('<table id="task-list" class="mdl-data-table"><tbody>' + replace_tasks + '</tbody></table>'
		);
		if (finished_tasks == 0){
			//make table invisible
			$('#done-list').hide();
		}
		else {
			$('#done-list').show();
			$('#done-list').replaceWith('<table id="done-list" class="mdl-data-table mdl-js-data-table"><tbody>' + done_tasks + '</tbody></table>');
		}
		change_to_resources();
		componentHandler.upgradeAllRegistered();
		$('#documents').replaceWith('<div id="documents"><h5 id="documents-label">Documents</h5><div id="essays-form"><form id="docs-form"><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input" type="text" id="sample1"><label class="mdl-textfield__label" for="sample1">Essay title</label></div><div class="mdl-textfield mdl-js-textfield"><textarea class="mdl-textfield__input" type="text" rows= "3" id="sample5"></textarea><label class="mdl-textfield__label" for="sample5">Write your essay here...</label></div></form><button name="data" id="save-button" type="button" class="mdl-button mdl-js-button mdl-button--raised">Save</button></div><div id="essays"></div></div>')
	}

	var replace_side_bar =''; 
	for (i = 0; i < sessionStorage.length; i++) {
		var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
		replace_side_bar = replace_side_bar + '<a class="mdl-navigation__link" id=' + application.school + '>' + application.school + '</a>';
	}

	$('#side-drawers').replaceWith('<nav id="side-drawers" class="mdl-navigation">' + replace_side_bar + '</nav>');

	$('.mdl-navigation__link').click(function(e){
		schoolName = e.currentTarget.innerHTML;
		console.log(schoolName);
		// change_to_school_page(current_school);
		location.href = "./headWithSideBar.html?="+common_name_to_shorthand[schoolName]
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
		console.log(escuela);
		change_to_school_page(shorthand_to_common_name[escuela]);
	}

	var create_school_card = function(application){
		var card_string = '';
		schoolName = application.school.toLowerCase().replace(/\s/g, '')
		card_string = card_string + "<div class='application_card'>";
		card_string = card_string + "<a href='./headWithSideBar.html?=" + schoolName +  "''>";
		card_string = card_string + "<div class='demo-card-square mdl-card mdl-shadow--2dp'>";
		card_string = card_string + "<div class='mdl-card__title mdl-card--expand'>";
		card_string = card_string + "<img class='background' src=" + application.image + " width='320' height='289' left='0' z-index='0'>";
		card_string = card_string + "<h2 class='mdl-card__title-text'>" + application.school + "</h2></div>";
		card_string = card_string + "<div class='mdl-card__actions mdl-card--border'>";
		card_string = card_string + "<div id=" + schoolName + "Progress" + " class='mdl-progress mdl-js-progress'></div></div>";
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

	if (on_school_page == true){
	    var checkboxes = document.getElementById('task-list').querySelector('tbody').querySelectorAll('.mdl-checkbox__input');
	  	for (var i = 0; i < checkboxes.length; i++) {
	  		var task_name = checkboxes[i].parentNode.parentNode.parentNode.querySelector('#task-name').textContent;
    		var div_task = checkboxes[i];
	    	checkboxes[i].addEventListener('change', function(event){
	    		var curr_app = find_application_by_school(current_school);
	    		curr_app.tasks[event.target.parentNode.parentNode.parentNode.childNodes[1].textContent] = true;
	    		apps_dict[current_school] = curr_app;
	    		console.log(current_school);
	    		console.log(apps_dict[current_school]);
	    		sessionStorage.setItem(current_school, JSON.stringify(apps_dict[current_school]));
	    		location.reload();
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

    if (on_school_page == true) {

    	var title_input = false;
    	var essay_input = false; 

    	document.getElementById('sample1').addEventListener('change', function(){
			if ($('#sample1').textContent == ''){
				title_input = false;
				$("#save-button").prop("disabled", true);
			}
			else {
				title_input = true;
				if (essay_input){
					$("#save-button").prop("disabled", false);
				}
				else {
					$("#save-button").prop("disabled", true);
				}
			}
		});

		document.getElementById('sample5').addEventListener('change', function(){
			if ($('#sample5').textContent == ''){
				essay_input = false;
				$("#save-button").prop("disabled", true);
			}
			else {
				essay_input = true;
				if (title_input) {
					$("#save-button").prop("disabled", false);
				}
				else {
					$("#save-button").prop("disabled", true);
				}
			}
		});

		$("#save-button").prop("disabled", true);

		document.getElementById('save-button').addEventListener('click', function(){
			console.log("fskdjflkjdfad");
			console.log($('#sample1').val());
			console.log($('#sample5').val());
			var title = $('#sample1').val();
			var essay = $('#sample5').val();
			$(':input','#docs-form')
			  .not(':button, :submit, :reset, :hidden')
			  .val('')
			  .removeAttr('checked')
			  .removeAttr('selected');
			$("#save-button").prop("disabled", true);
			$('#essays').replaceWith('<div id="essays"><a id="essay-title">' + title + '</a></div>')
		});
	}


	dialog.querySelector('.close').addEventListener('click', function() {
	    $('#search_field')[0].reset(); //clear text
	    dialog.close();
    });

    dialog.querySelector('.add').addEventListener('click',function() {
	    // add university to homepage
	    var text_input = $('#search_applications').val();
	    console.log(text_input);
	    // check if it is in the array of colleges
	    console.log(sessionStorage.getItem(college_to_shorthand[text_input]));
	    if (jQuery.inArray(text_input, colleges) !== -1 && sessionStorage.getItem(college_to_shorthand[text_input])==null) {
	    	app_string = college_to_shorthand[text_input]
	    	console.log(app_string);
	    	console.log("HEREWEGO");
	    	console.log(JSON.stringify(apps_dict[app_string]));
	    	sessionStorage.setItem(shorthand_to_common_name[app_string], JSON.stringify(apps_dict[app_string]));
	    	console.table(sessionStorage);
	        $('#search_field')[0].reset(); //clear text
	        dialog.close();
	        $('#homepage-table').replaceWith(create_homepage_table());
	        add_progress_bars();
	        window['counter'] = 0;
			var snackbarContainer = document.querySelector('#applicationAddedNotice');
			var data = {
				message: shorthand_to_common_name[app_string] +' Application Added!',
			};
          	snackbarContainer.MaterialSnackbar.showSnackbar(data);
	    } else if(sessionStorage.getItem(college_to_shorthand[text_input])!=null) {
	    	window['counter'] = 0;
			var snackbarContainer = document.querySelector('#addFailNotice');
			var data = {
				message: "Application already exists.",
			};
          	snackbarContainer.MaterialSnackbar.showSnackbar(data);
	    }
	    else {
	    	window['counter'] = 0;
			var snackbarContainer = document.querySelector('#addFailNotice');
			var data = {
				message: "Not a valid school.   Please try again.",
			};
          	snackbarContainer.MaterialSnackbar.showSnackbar(data);
	    }
    });


    var colleges = [
	    "Harvard University",
	    "Stanford University",
	    "University of Chicago",
	    "University of Pennsylvania",
	    "Massachusetts Institute of Technology",
	    "Yale University",
	    "Columbia University",
	    "Cornell University",
	    "Duke University",
	    "University of Notre Dame",
	    "Georgetown University",
	    "University of Virginia",
	    "University of California - Berkeley",
	    "Rice University",
	    "Boston College",
    ];

    $( "#search_applications" ).autocomplete({
    	source: colleges,
    // 	select: function (event, ui) {
		  //   $("#addApp").focus();
		  //   return false;
		  // }
    });

    $( "#search_applications" ).autocomplete("option", "appendTo", "#dialog");  

    var add_progress_bars = function(){
	    for (i = 0; i < sessionStorage.length; i ++ ){
	    	// console.log("sessionStorage HAS LENGTH LONGER THAN ONE");
	    	var application = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
	    	var name = common_name_to_shorthand[application.school].toLowerCase() + "Progress";
	    	// console.log(application);
			componentHandler.upgradeAllRegistered();
			// console.log(application.percent_complete);
			var num_completed = 0; 
			var num_total = 0; 
			for (var key in application.tasks) {
				if (application.tasks[key] == true) {
					num_completed += 1; 
				}
				num_total += 1; 
			}
			console.log(name);
			document.querySelector("#" + name).MaterialProgress.setProgress((num_completed/num_total) * 100);
	    }
    }


	add_progress_bars();

});