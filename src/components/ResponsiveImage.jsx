import images from '../data/image-manifest.json';

// Unknown/external images retain their original URL. Sizes describe the CSS slot;
// the browser chooses a candidate for that slot and the device's pixel density.
export default function ResponsiveImage({ src, sizes = '100vw', maxWidth = 1920, loading = 'lazy', ...props }) {
  const image = images[src];
  if (!image) return <img src={src} loading={loading} decoding="async" {...props} />;
  const variants = image.variants.filter((variant, i) => variant.width <= maxWidth || i === 0);
  const fallback = variants.find((variant) => variant.width >= 640) || variants.at(-1);
  return (
    <img
      src={fallback.src}
      srcSet={variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')}
      sizes={sizes}
      width={image.width}
      height={image.height}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}
