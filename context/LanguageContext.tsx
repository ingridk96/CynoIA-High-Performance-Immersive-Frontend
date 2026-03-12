'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en';

export interface Translations {
  nav: {
    features: string;
    solutions: string;
    pricing: string;
    about: string;
    cta: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
    trusted: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string; icon: string }>;
  };
  value: {
    title: string;
    subtitle: string;
    cards: Array<{ title: string; description: string; stat: string; statLabel: string; color: string }>;
  };
  stats: {
    items: Array<{ value: string; label: string }>;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    note: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    links: {
      company: { label: string; items: string[] };
      product: { label: string; items: string[] };
      legal: { label: string; items: string[] };
    };
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      features: 'Fonctionnalités',
      solutions: 'Solutions',
      pricing: 'Tarifs',
      about: 'À propos',
      cta: 'Commencer',
    },
    hero: {
      badge: 'N°1 Plateforme IA en Afrique',
      title1: 'CynoIA',
      title2: "L'intelligence africaine",
      title3: 'qui forge l\'avenir du continent.',
      subtitle:
        "La plateforme d'IA la plus avancée d'Afrique. Automatisez vos processus, anticipez les marchés et propulsez votre croissance vers de nouveaux sommets.",
      cta_primary: 'Démarrer Gratuitement',
      cta_secondary: 'Voir la démo',
      trusted: 'Déjà adopté par +500 entreprises africaines',
    },
    features: {
      title: 'Technologie de pointe',
      subtitle: 'Des outils conçus pour l\'Afrique, par des experts africains',
      items: [
        { title: 'IA Conversationnelle', description: 'Chatbots multilingues supportant les langues locales africaines avec une précision incomparable.', icon: '💬' },
        { title: 'Analyse Prédictive', description: "Anticipez les tendances du marché africain grâce à nos algorithmes propriétaires.", icon: '📊' },
        { title: 'Automatisation Intelligente', description: 'Automatisez vos processus métier et gagnez en productivité x10.', icon: '⚡' },
        { title: 'Vision par Ordinateur', description: "Détection et analyse d'images adaptées aux contextes africains.", icon: '👁️' },
        { title: 'API Universelle', description: 'Intégration facile avec votre stack existant via notre API RESTful.', icon: '🔗' },
        { title: 'Sécurité Enterprise', description: 'Chiffrement de bout en bout et conformité RGPD pour vos données.', icon: '🔐' },
      ],
    },
    value: {
      title: "L'innovation sans compromis",
      subtitle: 'Une expérience inégalée pour les entreprises africaines',
      cards: [
        { title: 'Performance Ultra-Rapide', description: 'Infrastructure distribuée sur 8 data centers africains pour une latence minimale.', stat: '<10ms', statLabel: 'Latence', color: '#00D4FF' },
        { title: 'Précision Inégalée', description: 'Modèles entraînés sur des données africaines pour une pertinence maximale.', stat: '99.2%', statLabel: 'Précision', color: '#A855F7' },
        { title: 'Scalabilité Totale', description: 'De la startup à l\'entreprise, notre plateforme évolue avec vous.', stat: '∞', statLabel: 'Scalable', color: '#F5A623' },
      ],
    },
    stats: {
      items: [
        { value: '500+', label: 'Entreprises Clientes' },
        { value: '54', label: 'Pays Africains' },
        { value: '99.9%', label: 'Uptime Garanti' },
        { value: '10M+', label: 'Requêtes/Jour' },
      ],
    },
    cta: {
      title: 'Prêt à rejoindre la révolution IA ?',
      subtitle: 'Rejoignez les 500+ entreprises africaines qui font confiance à CynoIA.',
      button: 'Rejoindre la Révolution',
      note: 'Essai gratuit 14 jours — Aucune carte requise',
    },
    footer: {
      tagline: "L'intelligence artificielle au service de l'Afrique",
      copyright: '© 2026 CynoIA. Tous droits réservés.',
      links: {
        company: { label: 'Entreprise', items: ['À propos', 'Blog', 'Carrières', 'Presse'] },
        product: { label: 'Produit', items: ['Fonctionnalités', 'Tarifs', 'API', 'Changelog'] },
        legal: { label: 'Légal', items: ['Confidentialité', 'CGU', 'Cookies', 'RGPD'] },
      },
    },
  },
  en: {
    nav: {
      features: 'Features',
      solutions: 'Solutions',
      pricing: 'Pricing',
      about: 'About',
      cta: 'Get Started',
    },
    hero: {
      badge: '#1 AI Platform in Africa',
      title1: 'CynoIA',
      title2: 'The African intelligence',
      title3: 'forging the future of the continent.',
      subtitle:
        'The most advanced AI platform in Africa. Automate processes, anticipate markets, and propel your growth to new heights.',
      cta_primary: 'Start for Free',
      cta_secondary: 'Watch Demo',
      trusted: 'Already trusted by 500+ African businesses',
    },
    features: {
      title: 'Cutting-Edge Technology',
      subtitle: 'Tools built for Africa, by African experts',
      items: [
        { title: 'Conversational AI', description: 'Multilingual chatbots supporting local African languages with unmatched accuracy.', icon: '💬' },
        { title: 'Predictive Analytics', description: 'Anticipate African market trends with our proprietary algorithms.', icon: '📊' },
        { title: 'Smart Automation', description: 'Automate your business processes and gain 10x productivity.', icon: '⚡' },
        { title: 'Computer Vision', description: 'Image detection and analysis tailored to African contexts.', icon: '👁️' },
        { title: 'Universal API', description: 'Easy integration with your existing stack via our RESTful API.', icon: '🔗' },
        { title: 'Enterprise Security', description: 'End-to-end encryption and GDPR compliance for your data.', icon: '🔐' },
      ],
    },
    value: {
      title: 'Innovation Without Compromise',
      subtitle: 'An unmatched experience for African businesses',
      cards: [
        { title: 'Ultra-Fast Performance', description: 'Distributed infrastructure across 8 African data centers for minimal latency.', stat: '<10ms', statLabel: 'Latency', color: '#00D4FF' },
        { title: 'Unrivaled Precision', description: 'Models trained on African data for maximum relevance.', stat: '99.2%', statLabel: 'Accuracy', color: '#A855F7' },
        { title: 'Total Scalability', description: 'From startup to enterprise, our platform grows with you.', stat: '∞', statLabel: 'Scalable', color: '#F5A623' },
      ],
    },
    stats: {
      items: [
        { value: '500+', label: 'Client Companies' },
        { value: '54', label: 'African Countries' },
        { value: '99.9%', label: 'Guaranteed Uptime' },
        { value: '10M+', label: 'Requests/Day' },
      ],
    },
    cta: {
      title: 'Ready to Join the AI Revolution?',
      subtitle: 'Join 500+ African businesses that trust CynoIA to transform their operations.',
      button: 'Join the Revolution',
      note: '14-day free trial — No credit card required',
    },
    footer: {
      tagline: 'Artificial intelligence serving Africa',
      copyright: '© 2026 CynoIA. All rights reserved.',
      links: {
        company: { label: 'Company', items: ['About', 'Blog', 'Careers', 'Press'] },
        product: { label: 'Product', items: ['Features', 'Pricing', 'API', 'Changelog'] },
        legal: { label: 'Legal', items: ['Privacy', 'Terms', 'Cookies', 'GDPR'] },
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
