import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Tyler Steptoe',
    description: 'Portfolio of Tyler Steptoe, a software developer based in Toronto.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
        <body className={`${inter.className} bg-white text-gray-900`}>
        <Header />
        <main>{children}</main>
        </body>
        </html>
    );
}
