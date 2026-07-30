import { supabase } from "../supabase/supabase";

// Get All Products
export const getProducts = async () => {
  return await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
};

// Delete Product
export const deleteProduct = async (id) => {
  return await supabase
    .from("products")
    .delete()
    .eq("id", id);
};

// Get Single Product
export const getProductById = async (id) => {
  return await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
};

// Update Product
export const updateProduct = async (id, product) => {
  return await supabase
    .from("products")
    .update(product)
    .eq("id", id);
};