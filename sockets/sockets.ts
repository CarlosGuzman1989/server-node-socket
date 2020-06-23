import { Socket } from 'socket.io';
import SocketIO from 'socket.io';
import { UsuariosLista } from '../clases/usuario-lista';
import { Usuario } from '../clases/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {
    
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}
export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect',()=>{
        console.log('cliente desconectado');
        usuariosConectados.borrarUsurio(cliente.id);
    })
}
// RECIBIR Y ESCUCHAR MENSAJE
export const mensaje = (cliente : Socket, io: SocketIO.Server) =>{
    cliente.on('mensaje', ( payload: {de:string,cuerpo:string} )=>{
        console.log('mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
        
    })
}
// RECIBIR EL USUARIO
export const usuario = (cliente : Socket, io: SocketIO.Server) =>{
    cliente.on('configurar-usuario', ( payload: {nombre: string}, callback: Function )=>{
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok:true,
            mensajes: `Usuario ${payload.nombre}, configurado`
        });
    });
}