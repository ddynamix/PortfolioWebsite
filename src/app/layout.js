import './globals.css';
import {Inter} from 'next/font/google';
import Header from './components/Header';
import {SectionProvider} from './components/SectionContext';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Tyler Steptoe',
    description: 'Portfolio of Tyler Steptoe, a software developer based in Toronto.',
};

export default function RootLayout({children}) {
    return (
        <html lang="en" className="scroll-smooth">
        <body className={`${inter.className} bg-white text-gray-900`}>
        <SectionProvider>
            <Header/>
            <main>
                {children}
            </main>
        </SectionProvider>
        </body>
        </html>
    );
}
