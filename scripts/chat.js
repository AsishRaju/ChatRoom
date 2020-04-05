class Chatroom{
    constructor(room,username)
    {
        this.room=room
        this.username=username
        this.chatsdb=db.collection('chats')
        this.unsub
    }
    async addChat(message){
        // generate a chat object
        const now=new Date()
        const chat ={
            message: message,
            username:this.username,
            room:this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        // save the chat in db
        const response =await this.chatsdb.add(chat)
        return response
    }
    getChats(callback){
        this.unsub = this.chatsdb
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot((snapshot)=>{
            snapshot.docChanges().forEach(element => {
                if(element.type === 'added'){
                    //update the ui
                    callback(element.doc.data())
                }
            });
        })
    }
    updateName(name){
        this.username=name
        localStorage.setItem('username',name)
    }
    updateRoom(room){
        this.room=room
        console.log('room updated')
        if(this.unsub){
            this.unsub()
        }
    }
}