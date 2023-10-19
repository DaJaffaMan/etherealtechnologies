import React from "react";

const Header = () => {
  return (
    <div className="bg-orange-500 p-4 relative z-10 text-white flex items-center">
      <div className="w-40 h-40 rounded-full overflow-hidden mr-8 relative">
        <img
          src="profile.jpeg"
          alt="Jack Jefferies"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "relative",
          }}
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-shadow-md">Jack Jefferies</h1>
        <p className="text-2xl mt-1 text-shadow-sm">Software Engineer & Architect</p>
      </div>
    </div>
  );
};

export default Header;
