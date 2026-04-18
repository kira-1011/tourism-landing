import { useParams } from "react-router-dom";
import { useState } from "react";

// shadcn/ui components (adjust path if yours is different)
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { Button } from "./ui/button.jsx";
import { Label } from "./ui/label.jsx";
import { Link } from "react-router-dom";

function Booking() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
const [loading,setLoading]=useState(false)
const [error,setError]=useState(null)
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    people: 1,
    travel_date: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    const payload = {
      destination_id: id,
      user_id: user?.id,   // ✅ ADD THIS
      ...form,
    };

    console.log("Booking Data:", payload);
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/bookings/booking", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Booking successful 🎉");
        setForm({
          name: "",
          email: "",
          phone: "",
          people: 1,
          travel_date: "",
          message: "",
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <Link
    to={{ pathname: "/", hash: "destination" }}
    className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 underline-offset-4 transition hover:text-green-700 hover:underline"
  >
    ← Back to destinations
  </Link>
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Book Your Trip ✈️
          </CardTitle>
          <p className="text-center text-sm text-gray-500">
            Destination ID: <span className="font-semibold">{id}</span>
          </p>
         
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* People + Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>People</Label>
                <Input
                  type="number"
                  name="people"
                  min="1"
                  value={form.people}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Travel Date</Label>
                <Input
                  type="date"
                  name="travel_date"
                  value={form.travel_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <Label>Message</Label>
              <Textarea
                name="message"
                placeholder="Any special request..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {/* Button */}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Confirm Booking
            </Button>
            {loading && (
  <p className="text-center text-sm text-gray-600">
    Booking processing...
  </p>
)}

{success && (
  <p className="text-center text-green-600 text-sm">
    {success}
  </p>
)}

{error && (
  <p className="text-center text-red-600 text-sm">
    {error}
  </p>
)}
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}

export default Booking;