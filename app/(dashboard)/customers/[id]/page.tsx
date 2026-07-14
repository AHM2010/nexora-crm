import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomerDetailView } from "@/components/customers/customer-detail-view";
import { customerDetails, getCustomerDetails } from "@/data/customer-details";

export function generateStaticParams() {
  return customerDetails.map((customer) => ({ id: customer.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/customers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const customer = getCustomerDetails(id);
  return {
    title: customer
      ? `${customer.name} | Nexora CRM`
      : "Customer not found | Nexora CRM",
  };
}

export default async function CustomerDetailsPage({
  params,
}: PageProps<"/customers/[id]">) {
  const { id } = await params;
  const customer = getCustomerDetails(id);
  if (!customer) notFound();
  return <CustomerDetailView customer={customer} />;
}
