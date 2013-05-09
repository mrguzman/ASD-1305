//ASD 1304
//Juan J Guzman

$("#home").on("pageinit", function(){
	
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
	
		$('saveButton').click(required);
	
	//VALIDATE required information before allowing the user to proceed...
	
	function required(r){
		var checkFname = $('#fName');
		var checkLname = $('#lName');
		var checkNum = $('#phoneNum');
		
		flagMessage.innerHTML = "";
		checkFname.style.border = "1px solid black";
		checkLname.style.border = "1px solid black";
		checkNum.style.border = "1px solid black";
		
		var flagArray = [];
		if (checkFname.value === ""){
			var fNameFlag = "Please Enter A First Name";
			checkFname.style.border ="1px solid red";
			flagArray.push(fNameFlag);
		}
			if (checkLname.value === ""){
			var lNameFlag = "Please Enter A Last Name";
			checkLname.style.border ="1px solid red";
			flagArray.push(lNameFlag);
		}
			if (checkNum.value === ""){
			var numFlag = "Please Enter A Contact Number";
			checkNum.style.border ="1px solid red";
			flagArray.push(numFlag);
		}
		if (flagArray.length >=  1){
			for (var i=0, j=flagArray.length; i < j; i++){
				var text = document.createElement('li');
				text.innerHTML = flagArray[i];
				flagMessage.appendChild(text);
			}
			r.preventDefault();
			return false;
		}else{
			saveLead(this.key);
		}
		
	}
	//DISPLAY all localStorage data to user
	
		
	$(".display").find("a").click(function(){
		if(localStorage.length === 0){
			alert("No Appointments Currently Saved");
			return false;
		}
		
		
		
	})
	
		


	
	
});



