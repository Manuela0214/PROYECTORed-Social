import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {Videojuego, VideojuegoRelations, Oferta, Categoria, ConsolaJuego} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OfertaRepository} from './oferta.repository';
import {CategoriaRepository} from './categoria.repository';
import {ConsolaJuegoRepository} from './consola-juego.repository';

export class VideojuegoRepository extends DefaultCrudRepository<
  Videojuego,
  typeof Videojuego.prototype.id,
  VideojuegoRelations
> {

  public readonly ofertas: HasManyRepositoryFactory<Oferta, typeof Videojuego.prototype.id>;

  public readonly categoria: BelongsToAccessor<Categoria, typeof Videojuego.prototype.id>;

  public readonly consolaJuego: HasOneRepositoryFactory<ConsolaJuego, typeof Videojuego.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OfertaRepository') protected ofertaRepositoryGetter: Getter<OfertaRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ConsolaJuegoRepository') protected consolaJuegoRepositoryGetter: Getter<ConsolaJuegoRepository>,
  ) {
    super(Videojuego, dataSource);
    this.consolaJuego = this.createHasOneRepositoryFactoryFor('consolaJuego', consolaJuegoRepositoryGetter);
    this.registerInclusionResolver('consolaJuego', this.consolaJuego.inclusionResolver);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
    this.ofertas = this.createHasManyRepositoryFactoryFor('ofertas', ofertaRepositoryGetter,);
    this.registerInclusionResolver('ofertas', this.ofertas.inclusionResolver);
  }
}
//ola