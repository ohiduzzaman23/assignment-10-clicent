export function Card({ children }) {
  return <div className="bg-white shadow-xl p-6 rounded-2xl">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
