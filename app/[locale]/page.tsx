import { redirect } from "next/navigation";

export default async function Home({params}: PageProps<'/[locale]'>) {
  const {locale} = await params;
  return redirect(`/${locale}/login`);
}
