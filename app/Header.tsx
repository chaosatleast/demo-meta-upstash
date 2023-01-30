import Link from "next/link";
import LoggedButton from "./LoggedButton";
function Header() {
  const session = true;

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-5 shadow-sm">
        <div className="flex space-x-2">
          <img
            className="rounded-full mx-2 object-contain"
            src="profile_pic.jpg"
            alt="Logo"
            height="10"
            width="40"
          />
          <div>
            <p className="text-blue-400">Logged in as :</p>
            <p className="font-bold text-lg">Alice Chin</p>
          </div>
        </div>

        {/*@ts-ignore*/}
        <LoggedButton />
      </header>
    );
  }
  return (
    <header>
      <div className="flex flex-row items-center space-y-1 justify-center">
        <div className="flex space-x-2 items-center">
          <img src="meta-12361.svg" alt="Logo" height="10" width="40" />
          <p className="text-blue-400"> Welcome to Demo Meta Messenger</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/auth/signin"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
