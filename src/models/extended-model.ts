import { Model } from 'sequelize';

class ExtendedModel extends Model {
  static updateAll(values: object): Promise<[number, ExtendedModel[]]> {
    return this.update(values, {
      where: {}
    });
  }
}

export default ExtendedModel;
