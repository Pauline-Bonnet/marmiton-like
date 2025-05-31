export interface Recipe {
    recipe_id: number;
    title: string;
    description: string;
    instructions: string;
    preparation_time: number;
    cooking_time: number;
    nb_eaters: number;
    image: string;
    user_id: number;
    creation_date?: string;
}

export interface RecipeQueryParams {
    category?: string;
    maxTime?: number | null;
    search?: string;
    page: number;
    limit: number;
}