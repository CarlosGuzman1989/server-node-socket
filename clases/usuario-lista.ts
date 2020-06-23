import { Usuario } from "./usuario";

export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() { }
    // AGREGAR USUARIO
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);

        return usuario;
    }
    public actualizarNombre(id: string, nombre: string) {
        for (let us of this.lista) {
            if (us.id == id) {
                us.nombre = nombre;
                break;
            }
        }
        console.log('----update usuario----');
        console.log(this.lista);
    }
    public getLista() {
        return this.lista;
    }
    public getUsuario(id: string) {
        return this.lista.find(usuario => {
            return usuario.id == id;
        })
    }
    public getUsuarioSala(sala: string) {
        return this.lista.filter(usuario => {
            return usuario.sala == sala;
        })
    }
    public borrarUsurio(id: string){
        const tempUsuario = this.getUsuario( id );
        this.lista = this.lista.filter( usuario => {
            return usuario.id !== id;
        })
        return tempUsuario;
    }
}