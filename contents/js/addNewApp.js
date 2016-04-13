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
		dialog.close();
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
      "University of Pennsylvania (Perelman)",
      "Washington University in St. Louis",
      "University of Chicago (Pritzker)",
      "University of Michigan - Ann Arbor",
      "Cornell University (Weill)",
      "Emory University",
      "University of North Carolina - Chapel Hill",
      "Case Western Reserve University",
      "University of Minnesota",
      "University of Iowa",
      "University of Notre Dame",
      "Arizona State University (O'Connor)",
      "Boston University",
      "University of Texas - Austin",
      "Georgetown University",
      "University of Virginia",
      "University of California - Berkeley",
      "Dartmouth College (Tuck)",
      "Carnegie Mellon University (Tepper)",
      "Indiana University (Kelley)",
      "Rice University (Jones)",
      "Vanderbilt University (Owen)",
      "Georgetown University (McDonough)",
      "Washington University in St. Louis (Olin)",
      "New York University (Stern)",
      "University of Alabama",
      "George Washington University",
      "University of California - Irvine",
      "Boston College",
      "University of California - Davis",
      "University of Georgia",
      "Baylor College of Medicine",
      "Mayo Medical School",
      "University of Rochester",
      "Ohio State University",
      "Brown University (Alpert)",
      "Dartmouth College (Geisel)",
      "University of Cincinnati",
      "University of Maryland",
      "University of Utah",
      "Tufts University",
      "Ohio State University (Moritz)",
      "University of Wisconsin - Madison",
      "Fordham University",
      "University of Arizona (Rogers)",
      "Wake Forest University"
    ];
    $( "#search_applications" ).autocomplete({
      source: colleges
    });
    // $('#search_applications').append($('#ui-id-1'));
    $( "#search_applications" ).autocomplete("option", "appendTo", "#dialog");
  });
