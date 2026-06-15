# pgAdmin Setup Guide for PostgreSQL

Follow these steps to set up the PostgreSQL database for the Product Catalog Application.

## Step 1: Create Database
1. Open pgAdmin 4 and connect to your local PostgreSQL server.
2. Right-click on **Databases** > **Create** > **Database**.
3. Set the Database name to: `product_catalog`
4. Click **Save**.

## Step 2: Run Schema Script
1. Right-click on the newly created `product_catalog` database.
2. Select **Query Tool**.
3. Open the `database/schema.sql` file from this project.
4. Copy the contents and paste them into the Query Tool.
5. Click the **Execute/Refresh** button (or press `F5`).
6. Verify that the tables (`categories`, `products`, `pricing`, `inventory`) are created under **Schemas** > **public** > **Tables**.

## Step 3: Run Seed Script
1. Clear the Query Tool (or open a new one for `product_catalog`).
2. Open the `database/seed.sql` file from this project.
3. Copy the contents and paste them into the Query Tool.
4. Click the **Execute/Refresh** button (or press `F5`).
5. This will insert 20 categories, 10 sample products, and their associated pricing and inventory.

## Step 4: Verify Data
1. Right-click on the `products` table.
2. Select **View/Edit Data** > **All Rows**.
3. You should see the inserted sample products.

You are now ready to run the Spring Boot backend!
