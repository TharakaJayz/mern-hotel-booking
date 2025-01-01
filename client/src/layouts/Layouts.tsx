import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
  isNotSearch?: boolean;
}

const Layouts = ({ children, isNotSearch: isHomePage }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">{!isHomePage && <SearchBar />}</div>
      <div className="container mx-auto py-10 flex-1 ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layouts;
