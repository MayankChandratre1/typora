// components/CenteredText.js
export default function CenterText({ text }:{
    text:string
}) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-800">{text}</p>
      </div>
    );
  }
  