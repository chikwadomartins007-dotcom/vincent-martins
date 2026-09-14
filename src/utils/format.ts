import { DEFAULT_WHATSAPP } from '../data/mockData';

export const formatNaira = (amount: number): string => {
  return '₦' + amount.toLocaleString('en-NG');
};

export const createWhatsAppUrl = (
  quantity: number,
  totalPrice: number,
  phone: string = DEFAULT_WHATSAPP,
  customerName?: string,
  deliveryCity?: string,
  orderReference?: string
): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  let message = `Hello MAX LUXURY HOME TECH,\n\nI have completed my order for the *A-01 Smart Door Lock* on the website.\n\n`;
  if (orderReference) {
    message += `🔖 Order Reference: *${orderReference}*\n`;
  }
  message += `📦 Quantity: ${quantity} piece${quantity > 1 ? 's' : ''}\n`;
  message += `💰 Total Amount: ${formatNaira(totalPrice)}\n`;
  message += `🚚 Terms: Payment on Delivery (Nationwide Delivery)\n`;

  if (customerName) {
    message += `👤 Customer: ${customerName}\n`;
  }
  if (deliveryCity) {
    message += `📍 Delivery Location: ${deliveryCity}\n`;
  }

  message += `\nPlease confirm my dispatch and delivery schedule. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
