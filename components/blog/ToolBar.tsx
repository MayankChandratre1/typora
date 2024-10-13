import React from "react";
import { Button } from "../ui/button";

interface ToolbarProps {
    onBold: () => void;
    onItalic: () => void;
    onLink: () => void;
    onImage: () => void;
    onList: () => void;
    onCodeBlock: () => void;
    onHeader: (level: number) => void;
  }
  
  const Toolbar: React.FC<ToolbarProps> = ({ onBold, onItalic, onLink, onImage, onList, onCodeBlock, onHeader }) => {
    return (
      <div className="mb-4 p-2 rounded grid grid-cols-1 md:place-items-center md:grid-cols-2">
        <div className="flex space-x-1 max-md:mb-2">
        <Button variant={"outline"} onClick={onBold} className="hover:text-gray-400">B</Button>
        <Button variant={"outline"} onClick={onItalic} className="hover:text-gray-400">I</Button>
        <Button variant={"outline"} onClick={onLink} className="hover:text-gray-400">Link</Button>
        <Button variant={"outline"} onClick={onImage} className="hover:text-gray-400">Image</Button>
        <Button variant={"outline"} onClick={onList} className="hover:text-gray-400">List</Button>
        <Button variant={"outline"} onClick={onCodeBlock} className="hover:text-gray-400">Code</Button>
        </div>

        <div className="flex space-x-1">
            <Button variant={"outline"} onClick={() => onHeader(1)} className="hover:text-gray-400">H1</Button>
            <Button variant={"outline"} onClick={() => onHeader(2)} className="hover:text-gray-400">H2</Button>
            <Button variant={"outline"} onClick={() => onHeader(3)} className="hover:text-gray-400">H3</Button>
            <Button variant={"outline"} onClick={() => onHeader(4)} className="hover:text-gray-400">H4</Button>
            <Button variant={"outline"} onClick={() => onHeader(5)} className="hover:text-gray-400">H5</Button>
            <Button variant={"outline"} onClick={() => onHeader(6)} className="hover:text-gray-400">H6</Button>
        </div>
      </div>
    );
  };
  
  export default Toolbar;