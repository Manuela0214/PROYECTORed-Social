import {
  AuthenticationBindings,
  AuthenticationMetadata
} from '@loopback/authentication';
import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {repository} from '@loopback/repository';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {RegistroRepository} from '../repositories';
import {AuthService} from '../services/auth.service';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  authService: AuthService;

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository
  ) {

    this.authService = new AuthService(registroRepository)
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;

    switch (name) {
      case 'BasicStrategy':
        return new BasicStrategy(this.VerifyUser.bind(this));
      case 'TokenAdminStrategy':
        return new BearerStrategy(this.VerifyAdminToken.bind(this))
      case 'TokenUsuarioStrategy':
        return new BearerStrategy(this.VerifyUsuarioToken.bind(this))
      default:
        return Promise.reject(`The strategy ${name} is not available.`)
        break;
    }
  }

  VerifyUser(
    username: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {

    let registro = this.authService.Identify(username, password);
    return cb(null, registro);

    // find user by name & password
    // call cb(null, false) when user not found
    // call cb(null, user) when user is authenticated
  }

  VerifyToken(
    token: string,

    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(verification => {
      if (verification) {
        return cb(null, verification);
      } else {
        return cb(null, false);
      }

    });

  }

  VerifyUsuarioToken(
    token: string,

    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.rol == 1) {
        return cb(null, data);
      } else {
        return cb(null, false);
      }

    });

  }


  VerifyAdminToken(
    token: string,

    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.rol == 2) {
        return cb(null, data);
      } else {
        return cb(null, false);
      }

    });

  }
}



