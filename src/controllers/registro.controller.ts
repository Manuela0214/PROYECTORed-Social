// Uncomment these imports to begin using these cool features!

import { repository } from '@loopback/repository';
import { RegistroRepository } from '../repositories';
import { post, requestBody, HttpErrors } from '@loopback/rest';
import { AuthService } from '../services/auth.service';

// import {inject} from '@loopback/core';

class Credentials{
nombre_usuario:string;
contraseña:string;

}
export class RegistroController {

  authService:AuthService

  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository 
  ) {
this.authService = new AuthService(this.registroRepository)

  }

  @post('/login',{
    responses:{
      '200':{
        description: 'Login for users'
      }
    }
  })
  async login(
    @requestBody() credentials:Credentials
    ): Promise<object>{
      let registro = await this.authService.Identify(credentials.contraseña,credentials.nombre_usuario)
      if(registro){
        let tk = await this.authService.GenerateToken(registro);
        return {
          data:registro,
          token:tk
        }
      }else{
        throw new HttpErrors[401]("User or password invalid");
      }
  }
}
