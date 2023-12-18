// global variables
let session = undefined;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "edit-session") {
        session = message.session;
        sendResponse(message);
    }

    if (message.action === "get-id") {
        sendResponse(session);
    }
    console.log(session);
})