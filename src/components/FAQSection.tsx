import React from 'react';

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Browse the products, add your favorites to cart and proceed to checkout securely."
  },
  {
    question: "What are the delivery charges?",
    answer: "We offer free shipping on all orders above ₹999."
  },
  {
    question: "Can I return a product?",
    answer: "Yes, returns are accepted within 7 days of delivery."
  },
  {
    question: "Do you have a size guide?",
    answer: "Yes, each product has a dedicated size chart."
  }
];

export default function FAQSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-semibold text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="p-5 border border-gray-300 rounded-lg bg-white shadow">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
