import { CalendarRange } from "lucide-react";

const LogoEasyTask = () => {
  return (
    <div className="flex justify-center items-center mb-10">
      <div className="bg-blue-600 p-2 rounded-2xl flex items-center justify-center">
        <CalendarRange className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-white ml-4">EasyTask</h1>
    </div>
  );
};

export default LogoEasyTask;
