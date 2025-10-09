# Seeding Exhibitors via Admin Panel

Since RLS policies require admin authentication, here's how to seed data:

## Quick Method: Use Super Admin Account

1. **Sign in as Super Admin** (`harab.business@gmail.com`)

2. **Go to Admin Panel** (`/admin`)

3. **Go to Exhibitors Tab**

4. **Manually add exhibitors** OR use browser console while logged in:

```javascript
// Run this in browser console while signed in as admin
const { supabase } = await import('/src/integrations/supabase/client.ts');

const exhibitors = [
  // Copy exhibitor array from seed-exhibitors.js
];

for (const exhibitor of exhibitors) {
  const { error } = await supabase.from('exhibitors').insert(exhibitor);
  if (error) console.error(exhibitor.company_name, error);
  else console.log('✅', exhibitor.company_name);
}
```

## Alternative: Get Service Role Key from Lovable

1. **In Lovable Dashboard:**
   - Go to your project
   - Click on "Settings" or "Database"
   - Look for "Service Role Key" or "Secret Keys"
   - Copy the service role key

2. **Add to .env:**
   ```
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-key-here
   ```

3. **Run seeder:**
   ```bash
   npm run seed:exhibitors
   ```

##Option: Ask Lovable to Add Data

You can ask Lovable AI:
```
Please insert 20 sample exhibitor records into the exhibitors table with diverse industries
```

Lovable AI can directly manipulate the database for you.

