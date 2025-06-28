export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7D5CE8] rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8A6FE8] rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7D5CE8] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
    </div>
  );
}
