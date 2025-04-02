import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xs bg-transparent">
            <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
                {/* Optional: Add a Logo or Name on the left if desired */}
                {/* <Link href="/" className="text-xl font-bold">Tyler Steptoe</Link> */}
                <div></div>
                {/* Empty div to push nav links right if no logo */}

                <ul className="flex space-x-6 sm:space-x-8">
                    <li><Link href="/"
                              className="text-gray-700 hover:text-black hover:underline underline-offset-4 decoration-2">Home</Link>
                    </li>
                    <li><Link href="/#projects"
                              className="text-gray-700 hover:text-black hover:underline underline-offset-4 decoration-2">Projects</Link>
                    </li>
                    {/* Add Blog and Contact later if needed */}
                    {/* <li><Link href="/blog" className="text-gray-700 hover:text-black hover:underline underline-offset-4 decoration-2">Blog</Link></li> */}
                    {/* <li><Link href="/contact" className="text-gray-700 hover:text-black hover:underline underline-offset-4 decoration-2">Contact</Link></li> */}
                </ul>
            </nav>
        </header>
    );
}