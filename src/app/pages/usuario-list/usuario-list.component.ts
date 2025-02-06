import { Component, inject } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioCardComponent } from "../../components/usuario-card/usuario-card.component";
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [UsuarioCardComponent, NgxPaginationModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {


  usuarioService = inject(UsuariosService);


  arrUsuarios: Usuario[];
  p: number = 1;
  total: number = 0;

  constructor(){
    this.arrUsuarios = [];
  }

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe((data: any) => {
      this.arrUsuarios = data.results;
      this.total = data.total;
    })
  }
}
