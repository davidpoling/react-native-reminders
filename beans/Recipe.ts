export default class Recipe {
  id: number;
  title: string;
  instructions: string;
  ingredients: string[];

  constructor(title: string, instructions: string, ingredients: string[]) {
    this.title = title;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}
