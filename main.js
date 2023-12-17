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
    if (!Object.keys(res).length) {
        sessionsDiv.innerText = "Empty"
    } 
    for (id in res) {
        const {name, urls} = res[id];
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", id);
        newDiv.classList.add("card", "p-2", "mb-1");
        const title = document.createElement("h2");
        title.innerText = name;
        title.classList.add("card-title", "w-50", "d-inline")
        newDiv.appendChild(title);
        const openBtn = document.createElement("button");
        openBtn.innerText = "Open";
        openBtn.value = id;
        openBtn.classList.add("btn", "btn-dark", "w-25", "d-inline", "mb-3")
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
    const id = evt.target.value;
    const res = (await chrome.storage.local.get(id))[id];
    console.log(res);
    const { urls } = res;
    chrome.windows.create({url: urls, state: "maximized"});
}

async function clearSessions() {
    await chrome.storage.local.clear();
    getSessions();
}

// TODO: Create Edit functionality