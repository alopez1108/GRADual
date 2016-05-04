/**
 * Application represents an application started by the user. 
 */
 
var Application = function(school, due_date, recruiter, link, image_souce, tasks, number, events) {
    ////////////////////////////////////////////////
    // Representation
    //
    this.school = school;
    this.recruiter = recruiter; 
    this.documents = new Array();
    this.tasks = tasks;
    this.due_date = due_date; 
    this.application_link = link;
    this.image = image_souce;
    this.num_tasks = 0;
	this.number = number;
	this.events = events;
	
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
		this.num_tasks = this.num_tasks + 1; 
	}

	this.addDocument = function(file){
		this.documents.push(file);
	}
	
	this.addEvent = function(event){
		this.events.push(event);
	}

	var completed = 0;

	// for(i = 0; i < this.tasks.length; i ++){
	// 	var task = this.tasks[i];
	// 	if (task.complete){
	// 		completed = completed + 1;
	// 	}
	// }


	this.changeStatusOfTask = function(task_description, changed_status) {
		this.tasks[task_description] = changed_status;
	}
}