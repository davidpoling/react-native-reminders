export default class ShoppingListItem {
  id: string;
  text: string;
  checked: boolean;

  constructor(text: string) {
    this.text = text;
  }
}
