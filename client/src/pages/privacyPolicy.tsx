// PrivacyPolicy.tsx
import "../styles/landingpage.css";

const SECTIONS = [
  {
    title: "Overview",
    body: "This privacy policy describes how eric-stout.com collects, uses, and handles information when you visit. Your privacy matters, and this site aims to be transparent about its practices.",
  },
  {
    title: "Information collected",
    body: "The site may collect basic analytics such as pages visited and referring URL through third-party tools. If you reach out via email, your name and address may be stored to respond to your message. Cookies or similar technologies may be used to improve user experience — you can disable these in your browser settings at any time.",
  },
  {
    title: "How information is used",
    body: "Any information collected is used solely to understand how visitors use the site and to respond to direct inquiries. Your information is never sold to third parties or used for advertising purposes.",
  },
  {
    title: "Third-party services",
    body: "The site may use third-party services such as hosting providers or analytics platforms that have their own privacy practices. These services are selected carefully, but their policies govern how they handle data on their end.",
  },
  {
    title: "Data retention",
    body: "Contact information is retained only as long as necessary to respond to your inquiry. Aggregate analytics data may be retained longer to understand long-term usage trends.",
  },
  {
    title: "Your rights",
    body: "You have the right to request access to, correction of, or deletion of any personal information you've provided. To make such a request, please reach out via the contact information below.",
  },
  {
    title: "Children's privacy",
    body: "This site is not directed at children under the age of 13, and no personal information is knowingly collected from minors.",
  },
  {
    title: "Changes to this policy",
    body: 'This policy may be updated occasionally. When changes are made, the "last updated" date at the top of this page will be revised. Continued use of the site following any update constitutes acceptance of the revised policy.',
  },
  {
    title: "Contact",
    body: "If you have questions about this privacy policy or how your data is handled, feel free to reach out at eric.stout15@gmail.com.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="lp-root">
      <section className="lp-section">
        <p className="lp-eyebrow">Legal</p>
        <h2 style={{ marginTop: "0.25rem" }}>Privacy Policy</h2>
        <p style={{ color: "var(--lp-muted, #888)", fontSize: "0.875rem", marginBottom: "2rem" }}>
          Last updated: June 2025
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "680px" }}>
          {SECTIONS.map(({ title, body }) => (
            <div key={title}>
              <h3 style={{ marginBottom: "0.4rem" }}>{title}</h3>
              <p style={{ margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="lp-footer">
        Built with React TypeScript · {new Date().getFullYear()}
      </footer>
    </div>
  );
}