/* eslint-disable @next/next/no-img-element */
// Placeholder crest cropped from the Facebook profile picture.
// Replace public/images/crest.png with the high-res file when the club supplies it.
export default function Crest({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/images/crest.png"
      alt="Castle Bromwich Lions FC crest"
      width={size}
      height={size}
      className={`rounded-full ring-2 ring-white/80 ${className}`}
    />
  );
}
