const listenForClicks = () => {
    console.log('Listeting for clicks')
    document.getElementById('button').addEventListener("click", (e) => {

        const simplify = (tabs) => {
            document.getElementById('button').innerHTML = 'אפס אקורדים'
            browser.tabs.sendMessage(tabs[0].id, {
                command: "simplify"
            })
        }

        const reset = (tabs) => {
            document.getElementById('button').innerHTML = 'הפשט אקורדים'
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset",
            })
        }

        // if (e.target.innerHTML.contains("הפשט אקורדים")) {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(simplify)
        // }
        // else if (e.target.classList.contains("אפס אקורדים")) {
        //     browser.tabs.query({ active: true, currentWindow: true })
        //         .then(reset)
        // }
    })
}

browser.tabs.executeScript({ file: "/script.js" })
    .then(listenForClicks)