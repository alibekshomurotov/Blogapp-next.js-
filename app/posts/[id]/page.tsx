import { getPostById, getUserById } from '@/lib/api';
import ErrorMessage from '@/app/components/ErrorMessage';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // QO'SHILDI

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// ⭐ MUHIM: Static params generatsiyasi (Vercel build uchun)
export async function generateStaticParams() {
  // JSONPlaceholder dan barcha postlarni olamiz
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  
  // Har bir post uchun id ni qaytaramiz
  return posts.map((post: { id: number }) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;

  let post = null;
  let user = null;
  let error = null;

  try {
    const postId = parseInt(id);

    if (isNaN(postId)) {
      throw new Error('Noto\'g\'ri ID formati');
    }

    // ⭐ TUZATILDI: Avval postni olamiz
    post = await getPostById(postId);
    
    // ⭐ TUZATILDI: Post bor bo'lsa, uning userId si bilan userni olamiz
    if (post) {
      user = await getUserById(post.userId).catch(() => null);
    }

  } catch (err) {
    error = err instanceof Error ? err.message : 'Xato yuz berdi';
  }

  // ⭐ YAXSHILANDI: notFound ishlatildi
  if (!post) {
    notFound();
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          ← Orqaga qaytish
        </Link>
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
      >
        ← Barcha postlar
      </Link>

      <article className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
            Post #{post.id}
          </span>

          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 capitalize leading-snug">
          {post.title}
        </h1>

        <hr className="border-gray-100 mb-6" />

        <div className="prose prose-gray max-w-none">
          {post.body.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4 text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {user && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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