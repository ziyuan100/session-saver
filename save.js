const backBtn = document.querySelector("#back");
backBtn.addEventListener("click", () => {
    window.location.href = "main.html";
})
const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", saveSession);

async function saveSession() {
    // TODO replace with uuid
    const len = Object.keys(await chrome.storage.local.get()).length
    console.log(len);
    const title = document.querySelector("#title").value;   
    let tabs = await chrome.tabs.query({});
    let urls = [];
    for (tab of tabs) {
        urls.push(tab.url);
    }
    // TODO: Naming functionality for sessions
    await chrome.storage.local.set({[len]: {name: title, urls: urls}});
    window.location.href = "main.html";
}
