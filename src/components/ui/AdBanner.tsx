"use client";

interface AdBannerProps {
    slot?: string;
    className?: string;
}

export function AdBanner({ slot = "header", className = "" }: AdBannerProps) {
    // Placeholder for Google Ads - will be replaced with actual ad code when set up
    return (
        <div
            className={`w-full max-w-4xl mx-auto my-8 ${className}`}
            data-ad-slot={slot}
        >
            <div className="glass rounded-xl p-4 text-center min-h-[90px] flex items-center justify-center">
                <div className="text-foreground-dim text-sm">
                    {/* Google Ads will render here */}
                    <p className="opacity-50">Ad Space - {slot}</p>
                    {/* 
            To enable Google Ads:
            1. Sign up for Google AdSense
            2. Add your ad script to layout.tsx
            3. Replace this placeholder with:
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-XXXXXX"
              data-ad-slot="XXXXXX"
              data-ad-format="auto"
              data-full-width-responsive="true" />
          */}
                </div>
            </div>
        </div>
    );
}
