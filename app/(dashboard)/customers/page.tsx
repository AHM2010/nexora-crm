import { CustomerWorkspace } from "@/components/customers/customer-workspace";
import { customers } from "@/data/customers";

export const metadata: Metadata = {
  title: "Customers",
  description: "Search, filter, and manage customer relationships.",
};

export default function CustomersPage() {
  return <CustomerWorkspace initialCustomers={customers} />;
}
import type { Metadata } from "next";
