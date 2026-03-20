import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBucket() {
  const { data, error } = await supabase.storage.getBucket('articulos');
  
  if (error && error.message.includes('not found')) {
    console.log('Creating bucket "articulos"...');
    const { error: createError } = await supabase.storage.createBucket('articulos', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 5242880 // 5MB
    });
    if (createError) console.error('Error creating bucket:', createError);
    else console.log('Bucket "articulos" created successfully and set to public.');
  } else if (error) {
    console.error('Error checking bucket:', error);
  } else {
    console.log('Bucket "articulos" already exists.');
  }
}

checkBucket();
