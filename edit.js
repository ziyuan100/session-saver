// REPEAT CODE, TO REFACTOR
const backBtn = document.querySelector("#back");
backBtn.addEventListener("click", () => {
    window.location.href = "main.html";
})

let id = undefined;

chrome.runtime.sendMessage({action: "get-id"}, async (res) => {
    populate(res);
});

function populate(session) {
    const title = document.querySelector("#title");
    title.value = session.name;
    id = session.id;
}

const updateBtn = document.querySelector("#update");
updateBtn.addEventListener("click", updateSession);

async function updateSession() {
    // TODO replace with uuid
    const title = document.querySelector("#title").value;   
    let tabs = await chrome.tabs.query({});
    let urls = [];
    for (tab of tabs) {
        urls.push(tab.url);
    }
    await chrome.storage.local.set({[id]: {name: title, urls: urls, id}});
    window.location.href = "main.html";
}
