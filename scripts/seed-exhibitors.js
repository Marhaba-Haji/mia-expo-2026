// Run this in the browser console to seed exhibitor data
// Make sure you're on the site with the page loaded

(async () => {
  // Import supabase client
  const { supabase } = await import('/src/integrations/supabase/client.ts');

  const exhibitors = [
    // Infrastructure & Construction (3 companies)
    {
      company_name: 'Khan Infrastructure Ltd.',
      contact_person: 'Ahmed Khan',
      email: 'contact@khaninfra.com',
      phone: '+91-22-1234-5678',
      booth_number: 'A-101',
      package_type: 'Premium',
      website: 'https://khaninfra.com',
      description: 'Leading construction and infrastructure development company specializing in smart cities and sustainable building solutions.',
      industry: 'Infrastructure & Real Estate',
      status: 'approved'
    },
    {
      company_name: 'Desai Builders & Associates',
      contact_person: 'Rajesh Desai',
      email: 'info@desaibuilders.com',
      phone: '+91-79-2345-6789',
      booth_number: 'A-205',
      package_type: 'Standard',
      website: 'https://desaibuilders.com',
      description: 'Residential and commercial construction with 25+ years of experience in quality building projects.',
      industry: 'Infrastructure & Real Estate',
      status: 'approved'
    },
    {
      company_name: 'Urban Development Corp',
      contact_person: 'Fatima Sheikh',
      email: 'contact@urbandevelopment.in',
      phone: '+91-44-3456-7890',
      booth_number: 'A-310',
      package_type: 'Premium',
      website: 'https://urbandevelopment.in',
      description: 'Smart city solutions, urban planning, and sustainable infrastructure development across India.',
      industry: 'Infrastructure & Real Estate',
      status: 'approved'
    },

    // Manufacturing & Machinery (4 companies)
    {
      company_name: 'Singh Manufacturing Co.',
      contact_person: 'Priya Singh',
      email: 'info@singhmfg.com',
      phone: '+91-161-234-5678',
      booth_number: 'B-102',
      package_type: 'Standard',
      website: 'https://singhmfg.com',
      description: 'Advanced manufacturing solutions for automotive and industrial sectors with cutting-edge automation technology.',
      industry: 'Manufacturing & Machinery',
      status: 'approved'
    },
    {
      company_name: 'Patel Engineering Works',
      contact_person: 'Vikram Patel',
      email: 'sales@patelworks.com',
      phone: '+91-20-3456-7890',
      booth_number: 'B-208',
      package_type: 'Standard',
      website: 'https://patelworks.com',
      description: 'Precision engineering and custom machinery manufacturing for textile and packaging industries.',
      industry: 'Manufacturing & Machinery',
      status: 'approved'
    },
    {
      company_name: 'Modern Tech Industries',
      contact_person: 'Arjun Reddy',
      email: 'contact@moderntechindia.com',
      phone: '+91-40-4567-8901',
      booth_number: 'B-315',
      package_type: 'Premium',
      website: 'https://moderntechindia.com',
      description: 'Industrial automation, robotics, and IoT-enabled manufacturing solutions for Industry 4.0.',
      industry: 'Manufacturing & Machinery',
      status: 'approved'
    },
    {
      company_name: 'Precision Tools Ltd.',
      contact_person: 'Deepak Kumar',
      email: 'info@precisiontools.in',
      phone: '+91-80-5678-9012',
      booth_number: 'B-420',
      package_type: 'Startup',
      website: 'https://precisiontools.in',
      description: 'High-precision cutting tools and equipment for metalworking and manufacturing sectors.',
      industry: 'Manufacturing & Machinery',
      status: 'approved'
    },

    // Healthcare & Pharmaceuticals (3 companies)
    {
      company_name: 'St. Mary Healthcare',
      contact_person: 'Dr. Mary Thomas',
      email: 'info@stmaryhealthcare.com',
      phone: '+91-44-1234-5678',
      booth_number: 'C-103',
      package_type: 'Premium',
      website: 'https://stmaryhealthcare.com',
      description: 'Advanced medical devices and healthcare solutions with focus on telemedicine and patient care technology.',
      industry: 'Healthcare',
      status: 'approved'
    },
    {
      company_name: 'MediCare Solutions',
      contact_person: 'Dr. Rehman Ali',
      email: 'contact@medicaresolutions.in',
      phone: '+91-22-6789-0123',
      booth_number: 'C-209',
      package_type: 'Standard',
      website: 'https://medicaresolutions.in',
      description: 'Hospital equipment, diagnostic devices, and medical consumables for healthcare facilities.',
      industry: 'Healthcare',
      status: 'approved'
    },
    {
      company_name: 'Wellness Pharma',
      contact_person: 'Anita Kapoor',
      email: 'info@wellnesspharma.com',
      phone: '+91-11-7890-1234',
      booth_number: 'C-314',
      package_type: 'Standard',
      website: 'https://wellnesspharma.com',
      description: 'Pharmaceutical manufacturing with focus on generic medicines and affordable healthcare solutions.',
      industry: 'Healthcare',
      status: 'approved'
    },

    // Food & Beverage (3 companies)
    {
      company_name: 'Noor Halal Foods',
      contact_person: 'Fatima Noor',
      email: 'sales@noorhalalfoods.com',
      phone: '+91-11-2345-6789',
      booth_number: 'D-104',
      package_type: 'Standard',
      website: 'https://noorhalalfoods.com',
      description: 'Premium halal food products and beverages with international quality standards and innovative packaging.',
      industry: 'Food & Beverage',
      status: 'approved'
    },
    {
      company_name: 'Organic Farms Co.',
      contact_person: 'Zara Irani',
      email: 'info@organicfarmsco.in',
      phone: '+91-79-3456-7890',
      booth_number: 'D-210',
      package_type: 'Premium',
      website: 'https://organicfarmsco.in',
      description: 'Organic farming and sustainable agriculture with premium organic products for health-conscious consumers.',
      industry: 'Agriculture',
      status: 'approved'
    },
    {
      company_name: 'Spice Masters India',
      contact_person: 'Kabir Hussain',
      email: 'contact@spicemasters.in',
      phone: '+91-484-4567-8901',
      booth_number: 'D-315',
      package_type: 'Standard',
      website: 'https://spicemasters.in',
      description: 'Traditional Indian spices, herbs, and food ingredients with export quality standards.',
      industry: 'Food & Beverage',
      status: 'approved'
    },

    // Textiles & Apparel (2 companies)
    {
      company_name: 'Royal Fabrics Ltd.',
      contact_person: 'Suresh Chandra',
      email: 'info@royalfabrics.com',
      phone: '+91-141-5678-9012',
      booth_number: 'E-105',
      package_type: 'Premium',
      website: 'https://royalfabrics.com',
      description: 'Premium textile manufacturing with traditional handloom and modern weaving techniques.',
      industry: 'Textiles & Apparel',
      status: 'approved'
    },
    {
      company_name: 'Fashion Forward Exports',
      contact_person: 'Ayesha Khan',
      email: 'sales@fashionforward.in',
      phone: '+91-11-6789-0123',
      booth_number: 'E-211',
      package_type: 'Standard',
      website: 'https://fashionforward.in',
      description: 'Contemporary ethnic wear and fashion apparel for domestic and international markets.',
      industry: 'Textiles & Apparel',
      status: 'approved'
    },

    // Technology & IT (2 companies)
    {
      company_name: 'TechVista Solutions',
      contact_person: 'Rohan Sharma',
      email: 'hello@techvista.in',
      phone: '+91-80-7890-1234',
      booth_number: 'F-106',
      package_type: 'Premium',
      website: 'https://techvista.in',
      description: 'Enterprise software solutions, cloud computing, and digital transformation services.',
      industry: 'Technology',
      status: 'approved'
    },
    {
      company_name: 'Digital India Labs',
      contact_person: 'Priya Menon',
      email: 'contact@digitalindialabs.com',
      phone: '+91-22-8901-2345',
      booth_number: 'F-212',
      package_type: 'Startup',
      website: 'https://digitalindialabs.com',
      description: 'AI-powered business analytics, mobile apps, and custom software development.',
      industry: 'Technology',
      status: 'approved'
    },

    // Hospitality & Tourism (2 companies)
    {
      company_name: 'Mathew Hospitality Group',
      contact_person: 'John Mathew',
      email: 'contact@mathewhospitality.com',
      phone: '+91-484-123-4567',
      booth_number: 'G-107',
      package_type: 'Standard',
      website: 'https://mathewhospitality.com',
      description: 'Premium hospitality services with luxury hotels, restaurants, and event management.',
      industry: 'Hospitality',
      status: 'approved'
    },
    {
      company_name: 'Heritage Tourism Co.',
      contact_person: 'Aisha Rahman',
      email: 'info@heritagetourism.in',
      phone: '+91-141-234-5678',
      booth_number: 'G-213',
      package_type: 'Startup',
      website: 'https://heritagetourism.in',
      description: 'Curated heritage tours, cultural experiences, and travel packages across India.',
      industry: 'Hospitality',
      status: 'approved'
    },

    // Renewable Energy (1 company)
    {
      company_name: 'GreenPower Solutions',
      contact_person: 'Mohammed Farooq',
      email: 'contact@greenpower.in',
      phone: '+91-20-9012-3456',
      booth_number: 'H-108',
      package_type: 'Premium',
      website: 'https://greenpower.in',
      description: 'Solar energy systems, wind power solutions, and sustainable energy consulting for businesses.',
      industry: 'Energy',
      status: 'approved'
    }
  ];

  console.log('🚀 Starting to insert exhibitor data...');
  console.log(`Total exhibitors to insert: ${exhibitors.length}`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < exhibitors.length; i++) {
    const exhibitor = exhibitors[i];
    const { data, error } = await supabase
      .from('exhibitors')
      .insert(exhibitor);

    if (error) {
      console.error(`❌ Error inserting ${exhibitor.company_name}:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Inserted: ${exhibitor.company_name} (${exhibitor.industry})`);
      successCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully inserted: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📋 Total: ${exhibitors.length}`);
  
  if (successCount > 0) {
    console.log('\n🎉 Done! Refresh the Directory page to see the exhibitors.');
  }
})();

