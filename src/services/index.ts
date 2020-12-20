import { BookDto } from '../dtos/BookDto';
import { CardDto } from '../dtos/CardDto';
import { UserDto } from '../dtos/UserDto';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractControl } from './AbstractControl';

export const usersControl = new AbstractControl<UserDto>(EntityEnum.Users);
export const catalogControl = new AbstractControl<BookDto>(EntityEnum.Catalog);
export const cardControl = new AbstractControl<CardDto>(EntityEnum.Card);
