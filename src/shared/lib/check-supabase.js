const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBucket() {
  console.log(`Checking bucket "articulos" on ${supabaseUrl}...`);
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) throw listError;
    
    const exists = buckets.some(b => b.name === 'articulos');
    
    if (!exists) {
      console.log('Creating bucket "articulos"...');
      const { error: createError } = await supabase.storage.createBucket('articulos', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 5242880
      });
      if (createError) throw createError;
      console.log('Bucket "articulos" created successfully as public.');
    } else {
      console.log('Bucket "articulos" already exists.');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkBucket();
