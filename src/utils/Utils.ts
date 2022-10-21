import { Goal } from 'src/app/models/goal.interface';
import { User } from 'src/app/models/user.interface';
import { global } from 'src/app/services/global';

export default class Utils {
  constructor() {}

  public formatDate(evt: Event | string): string {
    let inputDate: any = evt;

    if (inputDate) {
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

    switch (status) {
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

    return statusString;
  }

  returnUrlImage(image: string): string {
    let urlDefault: string = `${global.urlStorageCustomers}/default.jpg`;

    if (image) return `${global.urlStorageCustomers}/${image}`;

    return urlDefault;
  }

  formatOriginProspect(origin: string | number): string {
    let originString: string = 'N/A';
    if (typeof origin === 'string') origin = parseInt(origin);

    switch (origin) {
      case 1:
        return (originString = 'Llamada');
      case 2:
        return (originString = 'Facebook');
      case 3:
        return (originString = 'WhatsApp');
      case 4:
        return (originString = 'Referido');
      case 5:
        return (originString = 'Correo Directo');
      case 6:
        return (originString = 'Instagram');
      case 7:
        return (originString = 'Website');
      case 8:
        return (originString = 'Oficina');
      case 9:
        return (originString = 'Visita');
      case 10:
        return (originString = 'Networking');
      default:
        break;
    }

    return originString;
  }

  formatLanguage(origin: string | number): string {
    let result: string = 'N/A';
    if (typeof origin === 'string') origin = parseInt(origin);

    switch (origin) {
      case 1:
        return (result = 'Español');
      case 2:
        return (result = 'Inglés');
      default:
        break;
    }

    return result;
  }

  formatNationality(origin: string | number): string {
    let result: string = 'N/A';
    if (typeof origin === 'string') origin = parseInt(origin);

    switch (origin) {
      case 1:
        return (result = 'Mexicana');
      case 2:
        return (result = 'Americana');
      case 3:
        return (result = 'Cubana');
      case 4:
        return (result = 'Guatemalteca');
      case 5:
        return (result = 'Salvadoreña');
      case 6:
        return (result = 'Peruana');
      case 7:
        return (result = 'Costarricense');
      case 8:
        return (result = 'Colombiana');
      case 9:
        return (result = 'Hondureña');
      case 10:
        return (result = 'Brasileña');
      case 11:
        return (result = 'Venezolana');
      case 12:
        return (result = 'Puertorriqueña');
      case 12:
        return (result = 'Ecuatoriana');
      default:
        result = 'Otro';
        break;
    }

    return result;
  }

  formatMaritalStatus(origin: string | number): string {
    let result: string = 'N/A';
    if (typeof origin === 'string') origin = parseInt(origin);

    switch (origin) {
      case 1:
        return (result = 'Casado');
      case 2:
        return (result = 'Soltero');
      case 3:
        return (result = 'Divorciado');
      case 4:
        return (result = 'Complicado :(');
      default:
        break;
    }

    return result;
  }

  formatGender(origin: string): string {
    let result: string = 'N/A';

    switch (origin) {
      case 'm':
        return (result = 'Hombre');
      case 'f':
        return (result = 'Mujer');
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

  getVendorsUsers(data: User[]) {
    //console.log(data);
    return data.filter((user: User) => {
      if (user.departament_alt_id === 4 || user.departament_id === 4)
        return true;
      return false;
    });
  }

  getMarketingUsers(data: User[]) {
    console.log(data);
    return data.filter((user: User) => {
      if (user.departament_alt_id === 8 || user.departament_id === 8)
        return true;
      return false;
    });
  }

  getUserData(data: User[], id: number): User | undefined {
    //console.log(data);
    return data.find((user: User) => {
      user.id === id;
    });
  }

  setMenuPermissions(
    setTitle: boolean = true,
    isTitle: boolean | undefined,
    itemDepartament: number | undefined,
    userDepartament: number | null,
    userDepartamentAlt: number | null,
    roleUser: number | null,
    userId: number | null
  ): boolean {
    let result: boolean = false;

    if ((!setTitle && !isTitle) || (setTitle && isTitle)) {
      if (itemDepartament === 10 || roleUser === 1) {
        return (result = true);
      }

      if (
        itemDepartament === userDepartament ||
        itemDepartament === userDepartamentAlt
      ) {
        return (result = true);
      }

      //special cases

      if (
        (itemDepartament === 4 && userDepartament === 8) ||
        (itemDepartament === 1 && userDepartament === 8) ||
        (itemDepartament === 4 && userDepartamentAlt === 8) ||
        (itemDepartament === 1 && userId === 3)
      ) {
        return (result = true);
      }
    }

    return result;
  }

  setButtonsPermissions(
    departament: number,
    userDepartament: number,
    userDepartamentAlt: number | null,
    roleUser: number
  ): boolean {
    let result: boolean = false;

    if (roleUser === 1) return (result = true);

    if (departament === userDepartament || departament === userDepartamentAlt)
      return (result = true);

    //special cases
    if (departament === 4) {
      if (userDepartament === 8 || userDepartamentAlt === 8)
        return (result = true);
    }

    return result;
  }

  formatTypeGoal(type: number): string {
    let result: string = 'N/A';
    switch (type) {
      case 1:
        result = 'Ventas';
        break;
      case 2:
        result = 'Prospectos';
        break;
      default:
        break;
    }

    return result;
  }

  formatMonthForGoal(month: string, type: 'goal' | 'result'): keyof Goal {
    let monthFormatted: keyof Goal = 'jan_goal';
    switch (month) {
      case 'enero':
        monthFormatted = type == 'goal' ? 'jan_goal' : 'jan_result';
        break;

      case 'febrero':
        monthFormatted = type == 'goal' ? 'feb_goal' : 'feb_result';
        break;
      case 'marzo':
        monthFormatted = type == 'goal' ? 'mar_goal' : 'mar_result';
        break;
      case 'abril':
        monthFormatted = type == 'goal' ? 'apr_goal' : 'apr_result';
        break;
      case 'mayo':
        monthFormatted = type == 'goal' ? 'may_goal' : 'may_result';
        break;
      case 'junio':
        monthFormatted = type == 'goal' ? 'jun_goal' : 'jun_result';
        break;
      case 'julio':
        monthFormatted = type == 'goal' ? 'jul_goal' : 'jul_result';
        break;
      case 'agosto':
        monthFormatted = type == 'goal' ? 'aug_goal' : 'aug_result';
        break;
      case 'septiembre':
        monthFormatted = type == 'goal' ? 'sep_goal' : 'sep_result';
        break;
      case 'octubre':
        monthFormatted = type == 'goal' ? 'oct_goal' : 'oct_result';
        break;
      case 'noviembre':
        monthFormatted = type == 'goal' ? 'nov_goal' : 'nov_result';
        break;
      case 'diciembre':
        monthFormatted = type == 'goal' ? 'dec_goal' : 'dec_result';
        break;

      default:
        break;
    }

    return monthFormatted;
  }

  calcGoalReal(value: any, goal: any): number{
    let result: number = 0;

    if(parseInt(value) !== 0) result = ( parseInt(value) * 100 ) / parseInt(goal);

    return Math.floor(result)
  }

  calcGoalFalse(value: any, goal: any): number{
    let result: number = 0;

    if(parseInt(value) !== 0) result = ( parseInt(value) * 75 ) / parseInt(goal);

    return Math.floor(result)
  }
}
