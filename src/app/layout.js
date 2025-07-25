import './globals.css';
import {Inter} from 'next/font/google';
import Header from './components/Header';
import {SectionProvider} from './components/SectionContext';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Tyler Steptoe',
    description: 'Portfolio of Tyler Steptoe, a software developer based in Toronto.',
    openGraph: {
        images: [
            {
                url: 'https://tylersteptoe.com/images/Thumbnail.png',
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://tylersteptoe.com/images/Thumbnail.png'],
    },
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
