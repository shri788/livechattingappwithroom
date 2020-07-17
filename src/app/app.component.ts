import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    user:string;
    room:string;
    messageText:string;
    messageArray:Array<{user:string,message:string}> = [];
    constructor(private WebSocketService:WebSocketService){
        this.WebSocketService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this.WebSocketService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this.WebSocketService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
    }

    join(){
        this.WebSocketService.joinRoom({user:this.user, room:this.room});
    }

    leave(){
        this.WebSocketService.leaveRoom({user:this.user, room:this.room});
    }

    sendmessage()
    {
        this.WebSocketService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    }

}
