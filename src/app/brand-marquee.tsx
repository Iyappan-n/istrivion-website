import { Fragment } from "react";
import Image from "next/image";

const words = [
  "INNOVATION",
  "SMART",
  "TECHNOLOGY",
  "RESEARCH",
  "INTELLIGENCE",
  "VISION",
  "INTEGRATION",
  "OPTIMIZATION",
  "NETWORK",
];

export default function BrandMarquee() {
  return (
    <div className="brand-marquee" aria-label="ISTRIVION brand values">
      <div className="brand-marquee__track">
        {[0, 1].map((copy) => (
          <div
            className="brand-marquee__group"
            key={copy}
            aria-hidden={copy === 1}
          >
            <span className="brand-marquee__item">
              <Image
                src="/istrivion-logo.png"
                alt={copy === 0 ? "ISTRIVION Technologies" : ""}
                width={230}
                height={77}
                className="brand-marquee__logo"
              />
            </span>
            {words.map((word) => (
              <Fragment key={word}>
                <span className="brand-marquee__separator" aria-hidden="true">
                  •
                </span>
                <span className="brand-marquee__item">{word}</span>
              </Fragment>
            ))}
            <span className="brand-marquee__separator" aria-hidden="true">
              •
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
