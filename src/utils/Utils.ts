import { User } from "src/app/models/user.interface";
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

  formatStatusCustomer(status: number, isPlural: boolean = true): string {
    let statusString: string = '';

    switch(status){
      case 0:
        statusString = isPlural ? 'Prospectos' : 'Prospecto';
        break;
      case 1:
        statusString = 'En Negociación';
        break;
      case 2:
        statusString = 'En Segumient';
        break;
      case 3:
        statusString = 'En Cierre';
        break;
      case 4:
        statusString = isPlural ? 'Rechazados' : 'Cliente Rechazado';
        break;
      case 5:
        statusString = isPlural ? 'Clientes' : 'Cliente Activo';
        break;
      case 6:
        statusString = isPlural ? 'Inactivos' : 'Cliente Inactivo';
        break;
      default:
        statusString = 'Sin datos';
    }

    return statusString
  }

  returnUrlImage(image: string): string{
    let urlDefault: string = `${global.urlStorageCustomers}/default.jpg`

    if(image) return `${global.urlStorageCustomers}/${image}`;

    return urlDefault;
  }

  formatOriginProspect(origin: string | number) : string{
    let originString: string = 'N/A'
    if( typeof origin === 'string' ) origin = parseInt(origin)

    switch (origin) {
      case 1:
        return originString = 'Llamada';
      case 2:
        return originString = 'Facebook';
      case 3:
        return originString = 'WhatsApp';
      case 4:
        return originString = 'Referido';
      case 5:
        return originString = 'Correo Directo';
      case 6:
        return originString = 'Instagram';
      case 7:
        return originString = 'Website';
      case 8:
        return originString = 'Oficina';
      case 9:
        return originString = 'Visita';
      default:
        break;
    }

    return originString;

  }

  formatLanguage(origin: string | number) : string{
    let result: string = 'N/A'
    if( typeof origin === 'string' ) origin = parseInt(origin)

    switch (origin) {
      case 1:
        return result = 'Español';
      case 2:
        return result = 'Inglés';
      default:
        break;
    }

    return result;

  }

  formatNationality(origin: string | number) : string{
    let result: string = 'N/A'
    if( typeof origin === 'string' ) origin = parseInt(origin)

    switch (origin) {
      case 1:
        return result = 'Mexicana';
      case 2:
        return result = 'Americana';
      case 3:
        return result = 'Cubana';
      case 4:
        return result = 'Guatemalteca';
      case 5:
        return result = 'Salvadoreño';
      case 6:
        return result = 'Peruano';
      case 7:
        return result = 'Costarricense';
      case 8:
        return result = 'Colombiano';
      case 9:
        return result = 'Hondureño';
      case 10:
        return result = 'Brasileño';
      default:
        result = 'Otro';
        break;
    }

    return result;

  }

  formatMaritalStatus(origin: string | number) : string{
    let result: string = 'N/A'
    if( typeof origin === 'string' ) origin = parseInt(origin)

    switch (origin) {
      case 1:
        return result = 'Casado';
      case 2:
        return result = 'Soltero';
      case 3:
        return result = 'Divorciado';
      case 4:
        return result = 'Complicado :(';
      default:
        break;
    }

    return result;

  }

  formatGender(origin: string ) : string{
    let result: string = 'N/A'

    switch (origin) {
      case 'm':
        return result = 'Hombre';
      case 'f':
        return result = 'Mujer';
      default:
        break;
    }

    return result;

  }

  formatPhone(phone: string): string {
    let formattedPhoneNumber: string = '';

    //formattedPhoneNumber = phone.split(/\s+/).join('');
    formattedPhoneNumber = phone.split(/\s|\D+/).join('');

    return formattedPhoneNumber;
  }

  getVendorsUsers(data: User[]){
    console.log(data);
    return data.filter( (user: User) => {
      if(user.departament_alt_id === 4 || user.departament_id === 4) return true;
      return false;
    })
  }

  getMarketingUsers(data: User[]){
    console.log(data);
    return data.filter( (user: User) => {
      if(user.departament_alt_id === 8 || user.departament_id === 8) return true;
      return false;
    })
  }

  setMenuPermissions(setTitle: boolean = true, isTitle: boolean | undefined, itemDepartament: number | undefined, userDepartament: number | null, userDepartamentAlt: number | null, roleUser: number | null): boolean{
    let result: boolean = false;

    if( !setTitle && !isTitle || setTitle && isTitle ){

      if(itemDepartament === 10 || roleUser === 1){
        return result = true;
      }

      if( itemDepartament === userDepartament || itemDepartament === userDepartamentAlt){
        return result = true;
      }

      //special cases

      if( itemDepartament === 4 && userDepartament === 8 || itemDepartament === 4 && userDepartamentAlt === 8 ){
        return result = true;
      }

    }

    return result;

  }

  setButtonsPermissions(departament: number, userDepartament: number, userDepartamentAlt: number | null, roleUser: number): boolean{
    let result: boolean = false;

    if(roleUser === 1) return result = true;

    if( departament === userDepartament || departament === userDepartamentAlt ) return result = true;

    //special cases
    if( departament === 4 ){
      if( userDepartament === 8 || userDepartamentAlt === 8 ) return result = true;
    }

    return result;

  }
}
