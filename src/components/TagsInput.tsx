
import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagsInputProps {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({
  label,
  tags,
  setTags,
  placeholder = "Add tag and press Enter",
  className = "",
}) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-2 bg-white border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 focus:outline-none"
            >
              <X size={14} className="text-blue-600 hover:text-blue-800" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow border-none focus:ring-0 text-sm p-0.5 min-w-[120px]"
        />
      </div>
    </div>
  );
};

export default TagsInput;
