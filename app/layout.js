import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Exam Buddy",
  description: "The ultimate educational resource hub.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ flex: 1, padding: "2rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
