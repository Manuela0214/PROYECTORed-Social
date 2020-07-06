import { repository, CrudRepositoryImpl } from '@loopback/repository';
import { RegistroRepository } from '../repositories';
import { RegistroController } from '../controllers';
import { EncryptDecrypt } from './encrypt-decrypt.service';
import { ServiceKeys as keys } from '../keys/service-keys';
import { Registro } from '../models';
const jwt = require("jsonwebtoken")
export class AuthService{
    constructor(
        @repository(RegistroRepository)
        public registroRepository:RegistroRepository

    ){


    }
async Identify(nombre_usuario:string, contraseña:string):Promise<Registro | false>{
    let registro = await this.registroRepository.findOne({where:{nombre_usuario : nombre_usuario}});
    if (registro){
        let cryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(contraseña);
        if(registro.contrasena == cryptPass){
            return registro;
        }
    }
    return false;
} 
async GenerateToken (registro:Registro){
    registro.contrasena = '';
    let token = jwt.sign({
        exp: keys.TOKEN_EXPIRATION_TIME,
        data:{
            _id: registro.id,
            nombre_usuario: registro.nombre_usuario,
            role: registro.rol,
            paternId: registro.usuarioId
        }

    },

        keys.JWT_SECRET_KEY);
        return token;
 }

}