import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Categoria, ConsolaJuego, Oferta, Videojuego, VideojuegoRelations, Imagen} from '../models';
import {CategoriaRepository} from './categoria.repository';
import {ConsolaJuegoRepository} from './consola-juego.repository';
import {OfertaRepository} from './oferta.repository';
import {ImagenRepository} from './imagen.repository';

export class VideojuegoRepository extends DefaultCrudRepository<
  Videojuego,
  typeof Videojuego.prototype.id,
  VideojuegoRelations
  > {

  public readonly consolaJuegos: HasManyRepositoryFactory<ConsolaJuego, typeof Videojuego.prototype.id>;

  public readonly categoria: BelongsToAccessor<Categoria, typeof Videojuego.prototype.id>;

  public readonly ofertas: HasManyRepositoryFactory<Oferta, typeof Videojuego.prototype.id>;

  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Videojuego.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ConsolaJuegoRepository') protected consolaJuegoRepositoryGetter: Getter<ConsolaJuegoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('OfertaRepository') protected ofertaRepositoryGetter: Getter<OfertaRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>,
  ) {
    super(Videojuego, dataSource);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
    this.ofertas = this.createHasManyRepositoryFactoryFor('ofertas', ofertaRepositoryGetter,);
    this.registerInclusionResolver('ofertas', this.ofertas.inclusionResolver);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
    this.consolaJuegos = this.createHasManyRepositoryFactoryFor('consolaJuegos', consolaJuegoRepositoryGetter,);
    this.registerInclusionResolver('consolaJuegos', this.consolaJuegos.inclusionResolver);
    this.ofertas = this.createHasManyRepositoryFactoryFor('ofertas', ofertaRepositoryGetter,);
    this.registerInclusionResolver('ofertas', this.ofertas.inclusionResolver);
  }
}
