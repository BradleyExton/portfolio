import { ImageResponse } from "next/og";
import { profile } from "@/copy/profile";

export const alt = `${profile.fullName} — ${profile.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Satori renders from inline styles only, so brand hex values from
// globals.css are repeated here rather than semantic token classes.
const colors = {
  surfaceMuted: "#f8faf9",
  brand: "#059669",
  brandContrast: "#34d399",
  content: "#041d12",
  contentMuted: "#415b4e",
  accent: "#fbbf24",
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 0",
          backgroundColor: colors.surfaceMuted,
          backgroundImage:
            "linear-gradient(135deg, #ecfdf5 0%, #f8faf9 45%, #f1f6f3 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            fontWeight: 600,
            color: colors.contentMuted,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              backgroundColor: colors.brand,
            }}
          />
          {profile.fullName}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.1,
              color: colors.brand,
            }}
          >
            AI-Native
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.1,
              color: colors.content,
            }}
          >
            Full-Stack Engineer
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: colors.contentMuted,
            }}
          >
            10+ years shipping production web apps — building with AI agent
            teams.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 40,
              fontSize: 30,
              color: colors.contentMuted,
            }}
          >
            <div style={{ display: "flex", color: colors.brand, fontWeight: 600 }}>
              bradleyexton.ca
            </div>
            <div style={{ display: "flex" }}>{profile.location}</div>
          </div>
          <div
            style={{
              height: 10,
              marginLeft: -80,
              marginRight: -80,
              backgroundImage: `linear-gradient(90deg, ${colors.brand} 0%, ${colors.brandContrast} 60%, ${colors.accent} 100%)`,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
