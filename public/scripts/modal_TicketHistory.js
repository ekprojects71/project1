//DOM Queries
const ticketHistoryWindow = document.querySelector(".ticket-hist-window");

//draw to DOM
function addTicketToList(ticketTitle, lastUpdated) {
    let ticketList ="";

    ticketList += `
    <li class="ticket-hist-item">
        <span>${ticketTitle}</span>
        <span>${lastUpdated}</span>
    </li>`;

    return ticketList;
}

function createTicketHistory(ticketList) {
    ticketHistoryWindow.innerHTML = `
    <button class="ticket-hist-exit">X</button>
    <h2>Ticket History</h2>
    <ul class="ticket-hist-list">
        <li class="ticket-hist-labels">
            <span>Ticket Title</span>
            <span>Last Modified</span>
        </li>

        ${ticketList}

    </ul>`;
}

//open and close functions
function drawTicketHistory() {
    ticketHistoryWindow.scrollIntoView();
    bckgTint.classList.toggle("d-none");
    bckgTint.style.zIndex = 2;
    ticketHistoryWindow.classList.toggle("d-none");
}

function closeTicketHistory() {
    bckgTint.classList.toggle("d-none");
    ticketHistoryWindow.classList.toggle("d-none");
}

//event listener
ticketHistoryWindow.addEventListener("click", (e) => {
    //closes the window
    if(e.target == ticketHistoryWindow.querySelector(".ticket-hist-exit")) {
        closeTicketHistory();
    }
});