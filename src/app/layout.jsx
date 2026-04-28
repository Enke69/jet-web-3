import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
  title: "jettest",
  description: "jettest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body className="min-vh-100 d-flex flex-column">
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}
