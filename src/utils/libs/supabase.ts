import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nyvutbekijrsbjqewjng.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dnV0YmVraWpyc2JqcWV3am5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxMjQ4ODQsImV4cCI6MTk5ODcwMDg4NH0.leBhhLCmJ9VjnhufGapaPCgMJYKBwuuLDgOX-qcOBIA"
);
