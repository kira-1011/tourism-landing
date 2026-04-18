import { useState } from "react";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "./ui/card.jsx";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import pp from "../assets/bg.jpg"
function Login() {
  const [inputValue, setInputValue] = useState(
    {  email: "",  password: "",   });
 const [error,setError]=useState("")
 const [success,setSuccess]=useState("")
const navigate=useNavigate()
const handleLogin=async()=>{
  const res= await fetch("http://localhost:3000/api/auth/login",
    {method:"post",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify(inputValue)
    })
 const data=await res.json()
 console.log(data)
 if(!res.ok){
    setError(data.message)
    return;
 }
 const decoded = jwtDecode(data.token);
 localStorage.setItem("user", JSON.stringify(decoded));
 localStorage.setItem("token", data.token);
setSuccess(data.message)
navigate("/")
 }
  return (
    <main
    
    className="min-h-screen w-full bg-gradient-to-b from-muted/40 via-background to-muted/30">
     
      <div className="flex min-h-screen items-center justify-center px-4 pb-12 pt-24">
        <Card className="w-full max-w-md shadow-lg ring-1 ring-border/80">
          <CardHeader className="space-y-1 border-b border-border/60">
            <CardTitle className="text-2xl text-center font-semibold tracking-tight">
             Login
            </CardTitle>
         
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
              <Label htmlFor="email">Email</Label>
              <Input  id="email"  name="email"  type="email" value={inputValue.email}
                onChange={(e) => setInputValue((prev) => ({ ...prev, email: e.target.value }))  }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input  id="password" name="password" type="password" value={inputValue.password}
                onChange={(e) => setInputValue((prev) => ({...prev, password: e.target.value, }))
                }
              />
            </div>

           

          </CardContent>

          <CardFooter className="flex justify-center border-t bg-muted/40">
             <Button onClick={handleLogin} type="button" className="w-full sm:w-auto" size="lg">
   Login
  </Button>
 

</CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Login;
