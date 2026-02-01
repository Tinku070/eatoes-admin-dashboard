require("dotenv").config();
const mongoose = require("mongoose");

const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

const seedData = async () => {
  try {
    await connectDB();

    console.log("🌱 Seeding database...");

    // Clear existing data
    await MenuItem.deleteMany();
    await Order.deleteMany();

    // -------- MENU ITEMS (15) --------
    const menuItems = await MenuItem.insertMany([
      // Appetizers
      { name: "Spring Rolls", category: "Appetizer", price: 80, ingredients: ["Vegetables"], isAvailable: true },
      { name: "Garlic Bread", category: "Appetizer", price: 70, ingredients: ["Bread", "Garlic"], isAvailable: true },
      { name: "Paneer Tikka", category: "Appetizer", price: 150, ingredients: ["Paneer"], isAvailable: false },

      // Main Course
      { name: "Veg Burger", category: "Main Course", price: 120, ingredients: ["Bun", "Patty"], isAvailable: true },
      { name: "Veg Pizza", category: "Main Course", price: 250, ingredients: ["Cheese"], isAvailable: true },
      { name: "Pasta Alfredo", category: "Main Course", price: 220, ingredients: ["Cream"], isAvailable: true },
      { name: "Fried Rice", category: "Main Course", price: 180, ingredients: ["Rice"], isAvailable: true },

      // Desserts
      { name: "Gulab Jamun", category: "Dessert", price: 90, ingredients: ["Milk"], isAvailable: true },
      { name: "Ice Cream", category: "Dessert", price: 100, ingredients: ["Milk"], isAvailable: true },
      { name: "Brownie", category: "Dessert", price: 130, ingredients: ["Chocolate"], isAvailable: false },

      // Beverages
      { name: "Coke", category: "Beverage", price: 40, ingredients: ["Soda"], isAvailable: true },
      { name: "Orange Juice", category: "Beverage", price: 60, ingredients: ["Orange"], isAvailable: true },
      { name: "Cold Coffee", category: "Beverage", price: 90, ingredients: ["Coffee"], isAvailable: true },
      { name: "Tea", category: "Beverage", price: 30, ingredients: ["Tea Leaves"], isAvailable: true },
      { name: "Lemonade", category: "Beverage", price: 50, ingredients: ["Lemon"], isAvailable: true },
    ]);

    // -------- ORDERS (10) --------
    const orders = [
      {
        customerName: "Rahul",
        tableNumber: 1,
        items: [{ menuItem: menuItems[3]._id, quantity: 2, price: 120 }],
        totalAmount: 240,
        status: "Pending",
      },
      {
        customerName: "Anita",
        tableNumber: 2,
        items: [{ menuItem: menuItems[4]._id, quantity: 1, price: 250 }],
        totalAmount: 250,
        status: "Preparing",
      },
      {
        customerName: "Suresh",
        tableNumber: 3,
        items: [{ menuItem: menuItems[7]._id, quantity: 3, price: 90 }],
        totalAmount: 270,
        status: "Ready",
      },
      {
        customerName: "Priya",
        tableNumber: 4,
        items: [{ menuItem: menuItems[10]._id, quantity: 2, price: 40 }],
        totalAmount: 80,
        status: "Delivered",
      },
      {
        customerName: "Amit",
        tableNumber: 5,
        items: [{ menuItem: menuItems[5]._id, quantity: 1, price: 220 }],
        totalAmount: 220,
        status: "Cancelled",
      },
    ];

    await Order.insertMany(orders);

    console.log("✅ Seeding completed successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
