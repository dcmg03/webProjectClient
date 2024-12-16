import { createClient } from '@supabase/supabase-js';

// Reemplaza con tu URL y clave pública de Supabase
const supabaseUrl = 'https://sajgpypejdttcvsrgtdn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhamdweXBlamR0dGN2c3JndGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2MDczMTYsImV4cCI6MjA0OTE4MzMxNn0.CagKqJaFPtFWRj4d5jg8eP1dOa8Hmvnt-BC7NjH6TbE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
