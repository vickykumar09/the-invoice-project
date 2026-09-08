import { Item, ItemCounts, ItemForm, ItemRowData } from "@/features/catalog/types";
import { Category } from "@/features/masters/types";
import { getDB } from "../../../libs/db/database";
import * as Crypto from "expo-crypto";
import { businessInfo } from "@/constants/business";
import { validateItem } from "../utils/validators";
import { Result } from "@/types/shared";
import { FetchFnParams } from "@/hooks/usePagination";

// Creates a new catalog item in the items table.
export const createCatalogItem = async (
  insertData: ItemForm
): Promise<Result<Item>> => {
  // 1. Calculate Values
  const now = new Date().toISOString();
  
  // 2. Generate Insert Item Object
  const item: Item = {
    ...insertData,
    id: Crypto.randomUUID(),
    business_id: businessInfo.code,
    is_active: true,
    created_at: now,
    updated_at: now,
    is_synced: false,
  };

  // 3. Validate Insert Item Object
  const errors = validateItem(item);
  console.log(errors)

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid catalog item.",
        fields: errors,
      },
    };
  }

  // 4. DB operation
  const columns = Object.keys(item);
  const values = Object.values(item);

  const placeholders = values.map(() => "?").join(", ");

  try {
    const db = await getDB();
    await db.runAsync(
      `
      INSERT INTO items (${columns.join(", ")})
      VALUES (${placeholders})
      `,
      values
    );

    return {
      success: true,
      data: item,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to create catalog item.",
      },
    };
  }
};

// Deletes a catalog item from the items table.
export const deleteCatalogItem = async (itemId: string) => {
  try {
    const db = await getDB();
    const res = await db.runAsync(
      `
      DELETE FROM items
      WHERE id = ?
      `,
      itemId

    )

    if (res.changes === 0) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND_ERROR",
          message: "Item not found",
        },
      };
    }

    return {
      success: true,
      data: undefined,
    };

  } catch (error) {
    console.log(error)
    return { 
      success: false, 
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to delete item."
      }
    };
  }
}

// Fetches catalog items with pagination and optional search query, ordered by latest update.
export const getCatalogItems = async ({
  limit,
  offset,
  query
}: FetchFnParams): Promise<ItemRowData[]> => {
  try {
    const db = await getDB();
    const searchQuery = query?.trim();

    if(searchQuery) {
      return db.getAllAsync<ItemRowData>(
        `
        SELECT
          id,
          type,
          name,
          description,
          updated_at
        FROM items
        WHERE name LIKE ?
        ORDER BY updated_at DESC
        LIMIT ? OFFSET ?
        `,
        [`%${searchQuery}%`, limit, offset]
      );
    }

    const res = await db.getAllAsync<ItemRowData>(
      `
      SELECT 
        id,
        type,
        name,
        description,
        updated_at 
      FROM items 
      ORDER BY updated_at
      DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    )

    return res;
  } catch (error) {
    throw error
  }
};

// Get number of products and services in items table
export async function getCatalogItemCounts(): Promise<ItemCounts> {
  try {
    const db = await getDB();
    const result = await db.getFirstAsync<{
      product_count: number;
      service_count: number;
    }>(`
      SELECT
        COUNT(CASE WHEN type = 'product' THEN 1 END) AS product_count,
        COUNT(CASE WHEN type = 'service' THEN 1 END) AS service_count
      FROM items
    `);

    return {
      productCount: result?.product_count ?? 0,
      serviceCount: result?.service_count ?? 0,
    };
  } catch (error) {
    throw error;
  }
}

// Retrieves catalog item data from the items table.
export const getCatalogItem = async (id: string) => {
  try {
    const db = await getDB();
    const res: any = await db.getAllAsync(
      `
      SELECT
        i.*,
        mu.name AS measure_unit_name,
        mu.symbol AS measure_unit_symbol,
        c.name AS category_name
      FROM items i
      LEFT JOIN measure_units mu
        ON mu.id = i.measure_unit_id
      LEFT JOIN categories c
        ON c.id = i.category_id
      WHERE i.id = ?;
      `,
      [id]
    ) 
    console.log('res' ,res)
    return res.length ? res[0] : null

  } catch (error) {
    throw error
  }
}




/**
  Get Catalog Items By Modification (Recent -> Oldest) : Used for Recently Modified & All Items
  export const getItems = async (limit: number, offset: number) => {
    try {
      const db = await getDB();
      const res: Item[] = await db.getAllAsync(
        'SELECT * FROM items ORDER BY updatedAt DESC LIMIT ? OFFSET ?',
        [limit, offset]
      ) 
      // console.log('res', res.length)
      return res;
      
    } catch (error) {
      throw error
    }
  }
 */

// Get All Categories
export const getAllCategories = async () => {
  try {
    const db = await getDB();
    const res: Category[] = await db.getAllAsync(
      "SELECT * FROM categories"
    )
    // console.log('allpc:', res)
    return res;
  } catch (error) {
    throw error
  }
};

// Get All Parent Categories
export const getAllParentCategories = async () => {
  try {
    const db = await getDB();
    const res: Category[] = await db.getAllAsync(
      "SELECT * FROM categories WHERE parentId IS NULL",
    )
    // console.log('allpc:', res)
    return res;
  } catch (error) {
    throw error
  }
};

// Get Parent Categories BY Type
export const getParentCategories = async (type: 'product' | 'service') => {
  try {
    const db = await getDB();
    const res: Category[] = await db.getAllAsync(
      'SELECT * FROM categories WHERE parentId IS NULL AND type=?',
      [type]
    ) 
    // console.log(type, res.length)
    return res;

  } catch (error) {
    throw error
  }
};

// Get Category Item Count Including Descendants
export const getCategoryItemCountIncludingDescendants = async (categoryId: number): Promise<number> => {
  const db = await getDB();

  // Recursive helper to collect all descendant IDs
  const getAllDescendantIds = async (id: number): Promise<number[]> => {
    const children = await getChildCategories(id);
    let allIds: number[] = children.map(c => c.id);

    for (const child of children) {
      const descendants = await getAllDescendantIds(child.id);
      allIds = [...allIds, ...descendants];
    }

    return allIds;
  };

  // Get all descendant IDs
  const descendantIds = await getAllDescendantIds(categoryId);
  const allIds = [categoryId, ...descendantIds];

  // Generate placeholders for SQL query
  const placeholders = allIds.map(() => "?").join(",");

  // Count all items in this category + descendants
  const row: any = await db.getFirstAsync(
    `SELECT COUNT(*) as count FROM items WHERE categoryId IN (${placeholders})`,
    allIds
  );

  return row.count;
};
 
// Get All Child Categories Of A Category
export const getChildCategories = async (parentId: number) => {
  try {
    const db = await getDB();
    const res: Category[] = await db.getAllAsync(
      "SELECT * FROM categories WHERE parentId = ?",
      [parentId]
    )
    // console.log('allpc', res)
    return res;
  } catch (error) {
    throw error
  }
};


export const getCategoryById = async (id: number) => {
  try {
    const db = await getDB();
    const res: any = await db.getAllAsync(
      'SELECT * FROM categories WHERE id=?',
      [id]
    ) 
    // console.log(res)
    return res[0];

  } catch (error) {
    throw error
  }
}


export const getSubcategories = async (category_id: number) => {
  try {
    const db = await getDB();
    const res: any = await db.getAllAsync(
      'SELECT * FROM categories WHERE parentId=?',
      [category_id]
    ) 
    // console.log(res)
    return res;

  } catch (error) {
    throw error
  }
}


// Get Category Path
export const getCategoryPath = async (category_id: number) => {
  let path = [];
  let currentId = category_id;

  const db = await getDB();
  while (currentId) {
    const rows: Category[] = await db.getAllAsync(
      "SELECT name, parentId FROM categories WHERE id = ?",
      [currentId]
    );

    if (rows.length === 0) break;

    const { name, parent_id } = rows[0];

    path.push(name);        // only push name
    currentId = parent_id as number;  // go upward
  }

  return path; // root → leaf
};

// Get Catalog Items By Creation (New -> Old) : Used for Recently Modified & All Items
export const getItemsByCreated = async (limit: number, offset: number) => {
  try {
    const db = await getDB();
    const res = await db.getAllAsync(
      'SELECT * FROM items ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    ) 
    // console.log('res', res)
    return res;
    
  } catch (error) {
    throw error
  }
}

// Get Total Items Count - Product Or Service
export const getItemsCount = async (type: 'product' | 'service') => {
  try {
    const db = await getDB();
    const res: any = await db.getAllAsync(
      'SELECT COUNT(*) AS count FROM items WHERE type=?',
      [type]
    )
    
    // console.log(res[0].count)
    const count: number = res[0].count
    return count;
    
  } catch (error) {
    throw error
  }
}

export const getItemsByCategoryId = async (id: number) => {
  try {
    const db = await getDB();
    const res: any = await db.getAllAsync(
      'SELECT * FROM items WHERE categoryId=?',
      [id]
    ) 
    // console.log(res)
    return res;

  } catch (error) {
    throw error
  }
}

// Get Unassigned Items Count
export const getUnassignedItemsCount = async (type: 'product' | 'service') => {
  try {
    const db = await getDB();
    const res: any = await db.getAllAsync(
      'SELECT COUNT(*) AS count FROM items WHERE categoryId IS NULL AND type=?',
      [type]
    ) 
    // console.log(res)
    const count: number = res[0].count
    return count;

  } catch (error) {
    throw error
  }
}

// Get Unassigned Item
export const getUnassignedItem = async (type: 'product' | 'service', limit: number, offset: number) => {
  try {
    const db = await getDB();
    const res: any = await db.getAllAsync(
      'SELECT * FROM items WHERE categoryId IS NULL LIMIT ? OFFSET ?',
      [limit, offset]
    ) 
    // console.log(res.length)
    return res;

  } catch (error) {
    throw error
  }
}