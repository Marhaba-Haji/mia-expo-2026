-- Sample Exhibitor Data for MIA Expo 2026
-- Run this script to populate the exhibitors table with 20 diverse records

INSERT INTO exhibitors (company_name, contact_person, email, phone, booth_number, package_type, website, description, industry, status) VALUES

-- Infrastructure & Construction (3 companies)
('Khan Infrastructure Ltd.', 'Ahmed Khan', 'contact@khaninfra.com', '+91-22-1234-5678', 'A-101', 'Premium', 'https://khaninfra.com', 'Leading construction and infrastructure development company specializing in smart cities and sustainable building solutions.', 'Infrastructure & Real Estate', 'approved'),

('Desai Builders & Associates', 'Rajesh Desai', 'info@desaibuilders.com', '+91-79-2345-6789', 'A-205', 'Standard', 'https://desaibuilders.com', 'Residential and commercial construction with 25+ years of experience in quality building projects.', 'Infrastructure & Real Estate', 'approved'),

('Urban Development Corp', 'Fatima Sheikh', 'contact@urbandevelopment.in', '+91-44-3456-7890', 'A-310', 'Premium', 'https://urbandevelopment.in', 'Smart city solutions, urban planning, and sustainable infrastructure development across India.', 'Infrastructure & Real Estate', 'approved'),

-- Manufacturing & Machinery (4 companies)
('Singh Manufacturing Co.', 'Priya Singh', 'info@singhmfg.com', '+91-161-234-5678', 'B-102', 'Standard', 'https://singhmfg.com', 'Advanced manufacturing solutions for automotive and industrial sectors with cutting-edge automation technology.', 'Manufacturing & Machinery', 'approved'),

('Patel Engineering Works', 'Vikram Patel', 'sales@patelworks.com', '+91-20-3456-7890', 'B-208', 'Standard', 'https://patelworks.com', 'Precision engineering and custom machinery manufacturing for textile and packaging industries.', 'Manufacturing & Machinery', 'approved'),

('Modern Tech Industries', 'Arjun Reddy', 'contact@moderntechindia.com', '+91-40-4567-8901', 'B-315', 'Premium', 'https://moderntechindia.com', 'Industrial automation, robotics, and IoT-enabled manufacturing solutions for Industry 4.0.', 'Manufacturing & Machinery', 'approved'),

('Precision Tools Ltd.', 'Deepak Kumar', 'info@precisiontools.in', '+91-80-5678-9012', 'B-420', 'Startup', 'https://precisiontools.in', 'High-precision cutting tools and equipment for metalworking and manufacturing sectors.', 'Manufacturing & Machinery', 'approved'),

-- Healthcare & Pharmaceuticals (3 companies)
('St. Mary Healthcare', 'Dr. Mary Thomas', 'info@stmaryhealthcare.com', '+91-44-1234-5678', 'C-103', 'Premium', 'https://stmaryhealthcare.com', 'Advanced medical devices and healthcare solutions with focus on telemedicine and patient care technology.', 'Healthcare', 'approved'),

('MediCare Solutions', 'Dr. Rehman Ali', 'contact@medicaresolutions.in', '+91-22-6789-0123', 'C-209', 'Standard', 'https://medicaresolutions.in', 'Hospital equipment, diagnostic devices, and medical consumables for healthcare facilities.', 'Healthcare', 'approved'),

('Wellness Pharma', 'Anita Kapoor', 'info@wellnesspharma.com', '+91-11-7890-1234', 'C-314', 'Standard', 'https://wellnesspharma.com', 'Pharmaceutical manufacturing with focus on generic medicines and affordable healthcare solutions.', 'Healthcare', 'approved'),

-- Food & Beverage (3 companies)
('Noor Halal Foods', 'Fatima Noor', 'sales@noorhalalfoods.com', '+91-11-2345-6789', 'D-104', 'Standard', 'https://noorhalalfoods.com', 'Premium halal food products and beverages with international quality standards and innovative packaging.', 'Food & Beverage', 'approved'),

('Organic Farms Co.', 'Zara Irani', 'info@organicfarmsco.in', '+91-79-3456-7890', 'D-210', 'Premium', 'https://organicfarmsco.in', 'Organic farming and sustainable agriculture with premium organic products for health-conscious consumers.', 'Agriculture', 'approved'),

('Spice Masters India', 'Kabir Hussain', 'contact@spicemasters.in', '+91-484-4567-8901', 'D-315', 'Standard', 'https://spicemasters.in', 'Traditional Indian spices, herbs, and food ingredients with export quality standards.', 'Food & Beverage', 'approved'),

-- Textiles & Apparel (2 companies)
('Royal Fabrics Ltd.', 'Suresh Chandra', 'info@royalfabrics.com', '+91-141-5678-9012', 'E-105', 'Premium', 'https://royalfabrics.com', 'Premium textile manufacturing with traditional handloom and modern weaving techniques.', 'Textiles & Apparel', 'approved'),

('Fashion Forward Exports', 'Ayesha Khan', 'sales@fashionforward.in', '+91-11-6789-0123', 'E-211', 'Standard', 'https://fashionforward.in', 'Contemporary ethnic wear and fashion apparel for domestic and international markets.', 'Textiles & Apparel', 'approved'),

-- Technology & IT (2 companies)
('TechVista Solutions', 'Rohan Sharma', 'hello@techvista.in', '+91-80-7890-1234', 'F-106', 'Premium', 'https://techvista.in', 'Enterprise software solutions, cloud computing, and digital transformation services.', 'Technology', 'approved'),

('Digital India Labs', 'Priya Menon', 'contact@digitalindialabs.com', '+91-22-8901-2345', 'F-212', 'Startup', 'https://digitalindialabs.com', 'AI-powered business analytics, mobile apps, and custom software development.', 'Technology', 'approved'),

-- Hospitality & Tourism (2 companies)
('Mathew Hospitality Group', 'John Mathew', 'contact@mathewhospitality.com', '+91-484-123-4567', 'G-107', 'Standard', 'https://mathewhospitality.com', 'Premium hospitality services with luxury hotels, restaurants, and event management.', 'Hospitality', 'approved'),

('Heritage Tourism Co.', 'Aisha Rahman', 'info@heritagetourism.in', '+91-141-234-5678', 'G-213', 'Startup', 'https://heritagetourism.in', 'Curated heritage tours, cultural experiences, and travel packages across India.', 'Hospitality', 'approved'),

-- Renewable Energy (1 company)
('GreenPower Solutions', 'Mohammed Farooq', 'contact@greenpower.in', '+91-20-9012-3456', 'H-108', 'Premium', 'https://greenpower.in', 'Solar energy systems, wind power solutions, and sustainable energy consulting for businesses.', 'Energy', 'approved');

-- Verify the data
SELECT 
  company_name, 
  industry, 
  package_type, 
  booth_number,
  status
FROM exhibitors 
ORDER BY booth_number;



