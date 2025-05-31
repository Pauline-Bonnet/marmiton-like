import { RowDataPacket } from "mysql2";
import { Recipe, RecipeQueryParams } from "../types/recipe";
import database from "./db";

export async function findRecipes ({
    category,
    maxTime,
    search,
    page, 
    limit, 
}: RecipeQueryParams): Promise<Recipe[]> {
    console.log('KIKOO')
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
}

export async function getLastTenRecipes(): Promise<Recipe[]> {
  const [rows] = await database.query<RowDataPacket[]>("SELECT * FROM recipe ORDER BY creation_date DESC LIMIT 10");
  return rows as Recipe[];
}
