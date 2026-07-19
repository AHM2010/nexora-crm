import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomerDetailView } from "@/components/customers/customer-detail-view";
import { customerDetails, getCustomerDetails } from "@/data/customer-details";

export function generateStaticParams() {
  return customerDetails.map((customer) => ({ id: customer.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/customers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const customer = getCustomerDetails(id);
  return {
    title: customer ? customer.name : "Customer not found",
    description: customer
      ? `View ${customer.name}'s customer profile, activity, and deals.`
      : "The requested customer could not be found.",
  };
}

export default async function CustomerDetailsPage({
  params,
}: PageProps<"/[locale]/customers/[id]">) {
  const { id } = await params;
  const customer = getCustomerDetails(id);
  if (!customer) notFound();
  return <CustomerDetailView customer={customer} />;
}
