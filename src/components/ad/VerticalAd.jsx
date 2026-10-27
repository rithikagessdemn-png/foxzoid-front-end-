import React, { useEffect } from "react";

const VerticalAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error("Google AdSense error:", error);
    }
  }, []);

  return (
    <div className="relative w-full min-h-[35vh] flex items-center justify-center bg-gray-300 overflow-hidden">
      {/* Google Ad */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3212604162895578"
        data-ad-slot="1620433269"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      {/* Dev Placeholder */}
      {import.meta.env.DEV && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm opacity-60 pointer-events-none">
          Ad Placeholder
        </div>
      )}
    </div>
  );
};

export default VerticalAd;
