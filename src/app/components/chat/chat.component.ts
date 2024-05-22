import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy{

  texto = '';
  mensajesSubscription: Subscription;
  elemento!: HTMLElement;
  mensajes: any[] =[];

  constructor(
    public chatService: ChatService
  ){

    this.mensajesSubscription = Subscription.EMPTY;

  }

  ngOnInit(){

    this.elemento = <HTMLElement>document.getElementById('chat-mensajes');
    this.mensajesSubscription = this.chatService.getMessages().subscribe( msg =>{
      console.log(msg);
      this.mensajes.push( msg );
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;

      }, 50 );

    });

  }

  ngOnDestroy(){
    this.mensajesSubscription.unsubscribe();
  }

  enviar(){

    if(this.texto != ''){
      console.log(this.texto);
      this.chatService.sendMensage(this.texto);
      this.texto= '';
    }

  }
}
