import { useState } from "react";
import { GlassContainer } from "./components/GlassContainer";
import { removeDuplicatePrompts, formatPrompts } from "./utils/promptProcessor";
import { copyToClipboard } from "./utils/copyToClipboard";
import { Notification } from "./components/Notification";
import { FormatOptions } from "./components/FormatOptions";
import { Footer } from "./components/Footer";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showFormatOptions, setShowFormatOptions] = useState(false);

  const handleProcess = () => {
    setOutput(removeDuplicatePrompts(input));
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleFormatWithOptions = (options: FormatOptions) => {
    setInput(formatPrompts(input, options));
  };

  return (
    <>
      <Notification
        message="Copied to clipboard!"
        isVisible={showNotification}
        type="success"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-4 sm:mb-8">
            Prompt Duplicator Remover
          </h1>

          <GlassContainer className="w-full">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your prompts here, separated by commas..."
              className="w-full h-48 sm:h-64 bg-white/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm sm:text-base scrollbar-styled"
            />

            <div className="flex justify-between items-center mt-3 sm:mt-4">
              <div className="relative">
                <button
                  onClick={() => setShowFormatOptions(!showFormatOptions)}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md text-white text-sm transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Format
                </button>
                <FormatOptions
                  isVisible={showFormatOptions}
                  onFormat={handleFormatWithOptions}
                  onClose={() => setShowFormatOptions(false)}
                />
              </div>

              <button
                onClick={handleProcess}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm transition-colors flex items-center gap-2 rounded-md"
              >
                Remove Duplicates
              </button>
            </div>

            {output && (
              <div className="mt-4 sm:mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base sm:text-lg font-semibold text-white">
                    Result:
                  </h2>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md text-white text-sm transition-colors flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                  </button>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm break-words text-sm sm:text-base">
                  {output}
                </div>
              </div>
            )}
          </GlassContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
