
import { Post, User } from '@/types'; // Yuqorida yaratgan type'larimizni import qilamiz

// API'ning asosiy manzili - o'zgaruvchiga saqlaymiz
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// ============================================
// Barcha postlarni olish funksiyasi
// ============================================
export async function getAllPosts(): Promise<Post[]> {
  // async - bu funksiya kutish (await) ishlatadi
  // Promise<Post[]> - funksiya Post array qaytaradi deb va'da beradi

  const response = await fetch(`${BASE_URL}/posts`);
  // fetch - internet orqali ma'lumot olish
  // await - javob kelguncha kutish
  // template literal (` `) orqali URL ni quramiz

  if (!response.ok) {
    // Agar server xato qaytarsa (masalan 404, 500)
    throw new Error('Postlarni yuklashda xato yuz berdi');
    // throw new Error - xato "otamiz" (yuqoridagi component tutib oladi)
  }

  const data: Post[] = await response.json();
  // .json() - javobni JavaScript obyektiga aylantiramiz
  // Post[] - bu array Post type'idan iboratligi aytilmoqda

  return data;
  // Ma'lumotni qaytaramiz
}

// ============================================
// Bitta postni ID bo'yicha olish funksiyasi
// ============================================
export async function getPostById(id: number): Promise<Post> {
  // id: number - funksiya raqam qabul qiladi
  // Promise<Post> - bitta Post qaytaradi

  const response = await fetch(`${BASE_URL}/posts/${id}`);
  // URL: https://jsonplaceholder.typicode.com/posts/1

  if (!response.ok) {
    throw new Error(`Post #${id} topilmadi`);
  }

  const data: Post = await response.json();
  return data;
}

// ============================================
// Foydalanuvchini ID bo'yicha olish funksiyasi
// ============================================
export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Foydalanuvchi #${id} topilmadi`);
  }

  const data: User = await response.json();
  return data;
}