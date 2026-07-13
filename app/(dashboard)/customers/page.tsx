import { CustomerWorkspace } from "@/components/customers/customer-workspace";
import { customers } from "@/data/customers";

export default function CustomersPage() {
  return <CustomerWorkspace initialCustomers={customers} />;
}
