import LaunchButton from "../../components/buttons/LaunchButton";

const fontDisplay =
  "var(--font-montserrat), Montserrat, Inter, system-ui, sans-serif";

export default function ComingSoonPage() {
  return (
    <main className="pageAtmosphere">
      <div className="wrap1400" style={{ minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="menuCard"
            style={{
              padding: 28,
              borderRadius: 22,
              maxWidth: 720,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 22px 70px rgba(0,0,0,0.28)",
            }}
          >
            <div
              style={{
                marginTop: 18,
                fontSize: "clamp(32px, 3.6vw, 44px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                fontFamily: fontDisplay,
              }}
            >
              Coming Soon
            </div>

            <div className="csLoaderWrap" aria-hidden="true">
              <div className="csLoader">
                <div className="csA" />
                <div className="csB" />
              </div>
            </div>

            <div style={{ marginTop: 22 }}>
              <LaunchButton href="/" className="btnSecondary">
                Back to Home
              </LaunchButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
