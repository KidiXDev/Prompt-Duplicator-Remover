import { useState, useEffect, useRef } from "react";

export interface FormatOptions {
  spaceStyle: "space" | "underscore";
  bracketStyle: "parentheses" | "square" | "curly" | "preserve";
}

interface FormatOptionsProps {
  isVisible: boolean;
  onFormat: (options: FormatOptions) => void;
  onClose: () => void;
}

export function FormatOptions({
  isVisible,
  onFormat,
  onClose,
}: FormatOptionsProps) {
  const [options, setOptions] = useState<FormatOptions>({
    spaceStyle: "space",
    bracketStyle: "preserve",
  });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  const handleFormat = () => {
    onFormat(options);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className="fixed md:absolute inset-x-4 bottom-4 md:bottom-auto md:right-0 md:inset-x-auto md:mt-2 md:w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-4 z-40"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Space Style
          </label>
          <select
            value={options.spaceStyle}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                spaceStyle: e.target.value as FormatOptions["spaceStyle"],
              }))
            }
            className="w-full rounded-md bg-white/50 border-gray-300 text-sm"
          >
            <option value="space">Keep Spaces</option>
            <option value="underscore">Replace with Underscore</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bracket Style
          </label>
          <select
            value={options.bracketStyle}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                bracketStyle: e.target.value as FormatOptions["bracketStyle"],
              }))
            }
            className="w-full rounded-md bg-white/50 border-gray-300 text-sm"
          >
            <option value="preserve">Preserve Original</option>
            <option value="parentheses">Use Parentheses ()</option>
            <option value="square">Use Square Brackets []</option>
            <option value="curly">Use Curly Braces {"{}"}</option>
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleFormat}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 px-4 rounded-md"
          >
            Apply
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-2.5 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
