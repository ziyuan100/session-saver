const saveBtn = document.querySelector("#save");
const reloadBtn = document.querySelector("#reload")
const sessionsDiv = document.querySelector("#sessions");
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
    const newId = sessionsDiv.childElementCount;
    // TODO: Naming functionality for sessions
    await chrome.storage.local.set({[newId]: urls});
    getSessions();
}

async function getSessions() {
    sessionsDiv.replaceChildren();
    const res = await chrome.storage.local.get();
    for (session in res) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", session)
        const title = document.createElement("h2");
        title.innerText = session;
        newDiv.appendChild(title);
        const openBtn = document.createElement("button");
        openBtn.innerText = "Open";
        openBtn.value = session;
        newDiv.appendChild(openBtn);
        const content = document.createElement("ul");
        for (link of res[session]) {
            const text = document.createElement("li");
            text.innerText = link;
            content.appendChild(text);
        }
        newDiv.appendChild(content);
        sessionsDiv.appendChild(newDiv);

        openBtn.addEventListener("click", openSession);
    }
}

async function openSession(evt) {
    const id = evt.target.value;
    const res = (await chrome.storage.local.get(id))[0];
    console.log(res);
    chrome.windows.create({url: res});
}

async function clearSessions() {
    await chrome.storage.local.clear();
    getSessions();
}
