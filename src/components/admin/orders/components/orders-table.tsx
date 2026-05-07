import { OrderType } from "@/types/order-type";

export default function OrdersTable({ orders }: { orders: OrderType[] }) {
  return (
    <div className="w-full shadow-lg overflow-x-auto">
      <table className="w-full min-w-200 mx-auto h-70">
        <thead className="bg-blue">
          <tr>
            <th className="border border-blue p-2 text-white text-sm">
              کد سفارش
            </th>
            <th className="border border-blue p-2 text-white text-sm">
              نام مشتری
            </th>
            <th className="border border-blue p-2 text-white text-sm">آدرس</th>
            <th className="border border-blue p-2 text-white text-sm">
              تعداد آیتم ها
            </th>
            <th className="border border-blue p-2 text-white text-sm">
              مبلغ کل
            </th>
            <th className="border border-blue p-2 text-white text-sm">وضعیت</th>
            <th className="border border-blue p-2 text-white text-sm">
              وضعیت پرداخت
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.map((order: OrderType) => (
            <tr
              key={order._id}
              className="border border-blue text-xs font-bold"
            >
              <td className="border border-blue text-xs font-bold px-4">
                <div>{order._id}</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{order.shippingAddress.name}</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{order.shippingAddress.address}</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{order.orderItems.length} عدد</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{order.totalPrice},000,000 تومان</div>
              </td>
              <td className="border border-blue font-bold px-6 text-[11px] lg:px-4 lg:text-xs">
                <div>
                  {order.status ? (
                    <div className="bg-[#f8861b] py-2 rounded-2xl text-white">
                      در انتظار ارسال
                    </div>
                  ) : (
                    <div className="bg-green-600 py-2 rounded-2xl text-white">
                      ارسال شده
                    </div>
                  )}
                </div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>
                  {order.isPaid ? (
                    <div className="text-green-700">پرداخت شده</div>
                  ) : (
                    <div className="text-red-600">پرداخت نشده</div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
