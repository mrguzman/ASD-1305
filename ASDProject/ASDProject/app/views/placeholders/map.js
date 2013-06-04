function (doc){
	if (doc._id.substr(0, 4) === "lead"){
		emit(doc._id.substr(4), {
			"comments": doc.comments,
			"date": doc.date,
			"fName": doc.fName,
			"interest": doc.interest,
			"lName": doc.lName,
			"phoneNum": doc.phoneNum,
			"phoneType": doc.phoneType,
			"time": doc.time
		});
	}
};