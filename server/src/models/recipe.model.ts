import { RowDataPacket } from "mysql2";
import { Recipe, RecipeQueryParams, RecipeUpdate } from "../types/recipe";
import database from "./db";

export async function findRecipes ({
    category,
    maxTime,
    search,
    page, 
    limit, 
}: RecipeQueryParams): Promise<Recipe[]> {
    let sql = 'SELECT * FROM recipe AS r';
    const params: (string | number)[] = [];
    const conditions: string[] = [];

    if (category) {
        sql += ` JOIN category_recipe AS cr ON cr.recipe_id = r.recipe_id
         JOIN category AS c ON c.category_id = cr.category_id `;


        conditions.push(`LOWER(c.name) = LOWER(?)`);
        params.push(category);
    }

    if (maxTime !== null && maxTime !== undefined) {
         conditions.push(`(r.preparation_time + r.cooking_time) <= ?`);
         params.push(maxTime);
    }

    if (search) {
        conditions.push(`LOWER(r.title) LIKE ?`);
        params.push(`%${(search as string).toLowerCase()}%`);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY r.creation_date DESC';
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit);
    params.push((page - 1) * limit);

    console.log('SQL', sql)
    console.log('PARAMS', params)

    const [rows] = await database.query<RowDataPacket[]>(sql, params);
    return rows as Recipe[];
};

export async function findLastTenRecipes(): Promise<Recipe[]> {
  const [rows] = await database.query<RowDataPacket[]>("SELECT * FROM recipe ORDER BY creation_date DESC LIMIT 10");
  return rows as Recipe[];
};

export async function findRecipeById(id: number): Promise<Recipe | null> {
    const [rows] = await database.query<RowDataPacket[]>(`
        SELECT * FROM recipe WHERE recipe_id = ?`, 
        [id]
    );

    return rows[0] as Recipe | null;
} 

export async function insertRecipe(newRecipe: Recipe): Promise<Recipe> {
      const {
    title,
    description,
    instructions,
    preparation_time,
    cooking_time,
    nb_eaters,
    image,
    user_id,
  } = newRecipe;

    const [result]: any = await database.query(
        `INSERT INTO recipe (title, description, instructions, preparation_time, cooking_time, nb_eaters, image, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description, instructions, preparation_time, cooking_time, nb_eaters, image, user_id]
    );

    return { recipe_id: result.insertId, title, description, instructions, preparation_time, cooking_time, nb_eaters, image, user_id };
};

export async function updateRecipe(id: number, updatedData: RecipeUpdate) {
      const fields = Object.keys(updatedData);
  const values = Object.values(updatedData);

  if (fields.length === 0) return null;

  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const [result]: any = await database.query(
    `UPDATE recipe SET ${setClause} WHERE recipe_id = ?`,
    [...values, id]
  );

  if (result.affectedRows === 0) return null;

  return await findRecipeById(id) ?? null;
}

export async function deleteRecipeById(id: number): Promise<boolean> {
  const [result]: any = await database.query("DELETE FROM recipe WHERE recipe_id = ?", [id]);
  return result.affectedRows > 0;
}
