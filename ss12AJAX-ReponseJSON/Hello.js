(function() {
    const URL = "http://localhost:8081/hello";//use server3
  
    window.addEventListener("load", initialize);
  
    function initialize() {
      $("hello-btn").addEventListener("click", getHello);
    }
  
    function getHello() {
      //showHello("");
      let url = URL;
      let name = $("name").value;
      let lastname = $("lastname").value;
      url += "?name=" + name;
      url += "&lastname=" + lastname;
      alert('This is the resource: ' + url);
      console.log('URL: ' + url);

      let headers = new Headers();

      headers.append('Accept', 'application/json');
      fetch(url, 
        {mode: 'cors',//Cross-Origin Resource Sharing
        //credentials: 'include',
        method: 'GET',
        })
        .then(checkStatus) // Note that our web service returns plain text, not JSON!
        .then(showHello)
        .catch(console.log);
    }
  
    function showHello(textResult) {
      let objMessage = JSON.parse(textResult);
      console.log('This is the server response: ' + objMessage.msg);
      //alert('This is the message: ' + objMessage.msg);
      $("result").innerText = objMessage.msg;
    }
  
    /* ------------------------------ Helper Functions  ------------------------------ */
  
    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} id - element ID
     * @returns {object} DOM object associated with id.
     */
    function $(id) {
      return document.getElementById(id);
    }
  
    /*
     * Helper function to return the response's result text if successful, otherwise
     * returns the rejected Promise result with an error status and corresponding text
     * @param {object} response - response to check for success/error
     * @return {object} - valid result text if response was successful, otherwise rejected
     *                    Promise result
     */
    function checkStatus(response) { 
      console.log(response);
      if (response.status >= 200 && response.status < 300 || response.status == 0) {  
        return response.text();
      } else {  
        return Promise.reject(new Error(response.status + ": " + response.statusText)); 
      }
    }
  })();
