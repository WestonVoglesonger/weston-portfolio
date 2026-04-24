'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE = '+19802409865';
const PHONE_DISPLAY = '(980) 240-9865';
const YES_MESSAGE = "Weston — I'm in for May 8! (+ plus-ones: ) — ";
const REGRETS_MESSAGE = "Weston — gutted I can't make May 8. Wishing you well. — ";

function smsLink(body: string) {
  return `sms:${PHONE}?&body=${encodeURIComponent(body)}`;
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

const WHISPERS = [
  'are you sure about that?',
  'really, really sure?',
  'last chance to reconsider.',
];

const MAX_DODGES = 3;
const PROXIMITY = 110;

export function CelebratePage() {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [isEscaping, setIsEscaping] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [whisper, setWhisper] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const dodgeCountRef = useRef(0);

  useEffect(() => {
    dodgeCountRef.current = dodgeCount;
  }, [dodgeCount]);

  useEffect(() => {
    document.body.classList.add('celebrate-mode');
    return () => document.body.classList.remove('celebrate-mode');
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  }

  const handleYes = async () => {
    const copied = await copyToClipboard(YES_MESSAGE);
    if (copied) {
      showToast(`Message copied. If nothing opened, text ${PHONE_DISPLAY} and paste.`);
    } else {
      showToast(`Text ${PHONE_DISPLAY} — your messages app should open.`);
    }
  };

  const dodge = useCallback(
    (clientX: number, clientY: number) => {
      if (dodgeCountRef.current >= MAX_DODGES) return;
      const btn = noBtnRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);

      if (dist < PROXIMITY) {
        const fleeDistance = 120 + Math.random() * 60;
        let angle = Math.atan2(cy - clientY, cx - clientX);
        angle += (Math.random() - 0.5) * 0.8;

        const rsvpArea = btn.closest('.celebrate-info-side');
        const bounds = rsvpArea
          ? rsvpArea.getBoundingClientRect()
          : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };

        const pad = 8;
        const minX = bounds.left + pad;
        const maxX = bounds.right - rect.width - pad;
        const minY = bounds.top + pad;
        const maxY = bounds.bottom - rect.height - pad;

        let newX = cx + Math.cos(angle) * fleeDistance - rect.width / 2;
        let newY = cy + Math.sin(angle) * fleeDistance - rect.height / 2;

        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));

        setIsEscaping(true);
        setNoPos({ x: newX, y: newY });

        const newCount = dodgeCountRef.current + 1;
        setDodgeCount(newCount);

        if (newCount < MAX_DODGES) {
          setWhisper(WHISPERS[newCount - 1]);
        } else {
          setWhisper(WHISPERS[2]);
          setTimeout(() => setWhisper('alright. alright.'), 1200);
        }
      }
    },
    [],
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => dodge(e.clientX, e.clientY);
    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, [dodge]);

  const handleNoClick = () => {
    if (dodgeCount < MAX_DODGES) return;
    setDialogOpen(true);
  };

  const handleNoTouch = (e: React.TouchEvent) => {
    if (dodgeCount < MAX_DODGES) {
      e.preventDefault();
      const touch = e.touches[0];
      dodge(touch.clientX, touch.clientY);
    }
  };

  const handleDialogStay = () => {
    setDialogOpen(false);
    setDodgeCount(0);
    dodgeCountRef.current = 0;
    setIsEscaping(false);
    setNoPos(null);
    setWhisper('knew it.');
  };

  const handleSendRegrets = async () => {
    const copied = await copyToClipboard(REGRETS_MESSAGE);
    if (copied) {
      showToast(`Message copied. If nothing opened, text ${PHONE_DISPLAY} and paste.`);
    }
  };

  return (
    <div className="celebrate">
      <div className="celebrate-layout">
        {/* CARD */}
        <motion.div
          className="celebrate-card-side"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="celebrate-card-display">
            <Image
              src="/assets/celebrate/grad-card.jpeg"
              alt="Weston Voglesonger — Class of 2026 Graduate, University of North Carolina at Chapel Hill"
              width={480}
              height={340}
              className="celebrate-card-img"
              priority
            />
          </div>
        </motion.div>

        {/* INFO + RSVP */}
        <motion.div
          className="celebrate-info-side"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="celebrate-details">
            <DetailRow label="Date" value="Friday, May 8th" />
            <DetailRow label="Time" value="4:00 – 7:00 PM" />
            <DetailRow label="Place" value="TBD" accent />
            <DetailRow label="Attire" value="As you like it" />
          </div>

          <div className="celebrate-rsvp">
            <p className="celebrate-rsvp-prompt">Can you make it?</p>

            <div className="celebrate-rsvp-buttons">
              <a
                href={smsLink(YES_MESSAGE)}
                className="celebrate-btn celebrate-btn-yes"
                onClick={handleYes}
              >
                Yes
              </a>

              <button
                ref={noBtnRef}
                className={`celebrate-btn celebrate-btn-no${isEscaping ? ' escaping' : ''}`}
                style={
                  noPos
                    ? {
                        position: 'fixed',
                        left: noPos.x,
                        top: noPos.y,
                        zIndex: 50,
                        transition: 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }
                    : undefined
                }
                onClick={handleNoClick}
                onTouchStart={handleNoTouch}
              >
                No
              </button>
            </div>

            <div className={`celebrate-whisper${whisper ? ' visible' : ''}`}>
              {whisper && (
                <>
                  <span className="celebrate-ember">&mdash;</span> {whisper}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* DIALOG */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            className="celebrate-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setDialogOpen(false);
            }}
          >
            <motion.div
              className="celebrate-dialog-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <h4>If you really can&rsquo;t make it&hellip;</h4>
              <p>
                Send me a quick text so I know.
              </p>
              <div className="celebrate-dialog-btns">
                <a
                  href={smsLink(REGRETS_MESSAGE)}
                  className="celebrate-btn celebrate-btn-yes"
                  onClick={handleSendRegrets}
                >
                  Send regrets
                </a>
                <button
                  className="celebrate-btn celebrate-btn-no"
                  onClick={handleDialogStay}
                >
                  Actually, I&rsquo;ll come
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="celebrate-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="celebrate-detail-row">
      <div className="celebrate-detail-label">{label}</div>
      <div className={`celebrate-detail-value${accent ? ' celebrate-tbd' : ''}`}>{value}</div>
    </div>
  );
}
