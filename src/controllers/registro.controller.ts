import {repository} from '@loopback/repository';
import {
  HttpErrors,

  post,

  requestBody
} from '@loopback/rest';
import {RegistroRepository, UsuarioRepository} from '../repositories';
import {AuthService} from '../services/auth.service';
import { SmsNotification, Usuario, EmailNotification } from '../models';
import { NotificationService } from '../services/notification.service';




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
    @repository(UsuarioRepository)
    public userRepository:UsuarioRepository
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
        let usuario = await this.userRepository.findOne({where:{email: paswordResetData.nombre_usuario}});
        switch (paswordResetData.type) {
          case 1:
            //envío sms
           
           
          if (usuario){
           let notification = new SmsNotification({
              body: `Su nueva contraseña es: ${randomPassword}`,
              to: usuario.celular
            });
            let sms = await new NotificationService().SmsNotification(notification);
            if (sms){
              console.log("sms message send");
              return true
            }
            throw new HttpErrors[400]("Phone is not found");
            
          }
          throw new HttpErrors[400]("user not found");
          
            break;
          case 2:
            //envío mail
            
          if (usuario){
           let notification = new EmailNotification({
              textBody: `Su nueva contraseña es: ${randomPassword}`,
              body: `Su nueva contraseña es: ${randomPassword}`,
              to: usuario.email,
              subject: 'Nueva contraseña'
            });
            let mail = await new NotificationService().MailNotification(notification);
            if (mail){
              console.log("mail message send");
              return true
            }
            throw new HttpErrors[400]("Email is not found");
            
          }
          throw new HttpErrors[400]("user not found");
            break;
          default:
            throw new HttpErrors[400]("This notification type is not supported.");
            break;
        }
      }
      throw new HttpErrors[400]("User not found");
  }
}
