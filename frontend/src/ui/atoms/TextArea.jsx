// textarea for confession body atomic component using tailwind

const TextArea = ({ placeholder, value, onChange }) => (
  <textarea className="w-full h-40 p-2 border-2 border-gray-300 rounded-sm focus:outline-none focus:border-cblack" placeholder={placeholder} value={value} onChange={onChange} />
        
);

export default TextArea;