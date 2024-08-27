import mongoose from "mongoose";

const fetchData = async (req, res) => {
  try {
    // Fetch data from 'food_items' collection
    const foodItemsCollection = mongoose.connection.db.collection("foodItems");
    const foodItemsData = await foodItemsCollection.find({}).toArray();
    
    // Fetch data from 'foodCategory' collection
    const foodCategoryCollection = mongoose.connection.db.collection("Sample");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Log the data to verify
    // console.log(foodItemsData);
    // console.log(foodCategoryData);

    // Store the fetched data in global variables
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    // Send a response with the fetched data
    res.status(200).json({ status: 200, message: "Data fetched!", data: { food_items: foodItemsData, foodCategory: foodCategoryData } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal server error", error: err.message });
  }
};

export default fetchData;
