import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { customers } from "@/data/customers";
import { useCustomerDirectory } from "@/components/customers/use-customer-directory";

describe("customer directory", () => {
  it("trims and case-folds searches across supported fields", () => {
    const { result } = renderHook(() => useCustomerDirectory(customers));
    act(() =>
      result.current.updateSearch(`  ${customers[0].email.toUpperCase()}  `),
    );
    expect(result.current.filteredCustomers.map((item) => item.id)).toEqual([
      customers[0].id,
    ]);
  });

  it("combines filters, sorting, pagination, and resets the page", () => {
    const { result } = renderHook(() => useCustomerDirectory(customers));
    act(() => result.current.updatePageSize(5));
    act(() => result.current.setPage(3));
    act(() => result.current.updateStatus(customers[0].status));
    expect(result.current.currentPage).toBe(1);
    expect(
      result.current.filteredCustomers.every(
        (item) => item.status === customers[0].status,
      ),
    ).toBe(true);
    act(() => result.current.updateSort("name-desc"));
    const names = result.current.filteredCustomers.map((item) => item.name);
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });
});
