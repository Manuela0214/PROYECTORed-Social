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
  contrasena: string;

}

class PasswordResetData {
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
    let registro = await this.authService.Identify(credentials.nombre_usuario, credentials.contrasena);
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

    @requestBody() passwordResetData: PasswordResetData)

    : Promise<boolean> {
    let randomPassword = await this.authService.ResetPassword(passwordResetData.nombre_usuario);
    if (randomPassword) {
      //enviar sms con la nueva contraseña o email
      //1 SMS
      //2 EMAIL
      //...
      switch (passwordResetData.type) {
        case 1:
          //send sms
          console.log("Senging SMS:" + randomPassword);
          return true;
          break;
        case 2:
          //send email
          console.log("Senging email:" + randomPassword);
          return true;

          break;


        default:
          throw new HttpErrors[400]("This notification type is not supprted")
          break;
      }
    }
    throw new HttpErrors[400]("User not found")


  }




}
