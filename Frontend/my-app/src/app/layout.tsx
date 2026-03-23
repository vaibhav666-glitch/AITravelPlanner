import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex flex-col min-h-screen">
        
        

        <main >
          {children}
        </main>

      
        
      </body>
    </html>
  );
}