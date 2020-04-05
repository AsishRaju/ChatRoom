class ChatUI{
    constructor(list){
        this.list=list
    }
    clear()
    {
        this.list.innerHTML =``
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(data.created_at.toDate(),{addSuffix:true})
        const html=`
            <li class="list-group-item bg-dark shadow chat-item">
            <span class="username text-warning">${data.username}&nbsp;</span>
            <span class="message text-light font-weight-bold">${data.message}</span>
            <div class="time text-right">${when}</div>
            </li>
        `

        this.list.innerHTML += html
        const items = document.querySelectorAll(".chat-item");
        const last = items[items.length-1];
        last.scrollIntoView();

    }
}