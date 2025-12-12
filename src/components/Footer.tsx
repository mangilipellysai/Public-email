import { Mail, Phone, MapPin } from "lucide-react";
import logo from "figma:asset/c115fffcf42742e37f6c3ba761cfcd59878845bc.png";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src={logo} alt="Soulfide Solutions" className="h-10" />
            </div>
            <p className="text-gray-400 text-sm">
              Leading manufacturer of RFID readers and tags, delivering innovative solutions 
              for identification and tracking systems worldwide.
            </p>
          </div>

          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" onClick={() => scrollToSection("home")} className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" onClick={() => scrollToSection("products")} className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#" onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Our Products</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>RFID Readers</li>
              <li>RFID Tags & Labels</li>
              <li>Asset Tracking Solutions</li>
              <li>Access Control Systems</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="mb-2">Mumbai Office:</p>
                  <span>Keshav Kunj II, Plot No. 3, Sector 15, Sanpada, Navi Mumbai, Thane, Maharashtra, 400701</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="mb-2">Hyderabad Office:</p>
                  <span>Plot No. 193 Part, Phase IV, I.D.A, Cherlapally, Medchal Malkajgiri District, Hyderabad, Telangana 500062</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>+91 74003 62777</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>info@soulfide.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 Soulfide Solutions Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}