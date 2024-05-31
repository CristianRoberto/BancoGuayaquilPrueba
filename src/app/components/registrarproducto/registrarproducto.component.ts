import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-registrarproducto',
  templateUrl: './registrarproducto.component.html',
  styleUrls: ['./registrarproducto.component.scss'],
})
export class RegistrarproductoComponent implements OnInit {

  elementos: any = {
    formato: '',
  };

  public previsualizacion!: string;
  public archivos: any = [];
  public archivoCargado: any;




  constructor(
    private sanitizer: DomSanitizer,
    public toast: ToastController,
    public popover: PopoverController,
    private servicio: UserService

  ) {
   }

  ngOnInit() {}

  async exit() {
    this.popover.dismiss();
  }
  cargaArchivo2(event: any): any {
    this.archivoCargado = event.target.files[0];
    this.archivos.push(this.archivoCargado);
    this.extraerBase64(this.archivoCargado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  });
  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }

  async presentToast(message: any) {
    const toast = await this.toast.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
 
}
