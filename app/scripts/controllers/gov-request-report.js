'use strict';
TransparencyApp.controller('GovRequestReportCtrl', ['$scope', '$location', 'request_report', 'report', '$route', 'urls', 'dataProviderService',
function($scope, $location, request_report, report, $route, urls, dataProviderService){
	$scope.isCreating = true;
	if(report !== null){
		report.report_period_start = moment(report.report_period_start).toDate();
		report.report_period_end = moment(report.report_period_end).toDate();
		report.publication_date = moment(report.publication_date).toDate();
		$scope.report = report;
	}
	console.log(request_report);
	if(request_report !== null){
		$scope.request_report = request_report;
		console.log(request_report);
		$scope.isCreating = false;
		// for(i in request_report.categories[Object.keys(request_report.categories)][0])
		$scope.header = request_report.categorized_disclosures[Object.keys(request_report.categorized_disclosures)[0]].disclosures[0].disclosure_responses;
	}else{
		$scope.request_report = {
			inclusion_status: true,
			complete_status: false	
		}
	}

	$scope.save = function(){
		var requestReportJSON = getRequestReportAsJSON();
		var request;
		if($scope.isCreating){
			request = dataProviderService.putItem(urls.apiURL(), "/transparency-reports/" + report.report_id + "/gov-request-report", {}, requestReportJSON);
		}
		else{
	 		request = dataProviderService.postItem(urls.apiURL(), "/transparency-reports/" + report.report_id + "/gov-request-report", {}, requestReportJSON);
	 	}
	 	request.then(function(report){
 			$route.reload();
 		});
	}
	var getRequestReportAsJSON = function(){
		var request_report = {};
		request_report.inclusion_status = $scope.request_report.inclusion_status;
		request_report.complete_status = $scope.request_report.complete_status;
		request_report.narrative = $scope.request_report.narrative;
		request_report.categorized_disclosures = $scope.request_report.categorized_disclosures;
		console.log(request_report);
		return angular.toJson(request_report)
	}
}
]);