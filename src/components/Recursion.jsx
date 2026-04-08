export default function Recursion() {
  const params = new URLSearchParams(window.location.search);
  const depth = parseInt(params.get("d") || "0", 10);
  const base = window.location.origin + window.location.pathname;
  return (
    <iframe
      src={`${base}?d=${depth + 1}#recursion`}
      title={`Recursive view level ${depth + 1}`}
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
