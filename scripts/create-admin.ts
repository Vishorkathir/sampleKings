import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('--- Admin Creation CLI ---');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      'Error: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in environment.'
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const prisma = new PrismaClient();

  try {
    const fullName = await question('Enter Admin Full Name: ');
    const email = await question('Enter Admin Email: ');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('\n❌ Invalid email format. Please enter a valid email (e.g., admin@example.com)');
      process.exit(1);
    }

    const password = await question('Enter Admin Password (min 6 chars): ');

    if (!email || !password || !fullName) {
      console.error('All fields are required.');
      process.exit(1);
    }

    console.log('\nCreating user in Supabase Auth...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'admin',
        },
      },
    });

    if (authError) {
      console.error('Supabase Auth Error:', authError.message);
      process.exit(1);
    }

    const userId = authData.user?.id;
    if (!userId) {
      console.error('Failed to retrieve User ID after sign up.');
      process.exit(1);
    }

    console.log('User created in Auth successfully! ID:', userId);

    console.log('Assigning admin privileges in database...');
    const userRecord = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'admin',
        full_name: fullName,
      },
      create: {
        id: userId,
        email,
        full_name: fullName,
        role: 'admin',
        is_active: true,
        admission_status: 'admitted', // Admins don't need admission tracking
      },
    });

    console.log('\n✅ Success! Admin created successfully.');
    console.log('Email:', userRecord.email);
    console.log('Role:', userRecord.role);
    console.log('You can now log in to the admin dashboard.');
  } catch (error: any) {
    console.error('\n❌ An unexpected error occurred:', error.message);
  } finally {
    await prisma.$disconnect();
    rl.close();
    process.exit(0);
  }
}

main();
