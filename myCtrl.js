angular.module('myApp',['ang.core.module'])
.controller('myCtrl',['$scope','trackerSvc',myCtrl]);

function myCtrl($scope,trackerSvc){

	//pageview :  trackerSvc.sendupcall("name_of_view",false,"","");
	//event  : trackerSvc.sendupcall("name_of_view",true,"name_of_event_action","name_of_event_category");
	
	$scope.makeCall  = function(isEvent){
		if(isEvent){
			trackerSvc.sendupcall("main_page",isEvent,"event_button_click","button_click");
		}
		else{
			trackerSvc.sendupcall("main_page",isEvent,"","");
		}
	};
}