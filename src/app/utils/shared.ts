import { Constants } from './constants';
import { Zerado } from '../model/zerado';

export class Shared {
  constructor() {}

  public static initializeWebStorage(): void {
    if (localStorage.getItem(Constants.ZERADOS_KEY) != null) {
      return;
    }
  }
}
