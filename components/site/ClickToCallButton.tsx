"use client";

import { useState } from "react";

type ClickToCallButtonProps = {
  phoneNumber: string;
};

export function ClickToCallButton({ phoneNumber }: ClickToCallButtonProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const phoneHref = `tel:${phoneNumber.replace(/[^+\d]/g, "")}`;

  if (isRevealed) {
    return (
      <a href={phoneHref} className="cta-secondary focus-ring w-full sm:w-auto" aria-label={`Call ${phoneNumber}`}>
        {phoneNumber}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="cta-secondary focus-ring w-full sm:w-auto"
      onClick={() => setIsRevealed(true)}
    >
      Click to Call
    </button>
  );
}
