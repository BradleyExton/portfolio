"use client";

import { useEffect, useState } from "react";
import { homeCopy } from "@/copy/home";
import { subscribeMediaQueryChange } from "@/features/shared/designSystem";
import * as styles from "./styles";

const BOOT_DELAY_MS = 900;
const TYPE_INTERVAL_MS = 74;
const LINE_INTERVAL_MS = 860;
const DONE_HOLD_MS = 5200;

const screenCopy = homeCopy.heroScreen;
const COMMAND_LENGTH = screenCopy.command.length;
/* Steps: one per typed command character, one per status line, one for the
   closing line. The cycle holds on the finished session, then restarts. */
const TOTAL_STEPS = COMMAND_LENGTH + screenCopy.lines.length + 1;

export function HeroScreenAgent() {
  const [step, setStep] = useState(0);
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      setIsStatic(reducedMotionQuery.matches);
      if (reducedMotionQuery.matches) {
        setStep(TOTAL_STEPS);
      }
    };

    syncMotionPreference();
    return subscribeMediaQueryChange(reducedMotionQuery, syncMotionPreference);
  }, []);

  useEffect(() => {
    if (isStatic) {
      return;
    }

    const delay = step === TOTAL_STEPS
      ? DONE_HOLD_MS
      : step === 0
        ? BOOT_DELAY_MS
        : step < COMMAND_LENGTH
          ? TYPE_INTERVAL_MS
          : LINE_INTERVAL_MS;
    const timerId = window.setTimeout(() => {
      setStep(step === TOTAL_STEPS ? 0 : step + 1);
    }, delay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [step, isStatic]);

  const typedCommand = screenCopy.command.slice(0, Math.min(step, COMMAND_LENGTH));
  const visibleLineCount = Math.max(0, step - COMMAND_LENGTH);
  const isSessionDone = step === TOTAL_STEPS;

  return (
    <div className={styles.stage}>
      <div className={styles.glow} />
      <div className={styles.frame}>
        <div className={styles.sheen} />
        <div className={styles.chrome}>
          <span className={styles.chromeDot} />
          <span className={styles.chromeDot} />
          <span className={styles.chromeDot} />
          <span className={styles.chromeTitle}>{screenCopy.windowTitle}</span>
        </div>
        <div className={styles.body}>
          <p className={styles.promptLine}>
            <span className={styles.promptSymbol}>$</span>
            <span>{typedCommand}</span>
            {!isSessionDone && step <= COMMAND_LENGTH && (
              <span className={styles.cursor} />
            )}
          </p>
          {screenCopy.lines.slice(0, visibleLineCount).map((line, index) => {
            const isWorking = !isSessionDone && index === visibleLineCount - 1;
            return (
              <p key={line.text} className={styles.statusLine}>
                <span className={isWorking ? styles.dotWorking : styles.dotDone} />
                <span>{line.text}</span>
                {!isWorking && line.meta && (
                  <span className={styles.meta}>{line.meta}</span>
                )}
              </p>
            );
          })}
          {isSessionDone && (
            <>
              <p className={styles.doneLine}>
                <span className={styles.doneCheck}>✓</span>
                <span>{screenCopy.done}</span>
              </p>
              <p className={styles.promptLine}>
                <span className={styles.promptSymbol}>$</span>
                <span className={styles.cursor} />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
