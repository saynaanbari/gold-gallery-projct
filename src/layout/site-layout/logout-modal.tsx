import Image from "next/image";
import exit from "@/assets/svg/exit.svg";
export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg shadow w-full max-w-sm p-6 border border-gray-100">
        <div className="flex items-center justify-center mx-auto mb-2">
          <Image src={exit} alt="خروج" className="w-8 h-8" />
        </div>
        <h3 className="text-center text-base font-bold text-gray-800 mb-2">
          خروج از حساب کاربری
        </h3>
        <p className="text-center text-xs font-bold text-gray-500 mb-8">
          می‌خواهید از حساب کاربری خود خارج شوید؟
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-all font-bold text-xs cursor-pointer"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-all font-bold text-xs cursor-pointer"
          >
            خروج از حساب
          </button>
        </div>
      </div>
    </div>
  );
}