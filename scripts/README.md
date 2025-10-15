# Database Seeding Scripts

This directory contains scripts to seed the database with sample data.

## Exhibitor Data Seeding

### Method 1: Browser Console (Recommended for Lovable)

1. Open your MIA Expo website in the browser
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Copy the contents of `seed-exhibitors.js`
5. Paste into the console and press Enter
6. Wait for the script to complete (you'll see progress messages)
7. Refresh the Directory page to see the exhibitors

**Quick Copy-Paste:**
```javascript
// Just copy the entire contents of seed-exhibitors.js and paste in console
```

### Method 2: SQL (If you have database access)

1. Open your database SQL editor
2. Copy the contents of `seed-exhibitors.sql`
3. Run the SQL commands
4. Verify with the SELECT query at the end

## What Gets Added

### 20 Diverse Exhibitors Across Industries:

**Infrastructure & Real Estate (3):**
- Khan Infrastructure Ltd. (Premium)
- Desai Builders & Associates (Standard)
- Urban Development Corp (Premium)

**Manufacturing & Machinery (4):**
- Singh Manufacturing Co. (Standard)
- Patel Engineering Works (Standard)
- Modern Tech Industries (Premium)
- Precision Tools Ltd. (Startup)

**Healthcare (3):**
- St. Mary Healthcare (Premium)
- MediCare Solutions (Standard)
- Wellness Pharma (Standard)

**Food & Beverage (3):**
- Noor Halal Foods (Standard)
- Organic Farms Co. (Premium)
- Spice Masters India (Standard)

**Textiles & Apparel (2):**
- Royal Fabrics Ltd. (Premium)
- Fashion Forward Exports (Standard)

**Technology (2):**
- TechVista Solutions (Premium)
- Digital India Labs (Startup)

**Hospitality (2):**
- Mathew Hospitality Group (Standard)
- Heritage Tourism Co. (Startup)

**Energy (1):**
- GreenPower Solutions (Premium)

### Package Distribution:
- **Premium**: 8 exhibitors (featured on homepage)
- **Standard**: 9 exhibitors
- **Startup**: 3 exhibitors

### Data Included for Each Exhibitor:
- Company name
- Contact person
- Email address
- Phone number
- Booth number
- Package type
- Website URL
- Description
- Industry/sector
- Status (all set to 'approved')

## Notes

- All exhibitors are set to `status: 'approved'` so they appear immediately in the Directory
- Premium package exhibitors will appear in the "Featured Exhibitors" section
- Each exhibitor has unique booth numbers (A-101, B-102, etc.)
- Industries are diverse to showcase the multi-sector nature of the expo
- Contact information follows Indian phone number format

## Verification

After seeding, you can verify the data by:

1. **Via Browser Console:**
   ```javascript
   const { supabase } = await import('/src/integrations/supabase/client.ts');
   const { data } = await supabase.from('exhibitors').select('company_name, industry, package_type').order('booth_number');
   console.table(data);
   ```

2. **Via Directory Page:**
   - Visit `/directory` on your website
   - You should see all 20 exhibitors
   - Featured section should show 8 Premium exhibitors
   - Filters should work for different industries

## Troubleshooting

### If exhibitors don't appear:
1. Check browser console for errors
2. Verify the data was inserted: Run verification query above
3. Check that exhibitors have `status: 'approved'`
4. Clear browser cache and refresh

### If some inserts fail:
- Check for duplicate booth numbers
- Check for duplicate email addresses
- Verify all required fields are present

### To clear all exhibitors:
```javascript
const { supabase } = await import('/src/integrations/supabase/client.ts');
await supabase.from('exhibitors').delete().neq('id', '00000000-0000-0000-0000-000000000000');
console.log('✅ All exhibitors deleted');
```

## Customization

To add more exhibitors or modify existing ones, edit the `exhibitors` array in `seed-exhibitors.js` or add more INSERT statements to `seed-exhibitors.sql`.

Each exhibitor object should have:
- `company_name` (required)
- `industry` (required)
- `status` (required - use 'approved' to show on site)
- `package_type` (Premium/Standard/Startup)
- `booth_number` (unique identifier)
- Other fields are optional but recommended



