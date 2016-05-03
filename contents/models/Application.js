/**
 * Application represents an application started by the user. 
 */
 
var Application = function(school, due_date, recruiter, link, image_souce) {
    ////////////////////////////////////////////////
    // Representation
    //
    this.school = school;
    this.recruiter = recruiter; 
    this.documents = new Array();
    this.tasks = {};
    this.due_date = due_date; 
    this.application_link = link;
    this.image = image_souce;

    // status can either be "open", "applied", "pending", "accepted", "waitlisted", or "rejected"
    this.status = "Open";


	////////////////////////////////////////////////
	// Public methods
	//

	this.changeStatus = function(status_update){			
		if (["open","applied","pending", "accepted", "waitlisted", "rejected"].indexOf(status_update) > -1) {
			this.status = status_update;
		}
	}

	this.addTask = function(task_description){
		this.tasks[task_description] = false;
	}

	this.addDocument = function(file){
		this.documents.push(file);
	}


	////////////////////////////////////////////////
	// Auto populating tasks into school 
	//

	this.addTask("Essay 1");
	this.addTask("Essay 2");
	this.addTask("Recommendation 1");
	this.addTask("Recommendation 2");
	this.addTask("Send GRE scores");

	var completed = 0;

	// for(i = 0; i < this.tasks.length; i ++){
	// 	var task = this.tasks[i];
	// 	if (task.complete){
	// 		completed = completed + 1;
	// 	}
	// }
	for (var key in this.tasks){
		var val = this.tasks[key];
		if (val) {
			completed += 1; 
		}
	}
	this.percent_complete = (completed/ this.tasks.length);


	this.changeStatusOfTask = function(task_description, changed_status) {
		this.tasks[task_description] = changed_status;
	}
}