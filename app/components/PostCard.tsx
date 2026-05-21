import Link from 'next/link';
// Link - Next.js sahifalar orasida navigatsiya uchun
// Oddiy <a> o'rniga ishlatamiz — sahifa yangilanmaydi (SPA)

import { Post } from '@/types';
// @/types - bu app/ papkasidan types/ papkasiga yo'l
// @ - loyiha root papkasini bildiradi (tsconfig.json da belgilangan)

// Komponent qanday props qabul qilishini belgilaymiz
type PostCardProps = {
  post: Post; // Post type'idagi obyekt
};

export default function PostCard({ post }: PostCardProps) {
  // { post } - props'dan post ni olamiz

  return (
    <Link href={`/posts/${post.id}`}>
      {/* href - qaysi sahifaga o'tish kerakligi */}
      {/* /posts/1, /posts/2 kabi URL yaratiladi */}

      <div className="
        bg-white
        border border-gray-200
        rounded-xl
        p-5
        hover:shadow-lg
        hover:border-blue-300
        hover:-translate-y-1
        transition-all
        duration-200
        cursor-pointer
        group
      ">
        {/* hover:shadow-lg - sichqoncha ustiga kelganda soya */}
        {/* hover:border-blue-300 - hover da ko'k chegara */}
        {/* hover:-translate-y-1 - hover da biroz yuqoriga ko'tarilish */}
        {/* transition-all duration-200 - 200ms animatsiya */}
        {/* group - ichki elementlar group-hover ishlatishi uchun */}

        {/* Post ID badji */}
        <div className="flex items-center justify-between mb-3">
          <span className="
            bg-blue-100
            text-blue-700
            text-xs
            font-bold
            px-2
            py-1
            rounded-full
          ">
            #{post.id}
            {/* Postning ID raqami */}
          </span>

          {/* O'q ikonkasi */}
          <span className="text-gray-400 group-hover:text-blue-500 transition-colors text-lg">
            →
            {/* group-hover:text-blue-500 - ota element hover da ko'k bo'ladi */}
          </span>
        </div>

        {/* Post sarlavhasi */}
        <h2 className="
          text-gray-800
          font-semibold
          text-base
          mb-2
          line-clamp-2
          group-hover:text-blue-700
          transition-colors
          capitalize
        ">
          {post.title}
          {/* capitalize - birinchi harf katta */}
          {/* line-clamp-2 - maksimal 2 qator (kesiladi) */}
        </h2>

        {/* Post matni (qisqartirilgan) */}
        <p className="
          text-gray-500
          text-sm
          line-clamp-2
          leading-relaxed
        ">
          {post.body}
          {/* line-clamp-2 - 2 qatordan ko'p bo'lsa "..." bilan kesadi */}
          {/* leading-relaxed - qatorlar orasidagi bo'shliq */}
        </p>

        {/* Pastki qism */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Foydalanuvchi #{post.userId}
          </span>
          <span className="text-xs text-blue-500 font-medium group-hover:underline">
            Batafsil o'qish →
          </span>
        </div>
      </div>
    </Link>
  );
}