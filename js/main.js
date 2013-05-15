//ASD 2013-05
//Juan J Guzman


//HOME PAGE-->

$("#home").on("pageinit", function(){

	//Clear All Data in storage using the "Delete All Saved Appointments" button
	
	$('.deleteAll').click(clearData);
	
	
	function clearData(){
		if(localStorage.length === 0){
			alert("No Appointments Are Currently Scheduled");
		}else {
			var deleteConfirm = confirm("Are you sure you wish to DELETE ALL appointments?");
			if(deleteConfirm){
				localStorage.clear();
				alert("All appointments have been deleted.")
				}else{
					alert("Delete Cancelled");
					}
			}
		}

	//DISPLAY saved data to user when "View Appointments" button or "Display" button from navbar is clicked.
	
	$(".display").on("click", function (){
		
			if (localStorage.length === 0){
				var loadConfirm = confirm("No Appointments Saved. Load Placeholders?");
					if (loadConfirm){
						loadPlaceHolder ();
						alert("Placeholders have been loaded!");
					}else{
						alert("Placeholders cancelled.");
					}
			};
				$(".content").empty();
				var savedApptsUl = $("<ul class='savedAppts'/>");
				savedApptsUl.appendTo(".content");								//Create UL to hold all saved appointments
			for (var i=0, len=localStorage.length; i<len; i++){					//Loop through items in local storage
				var singleApptLi = $("<li class='singleAppt' />");
				singleApptLi.appendTo(savedApptsUl);							//Create list item for each individual saved
				var apptDetailsUl = $("<ul class='apptDetails' />");
				apptDetailsUl.appendTo(singleApptLi);							//Creates UL to hold appointment details
				var editLi = $("<li class='editAppt' />");						//Creates LI to hold edit features for each saved Appt
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var object = JSON.parse(value);
				for (var n in object){											//Loop through the object contained in each key
					var detailsLi = $("<li class='details' />");
					detailsLi.appendTo(apptDetailsUl);							//Create the LI for each value in the appointment detail and attach to UL
					var labelValue = object[n][0]+" "+object[n][1];				
					detailsLi.wrapInner(labelValue);
					editLi.appendTo(detailsLi)
				};
				createLinks(localStorage.key(i), editLi)
			};
	});

//FORM PAGE-->


	//SAVE DATA to LocalStorage.
		function saveAppt(key){
		var id = Math.floor(Math.random()*100000001);
		var item = {};
			item.fName = ["First Name:", $("#fName").val()];
			item.lName = ["Last Name:", $("#lName").val()];
			item.phoneNum = ["Phone Number:", $("#phoneNum").val()];
			item.phoneType = ["Contact Type:", $("#phoneType").val()];
			item.date = ["Appointment Date:", $("#date").val()];
			item.time = ["Preferred Time:", $("#time").val()];
			item.interest = ["Interest Level:", $("#interest").val()];
			item.comments = ["Comments:", $("#comments").val()];
			localStorage.setItem(id, JSON.stringify(item));
			
			alert("Appointment Saved");
			
			//console.log(key);
			
	}
	
	$("#saveButton").on("click", saveAppt);
	
	





//DISPLAY PAGE-->


	//Load Place holder if no data has been saved in local storage
	
	function loadPlaceHolder (){
		for (var n in placeHolder){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(placeHolder[n]));
		}
	}


	//Dynamically create individual button/links to edit and delete each item.
	
	function createLinks(key, editLi){
		var editButton = $('<a href="#">Edit</a>');
		editButton.key = key;
		$(editButton).on("click", editLead);
		$(editLi).append(editButton);
	
		
		var deleteButton = $('<a href="#">Delete</a>');
		deleteButton.key = key;
		$(deleteButton).on("click", deleteLead);
		$(editLi).append(deleteButton);
		
	}


	//Function to EDIT each item individually
	
	function editLead(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		$('#fName').value = item.fName[1];
		$('#lName').value = item.lName[1];
		$('#phoneNum').value = item.phoneNum[1];
		$('#phoneType').value = item.phoneType[1];
		$('#date').value = item.date[1];
		$('#time').value = item.time[1];
		$('#interest').value = item.interest[1];
		$('#comments').value = item.comments[1];
	
		
		$("#saveButton").on("click", saveAppt);
		
		
		$('#saveButton').value = "Edit Lead";
		var editSaveButton = $('#saveButton');
		$('#saveButton').on("click", required);
		editSaveButton.key = this.key;
		 

	}

	
	//Function to DELETE each item individually
	
	function deleteLead(){
		var confirmDel = confirm("Are you sure you wish to delete this Appointment?");
		if (confirmDel){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Appointment Deleted"); 
		}else{
			alert("Delete Cancelled");
		}
	}
	
});