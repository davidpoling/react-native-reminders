export default class ShoppingListItem {
  id: number;
  text: string;
  complete: boolean;

  constructor(text: string) {
    this.text = text;
  }
}
