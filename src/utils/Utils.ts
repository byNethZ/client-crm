import { global } from "src/app/services/global";

export default class Utils {
  constructor(){}

  public formatDate(evt: Event | string): string {

    let inputDate: any = evt;

    if(inputDate){
      let arrayDate = inputDate.split('-');

      let date = new Date(
        parseInt(arrayDate[0]),
        parseInt(arrayDate[1]) - 1,
        parseInt(arrayDate[2])
      );

      return date.toISOString();
    }
    return '';
  }

  formatStatusCustomer(status: number): string {
    let statusString: string = '';

    switch(status){
      case 0:
        statusString = 'Prospectos'
        break;
      case 1:
        statusString = 'En Negociación'
        break;
      case 2:
        statusString = 'En Seguimiento'
        break;
      case 3:
        statusString = 'En Cierre'
        break;
      case 4:
        statusString = 'Rechazados';
        break;
      case 5:
        statusString = 'Clientes';
        break;
      case 6:
        statusString = 'Inactivos';
        break;
      default:
        statusString = 'Sin datos'
    }

    return statusString
  }

  returnUrlImage(image: string): string{
    let urlDefault: string = `${global.urlStorageCustomers}/default.jpg`

    if(image) return `${global.urlStorageCustomers}/${image}`;

    return urlDefault;
  }
}

/*
0-prospect
1-negociation
2-following
3-cierre
4-reject
5-cliente
6- inactive
*/
