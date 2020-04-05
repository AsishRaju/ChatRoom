// dom queries
const chatList= document.querySelector('.chat-list') 
const newChatForm = document.querySelector('.new-chat')
const newChatName = document.querySelector('.new-name')
const updateMsg =document.querySelector('.update-mssg')
const rooms =document.querySelector('.chat-rooms')
const roomTile = document.querySelector('.room-title')
const branding = document.querySelector('.branding')
const general ='<span class="badge badge-primary">#General 👌🏻 Chat Room</span>'
const gaming ='<span class="badge badge-light">#Gaming 🎮 Chat Room</span>'
const studies ='<span class="badge badge-danger">#Studies 📚 Chat Room</span>'
const parties ='<span class="badge badge-success">#Parties 🥳 Chat Room</span>'
let html
let firstLoad= true





//update chatroom
rooms.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON')
    {
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChats((chat)=>{
            chatUI.render(chat)
        })

        switch(e.target.getAttribute('id')) {
            case "General":
              html= `${general}`
              break;
            case "Gaming":
              html= `${gaming}`
              break;
            case "Studies":
              html= `${studies}`
              break;
            case "Parties":
                html= `${parties}`
                break;

          }
          if(firstLoad)
          {
            
            newChatForm.classList.remove('d-none')
            newChatForm.classList.add('animated','fadeIn','faster')
            newChatName.classList.remove('d-none')
            newChatName.classList.add('animated','fadeIn','delay-1s','faster')
            branding.classList.remove('d-none')
            branding.classList.add('animated','fadeIn','delay-3s','faster')
            firstLoad=false
          }
        
        roomTile.innerHTML = html

    }
})



//update username
newChatName.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name=newChatName.name.value.trim()
    chatroom.updateName(name)
    newChatName.reset()
    // show and hide name updated msg
    updateMsg.innerHTML = `Chat Name Updated to <span class="text-warning font-weight-bold">${name}</span>`
    setTimeout(()=>{
        updateMsg.innerHTML =``
    },3000)
})

// add a new chat
newChatForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    console.log(newChatForm.classList)
    const message=newChatForm.message.value.trim()
    chatroom.addChat(message).then(()=>{
        newChatForm.reset()
    }).catch(err => console.log(err))
    
})

//check local storage for name
const username=localStorage.username ? localStorage.username : 'anonymous'

//class instances
const chatUI =new ChatUI(chatList)
const chatroom = new Chatroom('', username)

// get chats and render
chatroom.getChats((data)=>{
    console.log(data)
    chatUI.render(data)
})