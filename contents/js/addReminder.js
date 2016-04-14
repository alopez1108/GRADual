$(function() {
	var dialog = document.querySelector('dialog');
	var showModalButton = document.querySelector('.show-modal');
	if (! dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}
	showModalButton.addEventListener('click', function() {
		dialog.showModal();
	});
	dialog.querySelector('.close').addEventListener('click', function() {
		// $('#login')[0].reset(); //clear text
		dialog.close();
	});
	dialog.querySelector('.add').addEventListener('click',function() {
		// add university to homepage
		var text_input = $('#schoolpicker').val();
		// check if it is in the array of colleges
		if (jQuery.inArray(text_input, current_colleges) !== -1) {
			console.log("yes");
			// dialog.close();
		}
	});

    var current_colleges = [
      "Harvard University",
      "Stanford University",
      "Massachusetts Institute of Technology (Sloan)",
      "Yale University",
      "Columbia University",
      "University of California - Berkeley",
    ];
    $( "#schoolpicker" ).autocomplete({
      source: current_colleges
    });
    $( "#schoolpicker" ).autocomplete("option", "appendTo", "#dialog"); 

  });
