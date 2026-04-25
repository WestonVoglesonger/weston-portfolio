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
const OUTER_RADIUS = 200;
const INNER_RADIUS = 60;
const DRIFT_FACTOR = 20;

export function CelebratePage() {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [whisper, setWhisper] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const dodgeCountRef = useRef(0);
  const translateRef = useRef({ x: 0, y: 0 });
  const isSnapping = useRef(false);

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

  const applyTransform = useCallback((x: number, y: number, snap: boolean) => {
    const btn = noBtnRef.current;
    if (!btn) return;
    translateRef.current = { x, y };
    if (snap) {
      btn.style.transition = 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)';
    } else {
      btn.style.transition = 'none';
    }
    btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const getBounds = useCallback(() => {
    const btn = noBtnRef.current;
    const wrapper = wrapperRef.current;
    if (!btn || !wrapper) return null;

    const wrapperRect = wrapper.getBoundingClientRect();
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;

    const btnOriginalRect = btn.getBoundingClientRect();
    const btnBaseLeft = btnOriginalRect.left - translateRef.current.x;
    const btnBaseTop = btnOriginalRect.top - translateRef.current.y;

    return { wrapperRect, btnW, btnH, btnBaseLeft, btnBaseTop };
  }, []);

  const clampTranslate = useCallback((tx: number, ty: number) => {
    const info = getBounds();
    if (!info) return { x: tx, y: ty };
    const { wrapperRect, btnW, btnH, btnBaseLeft, btnBaseTop } = info;
    const margin = 8;
    const maxTx = wrapperRect.right - btnW - btnBaseLeft - margin;
    const minTx = wrapperRect.left - btnBaseLeft + margin;
    const maxTy = wrapperRect.bottom - btnH - btnBaseTop - margin;
    const minTy = wrapperRect.top - btnBaseTop + margin;
    return {
      x: Math.max(minTx, Math.min(maxTx, tx)),
      y: Math.max(minTy, Math.min(maxTy, ty)),
    };
  }, [getBounds]);

  const snapToFarthest = useCallback((cursorX: number, cursorY: number) => {
    const info = getBounds();
    if (!info) return;
    const { wrapperRect, btnW, btnH, btnBaseLeft, btnBaseTop } = info;

    const cardEl = document.querySelector('.celebrate-card-side');
    const cardRect = cardEl?.getBoundingClientRect();
    const pad = 24;

    let bestDist = 0;
    let bestTx = translateRef.current.x;
    let bestTy = translateRef.current.y;

    for (let i = 0; i < 20; i++) {
      const candidateLeft = wrapperRect.left + 10 + Math.random() * (wrapperRect.width - btnW - 20);
      const candidateTop = wrapperRect.top + 10 + Math.random() * (wrapperRect.height - btnH - 20);

      if (cardRect &&
        candidateLeft < cardRect.right + pad &&
        candidateLeft + btnW > cardRect.left - pad &&
        candidateTop < cardRect.bottom + pad &&
        candidateTop + btnH > cardRect.top - pad) {
        continue;
      }

      const centerX = candidateLeft + btnW / 2;
      const centerY = candidateTop + btnH / 2;
      const dist = Math.hypot(centerX - cursorX, centerY - cursorY);
      if (dist > bestDist) {
        bestDist = dist;
        bestTx = candidateLeft - btnBaseLeft;
        bestTy = candidateTop - btnBaseTop;
      }
    }

    const clamped = clampTranslate(bestTx, bestTy);
    isSnapping.current = true;
    applyTransform(clamped.x, clamped.y, true);
    setTimeout(() => { isSnapping.current = false; }, 200);
  }, [getBounds, clampTranslate, applyTransform]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dodgeCountRef.current >= MAX_DODGES) return;
    if (isSnapping.current) return;

    const btn = noBtnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < INNER_RADIUS) {
      // Snap: cursor breached inner zone
      snapToFarthest(e.clientX, e.clientY);

      const newCount = dodgeCountRef.current + 1;
      setDodgeCount(newCount);

      if (newCount < MAX_DODGES) {
        setWhisper(WHISPERS[newCount - 1]);
      } else {
        setWhisper(WHISPERS[2]);
        setTimeout(() => setWhisper('alright. alright.'), 1200);
      }
    } else if (dist < OUTER_RADIUS) {
      // Drift: gradual magnetic repulsion
      const strength = 1 - dist / OUTER_RADIUS;
      const moveX = (-dx / dist) * strength * DRIFT_FACTOR;
      const moveY = (-dy / dist) * strength * DRIFT_FACTOR;
      const newTx = translateRef.current.x + moveX;
      const newTy = translateRef.current.y + moveY;
      const clamped = clampTranslate(newTx, newTy);
      applyTransform(clamped.x, clamped.y, false);
    }
  }, [snapToFarthest, clampTranslate, applyTransform]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleNoClick = () => {
    if (dodgeCount < MAX_DODGES) return;
    setDialogOpen(true);
  };

  const handleNoTouch = (e: React.TouchEvent) => {
    if (dodgeCount < MAX_DODGES) {
      e.preventDefault();
      const touch = e.touches[0];
      // On touch, just snap immediately
      snapToFarthest(touch.clientX, touch.clientY);
      const newCount = dodgeCountRef.current + 1;
      setDodgeCount(newCount);
      if (newCount < MAX_DODGES) {
        setWhisper(WHISPERS[newCount - 1]);
      } else {
        setWhisper(WHISPERS[2]);
        setTimeout(() => setWhisper('alright. alright.'), 1200);
      }
    }
  };

  const handleDialogStay = () => {
    setDialogOpen(false);
    setDodgeCount(0);
    dodgeCountRef.current = 0;
    applyTransform(0, 0, true);
    setWhisper('knew it.');
  };

  const handleSendRegrets = async () => {
    const copied = await copyToClipboard(REGRETS_MESSAGE);
    if (copied) {
      showToast(`Message copied. If nothing opened, text ${PHONE_DISPLAY} and paste.`);
    }
  };

  return (
    <div className="celebrate" ref={wrapperRef}>
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
                className="celebrate-btn celebrate-btn-no"
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
