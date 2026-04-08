export default function Fairytale() {
  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        background: "linear-gradient(180deg, #f5edd6 0%, #efe4c8 40%, #e8dabb 100%)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 20px 20px",
        position: "relative",
      }}
    >
      {/* Ink blot splatters on the parchment */}
      <div
        style={{
          position: "absolute",
          top: "7%",
          left: "5%",
          width: 100,
          height: 90,
          background: "radial-gradient(ellipse at 40% 50%, rgba(15,10,5,0.18) 0%, rgba(10,5,2,0.08) 45%, transparent 70%)",
          filter: "blur(6px)",
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "7%",
          width: 130,
          height: 80,
          background: "radial-gradient(ellipse at 60% 40%, rgba(10,5,0,0.2) 0%, rgba(10,5,2,0.07) 50%, transparent 75%)",
          filter: "blur(8px)",
          borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "3%",
          width: 55,
          height: 70,
          background: "radial-gradient(ellipse at 50% 50%, rgba(20,10,5,0.15) 0%, transparent 65%)",
          filter: "blur(5px)",
          borderRadius: "50% 50% 40% 60% / 60% 40% 50% 50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "82%",
          width: 40,
          height: 45,
          background: "radial-gradient(ellipse at 50% 50%, rgba(15,8,3,0.14) 0%, transparent 70%)",
          filter: "blur(4px)",
          borderRadius: "55% 45% 50% 50% / 45% 55% 50% 50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "32%",
          left: "2%",
          width: 75,
          height: 60,
          background: "radial-gradient(ellipse at 45% 55%, rgba(10,5,0,0.17) 0%, transparent 60%)",
          filter: "blur(6px)",
          borderRadius: "40% 60% 45% 55% / 50% 50% 50% 50%",
          pointerEvents: "none",
        }}
      />

      {/* Main manuscript */}
      <div
        style={{
          maxWidth: 620,
          width: "100%",
          border: "3px double #1a1008",
          padding: "32px 36px",
          position: "relative",
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
        }}
      >
        {/* Inner ornamental border */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
            border: "1px solid rgba(20,12,5,0.25)",
            pointerEvents: "none",
          }}
        />

        {/* Corner flourishes */}
        {[
          { top: 4, left: 4 },
          { top: 4, right: 4 },
          { bottom: 4, left: 4 },
          { bottom: 4, right: 4 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 18,
              height: 18,
              borderTop: pos.top !== undefined ? "2px solid #1a1008" : "none",
              borderBottom: pos.bottom !== undefined ? "2px solid #1a1008" : "none",
              borderLeft: pos.left !== undefined ? "2px solid #1a1008" : "none",
              borderRight: pos.right !== undefined ? "2px solid #1a1008" : "none",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Ink drips from top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "28%",
            width: 3,
            height: 35,
            background: "linear-gradient(180deg, rgba(15,8,3,0.5) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "22%",
            width: 2,
            height: 22,
            background: "linear-gradient(180deg, rgba(15,8,3,0.35) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Title */}
        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            letterSpacing: 8,
            color: "#1a1008",
            marginBottom: 8,
            fontFamily: "'Jacquard 24', serif",
            textTransform: "uppercase",
          }}
        >
          ✦ The Book of An Jie ✦
        </div>

        {/* Subtitle */}
        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "#3c2f1e",
            fontStyle: "italic",
            marginBottom: 24,
            fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
            lineHeight: 1.8,
          }}
        >
          Being a True Account of the Works &amp; Endeavours of
          <br />
          Daniel Lee, Scholar of Penn, late of the Lion City
        </div>

        {/* Gothic divider */}
        <div
          style={{
            textAlign: "center",
            color: "#1a1008",
            fontSize: 14,
            marginBottom: 22,
            letterSpacing: 8,
          }}
        >
          ― ✝ ―
        </div>

        {/* Opening paragraph with drop cap — Jacquard 24 */}
        <div
          style={{
            fontFamily: "'Jacquard 24', serif",
            fontSize: 18,
            lineHeight: 1.9,
            color: "#1e1610",
            textAlign: "justify",
          }}
        >
          <span
            style={{
              float: "left",
              fontSize: 80,
              lineHeight: 0.75,
              padding: "6px 12px 0 0",
              color: "#4a0e0e",
              fontFamily: "'Jacquard 24', serif",
            }}
          >
            I
          </span>
          n the sixty-and-third year of the great Algorithmic Age, there arose
          from the Isle of the Lion a young scholar named An Jie, whose mind
          burned with a curiosity most fierce.
        </div>

        {/* Continuation */}
        <div
          style={{
            fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
            fontSize: 15,
            lineHeight: 1.9,
            color: "#1e1610",
            textAlign: "justify",
            marginTop: 8,
          }}
        >
          He journeyed first to the hallowed Institute of Salk, where he taught
          the engines of brass and lightning to <em>see</em> — to discern one
          cell from the next with twenty-fold the swiftness of mortal hands.
        </div>

        {/* Second paragraph */}
        <div
          style={{
            fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
            fontSize: 15,
            lineHeight: 1.9,
            color: "#1e1610",
            textAlign: "justify",
            marginTop: 14,
          }}
        >
          Yet the scholar's ambitions grew vast as the sea. He crossed into the
          lands of Pennsylvania, and there, within the ancient Halls of Penn, he
          forged six mighty artifacts, each imbued with its own peculiar magic:
        </div>

        {/* Artifact list */}
        <div
          style={{
            fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
            fontSize: 14,
            lineHeight: 2.1,
            color: "#2a2018",
            marginTop: 14,
            paddingLeft: 24,
            borderLeft: "2px solid #1a1008",
            position: "relative",
          }}
        >
          {/* Ink blot on the border */}
          <div
            style={{
              position: "absolute",
              left: -9,
              top: "18%",
              width: 16,
              height: 20,
              background: "radial-gradient(ellipse, rgba(15,8,3,0.45) 0%, transparent 70%)",
              filter: "blur(3px)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -6,
              bottom: "12%",
              width: 10,
              height: 14,
              background: "radial-gradient(ellipse, rgba(15,8,3,0.35) 0%, transparent 70%)",
              filter: "blur(2px)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <div>
            <em>Musicboxd</em> — a great looking-glass through which all the
            world's music might be judged and catalogued;
          </div>
          <div>
            <em>Summate</em> — a council of rival spirits who debate amongst
            themselves until truth emerges, raising their wisdom from sixty-four
            to ninety parts in the hundred;
          </div>
          <div>
            <em>Subs</em> — a scribe of tongues, who listens to moving pictures
            and renders their speech into text with five-fold haste;
          </div>
          <div>
            <em>Feynman</em> — a patient tutor who sees and speaks, conjured in
            but forty-eight hours at the Tournament of Princeton;
          </div>
          <div>
            <em>Flow</em> — a guardian of secrets, who thinks entirely within
            the mind's own chamber, never sending word abroad;
          </div>
          <div>
            <em>The QR Grimoire</em> — his most ambitious work yet, wherein
            diners at a tavern may summon their orders through enchanted sigils,
            and all see the feast take shape in concert.
          </div>
        </div>

        {/* Closing paragraph */}
        <div
          style={{
            fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
            fontSize: 15,
            lineHeight: 1.9,
            color: "#1e1610",
            textAlign: "justify",
            marginTop: 18,
          }}
        >
          And the scholars did marvel, for An Jie's parchments bore no mark
          below four-and-perfect, and his works multiplied still. The tale is
          not yet ended, for the young artificer builds onward, ever onward.
        </div>

        {/* Gothic end ornament */}
        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 16,
            color: "#1a1008",
            letterSpacing: 6,
          }}
        >
          ☩ ❧ ☩
        </div>

        {/* Attribution */}
        <div
          style={{
            textAlign: "right",
            fontSize: 11,
            color: "#3c2f1e",
            marginTop: 10,
            fontStyle: "italic",
            fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
          }}
        >
          — From the Codex Danielus, Chapter IV, verse 2026
        </div>
      </div>
      {/* Bottom spacer — ensures full scroll */}
      <div style={{ minHeight: 80, flexShrink: 0 }} />
    </div>
  );
}
