import { db } from "./db";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Restaurant POS Backend is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "OK",
    service: "Restaurant POS API",
  });
});

app.get("/api/db-test", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");

    res.json({
      message: "MySQL connected successfully",
      data: rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.get("/api/menu", async (_req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, price, category, available FROM menu_items"
    );

    res.json(rows);
  } catch (error) {
    console.error("Menu API error:", error);

    res.status(500).json({
      message: "Failed to load menu items",
    });
  }
});

app.post("/api/menu", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const [result] = await db.query(
      "INSERT INTO menu_items (name, price, category) VALUES (?, ?, ?)",
      [name, price, category]
    );

    res.status(201).json({
      message: "Menu item added successfully",
      result,
    });
  } catch (error) {
    console.error("Add menu item error:", error);

    res.status(500).json({
      message: "Failed to add menu item",
    });
  }
});

app.put("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    await db.query(
      "UPDATE menu_items SET name = ?, price = ?, category = ? WHERE id = ?",
      [name, price, category, id]
    );

    res.json({
      message: "Menu item updated successfully",
    });
  } catch (error) {
    console.error("Update menu item error:", error);

    res.status(500).json({
      message: "Failed to update menu item",
    });
  }
});


app.delete("/api/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM menu_items WHERE id = ?",
      [id]
    );

    res.json({
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    console.error("Delete menu item error:", error);

    res.status(500).json({
      message: "Failed to delete menu item",
    });
  }
});

app.post("/api/orders", async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { cart, totalAmount } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    await connection.beginTransaction();

    const [orderResult]: any = await connection.query(
      "INSERT INTO orders (total_amount, status) VALUES (?, ?)",
      [totalAmount, "Placed"]
    );

    const orderId = orderResult.insertId;

    for (const item of cart) {
      await connection.query(
        `INSERT INTO order_items
        (order_id, menu_item_id, item_name, price, quantity)
        VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          item.id,
          item.name,
          item.price,
          item.quantity,
        ]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Place order error:", error);

    res.status(500).json({
      message: "Failed to place order",
    });
  } finally {
    connection.release();
  }
});

app.get("/api/orders", async (_req, res) => {
  try {
    const [orders]: any = await db.query(
      `SELECT id, total_amount, status, created_at
       FROM orders
       ORDER BY created_at DESC`
    );

    const ordersWithItems = [];

    for (const order of orders) {
      const [items]: any = await db.query(
        `SELECT id, menu_item_id, item_name, price, quantity
         FROM order_items
         WHERE order_id = ?`,
        [order.id]
      );

      ordersWithItems.push({
        id: order.id,
        total: Number(order.total_amount),
        status: order.status,
        createdAt: order.created_at,
        items: items.map((item: any) => ({
          id: item.id,
          menuItemId: item.menu_item_id,
          name: item.item_name,
          price: Number(item.price),
          quantity: item.quantity,
        })),
      });
    }

    res.json(ordersWithItems);
  } catch (error) {
    console.error("Fetch orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

app.get("/api/inventory", async (_req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, name, stock, unit, reorder_level
       FROM inventory
       ORDER BY id`
    );

    res.json(rows);
  } catch (error) {
    console.error("Fetch inventory error:", error);

    res.status(500).json({
      message: "Failed to fetch inventory",
    });
  }
});

app.put("/api/inventory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    await db.query(
      "UPDATE inventory SET stock = ? WHERE id = ?",
      [stock, id]
    );

    res.json({
      message: "Inventory updated successfully",
    });
  } catch (error) {
    console.error("Update inventory error:", error);

    res.status(500).json({
      message: "Failed to update inventory",
    });
  }
});

app.get("/api/dashboard", async (_req, res) => {
  try {
    const [orderRows]: any = await db.query(
      `SELECT 
         COUNT(*) AS totalOrders,
         COALESCE(SUM(total_amount), 0) AS totalRevenue
       FROM orders`
    );

    const [menuRows]: any = await db.query(
      `SELECT COUNT(*) AS totalMenuItems
       FROM menu_items`
    );

    const [inventoryRows]: any = await db.query(
      `SELECT COUNT(*) AS lowStockItems
       FROM inventory
       WHERE stock <= reorder_level`
    );

    res.json({
      totalOrders: Number(orderRows[0].totalOrders),
      totalRevenue: Number(orderRows[0].totalRevenue),
      totalMenuItems: Number(menuRows[0].totalMenuItems),
      lowStockItems: Number(inventoryRows[0].lowStockItems),
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      message: "Failed to load dashboard data",
    });
  }
});

app.get("/api/tables", async (_req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, name, seats, status, area
       FROM restaurant_tables
       ORDER BY id`
    );

    res.json(rows);
  } catch (error) {
    console.error("Fetch tables error:", error);
    res.status(500).json({
      message: "Failed to fetch restaurant tables",
    });
  }
});

app.put("/api/tables/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Available",
      "Occupied",
      "Reserved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid table status",
      });
    }

    const [result]: any = await db.query(
      `UPDATE restaurant_tables
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    res.json({
      message: "Table status updated successfully",
    });
  } catch (error) {
    console.error("Update table error:", error);
    res.status(500).json({
      message: "Failed to update table status",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});