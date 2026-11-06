import Link from "next/link";
import { notFound } from "next/navigation";
import { brand, services } from "@/lib/content";
import { ORGANIZATION_ID, pageMetadata, SITE_URL } from "@/lib/site";
import styles from "@/components/pages/pages.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ path }) => ({ slug: path.slice("/services/".length) }));
}

async function getService(params: Props["params"]) {
  const { slug } = await params;
  const service = services.find(({ path }) => path === `/services/${slug}`);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: Props) {
  const service = await getService(params);
  return pageMetadata(service.path, `${service.title} | ${brand.name}`, service.description);
}

export default async function ServicePage({ params }: Props) {
  const service = await getService(params);
  const related = services.filter(({ slug }) => service.related.includes(slug));
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: service.path },
  ];
  const url = `${SITE_URL}${service.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        description: service.description,
        url,
        provider: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map(({ name, path }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item: `${SITE_URL}${path}`,
        })),
      },
    ],
  };

  return (
    <article className="studio-subpage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <header className={styles.detailHero} data-lattice="calm">
        <nav aria-label="Breadcrumb">
          <ol className={styles.breadcrumbs}>
            {breadcrumbs.slice(0, -1).map(({ name, path }) => (
              <li key={path}><Link href={path}>{name}</Link><span aria-hidden="true">/</span></li>
            ))}
            <li aria-current="page">{service.title}</li>
          </ol>
        </nav>
        <h1 className={styles.detailTitle}>{service.title}</h1>
        <p>{service.description}</p>
        <Link href="/contact" className="btn btn-primary">
          Discuss your project <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <section className={styles.detailSection} data-lattice="grid">
        <h2>What we can help with</h2>
        <div className={styles.detailGrid}>
          {service.capabilities.map(({ title, body }) => (
            <div className={styles.detailCard} key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>How we approach the work</h2>
        <p>{service.approach}</p>
        <Link href="/about#how" className="text-link">How Calcify works <span aria-hidden="true">↗</span></Link>
      </section>

      <section className={styles.detailSection} data-lattice="calm">
        <h2>Related services</h2>
        <ul className={styles.detailLinks}>
          {related.map(({ path, title }) => (
            <li key={path}><Link href={path} className="text-link">{title} <span aria-hidden="true">↗</span></Link></li>
          ))}
        </ul>
      </section>
    </article>
  );
}
