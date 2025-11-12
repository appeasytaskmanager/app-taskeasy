import { Button } from "../ui/Button";

export const Task = () => {
  return (
    <div>
      <p>Tasks</p>
      <Button action={() => console.log("Oi")} title="Oi" />
    </div>
  );
};
