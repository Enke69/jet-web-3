import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import Chatbase from "@/components/layout/Chatbase";

export const metadata = {
  title: "JET Institute — Mongolia's Official IELTS Test Centre",
  description:
    "JET Institute is Mongolia's first computer-delivered IELTS test centre and official British Council partner. Book your IELTS test, view test dates, fees, and preparation resources.",
  icons: {
    icon: "/images/newlogo.png",
    apple: "/images/newlogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-vh-100 d-flex flex-column">
        <BootstrapClient />
        <TopBar />
        {children}
        <Footer />
        <BackToTop />
        <Chatbase />
      </body>
    </html>
  );
}
