"use client";

// Bu komponent props qabul qiladi
// Props - ota komponentdan farzand komponentga yuboriluvchi ma'lumot
type ErrorMessageProps = {
  message: string; // Xato matni
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  // { message } - destructuring: props ichidan message ni olamiz
  return (
    <div className="flex justify-center items-center min-h-[200px]">

      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center">
        {/* bg-red-50 - juda och qizil fon */}
        {/* border border-red-200 - qizil chegara */}
        {/* rounded-xl - katta dumaloq burchak */}
        {/* p-6 - 24px ichki bo'sh joy (padding) */}
        {/* max-w-md - maksimal kenglik */}

        {/* Xato ikonkasi */}
        <div className="text-red-500 text-4xl mb-3">⚠️</div>

        {/* Sarlavha */}
        <h3 className="text-red-700 font-semibold text-lg mb-2">
          Xato yuz berdi
        </h3>

        {/* Xato matni - props'dan keladi */}
        <p className="text-red-600 text-sm">
          {message}
          {/* {message} - JavaScript ichida o'zgaruvchini ko'rsatish */}
        </p>
      </div>
    </div>
  );
}