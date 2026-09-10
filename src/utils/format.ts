import { DEFAULT_WHATSAPP } from '../data/mockData';

export const formatNaira = (amount: number): string => {
  return '₦' + amount.toLocaleString('en-NG');
};

export const createWhatsAppUrl = (
  quantity: number,
  totalPrice: number,
  phone: string = DEFAULT_WHATSAPP,
  customerName?: string,
  deliveryCity?: string
): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  let message = `Hello MAX LUXURY HOME TECH,\n\nI want to order the *A-01 Smart Door Lock*.\n\n`;
  message += `📦 Quantity: ${quantity} piece${quantity > 1 ? 's' : ''}\n`;
  message += `💰 Total Amount: ${formatNaira(totalPrice)}\n`;
  message += `🚚 Terms: Payment on Delivery (Nationwide Delivery)\n`;

  if (customerName) {
    message += `👤 My Name: ${customerName}\n`;
  }
  if (deliveryCity) {
    message += `📍 Delivery Location: ${deliveryCity}\n`;
  }

  message += `\nPlease confirm my order and arrange delivery. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
