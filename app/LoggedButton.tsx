"use client";
function LoggedButton() {
  return (
    <button
      onDoubleClick={() => console.log("Sign out")}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
}

export default LoggedButton;
