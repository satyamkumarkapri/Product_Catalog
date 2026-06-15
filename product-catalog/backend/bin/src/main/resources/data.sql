-- Roles
INSERT INTO roles (role, rolename) VALUES
(1, 'Users'),
(2, 'Manager'),
(3, 'Admin');

-- Users
INSERT INTO users (full_name, email, password, role_level) VALUES
('System Admin', 'admin@example.com', '{noop}admin123', 3),
('Store Manager', 'manager@example.com', '{noop}manager123', 2),
('Regular User', 'user@example.com', '{noop}user123', 1);

-- Categories
INSERT INTO categories (name, description) VALUES
('Laptops', 'High-performance laptops for gaming and work'),
('Smartphones', 'Latest mobile devices and smartphones'),
('Headphones', 'Over-ear and in-ear audio devices'),
('Smartwatches', 'Wearable technology and fitness trackers'),
('Tablets', 'Portable touch-screen devices'),
('Cameras', 'Digital cameras and photography equipment'),
('Gaming Consoles', 'Video game consoles and accessories'),
('Monitors', 'High-resolution displays for PCs'),
('Keyboards', 'Mechanical and membrane keyboards'),
('Mice', 'Wired and wireless computer mice'),
('Printers', 'Home and office printing solutions'),
('Networking', 'Routers, switches, and networking gear'),
('Storage', 'HDDs, SSDs, and flash drives'),
('PC Components', 'CPUs, GPUs, RAM, and Motherboards'),
('Audio Systems', 'Speakers and home theater systems'),
('Software', 'Operating systems and application software'),
('Office Supplies', 'General office and desk accessories'),
('Cables', 'HDMI, USB, and power cables'),
('Adapters', 'Various port and power adapters'),
('Bags & Cases', 'Protective gear for electronics');

-- Products (10 examples, you can expand this to 100 via a script or add more manually)
INSERT INTO products (name, brand, sku, image_url, category_id) VALUES
('MacBook Pro M3', 'Apple', 'APP-MBP-M3', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', 1),
('ThinkPad X1 Carbon', 'Lenovo', 'LEN-X1-CAR', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80', 1),
('iPhone 15 Pro Max', 'Apple', 'APP-IP15-PM', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80', 2),
('Galaxy S24 Ultra', 'Samsung', 'SAM-S24-ULT', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80', 2),
('WH-1000XM5', 'Sony', 'SON-WH5', 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80', 3),
('QuietComfort Ultra', 'Bose', 'BOS-QC-ULT', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', 3),
('Apple Watch Series 9', 'Apple', 'APP-AW-S9', 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80', 4),
('Galaxy Watch 6 Classic', 'Samsung', 'SAM-GW6-CLA', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80', 4),
('iPad Pro M2', 'Apple', 'APP-IPAD-M2', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 5),
('EOS R5', 'Canon', 'CAN-EOS-R5', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', 6);

-- Pricing
INSERT INTO pricing (product_id, base_price, discount_price, currency) VALUES
(1, 1999.00, 1899.00, 'USD'),
(2, 1499.00, 1399.00, 'USD'),
(3, 1199.00, NULL, 'USD'),
(4, 1299.00, 1199.00, 'USD'),
(5, 398.00, 348.00, 'USD'),
(6, 429.00, 379.00, 'USD'),
(7, 399.00, NULL, 'USD'),
(8, 349.00, 299.00, 'USD'),
(9, 799.00, 749.00, 'USD'),
(10, 3899.00, 3699.00, 'USD');

-- Inventory
INSERT INTO inventory (product_id, stock_quantity, warehouse_location) VALUES
(1, 150, 'Warehouse A'),
(2, 200, 'Warehouse B'),
(3, 500, 'Warehouse A'),
(4, 300, 'Warehouse C'),
(5, 120, 'Warehouse A'),
(6, 90, 'Warehouse B'),
(7, 250, 'Warehouse A'),
(8, 180, 'Warehouse C'),
(9, 320, 'Warehouse B'),
(10, 45, 'Warehouse A');
