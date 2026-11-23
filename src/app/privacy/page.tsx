import Link from "next/link";
import { brand } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/site";
import styles from "@/components/pages/pages.module.css";

const title = `Privacy Policy | ${brand.name}`;
const description =
  "How Calcify International collects, uses and protects personal information from our website, contact form and Facebook and Instagram lead forms.";
const UPDATED = "23 November 2026";

export const metadata = pageMetadata("/privacy", title, description);

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema("WebPage", "/privacy", title, description), breadcrumbSchema(breadcrumbs)],
};

const mail = <a href={`mailto:${brand.email}`} className="text-link">{brand.email}</a>;

export default function Privacy() {
  return (
    <article className="studio-subpage">
      <JsonLd data={schema} />
      <header className={styles.detailHero} data-lattice="calm">
        <nav aria-label="Breadcrumb">
          <ol className={styles.breadcrumbs}>
            <li><Link href="/">Home</Link><span aria-hidden="true">/</span></li>
            <li aria-current="page">Privacy Policy</li>
          </ol>
        </nav>
        <h1 className={styles.detailTitle}>Privacy Policy</h1>
        <p>
          This policy explains what personal information {brand.name} collects, why we collect it and the
          choices you have. Last updated {UPDATED}.
        </p>
      </header>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>Who we are</h2>
        <p>
          {brand.name} (&ldquo;Calcify&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a software development
          company based in Colombo, Sri Lanka. We are responsible for the personal information described in
          this policy. You can reach us at {mail} or {brand.phone}.
        </p>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>What we collect</h2>
        <ul className={styles.legalList}>
          <li>
            <strong>Contact form.</strong> Your name, email address, company, message, the services you are
            interested in and your budget range, if you provide them.
          </li>
          <li>
            <strong>Facebook and Instagram lead forms.</strong> When you respond to one of our ads, Meta passes
            us the details you submit in the form, such as your name, email address, phone number and your
            answers to our questions. Meta&rsquo;s handling of that data is covered by the{" "}
            <a href="https://www.facebook.com/privacy/policy/" className="text-link" rel="noopener noreferrer" target="_blank">Meta Privacy Policy</a>.
          </li>
          <li>
            <strong>Emails, calls and WhatsApp messages.</strong> The details you share when you contact us
            directly.
          </li>
          <li>
            <strong>Technical data.</strong> Your IP address and basic browser information, used to protect
            the contact form against spam and abuse.
          </li>
          <li>
            <strong>Analytics, only with your consent.</strong> If you accept analytics cookies, Google
            Analytics records how the site is used, such as pages viewed and approximate location. If you
            decline, no analytics cookies are set.
          </li>
        </ul>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>How we use it</h2>
        <ul className={styles.legalList}>
          <li>To reply to your enquiry, arrange a consultation and prepare proposals or quotes.</li>
          <li>To follow up about the project you asked about. We do not add you to a newsletter without asking.</li>
          <li>To keep the site and contact form secure and free of spam.</li>
          <li>To understand how the site is used and improve it, where you have given consent.</li>
        </ul>
        <p>
          We use your information because you asked us to contact you, because we have a legitimate interest
          in responding to business enquiries and keeping our services secure, or because you consented (for
          analytics). We never sell your personal information.
        </p>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>Who we share it with</h2>
        <p>We share personal information only with service providers that help us run the business:</p>
        <ul className={styles.legalList}>
          <li><strong>Meta Platforms</strong>, which delivers our ads and lead forms.</li>
          <li><strong>Google</strong>, for Google Analytics (with consent) and reCAPTCHA spam protection.</li>
          <li><strong>Our website host and email provider</strong>, which store and deliver the messages you send us.</li>
        </ul>
        <p>
          These providers may process data outside Sri Lanka, including in the United States and the European
          Union. We may also disclose information where the law requires it.
        </p>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>How long we keep it</h2>
        <p>
          We keep enquiry and lead details for up to 24 months after our last contact with you, unless you
          become a client, in which case we keep records for as long as the engagement and our legal
          obligations require. You can ask us to delete your details sooner.
        </p>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>Your rights</h2>
        <p>
          Depending on where you live, including under Sri Lanka&rsquo;s Personal Data Protection Act, the UK and
          EU GDPR and Australia&rsquo;s Privacy Act, you can ask us to:
        </p>
        <ul className={styles.legalList}>
          <li>tell you what personal information we hold about you and give you a copy;</li>
          <li>correct or update it;</li>
          <li>delete it, or stop contacting you;</li>
          <li>object to or restrict how we use it; and</li>
          <li>withdraw consent for analytics at any time, using &ldquo;Cookie settings&rdquo; in the site footer.</li>
        </ul>
        <p>
          Email {mail} and we will respond within 30 days. If you are not satisfied with our response, you can
          complain to your local data protection authority.
        </p>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>Security and children</h2>
        <p>
          We limit access to personal information to the people who need it and use providers with
          industry-standard security. Our services are for businesses, and we do not knowingly collect
          information from anyone under 18.
        </p>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>Changes to this policy</h2>
        <p>
          We will update this page if our practices change and revise the date at the top. Questions about
          this policy? Contact us at {mail}.
        </p>
      </section>
    </article>
  );
}
