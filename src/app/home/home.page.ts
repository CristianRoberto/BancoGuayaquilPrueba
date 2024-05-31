import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistrarproductoComponent } from '../components/registrarproducto/registrarproducto.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any = [];
  auxproducts = [];

  constructor(
    public popover: PopoverController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private userService: UserService, // Cambiado de 'servicio' a 'userService'
    private router: Router
  ) {}

  ngOnInit(): void {
    this.search(); // Llama a la función de búsqueda al inicializar el componente
  }

  verProducto(id: any) {
    this.router.navigate(['/producto', id]);
  }

  ionViewDidEnter() {
    this.search();
  }

  async search(): Promise<void> {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    this.userService.getPopularMovies().subscribe(
      (re: any) => {
        console.log('Productos:', re.results); // Muestra los resultados en la consola

        // Iterar sobre los resultados
        re.results.forEach((movie: any) => {
          console.log('ID:', movie.id);
          console.log('Título:', movie.title);
          console.log('Descripción:', movie.overview);
          // Puedes acceder a otros campos de cada película aquí
        });

        this.products = re.results;
        this.auxproducts = this.products;
        loading.dismiss();
        this.presentToast('Bienvenido, Conectado Con el Servidor');
      },
      (error) => {
        console.error('Error al obtener datos:', error); // Muestra cualquier error en la consola
        loading.dismiss();
        this.presentToast('Error de conexión con el Servidor');
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async CreateProducto(): Promise<void> {
    const alert = await this.popover.create({
      component: RegistrarproductoComponent,
      mode: 'ios',
      cssClass: 'pop-over-style1',
    });
    return await alert.present();
  }
}
