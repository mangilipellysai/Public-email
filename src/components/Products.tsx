import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Radio, CreditCard, Package, Smartphone, Building, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import manufacturingImage from "figma:asset/afd9157ad88a69334cc68abe2161fb176b82a89f.png";
import rfidReaderDevice from "figma:asset/df181b9d875b4ff373304813ad4223f1c4fc3e6e.png";

const products = [
  {
    icon: Radio,
    title: "RFID Readers",
    description: "High-performance fixed and handheld RFID readers for various frequencies (LF, HF, UHF)",
    features: ["Long-range reading", "Multi-tag detection", "Industrial-grade durability"]
  },
  {
    icon: CreditCard,
    title: "RFID Tags & Labels",
    description: "Comprehensive range of passive and active RFID tags for diverse applications",
    features: ["Multiple form factors", "Custom encoding", "Extreme environment options"]
  },
  {
    icon: Package,
    title: "Asset Tracking Solutions",
    description: "Complete RFID systems for inventory management and asset tracking",
    features: ["Real-time visibility", "Automated tracking", "Integration ready"]
  },
  {
    icon: Smartphone,
    title: "Mobile RFID Devices",
    description: "Portable RFID readers integrated with mobile computing platforms",
    features: ["Android/iOS compatible", "Bluetooth connectivity", "Rugged design"]
  },
  {
    icon: Building,
    title: "Access Control Systems",
    description: "RFID-based security and access management solutions",
    features: ["Secure authentication", "Multi-location support", "Audit trail logging"]
  },
  {
    icon: ShoppingCart,
    title: "Retail Solutions",
    description: "RFID systems for retail inventory, anti-theft, and customer experience",
    features: ["Point-of-sale integration", "Theft prevention", "Smart shelving"]
  }
];

export function Products() {
  return (
    <section id="products" className="py-20 bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl mb-4">Our RFID Products</h2>
          <p className="text-gray-600">
            Comprehensive RFID solutions designed to meet the diverse needs of modern businesses
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <Card key={index} className="border-2 hover:border-orange-600 transition-all hover:shadow-xl">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-orange-600 to-orange-700 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                      <product.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription className="text-base">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-orange-200 overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img
                    src={manufacturingImage}
                    alt="Manufacturing Facility"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl mb-2">Manufacturing Excellence</h3>
                    <p className="text-gray-200 text-sm">
                      State-of-the-art production facility for RFID readers and tags
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-2 border-orange-200 mt-6 overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={rfidReaderDevice}
                    alt="Soulfide RFID Reader"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 text-center">
                    Soulfide RFID Reader - Industry-leading technology
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 relative overflow-hidden bg-white rounded-2xl border-2 border-orange-100">
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1686397140203-16a02e76de99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHJhaWx3YXklMjBtb2Rlcm58ZW58MXx8fHwxNzYyMzMxNjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Railway"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div>
              <h3 className="text-3xl mb-4">Industries We Serve</h3>
              <div className="mb-4">
                <div className="text-2xl mb-3 text-orange-600">Railways</div>
                <p className="text-gray-600 mb-6">
                  Advanced RFID solutions for railway asset tracking, passenger management, and operational efficiency. Our technology enables real-time monitoring of rolling stock, automated fare collection systems, and enhanced security protocols across railway networks.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-600 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <div className="text-sm">Asset & Wagon Tracking</div>
                      <p className="text-xs text-gray-500">Real-time location and status monitoring</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-600 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <div className="text-sm">Passenger Management</div>
                      <p className="text-xs text-gray-500">Automated ticketing and access control</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-600 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <div className="text-sm">Maintenance Optimization</div>
                      <p className="text-xs text-gray-500">Predictive maintenance and inventory management</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1686397140203-16a02e76de99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHJhaWx3YXklMjBtb2Rlcm58ZW58MXx8fHwxNzYyMzMxNjY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern Railway"
                className="w-full h-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}