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
}
