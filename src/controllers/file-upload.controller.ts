import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {UploadFilesKeys} from '../keys/upload-files-keys';
import {Imagen, Usuario, Videojuego} from '../models';
import {ImagenRepository, PublicidadRepository, UsuarioRepository} from '../repositories';


export class FileUploadController {
  /**
   *
   * @param usuarioRepository
   * @param imagenRepository
   * @param publicidadRepository
   */
  constructor(
    @repository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    @repository(ImagenRepository)
    private imagenRepository: ImagenRepository,
    @repository(PublicidadRepository)
    private publicidadRepository: PublicidadRepository,
  ) {}

  /**
   *
   * @param response
   *
   * @param request
   */
  @post('/imgPublicidad', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Advertising Imagen',
      },
    },
  })
  async publicidadImagenUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const publicidadImagenPath = path.join(__dirname, UploadFilesKeys.PUBLICIDAD_IMAGE_PATH);
    let res = await this.StoreFileToPath(publicidadImagenPath, UploadFilesKeys.PUBLICIDAD_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  /**
   * Add or replace the profile photo of a usuario by usuarioId
   * @param request
   * @param usuarioId
   * @param response
   */
  @post('/usuarioProfilePhoto', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Usuario Photo',
      },
    },
  })
  async usuarioPhotoUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('usuarioId') usuarioId: string,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const usuarioPhotoPath = path.join(__dirname, UploadFilesKeys.USUARIO_PROFILE_PHOTO_PATH);
    let res = await this.StoreFileToPath(usuarioPhotoPath, UploadFilesKeys.USUARIO_PROFILE_PHOTO_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        let u: Usuario = await this.usuarioRepository.findById(usuarioId);
        if (u) {
          u.foto_perfil = filename;
          this.usuarioRepository.replaceById(usuarioId, u);
          return {filename: filename};
        }
      }
    }
    return res;
  }

  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path)
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('This format file is not supported.'));
        },
        limits: {
          fileSize: UploadFilesKeys.MAX_FILE_SIZE
        }
      },
      ).single(fieldname);  //si fueran varios seria .array()
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

  /**
   * Add a new image or replace another one that exists of a product
   * @param request
   * @param response
   * @param videojuegoId
   * @param imageId if this parameter is empty then the images will be added, on the contrary it will be replaced
   */
  @post('/videojuegoImagen', {
    responses: {
      200: {
        content: {
          'application/json': {
          },
        },
        description: 'Videojuego Imagen',
      },
    },
  })
  async productImagenUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('videojuegoId') videojuegoId: typeof Videojuego.prototype.id,
    @param.query.number('order') order: number,
    @param.query.string('imageId') imageId: typeof Imagen.prototype.id,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const productPath = path.join(__dirname, UploadFilesKeys.VIDEOJUEGO_IMAGE_PATH);
    let res = await this.StoreFileToPath(productPath, UploadFilesKeys.VIDEOJUEGO_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        let img: Imagen;
        if (imageId) {
          img = await this.imagenRepository.findById(imageId);
          img.path = filename;
          img.order = order;
          await this.imagenRepository.replaceById(imageId, img);
        } else {
          img = new Imagen({
            path: filename,
            order: order,
            videojuegoId: videojuegoId ?? ''
          });
          await this.imagenRepository.create(img);
        }
        return {filename: filename};
      }
    }
    return res;
  }

}
