import { Card, CardContent } from "./ui/card";
import { Target, Eye, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const team = [
  {
    name: "Abhinav Guptha",
    role: "Co-Founder & Managing Director",
    description: "Visionary leader driving innovation in RFID technology"
  },
  {
    name: "Alka Gupta",
    role: "Co-Founder",
    description: "Strategic partner ensuring operational excellence"
  },
  {
    name: "Rachana Pandey",
    role: "Business Head",
    description: "Leading business development and client relationships"
  }
];

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl mb-4">About Soulfide Solutions</h2>
          <p className="text-gray-600">
            A pioneering force in RFID technology, committed to delivering cutting-edge solutions 
            that transform how businesses operate and connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl">Who We Are</h3>
            <p className="text-gray-600">
              Soulfide Solutions Pvt. Ltd. is a leading manufacturer of RFID readers and tags, 
              specializing in advanced Radio Frequency Identification solutions. With years of 
              expertise in the industry, we provide innovative products that enable seamless 
              identification, tracking, and automation across various sectors.
            </p>
            <p className="text-gray-600">
              Our commitment to quality, reliability, and customer satisfaction has made us a 
              trusted partner for businesses seeking to enhance their operational efficiency 
              through RFID technology.
            </p>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwZmFjaWxpdHklMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MjMzMDk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Manufacturing facility"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="border-2 border-orange-100">
            <CardContent className="p-8">
              <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-2xl mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To be the global leader in RFID technology, pioneering innovative solutions that 
                revolutionize identification and tracking systems across industries, making the 
                world more connected and efficient.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100">
            <CardContent className="p-8">
              <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-2xl mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To deliver cutting-edge RFID readers and tags that exceed customer expectations 
                through continuous innovation, superior quality, and dedicated support, enabling 
                businesses to achieve operational excellence.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl mb-4">Our Leadership Team</h3>
            <p className="text-gray-600">
              Meet the visionaries driving innovation at Soulfide Solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-2 hover:border-orange-600 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-orange-600 to-orange-700 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-xl mb-1">{member.name}</h4>
                  <p className="text-orange-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}