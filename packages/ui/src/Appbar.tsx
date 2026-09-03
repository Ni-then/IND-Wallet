import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
}: AppbarProps) => {
  return (
    <div className="flex justify-between items-center text-lg border-b px-4 bg-blue-600 p-2">
      <div className="flex flex-col justify-center ">
        PayTM
      </div>

      <div className="flex flex-col justify-center ">
        <Button className="bg-blue-400 rounded-sm px-2" onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};