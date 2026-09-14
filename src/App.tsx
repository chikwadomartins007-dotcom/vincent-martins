import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { RotatingSpecsSlideshow } from './components/RotatingSpecsSlideshow';
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
import { OrderFormData } from './types';

export default function App() {
  const [quantity, setQuantity] = useState<number>(1);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Order submission state
  const [submittedOrder, setSubmittedOrder] = useState<OrderFormData | null>(null);
  const [orderReference, setOrderReference] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // WhatsApp business contact for post-order confirmation
  const businessWhatsApp = DEFAULT_WHATSAPP;

  // Pricing calculations
  const currentTier = getTierForQty(quantity);

  const scrollToOrder = () => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
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
      <Header onOrderClick={scrollToOrder} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOrderClick={scrollToOrder}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 9:16 Video Showcase */}
        <VideoSection />

        {/* Authentic Factory Specifications Live Rotating Slideshow */}
        <RotatingSpecsSlideshow
          onOrderClick={scrollToOrder}
          onOpenLightbox={handleOpenLightbox}
        />

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
        />

        {/* Customer Testimonials */}
        <TestimonialsSection />

        {/* FAQ Accordions */}
        <FaqSection />

        {/* Final Conversion Banner */}
        <FinalCta
          onOrderClick={scrollToOrder}
        />
      </main>

      {/* Footer */}
      <Footer onOrderClick={scrollToOrder} />

      {/* Mobile Sticky CTA Bar */}
      <StickyBottomBar
        totalPrice={currentTier.totalPrice}
        quantity={quantity}
        onOrderClick={scrollToOrder}
      />

      {/* Fullscreen Photo Lightbox */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={PRODUCT_IMAGES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setLightboxIndex}
      />

      {/* Order Confirmation Modal - WhatsApp ONLY available here after form submission */}
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
