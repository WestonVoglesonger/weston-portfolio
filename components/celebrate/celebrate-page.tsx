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
  const [phoneCopied, setPhoneCopied] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const dodgeCountRef = useRef(0);

  useEffect(() => {
    dodgeCountRef.current = dodgeCount;
  }, [dodgeCount]);

  // Hide site header/footer/container
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
        const margin = 40;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let newX: number, newY: number, attempts = 0;
        do {
          newX = margin + Math.random() * (vw - rect.width - margin * 2);
          newY = margin + Math.random() * (vh - rect.height - margin * 2);
          attempts++;
        } while (
          Math.hypot(newX + rect.width / 2 - clientX, newY + rect.height / 2 - clientY) < 200 &&
          attempts < 20
        );

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

  const handleCopyPhone = async () => {
    const ok = await copyToClipboard(PHONE_DISPLAY);
    if (ok) {
      setPhoneCopied(true);
      showToast(`${PHONE_DISPLAY} copied to clipboard.`);
      setTimeout(() => setPhoneCopied(false), 2000);
    }
  };

  return (
    <div className="celebrate">
      <div className="celebrate-frame">
        {/* HERO */}
        <motion.section
          className="celebrate-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="celebrate-hero-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
          >
            THE PLEASURE OF YOUR COMPANY IS REQUESTED
          </motion.div>
          <h1 className="celebrate-name">
            <motion.span
              className="celebrate-name-given"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Weston
            </motion.span>
            <motion.span
              className="celebrate-name-family"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Voglesonger
            </motion.span>
          </h1>
          <motion.p
            className="celebrate-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1 }}
          >
            Four years of Chapel Hill, concluded. A Friday in May. And the{' '}
            <em>dubious honor</em> of calling this the beginning of something.
          </motion.p>
        </motion.section>

        {/* RULE */}
        <motion.div
          className="celebrate-rule"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="celebrate-rule-line" />
          <div className="celebrate-rule-symbol">&#10022;</div>
          <div className="celebrate-rule-line" />
        </motion.div>

        {/* INVITATION */}
        <motion.section
          className="celebrate-invitation"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <div className="celebrate-invite-text">
            <div className="celebrate-opener">A NOTE FROM THE HOST</div>
            <h2>
              A small gathering, before the <em>dispersal.</em>
            </h2>
            <p className="celebrate-first-para">
              It turns out four years is shorter than advertised. The dorms, the
              all-nighters, the walks across the quad when the light was exactly
              right &mdash; all of it &mdash; compresses into a sentence you can almost fit on
              a card.
            </p>
            <p>
              This is that sentence. Come by for a few hours. Eat something. Argue
              about something. Say the kinds of goodbyes you only get to say once.
            </p>
            <p className="celebrate-signoff">&mdash; W.V.</p>
          </div>

          <aside className="celebrate-details">
            <div className="celebrate-details-header">
              <span>PROGRAM</span>
              <span>MAY MMXXVI</span>
            </div>
            <div className="celebrate-details-body">
              <DetailRow label="Date" value="Friday, the eighth of May" sub="two thousand twenty-six" />
              <DetailRow label="Hours" value="Four until seven" sub="in the afternoon" />
              <DetailRow label="Place" value={<span className="celebrate-tbd">to be disclosed</span>} sub="address forthcoming" />
              <DetailRow label="Attire" value="As you like it" sub="but make it count" />
            </div>
          </aside>
        </motion.section>

        {/* CARD SECTION */}
        <motion.section
          className="celebrate-card-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <div className="celebrate-card-label">FROM THE MAILBOX</div>
          <h3>The card, as it was sent.</h3>
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
        </motion.section>

        {/* RSVP */}
        <motion.section
          className="celebrate-rsvp"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="celebrate-rsvp-label">THE MATTER AT HAND</div>
          <h3>Will you be there?</h3>
          <p className="celebrate-rsvp-prompt">
            Tap below &mdash; a text will compose itself to me. Reply with your name and
            any plus-ones, and I&rsquo;ll mark you down.
          </p>

          <div className="celebrate-rsvp-buttons">
            <a
              href={smsLink(YES_MESSAGE)}
              className="celebrate-btn celebrate-btn-yes"
              onClick={handleYes}
            >
              Yes, with pleasure
            </a>

            <button
              ref={noBtnRef}
              className={`celebrate-btn celebrate-btn-no${isEscaping ? ' escaping' : ''}`}
              style={
                noPos
                  ? { position: 'fixed', left: noPos.x, top: noPos.y, zIndex: 50 }
                  : undefined
              }
              onClick={handleNoClick}
              onTouchStart={handleNoTouch}
            >
              Regretfully, no
            </button>
          </div>

          <div className={`celebrate-whisper${whisper ? ' visible' : ''}`}>
            {whisper && (
              <>
                <span className="celebrate-ember">&mdash;</span> {whisper}
              </>
            )}
          </div>

          <div className="celebrate-fallback">
            <span>or text me directly &mdash;</span>
            <a href={`tel:${PHONE}`} className="celebrate-fallback-number">
              {PHONE_DISPLAY}
            </a>
            <button
              className={`celebrate-fallback-copy${phoneCopied ? ' copied' : ''}`}
              onClick={handleCopyPhone}
              type="button"
            >
              {phoneCopied ? 'copied' : 'copy'}
            </button>
          </div>
        </motion.section>
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
              <div className="celebrate-dialog-label">&middot; final answer &middot;</div>
              <h4>Fine. If you really can&rsquo;t make it.</h4>
              <p>
                Send me a quick text so I know. No hard feelings. (Well &mdash; some.
                But I&rsquo;ll get over it.)
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
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="celebrate-detail-row">
      <div className="celebrate-detail-label">{label}</div>
      <div className="celebrate-detail-value">
        {value}
        <span className="celebrate-detail-sub">{sub}</span>
      </div>
    </div>
  );
}
