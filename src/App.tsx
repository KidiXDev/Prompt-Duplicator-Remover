import { useState } from "react";
import { GlassContainer } from "./components/GlassContainer";
import { removeDuplicatePrompts, formatPrompts } from "./utils/promptProcessor";
import { copyToClipboard } from "./utils/copyToClipboard";
import { Notification } from "./components/Notification";
import { FormatOptions } from "./components/FormatOptions";
import { Footer } from "./components/Footer";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { SettingsIcon, CopyIcon } from "./components/icons/IconComponent";

type NotificationState = {
  message: string;
  type: "success" | "error";
};

function useNotification() {
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );
  const [showNotification, setShowNotification] = useState(false);

  const showMessage = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return { showNotification, notification, showMessage };
}

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const { showNotification, notification, showMessage } = useNotification();

  const handleProcess = () => {
    if (input.length === 0) {
      showMessage("Empty input!", "error");
      return;
    }
    setOutput(removeDuplicatePrompts(input));
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      showMessage("Copied to clipboard!", "success");
    }
  };

  const handleFormatWithOptions = (options: FormatOptions) => {
    setInput(formatPrompts(input, options));
  };

  return (
    <>
      <Notification
        message={notification?.message || ""}
        isVisible={showNotification}
        type={notification?.type || "success"}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 sm:p-8">
        <Container>
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
                <Button
                  onClick={() => setShowFormatOptions(!showFormatOptions)}
                  icon={<SettingsIcon />}
                >
                  Format
                </Button>
                <FormatOptions
                  isVisible={showFormatOptions}
                  onFormat={handleFormatWithOptions}
                  onClose={() => setShowFormatOptions(false)}
                />
              </div>

              <Button variant="primary" onClick={handleProcess}>
                Remove Duplicates
              </Button>
            </div>

            {output && (
              <div className="mt-4 sm:mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base sm:text-lg font-semibold text-white">
                    Result:
                  </h2>
                  <Button onClick={handleCopy} icon={<CopyIcon />}>
                    Copy
                  </Button>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm break-words text-sm sm:text-base">
                  {output}
                </div>
              </div>
            )}
          </GlassContainer>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
