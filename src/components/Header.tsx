import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import logo from "figma:asset/c115fffcf42742e37f6c3ba761cfcd59878845bc.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection("home")}
            className="flex items-center cursor-pointer"
          >
            <img src={logo} alt="Soulfide Solutions" className="h-10" />
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-orange-600 transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-orange-600 transition-colors"
            >
              ABOUT US
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="hover:text-orange-600 transition-colors"
            >
              PRODUCTS
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-orange-600 transition-colors"
            >
              CONTACT US
            </button>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left hover:text-orange-600 transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left hover:text-orange-600 transition-colors"
            >
              ABOUT US
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-left hover:text-orange-600 transition-colors"
            >
              PRODUCTS
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left hover:text-orange-600 transition-colors"
            >
              CONTACT US
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}