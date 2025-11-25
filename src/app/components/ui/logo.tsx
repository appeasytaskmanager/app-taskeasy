import { CalendarRange } from "lucide-react";

const LogoEasyTask = () => {
  return (
    <div className="flex justify-center items-end mb-6">
      <div className="bg-linear-90 from-blue-900 to-blue-700 p-2 rounded-2xl flex items-center justify-center">
        <CalendarRange className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-white ml-4">
        EASY<span className="font-normal text-muted-foreground">TASK</span>
      </h1>
    </div>
  );
};

export default LogoEasyTask;
