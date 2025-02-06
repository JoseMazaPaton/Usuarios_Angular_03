import { Component, inject, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {

  usuarioService = inject(UsuariosService);
  router = inject(Router);

  @Input() _id: string;
  @Input() parent: string;

  constructor() {
    this._id = "",
    this.parent = "";
  }

  async borrarUsuario(_id: string) {
    let confirmacion = confirm('Esta usted seguro de querer borrar al usuario:' + this._id);
    // llamara al servicio para eliminar la serie (Promise)
    if(confirmacion){
      let response = await this.usuarioService.delete(_id);
      // Esto es particular de la API, ya que esta bloqueda pero devuelve una respueta.
      if (response._id) {
        alert('Se ha eliminado correctamente al usuario ' + response.first_name + " " + response.last_name);
        if(this.parent == 'view'){
          this.router.navigate(['/home']);
        }
      }
    }

  }
}
