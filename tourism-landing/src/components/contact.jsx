import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { Button } from "./ui/button.jsx";
import { Label } from "./ui/label.jsx";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, User } from "lucide-react"

function Contact() {
  return (
    <div id="contact" className="min-h-screen bg-slate-600 flex items-center justify-center px-4 py-10">

      <Card className="w-full max-w-5xl shadow-2xl rounded-3xl p-6 md:p-10">
        <CardContent className="grid md:grid-cols-2 gap-10">

          {/* Left Side */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              Contact Us
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Have questions or want to explore Ethiopia with us?  
              Send us a message and we’ll get back to you quickly.
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <MapPin className="text-green-600" size={20} />
                <p>Addis Ababa, Ethiopia</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-green-600" size={20} />
                <p>+251 900 000 000</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-green-600" size={20} />
                <p>info@ethiotours.com</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <form className="space-y-5">

            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                placeholder="Your name"
                className="pl-10 rounded-xl"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                type="email"
                placeholder="Your email"
                className="pl-10 rounded-xl"
              />
            </div>

            <div className="relative">
              <Textarea
                rows={4}
                placeholder="Write your message..."
                className="rounded-xl"
              />
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-lg flex items-center justify-center gap-2">
              <Mail size={18} />
              Send Message
            </Button>

          </form>

        </CardContent>
      </Card>

    </div>
  )
}

export default Contact