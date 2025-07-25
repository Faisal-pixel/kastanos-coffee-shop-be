import dotenv from 'dotenv';

dotenv.config();
const env = {
    supabaseKastanosDbUrl: process.env.SUPABASE_KASTANOS_DB_URL,
    supabaseKastanosDbAnonKey: process.env.SUPABASE_KASTANOS_DB_ANON_KEY,
    paystackApiKey: process.env.PAYSTACK_API_KEY,
}

export default env;