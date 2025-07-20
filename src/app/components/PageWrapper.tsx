"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const PageWrapper = ({ children }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageWrapper;
