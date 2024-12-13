import { createClient } from '@supabase/supabase-js';

// 해연 Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// 성현 Supabase
const supabaseUrl2 = process.env.REACT_APP_SUPABASE_URL_2;
const supabaseKey2 = process.env.REACT_APP_SUPABASE_ANON_KEY_2;

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabase2 = createClient(supabaseUrl2, supabaseKey2);