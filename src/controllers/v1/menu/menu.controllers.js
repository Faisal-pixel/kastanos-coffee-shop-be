import supabase from "../../../config/supabase.js";

export const getMenuItems = async (req, res) => {
  try {
    const { data, error } = await supabase.from("menu_items").select("*");
    if (data.length === 0) {
      return res.status(200).json({ message: "No menu items found" });
    }
    if (error) {
      return res
        .status(500)
        .json({ error: "Error fetching menu", message: error.message });
    }
    const nariaConvertedMenuItems = data.map((item) => {
      return {
        ...item,
        price: item.price / 100,
      };
    });
    return res.status(200).json(nariaConvertedMenuItems);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
