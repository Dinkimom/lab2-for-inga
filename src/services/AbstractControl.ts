import axios, { AxiosInstance } from 'axios';
import { serverEntryPoint } from '../constants/serverEntryPoint';
import { EntityEnum } from '../enums/EntityEnum';
import { Filter } from '../types/Filter';

export class AbstractControl<T> {
  private entity: EntityEnum;
  protected axios: AxiosInstance;

  public constructor(entity: EntityEnum) {
    this.entity = entity;
    this.axios = axios.create({
      baseURL: `${serverEntryPoint}/${entity}`,
      timeout: 20000,
    });
  }

  public getAll = (filter?: Filter) => {
    return this.axios.get('/', {
      params: filter,
    });
  };

  public create = (data: T & { id: undefined }) => {
    if (this.entity === EntityEnum.Catalog) {
      return this.addCard(data);
    }

    return this.axios.post('/', data);
  };

  public update = (data: any) => {
    const { id } = data;

    delete data.id;

    return this.axios.put('/' + id, data);
  };

  public remove = (id: string) => {
    return this.axios.delete('/' + id);
  };

  public addCard = (data: any) => {
    return axios.post(serverEntryPoint + '/card', data);
  };
}
