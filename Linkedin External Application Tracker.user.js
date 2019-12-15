// ==UserScript==
// @name         Linkedin External Application Tracker
// @namespace    https://github.com/JollyGingerbread
// @version      1.0
// @description  Track on LinkedIn which jobs you clicked Apply on
// @author       JollyGingerbread
// @match        https://www.linkedin.com/*
// @grant        none
// ==/UserScript==

// Step 1: Detect click on "Apply button" and get the ID of the job (checked!)
// Step 2: Add this ID to the list of already applied jobs (checked!)
// Step 3: Show an indicator for already applied jobs in the left bar
// Step 4: Add save/load functionality

(function() {
    var appliedJobString = localStorage.getItem("listOfStoredAppliedJobs")
    var listOfAppliedJobs = []
    if (appliedJobString !== null) {
        listOfAppliedJobs = appliedJobString.split(",") // 123,312,123
    }
    console.log("initiate with the list of applied jobs", listOfAppliedJobs)

    window.setInterval(checkApply, 1000)

    function checkApply(){
        var applyButtons = document.getElementsByClassName('jobs-s-apply')
        for (var applyButton of applyButtons) {
            applyButton.addEventListener("click", clickedApplyButton)
        }

        var listOfAllJobs = document.getElementsByClassName('job-card-search--two-pane')
        for (var eachJob of listOfAllJobs){
            var attribute = eachJob.getAttribute("data-job-id")
            var splitAttribute = attribute.split(':')
            var jobId = splitAttribute[3]

            //split urn:li:fs_normalized_jobPosting:1448560565 by ":" to get 1448560565
            if (listOfAppliedJobs.includes(jobId)) {
                var listOfJobTitles = eachJob.getElementsByClassName('job-card-search__link-wrapper')
                for (var eachJobTitle of listOfJobTitles){
                    eachJobTitle.style.color = "red"
                }
            }
        }
    }

    function clickedApplyButton(){
        var currentJobId = new URL(location.href).searchParams.get('currentJobId')
        listOfAppliedJobs.push(currentJobId)
        localStorage.setItem("listOfStoredAppliedJobs", listOfAppliedJobs.join())
    }
})()


