import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMensage(mensaje: string){
    const payload = {
      de: 'Beres',
      cuerpo: mensaje
    };

    this.wsService.emit( 'mensaje', payload );
  }

  getMessages(){
    return this.wsService.listen('mensaje-nuevo');
  }
}
