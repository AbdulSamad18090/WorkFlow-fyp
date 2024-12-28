import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import Header from "./components/Header/Header";
import { ToastProvider } from "./components/CustomToast/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Workflow | SIJM",
  description: "Manage your workflows with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className}>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
