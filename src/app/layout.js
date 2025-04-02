import {Inter} from 'next/font/google';
import './globals.css';
import Header from './components/Header'; // Import the Header

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Tyler Steptoe', // Adjust title
    description: 'Portfolio of Tyler Steptoe, a software developer based in Toronto.', // Adjust description
};

export default function RootLayout({children}) {
    return (
        <html lang="en" className="scroll-smooth"> {/* Add scroll-smooth here */}
        <body className={`${inter.className} bg-white text-gray-900`}>
        <Header/> {/* Render the Header here, outside the main content */}
        <main>{children}</main>
        {/* You could add a Footer component here later */}
        </body>
        </html>
    );
}