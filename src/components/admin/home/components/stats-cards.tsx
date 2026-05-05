export default function StatsCards() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center mb-15">
      <div className="bg-linear-to-b from-green-400 to-green-300 flex items-center gap-2 p-5 rounded-2xl w-full max-w-xs md:max-w-none lg:max-w-none">
        <div className="flex flex-col gap-1">
          <div className="font-black text-sm">درآمد</div>
          <div className="text-sm font-semibold">۱۲,۵۶۷,۸۹۹ تومان </div>
        </div>
      </div>
      <div className="bg-linear-to-b from-red-400 to-red-300 flex items-center gap-2 p-5 rounded-2xl w-full max-w-xs md:max-w-none lg:max-w-none">
        <div className="flex flex-col gap-1">
          <div className="font-black text-sm">مجموع فروش</div>
          <div className="text-sm font-semibold">۵۶,۷۸۹,۱۲۳ تومان</div>
        </div>
      </div>
      <div className="bg-linear-to-b from-blue-400 to-blue-300 flex items-center gap-2 p-5 rounded-2xl w-full max-w-xs md:max-w-none lg:max-w-none">
        <div className="flex flex-col gap-1">
          <div className="font-black text-sm">تعداد مشتریان</div>
          <div className="text-sm font-semibold">۱,۲۳۴ نفر</div>
        </div>
      </div>
      <div className="bg-linear-to-b from-orange-400 to-orange-300 flex items-center gap-2 p-5 rounded-2xl w-full max-w-xs md:max-w-none lg:max-w-none">
        <div className="flex flex-col gap-1">
          <div className="font-black text-sm">سفارشات</div>
          <div className="text-sm font-semibold">۵۶۷</div>
        </div>
      </div>
    </div>
  );
}
