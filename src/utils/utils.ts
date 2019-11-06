import { SearchParams } from '../exceptions/search.params';
import { Like } from 'typeorm';

export function removeEmptyFields(obj: object): object {
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
}

export function prepareSearchParams(params: Partial<SearchParams>) {
  const newParams: Partial<SearchParams> = {};
  Object.keys(params).forEach(key => {
    newParams[key] = Like(`%${params[key]}%`);
  });
  return newParams;
}
