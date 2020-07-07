import {repository} from '@loopback/repository';
import {
  HttpErrors,

  post,

  requestBody
} from '@loopback/rest';
import {EmailNotification} from '../models/email-notification.model';
import {SmsNotification} from '../models/sms-notification.model';
import {RegistroRepository, UsuarioRepository} from '../repositories';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';




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
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
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
      let usuario = await this.usuarioRepository.findOne({where: {email: passwordResetData.nombre_usuario}})
      switch (passwordResetData.type) {
        case 1:
          if (usuario) {
            //send sms
            let notification = new SmsNotification({
              body: `Su nueva contraseña de Instagram es: ${randomPassword}`,
              to: usuario.celular

            });
            let sms = await new NotificationService().SmsNotification(notification);
            if (sms) {
              console.log("sms message sent")
              console.log("KMOOON BABYY");
              return true;
            }
            throw new HttpErrors[400]("numero no encontrado");
          }
          throw new HttpErrors[400]("usuario no encontrado ");
          break;
        case 2:
          //send email

          if (usuario) {

            let notification = new EmailNotification({
              textBody: `Su nueva contraseña de Instagram es: ${randomPassword}`,
              htmlBody: `Su nueva contraseña de Instagram es: ${randomPassword}`,

              to: usuario.email,
              subject: 'Nueva contraseña'

            });
            let mail = await new NotificationService().MailNotification(notification);
            if (mail) {
              console.log("mail message sent")
              console.log("KMOOON BABYY X22");
              return true;
            }
            throw new HttpErrors[400]("Email no encontrado");
          }
          throw new HttpErrors[400]("Usuario no encontrado ");

          break;


        default:
          throw new HttpErrors[400]("This notification type is not supprted")
          break;
      }
    }
    throw new HttpErrors[400]("User not found")


  }




}
