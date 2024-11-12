import { HeaderPrivate } from "@/components/HeaderPrivate";
interface PrivateLayoutProps {
    children: React.ReactNode;
  }
export function LayoutPrivate(props:PrivateLayoutProps) {
    const {children} = props;
  return (
<>
      <HeaderPrivate />
      <main>{children}</main>
    </>  )
}
