import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { BotoneraComponent } from "../../components/botonera/botonera.component";

@Component({
  selector: 'app-usuario-view',
  standalone: true,
  imports: [BotoneraComponent],
  templateUrl: './usuario-view.component.html',
  styleUrl: './usuario-view.component.css'
})
export class UsuarioViewComponent {

  usuarioService = inject(UsuariosService);
  activatedRoute = inject(ActivatedRoute);

  miUsuario!: Usuario;
  router = inject(Router);

  ngOnInit(): void{
    this.activatedRoute.params.subscribe((params: any) => {
      let _id: string = params._id as string;
      
      try {
        this.usuarioService.getById(_id).subscribe((data: Usuario) => {
          this.miUsuario = data;
        });
      } catch (err) {
        console.log("Error al llamar a la API: " + err);
      }
     
    })
  }

}
