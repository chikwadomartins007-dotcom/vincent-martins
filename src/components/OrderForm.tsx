import React, { useState } from 'react';
import {
  Package,
  Truck,
  RotateCcw,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  PhoneCall,
  User,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { NIGERIAN_STATES, getTierForQty, DEFAULT_WHATSAPP } from '../data/mockData';
import { formatNaira, createWhatsAppUrl } from '../utils/format';
import { OrderFormData } from '../types';

interface OrderFormProps {
  quantity: number;
  onQuantityChange: (q: number) => void;
  onSubmitOrder: (data: OrderFormData) => void;
  businessWhatsApp: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  quantity,
  onQuantityChange,
  onSubmitOrder,
  businessWhatsApp,
}) => {
  const currentTier = getTierForQty(quantity);

  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    deliveryAddress: '',
    city: '',
    state: 'Lagos',
    quantity: quantity,
    paymentMethod: 'Payment on Delivery',
    deliveryNotes: '',
    agreedToTerms: false,
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync internal form quantity if prop changes
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, quantity }));
  }, [quantity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'quantity') {
      const val = parseInt(value) || 1;
      const clamped = Math.max(1, Math.min(10, val));
      setFormData((prev) => ({ ...prev, quantity: clamped }));
      onQuantityChange(clamped);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10) {
      setErrorMsg('Please enter a valid phone number for delivery confirmation.');
      return;
    }
    if (!formData.deliveryAddress.trim()) {
      setErrorMsg('Please enter your delivery street address.');
      return;
    }
    if (!formData.city.trim()) {
      setErrorMsg('Please enter your city / town.');
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMsg('Please tick the confirmation checkbox that you are ready to receive your order.');
      return;
    }

    setErrorMsg(null);
    onSubmitOrder({ ...formData, quantity });
  };

  const whatsAppDirectLink = createWhatsAppUrl(
    quantity,
    currentTier.totalPrice,
    businessWhatsApp,
    formData.fullName,
    formData.city ? `${formData.city}, ${formData.state}` : undefined
  );

  return (
    <section id="order" className="py-14 sm:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200 mb-3">
            <Truck className="w-3.5 h-3.5 text-red-600" />
            <span>EXPRESS NATIONWIDE FULFILLMENT</span>
          </div>
          <h2 className="font-black text-gray-900 tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
            <span className="headline-red-outline text-red-600 inline-block">PLACE YOUR ORDER</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
            Fill the details below to receive your A-01 Smart Door Lock. Pay only when your package is delivered to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Order Form Card */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <span className="text-sm font-bold text-gray-900">Direct Order Booking</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Payment on Delivery Available
              </span>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Chief Babatunde Adeyemi"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone Number (Calls) *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 focus:outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="e.g. 0803 123 4567 (Optional if same)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Delivery Address *
                </label>
                <textarea
                  rows={2}
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="House number, street name, estate, landmark..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 focus:outline-none transition-all"
                  required
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Lekki Phase 1, Ikeja, Maitama"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 focus:outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 bg-white focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 focus:outline-none transition-all"
                    required
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity and Payment Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Quantity (Units)
                  </label>
                  <select
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 bg-white focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 focus:outline-none transition-all"
                  >
                    <option value={1}>1 Piece — ₦160,000</option>
                    <option value={2}>2 Pieces — ₦310,000 (Save ₦10,000)</option>
                    <option value={3}>3 Pieces — ₦450,000 (Save ₦30,000)</option>
                    <option value={4}>4 Pieces — ₦580,000 (Save ₦60,000)</option>
                    <option value={5}>5 Pieces — ₦700,000 (Save ₦100,000)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Payment Method *
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 bg-white focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 focus:outline-none transition-all"
                    required
                  >
                    <option value="Payment on Delivery">Payment on Delivery (Cash / POS)</option>
                    <option value="Bank Transfer">Bank Transfer on Delivery</option>
                  </select>
                </div>
              </div>

              {/* Confirmation Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    required
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-600 leading-snug">
                    I confirm that my information is correct, I have the required funds ready, and I am ready to receive and inspect my order when contacted.
                  </span>
                </label>
              </div>

              {/* Price Calculation Banner */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                    Calculated Total
                  </span>
                  <span className="text-2xl font-black text-gray-900">
                    {formatNaira(currentTier.totalPrice)}
                  </span>
                </div>
                {currentTier.savings > 0 && (
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md">
                    Saving {formatNaira(currentTier.savings)}
                  </span>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center h-14 px-8 rounded-xl font-black text-sm tracking-wide text-white bg-red-600 hover:bg-red-700 active:scale-98 transition-all shadow-md shadow-red-600/25 cursor-pointer"
                >
                  PLACE MY ORDER
                </button>

                <a
                  href={whatsAppDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl font-bold text-sm tracking-wide text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>ORDER ON WHATSAPP</span>
                </a>
              </div>
            </form>
          </div>

          {/* Right Column: "In The Box" & "Shipping & Returns" */}
          <div className="lg:col-span-4 space-y-6">
            {/* In The Box Card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-gray-900 text-lg uppercase tracking-tight">
                  In The Box
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1× A-01 Smart Door Lock Front Panel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1× Interior Screen Back Panel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1× Stainless Steel 24×240mm Mortise Body</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2× High-Security Mechanical Override Keys</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2× Contactless NFC Smart Access Cards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1× Installation Template & Screws Kit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1× English User Manual & Setup Guide</span>
                </li>
              </ul>
            </div>

            {/* Shipping & Returns Card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-gray-900 text-lg uppercase tracking-tight">
                  Shipping & Returns
                </h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-gray-600 font-medium">
                <p>
                  <strong className="text-gray-900">Nationwide Delivery:</strong> Fast dispatch to Lagos, Abuja, Port Harcourt, Ibadan, Kano, and all 36 states across Nigeria.
                </p>
                <p>
                  <strong className="text-gray-900">Payment On Delivery:</strong> Inspect the product when the courier arrives before payment.
                </p>
                <p>
                  <strong className="text-gray-900">Warranty:</strong> 1-Year replacement warranty on manufacturing hardware defects.
                </p>
              </div>
            </div>

            {/* Support Hotline card */}
            <div className="p-5 rounded-xl bg-red-50/80 border border-red-200 text-center">
              <p className="text-xs font-bold text-red-900 uppercase">Have questions before ordering?</p>
              <p className="text-xs text-red-700 mt-1">Our customer support engineers are on standby.</p>
              <a
                href={whatsAppDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors w-full"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Product Specialist</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
