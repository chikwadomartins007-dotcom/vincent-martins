import React from 'react';
import { CheckCircle, X, Truck, MessageSquare, PhoneCall, Mail } from 'lucide-react';
import { OrderFormData } from '../types';
import { formatNaira, createWhatsAppUrl } from '../utils/format';
import { getTierForQty, DISPLAY_WHATSAPP } from '../data/mockData';

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderData: OrderFormData | null;
  orderReference: string;
  onClose: () => void;
  businessWhatsApp: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  orderData,
  orderReference,
  onClose,
  businessWhatsApp,
}) => {
  if (!isOpen || !orderData) return null;

  const currentTier = getTierForQty(orderData.quantity);
  const whatsappUrl = createWhatsAppUrl(
    orderData.quantity,
    currentTier.totalPrice,
    businessWhatsApp,
    orderData.fullName,
    `${orderData.city}, ${orderData.state}`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
            Order Placed Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
            Thank you, <strong className="text-gray-900">{orderData.fullName}</strong>. We have received your order request.
          </p>

          <div className="inline-block mt-3 px-3 py-1 bg-gray-100 rounded-lg text-xs font-mono font-bold text-gray-700">
            Order Reference: <span className="text-red-600">{orderReference}</span>
          </div>
        </div>

        {/* Email transmission notification banner */}
        <div className="mt-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Order details have been emailed directly to our sales desk.</span>
        </div>

        {/* Order Details Summary Box */}
        <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500 font-semibold">Item:</span>
            <span className="font-bold text-gray-900">A-01 Smart Door Lock</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-semibold">Quantity:</span>
            <span className="font-bold text-gray-900">{orderData.quantity} {orderData.quantity > 1 ? 'Units' : 'Unit'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-semibold">Amount to Pay:</span>
            <span className="font-black text-gray-900 text-base">{formatNaira(currentTier.totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-semibold">Payment Method:</span>
            <span className="font-bold text-emerald-700">{orderData.paymentMethod}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-gray-200">
            <span className="text-gray-500 font-semibold">Delivery To:</span>
            <span className="font-bold text-gray-900 text-right max-w-[220px] truncate">
              {orderData.deliveryAddress}, {orderData.city}, {orderData.state}
            </span>
          </div>
        </div>

        {/* Dispatch Notification message */}
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-medium flex items-start gap-2.5">
          <Truck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <p>
            Our logistics team will call you on <strong>{orderData.phoneNumber}</strong> to verify address and schedule delivery. You can also message us directly on WhatsApp at <strong>{DISPLAY_WHATSAPP}</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Notify on WhatsApp ({DISPLAY_WHATSAPP})</span>
          </a>

          <button
            onClick={onClose}
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-bold text-xs sm:text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
