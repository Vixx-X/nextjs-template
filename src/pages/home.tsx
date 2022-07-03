import authStore from "@stores/AuthStore";
import userStore from "@stores/UserStore";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const logout = authStore((state: any) => state.logout);
  const user = userStore((state: any) => state.user);
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div>
          <p> {user?.username}</p>
          <p>You are authenticated.</p>
          <button
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
