ALTER TABLE lesson_notes ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE learning_resources ADD COLUMN IF NOT EXISTS video_url text;

-- Update the resource type check to include 'video'
ALTER TABLE learning_resources DROP CONSTRAINT IF EXISTS learning_resources_type_check;
ALTER TABLE learning_resources ADD CONSTRAINT learning_resources_type_check
  CHECK (type IN ('pdf', 'audio', 'sheet_music', 'video'));
