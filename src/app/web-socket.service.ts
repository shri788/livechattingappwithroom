 
 
  ///<reference path="../../server/node_modules/@types/socket.io-client/index.d.ts"/>
import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from "rxjs";

@Injectable()
export class WebSocketService {

   //export class ChatService{

    private socket = io('http://localhost:3000');

    joinRoom(data)
    {
        this.socket.emit('join',data);
    }

    newUserJoined()
    {
        let observable = new Observable<{user:string, message:string}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    userlist(data)
    {
        this.socket.emit('ready',data);
    }

    userslist()
    {
        let observable = new Observable<{users:string}>(observer=>{
            this.socket.on('job', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{user:string, message:string}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:string, message:string}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}
