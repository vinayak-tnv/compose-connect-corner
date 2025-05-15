
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Image } from "lucide-react";

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  const [isUploading, setIsUploading] = useState(false);

  // Simple mock for image upload
  const handleImageUpload = () => {
    setIsUploading(true);
    // Mock a delay for upload
    setTimeout(() => {
      const imageUrl = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
      setContent(content + `<img src="${imageUrl}" alt="Uploaded image" class="w-full h-auto my-4" />`);
      setIsUploading(false);
    }, 1500);
  };

  // Simple toolbar buttons that insert HTML tags
  const formatText = (format: string) => {
    let formattedContent = content;
    
    switch (format) {
      case 'bold':
        formattedContent += "<strong>Bold text</strong>";
        break;
      case 'italic':
        formattedContent += "<em>Italic text</em>";
        break;
      case 'heading':
        formattedContent += "<h2>Heading</h2>";
        break;
      case 'link':
        formattedContent += '<a href="https://example.com" target="_blank">Link</a>';
        break;
      case 'quote':
        formattedContent += '<blockquote class="border-l-4 border-gray-300 pl-4 italic">Quote</blockquote>';
        break;
      case 'code':
        formattedContent += '<pre><code>// Your code here</code></pre>';
        break;
      default:
        break;
    }
    
    setContent(formattedContent);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border-b border-gray-300">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => formatText('bold')}
          className="font-bold"
        >
          B
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => formatText('italic')}
          className="italic"
        >
          I
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => formatText('heading')}
        >
          H2
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => formatText('link')}
        >
          Link
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => formatText('quote')}
        >
          Quote
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => formatText('code')}
        >
          Code
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleImageUpload}
          disabled={isUploading}
          className="ml-auto"
        >
          <Image size={16} className="mr-1" />
          {isUploading ? "Uploading..." : "Image"}
        </Button>
      </div>
      
      <div className="p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your blog post... You can use HTML tags for formatting."
          className="w-full min-h-[300px] border-0 focus:ring-0 resize-y"
        />
      </div>
      
      <div className="p-4 border-t border-gray-300 bg-gray-50">
        <div className="text-sm text-gray-500">
          Preview
        </div>
        <div 
          className="prose max-w-none mt-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Editor;
