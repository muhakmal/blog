import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Pastikan path benar sesuai lokasi konten
const postsDirectory = path.join(process.cwd(), 'extracted_content');

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || '',
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}
