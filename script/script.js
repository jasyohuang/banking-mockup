
// Results API
// A method that will invoke the Results API on the server side
function callResultAPI() {
    let formData = new FormData(thisForm);
    formData.set('sessionID', sessionId);
    formData.set('transactionID', transactionId);
   
    const data=JSON.stringify(Object.fromEntries(formData));
    $.ajax({
        type: 'POST',
        url: '/getResult',
        data: data,
        success: function (d) {
            if (d) {
                $('.resultJSON').html(JSON.stringify(JSON.parse(d), undefined, 4));
                restartWebSDK();
            }
            console.log(d);
        },
        dataType: 'json',
        contentType: 'application/json'
    });

}

// Process API
// A method that will invoke the Process API on the server side
function callProcessAPI(userId) {
    let formData = new FormData(thisForm);
    formData.set('sessionID', sessionId);
    formData.set('transactionID', transactionId);
    formData.set('userId', userId)
   
    const data=JSON.stringify(Object.fromEntries(formData));
    $.ajax({
        type: 'POST',
        url: '/processAPI',
        data: data,
        success: function (d) {
            if (d) {
                $('.resultJSON').html(JSON.stringify(JSON.parse(d), undefined, 4));
                restartWebSDK();
            }
            console.log(d);
        },
        dataType: 'json',
        contentType: 'application/json'
    });

}

// Label API
// A method that will invoke the Label API on the server side
function callLabelAPI(labelStatus) {
    let formData = new FormData(thisForm);
    formData.set('sessionID', sessionId);
    formData.set('transactionID', transactionId);
    formData.set('labelStatus', labelStatus);

   
    const data=JSON.stringify(Object.fromEntries(formData));
    $.ajax({
        type: 'POST',
        url: '/labeling',
        data: data,
        success: function (d) {
            if (d) {
                $('.labelingResponseJSON').html(d);
                restartWebSDK();
            }
            console.log(d);
        },
        dataType: 'json',
        contentType: 'application/json'
    });

}

// A method that will pretty print the results from the server
function prettyPrintResult(){
    var uglyJSON = document.getElementById('resultJSON').value;
    var prettyJSON = JSON.stringify(JSON.parse(uglyJSON), undefined, 4);
    document.getElementById('resultJSON').value = prettyJSON;

}

// A method that will reset the session ID and transaction ID
// This is a placeholder as we ask the user to refresh the page to minimize complexity
function restartWebSDK() {
    startWebSDK();
}

// A method that removes the CX from the session store
const stopWebSDK = function() {
    sessionStorage.removeItem('cx'); 
}

// A method that clears the results text
function clearResultText() {
    document.getElementById('result').value = "";
}

// A method that generates a UUID for session and transaction ID
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
}

// A method to set a cookie, purely for passing the User ID from the login to the payment page without backend complexity
// Callsign does not require this in production
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}  


// A method to get a cookie, purely for passing the User ID from the login to the payment page without backend complexity
// Callsign does not require this in production
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}