// Post (maqola) uchun type
// JSONPlaceholder API qaytaradigan ma'lumot strukturasi
export type Post = {
  userId: number;   // Postni yaratgan foydalanuvchi ID si
  id: number;       // Postning o'z ID si
  title: string;    // Post sarlavhasi
  body: string;     // Post matni
};

// Foydalanuvchi uchun type
export type User = {
  id: number;        // Foydalanuvchi ID si
  name: string;      // Foydalanuvchi ismi
  username: string;  // Foydalanuvchi nomi (@username)
  email: string;     // Email manzili
};