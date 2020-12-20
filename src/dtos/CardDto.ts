import { CardTypeEnum } from '../enums/CardTypeEnum';

export interface CardDto {
  id: string;
  returnDate: string;
  type: number;
  author: string;
  title: string;
}
