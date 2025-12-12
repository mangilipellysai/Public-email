import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-32 min-h-screen flex flex-col">
      <div className="absolute inset-0 opacity-40">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1717444309226-c0809d4b5bde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSRklEJTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzYyNzAxOTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="RFID Technology Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/80"></div>
      <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block bg-orange-600/20 border border-orange-600/50 rounded-full px-6 py-2 mb-6">
            <span className="text-orange-400">Innovative RFID Solutions</span>
          </div>
          <h1 className="text-5xl lg:text-7xl mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Soulfide Solutions Pvt Ltd
          </h1>
          <p className="text-2xl lg:text-3xl text-gray-300 mb-6">
            Leading Manufacturer of RFID Readers & Tags
          </p>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Pioneering RFID technology for seamless identification, tracking, and automation across industries worldwide
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6"
            >
              Contact Us
            </Button>
            <Button 
              size="lg" 
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 backdrop-blur-sm border border-white/30"
            >
              View Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}