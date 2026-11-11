/**
 * Default Contact page copy, used where the CMS (Static pages → Contact) has none.
 * Email, phone, socials and office addresses come from the CMS Social Media & Footer.
 */

const BOOKING_URL = "https://calendar.app.google/5nNHP69fUR5WEMvt9";

export const contactContent = {
  hero: {
    label: "(Contact)",
    headlineTop: "Let's build",
    headlineHighlight: "something great.",
    description:
      "Tell us where you want to grow. You'll get a reply within 24 hours with clear next steps, whether you work with us or not.",
    primaryLabel: "Book a free strategy call",
    primaryUrl: BOOKING_URL,
    secondaryLabel: "Send a brief",
    secondaryUrl: "#brief",
    imageUrl: "", // CMS hero image; empty: the team photo
  },
  direct: {
    label: "(Direct lines)",
    emailLabel: "Email",
    phoneLabel: "Call or WhatsApp",
    socialLabel: "Follow",
    replyNote: "Average first reply: under 4 working hours.",
  },
  offices: {
    label: "(Visit us)",
    headlineMain: "Two offices,",
    headlineHighlight: "one team.",
    directionsLabel: "Get directions",
    mapEmbedUrl: "",
  },
};
