const saveBtn = document.querySelector("#save");
const reloadBtn = document.querySelector("#reload")
const h2 = document.querySelector("h2");
saveBtn.addEventListener("click", saveSession);
reloadBtn.addEventListener("click", getSessions);
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clearSessions);

getSessions();

async function saveSession() {
    let tabs = await chrome.tabs.query({});
    let urls = [];
    for (tab of tabs) {
        urls.push(tab.url);
    }
    const newId = h2.childElementCount;
    // TODO: Naming functionality for sessions
    await chrome.storage.local.set({[newId]: urls});
    getSessions();
}

async function getSessions() {
    h2.replaceChildren();
    const res = await chrome.storage.local.get();
    for (session in res) {
        // console.log(res[session]);
        const newDiv = document.createElement("div");
        const title = document.createElement("h2");
        title.innerText = session;
        newDiv.appendChild(title);
        const content = document.createElement("ul");
        for (link of res[session]) {
            const text = document.createElement("li");
            text.innerText = link;
            content.appendChild(text);
        }
        newDiv.appendChild(content);
        h2.appendChild(newDiv);
    }
}

async function clearSessions() {
    await chrome.storage.local.clear();
    getSessions();
}
