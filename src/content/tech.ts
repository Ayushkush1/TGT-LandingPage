/**
 * Technology logos (Simple Icons, in brand colours) in /public/images/tech/.
 * Matched by the names used in service stacks and CMS tags; anything not listed here has no logo.
 */
const aliases: Record<string, string> = {
  // Service stacks
  "react js": "react",
  "next.js": "nextdotjs",
  "vue js": "vuedotjs",
  "node & express": "nodedotjs",
  "nest js": "nestjs",
  laravel: "laravel",
  django: "django",
  wordpress: "wordpress",
  shopify: "shopify",
  flutter: "flutter",
  "react native": "react",
  "ios (swift)": "swift",
  "android (java, kotlin)": "android",
  "mern stack": "mongodb",
  "mean stack": "angular",
  ".net": "dotnet",
  java: "openjdk",
  python: "python",
  flask: "flask",
  "blockchain & web3": "ethereum",
  sap: "sap",
  analytics: "googleanalytics",
  "analytics & cro": "googleanalytics",
  "google ads": "googleads",
  "meta ads": "meta",
  "generative ai": "openai",
  tableau: "tableau",
  aws: "amazonwebservices",
  figma: "figma",
  // CMS tags
  react: "react",
  "node.js": "nodedotjs",
  vue: "vuedotjs",
  woocommerce: "woocommerce",
  "shopify plus": "shopify",
  swift: "swift",
  kotlin: "kotlin",
  docker: "docker",
  kubernetes: "kubernetes",
  postgresql: "postgresql",
  stripe: "stripe",
  "tailwind css": "tailwindcss",
  graphql: "graphql",
  sanity: "sanity",
  linkedin: "linkedin",
  instagram: "instagram",
  "openai api": "openai",
  xcode: "xcode",
  "android studio": "androidstudio",
  "google play": "googleplay",
  "play store": "googleplay",
  "app store connect": "appstore",
  "apple ui": "apple",
  "material design": "materialdesign",
  "aws / cloud": "amazonwebservices",
};

/** Path to a technology's logo, or undefined when we don't have one. */
export const techLogo = (name: string) => {
  const slug = aliases[name.trim().toLowerCase()];
  return slug ? `/images/tech/${slug}.svg` : undefined;
};
