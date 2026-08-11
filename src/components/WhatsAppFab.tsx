import { motion } from 'framer-motion';
import { WA_GENERAL } from '../utils/whatsapp';
import { useOrderList } from '../hooks/useOrderList';
import { IconWhatsApp } from './Icons';

/** Non-negotiable NEXIX element: always-visible WhatsApp entry point. */
export default function WhatsAppFab() {
  const { count } = useOrderList();

  // The order bar takes over the same corner and carries its own WhatsApp CTA,
  // so two floating green buttons never stack.
  if (count > 0) return null;

  return (
    <motion.a
      className="fab"
      href={WA_GENERAL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.2 }}
    >
      <span className="fab__ring" aria-hidden="true" />
      <span className="fab__icon">
        <IconWhatsApp size={30} />
      </span>
      <span className="fab__label">Escríbenos</span>
    </motion.a>
  );
}
