"use client";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      {/* flex - flexbox layout */}
      {/* justify-center - gorizontal markazlashtirish */}
      {/* items-center - vertikal markazlashtirish */}
      {/* min-h-[200px] - minimal balandlik 200px */}

      <div className="flex flex-col items-center gap-4">
        {/* flex-col - elementlarni vertikal joylashtirish */}
        {/* gap-4 - elementlar orasida bo'sh joy */}

        {/* Aylanuvchi doira animatsiyasi */}
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin">
          {/* w-12 h-12 - kenglik va balandlik 48px */}
          {/* border-4 - 4px chegara */}
          {/* border-blue-200 - och ko'k chegara */}
          {/* border-t-blue-600 - yuqori qism to'q ko'k (aylanish effekti) */}
          {/* rounded-full - to'liq dumaloq */}
          {/* animate-spin - Tailwind aylanish animatsiyasi */}
        </div>

        {/* Matn */}
        <p className="text-gray-500 text-sm font-medium">
          Yuklanmoqda...
        </p>
        {/* text-gray-500 - kulrang matn */}
        {/* text-sm - kichik shrift */}
        {/* font-medium - o'rta qalinlik */}
      </div>
    </div>
  );
}