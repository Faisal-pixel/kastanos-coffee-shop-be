import { createClient } from "@supabase/supabase-js";
import env from "./env_variables.js";

const supabaseUrl = env.supabaseKastanosDbUrl;
const supabaseAnonKey = env.supabaseKastanosDbAnonKey;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;