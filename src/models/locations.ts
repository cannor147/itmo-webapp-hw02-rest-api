import { DataTypes } from 'sequelize';

import ExtendedModel from './extended-model';

class Locations extends ExtendedModel {
  static NAME_MAX_LENGTH = 50;
  static DESCRIPTION_MAX_LENGTH = 2048;
  static GEO_MAX_LENGTH = 100;

  static attributes = {
    name: {
      type: DataTypes.STRING(Locations.NAME_MAX_LENGTH),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(Locations.DESCRIPTION_MAX_LENGTH)
    },
    city: {
      type: DataTypes.STRING(Locations.GEO_MAX_LENGTH)
    },
    country: {
      type: DataTypes.STRING(Locations.GEO_MAX_LENGTH)
    },
    visited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  };

  static changeVisited(id: number, visited: boolean): Promise<[number, Locations[]]> {
    return Locations.update(
      {
        visited: visited
      },
      {
        where: {
          id: id
        }
      }
    );
  }

  static changeDescription(id: number, description: string | null): Promise<[number, Locations[]]> {
    return Locations.update(
      {
        description: description
      },
      {
        where: {
          id: id
        }
      }
    );
  }
}

export default Locations;
