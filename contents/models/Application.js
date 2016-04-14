/**
 * Application represents an application started by the user. 
 */
 
var Application = function(school, due_date, recruiter, link) {
    ////////////////////////////////////////////////
    // Representation
    //
    this.school = school;
    this.recruiter = recruiter; 
    this.documents = [];
    this.tasks = [];
    this.due_date = due_date; 
    this.application_link = link;

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

	this.addTask = function(task){
		this.tasks.push(task);
	}

	this.addDocument = function(file){
		this.documents.push(file);
	}


	////////////////////////////////////////////////
	// Auto populating tasks into school 
	//

	this.addTask(new Task("Essay 1"));
	this.addTask(new Task("Essay 2"));
	this.addTask(new Task("Recommendation 1"));
	this.addTask(new Task("Recommendation 2"));
	this.addTask(new Task("Send GRE scores"));
}