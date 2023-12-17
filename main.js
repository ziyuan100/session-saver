const saveBtn = document.querySelector("#save");
const reloadBtn = document.querySelector("#reload")
const sessionsDiv = document.querySelector("#sessions");
saveBtn.addEventListener("click", () => {
    window.location.href="save.html";
}); 
reloadBtn.addEventListener("click", getSessions);
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clearSessions);

getSessions();

async function getSessions() {
    sessionsDiv.replaceChildren();
    const res = await chrome.storage.local.get();
    console.log(res);
    for (id in res) {
        const {name, urls} = res[id];
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", id)
        const title = document.createElement("h2");
        title.innerText = name;
        newDiv.appendChild(title);
        const openBtn = document.createElement("button");
        openBtn.innerText = "Open";
        openBtn.value = id;
        newDiv.appendChild(openBtn);
        const content = document.createElement("ul");
        for (url of urls) {
            const text = document.createElement("li");
            text.innerText = url;
            content.appendChild(text);
        }
        newDiv.appendChild(content);
        sessionsDiv.appendChild(newDiv);

        openBtn.addEventListener("click", openSession);
    }
}

async function openSession(evt) {
    console.log(evt.target);
    const id = evt.target.value;
    const res = (await chrome.storage.local.get(id))[0];
    const { urls } = res;
    chrome.windows.create({url: urls, state: "maximized"});
}

async function clearSessions() {
    await chrome.storage.local.clear();
    getSessions();
}
