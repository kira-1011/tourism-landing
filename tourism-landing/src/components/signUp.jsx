import { useState } from "react";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "./ui/card.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [inputValue, setInputValue] = useState(
    {   name: "", username: "", password: "",phonenumber: "", email: "", location: "", });
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")
    const navigate =useNavigate()
const handleSignup=async()=>{
  setError("")
  setSuccess("")
  const res=await fetch("http://localhost:3000/api/auth/signup",
    {
      method:"post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValue)
    }
   
  )
  const data=await res.json()
  console.log(data)
  if(!res.ok){
     setError(data.message)
     return;
  }
  setSuccess(data.message)
  alert("signup succusfully")
  navigate("/login")
}
  return (
    <main id="signup"
    
    className="min-h-screen w-full bg-gradient-to-b from-muted/40 via-background to-muted/30">
     
      <div className="flex min-h-screen items-center justify-center px-4 pb-12 pt-24">
        <Card className="w-full max-w-md shadow-lg ring-1 ring-border/80">
    <CardHeader className="space-y-1 border-b border-border/60">
            <CardTitle className="text-2xl text-center font-semibold tracking-tight">
              Sign up
            </CardTitle>
            <CardDescription>
              Create an account to plan your trip across Ethiopia.
            </CardDescription>
     </CardHeader>

     <CardContent className="space-y-4 pt-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-600 p-2 rounded text-sm">
              {success}
            </div>
          )}
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input  id="name" name="name"  type="text" value={inputValue.name}
                onChange={(e) => setInputValue((prev) => ({ ...prev, name: e.target.value })) }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input   id="username"  name="username"  type="text"  value={inputValue.username}
                onChange={(e) => setInputValue((prev) => ({  ...prev,  username: e.target.value,}))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input  id="password" name="password" type="password" value={inputValue.password}
                onChange={(e) => setInputValue((prev) => ({...prev, password: e.target.value, }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phonenumber">Phone</Label>
              <Input  id="phonenumber"name="phonenumber" type="tel"value={inputValue.phonenumber}
                onChange={(e) => setInputValue((prev) => ({  ...prev, phonenumber: e.target.value, }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input  id="email"  name="email"  type="email" value={inputValue.email}
                onChange={(e) => setInputValue((prev) => ({ ...prev, email: e.target.value }))  }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input  id="location" name="location" type="text"value={inputValue.location}
                onChange={(e) =>  setInputValue((prev) => ({ ...prev, location: e.target.value, }))
                }
              />
            </div>
      </CardContent>

 <CardFooter className="flex justify-center border-t bg-muted/40">
         
            <Button onClick={handleSignup} type="button" className="w-full sm:w-auto" size="lg"> Signup </Button>
     <div>
        <p className="text-sm text-muted-foreground"> Already have an account?{" "}
           <Link to="/login" className="text-primary hover:underline font-medium">
               Login
           </Link>
       </p>
     </div>
</CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Signup;
