import React from "react";

const HeadingText = ({ title, description }) => {
  return (
    <section className="text-center p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold" style={{ fontFamily: "'Aesthet Nova', serif" }}>
          {title}
        </h1>
        <h3 className="text-xl md:text-2xl lg:text-3xl mt-4" style={{ fontFamily: "'Complement Font', sans-serif" }}>
          {description}
        </h3>
      </div>
    </section>
  );
};

export default HeadingText;
