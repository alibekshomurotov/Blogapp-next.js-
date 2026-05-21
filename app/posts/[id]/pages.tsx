import { getPostById, getUserById } from '@/lib/api';
// Ikkala API funksiyani import qilamiz

import ErrorMessage from '@/app/components/ErrorMessage';
import Link from 'next/link';

// Next.js params'ni bu tarzda beradi
type PageProps = {
  params: Promise<{
    id: string; // URL'dan keladi: /posts/1 → id = "1"
  }>;
};

export default async function PostDetailPage({ params }: PageProps) {

  // params ni kutamiz (Next.js 15'da params Promise bo'ldi)
  const { id } = await params;

  let post = null;
  let user = null;
  let error = null;

  try {
    const postId = parseInt(id);
    // parseInt - string'ni raqamga aylantiradi: "1" → 1

    if (isNaN(postId)) {
      // isNaN - "is Not a Number" - raqam emasmi tekshiradi
      throw new Error('Noto\'g\'ri ID formati');
    }

    // Postni va foydalanuvchini parallel (bir vaqtda) olamiz
    // Bu tezroq ishlaydi — birinchisi tugashini kutmay ikkinchisi boshlanadi
    [post, user] = await Promise.all([
      getPostById(postId),
      getUserById(postId).catch(() => null),
      // .catch(() => null) - foydalanuvchi topilmasa null qaytarsin
    ]);

  } catch (err) {
    error = err instanceof Error ? err.message : 'Xato yuz berdi';
  }

  // Xato bo'lsa
  if (error || !post) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          ← Orqaga qaytish
        </Link>
        <ErrorMessage message={error || 'Post topilmadi'} />
      </main>
    );
  }

  // Asosiy render
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Orqaga tugma */}
      <Link
        href="/"
        className="
          inline-flex
          items-center
          gap-2
          text-blue-600
          hover:text-blue-800
          mb-8
          font-medium
          transition-colors
        "
      >
        ← Barcha postlar
        {/* Link komponent oddiy <a> kabi ko'rinadi, lekin sahifa yangilanmaydi */}
      </Link>

      {/* Post kartasi */}
      <article className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        {/* article - semantik HTML: maqola uchun */}

        {/* Yuqori qism: ID va foydalanuvchi */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">

          {/* ID badji */}
          <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
            Post #{post.id}
          </span>

          {/* Foydalanuvchi ma'lumoti */}
          {user && (
            // user mavjud bo'lsagina ko'rsatamiz
            <div className="flex items-center gap-2">
              {/* Avatar (harf bilan) */}
              <div className="
                w-8 h-8
                bg-gradient-to-br from-blue-500 to-purple-600
                rounded-full
                flex items-center justify-center
                text-white text-sm font-bold
              ">
                {user.name.charAt(0).toUpperCase()}
                {/* charAt(0) - birinchi harfni oladi */}
                {/* toUpperCase() - katta harfga aylantiradi */}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </div>
          )}
        </div>

        {/* Post sarlavhasi */}
        <h1 className="
          text-2xl
          sm:text-3xl
          font-bold
          text-gray-900
          mb-6
          capitalize
          leading-snug
        ">
          {post.title}
        </h1>

        {/* Ajratuvchi chiziq */}
        <hr className="border-gray-100 mb-6" />

        {/* Post matni */}
        <div className="prose prose-gray max-w-none">
          {/* To'liq matnni paragraflar bilan ko'rsatamiz */}
          {post.body.split('\n').map((paragraph, index) => (
            // .split('\n') - matnni yangi qatordan bo'lib massivga aylantiradi
            <p
              key={index}
              className="text-gray-700 leading-relaxed mb-4 text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pastki qism: Foydalanuvchi email */}
        {user && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
            <div className="
              w-10 h-10
              bg-gradient-to-br from-blue-500 to-purple-600
              rounded-full
              flex items-center justify-center
              text-white font-bold
            ">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}