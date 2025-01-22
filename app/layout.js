import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./Pages/Navbar/Navbar";

const poppins = Poppins({
  variable: "--font-geist-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Moxtil Games Store ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <div className="mainContainer">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
