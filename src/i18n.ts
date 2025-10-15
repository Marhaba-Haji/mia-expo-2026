import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      brand: 'MIA Business Expo',
      nav: {
        about: 'About',
        whyExhibit: 'Why Exhibit',
        whyVisit: 'Why Visit',
        packages: 'Exhibitor Packages',
        sponsors: 'Sponsor Opportunities',
        programme: 'Programme',
        speakers: 'Speakers',
        floor: 'Floor Plan',
        visitors: 'Visitor Info',
        news: 'News & Press',
        directory: 'Exhibitors',
        matchmaking: 'B2B Matchmaking',
        contact: 'Contact',
        admin: 'Admin',
      },
      hero: {
        title: "India's Inclusive Trade Show for Minority Communities",
        subtitle: 'Connecting Muslim, Sikh, Christian, Parsi and Jain businesses with buyers, investors and partners.',
        ctaExhibit: 'Register as Exhibitor',
        ctaTickets: 'Register as Visitor',
        ctaSponsor: 'Become a Sponsor',
        metaDate: '05-07 Jun 2026',
        metaPlace: 'Tripura Vasini, Palace Grounds, Bangalore',
      },
    }
  },
  hi: {
    translation: {
      brand: 'एमआईए बिज़नेस एक्सपो',
      nav: {
        about: 'हमारे बारे में',
        whyExhibit: 'प्रदर्शनी क्यों करें',
        whyVisit: 'मुलाक़ात क्यों करें',
        packages: 'एग्ज़िबिटर पैकेज',
        sponsors: 'प्रायोजन अवसर',
        programme: 'कार्यक्रम',
        speakers: 'वक्ता',
        floor: 'फ़्लोर प्लान',
        visitors: 'आगंतुक जानकारी',
        news: 'समाचार और प्रेस',
        directory: 'प्रदर्शक',
        matchmaking: 'बी2बी मैचमेकिंग',
        contact: 'संपर्क',
        admin: 'एडमिन',
      },
      hero: {
        title: 'भारत का समावेशी ट्रेड शो',
        subtitle: 'मुस्लिम, सिख, क्रिश्चियन, पारसी और जैन व्यवसायों को खरीदारों व भागीदारों से जोड़ना।',
        ctaExhibit: 'एग्ज़िबिटर रजिस्टर करें',
        ctaTickets: 'आगंतुक के रूप में रजिस्टर करें',
        ctaSponsor: 'स्पॉन्सर बनें',
        metaDate: '05-07 जून 2026',
        metaPlace: 'त्रिपुरा वासिनी, पैलेस ग्राउंड्स, बैंगलोर',
      },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
