import {repository} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service-keys';
import {Registro} from '../models';
import {RegistroRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt-decrypt.service';

const jwt = require("jsonwebtoken");


export class AuthService {
  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository


  ) {

  }

  async Identify(nombre_usuario: string, contrasena: string): Promise<Registro | false> {
    console.log(`${nombre_usuario}  Password : ${contrasena}`);

    let registro = await this.registroRepository.findOne({where: {nombre_usuario: nombre_usuario}});
    if (registro) {
      let cryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(contrasena);
      if (registro.contrasena == cryptPass) {
        return registro;
      }
      console.log("ENTRA AQUI")

    }
    console.log("ERROR PERO DE QUE")
    return false;
  }

  async GenerateToken(registro: Registro) {
    registro.contrasena = '';
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        _id: registro.id,
        nombre_usuario: registro.nombre_usuario,
        rol: registro.rol,
        usuarioId: registro.usuarioId
      }
    },
      keys.JWT_SECRET_KEY);
    return token;
  }


  async VerifyToken(token: string) {
    try {
      let data = jwt.verify(token, keys.JWT_SECRET_KEY);
      return data;

    } catch (error) {
      return false;
    }
  }

}
