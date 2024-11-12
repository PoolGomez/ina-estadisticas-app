import { HeaderPublic } from "@/components/HeaderPublic";


interface PublicLayoutProps {
    children: React.ReactNode;
  }

export function LayoutPublic(props: PublicLayoutProps) {
    const {children} = props
  return (
    <>
      <HeaderPublic />
      <main>{children}</main>
    </>
  )
}
