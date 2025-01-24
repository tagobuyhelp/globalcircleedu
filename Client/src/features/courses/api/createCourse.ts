import { supabase } from '../../../lib/supabase';
import type { CreateCourseInput } from '../types';

export async function createCourse(data: CreateCourseInput) {
  // Convert comma-separated prerequisites to array
  const prerequisites = data.prerequisites
    ? data.prerequisites.split(',').map(p => p.trim())
    : [];

  const { data: course, error } = await supabase
    .from('courses')
    .insert([{ ...data, prerequisites }])
    .select()
    .single();

  if (error) throw error;
  return course;
}