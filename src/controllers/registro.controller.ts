import {repository} from '@loopback/repository';
import {
  HttpErrors,

  post,

  requestBody
} from '@loopback/rest';
import {RegistroRepository} from '../repositories';
import {AuthService} from '../services/auth.service';




class Credentials {
  nombre_usuario: string;
  contraseña: string;

}

class PaswordResetData {
  nombre_usuario: string;
  type: number;

}



export class RegistroController {

  authService: AuthService;

  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository,
  ) {
    this.authService = new AuthService(this.registroRepository);
  }

  @post('/login', {
    responses: {
      '200': {
        description: "Login for Users"
      }
    }
  })
  async login(

    @requestBody() credentials: Credentials)

    : Promise<object> {
    let registro = await this.authService.Identify(credentials.nombre_usuario, credentials.contraseña);
    if (registro) {
      let tk = await this.authService.GenerateToken(registro);
      return {
        data: registro,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("user or password invalida");
    }
  }

  @post('/password-reset', {
    responses: {
      '200': {
        description: "Login for Users"
      }
    }
  })
  async reset(

    @requestBody() paswordResetData: PaswordResetData)

    : Promise<boolean> {
      let randomPassword = await this.authService.ResetPasword(paswordResetData.nombre_usuario);
      if (randomPassword){
        //envío de sms o mail con la nueva contraseña
        //1. sms
        //2. email  
        switch (paswordResetData.type) {
          case 1:
            //envío sms
            console.log ("Sending sms: "+ randomPassword);
            return true;
            break;
          case 2:
            //envío mail
            console.log ("Sending mail: "+ randomPassword);
            return true;
            break;
          default:
            throw new HttpErrors[400]("This notification type is not supported.");
            break;
        }
      }
      throw new HttpErrors[400]("User not found");
  }
}
