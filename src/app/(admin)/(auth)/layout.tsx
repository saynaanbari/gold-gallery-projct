import GlobalToaster from "@/shared/toast/toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalToaster />
      {children}
    </>
  );
}
