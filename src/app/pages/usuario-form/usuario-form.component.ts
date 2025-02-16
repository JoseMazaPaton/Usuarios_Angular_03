import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {

  router = inject(Router);
  usuarioService = inject(UsuariosService);
  activatedRoute = inject(ActivatedRoute);

  usuarioForm: FormGroup;
  tipo: string;
  @Input() parent: string;

  constructor() {
    this.tipo = "Alta Usuario";
    this.parent = "";
    
    this.usuarioForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      image: new FormControl('',[Validators.required])
    },
    []);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {

      if (params._id){
        this.tipo = "Modificar/Actualizar"
        this.parent = "modificar";
        
        const usuarioResponse: Usuario = await this.usuarioService.getByIdPromise(params._id);
        
        this.usuarioForm = new FormGroup({
          _id: new FormControl(usuarioResponse._id, [Validators.required]),
          first_name: new FormControl(usuarioResponse.first_name, [Validators.required]),
          last_name: new FormControl(usuarioResponse.last_name, [Validators.required]),
          email: new FormControl(usuarioResponse.email, [Validators.required]),
          username: new FormControl(usuarioResponse.username, [Validators.required]),
          image: new FormControl(usuarioResponse.image,[Validators.required])
        },
        []); 
      }
    })
  }

  getDataForm() {
    if(this.parent == 'modificar'){
      this.activatedRoute.params.subscribe((params: any) => {
        this.usuarioService.getById(params._id).subscribe((data: any) => {
          let user: Usuario = data as Usuario;
          let confirmacion = confirm(`Se va a modificar el usuario: ${user.first_name} ${user.last_name}`);
          if(confirmacion){
            this.usuarioService.update(this.usuarioForm.value);
            alert('Se ha modificado correctamente al usuario ' + user.username);
            this.router.navigate(['/home']);
          }
        })

      })
      
    } else{
      this.usuarioService.insert(this.usuarioForm.value);
      alert('Se ha creado correctamente');
      this.router.navigate(['/home']);
    }
  }
}
