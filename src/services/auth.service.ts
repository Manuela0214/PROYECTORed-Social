import {repository} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service-keys';
import {PasswordKeys as passkeys} from '../keys/pasword-keys';
import {Registro} from '../models';
import {RegistroRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt-decrypt.service';
import {generate as generator} from 'generate-password';
const jwt = require("jsonwebtoken");


export class AuthService {
  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository


  ) {

  }
  /**
   * 
   * @param nombre_usuario 
   * @param contrasena 
   */

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

  /**
   * 
   * @param registro 
   */
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

 
 /**
  * metodo para reseteo de contraseña
  * @param username 
  */
  async ResetPasword(username: string) :Promise <string|false>{
    let registro = await this.registroRepository.findOne({where:{nombre_usuario:username}});
    //si el usuario existe (está registrado)
    if(registro){
      let randomPassword = generator({
        length: passkeys.LENGHT,
        numbers: passkeys.NUMBERS,
        lowercase: passkeys.LOWECASE,
        uppercase: passkeys.UPPERCASE
    });
//invocamos el servicio de cifrado
    let crypter = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD);
    let password = crypter.Encrypt(crypter.Encrypt(randomPassword));
    registro.contrasena = password;
    this.registroRepository.replaceById(registro.id, registro);
    return randomPassword;
    }
    return false;
  }

}
