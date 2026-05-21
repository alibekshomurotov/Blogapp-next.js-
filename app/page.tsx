import { getAllPosts } from '@/lib/api';
// API funksiyamizni import qilamiz

import PostCard from '@/app/components/PostCard';
// PostCard komponentimizni import qilamiz

import ErrorMessage from '@/app/components/ErrorMessage';
// ErrorMessage komponentimizni import qilamiz

// Server Component bo'lgani uchun async qilishimiz mumkin!
export default async function HomePage() {

  let posts = null;  // Postlar o'zgaruvchisi (boshlang'ichda null)
  let error = null;  // Xato o'zgaruvchisi (boshlang'ichda null)

  try {
    // try - kodni sinab ko'ramiz
    posts = await getAllPosts();
    // Agar muvaffaqiyatli bo'lsa, posts o'zgaruvchisiga saqlanadi
  } catch (err) {
    // catch - xato yuz bersa bu blok ishlaydi
    error = err instanceof Error ? err.message : 'Noma\'lum xato';
    // instanceof Error - xato Error obyektimi tekshiramiz
    // ternary operator: shart ? ha_bo'lsa : yo'q_bo'lsa
  }

  // Agar xato bo'lsa, ErrorMessage komponentini ko'rsatamiz
  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} />
        {/* message props'ini xato matni bilan uzatamiz */}
      </main>
    );
  }

  // Asosiy render
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* container - markazlashtirilgan kontent */}
      {/* mx-auto - gorizontal avtomatik margin (markazlashtirish) */}
      {/* px-4 - gorizontal 16px padding */}
      {/* py-8 - vertikal 32px padding */}
      {/* max-w-6xl - maksimal kenglik */}

      {/* Sarlavha qismi */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📝 Postlar Ro'yxati
        </h1>
        <p className="text-gray-500">
          JSONPlaceholder API'dan olingan postlar —{' '}
          {/* {' '} - bo'sh joy qo'shish uchun */}
          <span className="font-semibold text-blue-600">
            {posts?.length ?? 0} ta post
            {/* posts?.length - posts null bo'lsa xato bermaydi (optional chaining) */}
            {/* ?? 0 - posts null bo'lsa 0 ko'rsatadi (nullish coalescing) */}
          </span>
        </p>
      </div>

      {/* Postlar grid (to'r) ko'rinishida */}
      {posts && posts.length > 0 ? (
        // posts mavjud va bo'sh emas bo'lsa
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* grid - CSS Grid layout */}
          {/* grid-cols-1 - kichik ekranda 1 ustun */}
          {/* sm:grid-cols-2 - o'rta ekranda 2 ustun */}
          {/* lg:grid-cols-3 - katta ekranda 3 ustun */}
          {/* gap-5 - elementlar orasida 20px bo'shliq */}

          {posts.map((post) => (
            // .map() - array elementlarini birma-bir aylanib chiqadi
            // har bir post uchun PostCard yaratadi
            <PostCard
              key={post.id}
              // key - React'ga har bir element noyob ekanligini bildiradi
              // List render qilganda key ALBATTA kerak!
              post={post}
              // post props'ini uzatamiz
            />
          ))}
        </div>
      ) : (
        // posts bo'sh yoki null bo'lsa
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg">Hech qanday post topilmadi</p>
        </div>
      )}
    </main>
  );
}