import Footer from "../Footer";
import Header from "../Header";

interface LayoutProps {
  children: React.ReactNode;
  isOnDetailPage?: boolean;
}

export default function Layout({ children, isOnDetailPage }: LayoutProps) {
  return (
    <>
      <Header isOnDetailPage={isOnDetailPage} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
