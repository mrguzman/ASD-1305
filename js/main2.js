//ASD 2013-05
// By Juan J Guzman


$("#home").on("pageinit", function(){
						

	//Save info to local storage
	
	$('saveButton').on("click", function(){
	//VALIDATE required information before allowing the user to proceed...
	
		saveAppt(this.key);
	
			
	});

	//SAVE DATA to LocalStorage.
		function saveAppt(key){
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		}else{
			var id = key;
		}
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
			
			
			
	}
	
	//Dynamically create individual button/links to edit and delete each item.
	
	function createLinks(key, linksLi){
		var editButton = $('<a href="#">Edit</a>');
		editButton.key = key;
		$(editButton).click(editLead);
		$(linksLi).append(editButton);
	
		
		var deleteButton = $('<a href="#">Delete</a>');
		deleteButton.key = key;
		$(deleteButton).click(deleteLead);
		$(linksLi).append(deleteButton);
		
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
	
		
		$("#saveButton").click(saveAppt);
		
		
		$('#saveButton').value = "Edit Lead";
		var editSaveButton = $('#saveButton');
		$('#saveButton').click(required);
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
	
	
	
	
	
	//DISPLAY saved data to user when "Display All Current Leads" link is clicked.
	
	$(".display").on("click", function (){
		if (localStorage.length === 0){
			var loadConfirm = confirm("No Appointments Currently Scheduled. Load Placeholders?");
			if (loadConfirm){
				loadPlaceHolder();
				alert("Placeholders have been loaded");
				}else{
					alert("Placeholders have been cancelled");
				}
		}
		var createDiv = $('<article class="items" />').appendTo(".content");		//Creates <article> element to dipslay data as a list item
		$(".items").wrapInner('<ul class="appt" />');
		for (var i=0, len=localStorage.length; i<len; i++){		//Loops through key in local storage.
			var createLi = $('<li class="keyList" />');
			var linksLi = $('<li />'); 
			$(".appt").append(createLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $('<ul class="savedData"/>');
			$(createLi).append(makeSubList);
			for (var n in obj){
				var makeSubLi = $('<li />');
				$(makeSubList).append(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				$(makeSubLi).wrapInner(optSubText);
				$(makeSubList).append(linksLi);
			}
		
			createLinks(localStorage.key(i), linksLi);
		}

	});
	
	
	//Load Place holder if no data has been saved in local storage
	
	function loadPlaceHolder (){
		for (var n in placeHolder){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(placeHolder[n]));
		}
	}
	
	//Clear All Data in storage.
	
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
		
	
	
});