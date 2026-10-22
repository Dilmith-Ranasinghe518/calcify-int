"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Wordmark from "@/components/ui/Wordmark";

// True only until the first page has mounted in this tab. The very first load
// is covered by the intro loader, so the curtain is for client navigation.
let firstMount = true;

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Route transition. A template re-mounts on every navigation, so each new
 * page arrives under a curtain carrying the wordmark, which then lifts away
 * while the page rises into place.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [initial] = useState(() => firstMount);
  useEffect(() => {
    firstMount = false;
  }, []);

  return (
    <>
      {!initial && (
        <motion.div
          aria-hidden="true"
          className="route-curtain"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
        >
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
            <Wordmark size="xl" sub={false} />
          </motion.div>
        </motion.div>
      )}
      <motion.div
        initial={initial ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
      >
        {children}
      </motion.div>
    </>
  );
}
