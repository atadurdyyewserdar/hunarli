import { BoltIcon } from "@heroicons/react/24/solid";
const Tag = ({ value }) => {
  return (
    <div className="flex items-center gap-1 bg-[#dbdbdb] p-1 pl-2 pr-2">
      <BoltIcon className="h-3 text-black" />
      <h1 className="text-[12px] text-black">{value}</h1>
    </div>
  );
};

export default Tag;
