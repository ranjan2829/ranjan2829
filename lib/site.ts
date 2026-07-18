/**
 * Single source of truth for profile links and contact details.
 * Hero and NavBar previously hardcoded two *different* LinkedIn URLs;
 * anything user-facing should read from here so they can't drift again.
 */
export const site = {
  name: "Ranjan Shitole",
  url: "https://ranjan2829.vercel.app",
  email: "ranjan.shitole3129@gmail.com",
  phone: "+917387792437",
  phoneDisplay: "+91 73877 92437",
  locations: ["Dubai, UAE", "Pune, India"],
  socials: {
    github: "https://github.com/ranjan2829",
    linkedin: "https://www.linkedin.com/in/ranjan2829/",
    leetcode: "https://leetcode.com/u/ranjanshitole/",
    twitter: "https://x.com/manofsteel3129",
  },
  handles: {
    github: "@ranjan2829",
    leetcode: "@ranjanshitole",
  },
} as const;
