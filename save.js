const backBtn = document.querySelector("#back");
backBtn.addEventListener("click", () => {
    window.location.href = "main.html";
})
const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", saveSession);

async function saveSession() {
    // TODO replace with uuid
    const len = Object.keys(await chrome.storage.local.get()).length
    const title = document.querySelector("#title").value;
    let tabs = await chrome.tabs.query({lastFocusedWindow: true});
    let urls = [];
    for (tab of tabs) {
        urls.push(tab.url);
    }
    await chrome.storage.local.set({[len]: {name: title, urls: urls, id: len}});
    window.location.href = "main.html";
}
