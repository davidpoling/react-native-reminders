export default class ShoppingListItem {
  id: string;
  text: string;
  complete: boolean;

  constructor(text: string) {
    this.text = text;
  }
}
