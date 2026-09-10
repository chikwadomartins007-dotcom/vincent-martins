import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { ProblemSection } from './components/ProblemSection';
import { SmartAccessSection } from './components/SmartAccessSection';
import { HardwareHighlights } from './components/HardwareHighlights';
import { WhyUpgradeAndSteps } from './components/WhyUpgradeAndSteps';
import { PricingCalculator } from './components/PricingCalculator';
import { OrderForm } from './components/OrderForm';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { StickyBottomBar } from './components/StickyBottomBar';
import { LightboxModal } from './components/LightboxModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { PRODUCT_IMAGES, DEFAULT_WHATSAPP, getTierForQty } from './data/mockData';
import { createWhatsAppUrl } from './utils/format';
import { OrderFormData } from './types';

export default function App() {
  const [quantity, setQuantity] = useState<number>(1);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Order submission state
  const [submittedOrder, setSubmittedOrder] = useState<OrderFormData | null>(null);
  const [orderReference, setOrderReference] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // WhatsApp business contact
  const businessWhatsApp = DEFAULT_WHATSAPP;

  // Pricing calculations
  const currentTier = getTierForQty(quantity);

  const scrollToOrder = () => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsApp = () => {
    const url = createWhatsAppUrl(quantity, currentTier.totalPrice, businessWhatsApp);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleOrderSubmit = (data: OrderFormData, generatedRef?: string) => {
    const finalRef = generatedRef || ('MLH-' + Math.floor(100000 + Math.random() * 900000));
    setOrderReference(finalRef);
    setSubmittedOrder(data);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-['Montserrat',sans-serif]">
      {/* Top Navbar */}
      <Header onWhatsAppClick={handleOpenWhatsApp} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOrderClick={scrollToOrder}
          onWhatsAppClick={handleOpenWhatsApp}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 9:16 Video Showcase */}
        <VideoSection />

        {/* The Problem Section */}
        <ProblemSection />

        {/* Smart Access Section (8 methods + phone remote unlock) */}
        <SmartAccessSection onOrderClick={scrollToOrder} />

        {/* Hardware Highlights (13 cards + mortise specs) */}
        <HardwareHighlights />

        {/* Why Upgrade + How It Works + Modern Spaces */}
        <WhyUpgradeAndSteps />

        {/* Tiered Quantity Pricing Matrix + Live Calculator */}
        <PricingCalculator
          quantity={quantity}
          onQuantityChange={setQuantity}
          onOrderNowClick={scrollToOrder}
        />

        {/* Order Form + In The Box + Shipping Info */}
        <OrderForm
          quantity={quantity}
          onQuantityChange={setQuantity}
          onSubmitOrder={handleOrderSubmit}
          businessWhatsApp={businessWhatsApp}
        />

        {/* Customer Testimonials */}
        <TestimonialsSection />

        {/* FAQ Accordions */}
        <FaqSection />

        {/* Final Conversion Banner */}
        <FinalCta
          onOrderClick={scrollToOrder}
          onWhatsAppClick={handleOpenWhatsApp}
        />
      </main>

      {/* Footer */}
      <Footer onWhatsAppClick={handleOpenWhatsApp} />

      {/* Mobile Sticky CTA Bar */}
      <StickyBottomBar
        totalPrice={currentTier.totalPrice}
        quantity={quantity}
        onOrderClick={scrollToOrder}
        onWhatsAppClick={handleOpenWhatsApp}
      />

      {/* Fullscreen Photo Lightbox */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={PRODUCT_IMAGES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setLightboxIndex}
      />

      {/* Order Confirmation Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        orderData={submittedOrder}
        orderReference={orderReference}
        onClose={() => setShowSuccessModal(false)}
        businessWhatsApp={businessWhatsApp}
      />
    </div>
  );
}
