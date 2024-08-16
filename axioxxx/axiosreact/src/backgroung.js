chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getSomething") {
      someAsyncFunction().then(result => {
        sendResponse(result);
      });
      return true; // Indicate that the response is asynchronous
    }
  });
  
  async function someAsyncFunction() {
    // Simulate an async function (e.g., fetching data)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: "Some data" });
      }, 1000);
    });
  }
  