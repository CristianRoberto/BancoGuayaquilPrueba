import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../servicios/user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/member-ordering
  profileId: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  products: any = [];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  auxproducts = [];


  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private servicio: UserService,
    public popover: PopoverController,
    public toast: ToastController,
    public loadingController: LoadingController,
    private router: Router
  ) {}


  ngOnInit(): void {

  }
  ionViewDidEnter() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      // Ahora puedes usar el ID para buscar el producto específico
      this.search(id);
    });
  }
  async goBack() {
    this.router.navigate(['/home']);
  }



  async search(id: string): Promise<void> {
    const numericId = parseInt(id, 10); // Convertir la cadena de texto a número
    if (!isNaN(numericId)) {
      const loading = await this.loadingController.create({ message: 'Cargando...' });
      await loading.present();
  
      // Suscribirse al observable para obtener los datos
      this.servicio.getMovieById(numericId).subscribe(
        async (producto: any) => {
          console.log('Producto encontrado:', producto);
          if (producto) {
            this.products = producto; // Asignar el objeto producto directamente
            await loading.dismiss();
            this.presentToast('Producto encontrado');
          } else {
            console.error('El producto no fue encontrado.');
            await loading.dismiss();
            this.presentToast('El producto no fue encontrado');
          }
        },
        async (error) => {
          console.error('Error al buscar el producto:', error);
          await loading.dismiss();
          this.presentToast('Error al buscar el producto');
        }
      );
    } else {
      console.error('El ID no es un número válido:', id);
    }
  }
  





  presentToast(arg0: string) {
    throw new Error('Method not implemented.');
  }

}
