export type Recipe = {
  recipeId: number;
  recipeTitle: string;
  recipeUrl: string;
  foodImageUrl?: string;
  mediumImageUrl?: string;
  smallImageUrl?: string;
  recipeDescription?: string;
  recipeMaterial?: string[]; // 材料名の配列（分量は含まれない）
  recipeIndication?: string; // 調理時間目安
  recipeCost?: string; // 費用目安
  rank: number; // 1..4
};
