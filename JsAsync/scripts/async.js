const baseUrl = "https://t6v3t4hh5i.execute-api.us-west-2.amazonaws.com";
const apiUrl = baseUrl + "/latest/haiku/";
const basicAuthKey = "3Tio8BuGtSav8zMfQpkki8rHRlbVGJvdGNCaRqj5";
const jqOutputDivId = "#output";

var promises = [];

function Response(endpoint, responseCode, durationMs, message) {
    this.endpoint = endpoint;
    this.responseCode = responseCode;
    this.durationMs = durationMs;
    this.message = message;
}

// Entry point
$(document).ready(function () {
    var endpoints = ["stanza1", "stanza2", "stanza3", "author"];

    for (var i = 0; i < endpoints.length; i++) {
        promises.push(performApiCall(endpoints[i]));
    }

    //This will run once all async operations have successfully finished
    Promise.all(promises).then(
        function success(result) {            
            for (var i = 0; i < result.length; i++) {
                displayResponse(result[i]);
            }
        },
        function failed(result) {
            console.log(result);
        }
    );
});

// Template to display an endpoint response.
function displayResponse(response) {
    $(jqOutputDivId).append("For endpoint : " + apiUrl + "<span class='endpoint'>" + response.endpoint + "</span><br>");
    $(jqOutputDivId).append("<span>Response Code: " + response.responseCode + " | Response Time: " + response.durationMs + " msec | Message: " + response.message + "</span>");
    $(jqOutputDivId).append("<br><br>");
}

// Generates a promise that performs http get request against the specified endpoint.
function performApiCall(endpoint) {
    var startTime = new Date().getTime();
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: apiUrl + endpoint,
            type: "GET",
            async: true,
            dataType: "JSON",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-api-key", basicAuthKey);
            },
            complete: function (xhr) {
                try {
                    responseTime = (new Date().getTime() - startTime);
                    var resp = new Response(endpoint, xhr.status, responseTime, xhr.responseJSON.message);
                    resolve(resp);
                }
                catch (err) {
                    reject({ endpoint: endpoint, response: xhr });
                }
            },
            error: function (xhr) {
                reject({ endpoint: endpoint, response: xhr });
            }
        });
    });
}