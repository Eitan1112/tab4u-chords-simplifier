const listenForClicks = () => {
    console.log('Listeting for clicks')
    document.addEventListener("click", (e) => {

        const simplify = (tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "simplify"
            })
        }

        const reset = (tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset",
            })
        }

        if (e.target.innerHTML.includes("הפשט אקורדים")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(simplify)
        }
        else if (e.target.innerHTML.includes("אפס אקורדים")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(reset)
        }
    })
}

browser.tabs.executeScript({ file: "/content_scripts/script.js" })
    .then(listenForClicks)