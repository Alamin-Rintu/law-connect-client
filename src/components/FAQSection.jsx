"use client";

import {
  ArrowsRotateLeft,
  Box,
  ChevronDown,
  CreditCard,
  PlanetEarth,
  Receipt,
  ShoppingBag,
} from "@gravity-ui/icons";
import { Accordion } from "@heroui/react";

const items = [
  {
    content:
      "Browse verified lawyers, view their profiles, and book consultations instantly. You can choose online or in-person sessions.",
    icon: <ShoppingBag />,
    title: "How do I book a lawyer consultation?",
  },
  {
    content:
      "Yes. You can reschedule or cancel a consultation before the scheduled time depending on the lawyer's cancellation policy.",
    icon: <Receipt />,
    title: "Can I reschedule or cancel a booking?",
  },
  {
    content:
      "We support secure online payments including cards, mobile banking, and trusted payment gateways to ensure safe transactions.",
    icon: <CreditCard />,
    title: "What payment methods are available?",
  },
  {
    content:
      "Consultation fees vary based on lawyer experience, case type, and session duration. You’ll always see transparent pricing before booking.",
    icon: <Box />,
    title: "How is consultation pricing calculated?",
  },
  {
    content:
      "Yes. You can connect with lawyers from multiple regions depending on their availability and licensing scope.",
    icon: <PlanetEarth />,
    title: "Can I hire lawyers from different locations?",
  },
  {
    content:
      "If you're not satisfied with a consultation, you can request support review. Refunds depend on platform policy and case validation.",
    icon: <ArrowsRotateLeft />,
    title: "What is your refund policy?",
  },
];

export function FAQSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-widest text-blue-600 uppercase">
            Legal Support
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto">
            Everything you need to know about booking lawyers, payments, and
            legal consultations.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-2xl mx-auto border rounded-2xl p-5 bg-white">
          <Accordion className="w-full" variant="splitted">
            {items.map((item, index) => (
              <Accordion.Item key={index}>
                <Accordion.Heading>
                  <Accordion.Trigger className="flex items-center gap-3 py-3">
                    {/* Icon */}
                    <span className="flex items-center justify-center size-9 rounded-full bg-blue-50 text-blue-600">
                      {item.icon}
                    </span>

                    {/* Title */}
                    <span className="flex-1 text-left font-medium text-slate-800 text-lg">
                      {item.title}
                    </span>

                    {/* Indicator */}
                    <Accordion.Indicator>
                      <ChevronDown className="transition-transform duration-300" />
                    </Accordion.Indicator>
                  </Accordion.Trigger>
                </Accordion.Heading>

                <Accordion.Panel>
                  <Accordion.Body className="text-slate-600 pl-12 pr-4 pb-4 leading-relaxed">
                    {item.content}
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
