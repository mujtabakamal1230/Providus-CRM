import { NavbarClient } from "@/components/layout/NavbarClient";
import {
  SALESFORCE_CONSULTING_SERVICES_SLUG,
  salesforceConsultingServicesFallback,
} from "@/data/salesforceServicePage";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SERVICE_NAV_QUERY } from "@/sanity/lib/queries";
import type { NavItem } from "@/types";

interface ServiceNavItem {
  title: string;
  slug: string;
}

const fallbackServices: NavItem[] = [
  {
    label: salesforceConsultingServicesFallback.title,
    href: `/salesforce/${SALESFORCE_CONSULTING_SERVICES_SLUG}`,
  },
];

export async function Navbar() {
  const services = await sanityFetch<ServiceNavItem[]>({
    query: SERVICE_NAV_QUERY,
    tags: ["service-pages"],
    revalidate: 300,
    metadata: true,
  });

  const fetchedServices =
    services && services.length > 0
      ? services.map((service) => ({
          label: service.title,
          href: `/salesforce/${service.slug}`,
        }))
      : [];

  const hasFallbackService = fetchedServices.some(
    (service) => service.href === fallbackServices[0].href
  );
  const salesforceServices = hasFallbackService
    ? fetchedServices
    : [...fallbackServices, ...fetchedServices];

  return <NavbarClient salesforceServices={salesforceServices} />;
}
