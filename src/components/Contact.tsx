import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your inquiry! Our team will contact you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Get in touch with our team to learn more about our RFID solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your RFID requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-600 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-lg">Phone</div>
                  </div>
                  <p className="text-gray-600 ml-11">+91 74003 62777</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-600 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-lg">Email</div>
                  </div>
                  <p className="text-gray-600 ml-11">info@soulfide.com</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-600 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-lg">Our Locations</div>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div>
                      <p className="text-sm mb-1">Mumbai Office:</p>
                      <p className="text-gray-600 text-sm">
                        Keshav Kunj II, Plot No. 3,<br />
                        Sector 15, Sanpada,<br />
                        Navi Mumbai, Thane,<br />
                        Maharashtra, 400701
                      </p>
                    </div>
                    <div>
                      <p className="text-sm mb-1">Hyderabad Office:</p>
                      <p className="text-gray-600 text-sm">
                        Plot No. 193 Part, Phase IV, I.D.A<br />
                        Cherlapally, Medchal Malkajgiri District<br />
                        Hyderabad, Telangana 500062<br />
                        GSTIN: 36ABOCS9647K1ZD
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-600 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-lg">Business Hours</div>
                  </div>
                  <p className="text-gray-600 ml-11">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 ml-11">Saturday: 9:00 AM - 2:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}