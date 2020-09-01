import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {generate} from 'generate-password';
import {PasswordKeys} from '../keys/password-heys';
import {ServiceKeys as keys} from '../keys/service-keys';
import {Usuario} from '../models';
import {EmailNotification} from '../models/email-notification.model';
import {RegistroRepository, UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt-decrypt.service';
import {NotificationService} from '../services/notification.service';
export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository,
  ) {}

  @post('/usuarios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    //creamos un usuario(sutudent) y le metemos la informacion necesaria al objeto registro
    let u = await this.usuarioRepository.create(usuario);
    //se creara una contraseña random
    let randomPassword = generate({
      length: PasswordKeys.LENGTH,
      numbers: PasswordKeys.NUMBERS,
      lowercase: PasswordKeys.LOWERCASE,
      uppercase: PasswordKeys.UPPERCASE,


    });

    //con passwor1 encriptamos la contraseña que en este caso es el celular
    let password1 = new EncryptDecrypt(keys.MD5).Encrypt(randomPassword);
    //con password2 encriptamos por segunda vuelta, el primer cifrado
    let password2 = new EncryptDecrypt(keys.MD5).Encrypt(password1);
    let r = {

      nombre_usuario: u.email,
      contrasena: password2,
      nombre: u.primer_nombre,
      rol: 1,
      usuarioId: u.id

    };

    let regist = await this.registroRepository.create(r);
    let notification = new EmailNotification({
      textBody: `Hola! ${u.primer_nombre},${u.primer_apellido} Se ha creado una cuenta a su nombre, su usuario es su correo electronico  y su contraseña es: ${randomPassword}`,
      htmlBody: `Hola! ${u.primer_nombre},${u.primer_apellido} <br /> Se ha creado una cuenta a su nombre, su usuario es su correo electronico  y su contraseña es:<strong> ${randomPassword}</strong>`,

      to: u.email,
      subject: 'Nueva Cuenta'

    });
    await new NotificationService().MailNotification(notification)
    regist.contrasena = '';
    u.registro = regist;
    return u;
  }

  @get('/usuarios/count', {
    responses: {
      '200': {
        description: 'Usuario model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios', {
    responses: {
      '200': {
        description: 'Array of Usuario model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Usuario, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios', {
    responses: {
      '200': {
        description: 'Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {

    let r = await this.registroRepository.findOne({where: {usuarioId: usuario.id}});
    if (r) {
      r.nombre_usuario = usuario.email;
      await this.registroRepository.replaceById(r.id, r);
    }
    await this.usuarioRepository.replaceById(id, usuario);

  }

  @del('/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
//ola
