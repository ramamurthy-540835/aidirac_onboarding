import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

type PageContainerProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PageContainer({
  eyebrow,
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      {children}
    </div>
  );
}
