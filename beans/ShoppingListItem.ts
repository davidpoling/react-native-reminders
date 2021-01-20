export default class ShoppingListItem {
  id: number;
  text: string;
  complete: boolean;

  constructor(text: string) {
    this.id = Math.random();
    this.text = text;
  }
}
